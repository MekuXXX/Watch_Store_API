import { faker } from '@faker-js/faker';
import { DrizzleDB } from '../../drizzle';
import { products, coupons, coupon_product, COUPON_TYPE } from '../../schema';

export default async function seed(db: DrizzleDB) {
  try {
    const productsData = await db
      .insert(products)
      .values(
        Array(10)
          .fill('')
          .map((_) => ({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            image_url: faker.image.url(),
            quantity: faker.number.int({ max: 999999999 }),
            price: faker.number.float(),
          })),
      )
      .returning();

    const couponsData = await db
      .insert(coupons)
      .values(
        Array(10)
          .fill('')
          .map((_) => ({
            coupon: faker.commerce.productName(),
            type: faker.helpers.arrayElement(COUPON_TYPE.enumValues),
            value: faker.number.float({ min: 5, max: 50 }),
            is_active: faker.datatype.boolean(),
            expiration_date: faker.date.future(),
            created_at: new Date(),
            updated_at: new Date(),
          })),
      )
      .returning();

    const couponProductData = [];

    couponsData.forEach((coupon) => {
      productsData.forEach((product) => {
        couponProductData.push({
          product_id: product.id,
          order_id: coupon.id,
        });
      });
    });

    await db.insert(coupon_product).values(couponProductData);
  } catch (err) {
    console.log('Error in seeding order product pivot: ', err.message);
  }
}
