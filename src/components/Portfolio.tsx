'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github, ArrowRight, Star, Clock, Calendar, Code, ChevronRight } from 'lucide-react';

// Updated project data with simplified structure
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with user authentication, product management, and payment integration.',
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1',
    tags: ['Next.js', 'React', 'Node.js', 'MongoDB'],
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    featured: true,
    year: '2023',
    duration: '3 months',
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 2,
    title: 'Fitness Tracker App',
    description: 'Mobile application for tracking workouts, nutrition, and fitness goals with interactive charts.',
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c',
    tags: ['React Native', 'Firebase', 'TypeScript'],
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    featured: false,
    year: '2023',
    duration: '2 months',
    color: 'from-emerald-600 to-teal-600'
  },
  {
    id: 3,
    title: 'Admin Dashboard',
    description: 'Responsive admin dashboard with dark mode, data visualization, and user management.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    tags: ['Vue.js', 'Tailwind CSS', 'Firebase'],
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    featured: true,
    year: '2022',
    duration: '4 months',
    color: 'from-blue-600 to-cyan-600'
  },
  {
    id: 4,
    title: 'API Service Platform',
    description: 'RESTful API service with authentication, rate limiting, and comprehensive documentation.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    tags: ['Node.js', 'Express', 'MongoDB', 'Docker'],
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    featured: false,
    year: '2022',
    duration: '2 months',
    color: 'from-amber-600 to-orange-600'
  },
  {
    id: 5,
    title: 'Social Media Analytics',
    description: 'Analytics dashboard for social media platforms with real-time data processing.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    tags: ['React', 'D3.js', 'Firebase', 'Node.js'],
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    featured: true,
    year: '2023',
    duration: '3 months',
    color: 'from-rose-600 to-pink-600'
  },
  {
    id: 6,
    title: 'Portfolio Website',
    description: 'Modern portfolio website with animations, dark theme, and responsive design.',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8',
    tags: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    featured: true,
    year: '2023',
    duration: '1 month',
    color: 'from-violet-600 to-purple-600'
  },
];

// Improved Project Card Component
const ProjectCard = ({ project, index, isSelected, onClick }: { 
  project: typeof projects[0], 
  index: number,
  isSelected: boolean,
  onClick: () => void
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // For tracking mouse movement for spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  // Spring animations for smoother transitions
  const scaleSpring = useSpring(1, { stiffness: 100, damping: 15 });
  
  useEffect(() => {
    if (isHovered) {
      scaleSpring.set(1.02);
    } else {
      scaleSpring.set(1);
    }
  }, [isHovered, scaleSpring]);

  // Content animation stagger
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  // Fix for touch devices
  useEffect(() => {
    const handleResize = () => {
      // Reset hover state when window resizes
      setIsHovered(false);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ scale: scaleSpring }}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 ${
        isSelected ? 'md:col-span-2 md:row-span-2' : 'col-span-1'
      } h-full`}
    >
      {/* Spotlight effect on hover - only show on non-touch devices */}
      <div 
        className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden md:block"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`
        }}
      />

      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Overlay gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40 mix-blend-soft-light`} />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />
        
        {/* Project image */}
        <Image 
          src={`${project.image}?w=800&q=80`}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.5 }}
          priority={index < 3}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.opacity = "0.3";
            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23111111'/%3E%3Ctext x='400' y='300' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='26' fill='%23666666'%3EProject Image%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>

      {/* Glassmorphism card content */}
      <div className={`relative z-10 flex h-full flex-col p-5 sm:p-6 ${isSelected ? 'md:p-7' : ''}`}>
        <div className="flex-1">
          {/* Tags and featured badge */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex flex-wrap gap-2">
              {project.featured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 border border-amber-400/30 px-2 py-0.5 text-xs font-medium text-amber-300">
                  <Star size={10} className="fill-amber-300" />
                  Featured
                </span>
              )}
            </div>
            
            {/* Project year */}
            <div className="flex items-center gap-1.5">
              <Calendar size={12} className="text-gray-400" />
              <span className="text-xs text-gray-400">{project.year}</span>
            </div>
          </div>

          {/* Title and description */}
          <h3 className={`font-bold text-white transition-colors duration-300 group-hover:text-purple-300 ${
            isSelected ? 'text-xl md:text-2xl mb-3' : 'text-lg md:text-xl mb-2'
          }`}>
            {project.title}
          </h3>
          
          <motion.p 
            custom={1}
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`text-gray-300 ${
              isSelected 
                ? 'mb-6 text-sm md:text-base line-clamp-none' 
                : 'mb-4 text-xs md:text-sm line-clamp-2'
            }`}
          >
            {project.description}
          </motion.p>

          {/* Tech stack */}
          <motion.div 
            custom={2}
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-4"
          >
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, isSelected ? project.tags.length : 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-xs font-medium text-gray-300"
                >
                  {tag}
                </span>
              ))}
              {!isSelected && project.tags.length > 3 && (
                <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-xs font-medium text-gray-400">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div>
          {/* Project duration */}
          <div className="flex items-center gap-1.5 mb-4">
            <Clock size={12} className="text-gray-400" />
            <span className="text-xs text-gray-400">{project.duration}</span>
          </div>

          {/* Action buttons */}
          <motion.div 
            custom={3}
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`flex ${isSelected ? 'gap-3 md:gap-4 flex-col sm:flex-row' : 'gap-2 md:gap-3'}`}
          >
            {isSelected ? (
              <>
                <a 
                  href={project.demoLink} 
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r ${project.color} px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25`}
                >
                  <ExternalLink size={14} className="hidden sm:inline-block" /> Live Demo
                </a>
                <a 
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-medium text-white transition-all duration-300 hover:bg-white/10"
                >
                  <Github size={14} className="hidden sm:inline-block" /> Source Code
                </a>
              </>
            ) : (
              <button className="group/arrow flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-medium text-white transition-all duration-300 hover:bg-white/10">
                View Details
                <ChevronRight size={14} className="transition-transform duration-300 group-hover/arrow:translate-x-1" />
              </button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Decorative elements - subtle and compatible with all devices */}
      <div className="absolute top-0 right-0 h-[100px] w-[100px] bg-gradient-to-br from-purple-600/20 to-transparent opacity-60 blur-[30px] -z-10"></div>
      <div className="absolute bottom-0 left-0 h-[100px] w-[100px] bg-gradient-to-tr from-indigo-600/20 to-transparent opacity-60 blur-[30px] -z-10"></div>
    </motion.div>
  );
};

// Main Portfolio Component
const Portfolio = () => {
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Reset project selection on mobile when resizing
      if (window.innerWidth < 768) {
        setSelectedProject(null);
      }
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle project selection and deselection
  const toggleProjectSelection = (id: number) => {
    // On mobile, don't expand cards
    if (isMobile) return;
    
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

  return (
    <section id="portfolio" className="relative py-16 md:py-24 overflow-hidden">
      {/* Enhanced background elements - optimized for all devices */}
      <div className="absolute inset-0 -z-10">
        {/* Dynamic background gradients - reduced intensity for better performance */}
        <div className="absolute top-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-900/10 rounded-full blur-[100px] md:blur-[150px] opacity-50 md:opacity-70" />
        <div className="absolute bottom-1/3 left-1/3 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-indigo-900/10 rounded-full blur-[100px] md:blur-[150px] opacity-40 md:opacity-50" />
        
        {/* Futuristic grid pattern overlay - simplified for mobile */}
        <div className="absolute inset-0 bg-grid-pattern bg-[length:30px_30px] md:bg-[length:50px_50px] opacity-[0.02] md:opacity-[0.03]"></div>
      </div>
      
      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6" ref={sectionRef}>
        {/* Header with animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center justify-center px-3 py-1 mb-3 md:px-4 md:py-1.5 md:mb-4 rounded-full bg-purple-500/10 border border-purple-500/20"
          >
            <span className="text-xs md:text-sm font-medium text-purple-400">Featured Projects</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500">
              My Creative Portfolio
            </span>
          </h2>
          
          <p className="text-base md:text-lg text-gray-400">
            Explore my latest projects showcasing innovative solutions and technical expertise.
          </p>
        </motion.div>

        {/* Projects Grid with improved responsive layout */}
        <div 
          ref={gridRef} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 auto-rows-fr"
        >
          {projects.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={index}
              isSelected={selectedProject === project.id}
              onClick={() => toggleProjectSelection(project.id)}
            />
          ))}
        </div>
        
        {/* Load More Button with enhanced animation - more accessible on mobile */}
        {visibleProjects < projects.length && (
          <motion.div 
            className="mt-8 md:mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              onClick={loadMoreProjects}
              className="group relative inline-flex items-center gap-2 md:gap-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-6 md:px-8 py-2.5 md:py-3.5 text-xs sm:text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-purple-500/20 overflow-hidden"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Load More Projects</span>
              <ArrowRight className="relative z-10 transition-transform group-hover:translate-x-1" size={16} />
              
              {/* Simplified animated background for better performance */}
              <span className="absolute inset-0 overflow-hidden">
                <motion.span 
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["0%", "200%"]
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 2.5,
                    ease: "linear",
                    repeatDelay: 2
                  }}
                />
              </span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;