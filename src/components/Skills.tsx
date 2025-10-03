'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.02,
      }}
      className="group"
    >
      {/* Simple Card */}
      <div className="bg-gray-900/50 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors p-3">
        {/* Icon Container */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="p-2 bg-gray-800 rounded-lg border border-gray-700">
            <Icon className="text-xl text-gray-300 group-hover:text-white transition-colors" />
          </div>
          
          <span className="text-xs font-medium text-gray-300">
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
    <section id="skills" className="py-20 relative overflow-hidden">
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
        <div className="flex flex-wrap justify-center gap-2 mb-8 px-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Code size={14} />
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3 max-w-4xl mx-auto">
          {filteredTech.map((tech, index) => (
            <TechCard key={tech.id} tech={tech} index={index} />
          ))}
        </div>

        {/* Tech Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/50 rounded-lg border border-gray-800">
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