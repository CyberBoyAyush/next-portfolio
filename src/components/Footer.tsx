'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react';

// Custom X (Twitter) Icon Component
const XIcon = ({ size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

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
    { icon: XIcon, href: 'https://twitter.com/cyberboyayush', label: 'X (Twitter)', hoverColor: 'hover:text-gray-200' },
    { icon: Mail, href: 'mailto:connect@ayush-sharma.in', label: 'Email', hoverColor: 'hover:text-gray-300' },
  ];

  return (
    <footer className="py-10 relative bg-[#0D1117] border-t border-gray-800/50">
      {/* Simplified background - consistent with other sections */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-50 blur-[100px]" />
      </div>
      
      {/* Simplified grid background */}
      <div
        className="absolute inset-0 -z-10 bg-[length:40px_40px] md:bg-[length:50px_50px] [background-image:linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)]"
      ></div>
      
      {/* Back to top button */}
      {isMounted ? (
        <motion.button
          onClick={handleScrollToTop}
          className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400 flex items-center justify-center shadow-lg shadow-gray-900/20 z-10 text-white"
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
          className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400 flex items-center justify-center shadow-lg shadow-gray-900/20 z-10 text-white"
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
                <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-gray-600/20 to-gray-500/20 blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
                <span className="relative text-gray-400 font-mono text-xl md:text-2xl">
                  <span className="inline-block group-hover:-translate-x-1 transition-transform duration-300">&lt;</span>
                  <span className="inline-block group-hover:scale-110 transition-transform duration-300">/</span>
                  <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">&gt;</span>
                </span>
              </div>
              
              <div className="relative">
                <span className="absolute -inset-1 bg-gradient-to-r from-gray-600/10 to-gray-500/10 blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg"></span>
                <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-300 font-sans tracking-tight text-lg md:text-xl font-extrabold group-hover:from-gray-300 group-hover:to-gray-400 transition-all duration-500">
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
                  <Heart size={16} className="text-red-400 fill-red-400" />
                </motion.span>
              ) : (
                <span>
                  <Heart size={16} className="text-red-400 fill-red-400" />
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
                    className={`p-2.5 rounded-full bg-gray-900/50 text-gray-400 transition-all duration-300 ${social.hoverColor} hover:bg-gray-800/50 hover:shadow-md hover:shadow-gray-900/10 border border-gray-800/50 backdrop-blur-sm`}
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
                    className={`p-2.5 rounded-full bg-gray-900/50 text-gray-400 transition-all duration-300 ${social.hoverColor} hover:bg-gray-800/50 border border-gray-800/50 backdrop-blur-sm`}
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