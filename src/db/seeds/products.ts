import { DrizzleDB } from '../drizzle';
import { products } from '../schema';
import { faker } from '@faker-js/faker';

export default async function seed(db: DrizzleDB) {
  try {
    const productsData = await Array(50)
      .fill('')
      .map(() => ({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        image_url: faker.image.url(),
        quantity: faker.number.int({ max: 99999999 }),
        price: faker.number.float({ min: 5 }),
      }));

    await db.insert(products).values(productsData);
  } catch (err) {
    console.log('Error in seeding products: ', err.message);
  }
}
