import { relations } from 'drizzle-orm';
import {
  doublePrecision,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { order_product } from './pivots/order_product';

export const ORDER_STATUS = pgEnum('order_status', [
  'await_payment',
  'shipping',
  'finished',
]);

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id')
    .notNull()
    .references(() => users.id),
  checkout_id: varchar('checkoutId').notNull(),
  price: doublePrecision('price').notNull(),
  status: ORDER_STATUS('order_status').notNull().default('await_payment'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const orders_rel = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.user_id],
    references: [users.id],
  }),

  order_items: many(order_product),
}));

export type Order = typeof orders.$inferSelect;

export type OrderStatus = (typeof ORDER_STATUS.enumValues)[number];
