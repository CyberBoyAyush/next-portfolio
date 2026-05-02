import { createFileRoute } from '@tanstack/react-router';
import { and, desc, eq } from 'drizzle-orm';
import { blogComments, getDb } from '@/lib/db';
import { getClientIdentifier, rateLimit } from '@/lib/rate-limit';
import { isValidEmail, sanitizeEmailContent } from '@/lib/input-validation';

function moderateComment(content: string): { approved: boolean; reason?: string } {
  const trimmed = content.trim();
  if (trimmed.length < 10) return { approved: false, reason: 'Comment is too short (minimum 10 characters)' };
  if (trimmed.length > 2000) return { approved: false, reason: 'Comment is too long (maximum 2000 characters)' };

  const urlCount = trimmed.split(/\s+/).filter((word) => {
    try {
      const url = new URL(word);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }).length;

  if (urlCount > 2) return { approved: false, reason: 'Too many URLs (maximum 2 allowed)' };
  return { approved: true };
}

export const Route = createFileRoute('/api/blogs/$slug/comments')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const db = getDb();
          const allComments = await db.select().from(blogComments).where(eq(blogComments.blogSlug, params.slug)).orderBy(desc(blogComments.createdAt));
          const topLevelComments = allComments.filter((comment) => !comment.parentId);
          const repliesMap = new Map<number, typeof allComments>();

          allComments.forEach((comment) => {
            if (!comment.parentId) return;
            if (!repliesMap.has(comment.parentId)) repliesMap.set(comment.parentId, []);
            repliesMap.get(comment.parentId)?.push(comment);
          });

          return Response.json({ comments: topLevelComments.map((comment) => ({ ...comment, replies: repliesMap.get(comment.id) || [] })) });
        } catch (error) {
          console.error('Error fetching comments:', error);
          return Response.json({ error: 'Failed to fetch comments' }, { status: 500 });
        }
      },
      POST: async ({ request, params }) => {
        try {
          const db = getDb();
          const clientId = getClientIdentifier(request);
          const rateLimitResult = rateLimit(clientId, { maxRequests: 5, windowMs: 60000 });
          if (!rateLimitResult.success) {
            return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
          }

          const body = await request.json() as { email?: string; content?: string; parentId?: number | null };
          const { email, content, parentId } = body;
          if (!email || !content) return Response.json({ error: 'Email and content are required' }, { status: 400 });
          if (!isValidEmail(email)) return Response.json({ error: 'Invalid email address' }, { status: 400 });

          const sanitizedContent = sanitizeEmailContent(content);
          const sanitizedEmail = email.trim().toLowerCase();
          const moderation = moderateComment(sanitizedContent);
          if (!moderation.approved) return Response.json({ error: moderation.reason }, { status: 400 });

          if (parentId) {
            const parentComment = await db.select().from(blogComments).where(and(eq(blogComments.id, parentId), eq(blogComments.blogSlug, params.slug))).limit(1);
            if (parentComment.length === 0) return Response.json({ error: 'Parent comment not found' }, { status: 404 });
            if (parentComment[0].parentId) return Response.json({ error: 'Cannot reply to a reply (only one level of nesting allowed)' }, { status: 400 });
          }

          const [newComment] = await db.insert(blogComments).values({ blogSlug: params.slug, email: sanitizedEmail, content: sanitizedContent, parentId: parentId || null }).returning();
          return Response.json({ comment: newComment }, { status: 201 });
        } catch (error) {
          console.error('Error creating comment:', error);
          return Response.json({ error: 'Failed to create comment' }, { status: 500 });
        }
      },
    },
  },
});
