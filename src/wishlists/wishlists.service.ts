import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { QueriesDto } from 'src/dtos/queries.dto';
import { DRIZZLE } from 'src/db/db.module';
import { DrizzleDB } from 'src/db/drizzle';
import { products, user_product, users } from 'src/db/schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class WishlistsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(userId: string, productId: string) {
    const userExists = await this.db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!userExists) {
      throw new BadRequestException('User does not exist');
    }

    const productExists = await this.db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (!productExists) {
      throw new BadRequestException('Product does not exist');
    }

    const wishlist = (
      await this.db
        .insert(user_product)
        .values({
          user_id: userId,
          product_id: productId,
        })
        .returning({
          user_id: user_product.user_id,
          product_id: user_product.product_id,
        })
    )[0];

    if (!wishlist) {
      throw new BadRequestException('Error happen during adding the wishlist');
    }

    return { success: true, data: { wishlist } };
  }

  async findAll(queriesDto: QueriesDto, userId?: string) {
    const baseQuery = this.db
      .select({
        created_at: user_product.created_at,
        updated_at: user_product.updated_at,
        product: {
          id: products.id,
          name: products.name,
          description: products.description,
          image_url: products.image_url,
          price: products.price,
          quantity: products.quantity,
        },
        user: {
          id: users.id,
          username: users.username,
          email: users.email,
          avatar_url: users.avatar_url,
          cover_url: users.cover_url,
          phone: users.phone,
          role: users.role,
        },
      })
      .from(user_product)
      .innerJoin(products, eq(user_product.product_id, products.id))
      .innerJoin(users, eq(user_product.user_id, users.id))
      .limit(queriesDto.limit)
      .offset(queriesDto.limit * (queriesDto.page - 1));

    if (userId) {
      const userExists = await this.db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (!userExists) {
        throw new BadRequestException('User does not exist');
      }

      baseQuery.where(eq(user_product.user_id, userId));
    }

    const wishlists = await baseQuery;

    return { success: true, data: { wishlists } };
  }

  async findOne(userId: string, productId: string) {
    const wishlist = await this.db.query.user_product.findFirst({
      where: (wishlist, { eq, and }) =>
        and(eq(wishlist.user_id, userId), eq(wishlist.product_id, productId)),
      columns: {
        created_at: true,
        updated_at: true,
      },
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
        product: {
          columns: {
            id: true,
            name: true,
            description: true,
            image_url: true,
            price: true,
            quantity: true,
          },
        },
      },
    });

    if (!wishlist) {
      throw new NotFoundException('Wishlist is not exist');
    }

    return { success: true, data: { wishlist } };
  }

  async remove(userId: string, productId: string) {
    const wishlist = await this.db.query.user_product.findFirst({
      where: (wishlist, { eq, and }) =>
        and(eq(wishlist.user_id, userId), eq(wishlist.product_id, productId)),
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

        product: {
          columns: {
            id: true,
            name: true,
            description: true,
            image_url: true,
            price: true,
            quantity: true,
          },
        },
      },
    });

    if (!wishlist) {
      throw new NotFoundException('Wishlist is not found');
    }

    await this.db
      .delete(user_product)
      .where(
        and(
          eq(user_product.user_id, userId),
          eq(user_product.product_id, productId),
        ),
      )
      .returning();

    return { success: true, data: { wishlist } };
  }
}
