import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

export const blogLikes = pgTable("blog_likes", {
  id: serial("id").primaryKey(),
  blogSlug: text("blog_slug").notNull(),
  sessionId: text("session_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogComments = pgTable("blog_comments", {
  id: serial("id").primaryKey(),
  blogSlug: text("blog_slug").notNull(),
  parentId: integer("parent_id"),
  email: text("email").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

