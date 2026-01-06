"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeSafe } from "./theme-provider";

interface BlogLikeButtonProps {
  slug: string;
}

export default function BlogLikeButton({ slug }: BlogLikeButtonProps) {
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  const [justLiked, setJustLiked] = useState(false);
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === "light";

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/blogs/${slug}/likes`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setLikeCount(data.count || 0);
        setHasLiked(data.hasLiked || false);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        console.error("Error fetching likes:", error);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [slug]);

  const handleToggleLike = async () => {
    if (isToggling) return;

    setIsToggling(true);
    try {
      const response = await fetch(`/api/blogs/${slug}/likes`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to toggle like");
      }

      const data = await response.json();
      const wasLiked = hasLiked;
      setHasLiked(data.liked);
      setLikeCount((prev) => (data.liked ? prev + 1 : prev - 1));
      
      if (data.liked && !wasLiked) {
        setJustLiked(true);
        setTimeout(() => setJustLiked(false), 600);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsToggling(false);
    }
  };

  if (isLoading) {
    return (
      <div className={`flex items-center gap-2 px-6 py-3 rounded-xl border backdrop-blur-xl transition-all ${
        isLight
          ? "bg-gray-50/80 border-gray-200 text-gray-400"
          : "bg-white/5 border-white/10 text-gray-400"
      }`}>
        <Heart size={20} className="animate-pulse" />
        <span className="text-sm font-medium">...</span>
      </div>
    );
  }

  return (
    <motion.button
      onClick={handleToggleLike}
      disabled={isToggling}
      aria-label={hasLiked ? `Unlike this post, currently ${likeCount} likes` : `Like this post, currently ${likeCount} likes`}
      aria-pressed={hasLiked}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative flex items-center gap-3 px-8 py-3 rounded-full border backdrop-blur-md transition-all duration-300 min-w-[140px] justify-center group ${
        hasLiked
          ? isLight
            ? "bg-red-500 text-white border-red-600 shadow-xl shadow-red-500/30 hover:bg-red-600 hover:scale-105"
            : "bg-red-500 text-white border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:bg-red-600 hover:scale-105"
          : isLight
          ? "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-lg shadow-gray-200/50"
          : "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10 hover:border-white/20 shadow-lg shadow-black/40"
      } ${isToggling ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={hasLiked ? "liked" : "unliked"}
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0.8, rotate: 10 }}
          transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
        >
          <Heart
            size={22}
            className={`transition-all duration-300 ${
              hasLiked ? "fill-current" : ""
            } ${justLiked ? "animate-pulse" : ""}`}
          />
        </motion.div>
      </AnimatePresence>
      
      <motion.span
        key={likeCount}
        initial={{ scale: 1.2, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="text-sm font-semibold"
      >
        {likeCount} {likeCount === 1 ? "like" : "likes"}
      </motion.span>

      {justLiked && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.5], opacity: [1, 0] }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className={`w-16 h-16 rounded-full ${
            isLight ? "bg-red-200/30" : "bg-red-500/20"
          }`} />
        </motion.div>
      )}
    </motion.button>
  );
}

