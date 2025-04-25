'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const githubUsername = 'cyberboyayush';
const leetcodeUsername = 'cyberboyayush';

const CodingStats = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true });

  return (
    <section id="coding-stats" className="py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-purple-900/10 to-transparent opacity-70 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-indigo-900/10 to-transparent opacity-70 blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="text-xs font-medium text-purple-400 block mb-1 uppercase tracking-wider">My Progress</span>
          <h2 className="text-3xl font-bold">
            <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">
              Coding Stats
            </span>
          </h2>
          <p className="mt-2 text-gray-400 text-sm max-w-2xl mx-auto">
            A snapshot of my coding journey across different platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* GitHub Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="backdrop-blur-lg bg-[#0D1117]/80 p-5 rounded-2xl border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 shadow-lg group"
          >
            <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20" className="mr-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.337-.012 2.416-.012 2.744 0 .267.18.578.688.48C19.138 20.16 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub Stats
            </h3>
            
            <div className="space-y-3">
              {/* GitHub Stats Card */}
              <div className="relative overflow-hidden rounded-xl border border-gray-800/60 hover:border-purple-500/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 opacity-70"></div>
                <div className="relative w-full flex items-center justify-center">
                  <img
                    src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&hide_border=true&theme=midnight-purple&bg_color=0D1117&title_color=A78BFA&icon_color=9F7AEA&text_color=FFFFFF&include_all_commits=true&hide=issues&count_private=true&hide_rank=true`}
                    alt="Github stats"
                    className="object-contain max-w-full h-auto rounded-lg w-full"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML += "<div class='p-3 text-gray-400 text-center text-xs'>Unable to load GitHub stats</div>";
                    }}
                  />
                </div>
              </div>
              
              {/* GitHub Streak Stats */}
              <div className="relative overflow-hidden rounded-xl border border-gray-800/60 hover:border-purple-500/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 opacity-70"></div>
                <div className="relative w-full flex items-center justify-center">
                  <img
                    src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=highcontrast&hide_border=true&background=0D1117&ring=A78BFA&fire=9F7AEA&currStreakLabel=A78BFA`}
                    alt="Github streak stats"
                    className="object-contain max-w-full h-auto rounded-lg w-full"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML += "<div class='p-3 text-gray-400 text-center text-xs'>Unable to load GitHub streak stats</div>";
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* LeetCode Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="backdrop-blur-lg bg-[#0D1117]/80 p-5 rounded-2xl border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 shadow-lg group"
          >
            <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className="mr-2 text-yellow-500 group-hover:text-yellow-400 transition-colors">
                <path fill="currentColor" d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.661 1.837-.661s1.357.195 1.823.66l2.697 2.606c.514.515 1.111.759 1.823.759.712 0 1.309-.245 1.824-.76.466-.467.702-1.086.702-1.823s-.236-1.357-.703-1.824l-2.696-2.607C15.287 3.21 13.576 2.5 11.753 2.5s-3.535.71-4.865 2.108l-4.319 4.38C1.5 10.02.5 11.934.5 14.02s1 3.986 2.069 5.019l4.319 4.38c1.33 1.398 3.041 2.108 4.865 2.108s3.534-.71 4.865-2.107l2.697-2.608c1.356-1.368 1.356-3.579 0-4.946-.514-.514-1.111-.758-1.823-.758-.713 0-1.31.245-1.824.759z" />
              </svg>
              LeetCode Stats
            </h3>
            
            <div className="space-y-3">
              {/* LeetCode Stats Card */}
              <div className="relative overflow-hidden rounded-xl border border-gray-800/60 hover:border-purple-500/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 opacity-70"></div>
                <div className="relative w-full flex items-center justify-center">
                  <img
                    src={`https://leetcard.jacoblin.cool/${leetcodeUsername}?theme=dark&font=Nunito&ext=heatmap&animation=false&border=0`}
                    alt="LeetCode stats"
                    className="object-contain max-w-full h-auto rounded-lg w-full"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML += "<div class='p-3 text-gray-400 text-center text-xs'>Unable to load LeetCode stats</div>";
                    }}
                  />
                </div>
              </div>
              
              <div className="text-gray-400 text-xs px-1">
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex-1 flex justify-between items-center">
                    <span>Problem solving</span>
                    <div className="h-1.5 w-24 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <span>Algorithm skills</span>
                    <div className="h-1.5 w-24 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CodingStats;