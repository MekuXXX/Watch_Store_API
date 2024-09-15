import { DrizzleDB } from '../drizzle';
import { users } from '../schema';
import { faker } from '@faker-js/faker';

export default async function seed(db: DrizzleDB) {
  try {
    const usersData = await Array(50)
      .fill('')
      .map(() => ({
        username: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        is_active: Math.random() > 0.5,
      }));

    await db.insert(users).values(usersData);
  } catch (err) {
    console.log('Error in seeding users: ', err.message);
  }
}
