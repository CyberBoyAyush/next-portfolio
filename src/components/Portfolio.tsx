'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github, ArrowRight, Filter } from 'lucide-react';

// Updated project data with categories
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with user authentication, product management, and payment integration.',
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    tags: ['Next.js', 'React', 'Node.js', 'MongoDB'],
    category: 'web',
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    featured: true,
  },
  {
    id: 2,
    title: 'Fitness Tracker App',
    description: 'Mobile application for tracking workouts, nutrition, and fitness goals with interactive charts.',
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    tags: ['React Native', 'Firebase', 'TypeScript'],
    category: 'mobile',
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    featured: false,
  },
  {
    id: 3,
    title: 'Admin Dashboard',
    description: 'Responsive admin dashboard with dark mode, data visualization, and user management.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    tags: ['Vue.js', 'Tailwind CSS', 'Firebase'],
    category: 'web',
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    featured: true,
  },
  {
    id: 4,
    title: 'API Service Platform',
    description: 'RESTful API service with authentication, rate limiting, and comprehensive documentation.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    tags: ['Node.js', 'Express', 'MongoDB', 'Docker'],
    category: 'backend',
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    featured: false,
  },
  {
    id: 5,
    title: 'Social Media Analytics',
    description: 'Analytics dashboard for social media platforms with real-time data processing.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    tags: ['React', 'D3.js', 'Firebase', 'Node.js'],
    category: 'web',
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    featured: true,
  },
  {
    id: 6,
    title: 'Portfolio Website',
    description: 'Modern portfolio website with animations, dark theme, and responsive design.',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    tags: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    category: 'web',
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    featured: true,
  },
];

// Even more advanced and interactive card component
const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // For 3D rotation effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    x.set(mouseX);
    y.set(mouseY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // Spring animations for smoother transitions
  const springConfig = { stiffness: 150, damping: 15 };
  const scaleSpring = useSpring(1, springConfig);
  const opacitySpring = useSpring(0, springConfig);
  
  useEffect(() => {
    if (isHovered) {
      scaleSpring.set(1.02);
      opacitySpring.set(1);
    } else {
      scaleSpring.set(1);
      opacitySpring.set(0);
    }
  }, [isHovered, scaleSpring, opacitySpring]);

  return (
    <motion.div
      className="col-span-1"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale: scaleSpring,
          transformStyle: "preserve-3d",
        }}
        className="group relative h-full overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_30px_4px_rgba(124,58,237,0.15)]"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)]"></div>
        
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 z-10 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400">
            Featured
          </div>
        )}
        
        {/* Project image with overlay */}
        <div className="relative h-[200px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ transform: `translateZ(${isHovered ? 30 : 0}px)` }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Crect width='500' height='300' fill='%23111111'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%235f5f5f'%3EProject Image%3C/text%3E%3C/svg%3E";
            }}
          />
          
          {/* Hover overlay with tech stack details */}
          <motion.div 
            className="absolute inset-0 z-20 bg-black/70 flex flex-col items-center justify-center p-6 text-center"
            style={{ opacity: opacitySpring }}
          >
            <h4 className="text-lg font-bold text-white mb-2">Tech Stack</h4>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-1 text-xs font-medium text-purple-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3 mt-2">
              <motion.a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={14} /> Live Demo
              </motion.a>
              <motion.a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={14} /> GitHub
              </motion.a>
            </div>
          </motion.div>
        </div>
        
        {/* Content */}
        <div className="relative z-5 flex h-full flex-col space-y-4 p-6" style={{ transform: `translateZ(${isHovered ? 50 : 0}px)` }}>
          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">{project.title}</h3>
          <p className="text-sm text-gray-400 flex-grow group-hover:text-gray-300 transition-colors">{project.description}</p>
          
          {/* Tags preview (simplified version shown when not hovering) */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 text-xs font-medium text-purple-400"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="rounded-full bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-400">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
          
          {/* View details button */}
          <div className="flex justify-end pt-2">
            <motion.button
              className="flex items-center gap-1.5 text-purple-400 text-sm transition-all hover:text-purple-300 group"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details 
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Portfolio = () => {
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [filter, setFilter] = useState('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : filter === 'featured' 
      ? projects.filter(project => project.featured) 
      : projects.filter(project => project.category === filter);
  
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'featured', name: 'Featured' },
    { id: 'web', name: 'Web Apps' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'backend', name: 'Backend' },
  ];
  
  const loadMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length));
  };

  useEffect(() => {
    // Reset visible projects when filter changes
    setVisibleProjects(6);
  }, [filter]);

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 right-10 w-80 h-80 bg-purple-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-indigo-900/10 rounded-full blur-[100px]" />
      </div>
    
      <div className="container mx-auto px-6" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm text-purple-400 block mb-1 uppercase tracking-wider">My Work</span>
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">
              Featured Projects
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each project showcases different skills and technologies.
          </p>
        </motion.div>
        
        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-20"
              >
                <p className="text-gray-400 text-lg">No projects found in this category.</p>
              </motion.div>
            ) : (
              filteredProjects.slice(0, visibleProjects).map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))
            )}
          </AnimatePresence>
        </div>
        
        {/* Load More Button */}
        {visibleProjects < filteredProjects.length && (
          <motion.div 
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button
              onClick={loadMoreProjects}
              className="group relative inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-medium text-white transition-all hover:from-purple-700 hover:to-indigo-700"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Load More Projects
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={16} />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;