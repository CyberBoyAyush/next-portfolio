'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, Briefcase, Code } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { getAllExperiences } from '../data/experience';

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  
  const experiences = getAllExperiences();

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden">
      {/* Background */}
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
        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-gray-900/50 rounded-lg border border-gray-800/60 p-6 hover:border-gray-700/80 transition-colors duration-300"
            >
              {experience.current && (
                <div className="absolute top-4 right-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {experience.position}
                </h3>
                <div className="flex items-center gap-2 text-blue-400 font-medium mb-3">
                  <Briefcase size={16} />
                  {experience.company}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {experience.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {experience.location}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                {experience.description}
              </p>

              {/* Key highlights */}
              <div className="mb-6">
                <h4 className="text-white font-medium mb-3 text-sm">Key highlights</h4>
                <ul className="space-y-2">
                  {experience.responsibilities.slice(0, 3).map((responsibility, idx) => (
                    <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-white font-medium mb-3 text-sm flex items-center gap-2">
                  <Code size={14} className="text-orange-400" />
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-800/50 text-gray-300 rounded text-xs border border-gray-700/50"
                    >
                      {tech}
                    </span>
                  ))}
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
