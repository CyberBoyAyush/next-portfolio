"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IconRocket, IconSparkles, IconPuzzle, IconLifebuoy, IconCrown } from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";
import { useThemeSafe } from "@/components/theme-provider";
import SectionHeading from "@/components/section-heading";
import { services, accentMap } from "@/data/founder-content";

const iconMap: Record<string, Icon> = {
  RocketLaunch: IconRocket,
  Sparkles: IconSparkles,
  Puzzle: IconPuzzle,
  Lifebuoy: IconLifebuoy,
  Crown: IconCrown,
};

const WhatIDo = () => {
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
          subtitle="Engagements"
          title="Roles I take."
          description="Not tasks. Not tickets. The whole engineering function — for as long as you need me there."
          className="mb-12"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {services.map((service, idx) => {
            const IconCmp = iconMap[service.icon] ?? IconRocket;
            const accent = accentMap[service.accent];
            // First card (Fractional CTO) is the featured/large tile; last card
            // is widened on tablet for a balanced layout.
            const isFeatured = idx === 0;
            const isWideOnLast = idx === services.length - 1;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -3 }}
                className={`group relative overflow-hidden border backdrop-blur-sm transition-colors ${
                  isLight
                    ? `bg-white ${accent.borderLight} hover:border-gray-300 hover:shadow-xl ${accent.glow}`
                    : `bg-gradient-to-br from-white/[0.025] to-white/[0.005] ${accent.border} hover:border-white/20`
                } ${isFeatured ? "lg:col-span-2 lg:row-span-1" : ""} ${isWideOnLast ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-radial ${accent.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {isFeatured && (
                  <div className={`pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-50 ${isLight ? accent.bgLight : accent.bg}`} />
                )}

                <div className={`relative z-10 p-5 sm:p-6 ${isFeatured ? "lg:p-8" : ""} flex flex-col h-full`}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center border ${
                      isLight ? `${accent.bgLight} ${accent.borderLight}` : `${accent.bg} ${accent.border}`
                    }`}>
                      <IconCmp size={20} stroke={1.6} className={isLight ? accent.textLight : accent.text} />
                    </div>
                    <h3 className={`flex-1 text-base sm:text-lg font-bold leading-tight pt-1 ${isLight ? "text-gray-900" : "text-white"} ${
                      isFeatured ? "lg:text-2xl" : ""
                    }`}>
                      {service.title}
                    </h3>
                  </div>

                  <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${isLight ? "text-gray-600" : "text-gray-400"} ${
                    isFeatured ? "lg:text-base" : ""
                  }`}>
                    {service.body}
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

export default WhatIDo;
