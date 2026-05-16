"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  IconBrandGithub,
  IconStarFilled,
  IconGitFork,
  IconUsers,
  IconBook,
  IconExternalLink,
} from "@tabler/icons-react";
import Image from "@/components/image";
import { useThemeSafe } from "@/components/theme-provider";
import SectionHeading from "@/components/section-heading";
import type { GitHubStatsResponse } from "@/routes/api.github-stats";

const GITHUB_USERNAME = "cyberboyayush";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Vue: "#41B883",
  Shell: "#89E051",
  Go: "#00ADD8",
  Rust: "#DEA584",
  Java: "#B07219",
  C: "#555555",
  "C++": "#F34B7D",
  Dart: "#00B4AB",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Svelte: "#FF3E00",
  Astro: "#FF5D01",
};

function langColor(name: string): string {
  return LANGUAGE_COLORS[name] ?? "#8b8b8b";
}

interface NumberTileProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  isLight: boolean;
}
const NumberTile = ({ icon, value, label, isLight }: NumberTileProps) => (
  <div
    className={`relative overflow-hidden border p-4 sm:p-5 transition-all hover:-translate-y-0.5 ${
      isLight
        ? "bg-white border-gray-200 hover:border-orange-300 hover:shadow-md hover:shadow-orange-100/40"
        : "bg-white/[0.025] border-white/10 hover:border-orange-500/30 hover:bg-white/[0.04]"
    }`}
  >
    <div className="flex items-center gap-2 mb-2 opacity-80">
      <span className={isLight ? "text-orange-600" : "text-orange-400"}>{icon}</span>
      <span className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] ${isLight ? "text-gray-500" : "text-gray-500"}`}>
        {label}
      </span>
    </div>
    <div className={`text-2xl sm:text-3xl font-bold font-mono tabular-nums ${isLight ? "text-gray-900" : "text-white"}`}>
      {value}
    </div>
  </div>
);

const SkeletonTile = ({ isLight }: { isLight: boolean }) => (
  <div className={`relative overflow-hidden border p-4 sm:p-5 ${isLight ? "bg-white border-gray-200" : "bg-white/[0.025] border-white/10"}`}>
    <div className={`h-3 w-20 mb-3 animate-pulse ${isLight ? "bg-gray-100" : "bg-white/10"}`} />
    <div className={`h-7 w-16 animate-pulse ${isLight ? "bg-gray-100" : "bg-white/10"}`} />
  </div>
);

const StatsCard = ({ stats, isLight }: { stats: GitHubStatsResponse; isLight: boolean }) => {
  const totalLangCount = stats.topLanguages.reduce((sum, l) => sum + l.count, 0) || 1;

  return (
    <div
      className={`relative overflow-hidden border ${
        isLight
          ? "bg-white border-gray-200 shadow-lg shadow-gray-200/40"
          : "bg-gradient-to-br from-white/[0.03] to-white/[0.01] border-white/10"
      }`}
    >
      {/* Glow */}
      <div
        className={`pointer-events-none absolute -top-32 -right-32 w-72 h-72 rounded-full blur-3xl opacity-50 ${
          isLight ? "bg-orange-100" : "bg-orange-500/10"
        }`}
      />

      <div className="relative z-10 p-5 sm:p-6 md:p-8">
        {/* Header: avatar + name + handle + link */}
        <div className="flex items-center gap-4 mb-6">
          <div className={`relative w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-full ring-2 ${isLight ? "ring-orange-200" : "ring-orange-500/30"}`}>
            <Image src={stats.avatarUrl} alt={stats.username} fill sizes="56px" className="object-cover" unoptimized />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <IconBrandGithub size={16} stroke={1.8} className={isLight ? "text-gray-700" : "text-gray-200"} />
              <span className={`text-base sm:text-lg font-bold truncate ${isLight ? "text-gray-900" : "text-white"}`}>
                {stats.name ?? stats.username}
              </span>
            </div>
            <a
              href={stats.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 text-[11px] sm:text-xs font-mono transition-colors ${
                isLight ? "text-gray-500 hover:text-orange-700" : "text-gray-400 hover:text-orange-300"
              }`}
            >
              @{stats.username}
              <IconExternalLink size={11} stroke={2} />
            </a>
          </div>
          <div className={`hidden sm:block text-right text-[11px] font-mono ${isLight ? "text-gray-400" : "text-gray-600"}`}>
            Member since {stats.joinedYear}
          </div>
        </div>

        {/* Number tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <NumberTile icon={<IconStarFilled size={14} />} value={stats.totalStars} label="Total stars" isLight={isLight} />
          <NumberTile icon={<IconBook size={14} stroke={2} />} value={stats.publicRepos} label="Public repos" isLight={isLight} />
          <NumberTile icon={<IconUsers size={14} stroke={2} />} value={stats.followers} label="Followers" isLight={isLight} />
          <NumberTile icon={<IconGitFork size={14} stroke={2} />} value={stats.totalForks} label="Forks earned" isLight={isLight} />
        </div>

        {/* Language breakdown */}
        {stats.topLanguages.length > 0 && (
          <div>
            <div className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] mb-3 ${isLight ? "text-gray-500" : "text-gray-500"}`}>
              Top languages across own repos
            </div>

            {/* Bar */}
            <div className={`flex h-2 overflow-hidden mb-3 border ${isLight ? "border-gray-200 bg-gray-50" : "border-white/10 bg-white/[0.02]"}`}>
              {stats.topLanguages.map((lang) => (
                <div
                  key={lang.language}
                  style={{
                    width: `${(lang.count / totalLangCount) * 100}%`,
                    backgroundColor: langColor(lang.language),
                  }}
                  title={`${lang.language} — ${lang.count} repo${lang.count > 1 ? "s" : ""}`}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {stats.topLanguages.map((lang) => {
                const pct = ((lang.count / totalLangCount) * 100).toFixed(0);
                return (
                  <div key={lang.language} className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: langColor(lang.language) }} />
                    <span className={`text-[11px] sm:text-xs ${isLight ? "text-gray-600" : "text-gray-300"}`}>
                      {lang.language}
                    </span>
                    <span className={`text-[10px] sm:text-[11px] font-mono ${isLight ? "text-gray-400" : "text-gray-500"}`}>
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ContributionGraphTile = ({ isLight }: { isLight: boolean }) => {
  const [errored, setErrored] = useState(false);
  const [loading, setLoading] = useState(true);

  const color = isLight ? "ea580c" : "f97316";
  const url = `https://ghchart.rshah.org/${color}/${GITHUB_USERNAME}`;

  return (
    <a
      href={`https://github.com/${GITHUB_USERNAME}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/tile relative overflow-hidden border p-4 sm:p-5 block transition-all hover:-translate-y-0.5 ${
        isLight
          ? "bg-white border-gray-200 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-100/30"
          : "bg-gradient-to-br from-white/[0.025] to-white/[0.005] border-white/10 hover:border-orange-500/30"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <IconBrandGithub size={16} stroke={1.8} className={isLight ? "text-orange-600" : "text-orange-400"} />
          <span className={`text-[11px] font-mono uppercase tracking-[0.18em] ${isLight ? "text-gray-500" : "text-gray-500"}`}>
            Contribution graph · last year
          </span>
        </div>
        <span className={`text-[11px] font-mono ${isLight ? "text-gray-400" : "text-gray-600"}`}>
          github.com/{GITHUB_USERNAME}
        </span>
      </div>

      <div className="relative w-full min-h-[110px] flex items-center justify-center">
        {loading && !errored && (
          <div className={`absolute inset-0 flex items-center justify-center ${isLight ? "bg-white/40" : "bg-black/20"} backdrop-blur-sm`}>
            <div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 animate-spin rounded-full" />
          </div>
        )}
        {!errored ? (
          <Image
            src={url}
            alt="GitHub contribution graph"
            width={1200}
            height={180}
            unoptimized
            className={`w-full h-auto transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
            onLoad={() => setLoading(false)}
            onError={() => {
              setErrored(true);
              setLoading(false);
            }}
          />
        ) : (
          // Outer tile is already an anchor to github.com/<user>; render a span here
          // to avoid nested <a> (invalid HTML).
          <span
            className={`text-xs sm:text-sm font-mono underline underline-offset-4 ${isLight ? "text-orange-700" : "text-orange-300"}`}
          >
            View graph on github.com/{GITHUB_USERNAME} →
          </span>
        )}
      </div>
    </a>
  );
};

const ErrorFallback = ({ isLight }: { isLight: boolean }) => (
  <div
    className={`relative overflow-hidden border p-6 sm:p-8 text-center ${
      isLight ? "bg-white border-gray-200" : "bg-white/[0.025] border-white/10"
    }`}
  >
    <IconBrandGithub size={28} stroke={1.6} className={`mx-auto mb-3 ${isLight ? "text-gray-500" : "text-gray-400"}`} />
    <p className={`text-sm mb-3 ${isLight ? "text-gray-600" : "text-gray-400"}`}>
      Couldn&apos;t fetch live GitHub stats right now.
    </p>
    <a
      href={`https://github.com/${GITHUB_USERNAME}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-sm font-mono underline underline-offset-4 ${
        isLight ? "text-orange-700 hover:text-orange-800" : "text-orange-300 hover:text-orange-200"
      }`}
    >
      View profile on github.com/{GITHUB_USERNAME}
      <IconExternalLink size={13} stroke={2} />
    </a>
  </div>
);

const FounderCodingStats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === "light";

  const [stats, setStats] = useState<GitHubStatsResponse | null>(null);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const ac = new AbortController();
    (async () => {
      try {
        const res = await fetch("/api/github-stats", { signal: ac.signal });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = (await res.json()) as GitHubStatsResponse;
        if (!cancelled) setStats(data);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof Error && err.name === "AbortError") return;
        setErrored(true);
      }
    })();
    return () => {
      cancelled = true;
      ac.abort();
    };
  }, []);

  return (
    <section ref={ref} className="py-20 sm:py-24 relative overflow-hidden">
      <div className={`absolute inset-0 -z-10 transition-colors duration-300 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`} />
      <div className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${
        isLight
          ? "[background-image:linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)]"
          : "[background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]"
      }`} />

      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeading
          subtitle="Public Receipts"
          title="I ship every day."
          description="No LeetCode theatre. Just GitHub — the only proof that actually matters."
          className="mb-12"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="space-y-5"
        >
          {/* Stats card */}
          {errored ? (
            <ErrorFallback isLight={isLight ?? false} />
          ) : stats ? (
            <StatsCard stats={stats} isLight={isLight ?? false} />
          ) : (
            <div
              className={`relative overflow-hidden border p-5 sm:p-6 md:p-8 ${
                isLight ? "bg-white border-gray-200" : "bg-white/[0.025] border-white/10"
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full animate-pulse ${isLight ? "bg-gray-100" : "bg-white/10"}`} />
                <div className="flex-1">
                  <div className={`h-4 w-32 mb-2 animate-pulse ${isLight ? "bg-gray-100" : "bg-white/10"}`} />
                  <div className={`h-3 w-24 animate-pulse ${isLight ? "bg-gray-100" : "bg-white/10"}`} />
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <SkeletonTile key={i} isLight={isLight ?? false} />
                ))}
              </div>
            </div>
          )}

          {/* Contribution graph */}
          <ContributionGraphTile isLight={isLight ?? false} />
        </motion.div>
      </div>
    </section>
  );
};

export default FounderCodingStats;
