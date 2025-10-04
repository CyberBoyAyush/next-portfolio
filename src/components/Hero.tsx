'use client';

import { useRef, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, FileText, Calendar, Network, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { 
  SiTypescript, SiReact, SiNextdotjs, SiPrisma, 
  SiPostgresql, SiAppwrite 
} from 'react-icons/si';

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageAttempted, setImageAttempted] = useState(false);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
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
        ease: "easeOut",
      },
    },
  };

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

  const ProfileImage = useMemo(() => {
    if (imageError || imageAttempted) return null;
    
    return (
      <Image
        src="https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPhWVT9F8tcdLGNp9S0ETXmuk4jy87UFaBIrYw"
        alt="Ayush Sharma"
        fill
        sizes="(max-width: 768px) 10rem, 12rem"
        className={`object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        priority
        onLoad={handleImageLoad}
        onError={handleImageError}
        unoptimized={false}
        quality={95}
      />
    );
  }, [imageLoaded, imageError, imageAttempted, handleImageLoad, handleImageError]);
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 -z-10 bg-[#0D1117]" />
      <div className="absolute inset-0 -z-10 bg-[length:40px_40px] [background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]" />
      
      <div className="container mx-auto px-4 pt-6 pb-2 sm:py-16 md:py-20 w-full">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3 sm:space-y-5 md:space-y-8"
          >
            {/* Profile Image */}
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 sm:mt-4 md:mt-8">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-2 ring-gray-800 bg-gray-900">
                {ProfileImage}
                {!imageLoaded && !imageError && !imageAttempted && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-2 border-gray-600 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
                {(imageError || imageAttempted) && !imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                    <span className="text-2xl font-bold text-white">AS</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm text-gray-400">Available for work</span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="mt-3 sm:mt-4 md:mt-16">
              <h1 className="text-4xl sm:text-4xl md:text-6xl font-bold leading-tight text-center">
                <span className="text-white">Hi, I&apos;m</span>
                <br />
                <span className="text-white">Ayush Sharma</span>
                <br />
                <span className="text-gray-400 text-3xl sm:text-3xl md:text-5xl">I&apos;m a Full Stack Developer</span>
              </h1>
            </motion.div>

            {/* Description with Tech Stack */}
            <motion.div variants={itemVariants} className="space-y-4 text-center">
              <p className="text-base sm:text-base md:text-xl text-gray-300 leading-loose max-w-3xl mx-auto">
                I make{' '}
                <span className="inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-green-500/10 text-green-400 rounded-lg border border-green-500/30 font-medium text-xs sm:text-sm mr-1">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                  Scalable
                </span>
                {' '}beautiful looking web apps using{' '}
                <span className="inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/30 font-medium text-xs sm:text-sm mr-1">
                  <SiTypescript className="w-3 h-3 sm:w-4 sm:h-4" />
                  Typescript
                </span>
                , 
                <span className="inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/30 font-medium text-xs sm:text-sm mr-1">
                  <SiReact className="w-3 h-3 sm:w-4 sm:h-4" />
                  React
                </span>
                , 
                <span className="inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-500/10 text-gray-300 rounded-lg border border-gray-500/30 font-medium text-xs sm:text-sm mr-1">
                  <SiNextdotjs className="w-3 h-3 sm:w-4 sm:h-4" />
                  NextJS
                </span>
                , 
                <span className="inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-teal-500/10 text-teal-400 rounded-lg border border-teal-500/30 font-medium text-xs sm:text-sm mr-1">
                  <SiPrisma className="w-3 h-3 sm:w-4 sm:h-4" />
                  Prisma ORM
                </span>
                , 
                <span className="inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/30 font-medium text-xs sm:text-sm mr-1">
                  <SiPostgresql className="w-3 h-3 sm:w-4 sm:h-4" />
                  Postgres
                </span>
                , 
                <span className="inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-pink-500/10 text-pink-400 rounded-lg border border-pink-500/30 font-medium text-xs sm:text-sm mr-1">
                  <SiAppwrite className="w-3 h-3 sm:w-4 sm:h-4" />
                  Appwrite
                </span>
                , with focusing on security and good{' '}
                <span className="inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/30 font-medium text-xs sm:text-sm">
                  <Network className="w-3 h-3 sm:w-4 sm:h-4" />
                  System design
                </span>
                .
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <a
                href="/Resume.pdf"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-all text-base sm:text-base"
              >
                <FileText size={16} className="sm:w-4 sm:h-4" />
                Resume / CV
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 bg-transparent text-gray-300 rounded-lg font-medium hover:bg-gray-800/50 hover:text-white transition-all border border-gray-700 text-base sm:text-base"
              >
                <Mail size={16} className="sm:w-4 sm:h-4" />
                Get in touch
              </a>
              <a
                href="https://zcal.co/ayush/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 bg-orange-500/10 text-orange-400 rounded-lg font-medium hover:bg-orange-500/20 transition-all border border-orange-500/30 hover:border-orange-500/50 shadow-[0_0_15px_rgba(251,146,60,0.15)] hover:shadow-[0_0_25px_rgba(251,146,60,0.3)] text-base sm:text-base"
              >
                <Calendar size={16} className="sm:w-4 sm:h-4" />
                Schedule 1:1 Call
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 pt-1 sm:pt-2 md:pt-3">
              <a 
                href="https://x.com/cyberboyayush" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <XIcon size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/cyberboyayush" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://github.com/cyberboyayush" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="mailto:hi@aysh.me" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </motion.div>
          </motion.div>
          
          {/* Scroll Indicator */}
          <div className="flex justify-center mt-1 sm:mt-4 md:mt-10">
            <a
              href="#skills"
              className="animate-bounce rounded-full p-2 text-gray-500 hover:text-gray-300 transition-colors"
              aria-label="Scroll down"
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