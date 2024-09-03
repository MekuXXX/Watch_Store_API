import { DrizzleDB } from '../drizzle';
import { insertUserSchema, users } from '../schema';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

export default async function seed(db: DrizzleDB) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const usersData = Array(50)
      .fill('')
      .map(() =>
        insertUserSchema.parse({
          username: faker.person.fullName(),
          email: faker.internet.email(),
          password: bcrypt.hashSync(faker.internet.password(), salt),
          is_active: Math.random() > 0.5,
        }),
      );

    console.log(usersData[0]);
    // await db.insert(users).values(usersData as any);
  } catch (err) {
    console.log('Error in seeding users: ', err.message);
  }
}
