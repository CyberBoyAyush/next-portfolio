'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Brain, Layers } from 'lucide-react';
import Link from 'next/link';
import ProjectCard from './project-card';
import { getFeaturedProjects } from '../data/projects';
import { useThemeSafe } from './theme-provider';

const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const [activeFilter, setActiveFilter] = useState<'All' | 'AI' | 'Others'>('All');
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === 'light';

  const featuredProjects = getFeaturedProjects();
  const filteredProjects = activeFilter === 'All'
    ? featuredProjects
    : featuredProjects.filter(project => project.category === activeFilter);

  const filters = [
    { id: 'All', label: 'All', icon: Sparkles },
    { id: 'AI', label: 'AI', icon: Brain },
    { id: 'Others', label: 'Others', icon: Layers },
  ];

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className={`absolute inset-0 -z-10 transition-colors duration-300 ${isLight ? 'bg-[#fafafa]' : 'bg-[#0D1117]'}`} />
      <div className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${
        isLight 
          ? '[background-image:linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)]' 
          : '[background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]'
      }`} />

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.25 }}
          className="mb-10 text-center"
        >
          <div className={`text-sm font-semibold mb-2 uppercase tracking-wider ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>Featured Work</div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isLight ? 'text-gray-900' : 'text-white'}`}>Selected Projects</h2>
        </motion.div>

        {/* Category Filter - Segmented Control */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.25, delay: 0.05 }}
          className="flex justify-center mb-12"
        >
          <div className={`flex p-1 backdrop-blur-xl border shadow-inner ${
            isLight 
              ? 'bg-gray-100/80 border-gray-200 shadow-gray-200/50' 
              : 'bg-gray-900/60 border-gray-800/60 shadow-black/20'
          }`}>
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 focus:outline-none ${
                  activeFilter === filter.id 
                    ? isLight ? 'text-gray-900' : 'text-white'
                    : isLight ? 'text-gray-500 hover:text-gray-700' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {activeFilter === filter.id && (
                  <motion.div
                    layoutId="activePortfolioFilter"
                    className={`absolute inset-0 border shadow-sm ${
                      isLight ? 'bg-white border-gray-300' : 'bg-gray-800 border-gray-700'
                    }`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <filter.icon size={14} className={activeFilter === filter.id ? (isLight ? "text-blue-600" : "text-blue-400") : ""} />
                  <span>{filter.label}</span>
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectCard
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
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className={`inline-flex items-center gap-2 px-6 py-3 font-medium transition-all border group hover:scale-105 hover:shadow-lg ${
              isLight 
                ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 border-gray-300 hover:shadow-blue-500/10' 
                : 'bg-gray-800/50 text-white hover:bg-gray-800 border-gray-700 hover:shadow-blue-500/10'
            }`}
          >
            <span>View All Projects</span>
            <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform ${isLight ? 'text-blue-600' : 'text-blue-400'}`} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
