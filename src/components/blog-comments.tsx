"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send, Reply, X, BadgeCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeSafe } from "./theme-provider";

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
  const themeContext = useThemeSafe();
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
    <section className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h2 className={`text-2xl font-bold ${
            isLight ? "text-gray-900" : "text-white"
          }`}>
            Comments
          </h2>
          <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${
            isLight 
              ? "bg-gray-100 text-gray-600" 
              : "bg-white/10 text-gray-300"
          }`}>
            {comments.length}
          </span>
        </div>
        {!showForm && (
          <motion.button
            onClick={() => setShowForm(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium text-sm ${
              isLight
                ? "bg-black text-white hover:bg-gray-800 shadow-lg shadow-gray-200/50"
                : "bg-white text-black hover:bg-gray-200 shadow-lg shadow-black/20"
            }`}
          >
            <MessageSquare size={16} />
            <span>Write a comment</span>
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleSubmit}
            className={`mb-8 p-6 sm:p-8 rounded-xl border backdrop-blur-xl shadow-2xl ${
              isLight
                ? "bg-white/80 border-gray-200/60 shadow-gray-200/20"
                : "bg-[#161b22]/80 border-gray-800/60 shadow-black/40"
            }`}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className={`text-xl font-bold tracking-tight ${
                isLight ? "text-gray-900" : "text-white"
              }`}>
                {replyingTo ? "Reply to Comment" : "Add a Comment"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setReplyingTo(null);
                  setEmail("");
                  setContent("");
                  setError("");
                }}
                className={`p-2 rounded-full transition-colors ${
                  isLight
                    ? "hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                    : "hover:bg-white/10 text-gray-500 hover:text-gray-300"
                }`}
              >
                <X size={20} />
              </button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-lg text-sm font-medium border ${
                  isLight
                    ? "bg-red-50 border-red-200 text-red-600"
                    : "bg-red-950/20 border-red-900/30 text-red-400"
                }`}
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-6">
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                  isLight ? "text-gray-500" : "text-gray-400"
                }`}>
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-all text-sm ${
                    isLight
                      ? "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-gray-400"
                      : "bg-[#0d1117] border-gray-800 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-gray-600"
                  } focus:outline-none`}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                  isLight ? "text-gray-500" : "text-gray-400"
                }`}>
                  Comment <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border transition-all text-sm resize-none ${
                    isLight
                      ? "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-gray-400"
                      : "bg-[#0d1117] border-gray-800 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-gray-600"
                  } focus:outline-none`}
                  placeholder="Share your thoughts..."
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition-all shadow-lg shadow-blue-500/20 ${
                    isLight
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-600 text-white hover:bg-blue-500"
                  } ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Post Comment</span>
                    </>
                  )}
                </motion.button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setReplyingTo(null);
                    setEmail("");
                    setContent("");
                    setError("");
                  }}
                  className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                    isLight
                      ? "bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                      : "bg-transparent text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center py-12 ${isLight ? "text-gray-500" : "text-gray-400"}`}
        >
          <div className="inline-flex items-center gap-2">
            <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-75" />
            <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-150" />
          </div>
          <p className="mt-3 text-sm">Loading comments...</p>
        </motion.div>
      ) : comments.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center py-12 px-4 rounded-xl border backdrop-blur-sm ${
            isLight
              ? "bg-gray-50/50 border-gray-200/60 text-gray-500"
              : "bg-white/5 border-white/10 text-gray-400"
          }`}
        >
          <MessageSquare size={32} className="mx-auto mb-3 opacity-50" />
          <p className="text-sm font-medium">No comments yet</p>
          <p className="text-xs mt-1 opacity-75">Be the first to share your thoughts!</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {comments.map((comment, index) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                slug={slug}
                onReply={(id) => {
                  setReplyingTo(id);
                  setShowForm(true);
                }}
                isLight={isLight}
                index={index}
              />
            ))}
          </AnimatePresence>
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
  index = 0,
}: {
  comment: Comment;
  slug: string;
  onReply: (id: number) => void;
  isLight: boolean;
  index?: number;
}) {
  const isReply = !!comment.parentId;

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

  const isAuthor = comment.email.toLowerCase() === "hi@aysh.me";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`group ${
        isReply 
          ? "mt-6 pl-4 sm:pl-0" 
          : "py-6 sm:py-8 border-b last:border-0"
      } ${
        !isReply && (isLight ? "border-gray-100" : "border-gray-800")
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
          <div className={`w-10 h-10 rounded-full flex shrink-0 items-center justify-center text-sm font-bold shadow-inner ${
            isAuthor
              ? isLight
                ? "bg-linear-to-br from-blue-500 to-indigo-600 text-white"
                : "bg-linear-to-br from-blue-500 to-indigo-600 text-white"
              : isLight
              ? "bg-linear-to-br from-gray-100 to-gray-200 text-gray-600"
              : "bg-linear-to-br from-gray-800 to-gray-900 text-gray-400"
          }`}>
          {maskEmail(comment.email).charAt(0).toUpperCase()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-sm font-semibold ${
                isLight ? "text-gray-900" : "text-white"
              }`}>
                {isAuthor ? "Ayush Sharma" : maskEmail(comment.email)}
              </span>
              {isAuthor && (
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                  isLight
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                }`}>
                  <BadgeCheck size={12} />
                  Author
                </span>
              )}
              <span className={`text-xs ${
                isLight ? "text-gray-400" : "text-gray-500"
              }`}>
                {formatDate(comment.createdAt)}
              </span>
            </div>
            
            {!comment.parentId && (
              <motion.button
                onClick={() => onReply(comment.id)}
                className={`flex items-center gap-1.5 text-xs font-medium transition-colors opacity-0 group-hover:opacity-100 ${
                  isLight
                    ? "text-gray-500 hover:text-black"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                <Reply size={14} />
                Reply
              </motion.button>
            )}
          </div>

          <p className={`text-sm sm:text-base leading-relaxed ${
            isLight ? "text-gray-600" : "text-gray-300"
          }`}>
            {comment.content}
          </p>

          {comment.replies && comment.replies.length > 0 && (
            <div className={`mt-6 space-y-6 ${
              isReply ? "" : "pl-4 sm:pl-6 border-l-2 " + (isLight ? "border-gray-100" : "border-gray-800")
            }`}>
              {comment.replies.map((reply, replyIndex) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  slug={slug}
                  onReply={onReply}
                  isLight={isLight}
                  index={replyIndex}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

