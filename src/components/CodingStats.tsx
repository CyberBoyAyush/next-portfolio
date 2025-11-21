'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from './SectionHeading';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-gray-900/40 backdrop-blur-sm border border-gray-800/60 justify-between flex flex-col space-y-4 hover:border-blue-500/30 relative overflow-hidden",
        className
      )}
    >
       <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
      
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
          <div className="font-sans font-bold text-neutral-200 mb-2 mt-2">
            {title}
          </div>
          <div className="font-sans font-normal text-neutral-400 text-xs dark:text-neutral-300">
            {description}
          </div>
        </div>
      )}
      <div className="w-full h-full flex items-center justify-center">
        {header}
      </div>
    </motion.div>
  );
};

const StatCard = ({ src, alt, className }: { src: string; alt: string, className?: string }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (isError) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[150px] bg-neutral-900/50 rounded-lg border border-neutral-800">
        <div className="p-3 text-neutral-500 text-center text-xs">
          Unable to load {alt}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/20 backdrop-blur-sm z-10">
          <div className="w-6 h-6 border-2 border-primary/20 border-t-primary animate-spin rounded-full" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={800}
        height={400}
        className={cn(
          "object-contain w-full h-auto transition-all duration-500 hover:scale-[1.02]",
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

  // Theme colors
  const colors = {
    bg: '00000000', // Transparent
    title: '8B5CF6', // Primary Purple
    text: 'ededed',
    icon: '8B5CF6',
    border: '27272a',
    ring: '8B5CF6',
    fire: '8B5CF6',
  };

  const items = [
    {
      header: (
        <StatCard
          src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&hide_border=true&bg_color=${colors.bg}&title_color=${colors.title}&icon_color=${colors.icon}&text_color=${colors.text}&include_all_commits=true&count_private=true&hide=issues`}
          alt="GitHub stats"
        />
      ),
      className: "md:col-span-1",
      title: undefined,
      description: undefined,
      icon: undefined,
    },
    {
      header: (
        <StatCard
          src={`https://leetcard.jacoblin.cool/${leetcodeUsername}?theme=dark&font=Inter&ext=heatmap&animation=false&border=0`}
          alt="LeetCode stats"
          className="h-full w-full"
        />
      ),
      className: "md:col-span-2 md:row-span-2",
      title: undefined,
      description: undefined,
      icon: undefined,
    },
    {
      header: (
        <StatCard
          src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=transparent&hide_border=true&background=${colors.bg}&ring=${colors.ring}&fire=${colors.fire}&currStreakLabel=${colors.text}&currStreakNum=${colors.text}&sideNums=${colors.text}&sideLabels=${colors.text}&dates=a1a1aa`}
          alt="GitHub streak stats"
        />
      ),
      className: "md:col-span-1",
      title: undefined,
      description: undefined,
      icon: undefined,
    },
  ];

  return (
    <section id="coding-stats" className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[#0D1117]" />
      <div className="absolute inset-0 -z-10 bg-[length:40px_40px] [background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]" />
      <div className="container mx-auto px-4">
        <div ref={statsRef}>
          <SectionHeading
            subtitle="My Progress"
            title="Coding Stats"
            description="A snapshot of my coding journey across different platforms."
            className="mb-12"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <BentoGrid className="max-w-5xl mx-auto">
              {items.map((item, i) => (
                <BentoGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  icon={item.icon}
                  className={item.className}
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