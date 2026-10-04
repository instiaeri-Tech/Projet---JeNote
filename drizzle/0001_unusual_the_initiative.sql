CREATE TABLE `conversation_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`noteId` int,
	`scenario` varchar(64) NOT NULL,
	`level` enum('essentiel','standard','defi') NOT NULL DEFAULT 'standard',
	`status` enum('active','completed') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `conversation_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `conversation_turns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` int NOT NULL,
	`userId` int NOT NULL,
	`role` enum('user','assistant','feedback') NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `conversation_turns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `entitlements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`plan` enum('free','premium','team') NOT NULL DEFAULT 'free',
	`monthlyGenerations` int NOT NULL DEFAULT 10,
	`usedGenerations` int NOT NULL DEFAULT 0,
	`renewsAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `entitlements_id` PRIMARY KEY(`id`),
	CONSTRAINT `entitlements_user_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `exercise_attempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`exerciseId` int NOT NULL,
	`userId` int NOT NULL,
	`answerGiven` text NOT NULL,
	`feedback` text NOT NULL,
	`errorType` varchar(64),
	`isCorrect` boolean NOT NULL,
	`durationSeconds` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exercise_attempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `exercises` (
	`id` int AUTO_INCREMENT NOT NULL,
	`resourceId` int NOT NULL,
	`userId` int NOT NULL,
	`type` varchar(32) NOT NULL DEFAULT 'recall',
	`prompt` text NOT NULL,
	`answer` text NOT NULL,
	`options` text,
	`skill` varchar(32) NOT NULL DEFAULT 'expression',
	`position` int NOT NULL DEFAULT 0,
	CONSTRAINT `exercises_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `learning_resources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`noteId` int NOT NULL,
	`userId` int NOT NULL,
	`targetExpression` text NOT NULL,
	`variants` text NOT NULL,
	`explanation` text NOT NULL,
	`vocabulary` text NOT NULL,
	`grammarPoint` text NOT NULL,
	`difficulty` int NOT NULL DEFAULT 2,
	`promptVersion` varchar(32) NOT NULL DEFAULT 'v1',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `learning_resources_id` PRIMARY KEY(`id`),
	CONSTRAINT `resources_note_unique` UNIQUE(`noteId`)
);
--> statement-breakpoint
CREATE TABLE `notes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`sourceText` text NOT NULL,
	`context` varchar(40) NOT NULL DEFAULT 'autre',
	`sourceLanguage` varchar(12) NOT NULL DEFAULT 'fr',
	`targetLanguage` varchar(12) NOT NULL DEFAULT 'en',
	`level` enum('essentiel','standard','defi') NOT NULL DEFAULT 'standard',
	`status` enum('draft','ready','needs_clarification','error') NOT NULL DEFAULT 'draft',
	`tags` text,
	`isFavorite` boolean NOT NULL DEFAULT false,
	`deletedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `notes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `review_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`exerciseId` int NOT NULL,
	`dueAt` timestamp NOT NULL,
	`intervalDays` int NOT NULL DEFAULT 1,
	`difficulty` int NOT NULL DEFAULT 2,
	`lastResult` boolean,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `review_items_id` PRIMARY KEY(`id`),
	CONSTRAINT `reviews_exercise_unique` UNIQUE(`userId`,`exerciseId`)
);
--> statement-breakpoint
CREATE TABLE `security_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`action` varchar(80) NOT NULL,
	`outcome` varchar(32) NOT NULL,
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `security_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `conversation_sessions` ADD CONSTRAINT `conversation_sessions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `conversation_sessions` ADD CONSTRAINT `conversation_sessions_noteId_notes_id_fk` FOREIGN KEY (`noteId`) REFERENCES `notes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `conversation_turns` ADD CONSTRAINT `conversation_turns_sessionId_conversation_sessions_id_fk` FOREIGN KEY (`sessionId`) REFERENCES `conversation_sessions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `conversation_turns` ADD CONSTRAINT `conversation_turns_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `entitlements` ADD CONSTRAINT `entitlements_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `exercise_attempts` ADD CONSTRAINT `exercise_attempts_exerciseId_exercises_id_fk` FOREIGN KEY (`exerciseId`) REFERENCES `exercises`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `exercise_attempts` ADD CONSTRAINT `exercise_attempts_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `exercises` ADD CONSTRAINT `exercises_resourceId_learning_resources_id_fk` FOREIGN KEY (`resourceId`) REFERENCES `learning_resources`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `exercises` ADD CONSTRAINT `exercises_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `learning_resources` ADD CONSTRAINT `learning_resources_noteId_notes_id_fk` FOREIGN KEY (`noteId`) REFERENCES `notes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `learning_resources` ADD CONSTRAINT `learning_resources_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notes` ADD CONSTRAINT `notes_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `review_items` ADD CONSTRAINT `review_items_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `review_items` ADD CONSTRAINT `review_items_exerciseId_exercises_id_fk` FOREIGN KEY (`exerciseId`) REFERENCES `exercises`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `security_events` ADD CONSTRAINT `security_events_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `conversation_user_updated_idx` ON `conversation_sessions` (`userId`,`updatedAt`);--> statement-breakpoint
CREATE INDEX `conversation_turns_session_idx` ON `conversation_turns` (`sessionId`,`createdAt`);--> statement-breakpoint
CREATE INDEX `attempts_user_created_idx` ON `exercise_attempts` (`userId`,`createdAt`);--> statement-breakpoint
CREATE INDEX `attempts_exercise_idx` ON `exercise_attempts` (`exerciseId`);--> statement-breakpoint
CREATE INDEX `exercises_resource_idx` ON `exercises` (`resourceId`);--> statement-breakpoint
CREATE INDEX `exercises_user_idx` ON `exercises` (`userId`);--> statement-breakpoint
CREATE INDEX `resources_user_created_idx` ON `learning_resources` (`userId`,`createdAt`);--> statement-breakpoint
CREATE INDEX `notes_user_updated_idx` ON `notes` (`userId`,`updatedAt`);--> statement-breakpoint
CREATE INDEX `notes_user_status_idx` ON `notes` (`userId`,`status`);--> statement-breakpoint
CREATE INDEX `reviews_user_due_idx` ON `review_items` (`userId`,`dueAt`);--> statement-breakpoint
CREATE INDEX `security_events_created_idx` ON `security_events` (`createdAt`);