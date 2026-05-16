"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IconSparkles, IconRocket, IconTarget, IconStack2, IconLayersIntersect } from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";
import { useThemeSafe } from "@/components/theme-provider";
import SectionHeading from "@/components/section-heading";
import { philosophy, accentMap } from "@/data/founder-content";

const iconMap: Record<string, Icon> = {
  Sparkles: IconSparkles,
  Rocket: IconRocket,
  Target: IconTarget,
  Stack2: IconStack2,
};

const FallbackIcon = IconLayersIntersect;

const HowIBuild = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === "light";

  return (
    <section ref={sectionRef} className="py-20 sm:py-24 relative overflow-hidden">
      <div className={`absolute inset-0 -z-10 transition-colors duration-300 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`} />
      <div className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${
        isLight
          ? "[background-image:linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)]"
          : "[background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]"
      }`} />

      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading
          subtitle="How I Work"
          title="This is the deal."
          description="Four principles. They show up in every project I ship."
          className="mb-12"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
        >
          {philosophy.map((card, idx) => {
            const IconCmp = iconMap[card.icon] ?? FallbackIcon;
            const accent = accentMap[card.accent];
            const isHero = card.id === "ai-first";

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                whileHover={{ y: -2 }}
                className={`group relative overflow-hidden border backdrop-blur-sm transition-colors duration-300 ${
                  isLight
                    ? `bg-white ${accent.borderLight} hover:border-gray-300 hover:shadow-xl ${accent.glow}`
                    : `bg-gradient-to-br from-white/[0.025] to-white/[0.01] ${accent.border} hover:border-white/20`
                } ${isHero ? "md:col-span-2" : ""}`}
              >
                {/* Hover glow */}
                <div className={`pointer-events-none absolute inset-0 bg-gradient-radial ${accent.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Decorative blob for hero card */}
                {isHero && (
                  <div className={`pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-50 ${isLight ? accent.bgLight : accent.bg}`} />
                )}

                <div className={`relative z-10 p-6 sm:p-7 ${isHero ? "md:p-8" : ""}`}>
                  <div className="flex items-start gap-4 mb-3">
                    <div className={`flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center border ${
                      isLight ? `${accent.bgLight} ${accent.borderLight}` : `${accent.bg} ${accent.border}`
                    }`}>
                      <IconCmp size={22} stroke={1.6} className={isLight ? accent.textLight : accent.text} />
                    </div>
                    <h3 className={`text-xl sm:text-2xl font-bold leading-tight pt-1 ${isLight ? "text-gray-900" : "text-white"}`}>
                      {card.headline}
                    </h3>
                  </div>

                  <p className={`text-sm sm:text-base leading-relaxed ${isLight ? "text-gray-600" : "text-gray-400"}`}>
                    {card.body}
                  </p>

                  {isHero && (
                    <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-dashed border-current opacity-60">
                      {["Zenox · OpenCode plugin", "Plnr · AI CLI", "MemContext · MCP layer"].map((item) => (
                        <span
                          key={item}
                          className={`inline-flex items-center px-2.5 py-1 text-[11px] font-medium font-mono border ${
                            isLight ? `${accent.bgLight} ${accent.textLight} ${accent.borderLight}` : `${accent.bg} ${accent.text} ${accent.border}`
                          }`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HowIBuild;
