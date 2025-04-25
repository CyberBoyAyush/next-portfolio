'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 90, icon: '💻' },
      { name: 'Next.js', level: 85, icon: '⚛️' },
      { name: 'TypeScript', level: 88, icon: '📝' },
      { name: 'Tailwind CSS', level: 92, icon: '🎨' },
      { name: 'Framer Motion', level: 80, icon: '🔄' },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 85, icon: '🖥️' },
      { name: 'Express', level: 82, icon: '🚂' },
      { name: 'MongoDB', level: 78, icon: '🍃' },
      { name: 'PostgreSQL', level: 75, icon: '🐘' },
      { name: 'GraphQL', level: 70, icon: '⚡' },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { name: 'Git', level: 88, icon: '🔄' },
      { name: 'Docker', level: 75, icon: '🐳' },
      { name: 'AWS', level: 72, icon: '☁️' },
      { name: 'CI/CD', level: 70, icon: '🔄' },
      { name: 'Figma', level: 85, icon: '🎨' },
    ],
  },
];

const SkillCard = ({ name, level, icon, delay }: { name: string; level: number; icon: string; delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="bg-[#111111] p-5 rounded-lg shadow-lg border border-gray-800 hover:border-purple-500/50 transition-colors duration-300"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-medium text-white mb-2">{name}</h3>
      <div className="w-full bg-gray-800 rounded-full h-2.5 mb-2">
        <div
          className="h-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600"
          style={{ width: `${level}%` }}
        />
      </div>
      <p className="text-gray-400 text-sm">{level}% Proficiency</p>
    </motion.div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].name);

  return (
    <section id="skills" className="py-20 bg-[#050505]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold">
            <span className="gradient-text">Technical Skills</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            My expertise spans across various technologies in web development, 
            allowing me to build complete solutions from front to back.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-[#111111] rounded-full p-1 space-x-1">
            {skillCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-5 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.name
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories
            .find((category) => category.name === activeCategory)
            ?.skills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                name={skill.name}
                level={skill.level}
                icon={skill.icon}
                delay={index * 0.1}
              />
            ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;