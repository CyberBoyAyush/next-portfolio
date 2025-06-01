"use client";

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from '../../components/SectionHeading';
import ProjectCard from '../../components/ProjectCard';
import { getAllProjects } from '../../data/projects';

export default function ProjectsPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  
  const allProjects = getAllProjects();

  useEffect(() => {
    // Scroll to top when component mounts (on page load/reload)
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <main className="min-h-screen bg-[#0D1117] pt-20 md:pt-20">
      <section ref={sectionRef} className="py-8 md:py-16 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-[#0D1117]">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-50 blur-[100px]" />
        </div>
        
        {/* Grid background */}
        <div
          className="absolute inset-0 -z-10 bg-[length:30px_30px] md:bg-[length:40px_40px] lg:bg-[length:50px_50px] [background-image:linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)]"
        ></div>

        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeading 
            subtitle="Portfolio"
            title="All Projects"
            description="Explore my complete collection of projects and experiments"
            className="mb-12 md:mb-20"
          />

          {/* Projects Grid - Bigger Landscape Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12">
            {allProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={{
                  ...project, 
                  id: String(project.id),
                  isHackathonProject: project.isHackathonProject
                }}
                index={index}
                isInView={isInView}
                showFeaturedBadge={project.featured}
                variant="default"
              />
            ))}
          </div>

          {/* Project count info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-16 md:mt-20"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded-xl border border-gray-600/30 backdrop-blur-sm">
              <span className="text-gray-300 font-medium text-sm md:text-base">
                {allProjects.length} Projects Showcased
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
