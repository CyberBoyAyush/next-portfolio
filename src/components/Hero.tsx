'use client';

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTypewriter } from 'react-simple-typewriter';
import { ChevronDown, Github, Linkedin } from 'lucide-react'; 
import Image from 'next/image';
import SectionHeading from './SectionHeading';

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

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageAttempted, setImageAttempted] = useState(false);
  
  // Set isMounted to true when component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Animation variants - simplified
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };
  
  // Typewriter effect for roles
  const [typewriterText] = useTypewriter({
    words: [
      'Web Developer',
      'Backend Engineer',
      'Full Stack Developer',
      'Open Source Contributor',
    ],
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1500,
  });

  // Memoized image handlers to prevent recreation on every render
  const handleImageLoad = useCallback(() => {
    if (!imageLoaded) {
      setImageLoaded(true);
      setImageError(false);
    }
  }, [imageLoaded]);

  const handleImageError = useCallback(() => {
    if (!imageError && !imageAttempted) {
      setImageError(true);
      setImageLoaded(false);
      setImageAttempted(true);
    }
  }, [imageError, imageAttempted]);

  // Memoized image component to prevent re-creation
  const ProfileImage = useMemo(() => {
    if (imageError || imageAttempted) return null;
    
    return (
      <Image
        src="/profile-comp.png"
        alt="Ayush Sharma"
        fill
        sizes="(max-width: 768px) 18rem, 24rem"
        className={`object-contain p-2 transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        priority
        onLoad={handleImageLoad}
        onError={handleImageError}
        unoptimized={false}
        quality={90}
      />
    );
  }, [imageLoaded, imageError, imageAttempted, handleImageLoad, handleImageError]);
  
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-16" ref={ref}>
      {/* Simplified background */}
      <div className="absolute inset-0 -z-10 bg-[#0D1117]">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-50 blur-[100px]" />
      </div>
      
      {/* Simplified grid background */}
      <div
        className="absolute inset-0 -z-10 bg-[length:40px_40px] md:bg-[length:50px_50px] [background-image:linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)]"
      ></div>
      
      <div className="container mx-auto px-4 flex-1 flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-8 md:pt-0">
            {/* Text content column */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col lg:pr-10"
            >
              <motion.div
                variants={itemVariants}
                className="text-white"
              >
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/5 border border-gray-800/90 backdrop-blur-sm mb-6">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-300">
                    Available for new projects
                  </span>
                </div>
                
                <motion.h1 variants={itemVariants} className="text-5xl sm:text-5xl md:text-7xl font-bold mb-4">
                  Hi, I&apos;m <br />
                  <span className="text-white">
                    Ayush Sharma
                  </span>
                </motion.h1>
                
                <motion.div variants={itemVariants} className="text-xl md:text-2xl font-medium text-gray-300 mb-6">
                  I&apos;m a <span className="text-white">{typewriterText}</span>
                  <span className="animate-blink text-white">|</span>
                </motion.div>
                
                <motion.p variants={itemVariants} className="text-gray-400 leading-relaxed mb-8">
                  I Write Code, I Build Things, I Solve Problems and I show people that I Love To Code(I DO).
                </motion.p>
                
                <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                  <a 
                    href="#contact" 
                    className="px-6 py-3 rounded-lg bg-white text-gray-900 font-medium transition-all duration-300 hover:bg-gray-100"
                  >
                    Let&apos;s Connect
                  </a>
                
                  <a 
                    href="/Resume.pdf" 
                    className="px-6 py-3 rounded-lg bg-transparent border border-gray-700 text-white font-medium transition-all duration-300 hover:bg-white/5"
                  >
                    Download Resume
                  </a>
                </motion.div>
                
                <motion.div variants={itemVariants} className="mt-8 flex items-center gap-4">
                  <span className="text-sm text-gray-500">Follow me:</span>
                  <div className="flex gap-3">
                    <a 
                      href="https://github.com/cyberboyayush" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-gray-800/80 flex items-center justify-center transition-colors duration-300 hover:bg-gray-700/80"
                    >
                      <Github size={18} className="text-gray-400 hover:text-white transition-colors duration-300"/>
                    </a>
                    <a 
                      href="https://linkedin.com/in/cyberboyayush" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-gray-800/80 flex items-center justify-center transition-colors duration-300 hover:bg-gray-700/80"
                    >
                      <Linkedin size={18} className="text-gray-400 hover:text-white transition-colors duration-300"/>
                    </a>
                    <a 
                      href="https://twitter.com/cyberboyayush" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-gray-800/80 flex items-center justify-center transition-colors duration-300 hover:bg-gray-700/80"
                    >
                      <XIcon size={18} className="text-gray-400 hover:text-white transition-colors duration-300"/>
                    </a>
                  </div>
                </motion.div>
                
                {/* Simplified Stats Display */}
                <motion.div 
                  variants={itemVariants}
                  className="mt-8 bg-gray-900/80 backdrop-blur-md border border-gray-800/30 rounded-xl p-3 inline-flex flex-wrap gap-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-gray-800 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                        <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm">5+ Years</div>
                      <div className="text-xs text-gray-400">Experience</div>
                    </div>
                  </div>

                  <div className="w-px h-10 bg-gray-700/50 mx-1 hidden md:block"></div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-gray-800 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm">28+ Projects</div>
                      <div className="text-xs text-gray-400">Completed</div>
                    </div>
                  </div>

                  <div className="w-px h-10 bg-gray-700/50 mx-1 hidden md:block"></div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-gray-800 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm">10+ Clients</div>
                      <div className="text-xs text-gray-400">Worldwide</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Image column - optimized with single load */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center">
                {/* Simplified background ring */}
                <div className="absolute inset-0 rounded-full bg-gray-800/20 blur-md"></div>
                
                {/* Profile image container */}
                <div className="relative w-[240px] h-[240px] md:w-[350px] md:h-[350px] rounded-full overflow-hidden border-2 border-gray-800/50 bg-gray-900 shadow-2xl">
                  {ProfileImage}
                  
                  {/* Loading placeholder - only show when not loaded and no error */}
                  {!imageLoaded && !imageError && !imageAttempted && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 border-2 border-gray-600 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  {/* Error fallback - only show after error occurred */}
                  {(imageError || imageAttempted) && !imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center border border-gray-600">
                          <span className="text-2xl font-bold text-white">AS</span>
                        </div>
                        <span className="text-xs text-gray-500">Ayush Sharma</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll down indicator */}
          <div className="flex justify-center mt-8 md:mt-4">
            <a 
              href="#about" 
              className="animate-bounce rounded-full p-1 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <ChevronDown size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;