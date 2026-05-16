"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useThemeSafe } from "@/components/theme-provider";
import SectionHeading from "@/components/section-heading";
import { outcomeTiles, accentMap, type OutcomeTile } from "@/data/founder-content";

const spanClass = (col: 1 | 2 | 3 | undefined, row: 1 | 2 | undefined): string => {
  const colClass = col === 2 ? "md:col-span-2" : col === 3 ? "md:col-span-3" : "md:col-span-1";
  const rowClass = row === 2 ? "md:row-span-2" : "md:row-span-1";
  return `${colClass} ${rowClass}`;
};

const Tile = ({ tile, isLight, index }: { tile: OutcomeTile; isLight: boolean; index: number }) => {
  const accent = accentMap[tile.accent];
  const isHero = (tile.colSpan ?? 1) >= 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className={`group relative overflow-hidden border backdrop-blur-sm transition-colors duration-300 ${spanClass(tile.colSpan, tile.rowSpan)} ${
        isLight
          ? `bg-white ${accent.borderLight} hover:border-gray-300 hover:shadow-xl ${accent.glow}`
          : `bg-gradient-to-br from-white/[0.025] to-white/[0.01] ${accent.border} hover:border-white/20`
      }`}
    >
      {/* Accent radial glow on hover */}
      <div className={`pointer-events-none absolute inset-0 bg-gradient-radial ${accent.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Inner gradient sheen at top corner for hero tiles */}
      {isHero && (
        <div className={`pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-50 ${isLight ? accent.bgLight : accent.bg}`} />
      )}

      <div className={`relative z-10 flex flex-col h-full p-5 sm:p-6 ${isHero ? "sm:p-7 md:p-8" : ""}`}>
        {tile.tag && (
          <span className={`inline-flex items-center self-start gap-1.5 px-2 py-0.5 mb-3 text-[10px] font-semibold tracking-wider uppercase border ${
            isLight ? `${accent.bgLight} ${accent.textLight} ${accent.borderLight}` : `${accent.bg} ${accent.text} ${accent.border}`
          }`}>
            {tile.tag}
          </span>
        )}

        <div className={`font-bold font-mono leading-[1.05] mb-2 ${
          isHero ? "text-4xl sm:text-5xl md:text-6xl" : "text-3xl sm:text-4xl"
        } ${isLight ? "text-gray-900" : "text-white"}`}>
          <span className={`bg-clip-text text-transparent ${
            isLight
              ? tile.accent === "blue" ? "bg-gradient-to-br from-gray-900 to-blue-600"
                : tile.accent === "purple" ? "bg-gradient-to-br from-gray-900 to-purple-600"
                : tile.accent === "emerald" ? "bg-gradient-to-br from-gray-900 to-emerald-600"
                : tile.accent === "amber" ? "bg-gradient-to-br from-gray-900 to-amber-600"
                : tile.accent === "rose" ? "bg-gradient-to-br from-gray-900 to-rose-600"
                : "bg-gradient-to-br from-gray-900 to-cyan-600"
              : tile.accent === "blue" ? "bg-gradient-to-br from-white to-blue-300"
                : tile.accent === "purple" ? "bg-gradient-to-br from-white to-purple-300"
                : tile.accent === "emerald" ? "bg-gradient-to-br from-white to-emerald-300"
                : tile.accent === "amber" ? "bg-gradient-to-br from-white to-amber-300"
                : tile.accent === "rose" ? "bg-gradient-to-br from-white to-rose-300"
                : "bg-gradient-to-br from-white to-cyan-300"
          }`}>
            {tile.metric}
          </span>
        </div>

        <div className={`text-sm sm:text-base font-medium mb-2 ${isLight ? "text-gray-700" : "text-gray-200"}`}>
          {tile.caption}
        </div>

        <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? "text-gray-500" : "text-gray-400"}`}>
          {tile.detail}
        </p>

        {tile.chips && tile.chips.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {tile.chips.map((chip) => (
              <span
                key={chip}
                className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium border font-mono ${
                  isLight ? "bg-gray-50 text-gray-600 border-gray-200" : "bg-white/5 text-gray-300 border-white/10"
                }`}
              >
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const OutcomesWall = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === "light";

  return (
    <section id="receipts" ref={sectionRef} className="py-20 sm:py-24 relative overflow-hidden">
      <div className={`absolute inset-0 -z-10 transition-colors duration-300 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`} />
      <div className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${
        isLight
          ? "[background-image:linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)]"
          : "[background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]"
      }`} />

      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading
          subtitle="Receipts"
          title="Numbers, not narratives."
          description="What I've shipped, who's paying for it, and what changed because of it."
          className="mb-12"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-4 sm:gap-5"
        >
          {outcomeTiles.map((tile, idx) => (
            <Tile key={tile.id} tile={tile} isLight={isLight ?? false} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OutcomesWall;
