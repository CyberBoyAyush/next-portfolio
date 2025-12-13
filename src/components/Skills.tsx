'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiJavascript, SiTypescript, SiReact,
  SiNextdotjs, SiNodedotjs, SiMongodb, SiTailwindcss,
  SiFirebase, SiPython, SiAmazon, SiDocker,
  SiGit, SiPostgresql, SiVercel, SiAppwrite, SiSupabase,
  SiC, SiCplusplus, SiCloudflare, SiBun
} from 'react-icons/si';
import { DiRedis } from 'react-icons/di';
import { Code } from 'lucide-react';
import { OpenRouter } from '@lobehub/icons';
import SectionHeading from './section-heading';

// Tech stack data
const techStack = [
  { id: 'react', name: 'React', icon: SiReact },
  { id: 'nextjs', name: 'Next.js', icon: SiNextdotjs },
  { id: 'typescript', name: 'TypeScript', icon: SiTypescript },
  { id: 'vercel-ai', name: 'Vercel AI SDK', icon: SiVercel },
  { id: 'openrouter', name: 'OpenRouter', icon: OpenRouter },
  { id: 'javascript', name: 'JavaScript', icon: SiJavascript },
  { id: 'tailwindcss', name: 'Tailwind', icon: SiTailwindcss },
  { id: 'nodejs', name: 'Node.js', icon: SiNodedotjs },
  { id: 'python', name: 'Python', icon: SiPython },
  { id: 'c', name: 'C', icon: SiC },
  { id: 'cplusplus', name: 'C++', icon: SiCplusplus },
  { id: 'mongodb', name: 'MongoDB', icon: SiMongodb },
  { id: 'postgresql', name: 'PostgreSQL', icon: SiPostgresql },
  { id: 'firebase', name: 'Firebase', icon: SiFirebase },
  { id: 'appwrite', name: 'Appwrite', icon: SiAppwrite },
  { id: 'supabase', name: 'Supabase', icon: SiSupabase },
  { id: 'aws', name: 'AWS', icon: SiAmazon },
  { id: 'vercel', name: 'Vercel', icon: SiVercel },
  { id: 'cloudflare', name: 'Cloudflare', icon: SiCloudflare },
  { id: 'docker', name: 'Docker', icon: SiDocker },
  { id: 'git', name: 'Git', icon: SiGit },
  { id: 'redis', name: 'Redis', icon: DiRedis },
  { id: 'bun', name: 'Bun.js', icon: SiBun },
];

// Brand Color Map
const TECH_COLORS: Record<string, string> = {
  'React': '#61DAFB',
  'Next.js': '#ffffff',
  'TypeScript': '#3178C6',
  'Vercel AI SDK': '#ffffff',
  'OpenRouter': '#ffffff',
  'JavaScript': '#F7DF1E',
  'Tailwind': '#06B6D4',
  'Node.js': '#339933',
  'Python': '#3776AB',
  'C': '#A8B9CC',
  'C++': '#00599C',
  'MongoDB': '#47A248',
  'PostgreSQL': '#4169E1',
  'Firebase': '#FFCA28',
  'Appwrite': '#FD366E',
  'Supabase': '#3ECF8E',
  'AWS': '#FF9900',
  'Vercel': '#ffffff',
  'Cloudflare': '#F38020',
  'Docker': '#2496ED',
  'Git': '#F05032',
  'Redis': '#DC382D',
  'Bun.js': '#FBF0DF',
};

const SkillItem = ({ tech }: { tech: typeof techStack[0] }) => {
  const [isHovered, setHovered] = useState(false);
  const Icon = tech.icon;
  const color = TECH_COLORS[tech.name] || '#ffffff';
  const isRedis = tech.id === 'redis';

  return (
    <div 
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        whileHover={{ 
          scale: 1.2, 
          y: -5,
          transition: { duration: 0.2 } 
        }}
        className="p-2 sm:p-3 cursor-pointer transition-all duration-300"
      >
        <Icon 
          className={`transition-colors duration-300 ${isHovered ? '' : 'text-gray-600'} ${
            isRedis 
              ? 'w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16' 
              : 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12'
          }`}
          style={{ color: isHovered ? color : undefined }}
        />
        
        {/* Glow effect on hover */}
        {isHovered && (
          <motion.div
            layoutId="glow"
            className="absolute inset-0 blur-2xl -z-10 opacity-20"
            style={{ backgroundColor: color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            animate={{ opacity: 1, y: -15, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            transition={{ duration: 0.2 }}
            className="absolute -top-8 left-1/2 z-50 px-3 py-1.5 rounded-lg border border-white/10 bg-gray-900/90 backdrop-blur-md text-xs font-medium text-white whitespace-nowrap shadow-xl pointer-events-none"
          >
            {tech.name}
            {/* Tiny Arrow */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900/90 rotate-45 border-r border-b border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[#0D1117]" />
      <div className="absolute inset-0 -z-10 bg-[length:40px_40px] [background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]" />

      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading
          subtitle="Tech Stack"
          title="Skills"
          description="The technologies I build with."
          className="mb-16"
        />

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-6 sm:gap-x-8 sm:gap-y-8 md:gap-x-12 md:gap-y-12 max-w-5xl mx-auto">
          {techStack.map((tech) => (
            <SkillItem key={tech.id} tech={tech} />
          ))}
        </div>
        
        {/* Footer Stat */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm text-gray-500 hover:text-gray-300 transition-colors">
            <Code size={14} />
            <span>{techStack.length}+ technologies in my arsenal</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
