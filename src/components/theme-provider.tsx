"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

type Theme = "dark" | "light";
type Font = "geist" | "jetbrains";

interface ThemeContextType {
  theme: Theme;
  font: Font;
  setTheme: (theme: Theme) => void;
  setFont: (font: Font) => void;
  toggleTheme: () => void;
  toggleFont: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const THEME_STORAGE_KEY = "portfolio-theme";
const FONT_STORAGE_KEY = "portfolio-font";

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function useThemeSafe() {
  return useContext(ThemeContext);
}

function applyThemeToDOM(theme: Theme) {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

function applyFontToDOM(font: Font) {
  if (typeof document !== "undefined") {
    document.body.classList.remove("font-geist", "font-jetbrains");
    document.body.classList.add(`font-${font}`);
  }
}

function ThemeApplier({ theme, font }: { theme: Theme; font: Font }) {
  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  useEffect(() => {
    applyFontToDOM(font);
  }, [font]);

  return null;
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch {
    // localStorage not available
  }
  
  return "dark";
}

function getInitialFont(): Font {
  if (typeof window === "undefined") return "jetbrains";
  
  try {
    const stored = localStorage.getItem(FONT_STORAGE_KEY);
    if (stored === "geist" || stored === "jetbrains") {
      return stored;
    }
  } catch {
    // localStorage not available
  }
  
  return "jetbrains";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [font, setFontState] = useState<Font>("jetbrains");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setThemeState(getInitialTheme());
    setFontState(getInitialFont());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch {
        // localStorage not available
      }
    }
  }, [theme, mounted]);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(FONT_STORAGE_KEY, font);
      } catch {
        // localStorage not available
      }
    }
  }, [font, mounted]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const setFont = useCallback((newFont: Font) => {
    setFontState(newFont);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const toggleFont = useCallback(() => {
    setFontState((prev) => (prev === "geist" ? "jetbrains" : "geist"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, font, setTheme, setFont, toggleTheme, toggleFont }}>
      <ThemeApplier theme={theme} font={font} />
      {children}
    </ThemeContext.Provider>
  );
}

export function useBlogTheme() {
  return useTheme();
}

export function useBlogThemeSafe() {
  return useThemeSafe();
}
