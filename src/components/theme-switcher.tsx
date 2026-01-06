"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Tooltip } from "./blog-content-wrapper";

interface ThemeSwitcherProps {
  orientation?: "horizontal" | "vertical";
}

export default function ThemeSwitcher({ orientation = "horizontal" }: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <Tooltip content={isLight ? "Dark Mode" : "Light Mode"} orientation={orientation}>
      <button
        onClick={toggleTheme}
        className={`flex items-center justify-center h-[38px] w-[38px] rounded-lg transition-all duration-300 group border ${
          isLight
            ? "bg-gray-100 border-gray-200 hover:bg-gray-200 hover:border-gray-300"
            : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
        }`}
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      >
        {isLight ? (
          <Moon
            size={20}
            className="text-gray-600 group-hover:text-gray-800 transition-colors"
          />
        ) : (
          <Sun
            size={20}
            className="text-gray-400 group-hover:text-yellow-400 transition-colors"
          />
        )}
      </button>
    </Tooltip>
  );
}
