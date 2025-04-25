'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ExternalLink } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Skills', href: '#skills' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Stats', href: '#coding-stats' }, 
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMounted, setIsMounted] = useState(false);

  // Only run animations after component is mounted on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Find active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/50 backdrop-blur-xl border-b border-gray-800/50' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="#home" className="flex items-center gap-2">
          {isMounted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="font-bold text-2xl flex items-center"
            >
              <div className="relative mr-1">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "mirror", 
                    duration: 4,
                    ease: "easeInOut" 
                  }}
                  className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                >
                  <span className="text-white font-bold">A</span>
                </motion.div>
              </div>
              <span className="gradient-text">Ayush</span>
              <span className="text-white">Sharma</span>
            </motion.div>
          ) : (
            <div className="font-bold text-2xl flex items-center">
              <div className="relative mr-1">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
              </div>
              <span className="gradient-text">Ayush</span>
              <span className="text-white">.dev</span>
            </div>
          )}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          {isMounted ? (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-1"
            >
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={`relative px-4 py-2 rounded-full mx-1 text-sm font-medium transition-all duration-300 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeSection"
                          className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-full -z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ type: "spring", stiffness: 200, damping: 30 }}
                        />
                      )}
                      {item.name}
                    </Link>
                  </motion.li>
                );
              })}
              
              <motion.li
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: navItems.length * 0.1 }}
              >
                <Link
                  href="#contact"
                  className="ml-2 inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-purple-500/20"
                >
                  <span>Let's Talk</span>
                  <ExternalLink size={14} />
                </Link>
              </motion.li>
            </motion.ul>
          ) : (
            <ul className="flex items-center gap-1">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <li key={index} className="relative">
                    <Link
                      href={item.href}
                      className={`relative px-4 py-2 rounded-full mx-1 text-sm font-medium transition-all duration-300 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
              
              <li>
                <Link
                  href="#contact"
                  className="ml-2 inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-purple-500/20"
                >
                  <span>Let's Talk</span>
                  <ExternalLink size={14} />
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Mobile Navigation Button */}
        {isMounted ? (
          <motion.button
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-full bg-gray-900/50 border border-gray-800"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: isOpen ? -90 : 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: isOpen ? 90 : -90 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        ) : (
          <button
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-full bg-gray-900/50 border border-gray-800"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
      </nav>

      {/* Mobile Navigation Menu */}
      {isMounted ? (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-black/90 backdrop-blur-xl border-b border-gray-800/50 overflow-hidden"
            >
              <div className="container mx-auto px-6 py-5">
                <ul className="flex flex-col gap-3">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.href.substring(1);
                    return (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          className={`relative block py-2 px-4 rounded-lg transition-colors duration-300 ${
                            isActive 
                              ? 'bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-white' 
                              : 'text-gray-400 hover:text-white'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.li>
                    );
                  })}
                  
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.05 }}
                    className="mt-3"
                  >
                    <Link
                      href="#contact"
                      className="block text-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-3 rounded-lg font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Let's Talk
                    </Link>
                  </motion.li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        isOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-xl border-b border-gray-800/50 overflow-hidden">
            <div className="container mx-auto px-6 py-5">
              <ul className="flex flex-col gap-3">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className={`relative block py-2 px-4 rounded-lg transition-colors duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-white' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
                
                <li className="mt-3">
                  <Link
                    href="#contact"
                    className="block text-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-3 rounded-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Let's Talk
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )
      )}
    </header>
  );
};

export default Navbar;