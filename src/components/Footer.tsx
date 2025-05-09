'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, ArrowUp, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  // Social links with hover colors
  const socialLinks = [
    { icon: Github, href: 'https://github.com/cyberboyayush', label: 'GitHub', hoverColor: 'hover:text-white' },
    { icon: Linkedin, href: 'https://linkedin.com/in/cyberboyayush', label: 'LinkedIn', hoverColor: 'hover:text-blue-400' },
    { icon: Twitter, href: 'https://twitter.com/cyberboyayush', label: 'Twitter', hoverColor: 'hover:text-sky-400' },
    { icon: Mail, href: 'mailto:connect@ayush-sharma.in', label: 'Email', hoverColor: 'hover:text-purple-400' },
  ];

  return (
    <footer className="py-10 relative bg-[#060606] border-t border-gray-900/50">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.svg')] pointer-events-none"></div>
      
      {/* Back to top button */}
      {isMounted ? (
        <motion.button
          onClick={handleScrollToTop}
          className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-900/20 z-10"
          whileHover={{ y: -3 }}
          whileTap={{ y: 0 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      ) : (
        <button
          onClick={handleScrollToTop}
          className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-900/20 z-10"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
      
      <div className="container mx-auto px-6">
        {/* Updated Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left section with logo and copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            {/* Logo */}
            <Link href="#home" className="group relative flex items-center gap-2 font-bold text-white">
              <div className="relative">
                <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
                <span className="relative text-purple-400 font-mono text-xl md:text-2xl">
                  <span className="inline-block group-hover:-translate-x-1 transition-transform duration-300">&lt;</span>
                  <span className="inline-block group-hover:scale-110 transition-transform duration-300">/</span>
                  <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">&gt;</span>
                </span>
              </div>
              
              <div className="relative">
                <span className="absolute -inset-1 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg"></span>
                <span className="relative gradient-text bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500 font-sans tracking-tight text-lg md:text-xl font-extrabold group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-500">
                  Ayush Sharma
                </span>
              </div>
            </Link>
            
            {/* Copyright - Now positioned below the logo */}
            <div className="flex items-center gap-1 mt-2">
              <span className="text-sm text-gray-400">© 2025 Built with</span>
              {isMounted ? (
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    transition: { 
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: 2,
                    }
                  }}
                >
                  <Heart size={16} className="text-pink-500 fill-pink-500" />
                </motion.span>
              ) : (
                <span>
                  <Heart size={16} className="text-pink-500 fill-pink-500" />
                </span>
              )}
              <span className="text-sm text-gray-400">by Ayush Sharma</span>
            </div>
          </div>
          
          {/* Right section with social links */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return isMounted ? (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`p-2.5 rounded-full bg-gray-900/80 text-gray-400 transition-all duration-300 ${social.hoverColor} hover:bg-gray-800 hover:shadow-md hover:shadow-purple-900/10`}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ) : (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`p-2.5 rounded-full bg-gray-900/80 text-gray-400 transition-all duration-300 ${social.hoverColor} hover:bg-gray-800`}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;