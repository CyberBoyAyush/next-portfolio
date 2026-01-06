'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from './section-heading';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useThemeSafe } from './theme-provider';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const githubUsername = 'cyberboyayush';
const leetcodeUsername = 'cyberboyayush';

const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto auto-rows-[minmax(180px,auto)]",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  isLight,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  isLight?: boolean;
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-2xl transition duration-200 p-4 backdrop-blur-sm justify-between flex flex-col space-y-4 relative overflow-hidden",
        isLight 
          ? "bg-white border border-gray-200 hover:border-blue-400/50 hover:shadow-blue-200/30" 
          : "bg-gray-900/40 border border-white/5 hover:border-blue-500/50 hover:shadow-blue-900/20",
        className
      )}
    >
       <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
       
       {/* Subtle Shine Effect */}
       <div className={`absolute inset-0 -translate-x-full group-hover/bento:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent to-transparent z-10 pointer-events-none ${
         isLight ? 'via-black/5' : 'via-white/5'
       }`} />
      
      {(icon || title || description) && (
        <div className="group-hover/bento:translate-x-2 transition duration-200">
          {icon && (
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              {icon}
            </motion.div>
          )}
          <div className={`font-sans font-bold mb-2 mt-2 ${isLight ? 'text-gray-800' : 'text-neutral-200'}`}>
            {title}
          </div>
          <div className={`font-sans font-normal text-xs ${isLight ? 'text-gray-600' : 'text-neutral-400'}`}>
            {description}
          </div>
        </div>
      )}
      <div className="w-full h-full flex items-center justify-center relative z-0">
        {header}
      </div>
    </motion.div>
  );
};

const StatCard = ({ src, alt, className, isLight }: { src: string; alt: string; className?: string; isLight?: boolean }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (isError) {
    return (
      <div className={`flex items-center justify-center w-full h-full min-h-[150px] rounded-lg border ${
        isLight 
          ? 'bg-gray-100 border-gray-200' 
          : 'bg-neutral-900/50 border-neutral-800'
      }`}>
        <div className={`p-3 text-center text-xs ${isLight ? 'text-gray-500' : 'text-neutral-500'}`}>
          Unable to load {alt}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg", className)}>
      {isLoading && (
        <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-10 ${
          isLight ? 'bg-gray-100/20' : 'bg-neutral-900/20'
        }`}>
          <div className="w-6 h-6 border-2 border-primary/20 border-t-primary animate-spin rounded-full" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={800}
        height={400}
        className={cn(
          "object-contain w-full h-auto transition-all duration-500 group-hover/bento:scale-[1.03] group-hover/bento:drop-shadow-2xl",
          isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsError(true)}
        unoptimized
      />
    </div>
  );
};

const CodingStats = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === 'light';

  // Theme colors for dark mode
  const darkColors = {
    bg: '00000000',
    title: '8B5CF6',
    text: 'ededed',
    icon: '8B5CF6',
    ring: '8B5CF6',
    fire: '8B5CF6',
  };

  // Theme colors for light mode
  const lightColors = {
    bg: '00000000',
    title: '6366f1',
    text: '374151',
    icon: '6366f1',
    ring: '6366f1',
    fire: '6366f1',
  };

  const colors = isLight ? lightColors : darkColors;

  const items = [
    {
      header: (
        <StatCard
          src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&hide_border=true&bg_color=${colors.bg}&title_color=${colors.title}&icon_color=${colors.icon}&text_color=${colors.text}&include_all_commits=true&count_private=true&hide=issues`}
          alt="GitHub stats"
          isLight={isLight}
        />
      ),
      className: "md:col-span-1",
    },
    {
      header: (
        <StatCard
          src={`https://leetcard.jacoblin.cool/${leetcodeUsername}?theme=${isLight ? 'light' : 'dark'}&font=Inter&ext=heatmap&animation=false&border=0`}
          alt="LeetCode stats"
          className="h-full w-full"
          isLight={isLight}
        />
      ),
      className: "md:col-span-2 md:row-span-2",
    },
    {
      header: (
        <StatCard
          src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=transparent&hide_border=true&background=${colors.bg}&ring=${colors.ring}&fire=${colors.fire}&currStreakLabel=${colors.text}&currStreakNum=${colors.text}&sideNums=${colors.text}&sideLabels=${colors.text}&dates=${isLight ? '6b7280' : 'a1a1aa'}`}
          alt="GitHub streak stats"
          isLight={isLight}
        />
      ),
      className: "md:col-span-1",
    },
  ];

  return (
    <section id="coding-stats" className="py-12 relative overflow-hidden">
      <div className={`absolute inset-0 -z-10 transition-colors duration-300 ${isLight ? 'bg-[#fafafa]' : 'bg-[#0D1117]'}`} />
      <div className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${
        isLight 
          ? '[background-image:linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)]'
          : '[background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]'
      }`} />
      <div className="container mx-auto px-4">
        <div ref={statsRef}>
          <SectionHeading
            subtitle="My Progress"
            title="Coding Stats"
            description="A snapshot of my coding journey across different platforms."
            className="mb-12"
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.25 }}
          >
            <BentoGrid className="max-w-5xl mx-auto">
              {items.map((item, i) => (
                <BentoGridItem
                  key={i}
                  header={item.header}
                  className={item.className}
                  isLight={isLight}
                />
              ))}
            </BentoGrid>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CodingStats;