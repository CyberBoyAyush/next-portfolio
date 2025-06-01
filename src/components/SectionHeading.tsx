'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
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
        className="text-sm text-gray-500 block mb-2 uppercase tracking-wider font-medium"
      >
        {subtitle}
      </motion.span>
      
      <motion.h2 
        variants={itemVariants}
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
      >
        <span style={{ 
          background: 'linear-gradient(to right, #f3f4f6, #d1d5db)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {title}
        </span>
      </motion.h2>
      
      {description && (
        <motion.p 
          variants={itemVariants}
          className="mt-4 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;