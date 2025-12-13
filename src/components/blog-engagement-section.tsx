"use client";

import { useBlogThemeSafe } from "./blog-theme-provider";
import BlogLikeButton from "./blog-like-button";
import BlogComments from "./blog-comments";

interface BlogEngagementSectionProps {
  slug: string;
}

export default function BlogEngagementSection({ slug }: BlogEngagementSectionProps) {
  const themeContext = useBlogThemeSafe();
  const isLight = themeContext?.theme === "light";

  return (
    <div className={`mt-16 sm:mt-20 pt-12 sm:pt-16 border-t ${
      isLight ? "border-gray-200/60" : "border-gray-800/60"
    }`}>
      <div className="max-w-3xl mx-auto space-y-12 sm:space-y-16">
        {/* Like Button Section */}
        <div className="flex items-center justify-center">
          <BlogLikeButton slug={slug} />
        </div>
        
        {/* Comments Section */}
        <BlogComments slug={slug} />
      </div>
    </div>
  );
}

