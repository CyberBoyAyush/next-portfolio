CREATE INDEX "blog_comments_blog_slug_idx" ON "blog_comments" USING btree ("blog_slug");--> statement-breakpoint
CREATE INDEX "blog_comments_parent_id_idx" ON "blog_comments" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "blog_likes_blog_slug_idx" ON "blog_likes" USING btree ("blog_slug");--> statement-breakpoint
ALTER TABLE "blog_likes" ADD CONSTRAINT "blog_likes_unique" UNIQUE("blog_slug","session_id");