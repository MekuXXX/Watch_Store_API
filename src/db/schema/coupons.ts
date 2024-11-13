import {
  pgTable,
  uuid,
  varchar,
  doublePrecision,
  boolean,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { coupon_product } from './pivots/coupon_products';
export const COUPON_TYPE = pgEnum('coupon_type', ['value', 'percentage']);

// TODO: Add seller coupon functionality
export const coupons = pgTable('coupons', {
  id: uuid('id').primaryKey().defaultRandom(),
  coupon: varchar('name', { length: 255 }).notNull().unique(),
  type: COUPON_TYPE('type').notNull(),
  value: doublePrecision('discount_value').notNull(),
  is_active: boolean('is_active').default(true).notNull(),
  expiration_date: timestamp('expiration_date').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const coupons_rel = relations(coupons, ({ one, many }) => ({
  products: many(coupon_product),
}));

export type Coupon = typeof coupons.$inferSelect;
export type CouponType = (typeof COUPON_TYPE.enumValues)[number];
