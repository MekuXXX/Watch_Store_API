import { DrizzleDB } from '../drizzle';
import { categories } from '../schema';
import { faker } from '@faker-js/faker';

export default async function seed(db: DrizzleDB) {
  try {
    const insertedCategories = Array(50)
      .fill('')
      .map(() => ({
        name: faker.commerce.department(),
        cover_url: faker.image.urlPicsumPhotos(),
      }));

    await db.insert(categories).values(insertedCategories);
  } catch (err) {
    console.log('Error in seeding categories: ', err.message);
  }
}
