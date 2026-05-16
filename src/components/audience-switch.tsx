"use client";

import { motion } from "framer-motion";
import { Rocket, Code2 } from "lucide-react";
import { useAudienceSafe, type Audience } from "@/context/audience-provider";
import { useThemeSafe } from "./theme-provider";

interface AudienceOption {
  id: Audience;
  label: string;
  icon: typeof Rocket;
}

const options: AudienceOption[] = [
  { id: "founder", label: "For Founders", icon: Rocket },
  { id: "engineer", label: "For Engineers", icon: Code2 },
];

interface AudienceSwitchProps {
  variant?: "hero";
  className?: string;
}

const AudienceSwitch = ({ variant = "hero", className = "" }: AudienceSwitchProps) => {
  const audienceContext = useAudienceSafe();
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === "light";
  const audience: Audience = audienceContext?.audience ?? "founder";
  const setAudience = audienceContext?.setAudience;

  if (!setAudience) return null;

  // Reserved for future placements; kept to support potential expansion without
  // changing call sites.
  void variant;

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div
        className={`flex p-1 backdrop-blur-xl border shadow-inner ${
          isLight
            ? "bg-gray-100/80 border-gray-200 shadow-gray-200/40"
            : "bg-white/[0.04] border-white/10 shadow-black/20"
        }`}
        role="radiogroup"
        aria-label="Choose portfolio audience"
      >
        {options.map((option) => {
          const isActive = audience === option.id;
          const Icon = option.icon;
          const isFounder = option.id === "founder";
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={option.label}
              onClick={() => setAudience(option.id)}
              className={`relative px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-[15px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isLight ? "focus-visible:ring-gray-400 focus-visible:ring-offset-[#fafafa]" : "focus-visible:ring-gray-600 focus-visible:ring-offset-[#0D1117]"
              } ${
                isActive
                  ? isLight
                    ? "text-gray-900"
                    : "text-white"
                  : isLight
                    ? "text-gray-500 hover:text-gray-700"
                    : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeAudienceHero"
                  className={`absolute inset-0 border shadow-sm ${
                    isLight
                      ? isFounder
                        ? "bg-white border-orange-200/80"
                        : "bg-white border-blue-200/80"
                      : isFounder
                        ? "bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-rose-500/10 border-orange-500/30"
                        : "bg-gradient-to-br from-blue-500/15 via-cyan-500/10 to-indigo-500/10 border-blue-500/30"
                  }`}
                  transition={{ type: "spring", bounce: 0.18, duration: 0.55 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                <Icon
                  size={14}
                  className={
                    isActive
                      ? isFounder
                        ? isLight
                          ? "text-orange-600"
                          : "text-orange-400"
                        : isLight
                          ? "text-blue-600"
                          : "text-blue-400"
                      : ""
                  }
                />
                <span>{option.label}</span>
              </span>
            </button>
          );
        })}
      </div>
      <p className={`text-[11px] sm:text-xs font-mono tracking-wide ${isLight ? "text-gray-400" : "text-gray-500"}`}>
        {audience === "founder"
          ? "Outputs, outcomes, and how I work."
          : "The technical breakdown."}
      </p>
    </div>
  );
};

export default AudienceSwitch;
