import { pgTable, primaryKey, timestamp, uuid } from 'drizzle-orm/pg-core';
import { categories } from '../categories';
import { products } from '../products';
import { relations } from 'drizzle-orm';

export const product_category = pgTable(
  'product_category',
  {
    product_id: uuid('product_id')
      .references(() => products.id, { onDelete: 'cascade' })
      .notNull(),
    category_id: uuid('category_id')
      .references(() => categories.id, { onDelete: 'cascade' })
      .notNull(),

    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.category_id, table.product_id] }),
  }),
);

export const product_category_rel = relations(
  product_category,
  ({ one, many }) => ({
    product: one(products, {
      fields: [product_category.product_id],
      references: [products.id],
    }),
    category: one(categories, {
      fields: [product_category.category_id],
      references: [categories.id],
    }),
  }),
);
