"use client";

import { useRef, useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  FileText,
  Calendar,
  TrendingUp,
  Network,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import TechTicker from "./tech-ticker";
import { getCalApi } from "@calcom/embed-react";
import { useThemeSafe } from "./theme-provider";

const XIcon = ({ size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const statusBadgeRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageAttempted, setImageAttempted] = useState(false);
  const [isHoverCapable, setIsHoverCapable] = useState(true);
  const [isStatusCardOpen, setIsStatusCardOpen] = useState(false);
  
  const themeContext = useThemeSafe();
  const theme = themeContext?.theme ?? 'dark';
  const isLight = theme === 'light';

  const roles = [
    { title: "Full Stack Developer", article: "a" },
    { title: "AI Engineer", article: "an" },
    { title: "AI + Backend Guy", article: "an" },
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { theme: theme, hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, [theme]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateCapability = (matches: boolean) => {
      setIsHoverCapable(matches);
    };

    updateCapability(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) =>
      updateCapability(event.matches);

    try {
      mediaQuery.addEventListener("change", listener);
    } catch {
      try {
        mediaQuery.addListener(listener);
      } catch {
        console.warn("Media query listener not supported");
      }
    }

    return () => {
      try {
        mediaQuery.removeEventListener("change", listener);
      } catch {
        try {
          mediaQuery.removeListener(listener);
        } catch {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  useEffect(() => {
    if (isHoverCapable) {
      setIsStatusCardOpen(false);
      return;
    }

    const handleOutsideInteraction = (event: MouseEvent | TouchEvent) => {
      if (!statusBadgeRef.current) return;
      if (statusBadgeRef.current.contains(event.target as Node)) return;
      setIsStatusCardOpen(false);
    };

    document.addEventListener("click", handleOutsideInteraction);
    document.addEventListener("touchstart", handleOutsideInteraction);

    return () => {
      document.removeEventListener("click", handleOutsideInteraction);
      document.removeEventListener("touchstart", handleOutsideInteraction);
    };
  }, [isHoverCapable]);

  const handleImageLoad = useCallback(() => {
    if (!imageLoaded) {
      setImageLoaded(true);
      setImageError(false);
    }
  }, [imageLoaded]);

  const handleImageError = useCallback(() => {
    if (!imageError && !imageAttempted) {
      setImageError(true);
      setImageLoaded(false);
      setImageAttempted(true);
    }
  }, [imageError, imageAttempted]);

  const ProfileImage = useMemo(() => {
    if (imageError || imageAttempted) return null;

    return (
      <Image
        src="https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPhWVT9F8tcdLGNp9S0ETXmuk4jy87UFaBIrYw"
        alt="Ayush Sharma - Full Stack Developer and AI Engineer"
        fill
        sizes="(max-width: 768px) 10rem, 12rem"
        className={`object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        priority
        onLoad={handleImageLoad}
        onError={handleImageError}
        unoptimized={false}
        quality={95}
      />
    );
  }, [
    imageLoaded,
    imageError,
    imageAttempted,
    handleImageLoad,
    handleImageError,
  ]);

  const handleStatusToggle = useCallback(() => {
    if (isHoverCapable) return;
    setIsStatusCardOpen((prev) => !prev);
  }, [isHoverCapable]);

  const statusCardVisible = !isHoverCapable && isStatusCardOpen;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      ref={ref}
    >
      <div className={`absolute inset-0 -z-10 transition-colors duration-300 ${isLight ? 'bg-[#fafafa]' : 'bg-[#0D1117]'}`} />
      <div className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${isLight ? '[background-image:linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)]' : '[background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]'}`} />

      <div className="container mx-auto px-4 pt-24 pb-20 sm:pt-32 sm:pb-16 md:pt-32 md:pb-20 w-full min-h-[100dvh] flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full flex flex-col justify-center items-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3 sm:space-y-4 flex-grow flex flex-col justify-center items-center w-full"
          >
            {/* Profile Image */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center"
            >
              <div className="relative inline-block group" ref={statusBadgeRef}>
                <div className={`w-28 h-28 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 cursor-pointer shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:ring-4 group-hover:ring-purple-500/30 group-hover:shadow-purple-500/20 ${isLight ? 'ring-gray-200 bg-gray-100 shadow-gray-300/30' : 'ring-gray-800/50 bg-gray-900 shadow-purple-500/10'}`}>
                  {ProfileImage}
                  {!imageLoaded && !imageError && !imageAttempted && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-12 h-12 border-2 animate-spin ${isLight ? 'border-gray-300 border-t-gray-600' : 'border-gray-600 border-t-white'}`}></div>
                    </div>
                  )}
                  {(imageError || imageAttempted) && !imageLoaded && (
                    <div className={`absolute inset-0 flex items-center justify-center ${isLight ? 'bg-gray-200' : 'bg-gray-800'}`}>
                      <span className={`text-2xl font-bold ${isLight ? 'text-gray-700' : 'text-white'}`}>AS</span>
                    </div>
                  )}
                </div>

                {/* Availability indicator with tooltip bubble */}
                <div className="absolute bottom-4 right-2 translate-x-[32%] translate-y-[32%] sm:translate-x-[28%] sm:translate-y-[28%]">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={handleStatusToggle}
                      className={`relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full border-[3px] overflow-visible shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/80 focus-visible:ring-offset-2 transition-transform hover:scale-110 active:scale-95 ${isLight ? 'border-[#fafafa] bg-[#fafafa] focus-visible:ring-offset-[#fafafa]' : 'border-[#0D1117] bg-[#0D1117] focus-visible:ring-offset-[#0D1117]'}`}
                      aria-label={
                        isHoverCapable
                          ? "Availability status"
                          : "Toggle availability status"
                      }
                      aria-expanded={statusCardVisible}
                    >
                      <span className="sr-only">Availability status</span>
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                      <span className="absolute -inset-1 rounded-full bg-emerald-500/20 blur-md animate-pulse" />
                      <span className="relative inline-flex items-center justify-center w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.5)] border border-emerald-300/20">
                        <span className="absolute inset-0 rounded-full bg-white/20" />
                      </span>
                    </button>

                    <div
                      className={`absolute left-[calc(100%+0.75rem)] sm:left-[calc(100%+0.9rem)] top-1/2 -translate-y-1/2 z-10 transition-all duration-300 ease-out pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-x-0 group-focus-within:pointer-events-auto ${statusCardVisible
                        ? "opacity-100 translate-x-0 pointer-events-auto"
                        : ""
                        }`}
                    >
                      <div className={`absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 ${isLight ? 'bg-white border-l border-b border-gray-200' : 'bg-gray-900/95 border-l border-b border-white/10'}`} />
                      <div className={`relative backdrop-blur-md border rounded-xl px-4 py-2.5 ${isLight ? 'bg-white border-gray-200 shadow-lg shadow-gray-200/50' : 'bg-gray-900/95 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'}`}>
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <span className={`text-xs sm:text-sm font-medium whitespace-nowrap ${isLight ? 'text-gray-800' : 'text-gray-100'}`}>
                            Available For Work
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              variants={itemVariants}
              className="space-y-3 text-center"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                <span className={`drop-shadow-sm ${isLight ? 'text-gray-900' : 'text-white'}`}>Hi, I&apos;m</span>
                <br />
                <span className={`text-transparent bg-clip-text ${isLight ? 'bg-gradient-to-b from-gray-900 to-gray-600' : 'bg-gradient-to-b from-white to-white/60'}`}>Ayush Sharma</span>
              </h1>
              <div className={`text-xl sm:text-2xl md:text-3xl font-medium h-8 sm:h-10 md:h-12 flex items-center justify-center ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                <span>I&apos;m </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentRoleIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className={`inline-block ml-2 ${isLight ? 'text-gray-800' : 'text-white'}`}
                  >
                    {roles[currentRoleIndex].article} {roles[currentRoleIndex].title}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              variants={itemVariants}
              className="space-y-3 text-center max-w-3xl mx-auto px-4"
            >
              <p className={`text-base sm:text-lg md:text-xl leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                I build{" "}
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 font-medium text-sm align-middle transition-colors ${isLight ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200' : 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20'}`}>
                  <TrendingUp size={14} />
                  Scalable
                </span>
                , high-performance AI applications and modern web solutions with a focus on exceptional{" "}
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 font-medium text-sm align-middle transition-colors ${isLight ? 'bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20'}`}>
                  <Sparkles size={14} />
                  User Experience
                </span>{" "}
                and robust{" "}
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 font-medium text-sm align-middle transition-colors ${isLight ? 'bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-200' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20'}`}>
                  <Network size={14} />
                  System Design
                </span>
                .
              </p>
            </motion.div>

            {/* Tech Ticker */}
            <motion.div
              variants={itemVariants}
              className="w-full pt-1"
            >
              <TechTicker />
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1"
            >
              <a
                href="/Resume.pdf"
                className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 font-semibold hover:scale-105 active:scale-95 transition-all shadow-xl text-sm sm:text-base ${isLight ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-gray-300/30' : 'bg-white text-gray-900 hover:bg-gray-100 shadow-white/5'}`}
              >
                <FileText size={18} className="sm:w-[18px] sm:h-[18px]" />
                Resume / CV
              </a>
              <a
                href="#contact"
                className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-transparent font-medium transition-all border text-sm sm:text-base ${isLight ? 'text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400' : 'text-white border-white/10 hover:bg-white/5 hover:border-white/30'}`}
              >
                <Mail size={18} className="sm:w-[18px] sm:h-[18px]" />
                Get in touch
              </a>
              <button
                data-cal-namespace="30min"
                data-cal-link="cyberboyayush/30min"
                data-cal-config={`{"layout":"month_view","theme":"${theme}"}`}
                className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 font-medium transition-all border text-sm sm:text-base cursor-pointer ${isLight ? 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200 hover:border-orange-300' : 'bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500/20 hover:border-orange-500/40'}`}
              >
                <Calendar size={18} className="sm:w-[18px] sm:h-[18px]" />
                Schedule Call
              </button>
            </motion.div>

            {/* Social Links + Scroll */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center justify-center gap-3 pt-4 sm:pt-4"
            >
              <div className="flex items-center justify-center gap-6 sm:gap-6">
                <a
                  href="/x"
                  className={`hover:scale-110 transition-all ${isLight ? 'text-gray-500 hover:text-gray-900' : 'text-gray-400 hover:text-white'}`}
                  aria-label="Twitter"
                >
                  <XIcon size={22} className="sm:w-[20px] sm:h-[20px]" />
                </a>
                <a
                  href="https://linkedin.com/in/cyberboyayush"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:scale-110 transition-all ${isLight ? 'text-gray-500 hover:text-gray-900' : 'text-gray-400 hover:text-white'}`}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} className="sm:w-[20px] sm:h-[20px]" />
                </a>
                <a
                  href="https://github.com/cyberboyayush"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:scale-110 transition-all ${isLight ? 'text-gray-500 hover:text-gray-900' : 'text-gray-400 hover:text-white'}`}
                  aria-label="GitHub"
                >
                  <Github size={22} className="sm:w-[20px] sm:h-[20px]" />
                </a>
                <a
                  href="mailto:hi@aysh.me"
                  className={`hover:scale-110 transition-all ${isLight ? 'text-gray-500 hover:text-gray-900' : 'text-gray-400 hover:text-white'}`}
                  aria-label="Email"
                >
                  <Mail size={22} className="sm:w-[20px] sm:h-[20px]" />
                </a>
              </div>
              <a
                href="#skills"
                className={`hidden md:inline-flex animate-bounce p-2 transition-colors ${isLight ? 'text-gray-400 hover:text-gray-700' : 'text-gray-500 hover:text-white'}`}
                aria-label="Scroll down"
              >
                <ChevronDown size={24} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
