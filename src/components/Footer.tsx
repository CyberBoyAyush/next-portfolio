'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, ArrowUp, Heart, ExternalLink } from 'lucide-react';

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

  // Quick links for footer
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];
  
  // Social links with hover colors
  const socialLinks = [
    { icon: Github, href: 'https://github.com/cyberboyayush', label: 'GitHub', hoverColor: 'hover:text-white' },
    { icon: Linkedin, href: 'https://linkedin.com/in/cyberboyayush', label: 'LinkedIn', hoverColor: 'hover:text-blue-400' },
    { icon: Twitter, href: 'https://twitter.com/cyberboyayush', label: 'Twitter', hoverColor: 'hover:text-sky-400' },
    { icon: Mail, href: 'mailto:connect@ayush-sharma.in', label: 'Email', hoverColor: 'hover:text-purple-400' },
  ];

  return (
    <footer className="py-8 relative bg-[#060606] border-t border-gray-900/50">
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-4">
          {/* Logo & Bio */}
          <div className="flex flex-col">
            <Link href="#home" className="flex items-center gap-2 mb-2">
              {isMounted ? (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="font-bold text-xl flex items-center"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-md flex items-center justify-center mr-2">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <span className="gradient-text">Ayush</span>
                  <span className="text-white"> Sharma</span>
                </motion.div>
              ) : (
                <div className="font-bold text-xl flex items-center">
                  <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-md flex items-center justify-center mr-2">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <span className="gradient-text">Ayush</span>
                  <span className="text-white"> Sharma</span>
                </div>
              )}
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Full Stack Developer specializing in creating exceptional digital experiences.
            </p>
          </div>
          
          {/* Navigation & Social Links */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            {/* Quick links */}
            <div>
              <h3 className="text-white font-medium text-sm mb-3 uppercase tracking-wide">Links</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {quickLinks.map((link, idx) => (
                  <Link 
                    key={idx} 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Contact info */}
            <div>
              <h3 className="text-white font-medium text-sm mb-3 uppercase tracking-wide">Contact</h3>
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">Jaipur, India</p>
                <p className="text-gray-400 text-sm">connect@ayush-sharma.in</p>
              </div>
            </div>
            
            {/* Social links */}
            <div>
              <h3 className="text-white font-medium text-sm mb-3 uppercase tracking-wide">Social</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return isMounted ? (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`p-2 rounded-md text-gray-400 transition-all duration-300 ${social.hoverColor}`}
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
                      className={`p-2 rounded-md text-gray-400 transition-all duration-300 ${social.hoverColor}`}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent my-6"></div>
        
        {/* Copyright & Terms */}
        <div className="flex flex-col sm:flex-row justify-between items-center w-full">
          <div className="flex items-center gap-1 mb-4 sm:mb-0">
            <span className="text-xs text-gray-500">© {currentYear} Built with</span>
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
                <Heart size={14} className="text-pink-500 fill-pink-500" />
              </motion.span>
            ) : (
              <span>
                <Heart size={14} className="text-pink-500 fill-pink-500" />
              </span>
            )}
            <span className="text-xs text-gray-500">by Ayush Sharma</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-xs text-gray-500 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-xs text-gray-500 hover:text-white transition-colors"
            >
              Terms
            </Link>
            {isMounted ? (
              <motion.a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs flex items-center gap-1 text-purple-400 hover:text-purple-300"
                whileHover={{ x: 2 }}
              >
                Next.js <ExternalLink size={10} />
              </motion.a>
            ) : (
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs flex items-center gap-1 text-purple-400 hover:text-purple-300"
              >
                Next.js <ExternalLink size={10} />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;