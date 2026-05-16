"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight } from "lucide-react";
import Link from "@/components/link";
import { useThemeSafe } from "@/components/theme-provider";

const WritingLink = () => {
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === "light";

  return (
    <section className="py-12 sm:py-14 relative overflow-hidden">
      <div className={`absolute inset-0 -z-10 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`} />

      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/blogs"
            className={`group flex items-center justify-between gap-4 p-5 sm:p-6 border backdrop-blur-sm transition-all hover:-translate-y-0.5 ${
              isLight
                ? "bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/40"
                : "bg-gradient-to-br from-white/[0.025] to-white/[0.005] border-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`flex items-center justify-center w-10 h-10 border ${
                isLight ? "bg-amber-50 border-amber-200" : "bg-amber-500/10 border-amber-500/20"
              }`}>
                <BookOpen size={18} className={isLight ? "text-amber-600" : "text-amber-300"} />
              </div>
              <div className="text-left">
                <div className={`text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-mono ${isLight ? "text-gray-500" : "text-gray-500"}`}>
                  I also write
                </div>
                <div className={`text-base sm:text-lg font-semibold leading-tight mt-0.5 ${isLight ? "text-gray-900" : "text-white"}`}>
                  Notes on agents, AI, and shipping fast.
                </div>
              </div>
            </div>
            <ArrowUpRight
              size={18}
              className={`flex-shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${isLight ? "text-gray-500" : "text-gray-400"}`}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WritingLink;
