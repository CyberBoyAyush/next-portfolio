"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Terminal } from "lucide-react";
import { useThemeSafe } from "./theme-provider";

const COMMAND = "npx ayush-cli@latest";

const TerminalCommand = () => {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === "light";

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("home");
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight;
        setIsVisible(scrollPosition <= heroBottom + 100);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy command");
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="hidden md:block fixed bottom-6 left-6 z-40"
        >
          <div
            className={`group relative overflow-hidden rounded-lg border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
              isLight
                ? "border-gray-200 bg-white/95 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50 hover:border-gray-300"
                : "border-white/10 bg-[#0a0a0a]/95 shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-purple-500/10 hover:border-white/20"
            }`}
          >
            {/* Terminal Header */}
            <div
              className={`flex items-center justify-between px-3 py-1.5 border-b ${
                isLight
                  ? "bg-gray-50/80 border-gray-200"
                  : "bg-white/5 border-white/5"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500/80" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                  <span className="w-2 h-2 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-1 ml-1">
                  <Terminal
                    size={10}
                    className={isLight ? "text-gray-400" : "text-gray-500"}
                  />
                  <span
                    className={`text-[10px] font-medium ${
                      isLight ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Terminal
                  </span>
                </div>
              </div>

              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className={`p-1 rounded transition-all duration-200 ${
                  copied
                    ? "bg-green-500/20 text-green-500"
                    : isLight
                    ? "hover:bg-gray-200 text-gray-400 hover:text-gray-600"
                    : "hover:bg-white/10 text-gray-500 hover:text-white"
                }`}
                aria-label={copied ? "Copied!" : "Copy command"}
              >
                {copied ? (
                  <Check size={12} className="text-green-500" />
                ) : (
                  <Copy size={12} />
                )}
              </button>
            </div>

            {/* Command Body */}
            <div className="px-3 py-2">
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <span
                  className={`select-none ${
                    isLight ? "text-green-600" : "text-green-400"
                  }`}
                >
                  $
                </span>
                <span className={isLight ? "text-gray-800" : "text-gray-100"}>
                  {COMMAND}
                </span>
              </div>
            </div>

            {/* Hover glow effect (dark mode only) */}
            {!isLight && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5" />
              </div>
            )}
          </div>

          {/* Helper text */}
          <p
            className={`text-left text-[10px] mt-1.5 ${
              isLight ? "text-gray-400" : "text-gray-500"
            }`}
          >
            View portfolio in terminal
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TerminalCommand;
