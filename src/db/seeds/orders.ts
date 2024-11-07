import { DrizzleDB } from '../drizzle';
import { Order, orders, users } from '../schema';
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

    const ordersData = await Array(50)
      .fill('')
      .map(
        (_, index) =>
          ({
            user_id: user.id,
            price: faker.number.float({ max: 999999999 }),
            checkout_id: `${index} ${faker.finance.iban()}`,
            status: Math.random() > 0.5 ? 'await_payment' : 'cash_delivery',
          }) as Order,
      );

    await db.insert(orders).values(ordersData);
  } catch (err) {
    console.log('Error in seeding orders: ', err.message);
  }
}
