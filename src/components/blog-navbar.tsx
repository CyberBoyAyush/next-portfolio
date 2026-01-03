'use client';

import Link from 'next/link';
import { Code2, Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBlogThemeSafe } from './blog-theme-provider';
import ThemeSwitcher from './theme-switcher';

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

export default function BlogNavbar() {
  const themeContext = useBlogThemeSafe();
  const isLight = themeContext?.theme === 'light';
  const isBlogDetailPage = themeContext?.isBlogDetailPage;

  return (
    <>
      {/* Desktop Navbar - Minimal & Clean */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="hidden md:block fixed top-0 left-0 right-0 z-50"
      >
        <div className={`h-14 backdrop-blur-xl border-b transition-colors duration-300 ${
          isLight 
            ? 'bg-white/90 border-gray-200' 
            : 'bg-[#0d1117]/90 border-white/5'
        }`}>
          <div className="container mx-auto px-6 h-full">
            <div className="flex h-full items-center justify-between max-w-7xl mx-auto">
              {/* Logo/Name - Links back to main portfolio */}
              <Link href="/" className={`group flex items-center gap-2.5 font-semibold transition-colors ${
                isLight ? 'text-gray-900 hover:text-gray-600' : 'text-white hover:text-gray-300'
              }`}>
                <div className={`p-1.5 border transition-colors ${
                  isLight 
                    ? 'bg-gray-100 border-gray-200 group-hover:border-gray-300' 
                    : 'bg-white/5 border-white/10 group-hover:border-white/20'
                }`}>
                  <Code2 size={16} className={isLight ? 'text-gray-600' : 'text-gray-300'} />
                </div>
                <span className="text-sm">Ayush Sharma</span>
              </Link>

              {/* Right side - Social links + Theme (on detail pages) */}
              <div className="flex items-center gap-1">
                {isBlogDetailPage && (
                  <>
                    <ThemeSwitcher orientation="horizontal" />
                    <div className={`w-px h-5 mx-2 ${isLight ? 'bg-gray-200' : 'bg-white/10'}`} />
                  </>
                )}

                <motion.a
                  href="https://github.com/cyberboyayush"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md transition-colors ${
                    isLight 
                      ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="GitHub"
                >
                  <Github size={16} />
                  <ExternalLink size={10} className="opacity-50" />
                </motion.a>

                <motion.a
                  href="/x"
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md transition-colors ${
                    isLight 
                      ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="X (Twitter)"
                >
                  <XIcon size={16} />
                  <ExternalLink size={10} className="opacity-50" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Header - Compact top bar */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="md:hidden fixed top-0 left-0 right-0 z-50"
      >
        <div className={`h-12 backdrop-blur-xl border-b transition-colors duration-300 ${
          isLight 
            ? 'bg-white/90 border-gray-200' 
            : 'bg-[#0d1117]/90 border-white/5'
        }`}>
          <div className="px-4 h-full flex items-center justify-between">
            {/* Logo/Name */}
            <Link href="/" className={`group flex items-center gap-2 font-semibold transition-colors ${
              isLight ? 'text-gray-900' : 'text-white'
            }`}>
              <div className={`p-1 border transition-colors ${
                isLight 
                  ? 'bg-gray-100 border-gray-200' 
                  : 'bg-white/5 border-white/10'
              }`}>
                <Code2 size={14} className={isLight ? 'text-gray-600' : 'text-gray-300'} />
              </div>
              <span className="text-sm">Ayush Sharma</span>
            </Link>

            {/* Social links */}
            <div className="flex items-center gap-1">
              <a
                href="https://github.com/cyberboyayush"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-md transition-colors ${
                  isLight 
                    ? 'text-gray-600 hover:bg-gray-100' 
                    : 'text-gray-400 hover:bg-white/5'
                }`}
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>

              <a
                href="/x"
                className={`p-2 rounded-md transition-colors ${
                  isLight 
                    ? 'text-gray-600 hover:bg-gray-100' 
                    : 'text-gray-400 hover:bg-white/5'
                }`}
                aria-label="X (Twitter)"
              >
                <XIcon size={16} />
              </a>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}
