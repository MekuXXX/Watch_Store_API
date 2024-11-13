import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { coupons } from '../coupons';
import { products } from '../products';
import { relations } from 'drizzle-orm';

export const coupon_product = pgTable('coupon_product', {
  coupon_id: uuid('coupon_id').references(() => coupons.id),
  product_id: uuid('product_id').references(() => products.id),
});

export const coupon_products_rel = relations(
  coupon_product,
  ({ one, many }) => ({
    product: one(products, {
      fields: [coupon_product.product_id],
      references: [products.id],
    }),

    category: one(coupons, {
      fields: [coupon_product.coupon_id],
      references: [coupons.id],
    }),
  }),
);
