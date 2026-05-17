"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { IconTool, IconUsersGroup, IconHeartHandshake } from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";
import { useThemeSafe } from "@/components/theme-provider";
import SectionHeading from "@/components/section-heading";
import { beyondCode, accentMap } from "@/data/founder-content";

const iconMap: Record<string, Icon> = {
  Tool: IconTool,
  UsersGroup: IconUsersGroup,
  HeartHandshake: IconHeartHandshake,
};

const BeyondCode = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === "light";

  return (
    <section ref={sectionRef} className="py-20 sm:py-24 relative overflow-hidden">
      {/* Match the canonical founder-section background exactly so it blends with neighbours */}
      <div className={`absolute inset-0 -z-10 transition-colors duration-300 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`} />
      <div className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${
        isLight
          ? "[background-image:linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)]"
          : "[background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]"
      }`} />

      {/* Accent glow — sits on top of the background but below content */}
      <div className={`pointer-events-none absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-30 blur-[120px] -z-10 ${
        isLight ? "bg-gradient-to-r from-blue-200/50 via-emerald-100/40 to-rose-100/40" : "bg-gradient-to-r from-blue-500/10 via-emerald-500/8 to-rose-500/10"
      }`} />

      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading
          subtitle="Beyond The Code"
          title="More than the code."
          description="The work doesn't end at the IDE. Here's the other half of how I show up."
          className="mb-12"
        />

        {/* Featured leading statement */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className={`relative mb-8 sm:mb-10 mx-auto max-w-3xl border backdrop-blur-md overflow-hidden ${
            isLight
              ? "bg-white/90 border-gray-200 shadow-lg shadow-gray-200/50"
              : "bg-gradient-to-br from-white/[0.04] to-white/[0.01] border-white/10"
          }`}
        >
          <div className={`pointer-events-none absolute -left-20 -top-20 w-60 h-60 rounded-full blur-3xl opacity-50 ${
            isLight ? "bg-blue-50" : "bg-blue-500/10"
          }`} />
          <div className={`pointer-events-none absolute -right-20 -bottom-20 w-60 h-60 rounded-full blur-3xl opacity-50 ${
            isLight ? "bg-rose-50" : "bg-rose-500/10"
          }`} />

          <div className="relative z-10 p-6 sm:p-8 md:p-10 text-center">
            <span className={`text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] ${isLight ? "text-gray-500" : "text-gray-500"}`}>
              The TL;DR
            </span>
            <p className={`mt-3 text-lg sm:text-xl md:text-2xl leading-relaxed font-medium ${isLight ? "text-gray-800" : "text-gray-100"}`}>
              <span className={isLight ? "text-gray-900" : "text-white"}>
                More than the code.
              </span>{" "}
              I ship{" "}
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 border align-middle font-mono text-base sm:text-lg ${
                isLight ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-blue-500/10 text-blue-300 border-blue-500/20"
              }`}>
                <IconTool size={15} stroke={1.7} />
                internal tools
              </span>{" "}
              for the team, and I&apos;m a{" "}
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 border align-middle font-mono text-base sm:text-lg ${
                isLight ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
              }`}>
                <IconUsersGroup size={15} stroke={1.7} />
                team player
              </span>.
            </p>
          </div>
        </motion.div>

        {/* Three supporting cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
        >
          {beyondCode.map((card, idx) => {
            const IconCmp = iconMap[card.icon] ?? IconTool;
            const accent = accentMap[card.accent];

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                whileHover={{ y: -3 }}
                className={`group relative overflow-hidden border backdrop-blur-sm transition-colors ${
                  isLight
                    ? `bg-white ${accent.borderLight} hover:border-gray-300 hover:shadow-xl ${accent.glow}`
                    : `bg-gradient-to-br from-white/[0.025] to-white/[0.01] ${accent.border} hover:border-white/20`
                }`}
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-radial ${accent.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10 p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 flex items-center justify-center border ${
                      isLight ? `${accent.bgLight} ${accent.borderLight}` : `${accent.bg} ${accent.border}`
                    }`}>
                      <IconCmp size={20} stroke={1.6} className={isLight ? accent.textLight : accent.text} />
                    </div>
                    <ArrowUpRight
                      size={16}
                      className={`opacity-0 group-hover:opacity-100 transition-opacity ${isLight ? accent.textLight : accent.text}`}
                    />
                  </div>

                  <h3 className={`text-base sm:text-lg font-bold mb-2 leading-tight ${isLight ? "text-gray-900" : "text-white"}`}>
                    {card.headline}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? "text-gray-600" : "text-gray-400"}`}>
                    {card.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default BeyondCode;
