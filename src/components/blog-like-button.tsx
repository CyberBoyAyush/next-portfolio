"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useBlogThemeSafe } from "./blog-theme-provider";

interface BlogLikeButtonProps {
  slug: string;
}

export default function BlogLikeButton({ slug }: BlogLikeButtonProps) {
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  const themeContext = useBlogThemeSafe();
  const isLight = themeContext?.theme === "light";

  useEffect(() => {
    fetch(`/api/blogs/${slug}/likes`)
      .then((res) => res.json())
      .then((data) => {
        setLikeCount(data.count || 0);
        setHasLiked(data.hasLiked || false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching likes:", error);
        setIsLoading(false);
      });
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
      setHasLiked(data.liked);
      setLikeCount((prev) => (data.liked ? prev + 1 : prev - 1));
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsToggling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-gray-400">
        <Heart size={20} />
        <span className="text-sm">...</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleToggleLike}
      disabled={isToggling}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
        hasLiked
          ? isLight
            ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
            : "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
          : isLight
          ? "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
          : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
      } ${isToggling ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <Heart
        size={20}
        className={hasLiked ? "fill-current" : ""}
      />
      <span className="text-sm font-medium">
        {likeCount} {likeCount === 1 ? "like" : "likes"}
      </span>
    </button>
  );
}

