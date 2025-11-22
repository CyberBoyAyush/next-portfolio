"use client";

import { useState, createContext, useContext } from "react";
import { Minus, Plus } from "lucide-react";

// Context
const BlogContext = createContext<{
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export function useBlogContext() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }
  return context;
}

// Provider
export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = useState(18);

  return (
    <BlogContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </BlogContext.Provider>
  );
}

// Zoom Controls Component
export function BlogZoomControls() {
  const { fontSize, setFontSize } = useBlogContext();

  return (
    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-1">
      <button
        onClick={() => setFontSize((s) => Math.max(s - 2, 14))}
        className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
        aria-label="Decrease font size"
      >
        <Minus size={16} />
      </button>
      <div
        onClick={() => setFontSize(18)}
        className="text-xs font-medium text-gray-300 hover:text-white cursor-pointer font-mono min-w-[3ch] text-center select-none px-1 transition-colors"
        title="Reset to default"
      >
        {fontSize}px
      </div>
      <button
        onClick={() => setFontSize((s) => Math.min(s + 2, 32))}
        className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
        aria-label="Increase font size"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

// Content Wrapper Component
export default function BlogContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fontSize } = useBlogContext();

  return (
    <div
      className="blog-content"
      style={
        {
          "--blog-text-size": `${fontSize}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
