'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';
import { getFeaturedProjects } from '../data/projects';

const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  
  const featuredProjects = getFeaturedProjects();

  return (
    <section id="portfolio" ref={sectionRef} className="py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[#0D1117]">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-50 blur-[100px]" />
      </div>
      
      {/* Grid background */}
      <div
        className="absolute inset-0 -z-10 bg-[length:40px_40px] md:bg-[length:50px_50px] [background-image:linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)]"
      ></div>

      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading 
          subtitle="My Work"
          title="Featured Projects"
          description="A showcase of my best work and recent projects"
          className="mb-8 md:mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={{ 
                ...project, 
                id: String(project.id), 
                featured: true,
                isHackathonProject: project.isHackathonProject 
              }}
              index={index}
              isInView={isInView}
              showFeaturedBadge={true}
              variant="default"
            />
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12 md:mt-16"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-gray-800/80 to-gray-700/80 hover:from-gray-700 hover:to-gray-600 text-white font-semibold rounded-xl md:rounded-2xl border border-gray-600/30 hover:border-gray-500/50 transition-all duration-500 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-gray-900/30 hover:-translate-y-1"
          >
            <span className="text-base md:text-lg">Explore All Projects</span>
            <div className="relative overflow-hidden">
              <ArrowRight size={18} className="md:hidden transition-transform duration-300 group-hover:translate-x-1" />
              <ArrowRight size={20} className="hidden md:block transition-transform duration-300 group-hover:translate-x-1" />
              <ArrowRight size={18} className="md:hidden absolute top-0 left-0 -translate-x-6 transition-transform duration-300 group-hover:translate-x-0" />
              <ArrowRight size={20} className="hidden md:block absolute top-0 left-0 -translate-x-6 transition-transform duration-300 group-hover:translate-x-0" />
            </div>
            <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;