CREATE TABLE `blogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`title` varchar(100) NOT NULL,
	`description` varchar(1000) NOT NULL,
	`image_url` varchar(1000) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`previous_hash` varchar(150) NOT NULL,
	`hash` varchar(150) NOT NULL,
	`type` varchar(100) NOT NULL,
	`reference_to` int NOT NULL,
	`version` int NOT NULL,
	CONSTRAINT `blogs_id` PRIMARY KEY(`id`),
	CONSTRAINT `blogs_previous_hash_unique` UNIQUE(`previous_hash`),
	CONSTRAINT `blogs_hash_unique` UNIQUE(`hash`)
);
--> statement-breakpoint
CREATE TABLE `likes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`blog_id` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`previous_hash` varchar(150) NOT NULL,
	`hash` varchar(150) NOT NULL,
	`type` varchar(100) NOT NULL,
	`reference_to` int NOT NULL,
	`version` int NOT NULL,
	CONSTRAINT `likes_id` PRIMARY KEY(`id`),
	CONSTRAINT `likes_previous_hash_unique` UNIQUE(`previous_hash`),
	CONSTRAINT `likes_hash_unique` UNIQUE(`hash`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`previous_hash` varchar(150) NOT NULL,
	`hash` varchar(150) NOT NULL,
	`profile_picture` varchar(1000) NOT NULL,
	`type` varchar(100) NOT NULL,
	`reference_to` int NOT NULL,
	`version` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_previous_hash_unique` UNIQUE(`previous_hash`),
	CONSTRAINT `users_hash_unique` UNIQUE(`hash`)
);
--> statement-breakpoint
ALTER TABLE `blogs` ADD CONSTRAINT `blogs_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `likes` ADD CONSTRAINT `likes_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `likes` ADD CONSTRAINT `likes_blog_id_blogs_id_fk` FOREIGN KEY (`blog_id`) REFERENCES `blogs`(`id`) ON DELETE no action ON UPDATE no action;