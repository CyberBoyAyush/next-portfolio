'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact,
  SiNextdotjs, SiNodedotjs, SiMongodb, SiTailwindcss,
  SiFirebase, SiPython, SiAmazon, SiDocker,
  SiGit, SiPostgresql, SiVercel, SiAppwrite, SiSupabase,
  SiC, SiCplusplus, SiCloudflare
} from 'react-icons/si';
import { Code, Sparkles } from 'lucide-react';
import { OpenRouter } from '@lobehub/icons';
import SectionHeading from './SectionHeading';

// Enhanced tech stack with additional technologies
const techStack = [
  { id: 'react', name: 'React', icon: SiReact, category: 'frontend' },
  { id: 'nextjs', name: 'Next.js', icon: SiNextdotjs, category: 'frontend' },
  { id: 'typescript', name: 'TypeScript', icon: SiTypescript, category: 'frontend' },
  { id: 'vercel-ai', name: 'Vercel AI SDK', icon: SiVercel, category: 'backend' },
  { id: 'openrouter', name: 'OpenRouter', icon: OpenRouter, category: 'backend' },
  { id: 'javascript', name: 'JavaScript', icon: SiJavascript, category: 'frontend' },
  { id: 'tailwindcss', name: 'Tailwind', icon: SiTailwindcss, category: 'frontend' },
  { id: 'nodejs', name: 'Node.js', icon: SiNodedotjs, category: 'backend' },
  { id: 'python', name: 'Python', icon: SiPython, category: 'backend' },
  { id: 'c', name: 'C', icon: SiC, category: 'backend' },
  { id: 'cplusplus', name: 'C++', icon: SiCplusplus, category: 'backend' },
  { id: 'mongodb', name: 'MongoDB', icon: SiMongodb, category: 'backend' },
  { id: 'postgresql', name: 'PostgreSQL', icon: SiPostgresql, category: 'backend' },
  { id: 'firebase', name: 'Firebase', icon: SiFirebase, category: 'backend' },
  { id: 'appwrite', name: 'Appwrite', icon: SiAppwrite, category: 'backend' },
  { id: 'supabase', name: 'Supabase', icon: SiSupabase, category: 'backend' },
  { id: 'aws', name: 'AWS', icon: SiAmazon, category: 'devops' },
  { id: 'vercel', name: 'Vercel', icon: SiVercel, category: 'devops' },
  { id: 'cloudflare', name: 'Cloudflare', icon: SiCloudflare, category: 'devops' },
  { id: 'docker', name: 'Docker', icon: SiDocker, category: 'devops' },
  { id: 'git', name: 'Git', icon: SiGit, category: 'tools' },
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'devops', name: 'DevOps' },
];

const TechCard = ({ tech, index }: { tech: typeof techStack[0], index: number }) => {
  const Icon = tech.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      whileHover={{ y: -2, scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <div className="relative h-full bg-gray-900/40 backdrop-blur-sm border border-gray-800/60 p-2.5 flex flex-col items-center justify-center gap-2 transition-all duration-300 group-hover:bg-gray-800/60 group-hover:border-blue-500/30 group-hover:shadow-[0_0_15px_-5px_rgba(59,130,246,0.3)] overflow-hidden">
        {/* Hover Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative p-1.5 bg-gray-800/50 border border-gray-700/50 group-hover:border-blue-500/30 transition-colors">
          <Icon className="text-lg text-gray-400 group-hover:text-white transition-colors duration-300" />
        </div>

        <span className="text-[10px] font-medium text-gray-400 group-hover:text-blue-200 transition-colors relative z-10">
          {tech.name}
        </span>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-50px 0px" });

  const filteredTech = activeCategory === 'all'
    ? techStack
    : techStack.filter(tech => tech.category === activeCategory);

  return (
    <section id="skills" className="py-10 relative overflow-hidden">
      {/* Simple Background */}
      <div className="absolute inset-0 -z-10 bg-[#0D1117]" />

      {/* Grid background */}
      <div className="absolute inset-0 -z-10 bg-[length:40px_40px] [background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]" />

      <div className="container mx-auto px-4 max-w-5xl">
        <div ref={titleRef} className="mb-8">
          <SectionHeading
            subtitle="Tech Stack"
            title="Skills & Technologies"
            description="Technologies I use to craft digital experiences"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-8 px-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-3 py-1.5 text-xs font-medium transition-colors duration-300 z-10 ${activeCategory === category.id ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
            >
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-600"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative flex items-center gap-1.5 z-10">
                <Code size={14} />
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <motion.div
          layout
          className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-w-5xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech) => (
              <TechCard key={tech.id} tech={tech} index={0} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Tech Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-gray-800">
            <Sparkles className="text-blue-400" size={16} />
            <span className="text-gray-300 font-medium text-sm">
              {techStack.length}+ Technologies
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
