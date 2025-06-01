'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';
import { getAllProjects } from '../data/projects';

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const [filter, setFilter] = useState('all');
  
  const allProjects = getAllProjects();
  
  // Get unique categories
  const categories = ['all', ...new Set(allProjects.flatMap(project => project.tags))];
  
  // Filter projects based on selected category
  const filteredProjects = filter === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.tags.includes(filter));

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[#0D1117]">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-50 blur-[100px]" />
      </div>
      
      {/* Grid background */}
      <div
        className="absolute inset-0 -z-10 bg-[length:40px_40px] md:bg-[length:50px_50px] [background-image:linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)]"
      ></div>

      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading 
          subtitle="Portfolio"
          title="All Projects"
          description="Explore my complete collection of projects and experiments"
          className="mb-16"
        />

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.slice(0, 8).map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-blue-600/80 text-white border border-blue-500/50'
                  : 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              {category === 'all' ? 'All Projects' : category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={{ ...project, id: String(project.id) }}
              index={index}
              isInView={isInView}
              showFeaturedBadge={project.featured}
              variant="compact"
            />
          ))}
        </div>

        {/* No projects message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">No projects found for "{filter}"</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
