import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { users } from './users';
import { relations } from 'drizzle-orm';

export const user_addresses = pgTable('user_addresses', {
  id: uuid('id').primaryKey().defaultRandom(),
  country: varchar('country', { length: 255 }).notNull(),
  city: varchar('city', { length: 255 }).notNull(),
  state: varchar('state', { length: 255 }).notNull(),
  street: varchar('street', { length: 255 }).notNull(),
  zipcode: varchar('zipcode', { length: 255 }).notNull(),

  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),

  user_id: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const user_addresses_rel = relations(user_addresses, ({ one }) => ({
  user: one(users, {
    fields: [user_addresses.user_id],
    references: [users.id],
  }),
}));

export type UserAddresses = typeof user_addresses.$inferSelect;
