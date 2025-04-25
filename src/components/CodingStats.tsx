'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Clock, Code, GitBranch, Star } from 'lucide-react';

// Sample stats data
const stats = [
  { 
    label: 'Hours Coded', 
    value: 5200, 
    icon: Clock, 
    suffix: '+',
    color: 'from-purple-600 to-indigo-600'
  },
  { 
    label: 'Projects Completed', 
    value: 72, 
    icon: Code, 
    suffix: '',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    label: 'GitHub Stars', 
    value: 350, 
    icon: Star, 
    suffix: '+',
    color: 'from-yellow-500 to-amber-500'
  },
  { 
    label: 'Repos Contributed', 
    value: 45, 
    icon: GitBranch, 
    suffix: '',
    color: 'from-green-500 to-emerald-500'
  },
];

// Languages data
const languages = [
  { name: 'JavaScript', percentage: 35 },
  { name: 'TypeScript', percentage: 25 },
  { name: 'Python', percentage: 18 },
  { name: 'HTML/CSS', percentage: 15 },
  { name: 'Other', percentage: 7 },
];

// Weekly coding activity
const weeklyActivity = [
  { day: 'Mon', hours: 5.2 },
  { day: 'Tue', hours: 6.5 },
  { day: 'Wed', hours: 4.8 },
  { day: 'Thu', hours: 7.3 },
  { day: 'Fri', hours: 6.1 },
  { day: 'Sat', hours: 3.5 },
  { day: 'Sun', hours: 2.0 },
];

const maxHours = Math.max(...weeklyActivity.map(day => day.hours));

// Animated counter component
const Counter = ({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        if (nodeRef.current) {
          nodeRef.current.textContent = Math.floor(progress * (to - from) + from).toString();
        }
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{from}</span>;
};

const CodingStats = () => {
  return (
    <section id="stats" className="py-20 bg-[#080808]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold">
            <span className="gradient-text">Coding Metrics</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            A breakdown of my coding activity, languages I use, and project stats that showcase my dedication and expertise.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-[#111111] p-6 rounded-xl border border-gray-800 flex flex-col items-center"
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">
                  <Counter from={0} to={stat.value} />
                  {stat.suffix}
                </h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Languages and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Language Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#111111] p-6 rounded-xl border border-gray-800"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Language Distribution</h3>
            <div className="space-y-5">
              {languages.map((lang, index) => (
                <div key={lang.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">{lang.name}</span>
                    <span className="text-gray-400">{lang.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      className={`h-2.5 rounded-full bg-gradient-to-r ${
                        index % 4 === 0 ? 'from-purple-600 to-indigo-600' :
                        index % 4 === 1 ? 'from-blue-500 to-cyan-500' :
                        index % 4 === 2 ? 'from-green-500 to-emerald-500' :
                        'from-yellow-500 to-amber-500'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Coding Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#111111] p-6 rounded-xl border border-gray-800"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Weekly Coding Activity</h3>
            <div className="flex h-48 items-end justify-between gap-2">
              {weeklyActivity.map((day, index) => (
                <div key={day.day} className="flex flex-col items-center flex-1">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(day.hours / maxHours) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`w-full rounded-t-md bg-gradient-to-t ${
                      index % 3 === 0 ? 'from-purple-600 to-indigo-600' :
                      index % 3 === 1 ? 'from-blue-500 to-cyan-500' :
                      'from-pink-500 to-rose-500'
                    }`}
                  />
                  <div className="text-gray-400 text-sm mt-2">{day.day}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CodingStats;