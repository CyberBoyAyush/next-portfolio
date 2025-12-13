"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";

type Theme = "dark" | "light";

interface BlogThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isBlogDetailPage: boolean;
}

const BlogThemeContext = createContext<BlogThemeContextType | null>(null);

export function useBlogTheme() {
  const context = useContext(BlogThemeContext);
  if (!context) {
    throw new Error("useBlogTheme must be used within a BlogThemeProvider");
  }
  return context;
}

// Safe hook that returns null if not in provider (for components that may be outside)
export function useBlogThemeSafe() {
  return useContext(BlogThemeContext);
}

// Helper function to apply theme to DOM
function applyThemeToDOM(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function ThemeApplier({ theme }: { theme: Theme }) {
  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  return null;
}

export function BlogThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [theme, setThemeState] = useState<Theme>("dark");
  const prevPathname = useRef(pathname);

  // Check if current page is a blog detail page (not the listing page)
  const isBlogDetailPage = pathname?.startsWith("/blogs/") && pathname !== "/blogs";

  // Reset to dark theme IMMEDIATELY when navigating away from blog detail pages
  useEffect(() => {
    const wasOnBlogPage = prevPathname.current?.startsWith("/blogs/") && prevPathname.current !== "/blogs";
    const isNowOnBlogPage = isBlogDetailPage;
    
    // If we navigated away from a blog page, force dark theme immediately
    if (wasOnBlogPage && !isNowOnBlogPage) {
      setThemeState("dark");
      // Also apply immediately to DOM to avoid flicker
      applyThemeToDOM("dark");
    }
    
    prevPathname.current = pathname;
  }, [pathname, isBlogDetailPage]);

  // Also reset if somehow we're on a non-blog page with light theme
  useEffect(() => {
    if (!isBlogDetailPage && theme === "light") {
      setThemeState("dark");
      applyThemeToDOM("dark");
    }
  }, [isBlogDetailPage, theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    // Only allow light theme on blog detail pages
    if (newTheme === "light" && !isBlogDetailPage) {
      return;
    }
    setThemeState(newTheme);
  }, [isBlogDetailPage]);

  const toggleTheme = useCallback(() => {
    if (!isBlogDetailPage) return;
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, [isBlogDetailPage]);

  return (
    <BlogThemeContext.Provider value={{ theme, setTheme, toggleTheme, isBlogDetailPage }}>
      <ThemeApplier theme={theme} />
      {children}
    </BlogThemeContext.Provider>
  );
}
