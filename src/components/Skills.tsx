'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Typewriter, useTypewriter } from 'react-simple-typewriter';
import { SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, 
  SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss, 
  SiFirebase, SiSupabase, SiTensorflow, SiAppwrite, SiClerk,
  SiPython, SiDjango, SiFlask, SiAmazon, SiDocker,
  SiKubernetes, SiGit, SiGraphql, SiRedis, SiPostgresql,
  SiVercel, SiVite, SiSass, SiMui, SiFigma } from 'react-icons/si';

// Technology cards data with proper icons
const techStack = [
  { 
    id: 'html', 
    name: 'HTML5', 
    icon: SiHtml5, 
    color: '#E34F26', 
    category: 'frontend',
  },
  { 
    id: 'css', 
    name: 'CSS3', 
    icon: SiCss3, 
    color: '#1572B6', 
    category: 'frontend',
  },
  { 
    id: 'javascript', 
    name: 'JavaScript', 
    icon: SiJavascript, 
    color: '#F7DF1E', 
    category: 'frontend',
  },
  { 
    id: 'typescript', 
    name: 'TypeScript', 
    icon: SiTypescript, 
    color: '#3178C6', 
    category: 'frontend',
  },
  { 
    id: 'react', 
    name: 'React', 
    icon: SiReact, 
    color: '#61DAFB', 
    category: 'frontend',
  },
  { 
    id: 'nextjs', 
    name: 'Next.js', 
    icon: SiNextdotjs, 
    color: '#ffffff', 
    category: 'frontend',
  },
  { 
    id: 'tailwindcss', 
    name: 'Tailwind CSS', 
    icon: SiTailwindcss, 
    color: '#06B6D4', 
    category: 'frontend',
  },
  { 
    id: 'sass', 
    name: 'Sass', 
    icon: SiSass, 
    color: '#CC6699', 
    category: 'frontend',
  },
  { 
    id: 'mui', 
    name: 'Material UI', 
    icon: SiMui, 
    color: '#007FFF', 
    category: 'frontend',
  },
  { 
    id: 'vite', 
    name: 'Vite', 
    icon: SiVite, 
    color: '#646CFF', 
    category: 'frontend',
  },
  { 
    id: 'nodejs', 
    name: 'Node.js', 
    icon: SiNodedotjs, 
    color: '#339933', 
    category: 'backend',
  },
  { 
    id: 'express', 
    name: 'Express', 
    icon: SiExpress, 
    color: '#ffffff', 
    category: 'backend',
  },
  { 
    id: 'python', 
    name: 'Python', 
    icon: SiPython, 
    color: '#3776AB', 
    category: 'backend',
  },
  { 
    id: 'django', 
    name: 'Django', 
    icon: SiDjango, 
    color: '#092E20', 
    category: 'backend',
  },
  { 
    id: 'flask', 
    name: 'Flask', 
    icon: SiFlask, 
    color: '#000000', 
    category: 'backend',
  },
  { 
    id: 'graphql', 
    name: 'GraphQL', 
    icon: SiGraphql, 
    color: '#E10098', 
    category: 'backend',
  },
  { 
    id: 'mongodb', 
    name: 'MongoDB', 
    icon: SiMongodb, 
    color: '#47A248', 
    category: 'backend',
  },
  { 
    id: 'postgresql', 
    name: 'PostgreSQL', 
    icon: SiPostgresql, 
    color: '#4169E1', 
    category: 'backend',
  },
  { 
    id: 'redis', 
    name: 'Redis', 
    icon: SiRedis, 
    color: '#DC382D', 
    category: 'backend',
  },
  { 
    id: 'firebase', 
    name: 'Firebase', 
    icon: SiFirebase, 
    color: '#FFCA28', 
    category: 'backend',
  },
  { 
    id: 'supabase', 
    name: 'Supabase', 
    icon: SiSupabase, 
    color: '#3ECF8E', 
    category: 'backend',
  },
  { 
    id: 'appwrite', 
    name: 'Appwrite', 
    icon: SiAppwrite, 
    color: '#FD366E', 
    category: 'backend',
  },
  { 
    id: 'aws', 
    name: 'AWS', 
    icon: SiAmazon, 
    color: '#FF9900', 
    category: 'devops',
  },
  { 
    id: 'docker', 
    name: 'Docker', 
    icon: SiDocker, 
    color: '#2496ED', 
    category: 'devops',
  },
  { 
    id: 'kubernetes', 
    name: 'Kubernetes', 
    icon: SiKubernetes, 
    color: '#326CE5', 
    category: 'devops',
  },
  { 
    id: 'git', 
    name: 'Git', 
    icon: SiGit, 
    color: '#F05032', 
    category: 'tools',
  },
  { 
    id: 'vercel', 
    name: 'Vercel', 
    icon: SiVercel, 
    color: '#ffffff', 
    category: 'tools',
  },
  { 
    id: 'figma', 
    name: 'Figma', 
    icon: SiFigma, 
    color: '#F24E1E', 
    category: 'tools',
  },
  { 
    id: 'tensorflow', 
    name: 'TensorFlow', 
    icon: SiTensorflow, 
    color: '#FF6F00', 
    category: 'tools',
  },
  { 
    id: 'clerk', 
    name: 'Clerk', 
    icon: SiClerk, 
    color: '#6C47FF', 
    category: 'tools',
  },
];

const categories = [
  { id: 'all', name: 'All Technologies' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'devops', name: 'DevOps' },
  { id: 'tools', name: 'Tools & Others' },
];

const TechCard = ({ tech, index, isMounted }: { tech: typeof techStack[0], index: number, isMounted: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  // Separate controls for icon animations
  const [isHovered, setIsHovered] = useState(false);
  
  const handleHoverStart = () => {
    setIsHovered(true);
  };
  
  const handleHoverEnd = () => {
    setIsHovered(false);
  };
  
  // Card variants for entry and hover animations
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.04
      }
    },
    hover: { 
      y: -15,
      boxShadow: `0 10px 25px -5px ${tech.color}33`,
      borderColor: `${tech.color}80`,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };
  
  // Icon variants without the problematic array animation
  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: index * 0.05,
      }
    },
    hover: { 
      scale: 1.2,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };
  
  const Icon = tech.icon;
  
  // Simple alternative for non-mounted state
  if (!isMounted) {
    return (
      <div className="relative group rounded-xl">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-70 blur-sm transition duration-500"></div>
        <div className="relative bg-[#111111] p-6 rounded-xl h-full flex flex-col items-center justify-center border border-gray-800 backdrop-blur-sm transition-all duration-300">
          <div className="text-6xl mb-4 p-4 rounded-full transition-all duration-300" style={{ color: tech.color }}>
            <Icon />
          </div>
          <h3 className="text-base font-medium text-white">{tech.name}</h3>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      variants={cardVariants}
      className="relative group rounded-xl"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-70 blur-sm transition duration-500"></div>
      <div className="relative bg-[#111111] p-6 rounded-xl h-full flex flex-col items-center justify-center border border-gray-800 backdrop-blur-sm transition-all duration-300">
        <motion.div 
          variants={iconVariants}
          className={`text-6xl mb-4 p-4 rounded-full transition-all duration-300 ${isHovered ? "icon-pulse" : ""}`}
          style={{ color: tech.color }}
        >
          <Icon />
        </motion.div>
        
        <h3 className="text-base font-medium text-white">{tech.name}</h3>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMounted, setIsMounted] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true });
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const filteredTech = activeCategory === 'all' 
    ? techStack 
    : techStack.filter(tech => tech.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] -top-10 -right-20 opacity-40" />
      <div className="absolute w-96 h-96 bg-indigo-900/20 rounded-full blur-[120px] -bottom-10 -left-20 opacity-40" />
      
      <div className="container mx-auto px-6">
        <div
          ref={titleRef}
          className="text-center mb-16"
        >
          <span className="text-sm text-purple-400 block mb-1 uppercase tracking-wider">My Expertise</span>
          <h2 className="text-4xl font-bold mb-4 relative inline-block">
            <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">
              {isMounted ? (
                <Typewriter
                  words={['Technical Skills', 'Technologies I Use', 'My Tech Stack']}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              ) : (
                'Technical Skills'
              )}
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            I work with a variety of technologies to build modern, responsive, and scalable applications. Here&apos;s my tech stack that I&apos;ve mastered over the years.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((category, index) => (
            isMounted ? (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`px-5 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-[#111111] text-gray-400 hover:text-white border border-gray-800 hover:border-purple-500/50'
                }`}
              >
                {category.name}
              </motion.button>
            ) : (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-[#111111] text-gray-400 hover:text-white border border-gray-800 hover:border-purple-500/50'
                }`}
              >
                {category.name}
              </button>
            )
          ))}
        </div>

        {/* Tech Cards Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        >
          {isMounted ? (
            <AnimatePresence mode="wait">
              {filteredTech.map((tech, index) => (
                <TechCard key={tech.id} tech={tech} index={index} isMounted={isMounted} />
              ))}
            </AnimatePresence>
          ) : (
            <>
              {filteredTech.map((tech, index) => (
                <TechCard key={tech.id} tech={tech} index={index} isMounted={isMounted} />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;