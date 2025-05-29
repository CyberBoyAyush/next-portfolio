'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Code, Eye } from 'lucide-react';
import Image from 'next/image';
import SectionHeading from './SectionHeading';

// Updated project data with local images
const projects = [
  {
    id: 1,
    title: 'TuduAI',
    description: ' An AI-powered productivity app with natural language task creation, collaborative workspaces, and a minimalist UI for effortless planning.',
    image: '/images/projects/tuduai.png',
    tags: ["React", "Typecript", "Browser Engine"],
    demoLink: 'https://tuduai.vercel.app/',
    featured: true,
    year: '2025',
    duration: '15 Days',
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 2,
    title: 'QuickBang',
    description: 'Lightning-fast search shortcuts to enhance your workflow.',
    image: '/images/projects/quickbang.png',
    tags: ["React", "Typecript", "Browser Engine"],
    demoLink: 'https://quickbang.vercel.app/',
    featured: true,
    year: '2025',
    duration: '5 Days',
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 3,
    title: 'Effisense',
    description: 'Experience the future of productivity with AI-powered task scheduling, smart prioritization, and intelligent workload balancing.',
    image: '/images/projects/effisense.png',
    tags: ["React", "Google API", "GROQ", "Appwrite", "TailwindCSS", "Recharts"],
    demoLink: 'https://effisense.ayush-sharma.in/',
    featured: true,
    year: '2025',
    duration: '3 months',
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 4,
    title: 'Pathgenie',
    description: 'AI powered career guidance platform for personalized career recommendations.',
    image: '/images/projects/pathgenie.png',
    tags: ["React", "Gemini", "Appwrite", "TailwindCSS", "Groq", "Llama 3.3"],
    demoLink: 'https://pathgenie.ayush-sharma.in/',
    githubLink: 'https://github.com/glucon-d/pathgenie',
    featured: true,
    year: '2025',
    duration: '2 months',
    color: 'from-blue-600 to-cyan-600'
  },
  {
    id: 5,
    title: 'PortDev',
    description: 'Create Devloper Portfolio in Minutes.',
    image: '/images/projects/portdev.png',
    tags: ["React", "Firebase", "TailwindCSS", "Framer Motion"],
    demoLink: 'https://portdevv.vercel.app/',
    githubLink: 'https://github.com/cyberboyayush/portdev',
    featured: false,
    year: '2025',
    duration: '1.5 months',
    color: 'from-rose-600 to-pink-600'
  },
  {
    id: 6,
    title: 'React Portfolio',
    description: 'Personal Portfolio Website using React Js',
    image: '/images/projects/react-portfolio.png',
    tags: ["React", "TailwindCSS", "Framer Motion", "Particles.js"],
    demoLink: 'https://cyberboyayush.in/',
    githubLink: 'https://github.com/cyberboyayush/React-Portfolio',
    featured: false,
    year: '2025',
    duration: '5 days',
    color: 'from-violet-600 to-purple-600'
  },
];

// Improved Project Card Component with smoother animations
interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

const ProjectCard = ({ project, index, isSelected, onClick }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // For tracking mouse movement for spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouch) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  // Detect touch devices
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    const handleResize = () => {
      // Reset mouse position when window resizes
      setMousePosition({ x: 0, y: 0 });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Only keeping hover animation, removing initial animations
  const cardVariants = {
    hover: {
      y: -4,
      transition: { 
        duration: 0.3,
        ease: "easeOut" 
      }
    }
  };

  // Content animation variants - only for hover states and internal animations
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      },
    }),
  };

  return (
    <motion.div
      ref={cardRef}
      whileHover="hover"
      variants={cardVariants}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 will-change-transform ${
        isSelected ? 'md:col-span-2 md:row-span-2' : 'col-span-1'
      } h-full bg-black/20 backdrop-blur-sm border border-white/10`}
    >
      {/* Spotlight effect - unchanged */}
      {!isTouch && (
        <div 
          className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`
          }}
        />
      )}

      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-0 right-0 z-20 m-3">
          <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1 text-[10px] font-medium text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 mr-1">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
            Featured
          </div>
        </div>
      )}
      
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Gradient and dark overlays - unchanged */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30 mix-blend-soft-light`} />
        <div className="absolute inset-0 bg-black/80" />
        
        {/* Updated Image loading using local files */}
        <Image 
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-20"
          priority={index < 3}
          loading={index >= 3 ? "lazy" : "eager"}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/projects/placeholder.jpg";
          }}
        />
      </div>

      {/* Card content - simplified animations */}
      <div className={`relative z-10 flex h-full flex-col p-5 sm:p-6 ${isSelected ? 'md:p-7' : ''}`}>
        <div className="flex-1">
          {/* Project title - removing year from header */}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <h3 className={`font-bold text-white ${
                isSelected ? 'text-xl sm:text-2xl md:text-3xl' : 'text-lg sm:text-xl'
              }`}>
                {project.title}
              </h3>
              <div className="ml-2 h-2 w-2 rounded-full bg-purple-400"></div>
            </div>
          </div>
          
          {/* Description - no initial animation */}
          <p className={`text-gray-300 ${
            isSelected 
              ? 'mb-6 text-sm sm:text-base line-clamp-none' 
              : 'mb-5 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3'
          }`}>
            {project.description}
          </p>

          {/* BUILT WITH section with duration info */}
          <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-purple-400 font-medium block">BUILT WITH</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-white/5 border border-purple-500/20 px-2.5 py-1 text-[10px] sm:text-xs font-medium text-purple-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Year and Duration info - consolidated into one section */}
          <div className="flex justify-between items-center mb-5 text-xs">
            <div className="flex items-center text-gray-400">
              <span className="font-medium text-purple-400 mr-2">Year:</span> {project.year}
            </div>
            <div className="flex items-center text-gray-400">
              <span className="font-medium text-purple-400 mr-2">Duration:</span> {project.duration}
            </div>
          </div>
        </div>

        {/* Action buttons - no initial animation */}
        <div className="flex gap-3">
          <a 
            href={project.demoLink} 
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 hover:bg-purple-500 px-4 py-2.5 text-xs font-medium text-white transition-all duration-300 active:translate-y-0.5"
          >
            <Eye size={16} /> Live Demo
          </a>
          {project.githubLink && (
            <a 
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-black/30 hover:bg-black/50 px-4 py-2.5 text-xs font-medium text-white transition-all duration-300 active:translate-y-0.5"
            >
              <Code size={16} /> View Code
            </a>
          )}
        </div>
        
        {/* Decorative gradient circle */}
        <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/30 blur-3xl"></div>
      </div>
    </motion.div>
  );
};

// Main Portfolio Component
const Portfolio = () => {
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the device is mobile
  useEffect(() => {
    const checkDevice = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouchDevice || isSmallScreen);
      
      // Reset project selection when switching to mobile
      if ((isTouchDevice || isSmallScreen) && selectedProject !== null) {
        setSelectedProject(null);
      }
    };
    
    // Initial check
    checkDevice();
    
    // Update on resize
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, [selectedProject]);
  
  // Handle project selection and deselection
  const toggleProjectSelection = (id: number) => {
    // On mobile devices, don't toggle project selection
    if (isMobile) {
      return;
    }
    
    // On desktop, toggle expanded card
    setSelectedProject(prev => prev === id ? null : id);
  };
  
  // Load more projects handler
  const loadMoreProjects = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisibleProjects(prev => Math.min(prev + 3, projects.length));
  };

  // Handle click outside to deselect project
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (gridRef.current && !gridRef.current.contains(e.target as Node)) {
        setSelectedProject(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Improved touch interaction for mobile
  useEffect(() => {
    if (!gridRef.current) return;
    
    const handleTouchStart = (e: TouchEvent) => {
      // Handle touch interactions specially
      const target = e.target as Node;
      if (gridRef.current && gridRef.current.contains(target)) {
        // Touch handling logic if needed
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    return () => document.removeEventListener('touchstart', handleTouchStart);
  }, []);

  // Header animation with subtle entry
  const headerVariants = {
    hidden: { opacity: 0.9, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="portfolio" className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
      {/* Background elements - unchanged */}
      <div className="absolute inset-0 -z-10">
        {/* Dynamic background gradients - reduced intensity for better performance on mobile */}
        <div className="absolute top-1/4 right-1/4 w-[200px] sm:w-[300px] md:w-[500px] h-[200px] sm:h-[300px] md:h-[500px] bg-purple-900/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[150px] opacity-30 sm:opacity-50 md:opacity-70" />
        <div className="absolute bottom-1/3 left-1/3 w-[150px] sm:w-[250px] md:w-[500px] h-[150px] sm:h-[250px] md:h-[500px] bg-indigo-900/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[150px] opacity-30 sm:opacity-40 md:opacity-50" />
        
        {/* Futuristic grid pattern overlay - simplified for mobile */}
        <div className="absolute inset-0 bg-grid-pattern bg-[length:20px_20px] sm:bg-[length:30px_30px] md:bg-[length:50px_50px] opacity-[0.015] sm:opacity-[0.02] md:opacity-[0.03]"></div>
      </div>
      
      {/* Content Container with simpler animations */}
      <div className="container mx-auto px-4 sm:px-6" ref={sectionRef}>
        {/* Use the SectionHeading component */}
        <SectionHeading 
          subtitle="Featured Work"
          title="My Projects"
          description="A collection of applications I've built with a focus on elegant UI and seamless UX"
          className="mb-12 sm:mb-16"
        />

        {/* Projects Grid - no initial loading animation */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 auto-rows-fr"
        >
          {projects.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={index}
              isSelected={!isMobile && selectedProject === project.id}
              onClick={() => toggleProjectSelection(project.id)}
            />
          ))}
        </div>
        
        {/* Load More Button with subtle animation */}
        {visibleProjects < projects.length && (
          <div className="mt-10 sm:mt-12 flex justify-center">
            <motion.button
              onClick={loadMoreProjects}
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-purple-600 px-8 py-3 transition-all hover:bg-purple-500"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium text-white">View More Projects</span>
              <ExternalLink size={16} className="text-white" />
              
              {/* Shimmer effect */}
              <motion.div 
                className="absolute inset-0 opacity-30"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  transform: "translateX(-100%)"
                }}
                animate={{ x: ["0%", "200%"] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 1.5,
                  ease: "easeInOut",
                  repeatDelay: 1
                }}
              />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;