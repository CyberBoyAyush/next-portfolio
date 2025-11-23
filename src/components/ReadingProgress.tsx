"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<"down" | "up">("down");
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map the progress to position along the track
  // We subtract cat height (32px) to keep it within bounds
  const catPosition = useTransform(smoothProgress, (value) => `calc(${value * 100}% - 32px)`);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setDirection("down");
      } else if (currentScrollY < lastScrollY.current) {
        setDirection("up");
      }
      lastScrollY.current = currentScrollY;
      
      // Set scrolling state
      setIsScrolling(true);
      
      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Set timeout to detect stop
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setProgress(Math.round(latest * 100));
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [scrollYProgress]);

  // Determine animation style
  const getAnimation = () => {
    if (!isScrolling) return "none";
    return `${direction === "down" ? "catRunDown" : "catRunUp"} 0.2s steps(1) infinite`;
  };

  const getBackgroundPosition = () => {
    if (!isScrolling) return "-96px -96px"; // Sitting pose: [-3, -3]
    return undefined; // Let animation handle it
  };

  return (
    <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-3 pointer-events-none h-[60vh]">
      {/* Container */}
      <div className="relative h-full w-1.5 bg-white/5 rounded-full overflow-visible">
        
        {/* The Track Glow Line */}
        <div className="absolute inset-0 rounded-full bg-white/5 blur-[1px]" />

        {/* Progress Fill */}
        <motion.div
          className="absolute top-0 left-0 right-0 w-full bg-blue-500 rounded-full origin-top shadow-[0_0_10px_rgba(59,130,246,0.6)]"
          style={{ scaleY: smoothProgress, height: "100%" }}
        />

        {/* The Cat Runner */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-8 h-8 z-50"
          style={{
            top: catPosition,
          }}
        >
          {/* Percentage Label Bubble */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 px-2 py-1 bg-[#0d1117]/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl flex items-center gap-1.5 mr-2 min-w-[60px] justify-center transition-opacity duration-200">
            <span className="text-[10px] font-mono font-bold text-blue-400 tabular-nums">
              {progress}%
            </span>
          </div>

          {/* Cat Sprite */}
          <div 
            className="w-8 h-8 relative transition-transform duration-300"
            style={{
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))" 
            }}
          >
            <div
              className="absolute inset-0 bg-[url('/oneko.gif')]"
              style={{
                imageRendering: "pixelated",
                backgroundSize: "256px 128px",
                animation: getAnimation(),
                backgroundPosition: getBackgroundPosition(),
              }}
            />
          </div>
        </motion.div>
      </div>
      
      <style jsx global>{`
        @keyframes catRunDown {
          0%, 49% { background-position: -192px -96px; } /* [-6, -3] */
          50%, 100% { background-position: -224px -64px; } /* [-7, -2] */
        }
        @keyframes catRunUp {
          0%, 49% { background-position: -32px -64px; }   /* [-1, -2] */
          50%, 100% { background-position: -32px -96px; }  /* [-1, -3] */
        }
      `}</style>
    </div>
  );
}
