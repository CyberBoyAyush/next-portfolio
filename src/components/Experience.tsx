'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { getAllExperiences } from '../data/experience';

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  
  const experiences = getAllExperiences();

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden">
      {/* Keep original background */}
      <div className="absolute inset-0 -z-10 bg-[#0D1117]">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-50 blur-[100px]" />
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 -z-10 bg-[length:40px_40px] md:bg-[length:50px_50px] [background-image:linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)]" />

      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading
          subtitle="Experience"
          title="Work"
          description="Building scalable solutions and leading development teams"
          className="mb-16"
        />

        {/* Experience Cards */}
        <div className="max-w-5xl mx-auto">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative mb-6 last:mb-0"
            >
              <div className="group relative bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-800/50 p-6 md:p-8 hover:border-gray-700/70 hover:bg-gray-900/60 transition-all duration-300 overflow-hidden">
                
                {/* Animated border on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-r from-transparent via-gray-600/50 to-transparent animate-[shimmer_3s_linear_infinite] bg-[length:200%_100%]" />
                </div>
                
                {/* Active indicator */}
                {experience.current && (
                  <div className="absolute -left-px top-8 bottom-8 w-[2px] bg-gradient-to-b from-blue-500/50 via-blue-400/30 to-transparent" />
                )}

                <div className="grid md:grid-cols-[1fr_auto] gap-6">
                  {/* Main content */}
                  <div className="space-y-4">
                    {/* Header */}
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl md:text-2xl font-semibold text-white">
                          {experience.position}
                        </h3>
                        {experience.current && (
                          <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-300 text-xs font-semibold rounded-full border border-blue-500/20 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2 mr-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
                            </span>
                            Current
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                        <span className="text-blue-400 font-medium">{experience.company}</span>
                        <div className="flex items-center gap-4 text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} className="opacity-60" />
                            {experience.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} className="opacity-60" />
                            {experience.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                      {experience.description}
                    </p>

                    {/* Key Points */}
                    <div className="space-y-2.5">
                      {experience.responsibilities.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                          <ChevronRight size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {experience.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-gray-800/40 text-gray-300 text-xs font-medium rounded-md border border-gray-700/40 hover:border-gray-600/60 hover:bg-gray-800/60 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
