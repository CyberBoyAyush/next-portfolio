"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send, Reply } from "lucide-react";
import { useBlogThemeSafe } from "./blog-theme-provider";

interface Comment {
  id: number;
  blogSlug: string;
  parentId: number | null;
  email: string;
  content: string;
  createdAt: Date | string;
  replies?: Comment[];
}

interface BlogCommentsProps {
  slug: string;
}

export default function BlogComments({ slug }: BlogCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const themeContext = useBlogThemeSafe();
  const isLight = themeContext?.theme === "light";

  useEffect(() => {
    fetch(`/api/blogs/${slug}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments || []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setIsLoading(false);
      });
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !content.trim()) {
      setError("Email and comment are required");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/blogs/${slug}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          content: content.trim(),
          parentId: replyingTo || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit comment");
      }

      const data = await response.json();
      
      if (replyingTo) {
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === replyingTo
              ? {
                  ...comment,
                  replies: [...(comment.replies || []), data.comment],
                }
              : comment
          )
        );
      } else {
        setComments((prev) => [data.comment, ...prev]);
      }

      setEmail("");
      setContent("");
      setReplyingTo(null);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const maskEmail = (email: string) => {
    const [local, domain] = email.split("@");
    if (!local || !domain) return email;
    const maskedLocal = local.length > 2 
      ? `${local[0]}${"*".repeat(local.length - 2)}${local[local.length - 1]}`
      : local;
    return `${maskedLocal}@${domain}`;
  };

  return (
    <section className={`mt-12 pt-8 border-t ${
      isLight ? "border-gray-200" : "border-gray-800"
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${
          isLight ? "text-gray-900" : "text-white"
        }`}>
          Comments
        </h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              isLight
                ? "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
                : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
            }`}
          >
            <MessageSquare size={18} />
            <span className="text-sm font-medium">Add Comment</span>
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className={`mb-8 p-6 rounded-lg border ${
          isLight ? "bg-gray-50 border-gray-200" : "bg-white/5 border-white/10"
        }`}>
          {error && (
            <div className={`mb-4 p-3 rounded border ${
              isLight ? "bg-red-50 border-red-200 text-red-600" : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}>
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isLight ? "text-gray-700" : "text-gray-300"
              }`}>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full px-4 py-2 rounded border ${
                  isLight
                    ? "bg-white border-gray-300 text-gray-900"
                    : "bg-white/5 border-white/10 text-white"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isLight ? "text-gray-700" : "text-gray-300"
              }`}>
                Comment <span className="text-red-500">*</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={4}
                className={`w-full px-4 py-2 rounded border ${
                  isLight
                    ? "bg-white border-gray-300 text-gray-900"
                    : "bg-white/5 border-white/10 text-white"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Share your thoughts..."
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg border transition-all ${
                  isLight
                    ? "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-500 border-blue-500 text-white hover:bg-blue-600"
                } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Send size={16} />
                <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setReplyingTo(null);
                  setEmail("");
                  setContent("");
                  setError("");
                }}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  isLight
                    ? "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
                    : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className={`text-center py-8 ${isLight ? "text-gray-500" : "text-gray-400"}`}>
          Loading comments...
        </div>
      ) : comments.length === 0 ? (
        <div className={`text-center py-8 ${isLight ? "text-gray-500" : "text-gray-400"}`}>
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              slug={slug}
              onReply={(id) => {
                setReplyingTo(id);
                setShowForm(true);
              }}
              isLight={isLight}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function CommentItem({
  comment,
  slug,
  onReply,
  isLight,
}: {
  comment: Comment;
  slug: string;
  onReply: (id: number) => void;
  isLight: boolean;
}) {
  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const maskEmail = (email: string) => {
    const [local, domain] = email.split("@");
    if (!local || !domain) return email;
    const maskedLocal = local.length > 2 
      ? `${local[0]}${"*".repeat(local.length - 2)}${local[local.length - 1]}`
      : local;
    return `${maskedLocal}@${domain}`;
  };

  return (
    <div className={`p-4 rounded-lg border ${
      isLight ? "bg-gray-50 border-gray-200" : "bg-white/5 border-white/10"
    }`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <span className={`text-sm font-medium ${
            isLight ? "text-gray-900" : "text-white"
          }`}>
            {maskEmail(comment.email)}
          </span>
          <span className={`text-xs ml-2 ${
            isLight ? "text-gray-500" : "text-gray-400"
          }`}>
            {formatDate(comment.createdAt)}
          </span>
        </div>
        {!comment.parentId && (
          <button
            onClick={() => onReply(comment.id)}
            className={`flex items-center gap-1 px-2 py-1 text-xs rounded transition-all ${
              isLight
                ? "text-gray-600 hover:bg-gray-100"
                : "text-gray-400 hover:bg-white/10"
            }`}
          >
            <Reply size={12} />
            Reply
          </button>
        )}
      </div>
      <p className={`text-sm leading-relaxed mb-3 ${
        isLight ? "text-gray-700" : "text-gray-300"
      }`}>
        {comment.content}
      </p>
      {comment.replies && comment.replies.length > 0 && (
        <div className={`mt-4 ml-4 space-y-4 border-l-2 pl-4 ${
          isLight ? "border-gray-200" : "border-white/10"
        }`}>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              slug={slug}
              onReply={onReply}
              isLight={isLight}
            />
          ))}
        </div>
      )}
    </div>
  );
}

