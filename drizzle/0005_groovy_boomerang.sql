ALTER TABLE "assignments" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "assignments" ADD COLUMN "version" integer DEFAULT 1 NOT NULL;
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_id_version_pk" PRIMARY KEY("id","version");--> statement-breakpoint
