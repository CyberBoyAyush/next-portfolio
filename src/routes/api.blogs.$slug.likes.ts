import { createFileRoute } from '@tanstack/react-router';
import { getCookie, setCookie } from '@tanstack/react-start/server';
import { randomUUID } from 'node:crypto';
import { and, count, eq } from 'drizzle-orm';
import { blogLikes, getDb } from '@/lib/db';
import { getClientIdentifier, rateLimit } from '@/lib/rate-limit';

const SESSION_COOKIE_NAME = 'blog_session_id';
const SESSION_MAX_AGE = 60 * 60 * 24 * 365;

function getOrCreateSessionId(): string {
  const existingSessionId = getCookie(SESSION_COOKIE_NAME);
  if (existingSessionId) return existingSessionId;

  const sessionId = randomUUID();
  setCookie(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
  return sessionId;
}

export const Route = createFileRoute('/api/blogs/$slug/likes')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const db = getDb();
          const sessionId = getOrCreateSessionId();
          const [likeCountResult] = await db.select({ count: count() }).from(blogLikes).where(eq(blogLikes.blogSlug, params.slug));
          const [userLike] = await db.select().from(blogLikes).where(and(eq(blogLikes.blogSlug, params.slug), eq(blogLikes.sessionId, sessionId))).limit(1);
          return Response.json({ count: likeCountResult.count, hasLiked: !!userLike });
        } catch (error) {
          console.error('Error fetching likes:', error);
          return Response.json({ error: 'Failed to fetch likes' }, { status: 500 });
        }
      },
      POST: async ({ request, params }) => {
        try {
          const db = getDb();
          const clientId = getClientIdentifier(request);
          const rateLimitResult = rateLimit(clientId, { maxRequests: 10, windowMs: 60000 });
          if (!rateLimitResult.success) {
            return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
          }

          const sessionId = getOrCreateSessionId();
          const [existingLike] = await db.select().from(blogLikes).where(and(eq(blogLikes.blogSlug, params.slug), eq(blogLikes.sessionId, sessionId))).limit(1);

          if (existingLike) {
            await db.delete(blogLikes).where(and(eq(blogLikes.blogSlug, params.slug), eq(blogLikes.sessionId, sessionId)));
            return Response.json({ action: 'unliked', liked: false });
          }

          await db.insert(blogLikes).values({ blogSlug: params.slug, sessionId });
          return Response.json({ action: 'liked', liked: true });
        } catch (error) {
          console.error('Error toggling like:', error);
          return Response.json({ error: 'Failed to toggle like' }, { status: 500 });
        }
      },
    },
  },
});
