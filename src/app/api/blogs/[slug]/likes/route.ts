import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db, blogLikes } from "@/lib/db";
import { eq, and, count } from "drizzle-orm";
import { rateLimit, getClientIdentifier } from "@/lib/rate-limit";
import { randomUUID } from "crypto";

const SESSION_COOKIE_NAME = "blog_session_id";
const SESSION_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

async function getOrCreateSessionId(): Promise<string> {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionId) {
    sessionId = randomUUID();
    cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });
  }

  return sessionId;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const sessionId = await getOrCreateSessionId();

    const [likeCountResult] = await db
      .select({ count: count() })
      .from(blogLikes)
      .where(eq(blogLikes.blogSlug, slug));

    const [userLike] = await db
      .select()
      .from(blogLikes)
      .where(
        and(
          eq(blogLikes.blogSlug, slug),
          eq(blogLikes.sessionId, sessionId)
        )
      )
      .limit(1);

    return NextResponse.json({
      count: likeCountResult.count,
      hasLiked: !!userLike,
    });
  } catch (error) {
    console.error("Error fetching likes:", error);
    return NextResponse.json(
      { error: "Failed to fetch likes" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const clientId = getClientIdentifier(request);
    const rateLimitResult = rateLimit(clientId, {
      maxRequests: 10,
      windowMs: 60000,
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const sessionId = await getOrCreateSessionId();

    const [existingLike] = await db
      .select()
      .from(blogLikes)
      .where(
        and(
          eq(blogLikes.blogSlug, slug),
          eq(blogLikes.sessionId, sessionId)
        )
      )
      .limit(1);

    if (existingLike) {
      await db
        .delete(blogLikes)
        .where(
          and(
            eq(blogLikes.blogSlug, slug),
            eq(blogLikes.sessionId, sessionId)
          )
        );

      return NextResponse.json({ action: "unliked", liked: false });
    } else {
      await db.insert(blogLikes).values({
        blogSlug: slug,
        sessionId,
      });

      return NextResponse.json({ action: "liked", liked: true });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { error: "Failed to toggle like" },
      { status: 500 }
    );
  }
}

