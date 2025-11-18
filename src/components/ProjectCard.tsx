'use client';

import Link from 'next/link';
import { Github, Globe2, ChevronRight, Server, Calendar, Bot, Database } from 'lucide-react';
import { 
  SiNextdotjs, 
  SiPrisma, 
  SiPostgresql, 
  SiTailwindcss, 
  SiReact, 
  SiTypescript, 
  SiAppwrite, 
  SiVercel, 
  SiJavascript, 
  SiOpenai, 
  SiAmazon, 
  SiGooglegemini, 
  SiGoogle, 
  SiMeta,
  SiGooglechrome
} from 'react-icons/si';
import Image from 'next/image';
import { OpenRouter, Groq as GroqIcon } from '@lobehub/icons';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
  color: string;
  demoLink?: string;
  githubLink?: string;
  featured?: boolean;
  isHackathonProject?: boolean;
  slug: string;
  videoUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isInView: boolean;
  showFeaturedBadge?: boolean;
  variant?: 'default' | 'compact';
}

// Tech icon mapping
const getTechIcon = (tech: string) => {
  const techLower = tech.toLowerCase();
  const iconSize = 14; // 3.5 * 4 = 14px (w-3.5 h-3.5 in Tailwind)
  const iconClass = "w-3.5 h-3.5";
  
  if (techLower.includes('next')) return <SiNextdotjs className={iconClass} />;
  if (techLower.includes('prisma')) return <SiPrisma className={iconClass} />;
  if (techLower.includes('postgres')) return <SiPostgresql className={iconClass} />;
  if (techLower.includes('tailwind')) return <SiTailwindcss className={iconClass} />;
  if (techLower.includes('react')) return <SiReact className={iconClass} />;
  if (techLower.includes('typescript')) return <SiTypescript className={iconClass} />;
  if (techLower.includes('appwrite')) return <SiAppwrite className={iconClass} />;
  if (techLower.includes('vercel')) return <SiVercel className={iconClass} />;
  if (techLower.includes('javascript')) return <SiJavascript className={iconClass} />;
  if (techLower.includes('openai')) return <SiOpenai className={iconClass} />;
  if (techLower.includes('aws')) return <SiAmazon className={iconClass} />;
  if (techLower.includes('vps') || techLower.includes('server')) return <Server className={iconClass} />;
  if (techLower.includes('gemini')) return <SiGooglegemini className={iconClass} />;
  if (techLower.includes('convex')) return <Database className={iconClass} />;
  if (techLower.includes('google') && techLower.includes('calendar')) return <Calendar className={iconClass} />;
  if (techLower.includes('google')) return <SiGoogle className={iconClass} />;
  if (techLower.includes('openrouter')) return <OpenRouter size={iconSize} />;
  if (techLower.includes('groq')) return <GroqIcon size={iconSize} />;
  if (techLower.includes('llama')) return <SiMeta className={iconClass} />;
  if (techLower.includes('browser') || techLower.includes('chrome')) return <SiGooglechrome className={iconClass} />;
  if (techLower.includes('clerk')) return <Bot className={iconClass} />;
  if (techLower.includes('realtime')) return <Bot className={iconClass} />;
  if (techLower.includes('recharts') || techLower.includes('chart')) return <Bot className={iconClass} />;
  
  return null;
};

const ProjectCard = ({ 
  project, 
  index, 
  isInView, 
  showFeaturedBadge = false,
  variant = 'default'
}: ProjectCardProps) => {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden flex flex-col h-full hover:-translate-y-1 transition-all duration-300"
    >
      {/* Dark themed background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      
      {/* Subtle colored accent on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 group-hover:from-blue-500/50 group-hover:via-purple-500/50 group-hover:to-pink-500/50 transition-all duration-300">
        <div className="h-full w-full rounded-2xl bg-gray-900" />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full p-6">
        {/* Featured Badge */}
        {showFeaturedBadge && project.featured && (
          <div className="absolute top-6 right-6 px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md text-blue-300 text-xs font-semibold rounded-full border border-blue-500/30">
            Featured
          </div>
        )}
        
        {/* Image Container */}
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-4 group-hover:border-gray-600/50 transition-colors">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
        </div>
        
        {/* Text Content */}
        <div className="flex flex-col flex-1">
          {/* Title and Links */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-xl font-bold text-white leading-tight flex-1 group-hover:text-blue-300 transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-2">
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600 transition-all"
                  aria-label="Live demo"
                >
                  <Globe2 size={16} />
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600 transition-all"
                  aria-label="Source code"
                >
                  <Github size={16} />
                </a>
              )}
            </div>
          </div>
          
          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>
          
          {/* Technologies Section */}
          <div className="mt-auto">
            <div className="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wide">
              Technologies
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.slice(0, 6).map((tag, idx) => {
                const icon = getTechIcon(tag);
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-800/80 backdrop-blur-sm text-gray-300 text-xs font-medium rounded-md border border-gray-700/50 hover:border-gray-600 hover:bg-gray-800 transition-colors"
                  >
                    {icon}
                    {tag}
                  </span>
                );
              })}
            </div>
            
            {/* Status Indicator */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-800">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="font-medium">All Systems Operational</span>
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-blue-400 transition-colors group/link"
              >
                <span>View Details</span>
                <ChevronRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
