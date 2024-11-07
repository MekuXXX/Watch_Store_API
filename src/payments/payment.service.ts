import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentOrderDto } from './dto/create-payment-order.dto';
import Stripe from 'stripe';
import env from 'src/utils/env';
import { DRIZZLE } from 'src/db/db.module';
import { DrizzleDB } from 'src/db/drizzle';
import { Order, User, order_product, orders, products } from 'src/db/schema';
import { eq, inArray } from 'drizzle-orm';
import { CartItemDto } from './dto/cart-item.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { PAYMENT_TYPES } from './payment.module';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;
  private logger: Logger;

  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private readonly mailer: MailerService,
  ) {
    this.stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    });
    this.logger = new Logger();
  }

  async createStripeSession(
    user: User,
    paymentOrderDto: CreatePaymentOrderDto,
  ) {
    const cartItemsMap = this.clearCartItems(paymentOrderDto.cart_items);
    const productIds = Array.from(cartItemsMap.keys());

    const productsData = await this.db
      .select()
      .from(products)
      .where(inArray(products.id, productIds));

    const totalPrice = productsData.reduce(
      (sum, product) =>
        sum + Math.ceil(product.price) * cartItemsMap.get(product.id).quantity,
      0,
    );

    const order = await this.createOrder(
      user.id,
      totalPrice,
      cartItemsMap,
      PAYMENT_TYPES.STRIPE,
    );

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      currency: env.STRIPE_PAYMENT_CURRENCY,
      line_items: productsData.map((product) => ({
        price_data: {
          currency: env.STRIPE_PAYMENT_CURRENCY,
          product_data: {
            name: product.name,
            description: product.description,
            images: [product.image_url],
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: cartItemsMap.get(product.id).quantity,
      })),

      metadata: {
        user_id: user.id,
        order_id: order.id,
      },

      mode: 'payment',
      success_url: env.STRIPE_SUCCESS_URL,
      cancel_url: env.STRIPE_CANCELED_URL,
      customer_email: user.email,
    });

    return {
      success: true,
      data: {
        session_url: session.url,
      },
    };
  }

  async checkoutData(id: string) {
    let checkoutData: Stripe.Checkout.Session;
    try {
      checkoutData = await this.stripe.checkout.sessions.retrieve(id);
    } catch (error) {
      this.logger.error(error.message);
    }

    if (!checkoutData) {
      throw new NotFoundException('Checkout data is not exist');
    }

    const order = await this.db.query.orders.findFirst({
      where: (order, { eq }) => eq(order.id, checkoutData.metadata.order_id),
      with: {
        user: {
          columns: {
            id: true,
            username: true,
            email: true,
            avatar_url: true,
            cover_url: true,
            phone: true,
            role: true,
          },
        },
        order_items: {
          columns: {},
          with: {
            product: true,
          },
        },
      },
    });

    if (!order || order.user_id !== checkoutData.metadata.user_id) {
      throw new NotFoundException('Checkout data is not exist');
    }

    return {
      success: true,
      message: 'Getted the checkout data successfully',
      data: { order },
    };
  }

  async stripeWebhook(body: Buffer, signature: string) {
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(
        body,
        signature,
        env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      throw new BadRequestException('Event is not exist');
    }

    switch (event.type) {
      case 'checkout.session.completed':
        const orderId = event.data.object.metadata.order_id;

        await this.db
          .update(orders)
          .set({
            status: 'shipping',
          } as Order)
          .where(eq(orders.id, orderId));

        const order = await this.db.query.orders.findFirst({
          where: (order, { eq }) => eq(order.id, orderId),
          with: {
            user: {
              columns: {
                username: true,
                email: true,
              },
            },
            order_items: {
              columns: {},
              with: {
                product: true,
              },
            },
          },
        });

        this.mailer.sendMail({
          recipients: [
            { name: order.user.username, address: order.user.email },
          ],
          subject: 'Order is successfully purchased',
          html: `<h1>Order of id ${order.id} and price ${order.price}$ is on the way</h1>`,
        });

        break;
      case 'checkout.session.async_payment_failed':
      case 'checkout.session.expired':
        await this.db
          .delete(orders)
          .where(eq(orders.id, event.data.object.metadata.order_id));
        break;
    }

    return { success: true, message: 'Event is handled correctly' };
  }

  async cashOnDeliviry(user: User, paymentOrderDto: CreatePaymentOrderDto) {
    const cartItemsMap = this.clearCartItems(paymentOrderDto.cart_items);
    const productIds = Array.from(cartItemsMap.keys());

    const productsData = await this.db
      .select()
      .from(products)
      .where(inArray(products.id, productIds));

    const totalPrice = productsData.reduce(
      (sum, product) =>
        sum + Math.ceil(product.price) * cartItemsMap.get(product.id).quantity,
      0,
    );

    const order = await this.createOrder(
      user.id,
      totalPrice,
      cartItemsMap,
      PAYMENT_TYPES.CASH_DELIVERY,
    );

    return {
      success: true,
      message: 'Order created successfuly',
      data: { order },
    };
  }

  async createOrder(
    userId: string,
    price: number,
    cartItemsMap: Map<string, CartItemDto>,
    type: PAYMENT_TYPES,
  ) {
    const order = (
      await this.db
        .insert(orders)
        .values({
          user_id: userId,
          checkout_id: ``,
          status:
            type === PAYMENT_TYPES.CASH_DELIVERY
              ? 'cash_delivery'
              : 'await_payment',
          price,
        } as Order)
        .returning()
    )[0];

    const productsOrderData = [];

    cartItemsMap.forEach((cartItem) => {
      productsOrderData.push({
        order_id: order.id,
        product_id: cartItem.product_id,
        quantity: cartItem.quantity,
      });
    });

    try {
      await this.db.insert(order_product).values(productsOrderData);
    } catch {
      throw new NotFoundException('One of the products is not exist');
    }

    const orderData = await this.db.query.orders.findFirst({
      where: (orderRow, { eq }) => eq(orderRow.id, order.id),
      with: {
        order_items: true,
      },
    });

    return orderData;
  }

  clearCartItems(cartItems: CartItemDto[]): Map<string, CartItemDto> {
    const cartItemsMap = new Map<string, CartItemDto>();

    cartItems.forEach((item) => {
      if (cartItemsMap.has(item.product_id)) {
        const existingItem = cartItemsMap.get(item.product_id);
        existingItem!.quantity += item.quantity;
      } else {
        cartItemsMap.set(item.product_id, { ...item });
      }
    });

    return cartItemsMap;
  }
}
