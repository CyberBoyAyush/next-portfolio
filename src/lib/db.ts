import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  index,
  unique,
  AnyPgColumn,
} from "drizzle-orm/pg-core";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle({ client: sql });

export const blogLikes = pgTable(
  "blog_likes",
  {
    id: serial("id").primaryKey(),
    blogSlug: text("blog_slug").notNull(),
    sessionId: text("session_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("blog_likes_blog_slug_idx").on(table.blogSlug),
    unique("blog_likes_unique").on(table.blogSlug, table.sessionId),
  ]
);

export const blogComments = pgTable(
  "blog_comments",
  {
    id: serial("id").primaryKey(),
    blogSlug: text("blog_slug").notNull(),
    parentId: integer("parent_id").references((): AnyPgColumn => blogComments.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("blog_comments_blog_slug_idx").on(table.blogSlug),
    index("blog_comments_parent_id_idx").on(table.parentId),
  ]
);

