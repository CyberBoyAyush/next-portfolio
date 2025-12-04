"use client";

import { useBlogThemeSafe } from "./BlogThemeProvider";
import ThemeSwitcher from "./ThemeSwitcher";
import { BlogFontControls, BlogZoomControls } from "./BlogContentWrapper";

interface BlogPageWrapperProps {
  children: React.ReactNode;
}

export function BlogPageWrapper({ children }: BlogPageWrapperProps) {
  const themeContext = useBlogThemeSafe();
  const isLight = themeContext?.theme === "light";

  return (
    <main
      className={`min-h-screen pt-20 md:pt-20 overflow-x-hidden transition-colors duration-300 ${
        isLight ? "bg-white" : "bg-[#0D1117]"
      }`}
    >
      {/* Background effects */}
      <div
        className={`absolute inset-0 -z-10 transition-colors duration-300 ${
          isLight ? "bg-white" : "bg-[#0D1117]"
        }`}
      >
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 opacity-50 blur-[120px] ${
            isLight
              ? "bg-gradient-radial from-blue-200/30 to-transparent"
              : "bg-gradient-radial from-blue-800/10 to-transparent"
          }`}
        />
      </div>

      <div
        className={`absolute inset-0 -z-10 bg-size-[30px_30px] md:bg-size-[40px_40px] ${
          isLight
            ? "bg-[linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)]"
            : "bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)]"
        }`}
      ></div>

      {children}
    </main>
  );
}

interface BlogHeaderProps {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  author: string;
  tags: string[];
  children?: React.ReactNode;
}

export function BlogHeader({
  title,
  description,
  date,
  readingTime,
  author,
  tags,
  children,
}: BlogHeaderProps) {
  const themeContext = useBlogThemeSafe();
  const isLight = themeContext?.theme === "light";

  return (
    <header className="mb-8 sm:mb-10 md:mb-12">
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6 text-xs sm:text-sm ${
          isLight ? "text-gray-500" : "text-gray-400"
        }`}
      >
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <time dateTime={date}>
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <span className={isLight ? "text-gray-300" : "text-gray-600"}>•</span>
          <div className="flex items-center gap-2">
            <span>{readingTime}</span>
          </div>
          <span className={isLight ? "text-gray-300" : "text-gray-600"}>•</span>
          <span>By {author}</span>
        </div>
        <div className="flex justify-start sm:justify-end w-full sm:w-auto">
          {children}
        </div>
      </div>

      <h1
        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight ${
          isLight ? "text-gray-900" : "text-white"
        }`}
      >
        {title}
      </h1>

      <p
        className={`text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 ${
          isLight ? "text-gray-600" : "text-gray-400"
        }`}
      >
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
        <div
          className={`flex items-center gap-1.5 text-xs sm:text-sm ${
            isLight ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <span className="font-medium">Tags:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`px-2.5 py-1 sm:px-3 text-xs sm:text-sm border transition-colors ${
                isLight
                  ? "bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-200"
                  : "bg-gray-800/60 text-gray-300 border-gray-700/50 hover:border-gray-600 hover:bg-gray-800"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

export function BlogBackButton({ href }: { href: string }) {
  const themeContext = useBlogThemeSafe();
  const isLight = themeContext?.theme === "light";

  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 transition-colors group ${
        isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"
      }`}
    >
      <svg
        className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span className="text-sm font-medium">Back to Blogs</span>
    </a>
  );
}

export function BlogMobileControls({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 self-end sm:self-auto xl:hidden">
      <ThemeSwitcher orientation="horizontal" />
      <BlogFontControls />
      <BlogZoomControls />
      {children}
    </div>
  );
}

interface BlogRelatedSectionProps {
  children: React.ReactNode;
}

export function BlogRelatedSection({ children }: BlogRelatedSectionProps) {
  const themeContext = useBlogThemeSafe();
  const isLight = themeContext?.theme === "light";

  return (
    <section
      className={`mt-12 sm:mt-14 md:mt-16 pt-8 sm:pt-10 border-t ${
        isLight ? "border-gray-200" : "border-gray-800"
      }`}
    >
      <h2
        className={`text-xl sm:text-2xl font-bold mb-6 ${
          isLight ? "text-gray-900" : "text-white"
        }`}
      >
        Related Articles
      </h2>
      {children}
    </section>
  );
}

interface BlogRelatedCardProps {
  href: string;
  imageUrl?: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
}

export function BlogRelatedCard({
  href,
  imageUrl,
  title,
  description,
  date,
  readingTime,
  tags,
}: BlogRelatedCardProps) {
  const themeContext = useBlogThemeSafe();
  const isLight = themeContext?.theme === "light";

  return (
    <a
      href={href}
      className={`group flex flex-col sm:flex-row gap-4 sm:gap-5 p-4 sm:p-5 border rounded-lg transition-colors duration-200 ${
        isLight
          ? "bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-gray-300"
          : "bg-white/[0.02] hover:bg-white/[0.04] border-gray-800/80 hover:border-gray-700"
      }`}
    >
      {imageUrl && (
        <div className="relative w-full sm:w-48 md:w-56 h-36 sm:h-32 md:h-36 shrink-0 overflow-hidden rounded-md">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className="flex flex-col justify-between flex-grow min-w-0 py-0.5">
        <div>
          <div
            className={`flex items-center gap-2 text-xs mb-2 ${
              isLight ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <time dateTime={date}>
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
            <span className={isLight ? "text-gray-300" : "text-gray-700"}>
              •
            </span>
            <span>{readingTime}</span>
          </div>
          <h3
            className={`text-base sm:text-lg font-semibold transition-colors duration-200 leading-snug mb-2 ${
              isLight
                ? "text-gray-800 group-hover:text-blue-600"
                : "text-gray-100 group-hover:text-blue-400"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-sm leading-relaxed line-clamp-2 sm:line-clamp-none ${
              isLight ? "text-gray-500" : "text-gray-500"
            }`}
          >
            {description}
          </p>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`px-2 py-0.5 text-xs rounded border ${
                  isLight
                    ? "text-gray-500 bg-gray-100 border-gray-200"
                    : "text-gray-400 bg-gray-800/60 border-gray-700/50"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}

export function BlogFooterSection() {
  const themeContext = useBlogThemeSafe();
  const isLight = themeContext?.theme === "light";

  return (
    <footer
      className={`mt-8 sm:mt-10 pt-6 sm:pt-8 border-t ${
        isLight ? "border-gray-200" : "border-gray-800"
      }`}
    >
      <a
        href="/blogs"
        className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium border transition-all group w-full sm:w-auto ${
          isLight
            ? "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200 hover:border-gray-300"
            : "bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/20"
        }`}
      >
        <svg
          className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="text-sm font-medium">Back to all articles</span>
      </a>
    </footer>
  );
}

export function BlogCoverImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const themeContext = useBlogThemeSafe();
  const isLight = themeContext?.theme === "light";

  return (
    <div
      className={`relative w-full aspect-1408/768 overflow-hidden mb-8 sm:mb-10 md:mb-12 border ${
        isLight ? "border-gray-200" : "border-gray-800"
      }`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
