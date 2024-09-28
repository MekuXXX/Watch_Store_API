import { faker } from '@faker-js/faker';
import { DrizzleDB } from '../../drizzle';
import {
  order_product,
  orders,
  product_category,
  products,
  users,
} from '../../schema';

export default async function seed(db: DrizzleDB) {
  try {
    const user = (
      await db
        .insert(users)
        .values({
          username: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        })
        .returning()
    )[0];

    const ordersData = await db
      .insert(orders)
      .values(
        Array(5)
          .fill('')
          .map((_, index) => ({
            user_id: user.id,
            price: faker.number.float({ max: 999999999 }),
            checkout_id: `${index} ${faker.finance.iban()}`,
          })),
      )
      .returning();

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

    const orderProductData = [];

    ordersData.forEach((order) => {
      productsData.forEach((product) => {
        orderProductData.push({
          product_id: product.id,
          order_id: order.id,
          quantity: faker.number.int({ max: 9999999 }),
        });
      });
    });

    await db.insert(order_product).values(orderProductData);
  } catch (err) {
    console.log('Error in seeding order product pivot: ', err.message);
  }
}
