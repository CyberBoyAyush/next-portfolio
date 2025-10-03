'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { getAllProjects } from '../data/projects';

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  
  const allProjects = getAllProjects();

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[#0D1117]" />
      <div className="absolute inset-0 -z-10 bg-[length:40px_40px] [background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]" />

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Featured</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Projects</h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {allProjects.map((project, index) => (
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
      </div>
    </section>
  );
};

export default Projects;
