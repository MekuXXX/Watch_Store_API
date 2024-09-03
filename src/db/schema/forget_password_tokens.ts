import { boolean, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';
import { relations } from 'drizzle-orm';

export const forget_password_tokens = pgTable('forget_password_tokens', {
  id: uuid('id').primaryKey().defaultRandom(),
  token: uuid('token').defaultRandom().notNull(),
  expiration_date: timestamp('expiration_date').notNull(),
  is_used: boolean('is_used').notNull().default(false),

  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),

  user_id: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const forget_password_tokens_rel = relations(
  forget_password_tokens,
  ({ one }) => ({
    user: one(users, {
      fields: [forget_password_tokens.user_id],
      references: [users.id],
    }),
  }),
);

export type ForgetPasswordToken = typeof forget_password_tokens.$inferSelect;
