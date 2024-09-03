ALTER TABLE "users" ADD COLUMN "is_active" boolean;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");