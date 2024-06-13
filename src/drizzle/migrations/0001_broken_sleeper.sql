ALTER TABLE `blogs` MODIFY COLUMN `reference_to` int NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `blogs` MODIFY COLUMN `version` int NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `likes` MODIFY COLUMN `reference_to` int NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `likes` MODIFY COLUMN `version` int NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `profile_picture` varchar(1000);--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `reference_to` int NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `version` int NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `updated_at`;