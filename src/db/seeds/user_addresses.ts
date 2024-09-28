import { DrizzleDB } from '../drizzle';
import { user_addresses, users } from '../schema';
import { faker } from '@faker-js/faker';

export default async function seed(db: DrizzleDB) {
  try {
    const user = (
      await db
        .insert(users)
        .values([
          {
            username: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
          },
        ])
        .returning()
    )[0];

    const addresses = Array(50)
      .fill('')
      .map((_) => ({
        country: faker.location.country(),
        city: faker.location.city(),
        state: faker.location.state(),
        street: faker.location.street(),
        zipcode: faker.location.zipCode(),
        user_id: user.id,
      }));

    await db.insert(user_addresses).values(addresses);
  } catch (err) {
    console.log('Error in seeding user addresses: ', err.message);
  }
}
