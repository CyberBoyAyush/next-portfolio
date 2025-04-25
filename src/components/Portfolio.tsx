'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

// Sample portfolio items - replace with your actual projects
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with user authentication, product management, and payment integration.',
    image: '/project-1.jpg',
    tags: ['Web App', 'React', 'Node.js', 'MongoDB'],
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    category: 'fullstack',
  },
  {
    id: 2,
    title: 'Fitness Tracker App',
    description: 'Mobile application for tracking workouts, nutrition, and fitness goals with interactive charts.',
    image: '/project-2.jpg',
    tags: ['Mobile App', 'React Native', 'Firebase'],
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    category: 'mobile',
  },
  {
    id: 3,
    title: 'Admin Dashboard',
    description: 'Responsive admin dashboard with dark mode, data visualization, and user management.',
    image: '/project-3.jpg',
    tags: ['Web App', 'Vue.js', 'Tailwind CSS'],
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    category: 'frontend',
  },
  {
    id: 4,
    title: 'API Service Platform',
    description: 'RESTful API service with authentication, rate limiting, and comprehensive documentation.',
    image: '/project-4.jpg',
    tags: ['Backend', 'Node.js', 'Express', 'MongoDB'],
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    category: 'backend',
  },
  {
    id: 5,
    title: 'Social Media Analytics',
    description: 'Analytics dashboard for social media platforms with real-time data processing.',
    image: '/project-5.jpg',
    tags: ['Web App', 'React', 'D3.js', 'Firebase'],
    demoLink: 'https://project-demo.com',
    githubLink: 'https://github.com/yourusername/project',
    category: 'fullstack',
  },
  {
    id: 6,
    title: 'Portfolio Website',
    description: 'Modern portfolio website with animations, dark theme, and responsive design.',
    image: '/project-6.jpg',
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

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold">
            <span className="gradient-text">My Projects</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each project showcases 
            different skills and technologies that I've mastered over the years.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                  : 'bg-[#111111] text-gray-400 hover:text-white'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={project.id}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="bg-[#111111] rounded-xl overflow-hidden shadow-lg border border-gray-800 transition-all duration-300 hover:border-purple-500/50 group"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                  priority={index < 3}
                  onError={(e) => {
                    // Fallback for image
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Crect width='500' height='300' fill='%23111111'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%235f5f5f'%3EProject Image%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>

                <div className="flex gap-3">
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm transition-all hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 hover:border-purple-500 text-gray-300 hover:text-white text-sm transition-all"
                  >
                    <Github size={16} /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;