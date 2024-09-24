import { relations } from 'drizzle-orm';
import {
  doublePrecision,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { product_category } from './pivots/product_category';

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  image_url: varchar('image_url', { length: 1025 }).notNull(),
  quantity: integer('quantity').notNull(),
  price: doublePrecision('price').notNull(),

  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const products_rel = relations(products, ({ one, many }) => ({
  categories: many(product_category),
}));
