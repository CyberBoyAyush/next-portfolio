"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { Calendar, Linkedin, Github, Mail, ChevronDown, ArrowRight } from "lucide-react";
import Image from "@/components/image";
import { getCalApi } from "@calcom/embed-react";
import { useThemeSafe } from "@/components/theme-provider";
import { useAudienceSafe } from "@/context/audience-provider";
import { heroProfileImage } from "@/lib/seo";
import AudienceSwitch from "@/components/audience-switch";

const XIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FounderHero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const profileImageRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const themeContext = useThemeSafe();
  const theme = themeContext?.theme ?? "dark";
  const isLight = theme === "light";
  const audienceContext = useAudienceSafe();
  const setAudience = audienceContext?.setAudience;

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { theme, hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, [theme]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(false);
  }, []);

  useEffect(() => {
    const image = profileImageRef.current;
    if (image?.complete && image.naturalWidth > 0) {
      setImageLoaded(true);
    }
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Base bg */}
      <div className={`absolute inset-0 -z-20 transition-colors duration-300 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`} />

      {/* Grid */}
      <div className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${
        isLight
          ? "[background-image:linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)]"
          : "[background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]"
      }`} />

      {/* Founder-mode signature glow */}
      <div className={`absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] -z-10 rounded-full opacity-50 blur-[140px] pointer-events-none ${
        isLight ? "bg-gradient-to-br from-orange-200/60 via-amber-100/40 to-rose-100/40" : "bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-rose-500/15"
      }`} />
      <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] -z-10 rounded-full opacity-30 blur-[120px] pointer-events-none ${
        isLight ? "bg-gradient-to-tr from-blue-200/50 to-transparent" : "bg-gradient-to-tr from-blue-500/10 to-transparent"
      }`} />

      <div className="container mx-auto px-4 pt-24 pb-20 sm:pt-32 sm:pb-16 md:pt-32 md:pb-20 w-full min-h-[100dvh] flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full flex flex-col justify-center items-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-4 sm:gap-5 w-full"
          >
            {/* Audience Switch */}
            <motion.div variants={itemVariants}>
              <AudienceSwitch variant="hero" />
            </motion.div>

            {/* Availability badge */}
            <motion.div variants={itemVariants}>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 backdrop-blur-md border text-xs sm:text-sm font-medium ${
                isLight ? "bg-white/80 border-emerald-200 text-emerald-700" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
              }`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Currently shipping
              </div>
            </motion.div>

            {/* Profile photo */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="relative inline-block">
                {/* Soft outer halo — gives the photo presence without animating */}
                <div
                  aria-hidden
                  className={`absolute -inset-3 rounded-full blur-2xl opacity-60 pointer-events-none ${
                    isLight ? "bg-gradient-to-br from-orange-200/70 to-rose-200/50" : "bg-gradient-to-br from-orange-500/30 to-rose-500/20"
                  }`}
                />

                <div
                  className={`relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 shadow-2xl ${
                    isLight
                      ? "ring-white bg-gray-100 shadow-orange-300/50"
                      : "ring-white/90 bg-gray-900 shadow-orange-500/25"
                  }`}
                >
                  <Image
                    ref={profileImageRef}
                    src={heroProfileImage}
                    alt="Ayush Sharma - CTO and founding engineer"
                    fill
                    sizes="(max-width: 768px) 7rem, 9rem"
                    style={{ objectPosition: "center 22%" }}
                    className={`object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                    priority
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    quality={95}
                  />
                  {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-10 h-10 border-2 animate-spin ${isLight ? "border-gray-300 border-t-gray-600" : "border-gray-600 border-t-white"}`} />
                    </div>
                  )}
                  {imageError && (
                    <div className={`absolute inset-0 flex items-center justify-center ${isLight ? "bg-gray-200" : "bg-gray-800"}`}>
                      <span className={`text-2xl font-bold ${isLight ? "text-gray-700" : "text-white"}`}>AS</span>
                    </div>
                  )}
                </div>

                {/* Status dot */}
                <div className="absolute bottom-3 right-1 translate-x-[28%] translate-y-[28%]">
                  <div className={`relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full border-[3px] shadow-sm ${
                    isLight ? "border-[#fafafa] bg-[#fafafa]" : "border-[#0D1117] bg-[#0D1117]"
                  }`}>
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex items-center justify-center w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                      <span className="absolute inset-0 rounded-full bg-white/20" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Headlines */}
            <motion.div variants={itemVariants} className="space-y-2 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
                <span className={`drop-shadow-sm ${isLight ? "text-gray-900" : "text-white"}`}>
                  I don&apos;t need a
                </span>
                <br />
                <span className={`text-transparent bg-clip-text ${isLight ? "bg-gradient-to-br from-gray-900 via-orange-700 to-rose-700" : "bg-gradient-to-br from-white via-orange-200 to-amber-300"}`}>
                  job description.
                </span>
              </h1>
              <p className={`text-lg sm:text-xl md:text-2xl font-medium ${isLight ? "text-gray-600" : "text-gray-400"}`}>
                Tell me the outcome.{" "}
                <span className={`font-semibold ${isLight ? "text-gray-900" : "text-white"}`}>
                  I&apos;ll ship it.
                </span>
              </p>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="max-w-3xl mx-auto px-2">
              <p className={`text-sm sm:text-base md:text-lg leading-relaxed text-center ${isLight ? "text-gray-600" : "text-gray-300"}`}>
                AI-first engineer. CTO at{" "}
                <span className={`font-semibold ${isLight ? "text-gray-900" : "text-white"}`}>Kakiyo</span>.
                I build crazy fast, iterate in production, and ship{" "}
                <span className={`font-semibold ${isLight ? "text-orange-700" : "text-orange-300"}`}>custom plugins</span>{" "}
                for every tool I use. Best fit for founders who don&apos;t write tickets and judge on what&apos;s live.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                data-cal-namespace="30min"
                data-cal-link="cyberboyayush/30min"
                data-cal-config={`{"layout":"month_view","theme":"${theme}"}`}
                className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 font-semibold transition-all hover:scale-[1.03] active:scale-[0.98] shadow-xl text-sm sm:text-base cursor-pointer ${
                  isLight
                    ? "bg-gradient-to-br from-orange-600 to-rose-600 text-white hover:shadow-orange-500/30 shadow-orange-500/20"
                    : "bg-gradient-to-br from-orange-500 to-rose-500 text-white hover:shadow-orange-500/40 shadow-orange-500/20"
                }`}
              >
                <Calendar size={18} />
                Schedule a call
                <ArrowRight size={14} className="opacity-70" />
              </button>
              {/*
              <a
                href="/Resume.pdf"
                className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 font-medium transition-all border hover:scale-[1.03] active:scale-[0.98] text-sm sm:text-base ${
                  isLight
                    ? "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    : "bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.06] hover:border-white/20"
                }`}
              >
                <FileText size={18} />
                Resume
              </a>
              */}
              <a
                href="/x"
                className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 font-medium transition-all border hover:scale-[1.03] active:scale-[0.98] text-sm sm:text-base ${
                  isLight
                    ? "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    : "bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.06] hover:border-white/20"
                }`}
              >
                <XIcon size={16} />
                DM me
              </a>
            </motion.div>

            {/* Social bar + scroll */}
            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-3 pt-4">
              <div className="flex items-center justify-center gap-5">
                <a href="https://linkedin.com/in/cyberboyayush" target="_blank" rel="noopener noreferrer" className={`hover:scale-110 transition-all ${isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"}`} aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href="https://github.com/cyberboyayush" target="_blank" rel="noopener noreferrer" className={`hover:scale-110 transition-all ${isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"}`} aria-label="GitHub">
                  <Github size={18} />
                </a>
                <a href="mailto:hi@aysh.me" className={`hover:scale-110 transition-all ${isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"}`} aria-label="Email">
                  <Mail size={18} />
                </a>
              </div>

              {setAudience && (
                <button
                  type="button"
                  onClick={() => setAudience("engineer")}
                  className={`inline-flex items-center gap-1 text-[11px] sm:text-xs font-mono transition-colors ${
                    isLight ? "text-gray-400 hover:text-gray-700" : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  Want the technical breakdown? <span className="underline underline-offset-2">For Engineers →</span>
                </button>
              )}

              <a
                href="#receipts"
                className={`hidden md:inline-flex animate-bounce p-2 transition-colors ${
                  isLight ? "text-gray-400 hover:text-gray-700" : "text-gray-500 hover:text-white"
                }`}
                aria-label="Scroll down"
              >
                <ChevronDown size={22} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderHero;
