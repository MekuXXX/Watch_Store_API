import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { product_category } from './pivots/product_category';

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  cover_url: varchar('cover_url', { length: 1025 }).notNull(),

  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const categories_rel = relations(categories, ({ one, many }) => ({
  products: many(product_category),
}));

export type Category = typeof categories.$inferSelect;
