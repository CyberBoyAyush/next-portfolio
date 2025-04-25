'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';

const Hero = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-700/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-700/20 rounded-full blur-[100px]" />
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
            <span className="text-purple-400">Hello, I'm</span>
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="gradient-text">Ayush Sharma</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-300">
              Full Stack Developer & Designer
            </h2>
          </motion.div>

          <motion.p
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-gray-400 max-w-lg"
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
            className="flex gap-4"
          >
            <a 
              href="#portfolio" 
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 border border-purple-500 text-white font-medium rounded-full hover:bg-purple-500/10 transition-all duration-300"
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
              href="https://github.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 border border-gray-700 rounded-full hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
              aria-label="Github"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 border border-gray-700 rounded-full hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://twitter.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 border border-gray-700 rounded-full hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
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
        >
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 opacity-80 animate-pulse"></div>
            <div className="absolute inset-2 bg-[#0a0a0a] rounded-full flex items-center justify-center overflow-hidden">
              <Image
                src="/placeholder-avatar.png"
                alt="Ayush Sharma"
                width={400}
                height={400}
                className="object-cover w-full h-full"
                priority
                onError={(e) => {
                  // Fallback for missing image
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </div>
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
      >
        <ArrowDown className="text-purple-500" size={28} />
      </motion.div>
    </section>
  );
};

export default Hero;