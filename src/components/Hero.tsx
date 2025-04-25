'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';

// Mouse-following blob component
const MouseBlob = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div 
      className="pointer-events-none fixed inset-0 z-30 opacity-50"
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        zIndex: 0, 
        pointerEvents: 'none',
      }}
    >
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20 bg-gradient-to-r from-purple-600 to-blue-600 blur-[80px]"
        style={{
          x: useTransform(smoothX, (value) => value - 192),
          y: useTransform(smoothY, (value) => value - 192),
        }}
      />
    </motion.div>
  );
};

const Hero = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  
  // For 3D card effect
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  // For floating animation
  const y = useMotionValue(0);
  const controls = useAnimation();

  useEffect(() => {
    // Start floating animation
    const floatingAnimation = async () => {
      while (true) {
        await controls.start({
          y: [0, -10, 0, 10, 0],
          transition: { 
            duration: 6, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
          }
        });
      }
    };
    
    floatingAnimation();
    
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Reduce the rotation intensity for smoother movement
        const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -5;
        const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * 5;
        
        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  const handleScrollDown = () => {
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smoother scroll effect calculations
  const imageScale = 1 - Math.min(scrollY * 0.0005, 0.1);
  const imageTranslateY = Math.min(scrollY * 0.1, 50);
  const imageOpacity = 1 - Math.min(scrollY * 0.002, 0.3);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative pt-16 overflow-hidden">
      {/* Mouse tracking blob */}
      <MouseBlob />
      
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-purple-900/20 to-transparent opacity-70 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-blue-900/20 to-transparent opacity-70 blur-[100px]" />
        
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,119,198,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(120,119,198,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 container mx-auto px-6 py-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-6"
        >
          <motion.div 
            custom={0} 
            variants={textVariants} 
            initial="hidden" 
            animate="visible"
            className="flex flex-col space-y-2"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 w-fit"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
              <span className="text-purple-400 text-sm">Available for work</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-7xl font-bold mt-4">
              <motion.span 
                className="text-white block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Hi, I'm Ayush
              </motion.span>
              <motion.span 
                className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Full Stack Developer
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-gray-400 max-w-lg text-lg"
          >
            I craft responsive websites and applications with modern technologies 
            that deliver exceptional user experiences. Passionate about clean code and 
            innovative solutions.
          </motion.p>

          <motion.div
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            <a 
              href="#portfolio" 
              className="relative px-6 py-3 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 group-hover:scale-[1.05]"></span>
              <span className="relative text-white font-medium">View My Work</span>
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 border border-purple-500/50 text-white font-medium rounded-md hover:bg-purple-500/10 transition-all duration-300"
            >
              Contact Me
            </a>
          </motion.div>

          <motion.div
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-4 pt-2"
          >
            <a 
              href="https://github.com/cyberboyayush" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 border border-gray-700 rounded-full hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center"
              aria-label="Github"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 border border-gray-700 rounded-full hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://twitter.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 border border-gray-700 rounded-full hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* Image/Animation Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center lg:justify-end"
          style={{
            perspective: 1000,
          }}
        >
          <motion.div 
            ref={cardRef}
            animate={controls}
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${imageScale}) translateY(${imageTranslateY}px)`,
              opacity: imageOpacity,
              transition: 'transform 0.2s ease-out, opacity 0.3s ease-out',
            }}
            className="relative w-72 h-72 md:w-96 md:h-96"
          >
            {/* Glowing background effect */}
            <div className="absolute h-full w-full rounded-full bg-gradient-to-br from-purple-600/80 to-indigo-700/80 blur-[20px] scale-[0.85] opacity-50"></div>
            
            {/* Main container */}
            <div className="absolute h-full w-full rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 [mask-image:radial-gradient(600px_at_center,white,transparent)] animate-pulse"></div>
            
            {/* Image container */}
            <div className="absolute inset-[6px] rounded-full bg-black/80 backdrop-blur-xl flex items-center justify-center overflow-hidden border border-purple-500/20">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative w-full h-full"
              >
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
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.2
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={handleScrollDown}
        ref={scrollRef}
        style={{
          opacity: Math.max(1 - scrollY * 0.01, 0),
        }}
      >
        <ArrowDown className="text-purple-500" size={28} />
      </motion.div>
    </section>
  );
};

export default Hero;