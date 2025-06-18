CREATE TABLE "users_suspension" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"from_year" integer NOT NULL,
	"from_month" integer NOT NULL,
	"until_year" integer NOT NULL,
	"until_month" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users_suspension" ADD CONSTRAINT "users_suspension_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;