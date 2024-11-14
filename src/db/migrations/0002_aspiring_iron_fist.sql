ALTER TYPE "order_status" ADD VALUE 'cancelled';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "configurations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" varchar NOT NULL,
	"value" varchar NOT NULL,
	"type" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "configurations_key_unique" UNIQUE("key")
);
