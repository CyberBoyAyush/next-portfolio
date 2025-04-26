'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code, Eye } from 'lucide-react';
import Image from 'next/image';

// Updated project data with simplified structure
const projects = [
  {
    id: 1,
    title: 'Finwise',
    description: 'AI Powered Financial Advisor for personalized financial recommendations.',
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1',
    tags: ['React', 'Gemini', 'GROQ', 'Appwrite', 'TailwindCSS'],
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

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 ${
        isSelected ? 'md:col-span-2 md:row-span-2' : 'col-span-1'
      } h-full bg-black/20 backdrop-blur-sm border border-white/10`}
    >
      {/* Spotlight effect on hover - only show on non-touch devices */}
      {!isTouch && (
        <div 
          className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`
          }}
        />
      )}

      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Overlay gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30 mix-blend-soft-light`} />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/80" />
        
        {/* Project image - adaptive loading for mobile */}
        <Image 
          src={`${project.image}?w=${isTouch ? '400' : '800'}&q=${isTouch ? '70' : '80'}`}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.2 }}
          priority={index < 3}
          loading={index >= 3 ? "lazy" : "eager"}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.opacity = "0.2";
            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23111111'/%3E%3Ctext x='400' y='300' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='26' fill='%23666666'%3EProject Image%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>

      {/* Glassmorphism card content */}
      <div className={`relative z-10 flex h-full flex-col p-5 sm:p-6 ${isSelected ? 'md:p-7' : ''}`}>
        <div className="flex-1">
          {/* Project name with accent dot */}
          <div className="flex items-center mb-3">
            <h3 className={`font-bold text-white ${
              isSelected ? 'text-xl sm:text-2xl md:text-3xl' : 'text-lg sm:text-xl'
            }`}>
              {project.title}
            </h3>
            <div className="ml-2 h-2 w-2 rounded-full bg-purple-400"></div>
          </div>
          
          {/* Description */}
          <motion.p 
            custom={1}
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`text-gray-300 ${
              isSelected 
                ? 'mb-6 text-sm sm:text-base line-clamp-none' 
                : 'mb-5 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3'
            }`}
          >
            {project.description}
          </motion.p>

          {/* BUILT WITH section */}
          <motion.div 
            custom={2}
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-5"
          >
            <span className="text-xs text-purple-400 font-medium mb-2 block">BUILT WITH</span>
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
          </motion.div>
        </div>

        {/* Action buttons */}
        <motion.div 
          custom={3}
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-3"
        >
          <a 
            href={project.demoLink} 
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 hover:bg-purple-500 px-4 py-2.5 text-xs font-medium text-white transition-all duration-300 active:translate-y-0.5"
          >
            <Eye size={16} /> Live Demo
          </a>
          <a 
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-black/30 hover:bg-black/50 px-4 py-2.5 text-xs font-medium text-white transition-all duration-300 active:translate-y-0.5"
          >
            <Code size={16} /> View Code
          </a>
        </motion.div>
        
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
    return () => window.removeEventListener('resize', checkDevice);
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

  return (
    <section id="portfolio" className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
      {/* Restored original background elements - optimized for all devices */}
      <div className="absolute inset-0 -z-10">
        {/* Dynamic background gradients - reduced intensity for better performance on mobile */}
        <div className="absolute top-1/4 right-1/4 w-[200px] sm:w-[300px] md:w-[500px] h-[200px] sm:h-[300px] md:h-[500px] bg-purple-900/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[150px] opacity-30 sm:opacity-50 md:opacity-70" />
        <div className="absolute bottom-1/3 left-1/3 w-[150px] sm:w-[250px] md:w-[500px] h-[150px] sm:h-[250px] md:h-[500px] bg-indigo-900/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[150px] opacity-30 sm:opacity-40 md:opacity-50" />
        
        {/* Futuristic grid pattern overlay - simplified for mobile */}
        <div className="absolute inset-0 bg-grid-pattern bg-[length:20px_20px] sm:bg-[length:30px_30px] md:bg-[length:50px_50px] opacity-[0.015] sm:opacity-[0.02] md:opacity-[0.03]"></div>
      </div>
      
      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6" ref={sectionRef}>
        {/* Header with animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600">
              My Projects
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-gray-400">
            A collection of applications I've built with a focus on elegant UI and seamless UX
          </p>
        </motion.div>

        {/* Projects Grid with improved responsive layout */}
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
        
        {/* Load More Button with enhanced animation */}
        {visibleProjects < projects.length && (
          <motion.div 
            className="mt-10 sm:mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
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
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;