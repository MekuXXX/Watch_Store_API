ALTER TABLE "activate_tokens" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "forget_password_tokens" ALTER COLUMN "user_id" SET NOT NULL;