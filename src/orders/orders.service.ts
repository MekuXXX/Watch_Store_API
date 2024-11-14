import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { and, eq, ilike, not, or } from 'drizzle-orm';
import { DRIZZLE } from 'src/db/db.module';
import { DrizzleDB } from 'src/db/drizzle';
import { Order, orders } from 'src/db/schema';
import { QueriesDto } from 'src/dtos/queries.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async findAll(queries: QueriesDto, userId?: string) {
    const whereClause = [];

    if (userId) {
      whereClause.push(
        eq(orders.user_id, userId),
        not(eq(orders.status, 'await_payment')),
      );
    }

    if (queries.query) {
      whereClause.push(
        or(
          ilike(orders.price, `%${queries.query}%`),
          ilike(orders.created_at, `%${queries.query}%`),
        ),
      );
    }

    const dbOrders = await this.db.query.orders.findMany({
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
      limit: queries.limit,
      offset: queries.limit * (queries.page - 1),
      where: and(...whereClause),
    });

    return {
      success: true,
      message: 'Got the orders successfully',
      data: { orders: dbOrders },
    };
  }

  async findOne(orderId: string, userId?: string) {
    const order = await this.db.query.orders.findFirst({
      where: (order, { eq }) => eq(order.id, orderId),
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

    if (!order || order.user_id !== userId) {
      throw new NotFoundException('Checkout data is not exist');
    }

    return {
      success: true,
      message: 'Gettint the order successfully',
      data: { order },
    };
  }

  async update(id: string, updateOrderDto: UpdateOrderDto, userId?: string) {
    const whereQueries = [eq(orders.id, id)];

    if (userId) {
      whereQueries.push(eq(orders.user_id, userId));
    }

    const order = (
      await this.db
        .update(orders)
        .set({ ...updateOrderDto } as Order)
        .where(and(...whereQueries))
        .returning()
    )[0];

    if (!order) {
      throw new NotFoundException('Order is not found');
    }

    return {
      success: true,
      message: 'Order updated successfully',
      data: { order },
    };
  }

  async remove(id: string) {
    const order = await this.db.query.orders.findFirst({
      where: (category, { eq }) => eq(category.id, id),
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

    if (!order) {
      throw new BadRequestException('Order is not exist');
    }

    await this.db.delete(orders).where(eq(orders.id, id));

    return {
      success: true,
      message: 'Order deleted successfully',
      data: { order },
    };
  }
}
