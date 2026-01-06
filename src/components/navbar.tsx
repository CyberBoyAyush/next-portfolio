'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Code2, Home, FolderOpen, BookOpen, Github, ExternalLink, Sun, Moon, Type } from 'lucide-react';
import { useThemeSafe } from './theme-provider';

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

const JetBrainsIcon = ({ size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <text x="3" y="17" fontSize="14" fontWeight="bold" fontFamily="monospace">JB</text>
  </svg>
);

const Navbar = () => {
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 100], [0, -20]);
  const headerOpacity = useTransform(scrollY, [0, 50, 100], [1, 0.8, 0.6]);
  const themeContext = useThemeSafe();
  const theme = themeContext?.theme ?? 'dark';
  const font = themeContext?.font ?? 'geist';
  const isLight = theme === 'light';
  const isJetBrains = font === 'jetbrains';

  const handleThemeToggle = () => {
    themeContext?.toggleTheme();
  };

  const handleFontToggle = () => {
    themeContext?.toggleFont();
  };

  return (
    <>
      {/* Desktop Navbar - Floating */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:block fixed top-4 left-0 right-0 z-50"
      >
        <div className="container mx-auto px-6">
          <motion.div
            key={`navbar-${theme}`}
            className={`mx-auto flex h-16 max-w-5xl items-center justify-between px-6 shadow-lg backdrop-blur-xl border transition-colors duration-300 ${
              isLight 
                ? 'bg-white/90 shadow-gray-200/50 border-gray-200' 
                : 'bg-[#0a0a0a]/80 shadow-black/20 border-white/5'
            }`}
            whileHover={{
              borderColor: isLight ? 'rgba(209, 213, 219, 1)' : 'rgba(255, 255, 255, 0.15)',
              backgroundColor: isLight ? 'rgba(255, 255, 255, 0.98)' : 'rgba(0, 0, 0, 0.5)'
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Logo/Name */}
            <Link href="/" className={`group relative flex items-center gap-3 font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
              <motion.div
                className={`relative p-2 border transition-all duration-300 ${
                  isLight 
                    ? 'bg-gray-100 border-gray-200 group-hover:border-gray-300' 
                    : 'bg-white/5 border-white/10 group-hover:border-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Code2 size={20} className={`transition-colors ${isLight ? 'text-gray-600 group-hover:text-gray-900' : 'text-gray-300 group-hover:text-white'}`} />
              </motion.div>

              <div className="relative">
                <span className={`text-lg font-semibold transition-colors duration-300 ${isLight ? 'text-gray-700 group-hover:text-gray-900' : 'text-gray-200 group-hover:text-white'}`}>
                  Ayush Sharma
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-1">
              <Link
                href="/"
                className={`flex items-center gap-2 px-4 py-2 transition-all duration-300 group ${
                  isLight 
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Home size={16} className="group-hover:scale-105 transition-transform" />
                <span className="font-medium text-sm">Home</span>
              </Link>

              <Link
                href="/projects"
                className={`flex items-center gap-2 px-4 py-2 transition-all duration-300 group ${
                  isLight 
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FolderOpen size={16} className="group-hover:scale-105 transition-transform" />
                <span className="font-medium text-sm">Projects</span>
              </Link>

              <Link
                href="/blogs"
                className={`flex items-center gap-2 px-4 py-2 transition-all duration-300 group ${
                  isLight 
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <BookOpen size={16} className="group-hover:scale-105 transition-transform" />
                <span className="font-medium text-sm">Blogs</span>
              </Link>

              <div className={`w-px h-6 mx-2 ${isLight ? 'bg-gray-200' : 'bg-white/10'}`} />

              {/* Theme Toggle */}
              <motion.button
                onClick={handleThemeToggle}
                className={`flex items-center justify-center w-9 h-9 transition-all duration-300 ${
                  isLight 
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
                title={isLight ? "Dark Mode" : "Light Mode"}
              >
                {isLight ? <Moon size={18} /> : <Sun size={18} />}
              </motion.button>

              {/* Font Toggle */}
              <motion.button
                onClick={handleFontToggle}
                className={`flex items-center justify-center w-9 h-9 transition-all duration-300 ${
                  isJetBrains
                    ? isLight 
                      ? 'text-purple-600 bg-purple-50 hover:bg-purple-100' 
                      : 'text-purple-400 bg-purple-500/10 hover:bg-purple-500/20'
                    : isLight 
                      ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isJetBrains ? "Switch to Geist font" : "Switch to JetBrains Mono font"}
                title={isJetBrains ? "Geist Sans" : "JetBrains Mono"}
              >
                {isJetBrains ? <JetBrainsIcon size={18} /> : <Type size={18} />}
              </motion.button>

              <div className={`w-px h-6 mx-1 ${isLight ? 'bg-gray-200' : 'bg-white/10'}`} />

              <motion.a
                href="https://github.com/cyberboyayush"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1 px-3 py-2 transition-all duration-300 group ${
                  isLight 
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="GitHub"
              >
                <Github size={16} className="group-hover:scale-105 transition-transform" />
                <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>

              <motion.a
                href="/x"
                className={`flex items-center gap-1 px-3 py-2 transition-all duration-300 group ${
                  isLight 
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="X (Twitter)"
              >
                <XIcon size={16} className="group-hover:scale-105 transition-transform" />
                <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            </nav>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Header - More Compact */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ y: headerY, opacity: headerOpacity }}
        transition={{ duration: 0.6 }}
        className="md:hidden fixed top-4 left-0 right-0 z-50 px-4"
      >
        <motion.div
          key={`mobile-header-${theme}`}
          className={`backdrop-blur-xl border px-3 py-2 shadow-lg transition-colors duration-300 ${
            isLight 
              ? 'bg-white/90 border-gray-200 shadow-gray-200/50' 
              : 'bg-[#0D1117]/80 border-gray-800'
          }`}
          whileHover={{
            borderColor: isLight ? 'rgba(209, 213, 219, 1)' : 'rgba(107, 114, 128, 0.5)',
            backgroundColor: isLight ? 'rgba(255, 255, 255, 0.98)' : 'rgba(13, 17, 23, 0.9)',
          }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/" className="group flex items-center justify-center">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className={`p-1.5 border transition-all duration-300 ${
                  isLight 
                    ? 'bg-gray-100 border-gray-200 group-hover:border-gray-300' 
                    : 'bg-white/5 border-white/10 group-hover:border-white/20'
                }`}
                whileHover={{ rotate: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Code2 size={16} className={`transition-colors ${isLight ? 'text-gray-600 group-hover:text-gray-900' : 'text-gray-300 group-hover:text-white'}`} />
              </motion.div>

              <span className={`text-base font-semibold transition-colors duration-300 ${isLight ? 'text-gray-700 group-hover:text-gray-900' : 'text-gray-200 group-hover:text-white'}`}>
                Ayush Sharma
              </span>
            </motion.div>
          </Link>
        </motion.div>
      </motion.header>

      {/* Enhanced Mobile Navbar - More Compact */}
      <motion.div
        id="main-mobile-nav"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="md:hidden fixed bottom-2 left-2 right-2 z-50"
      >
        <div className={`backdrop-blur-3xl border px-1 py-1 shadow-xl transition-colors duration-300 ${
          isLight 
            ? 'bg-white/90 border-gray-200 shadow-gray-200/50' 
            : 'bg-black/40 border-white/15 shadow-black/30'
        }`}>
          <div className="flex items-center justify-between">
            {/* Home */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Link
                href="/"
                className={`flex flex-col items-center justify-center py-2.5 px-1 transition-all duration-300 group ${
                  isLight 
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="relative">
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isLight ? 'bg-gray-100' : 'bg-white/5'}`} />
                  <Home size={18} className="relative group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs mt-1 font-medium">Home</span>
              </Link>
            </motion.div>

            {/* Projects */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Link
                href="/projects"
                className={`flex flex-col items-center justify-center py-2.5 px-1 transition-all duration-300 group ${
                  isLight 
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="relative">
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isLight ? 'bg-gray-100' : 'bg-white/5'}`} />
                  <FolderOpen size={18} className="relative group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs mt-1 font-medium">Projects</span>
              </Link>
            </motion.div>

            {/* Blogs */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Link
                href="/blogs"
                className={`flex flex-col items-center justify-center py-2.5 px-1 transition-all duration-300 group ${
                  isLight 
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="relative">
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isLight ? 'bg-gray-100' : 'bg-white/5'}`} />
                  <BookOpen size={18} className="relative group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs mt-1 font-medium">Blogs</span>
              </Link>
            </motion.div>

            {/* Divider */}
            <div className={`h-6 w-px mx-0.5 ${isLight ? 'bg-gray-200' : 'bg-white/10'}`} />

            {/* Theme Toggle */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <button
                onClick={handleThemeToggle}
                className={`flex flex-col items-center justify-center py-2.5 px-1 transition-all duration-300 group w-full ${
                  isLight 
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
              >
                <div className="relative">
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isLight ? 'bg-gray-100' : 'bg-white/5'}`} />
                  {isLight ? <Moon size={18} className="relative group-hover:scale-110 transition-transform duration-300" /> : <Sun size={18} className="relative group-hover:scale-110 transition-transform duration-300" />}
                </div>
                <span className="text-xs mt-1 font-medium">{isLight ? 'Dark' : 'Light'}</span>
              </button>
            </motion.div>

            {/* Font Toggle */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <button
                onClick={handleFontToggle}
                className={`flex flex-col items-center justify-center py-2.5 px-1 transition-all duration-300 group w-full ${
                  isJetBrains
                    ? isLight 
                      ? 'text-purple-600 hover:bg-purple-50' 
                      : 'text-purple-400 hover:bg-purple-500/10'
                    : isLight 
                      ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                aria-label={isJetBrains ? "Switch to Geist font" : "Switch to JetBrains Mono font"}
              >
                <div className="relative">
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isLight ? 'bg-gray-100' : 'bg-white/5'}`} />
                  {isJetBrains ? <JetBrainsIcon size={18} className="relative group-hover:scale-110 transition-transform duration-300" /> : <Type size={18} className="relative group-hover:scale-110 transition-transform duration-300" />}
                </div>
                <span className="text-xs mt-1 font-medium">{isJetBrains ? 'JB' : 'Aa'}</span>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
