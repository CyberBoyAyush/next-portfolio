import { NextRequest, NextResponse } from "next/server";
import { db, blogComments } from "@/lib/db";
import { eq, and, isNull, desc } from "drizzle-orm";
import { rateLimit, getClientIdentifier } from "@/lib/rate-limit";
import { isValidEmail, sanitizeEmailContent, INPUT_LIMITS } from "@/lib/input-validation";

function moderateComment(content: string): { approved: boolean; reason?: string } {
  const trimmed = content.trim();

  if (trimmed.length < 10) {
    return { approved: false, reason: "Comment is too short (minimum 10 characters)" };
  }

  if (trimmed.length > 2000) {
    return { approved: false, reason: "Comment is too long (maximum 2000 characters)" };
  }

  // Count URLs by parsing words - safer than regex to avoid ReDoS
  const words = trimmed.split(/\s+/);
  const urlCount = words.filter((word) => {
    try {
      const url = new URL(word);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }).length;

  if (urlCount > 2) {
    return { approved: false, reason: "Too many URLs (maximum 2 allowed)" };
  }

  return { approved: true };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const allComments = await db
      .select()
      .from(blogComments)
      .where(eq(blogComments.blogSlug, slug))
      .orderBy(desc(blogComments.createdAt));

    const topLevelComments = allComments.filter((c) => !c.parentId);
    const repliesMap = new Map<number, typeof allComments>();

    allComments.forEach((comment) => {
      if (comment.parentId) {
        if (!repliesMap.has(comment.parentId)) {
          repliesMap.set(comment.parentId, []);
        }
        repliesMap.get(comment.parentId)!.push(comment);
      }
    });

    const commentsWithReplies = topLevelComments.map((comment) => ({
      ...comment,
      replies: repliesMap.get(comment.id) || [],
    }));

    return NextResponse.json({ comments: commentsWithReplies });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
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
      maxRequests: 5,
      windowMs: 60000,
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, content, parentId } = body;

    if (!email || !content) {
      return NextResponse.json(
        { error: "Email and content are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const moderation = moderateComment(content);
    if (!moderation.approved) {
      return NextResponse.json(
        { error: moderation.reason },
        { status: 400 }
      );
    }

    const sanitizedContent = sanitizeEmailContent(content);
    const sanitizedEmail = email.trim().toLowerCase();

    if (parentId) {
      const parentComment = await db
        .select()
        .from(blogComments)
        .where(
          and(
            eq(blogComments.id, parentId),
            eq(blogComments.blogSlug, slug)
          )
        )
        .limit(1);

      if (parentComment.length === 0) {
        return NextResponse.json(
          { error: "Parent comment not found" },
          { status: 404 }
        );
      }

      if (parentComment[0].parentId) {
        return NextResponse.json(
          { error: "Cannot reply to a reply (only one level of nesting allowed)" },
          { status: 400 }
        );
      }
    }

    const [newComment] = await db
      .insert(blogComments)
      .values({
        blogSlug: slug,
        email: sanitizedEmail,
        content: sanitizedContent,
        parentId: parentId || null,
      })
      .returning();

    return NextResponse.json({ comment: newComment }, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}

