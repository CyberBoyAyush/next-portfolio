'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useTypewriter } from 'react-simple-typewriter';
import { ChevronDown, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseXSpring = useSpring(0);
  const mouseYSpring = useSpring(0);
  
  const [isMounted, setIsMounted] = useState(false);
  
  // Set isMounted to true when component mounts
  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      if (ref.current) {
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        
        // Calculate position relative to the element
        const x = clientX - left;
        const y = clientY - top;
        
        // Calculate position as percentage
        const posX = (x / width) * 100;
        const posY = (y / height) * 100;
        
        // Update spring values
        mouseXSpring.set(posX);
        mouseYSpring.set(posY);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseXSpring, mouseYSpring]);
  
  // cursor position for spotlight effect
  const [cursorPosition] = useState({ x: 0, y: 0 });
  
  // Get viewport width to adapt animations
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    
    checkViewport();
    window.addEventListener('resize', checkViewport);
    
    return () => window.removeEventListener('resize', checkViewport);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
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
  
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-16" ref={ref}>
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-purple-900/10 to-transparent opacity-70 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-gradient-radial from-indigo-900/10 to-transparent opacity-70 blur-[100px]" />
      </div>
      
      {/* Grid background */}
      <div
        className="absolute inset-0 -z-10 bg-[length:40px_40px] md:bg-[length:50px_50px] [background-image:linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)]"
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
                  <span className="text-xs font-medium gradient-text bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                    Available for new projects
                  </span>
                </div>
                
                <motion.h1 
                  variants={itemVariants}
                  className="text-5xl sm:text-5xl md:text-7xl font-bold mb-4"
                >
                  Hi, I&apos;m <br />
                  <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">
                    Ayush Sharma
                  </span>
                </motion.h1>
                
                <motion.div 
                  variants={itemVariants}
                  className="text-xl md:text-2xl font-medium text-gray-300 mb-6"
                >
                  I&apos;m a <span className="text-white">{typewriterText}</span>
                  <span className="animate-blink text-white">|</span>
                </motion.div>
                
                <motion.p 
                  variants={itemVariants}
                  className="text-gray-400 leading-relaxed mb-8"
                >
                  Passionate about building modern web applications with cutting-edge technologies.
                  Creating robust and scalable solutions that deliver exceptional user experiences.
                </motion.p>
                
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-wrap gap-4"
                >
                  <a 
                    href="#contact" 
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 flex items-center"
                  >
                    Let&apos;s Connect
                  </a>
                  <a 
                    href="#portfolio" 
                    className="px-6 py-3 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-white font-medium transition-all duration-300 hover:bg-gray-700/50"
                  >
                    View Work
                  </a>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="mt-8 flex items-center gap-4"
                >
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
                      <Twitter size={18} className="text-gray-400 hover:text-white transition-colors duration-300"/>
                    </a>
                  </div>
                </motion.div>
                
                {/* Experience icons */}
                <motion.div 
                  variants={itemVariants}
                  className="mt-8"
                >
                  <div className="flex gap-2 w-full overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex gap-2 items-center px-3 py-2 rounded-lg bg-white/5 border border-gray-800 backdrop-blur-sm">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                          <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-gray-300">5+ Years</span>
                    </div>
                    
                    <div className="flex gap-2 items-center px-3 py-2 rounded-lg bg-white/5 border border-gray-800 backdrop-blur-sm">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-gray-300">28+ Projects</span>
                    </div>
                    
                    <div className="flex gap-2 items-center px-3 py-2 rounded-lg bg-white/5 border border-gray-800 backdrop-blur-sm">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-gray-300">10+ Clients</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Image column */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">
                {/* Background ring and animation */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 animate-slow-spin blur-md"></div>
                <div className="absolute inset-5 rounded-full bg-gradient-to-r from-purple-600/5 to-indigo-600/5 animate-reverse-slow-spin blur-sm"></div>
                
                {/* Floating icons */}
                {isMounted && isDesktop && (
                  <>
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute top-10 left-5 p-2 bg-gray-900/80 backdrop-blur-md rounded-lg border border-gray-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                    </motion.div>
                    
                    <motion.div
                      animate={{
                        y: [0, 15, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                      className="absolute bottom-20 left-10 p-2 bg-gray-900/80 backdrop-blur-md rounded-lg border border-gray-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </motion.div>
                    
                    <motion.div
                      animate={{
                        y: [0, -15, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                      className="absolute top-20 right-10 p-2 bg-gray-900/80 backdrop-blur-md rounded-lg border border-gray-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                        <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                        <path d="M2 2l7.586 7.586"></path>
                        <circle cx="11" cy="11" r="2"></circle>
                      </svg>
                    </motion.div>
                    
                    <motion.div
                      animate={{
                        y: [0, 10, 0],
                      }}
                      transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.75,
                      }}
                      className="absolute bottom-10 right-5 p-2 bg-gray-900/80 backdrop-blur-md rounded-lg border border-gray-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                    </motion.div>
                  </>
                )}
                
                {/* Profile image */}
                <div className="relative w-[240px] h-[240px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-2 border-gray-800/50 bg-gray-900 shadow-2xl">
                  <Image
                    src="/profile-comp.png"
                    alt="Ayush Sharma"
                    fill
                    sizes="(max-width: 768px) 18rem, 24rem"
                    className="object-contain p-2"
                    priority
                    onError={(e) => {
                      // Fallback for missing image
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
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