ALTER TABLE "activate_tokens" DROP CONSTRAINT "activate_tokens_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "forget_password_tokens" DROP CONSTRAINT "forget_password_tokens_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activate_tokens" ADD CONSTRAINT "activate_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forget_password_tokens" ADD CONSTRAINT "forget_password_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
