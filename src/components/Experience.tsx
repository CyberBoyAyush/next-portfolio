'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import Image from 'next/image';
import SectionHeading from './SectionHeading';
import { getAllExperiences } from '../data/experience';
import {
  SiTypescript, SiReact, SiNextdotjs, SiNodedotjs,
  SiPostgresql, SiAmazon, SiDocker, SiTailwindcss, SiPrisma, SiGraphql
} from 'react-icons/si';

const techIconMap: { [key: string]: any } = {
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'TypeScript': SiTypescript,
  'Node.js': SiNodedotjs,
  'PostgreSQL': SiPostgresql,
  'AWS': SiAmazon,
  'Docker': SiDocker,
  'TailwindCSS': SiTailwindcss,
  'Prisma': SiPrisma,
  'GraphQL': SiGraphql,
};

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  
  const experiences = getAllExperiences();

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[#0D1117]" />
      <div className="absolute inset-0 -z-10 bg-[length:40px_40px] [background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]" />

      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeading
          subtitle="Experience"
          title="Work History"
          description="Building scalable solutions and leading development teams"
          className="mb-12"
        />

        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              {/* Glass Card - No shift on hover, just subtle border/shadow */}
              <div className="relative p-6 sm:p-8 rounded-2xl border border-gray-800 bg-gray-900/40 backdrop-blur-md transition-all duration-300 hover:border-gray-700 hover:bg-gray-900/60 shadow-xl">
                
                {/* Header - Company and Date */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gray-800/80 flex items-center justify-center flex-shrink-0 border border-gray-700 overflow-hidden p-2 shadow-inner">
                      {experience.logo ? (
                        <Image
                          src={experience.logo}
                          alt={`${experience.company} logo`}
                          width={56}
                          height={56}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Briefcase size={24} className="text-gray-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {experience.company}
                        </h3>
                        {experience.current && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-lg text-gray-300 font-medium">
                        {experience.position}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400 font-medium bg-gray-800/50 px-4 py-1.5 rounded-full self-start sm:self-auto border border-gray-700/50 whitespace-nowrap">
                    {experience.duration}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, idx) => {
                      const Icon = techIconMap[tech];
                      return (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-800/40 text-gray-400 text-xs font-medium rounded-md border border-gray-700/30 hover:border-gray-600 hover:text-gray-200 transition-colors cursor-default"
                        >
                          {Icon && <Icon className="text-sm" />}
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Responsibilities */}
                <ul className="space-y-3">
                  {experience.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[15px] text-gray-400 group-hover:text-gray-300 transition-colors">
                      <span className="text-blue-500 mt-1.5 flex-shrink-0 text-[10px]">●</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
