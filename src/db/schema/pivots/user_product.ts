import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from '../users';
import { products } from '../products';

export const user_product = pgTable(
  'user_product',
  {
    id: uuid('id').defaultRandom().notNull(),
    user_id: uuid('user_id').references(() => users.id),
    product_id: uuid('product_id').references(() => products.id),

    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.user_id, table.product_id] }),
  }),
);

export const user_product_rel = relations(user_product, ({ one, many }) => ({
  user: one(users, { fields: [user_product.user_id], references: [users.id] }),
  product: one(products, {
    fields: [user_product.product_id],
    references: [products.id],
  }),
}));
