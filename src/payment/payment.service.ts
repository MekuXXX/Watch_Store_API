import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStripeSessionDto } from './dto/create-stripe-session.dto';
import Stripe from 'stripe';
import env from 'src/utils/env';
import { DRIZZLE } from 'src/db/db.module';
import { DrizzleDB } from 'src/db/drizzle';
import { Order, User, order_product, orders, products } from 'src/db/schema';
import { eq, inArray } from 'drizzle-orm';
import { CartItemDto } from './dto/cart-item.dto';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private readonly mailer: MailerService,
  ) {
    this.stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    });
  }

  async createStripeSession(
    user: User,
    createStripeSessionDto: CreateStripeSessionDto,
  ) {
    const cartItemsMap = this.clearCartItems(createStripeSessionDto.cart_items);
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

    const order = await this.createOrder(user.id, totalPrice, cartItemsMap);

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

  async createOrder(
    userId: string,
    price: number,
    cartItemsMap: Map<string, CartItemDto>,
  ) {
    const order = (
      await this.db
        .insert(orders)
        .values({
          user_id: userId,
          checkout_id: ``,
          price,
        })
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
