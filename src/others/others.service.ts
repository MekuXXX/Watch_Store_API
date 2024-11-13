import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { DRIZZLE } from 'src/db/db.module';
import { DrizzleDB } from 'src/db/drizzle';
import { user_product } from 'src/db/schema';

@Injectable()
export class OthersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async numbers(userId: string) {
    const wishlists = (
      await this.db.query.user_product.findMany({
        columns: {},
        where: eq(user_product.user_id, userId),
        extras: { _count: sql`COUNT(*)`.as('_count') },
      })
    )[0];

    if (!wishlists) {
      throw new NotFoundException('User not found');
    }

    const orders = (
      await this.db.query.orders.findMany({
        columns: {},
        where: (order, { eq }) => eq(order.user_id, userId),
        extras: { _count: sql`COUNT(*)`.as('_count') },
      })
    )[0];

    return {
      success: true,
      message: 'Numbers got successfully',
      data: { wishlists: wishlists._count, orders: orders._count },
    };
  }
}
