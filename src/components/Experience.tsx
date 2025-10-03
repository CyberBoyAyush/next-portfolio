'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
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
          title="Work"
          description="Building scalable solutions and leading development teams"
          className="mb-12"
        />

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-4"
            >
              {/* Header - Company and Date */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-800/50 flex items-center justify-center flex-shrink-0 border border-gray-700 overflow-hidden p-1">
                    {experience.logo ? (
                      <Image
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Briefcase size={20} className="text-gray-500" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {experience.company}
                      </h3>
                      {experience.current && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-400 text-xs font-semibold rounded border border-green-500/20">
                          <span className="w-1 h-1 rounded-full bg-green-400" />
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-base text-gray-300 font-medium">
                      {experience.position}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-400 sm:text-right flex-shrink-0 ml-[52px] sm:ml-0">
                  <div>{experience.duration}</div>
                  <div className="text-gray-500">{experience.location}</div>
                </div>
              </div>

              {/* Technologies & Tools */}
              <div>
                <div className="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wide">
                  Technologies & Tools
                </div>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, idx) => {
                    const Icon = techIconMap[tech];
                    return (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/60 text-gray-300 text-xs font-medium rounded-md border border-gray-700/50"
                      >
                        {Icon && <Icon className="text-sm" />}
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Responsibilities */}
              <div className="space-y-2">
                {experience.responsibilities.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-gray-500 mt-1 flex-shrink-0">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              {index < experiences.length - 1 && (
                <div className="pt-8 border-b border-gray-800" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
