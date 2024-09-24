import { DrizzleDB } from '../../drizzle';
import { products, user_product, users } from '../../schema';
import { faker } from '@faker-js/faker';

export default async function seed(db: DrizzleDB) {
  try {
    const usersData = await db
      .insert(users)
      .values(
        Array(10)
          .fill('')
          .map(() => ({
            username: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            is_active: Math.random() > 0.5,
          })),
      )
      .returning();

    const productsData = await db
      .insert(products)
      .values(
        Array(20)
          .fill('')
          .map(() => ({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            image_url: faker.image.url(),
            quantity: faker.number.int({ max: 99999999 }),
            price: faker.number.float(),
          })),
      )
      .returning();

    const userProductData = [];

    usersData.forEach((user) => {
      productsData.forEach((product) => {
        userProductData.push({ user_id: user.id, product_id: product.id });
      });
    });

    await db.insert(user_product).values(userProductData);
  } catch (err) {
    console.log('Error in seeding user product pivot: ', err.message);
  }
}
