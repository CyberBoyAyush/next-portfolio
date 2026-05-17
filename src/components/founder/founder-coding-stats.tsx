"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useThemeSafe } from "@/components/theme-provider";
import SectionHeading from "@/components/section-heading";
import {
  ContributionGraphTile,
  GitHubStatsCard,
  GitHubStatsErrorFallback,
  GitHubStatsLoadingSkeleton,
  ORANGE_ACCENT,
  useGitHubStats,
} from "@/components/github-stats-card";

const FounderCodingStats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === "light";
  const { stats, errored } = useGitHubStats();

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
          description="What I actually shipped. Live, public, every day."
          className="mb-12"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="space-y-5"
        >
          {errored ? (
            <GitHubStatsErrorFallback isLight={isLight ?? false} accent={ORANGE_ACCENT} />
          ) : stats ? (
            <GitHubStatsCard stats={stats} isLight={isLight ?? false} accent={ORANGE_ACCENT} />
          ) : (
            <GitHubStatsLoadingSkeleton isLight={isLight ?? false} />
          )}

          <ContributionGraphTile isLight={isLight ?? false} accent={ORANGE_ACCENT} />
        </motion.div>
      </div>
    </section>
  );
};

export default FounderCodingStats;
