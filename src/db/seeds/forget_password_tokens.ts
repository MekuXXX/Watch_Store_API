import moment from 'moment';
import type { DrizzleDB } from '../drizzle.d.ts';
import { forget_password_tokens, users } from '../schema';
import env from 'src/utils/env';
import { faker } from '@faker-js/faker';

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

    const forgertTokens = await Promise.all(
      Array(50)
        .fill('')
        .map((_) => ({
          user_id: user.id,
          expiration_date: moment()
            .add(env.ACTIVATE_TOKENS_EXPIRATION, 'milliseconds')
            .toDate(),
          is_used: Math.random() > 0.5,
        })),
    );

    await db.insert(forget_password_tokens).values(forgertTokens);
  } catch (error) {
    throw new Error('Error happen durring seeding of activate tokens');
  }
}
