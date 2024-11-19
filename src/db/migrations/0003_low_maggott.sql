ALTER TABLE "coupon_product" DROP CONSTRAINT "coupon_product_coupon_id_coupons_id_fk";
--> statement-breakpoint
ALTER TABLE "coupon_product" DROP CONSTRAINT "coupon_product_product_id_products_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coupon_product" ADD CONSTRAINT "coupon_product_coupon_id_coupons_id_fk" FOREIGN KEY ("coupon_id") REFERENCES "public"."coupons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coupon_product" ADD CONSTRAINT "coupon_product_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user_product" DROP COLUMN IF EXISTS "id";