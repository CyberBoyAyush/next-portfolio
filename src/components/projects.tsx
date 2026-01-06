'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Layers } from 'lucide-react';
import ProjectCard from './project-card';
import { getAllProjects } from '../data/projects';
import { useThemeSafe } from './theme-provider';

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const [activeFilter, setActiveFilter] = useState<'All' | 'AI' | 'Others'>('All');
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === 'light';

  const allProjects = getAllProjects();
  const filteredProjects = activeFilter === 'All'
    ? allProjects
    : allProjects.filter(project => project.category === activeFilter);

  const filters = [
    { id: 'All', label: 'All Projects', icon: Sparkles },
    { id: 'AI', label: 'AI Powered', icon: Brain },
    { id: 'Others', label: 'Other Apps', icon: Layers },
  ];

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className={`absolute inset-0 -z-10 transition-colors duration-300 ${isLight ? 'bg-[#fafafa]' : 'bg-[#0D1117]'}`} />
      <div className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${isLight ? '[background-image:linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)]' : '[background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]'}`} />

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className={`text-sm font-semibold mb-2 uppercase tracking-wider ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>Portfolio</div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}>Featured Work</h2>
          <p className={`max-w-2xl mx-auto text-lg ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
            A collection of AI-driven applications and full-stack web solutions built with modern technologies.
          </p>
        </motion.div>

        {/* Category Filter - Segmented Control */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className={`flex p-1.5 backdrop-blur-xl border ${isLight ? 'bg-white/80 border-gray-200 shadow-lg shadow-gray-200/30' : 'bg-gray-900/60 border-gray-800/60 shadow-inner shadow-black/20'}`}>
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as 'All' | 'AI' | 'Others')}
                className={`relative px-4 py-2.5 sm:px-6 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${activeFilter === filter.id ? (isLight ? 'text-gray-900' : 'text-white') : (isLight ? 'text-gray-500 hover:text-gray-700' : 'text-gray-400 hover:text-gray-200')
                  }`}
              >
                {activeFilter === filter.id && (
                  <motion.div
                    layoutId="activeFilter"
                    className={`absolute inset-0 border shadow-sm ${isLight ? 'bg-white border-gray-300' : 'bg-gray-800 border-gray-700'}`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <filter.icon size={16} className={activeFilter === filter.id ? (isLight ? "text-blue-600" : "text-blue-400") : ""} />
                  <span className="hidden sm:inline">{filter.label}</span>
                  <span className="sm:hidden">{filter.id}</span>
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard
                  project={{ ...project, id: String(project.id) }}
                  index={index}
                  isInView={isInView}
                  showFeaturedBadge={project.featured}
                  variant="compact"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
