import { DrizzleDB } from '../drizzle';
import { CouponType, coupons } from '../schema';
import { faker } from '@faker-js/faker';

export default async function seed(db: DrizzleDB) {
  try {
    const couponData = Array(20)
      .fill('')
      .map(() => ({
        coupon: faker.commerce.productName(),
        type: faker.helpers.arrayElement(['value', 'percentage']) as CouponType,
        value: faker.number.float({ min: 5, max: 50 }),
        is_active: faker.datatype.boolean(),
        expiration_date: faker.date.future(),
        created_at: new Date(),
        updated_at: new Date(),
      }));

    await db.insert(coupons).values(couponData).returning();
  } catch (err) {
    console.log('Error in seeding coupons: ', err.message);
  }
}
