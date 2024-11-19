import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon, coupon_product, coupons } from 'src/db/schema';
import { DrizzleDB } from 'src/db/drizzle';
import { DRIZZLE } from 'src/db/db.module';
import { eq } from 'drizzle-orm';
import { QueriesDto } from 'src/dtos/queries.dto';
import { objectsToArray } from 'src/utils/objects-utils';

@Injectable()
export class CouponsService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async create(createCouponDto: CreateCouponDto) {
    const { products_id, type, value } = createCouponDto;

    if (type === 'percentage' && value > 100) {
      throw new BadRequestException(
        'Value must be less than or equal 100 if the type is percentage',
      );
    }

    const newCoupon = (
      await this.db
        .insert(coupons)
        .values(createCouponDto as Coupon)
        .returning()
    )[0];

    if (products_id && products_id.length) {
      try {
        const couponProducts = [];
        for (const product_id of products_id) {
          couponProducts.push({
            coupon_id: newCoupon.id,
            product_id,
          });
        }
        await this.db.insert(coupon_product).values(couponProducts);
      } catch (error) {
        await this.db.delete(coupons).where(eq(coupons.id, newCoupon.id));
        throw new NotFoundException('One of the products is not exist');
      }
    }

    return newCoupon;
  }

  async findAll(queriesDto: QueriesDto) {
    let coupons = await this.db.query.coupons.findMany({
      limit: queriesDto.limit,
      offset: queriesDto.limit * (queriesDto.page - 1),
      with: {
        products: { columns: { product_id: true } },
      },
    });

    const newCoupons = coupons.map((coupon) => ({
      ...coupon,
      products: objectsToArray(coupon.products, ['product_id'])[0],
    }));

    return {
      success: true,
      message: 'Coupons have gotten successfully',
      data: { coupons: newCoupons },
    };
  }

  async findOne(value: string, type: 'coupon' | 'id') {
    let coupon = await this.db.query.coupons.findFirst({
      where: (coupon, { eq }) =>
        eq(type === 'id' ? coupons.id : coupons.coupon, value),
      with: { products: { columns: { product_id: true } } },
    });

    if (!coupon) {
      throw new NotFoundException('Coupon is not exist');
    }

    const newCoupon = {
      ...coupon,
      products: objectsToArray(coupon.products, ['product_id'])[0],
    };

    return {
      success: true,
      message: 'Coupon have gotten successfully',
      data: { coupon: newCoupon },
    };
  }

  async update(id: string, updateCouponDto: UpdateCouponDto) {
    const { coupon, type, value, is_active, expiration_date, products_id } =
      updateCouponDto;

    const isCouponExist = await this.db.query.coupons.findFirst({
      where: (dbCoupon, { eq }) => eq(dbCoupon.coupon, coupon),
    });

    if (isCouponExist) {
      throw new BadRequestException('Coupon is already exist');
    }

    const dbCoupon = await this.db.query.coupons.findFirst({
      where: (coupon, { eq }) => eq(coupon.id, id),
      with: {
        products: true,
      },
    });

    if (!dbCoupon) {
      throw new NotFoundException('Coupon is not exist');
    }

    const updatedCoupon = await this.db
      .update(coupons)
      .set({
        coupon,
        type,
        value,
        is_active,
        expiration_date,
        updated_at: new Date(),
      } as Coupon)
      .where(eq(coupons.id, id))
      .returning();

    if (products_id.length !== 0) {
      try {
        await this.db
          .delete(coupon_product)
          .where(eq(coupon_product.coupon_id, id));

        const couponProducts = [];
        for (const product of products_id) {
          couponProducts.push({ coupon_id: id, product_id: product });
        }
        await this.db.insert(coupon_product).values(couponProducts);
      } catch {
        const { products, ...oldCouponData } = dbCoupon;
        await this.db.insert(coupon_product).values(dbCoupon.products);
        await this.db
          .update(coupons)
          .set(oldCouponData)
          .where(eq(coupons.id, id));
        throw new NotFoundException('One of the products is not exist');
      }
    }

    return {
      success: true,
      message: 'Coupon updated successfully',
      data: { coupon: updatedCoupon },
    };
  }

  async remove(id: string) {
    let coupon = await this.db.query.coupons.findFirst({
      where: (coupon, { eq }) => eq(coupon.id, id),
      with: {
        products: {
          columns: {
            product_id: true,
          },
        },
      },
    });

    if (!coupon) {
      throw new NotFoundException('Coupon is not exist');
    }

    await this.db.delete(coupons).where(eq(coupons.id, coupon.id));
    const newCoupon = {
      ...coupon,
      products: objectsToArray(coupon.products, ['product_id']),
    };

    return {
      success: true,
      message: `Coupon with ID ${id} removed successfully`,
      data: { coupon: newCoupon },
    };
  }
}
