'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, Brain } from 'lucide-react';
import Link from 'next/link';
import ProjectCard from './ProjectCard';
import { getFeaturedProjects } from '../data/projects';

const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const [activeFilter, setActiveFilter] = useState<'All' | 'AI' | 'Others'>('All');
  
  const featuredProjects = getFeaturedProjects();
  const filteredProjects = activeFilter === 'All' 
    ? featuredProjects 
    : featuredProjects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[#0D1117]" />
      <div className="absolute inset-0 -z-10 bg-[length:40px_40px] [background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]" />

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Featured</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Projects</h2>
        </motion.div>

        {/* Category Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10 px-2"
        >
          <button
            onClick={() => setActiveFilter('All')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === 'All'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Sparkles size={14} />
              All
            </span>
          </button>
          <button
            onClick={() => setActiveFilter('AI')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === 'AI'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Brain size={14} />
              AI
            </span>
          </button>
          <button
            onClick={() => setActiveFilter('Others')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === 'Others'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
            }`}
          >
            Others
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
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
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors border border-gray-700 group"
          >
            <span>View All Projects</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;