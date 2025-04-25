'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

// Sample portfolio items - replace with your actual projects
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with user authentication, product management, and payment integration.',
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    tags: ['Web App', 'React', 'Node.js', 'MongoDB'],
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    category: 'fullstack',
  },
  {
    id: 2,
    title: 'Fitness Tracker App',
    description: 'Mobile application for tracking workouts, nutrition, and fitness goals with interactive charts.',
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    tags: ['Mobile App', 'React Native', 'Firebase'],
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    category: 'mobile',
  },
  {
    id: 3,
    title: 'Admin Dashboard',
    description: 'Responsive admin dashboard with dark mode, data visualization, and user management.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    tags: ['Web App', 'Vue.js', 'Tailwind CSS'],
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    category: 'frontend',
  },
  {
    id: 4,
    title: 'API Service Platform',
    description: 'RESTful API service with authentication, rate limiting, and comprehensive documentation.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    tags: ['Backend', 'Node.js', 'Express', 'MongoDB'],
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    category: 'backend',
  },
  {
    id: 5,
    title: 'Social Media Analytics',
    description: 'Analytics dashboard for social media platforms with real-time data processing.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    tags: ['Web App', 'React', 'D3.js', 'Firebase'],
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    category: 'fullstack',
  },
  {
    id: 6,
    title: 'Portfolio Website',
    description: 'Modern portfolio website with animations, dark theme, and responsive design.',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    tags: ['Web App', 'Next.js', 'Framer Motion', 'Tailwind CSS'],
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    category: 'frontend',
  },
];

const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'fullstack', name: 'Full Stack' },
  { id: 'mobile', name: 'Mobile Apps' },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Card component with 3D hover effect
const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="bg-[#111111] rounded-xl overflow-hidden shadow-lg border border-gray-800 transition-all duration-300 hover:border-purple-500/50 group"
      whileHover={{ scale: 1.02 }}
    >
      {/* Project Image */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <motion.div 
          className="h-full w-full"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'translateZ(20px)',
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            width={500}
            height={300}
            className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
            priority={index < 3}
            onError={(e) => {
              // Fallback for image
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Crect width='500' height='300' fill='%23111111'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%235f5f5f'%3EProject Image%3C/text%3E%3C/svg%3E";
            }}
          />
        </motion.div>
        
        {/* Project title overlay */}
        <motion.div 
          className="absolute inset-0 z-20 flex flex-col justify-end p-6"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'translateZ(40px)',
          }}
        >
          <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
            {project.title}
          </h3>
        </motion.div>
      </div>

      {/* Project Info */}
      <motion.div 
        className="p-6"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: 'translateZ(30px)',
        }}
      >
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-gray-800/80 text-gray-300 px-2 py-1 rounded-full backdrop-blur-sm border border-gray-700/50"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-gray-400 mb-5 text-sm">{project.description}</p>

        <div className="flex gap-3">
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm transition-all hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
          >
            <ExternalLink size={16} /> Live Demo
          </a>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-700 hover:border-purple-500 text-gray-300 hover:text-white text-sm transition-all hover:bg-purple-500/10"
          >
            <Github size={16} /> Code
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 bottom-1/4 w-1/3 h-80 bg-purple-800/10 blur-[100px] rounded-full" />
        <div className="absolute left-0 top-1/4 w-1/3 h-80 bg-blue-800/10 blur-[100px] rounded-full" />
      </div>
    
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm text-purple-400 block mb-1">MY RECENT WORK</span>
          <h2 className="text-4xl font-bold mb-6">
            <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">Featured Projects</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each project showcases 
            different skills and technologies that I've mastered over the years.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`px-5 py-2 rounded-md transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                  : 'bg-[#111111] text-gray-400 hover:text-white border border-gray-800 hover:border-purple-500/50'
              }`}
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-gray-400"
          >
            <span className="block text-6xl mb-4">🔍</span>
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p>No projects found in this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;