'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from './section-heading';
import { useThemeSafe } from './theme-provider';
import {
  ContributionGraphTile,
  GitHubStatsCard,
  GitHubStatsErrorFallback,
  GitHubStatsLoadingSkeleton,
  PURPLE_ACCENT,
  useGitHubStats,
} from './github-stats-card';

const CodingStats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === 'light';
  const { stats, errored } = useGitHubStats();

  return (
    <section id="coding-stats" ref={ref} className="py-20 sm:py-24 relative overflow-hidden">
      <div className={`absolute inset-0 -z-10 transition-colors duration-300 ${isLight ? 'bg-[#fafafa]' : 'bg-[#0D1117]'}`} />
      <div className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${
        isLight
          ? '[background-image:linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)]'
          : '[background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]'
      }`} />

      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeading
          subtitle="My Progress"
          title="Coding Stats"
          description="A live snapshot of my work on GitHub."
          className="mb-12"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="space-y-5"
        >
          {/* Live GitHub stats — fetched from /api/github-stats */}
          {errored ? (
            <GitHubStatsErrorFallback isLight={isLight ?? false} accent={PURPLE_ACCENT} />
          ) : stats ? (
            <GitHubStatsCard stats={stats} isLight={isLight ?? false} accent={PURPLE_ACCENT} />
          ) : (
            <GitHubStatsLoadingSkeleton isLight={isLight ?? false} />
          )}

          <ContributionGraphTile isLight={isLight ?? false} accent={PURPLE_ACCENT} />
        </motion.div>
      </div>
    </section>
  );
};

export default CodingStats;
