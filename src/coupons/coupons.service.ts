import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon, coupon_product, coupons } from 'src/db/schema';
import { DrizzleDB } from 'src/db/drizzle';
import { DRIZZLE } from 'src/db/db.module';
import { eq, ne } from 'drizzle-orm';

@Injectable()
export class CouponsService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async create(createCouponDto: CreateCouponDto) {
    const { product_id } = createCouponDto;

    const newCoupon = (
      await this.db
        .insert(coupons)
        .values(createCouponDto as Coupon)
        .returning()
    )[0];

    if (product_id) {
      try {
        await this.db.insert(coupon_product).values({
          coupon_id: newCoupon.id,
          product_id,
        });
      } catch (error) {
        await this.db.delete(coupons).where(eq(coupons.id, newCoupon.id));
        throw new NotFoundException('Product is not exist');
      }
    }

    return newCoupon;
  }

  // Get all coupons
  // async findAll() {
  //   return await this.db.select(coupons).all();
  // }

  // // Get a single coupon by id
  // async findOne(id: string) {
  //   return await this.db.select(coupons).where({ id }).first();
  // }

  // // Update an existing coupon
  // async update(id: string, updateCouponDto: UpdateCouponDto) {
  //   const { coupon, type, value, is_active, expiration_date, product_id } =
  //     updateCouponDto;

  //   const updatedCoupon = await this.db
  //     .update(coupons)
  //     .set({
  //       coupon,
  //       type,
  //       value,
  //       is_active,
  //       expiration_date,
  //       updated_at: new Date(),
  //       product_id,
  //     })
  //     .where({ id })
  //     .returning();

  //   // Update the relationship in the pivot table if the product_id is updated
  //   if (product_id) {
  //     await this.db
  //       .insert(coupon_product)
  //       .values({
  //         coupon_id: updatedCoupon.id,
  //         product_id,
  //       })
  //       .onConflict('coupon_id', 'product_id')
  //       .doNothing();
  //   }

  //   return updatedCoupon;
  // }

  // // Remove a coupon
  // async remove(id: string) {
  //   // First, remove the relationship from the coupon_product pivot table
  //   await this.db.delete(coupon_product).where({ coupon_id: id });

  //   // Then, remove the coupon itself
  //   await this.db.delete(coupons).where({ id });

  //   return { message: `Coupon with ID ${id} removed successfully` };
  // }
}
