import { relations } from 'drizzle-orm';
import { integer, pgTable, uuid } from 'drizzle-orm/pg-core';
import { orders } from '../orders';
import { products } from '../products';

export const order_product = pgTable('order_product', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  order_id: uuid('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),

  product_id: uuid('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),

  quantity: integer('quantity').notNull(),
});

export const order_product_rel = relations(order_product, ({ one, many }) => ({
  order: one(orders, {
    fields: [order_product.order_id],
    references: [orders.id],
  }),

  product: one(products, {
    fields: [order_product.product_id],
    references: [products.id],
  }),
}));
