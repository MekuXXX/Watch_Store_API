import { DrizzleDB } from '../drizzle';
import { configurations } from '../schema';
import { faker } from '@faker-js/faker';

export default async function seed(db: DrizzleDB) {
  try {
    const insertedConfigs = Array(50)
      .fill('')
      .map((_, index: number) => ({
        key: `${index} ${faker.database.column()}`,
        value: faker.commerce.isbn(),
        description: faker.commerce.productDescription(),
      }));

    await db.insert(configurations).values(insertedConfigs);
  } catch (err) {
    console.log('Error in seeding configurations: ', err.message);
  }
}
