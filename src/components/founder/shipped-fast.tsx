"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  IconClock,
  IconPuzzle,
  IconPackage,
  IconBriefcase,
  IconStar,
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";
import Link from "@/components/link";
import Image from "@/components/image";
import { useThemeSafe } from "@/components/theme-provider";
import SectionHeading from "@/components/section-heading";
import { shippedItems, accentMap, type ShippedItem } from "@/data/founder-content";

const kindStyles: Record<
  ShippedItem["kind"],
  { label: string; icon: Icon; darkClass: string; lightClass: string }
> = {
  plugin: {
    label: "Custom plugin",
    icon: IconPuzzle,
    darkClass: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    lightClass: "bg-amber-50 text-amber-700 border-amber-200",
  },
  product: {
    label: "Full product",
    icon: IconPackage,
    darkClass: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    lightClass: "bg-purple-50 text-purple-700 border-purple-200",
  },
  work: {
    label: "Day job",
    icon: IconBriefcase,
    darkClass: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    lightClass: "bg-blue-50 text-blue-700 border-blue-200",
  },
};

// ---------------------------------------------------------------------------
// Compact card — used for non-flagship items in the grid below.
// ---------------------------------------------------------------------------
const CompactCard = ({ item, isLight }: { item: ShippedItem; isLight: boolean }) => {
  const kindStyle = kindStyles[item.kind];
  const KindIcon = kindStyle.icon;

  return (
    <Link
      href={item.href}
      className={`group relative overflow-hidden border flex flex-col h-full transition-all hover:-translate-y-1 duration-300 ${
        isLight
          ? "bg-white border-gray-200 hover:border-gray-300 hover:shadow-2xl hover:shadow-gray-200/50"
          : "bg-gradient-to-br from-white/[0.025] to-white/[0.005] border-white/10 hover:border-white/20"
      }`}
    >
      <div className={`relative w-full aspect-[16/9] overflow-hidden ${isLight ? "bg-gray-50" : "bg-gray-900/40"}`}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={75}
        />
        {!isLight && <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/80 via-transparent to-transparent" />}

        <div className="absolute top-3 left-3 z-10">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 backdrop-blur-md border text-[11px] font-mono font-semibold ${
            isLight ? "bg-white/95 text-gray-900 border-gray-200 shadow-sm" : "bg-black/60 text-white border-white/15"
          }`}>
            <IconClock size={11} stroke={2} className={isLight ? "text-orange-600" : "text-orange-400"} />
            {item.timeToShip}
          </div>
        </div>

        {item.statusLabel && (
          <div className="absolute top-3 right-3 z-10">
            <div className={`inline-flex items-center gap-1 px-2 py-1 backdrop-blur-md border text-[10px] font-mono font-bold uppercase tracking-wider ${
              isLight ? "bg-emerald-50/95 text-emerald-700 border-emerald-200 shadow-sm" : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
            }`}>
              <IconCircleCheckFilled size={10} />
              {item.statusLabel}
            </div>
          </div>
        )}

        <div className="absolute bottom-3 left-3 z-10">
          <div className={`inline-flex items-center gap-1 px-2 py-0.5 backdrop-blur-md border text-[10px] font-medium uppercase tracking-wider ${
            isLight ? `${kindStyle.lightClass} shadow-sm` : kindStyle.darkClass
          }`}>
            <KindIcon size={10} stroke={2} />
            {kindStyle.label}
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className={`text-lg sm:text-xl font-bold leading-tight ${isLight ? "text-gray-900 group-hover:text-orange-700" : "text-white group-hover:text-orange-300"} transition-colors`}>
            {item.title}
          </h3>
          <ArrowUpRight
            size={16}
            className={`flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all ${isLight ? "text-orange-600" : "text-orange-400"}`}
          />
        </div>

        <p className={`text-[11px] font-mono mb-3 ${isLight ? "text-gray-500" : "text-gray-500"}`}>
          {item.channel}
        </p>

        <p className={`text-sm leading-relaxed flex-1 ${isLight ? "text-gray-600" : "text-gray-400"}`}>
          {item.outcome}
        </p>

        {item.highlights && item.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-dashed border-current opacity-90">
            {item.highlights.map((h) => (
              <span
                key={h}
                className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium border font-mono ${
                  isLight ? "bg-gray-50 text-gray-600 border-gray-200" : "bg-white/5 text-gray-300 border-white/10"
                }`}
              >
                {h}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

// ---------------------------------------------------------------------------
// Flagship card — large horizontal block (image OR metric panel on left).
// ---------------------------------------------------------------------------
const FlagshipCard = ({ item, isLight }: { item: ShippedItem; isLight: boolean }) => {
  const kindStyle = kindStyles[item.kind];
  const KindIcon = kindStyle.icon;
  const hasMetrics = item.flagshipMetrics && item.flagshipMetrics.length > 0;

  return (
    <Link
      href={item.href}
      className={`group relative overflow-hidden border grid grid-cols-1 md:grid-cols-5 transition-all hover:-translate-y-1 duration-300 ${
        isLight
          ? "bg-white border-orange-300 shadow-xl shadow-orange-200/30 hover:shadow-2xl hover:shadow-orange-200/50"
          : "bg-gradient-to-br from-white/[0.04] to-white/[0.01] border-orange-500/40 hover:border-orange-500/60"
      }`}
    >
      <div className={`pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-50 ${
        isLight ? "bg-orange-100" : "bg-orange-500/10"
      }`} />

      {/* Left side: image OR metric panel */}
      {hasMetrics ? (
        <FlagshipMetricsPanel item={item} isLight={isLight} />
      ) : (
        <FlagshipImagePanel item={item} isLight={isLight} KindIcon={KindIcon} kindLabel={kindStyle.label} kindLightClass={kindStyle.lightClass} kindDarkClass={kindStyle.darkClass} />
      )}

      {/* Right side: copy */}
      <div className="relative z-10 flex flex-col p-6 sm:p-8 md:col-span-3">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className={`text-2xl sm:text-3xl font-bold leading-tight ${isLight ? "text-gray-900 group-hover:text-orange-700" : "text-white group-hover:text-orange-300"} transition-colors`}>
            {item.title}
          </h3>
          <ArrowUpRight
            size={18}
            className={`flex-shrink-0 mt-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all ${isLight ? "text-orange-600" : "text-orange-400"}`}
          />
        </div>

        <p className={`text-xs font-mono mb-4 ${isLight ? "text-gray-500" : "text-gray-500"}`}>
          {item.channel}
        </p>

        <p className={`text-sm sm:text-[15px] leading-relaxed flex-1 ${isLight ? "text-gray-600" : "text-gray-300"}`}>
          {item.outcome}
        </p>

        {item.highlights && item.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-5 pt-5 border-t border-dashed border-current opacity-90">
            {item.highlights.map((h) => (
              <span
                key={h}
                className={`inline-flex items-center px-2 py-0.5 text-[11px] font-medium border font-mono ${
                  isLight ? "bg-gray-50 text-gray-700 border-gray-200" : "bg-white/5 text-gray-200 border-white/10"
                }`}
              >
                {h}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

// Flagship image panel (used when no metric panel is defined).
const FlagshipImagePanel = ({
  item,
  isLight,
  KindIcon,
  kindLabel,
  kindLightClass,
  kindDarkClass,
}: {
  item: ShippedItem;
  isLight: boolean;
  KindIcon: Icon;
  kindLabel: string;
  kindLightClass: string;
  kindDarkClass: string;
}) => (
  <div className={`relative w-full md:col-span-2 aspect-[16/9] md:aspect-auto overflow-hidden ${isLight ? "bg-gray-50" : "bg-gray-900/40"}`}>
    <Image
      src={item.image}
      alt={item.title}
      fill
      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
      sizes="(max-width: 768px) 100vw, 50vw"
      quality={80}
    />
    {!isLight && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0D1117]/40" />}

    <div className="absolute top-4 left-4 z-10">
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 backdrop-blur-md text-xs font-mono font-bold uppercase tracking-[0.18em] bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/30">
        <IconStar size={12} stroke={2.2} />
        Flagship
      </div>
    </div>

    {item.statusLabel && (
      <div className="absolute top-4 right-4 z-10">
        <div className={`inline-flex items-center gap-1 px-2.5 py-1.5 backdrop-blur-md border text-[10px] font-mono font-bold uppercase tracking-wider ${
          isLight ? "bg-emerald-50/95 text-emerald-700 border-emerald-200" : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
        }`}>
          <IconCircleCheckFilled size={11} />
          {item.statusLabel}
        </div>
      </div>
    )}

    <div className="absolute bottom-4 left-4 z-10">
      <div className={`inline-flex items-center gap-1 px-2 py-0.5 backdrop-blur-md border text-[10px] font-medium uppercase tracking-wider ${
        isLight ? `${kindLightClass} shadow-sm` : kindDarkClass
      }`}>
        <KindIcon size={10} stroke={2} />
        {kindLabel}
      </div>
    </div>
  </div>
);

// Flagship metric panel — used when a screenshot would underwhelm.
// Renders 3 big numbers stacked, plus flagship + status pills.
const FlagshipMetricsPanel = ({ item, isLight }: { item: ShippedItem; isLight: boolean }) => {
  const metrics = item.flagshipMetrics ?? [];

  return (
    <div className={`relative w-full md:col-span-2 overflow-hidden border-b md:border-b-0 md:border-r ${
      isLight
        ? "bg-gradient-to-br from-gray-50 via-orange-50/40 to-rose-50/30 border-gray-200"
        : "bg-gradient-to-br from-white/[0.03] via-orange-500/[0.04] to-rose-500/[0.04] border-white/10"
    }`}>
      {/* Background glow */}
      <div className={`pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-50 ${
        isLight ? "bg-orange-200/40" : "bg-orange-500/15"
      }`} />
      <div className={`pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-40 ${
        isLight ? "bg-rose-200/40" : "bg-rose-500/15"
      }`} />

      {/* Top pills row */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 backdrop-blur-md text-xs font-mono font-bold uppercase tracking-[0.18em] bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/30">
          <IconStar size={12} stroke={2.2} />
          Flagship
        </div>
        {item.statusLabel && (
          <div className={`inline-flex items-center gap-1 px-2.5 py-1.5 backdrop-blur-md border text-[10px] font-mono font-bold uppercase tracking-wider ${
            isLight ? "bg-emerald-50/95 text-emerald-700 border-emerald-200" : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
          }`}>
            <IconCircleCheckFilled size={11} />
            {item.statusLabel}
          </div>
        )}
      </div>

      {/* Metrics stacked */}
      <div className="relative z-10 flex flex-col justify-center gap-4 py-12 px-6 sm:py-14 sm:px-8 md:py-16 h-full min-h-[320px]">
        {metrics.map((metric) => {
          const accent = accentMap[metric.accent];
          return (
            <div key={metric.value} className="flex items-baseline gap-3 sm:gap-4">
              <div className={`text-3xl sm:text-4xl md:text-5xl font-bold font-mono leading-none bg-clip-text text-transparent ${
                isLight
                  ? metric.accent === "blue" ? "bg-gradient-to-br from-gray-900 to-blue-600"
                    : metric.accent === "emerald" ? "bg-gradient-to-br from-gray-900 to-emerald-600"
                    : metric.accent === "amber" ? "bg-gradient-to-br from-gray-900 to-amber-600"
                    : metric.accent === "rose" ? "bg-gradient-to-br from-gray-900 to-rose-600"
                    : metric.accent === "purple" ? "bg-gradient-to-br from-gray-900 to-purple-600"
                    : "bg-gradient-to-br from-gray-900 to-cyan-600"
                  : metric.accent === "blue" ? "bg-gradient-to-br from-white to-blue-300"
                    : metric.accent === "emerald" ? "bg-gradient-to-br from-white to-emerald-300"
                    : metric.accent === "amber" ? "bg-gradient-to-br from-white to-amber-300"
                    : metric.accent === "rose" ? "bg-gradient-to-br from-white to-rose-300"
                    : metric.accent === "purple" ? "bg-gradient-to-br from-white to-purple-300"
                    : "bg-gradient-to-br from-white to-cyan-300"
              }`}>
                {metric.value}
              </div>
              <span className={`text-xs sm:text-sm font-medium ${isLight ? accent.textLight : accent.text}`}>
                {metric.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ShippedFast = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === "light";

  const flagships = shippedItems.filter((s) => s.flagship);
  const others = shippedItems.filter((s) => !s.flagship);

  return (
    <section ref={sectionRef} className="py-20 sm:py-24 relative overflow-hidden">
      <div className={`absolute inset-0 -z-10 transition-colors duration-300 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`} />
      <div className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${
        isLight
          ? "[background-image:linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)]"
          : "[background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]"
      }`} />

      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading
          subtitle="What I Ship"
          title="Shipped fast. Still running."
          description="MemContext is the flagship. The rest are real plugins and production-ready apps — built end-to-end, all live."
          className="mb-12"
        />

        {/* Flagships stacked */}
        <div className="space-y-6 sm:space-y-8 mb-6 sm:mb-8">
          {flagships.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
            >
              <FlagshipCard item={item} isLight={isLight ?? false} />
            </motion.div>
          ))}
        </div>

        {/* Rest in 3-col grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {others.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <CompactCard item={item} isLight={isLight ?? false} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <Link
            href="/projects"
            className={`inline-flex items-center gap-2 px-5 py-2.5 font-medium transition-all border group hover:scale-[1.03] ${
              isLight
                ? "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                : "bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.06] hover:border-white/20"
            }`}
          >
            <span>See every project</span>
            <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ShippedFast;
