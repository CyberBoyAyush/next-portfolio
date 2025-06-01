'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, 
  SiNextdotjs, SiNodedotjs, SiMongodb, SiTailwindcss, 
  SiFirebase, SiPython, SiAmazon, SiDocker,
  SiGit, SiPostgresql, SiVercel, SiAppwrite, SiSupabase, 
  SiC, SiCplusplus, SiCloudflare } from 'react-icons/si';
import { Code, Sparkles } from 'lucide-react';
import SectionHeading from './SectionHeading';

// Enhanced tech stack with additional technologies
const techStack = [
  { id: 'react', name: 'React', icon: SiReact, category: 'frontend' },
  { id: 'nextjs', name: 'Next.js', icon: SiNextdotjs, category: 'frontend' },
  { id: 'javascript', name: 'JavaScript', icon: SiJavascript, category: 'frontend' },
  { id: 'typescript', name: 'TypeScript', icon: SiTypescript, category: 'frontend' },
  { id: 'tailwindcss', name: 'Tailwind', icon: SiTailwindcss, category: 'frontend' },
  { id: 'html5', name: 'HTML5', icon: SiHtml5, category: 'frontend' },
  { id: 'css3', name: 'CSS3', icon: SiCss3, category: 'frontend' },
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
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.03,
        type: "spring",
        stiffness: 120
      }}
      whileHover={{ y: -2, scale: 1.02 }}
      className="group relative"
    >
      {/* Compact Card */}
      <div className="relative bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-lg border border-gray-700/50 overflow-hidden hover:border-gray-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 p-3">
        
        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-transparent to-purple-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Compact Icon Container */}
        <div className="relative flex flex-col items-center text-center">
          <div className="relative mb-2">
            <div className="relative p-2 bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30 group-hover:border-gray-500/50 transition-all duration-300">
              <Icon className="text-xl text-gray-300 group-hover:text-white transition-colors duration-300" />
            </div>
          </div>
          
          <span className="text-xs font-medium text-white group-hover:text-blue-100 transition-colors duration-300">
            {tech.name}
          </span>
        </div>
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
    <section id="skills" className="py-12 relative overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0 -z-10 bg-[#0D1117]">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-blue-500/8 via-purple-500/4 to-transparent opacity-50 blur-[80px]" />
      </div>
      
      {/* Compact Grid background */}
      <div className="absolute inset-0 -z-10 bg-[length:30px_30px] md:bg-[length:40px_40px] [background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]" />
      
      <div className="container mx-auto px-4 max-w-5xl">
        <div ref={titleRef} className="mb-8">
          <SectionHeading 
            subtitle="Tech Stack"
            title="Skills & Technologies"
            description="Technologies I use to craft digital experiences"
          />
        </div>

        {/* Compact Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 px-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                activeCategory === category.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-gradient-to-br from-gray-800/60 to-gray-700/60 text-gray-300 hover:text-white border border-gray-600/30 hover:border-gray-500/50 backdrop-blur-sm'
              }`}
            >
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1">
                <Code size={12} />
                {category.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Compact Tech Grid */}
        <motion.div 
          layout
          className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3 max-w-4xl mx-auto"
        >
          <AnimatePresence>
            {filteredTech.map((tech, index) => (
              <TechCard key={tech.id} tech={tech} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Compact Tech Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded-lg border border-gray-600/30 backdrop-blur-sm">
            <Sparkles className="text-blue-400" size={14} />
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