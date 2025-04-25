'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, 
  SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss, 
  SiFirebase, SiSupabase, SiTensorflow, SiAppwrite, SiClerk } from 'react-icons/si';

// Technology cards data with proper icons
const techStack = [
  { 
    id: 'html', 
    name: 'HTML5', 
    icon: SiHtml5, 
    color: '#E34F26', 
    expertise: 95,
    category: 'frontend',
  },
  { 
    id: 'css', 
    name: 'CSS3', 
    icon: SiCss3, 
    color: '#1572B6', 
    expertise: 92,
    category: 'frontend',
  },
  { 
    id: 'javascript', 
    name: 'JavaScript', 
    icon: SiJavascript, 
    color: '#F7DF1E', 
    expertise: 94,
    category: 'frontend',
  },
  { 
    id: 'typescript', 
    name: 'TypeScript', 
    icon: SiTypescript, 
    color: '#3178C6', 
    expertise: 90,
    category: 'frontend',
  },
  { 
    id: 'react', 
    name: 'React', 
    icon: SiReact, 
    color: '#61DAFB', 
    expertise: 95,
    category: 'frontend',
  },
  { 
    id: 'nextjs', 
    name: 'Next.js', 
    icon: SiNextdotjs, 
    color: '#ffffff', 
    expertise: 92,
    category: 'frontend',
  },
  { 
    id: 'tailwindcss', 
    name: 'Tailwind CSS', 
    icon: SiTailwindcss, 
    color: '#06B6D4', 
    expertise: 95,
    category: 'frontend',
  },
  { 
    id: 'nodejs', 
    name: 'Node.js', 
    icon: SiNodedotjs, 
    color: '#339933', 
    expertise: 88,
    category: 'backend',
  },
  { 
    id: 'express', 
    name: 'Express', 
    icon: SiExpress, 
    color: '#ffffff', 
    expertise: 86,
    category: 'backend',
  },
  { 
    id: 'mongodb', 
    name: 'MongoDB', 
    icon: SiMongodb, 
    color: '#47A248', 
    expertise: 85,
    category: 'backend',
  },
  { 
    id: 'firebase', 
    name: 'Firebase', 
    icon: SiFirebase, 
    color: '#FFCA28', 
    expertise: 84,
    category: 'backend',
  },
  { 
    id: 'supabase', 
    name: 'Supabase', 
    icon: SiSupabase, 
    color: '#3ECF8E', 
    expertise: 82,
    category: 'backend',
  },
  { 
    id: 'tensorflow', 
    name: 'TensorFlow', 
    icon: SiTensorflow, 
    color: '#FF6F00', 
    expertise: 75,
    category: 'tools',
  },
  { 
    id: 'appwrite', 
    name: 'Appwrite', 
    icon: SiAppwrite, 
    color: '#FD366E', 
    expertise: 80,
    category: 'backend',
  },
  { 
    id: 'clerk', 
    name: 'Clerk', 
    icon: SiClerk, 
    color: '#6C47FF', 
    expertise: 83,
    category: 'tools',
  },
];

const categories = [
  { id: 'all', name: 'All Technologies' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'tools', name: 'Tools & Others' },
];

const TechCard = ({ tech, index }: { tech: typeof techStack[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.5,
            delay: index * 0.1,
            ease: 'easeOut'
          }
        }
      }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-60 group-hover:opacity-90 transition duration-500"></div>
      <div className="relative bg-[#111111] p-6 rounded-lg h-full flex flex-col items-center justify-center border border-gray-800 group-hover:border-purple-500/50 transition-colors duration-300">
        <div 
          className="text-5xl mb-4 p-3 rounded-full transition-all duration-300"
          style={{ color: tech.color }}
        >
          <tech.icon />
        </div>
        
        <h3 className="text-lg font-medium text-white mb-2">{tech.name}</h3>
        
        <div className="w-full bg-gray-800 rounded-full h-1.5 mb-2 mt-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${tech.expertise}%` }}
            transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
            className="h-1.5 rounded-full"
            style={{ 
              background: `linear-gradient(90deg, ${tech.color} 0%, rgba(123, 97, 255, 0.8) 100%)` 
            }}
          />
        </div>
        
        <p className="text-gray-400 text-sm mt-1">{tech.expertise}% Mastery</p>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true });
  
  const filteredTech = activeCategory === 'all' 
    ? techStack 
    : techStack.filter(tech => tech.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] -top-10 -right-20 opacity-40" />
      <div className="absolute w-96 h-96 bg-indigo-900/20 rounded-full blur-[120px] -bottom-10 -left-20 opacity-40" />
      
      <div className="container mx-auto px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm text-purple-400 block mb-1 uppercase tracking-wider">My Expertise</span>
          <h2 className="text-4xl font-bold mb-4 relative inline-block">
            <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">
              <Typewriter
                words={['Technical Skills', 'Technologies I Use', 'My Tech Stack']}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            I work with a variety of technologies to build modern, responsive, and scalable 
            applications. Here's my tech stack that I've mastered over the years.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`px-5 py-2 rounded-md transition-all duration-300 ${
                activeCategory === category.id
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                : 'bg-[#111111] text-gray-400 hover:text-white border border-gray-800 hover:border-purple-500/50'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Tech Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {filteredTech.map((tech, index) => (
            <TechCard key={tech.id} tech={tech} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;