'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// Nav items
const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#portfolio' },
  { name: 'Coding Stats', href: '#coding-stats' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Highlight active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust the values as needed based on your layout
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle click event for mobile menu
  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  // Navbar animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };

  // Mobile menu variants
  const menuVariants = {
    closed: { 
      opacity: 0,
      y: "-100%",
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    open: { 
      opacity: 1,
      y: "0%",
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };

  // Navbar style based on scroll position
  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? 'bg-[#0D1117]/80 shadow-lg backdrop-blur-lg' : 'bg-transparent'
  }`;

  // Active link style
  const activeLinkClass = 'text-purple-400 after:w-full';
  const inactiveLinkClass = 'text-white hover:text-purple-400 after:w-0 hover:after:w-full';

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={navbarClasses}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="text-xl font-bold text-white">
              <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
                Ayush.dev
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative font-medium text-sm transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-purple-400 after:transition-all after:duration-300 ${
                  activeSection === item.href.substring(1) ? activeLinkClass : inactiveLinkClass
                }`}
              >
                {item.name}
              </a>
            ))}
            
            {/* CTA Button */}
            <a
              href="#contact"
              className="ml-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            >
              Let&apos;s Talk
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={handleMenuClick}
              className="text-white p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden absolute top-full left-0 right-0 bg-[#0D1117]/95 backdrop-blur-lg border-t border-gray-800 shadow-xl max-h-[calc(100vh-4rem)] overflow-auto"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`py-2 px-4 text-lg font-medium ${
                      activeSection === item.href.substring(1)
                        ? 'text-purple-400 bg-purple-900/10 rounded-lg'
                        : 'text-white hover:text-purple-400'
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
                
                {/* Mobile CTA Button */}
                <div className="pt-2">
                  <a
                    href="#contact"
                    className="block text-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-3 rounded-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Let&apos;s Talk
                  </a>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;