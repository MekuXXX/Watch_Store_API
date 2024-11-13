DO $$ BEGIN
 CREATE TYPE "public"."coupon_type" AS ENUM('value', 'percentage');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "coupons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" "coupon_type" NOT NULL,
	"discount_value" double precision NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"expiration_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "coupons_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "coupon_product" (
	"coupon_id" uuid,
	"product_id" uuid
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coupon_product" ADD CONSTRAINT "coupon_product_coupon_id_coupons_id_fk" FOREIGN KEY ("coupon_id") REFERENCES "public"."coupons"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coupon_product" ADD CONSTRAINT "coupon_product_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
