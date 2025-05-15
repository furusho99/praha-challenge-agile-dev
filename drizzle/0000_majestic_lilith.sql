CREATE TABLE "assignment_status" (
	"status" varchar(50) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assignments" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"genre" varchar(100),
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "genre" (
	"name" varchar(100) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "new_assignment_public_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"status" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "new_assignment_status" (
	"status" varchar(50) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_assignments" (
	"users_id" integer NOT NULL,
	"assignments_id" integer NOT NULL,
	"status" varchar(50),
	"is_public" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_assignments_users_id_assignments_id_pk" PRIMARY KEY("users_id","assignments_id")
);
--> statement-breakpoint
CREATE TABLE "users_status" (
	"status" varchar(50) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"season" integer NOT NULL,
	"is_administrator" boolean NOT NULL,
	"status" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_genre_genre_name_fk" FOREIGN KEY ("genre") REFERENCES "public"."genre"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "new_assignment_public_requests" ADD CONSTRAINT "new_assignment_public_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "new_assignment_public_requests" ADD CONSTRAINT "assignment_public_requests_status_fkey" FOREIGN KEY ("status") REFERENCES "public"."new_assignment_status"("status") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_assignments" ADD CONSTRAINT "users_assignments_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_assignments" ADD CONSTRAINT "users_assignments_assignments_id_assignments_id_fk" FOREIGN KEY ("assignments_id") REFERENCES "public"."assignments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_assignments" ADD CONSTRAINT "users_assignments_status_assignment_status_status_fk" FOREIGN KEY ("status") REFERENCES "public"."assignment_status"("status") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_status_users_status_status_fk" FOREIGN KEY ("status") REFERENCES "public"."users_status"("status") ON DELETE no action ON UPDATE no action;