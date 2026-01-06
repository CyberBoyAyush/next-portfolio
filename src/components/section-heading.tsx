'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useThemeSafe } from './theme-provider';

interface SectionHeadingProps {
  subtitle: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}

const SectionHeading = ({ 
  subtitle, 
  title, 
  description, 
  center = true,
  className = ''
}: SectionHeadingProps) => {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, amount: 0.3 });
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === 'light';
  
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.08
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.25 }
    }
  };

  return (
    <motion.div
      ref={headingRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`${center ? 'text-center' : 'text-left'} mb-16 ${className}`}
    >
      <motion.span 
        variants={itemVariants}
        className={`text-sm block mb-2 uppercase tracking-wider font-medium ${isLight ? 'text-gray-500' : 'text-gray-500'}`}
      >
        {subtitle}
      </motion.span>
      
      <motion.h2 
        variants={itemVariants}
        className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
          isLight ? 'text-gray-800' : 'text-gray-100'
        }`}
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.p 
          variants={itemVariants}
          className={`mt-4 max-w-2xl mx-auto text-base sm:text-lg ${isLight ? 'text-gray-600' : 'text-gray-400'}`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;