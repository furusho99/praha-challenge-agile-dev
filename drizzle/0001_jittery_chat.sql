ALTER TABLE "new_assignment_public_requests" DROP CONSTRAINT "new_assignment_public_requests_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users_assignments" DROP CONSTRAINT "users_assignments_users_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "new_assignment_public_requests" ALTER COLUMN "user_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "users_assignments" ALTER COLUMN "users_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE varchar(36);