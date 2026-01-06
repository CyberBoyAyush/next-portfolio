"use client";

import { useState, createContext, useContext, useRef, useEffect } from "react";
import { Minus, Plus, Check, CaseSensitive } from "lucide-react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { useThemeSafe } from "./theme-provider";
import ThemeSwitcher from "./theme-switcher";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

type FontType = 'standard' | 'mono' | 'inter';

// Context
const BlogContext = createContext<{
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  fontType: FontType;
  setFontType: React.Dispatch<React.SetStateAction<FontType>>;
} | null>(null);

export function useBlogContext() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }
  return context;
}

// Provider - defaults to Inter for optimal blog readability
export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = useState(18);
  // Default to 'inter' for best long-form reading experience
  const [fontType, setFontType] = useState<FontType>('inter');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) {
        setFontSize(16);
      }
    }
  }, []);

  return (
    <BlogContext.Provider value={{ fontSize, setFontSize, fontType, setFontType }}>
      {children}
    </BlogContext.Provider>
  );
}

// Font Wrapper Component (Applies Font Family to Headings, Metadata, Content, etc.)
export function BlogFontWrapper({ children }: { children: React.ReactNode }) {
  const { fontType } = useBlogContext();

  // Get font class and inline style based on selected font type
  const getFontStyles = () => {
    switch (fontType) {
      case 'mono':
        return { 
          className: jetbrainsMono.className,
          style: { fontFamily: 'var(--font-jetbrains-mono), monospace' }
        };
      case 'inter':
        return { 
          className: inter.className,
          style: { fontFamily: `${inter.style.fontFamily}, system-ui, sans-serif` }
        };
      default: // 'standard' - Geist Sans
        return { 
          className: '',
          style: { fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }
        };
    }
  };

  const { className, style } = getFontStyles();

  return (
    <div className={`blog-font-wrapper ${className}`} style={style}>
      {children}
    </div>
  );
}

// Tooltip Component
export function Tooltip({ 
  children, 
  content, 
  orientation = 'horizontal' 
}: { 
  children: React.ReactNode; 
  content: string; 
  orientation?: 'horizontal' | 'vertical' 
}) {
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === 'light';
  
  return (
    <div className="group relative flex items-center justify-center">
      {children}
      <span className={`absolute whitespace-nowrap px-2 py-1 text-xs rounded border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[60] shadow-xl ${
        orientation === 'vertical' 
          ? 'left-full ml-2'
          : 'bottom-full mb-2'
      } ${
        isLight 
          ? 'bg-white text-gray-700 border-gray-200' 
          : 'bg-[#161b22] text-gray-300 border-white/10'
      }`}>
        {content}
      </span>
    </div>
  );
}

// Font Switcher Component
export function BlogFontControls({ orientation = 'horizontal', openDirection = 'down' }: { orientation?: 'horizontal' | 'vertical'; openDirection?: 'up' | 'down' }) {
  const { fontType, setFontType } = useBlogContext();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isVertical = orientation === 'vertical';
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === 'light';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fonts: { type: FontType; label: string; className?: string }[] = [
    { type: 'inter', label: 'Inter', className: inter.className },
    { type: 'standard', label: 'Geist Sans' },
    { type: 'mono', label: 'JetBrains', className: jetbrainsMono.className },
  ];

  const getDropdownPosition = () => {
    if (isVertical) return 'left-full top-0 ml-2';
    if (openDirection === 'up') return 'bottom-full left-0 mb-2';
    return 'top-full left-0 mt-2';
  };

  return (
    <div className="relative" ref={menuRef}>
      <Tooltip content="Change Font" orientation={orientation}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center h-[38px] w-[38px] rounded-lg transition-colors border ${
            isLight 
              ? `bg-gray-100 border-gray-200 hover:bg-gray-200 hover:border-gray-300 ${isOpen ? 'bg-gray-200 border-gray-300' : ''}` 
              : `bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 ${isOpen ? 'bg-white/10 border-white/20' : ''}`
          }`}
          aria-label="Change font"
        >
          <CaseSensitive size={20} className={isLight ? 'text-gray-600' : 'text-gray-400'} />
        </button>
      </Tooltip>

      {isOpen && (
        <div className={`absolute w-40 rounded-lg shadow-xl overflow-hidden z-50 backdrop-blur-sm border ${getDropdownPosition()} ${
          isLight 
            ? 'bg-white border-gray-200' 
            : 'bg-[#161b22] border-white/10'
        }`}>
          <div className="p-1 flex flex-col gap-0.5">
            {fonts.map((font) => (
              <button
                key={font.type}
                onClick={() => {
                  setFontType(font.type);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                  fontType === font.type
                    ? isLight ? 'bg-gray-100 text-gray-900' : 'bg-white/10 text-white'
                    : isLight ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={font.className}>
                  {font.label}
                </span>
                {fontType === font.type && <Check size={14} className="text-blue-500" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Zoom Controls Component
interface BlogZoomControlsProps {
  orientation?: 'horizontal' | 'vertical';
}

export function BlogZoomControls({ orientation = 'horizontal' }: BlogZoomControlsProps) {
  const { fontSize, setFontSize } = useBlogContext();
  const isVertical = orientation === 'vertical';
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === 'light';

  return (
    <div className={`flex items-center gap-1 rounded-lg p-1 border transition-colors ${
      isVertical ? 'flex-col-reverse w-[38px] h-auto' : 'h-[38px]'
    } ${
      isLight 
        ? 'bg-gray-100 border-gray-200' 
        : 'bg-white/5 border-white/10'
    }`}>
      <Tooltip content="Decrease Size" orientation={orientation}>
        <button
          onClick={() => setFontSize((s) => Math.max(s - 2, 14))}
          className={`p-1.5 rounded-md transition-colors ${
            isLight 
              ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-200' 
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Decrease font size"
        >
          <Minus size={16} />
        </button>
      </Tooltip>
      
      <Tooltip content="Reset Size" orientation={orientation}>
        <div
          onClick={() => {
            if (window.innerWidth < 640) setFontSize(16);
            else setFontSize(18);
          }}
          className={`text-xs font-medium cursor-pointer font-mono text-center select-none transition-colors flex items-center justify-center ${
            isVertical ? 'py-1 w-full' : 'min-w-[3ch] px-1'
          } ${
            isLight 
              ? 'text-gray-600 hover:text-gray-900' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          {fontSize}
        </div>
      </Tooltip>

      <Tooltip content="Increase Size" orientation={orientation}>
        <button
          onClick={() => setFontSize((s) => Math.min(s + 2, 32))}
          className={`p-1.5 rounded-md transition-colors ${
            isLight 
              ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-200' 
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Increase font size"
        >
          <Plus size={16} />
        </button>
      </Tooltip>
    </div>
  );
}

export function BlogFloatingControls({ children }: { children: React.ReactNode }) {
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === 'light';
  
  return (
    <div className={`hidden xl:flex fixed left-4 2xl:left-8 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-3 p-2 backdrop-blur-xl border rounded-2xl shadow-2xl transition-all ${
      isLight 
        ? 'bg-white/95 border-gray-200 hover:border-gray-300 shadow-gray-200/50' 
        : 'bg-[#0d1117]/90 border-white/10 hover:border-white/20'
    }`}>
      <ThemeSwitcher orientation="vertical" />
      <div className={`w-6 h-px ${isLight ? 'bg-gray-200' : 'bg-white/10'}`} />
      <BlogFontControls orientation="vertical" />
      <div className={`w-6 h-px ${isLight ? 'bg-gray-200' : 'bg-white/10'}`} />
      <BlogZoomControls orientation="vertical" />
      <div className={`w-6 h-px ${isLight ? 'bg-gray-200' : 'bg-white/10'}`} />
      {children}
    </div>
  );
}

// Content Wrapper Component (Applies Size to Body Content only)
export default function BlogContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fontSize, fontType } = useBlogContext();

  // Optical adjustment: Mono font is wider/larger, so we reduce the size slightly
  const effectiveFontSize = fontType === 'mono' ? fontSize - 2 : fontSize;

  // Get font family based on type
  const getFontFamily = () => {
    switch (fontType) {
      case 'mono':
        return 'var(--font-jetbrains-mono), monospace';
      case 'inter':
        return `${inter.style.fontFamily}, system-ui, sans-serif`;
      default:
        return 'var(--font-geist-sans), system-ui, sans-serif';
    }
  };

  // Get font class
  const getFontClass = () => {
    if (fontType === 'mono') return jetbrainsMono.className;
    if (fontType === 'inter') return inter.className;
    return '';
  };

  return (
    <div
      className={`blog-content ${getFontClass()}`}
      style={
        {
          "--blog-text-size": `${effectiveFontSize}px`,
          fontFamily: getFontFamily(),
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
