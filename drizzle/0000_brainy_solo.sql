CREATE TABLE "blog_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"blog_slug" text NOT NULL,
	"parent_id" integer,
	"email" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_likes" (
	"id" serial PRIMARY KEY NOT NULL,
	"blog_slug" text NOT NULL,
	"session_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
