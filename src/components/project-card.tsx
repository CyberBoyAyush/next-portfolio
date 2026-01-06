'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Github, Globe2, ChevronRight, Server, Calendar, Bot, Database, X, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
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
import { useThemeSafe } from './theme-provider';

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

const getTechIcon = (tech: string) => {
  const techLower = tech.toLowerCase();
  const iconSize = 14;
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === 'light';

  useEffect(() => {
    setMounted(true);

    if (isDialogOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDialogOpen]);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsDialogOpen(false);
  };

  return (
    <>
      <div
        onClick={handleOpenDialog}
        className="group relative overflow-hidden flex flex-col h-full hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      >
        {/* Background with theme support */}
        <div className={`absolute inset-0 bg-gradient-to-br ${isLight ? 'from-white via-gray-50 to-white' : 'from-gray-900 via-gray-800 to-gray-900'}`} />

        {/* Subtle colored accent on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        {/* Animated border gradient */}
        <div className={`absolute inset-0 p-[1px] bg-gradient-to-br transition-all duration-300 ${isLight ? 'from-gray-200 via-gray-300 to-gray-200 group-hover:from-blue-400/50 group-hover:via-purple-400/50 group-hover:to-pink-400/50' : 'from-gray-700 via-gray-600 to-gray-700 group-hover:from-blue-500/50 group-hover:via-purple-500/50 group-hover:to-pink-500/50'}`}>
          <div className={`h-full w-full ${isLight ? 'bg-white' : 'bg-gray-900'}`} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full p-6">
          {/* Featured Badge */}
          {showFeaturedBadge && project.featured && (
            <div className="absolute top-4 right-4 z-20">
              <div className={`relative flex items-center gap-1.5 px-3 py-1 backdrop-blur-md border ${isLight ? 'bg-blue-100/90 border-blue-300/50 shadow-[0_0_15px_-3px_rgba(59,130,246,0.2)]' : 'bg-blue-500/20 border-blue-400/30 shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]'}`}>
                <Sparkles className={`w-3 h-3 fill-current/20 animate-pulse ${isLight ? 'text-blue-600' : 'text-blue-300 fill-blue-300/20'}`} />
                <span className={`text-[10px] font-bold tracking-wider uppercase ${isLight ? 'text-blue-700' : 'text-blue-100'}`}>Featured</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
              </div>
            </div>
          )}

          {/* Image Container */}
          <div className={`relative w-full aspect-[16/9] overflow-hidden backdrop-blur-sm border mb-4 transition-colors ${isLight ? 'bg-gray-100/50 border-gray-200 group-hover:border-gray-300' : 'bg-gray-800/50 border-gray-700/50 group-hover:border-gray-600/50'}`}>
            <Image
              src={project.image}
              alt={`${project.title} - ${project.description}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
{!isLight && <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />}
          </div>

          {/* Text Content */}
          <div className="flex flex-col flex-1">
            {/* Title and Links */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className={`text-xl font-bold leading-tight flex-1 transition-colors ${isLight ? 'text-gray-900 group-hover:text-blue-600' : 'text-white group-hover:text-blue-300'}`}>
                {project.title}
              </h3>
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 border transition-all ${isLight ? 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 border-gray-200 hover:border-gray-300' : 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white border-gray-700 hover:border-gray-600'}`}
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
                    className={`p-2 border transition-all ${isLight ? 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 border-gray-200 hover:border-gray-300' : 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white border-gray-700 hover:border-gray-600'}`}
                    aria-label="Source code"
                  >
                    <Github size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
              {project.description}
            </p>

            {/* Technologies Section */}
            <div className="mt-auto">
              <div className={`text-xs font-semibold mb-2 uppercase tracking-wide ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
                Technologies
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.slice(0, 6).map((tag, idx) => {
                  const icon = getTechIcon(tag);
                  return (
                    <span
                      key={idx}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 backdrop-blur-sm text-xs font-medium border transition-colors ${isLight ? 'bg-gray-100/80 text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-200/80' : 'bg-gray-800/80 text-gray-300 border-gray-700/50 hover:border-gray-600 hover:bg-gray-800'}`}
                    >
                      {icon}
                      {tag}
                    </span>
                  );
                })}
              </div>

              {/* Status Indicator & Action Button */}
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t ${isLight ? 'border-gray-200' : 'border-gray-800'}`}>
                <div className={`flex items-center gap-2 text-xs ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                  <div className="w-2 h-2 bg-green-400" />
                  <span className="font-medium">All Systems Operational</span>
                </div>

                <button
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium border transition-all group/btn ${isLight ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200 hover:border-gray-300' : 'bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/20'}`}
                >
                  <span>View Details</span>
                  <ChevronRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Dialog Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {isDialogOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseDialog}
                className={`absolute inset-0 backdrop-blur-md ${isLight ? 'bg-black/40' : 'bg-black/60'}`}
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className={`relative w-full max-w-lg border shadow-2xl overflow-hidden z-10 ${isLight ? 'bg-white border-gray-200' : 'bg-[#0D1117] border-gray-800'}`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseDialog}
                  className={`absolute top-3 right-3 p-1.5 transition-colors z-20 ${isLight ? 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900' : 'bg-black/20 hover:bg-white/10 text-gray-400 hover:text-white'}`}
                >
                  <X size={18} />
                </button>

                {/* Modal Content */}
                <div className="flex flex-col">
                  {/* Image Header */}
                  <div className={`relative w-full aspect-video ${isLight ? 'bg-gray-100' : 'bg-gray-900'}`}>
                    <Image
                      src={project.image}
                      alt={`${project.title} project screenshot`}
                      fill
                      className="object-cover"
                    />
                    {!isLight && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-[10px] font-medium px-2 py-0.5 backdrop-blur-sm text-gray-300 bg-white/10">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    {/* Title and tags for light mode - below image */}
                    {isLight && (
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-2 text-gray-900">{project.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] font-medium px-2 py-0.5 text-gray-700 bg-gray-100 border border-gray-200">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <p className={`text-sm leading-relaxed mb-6 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                      {project.description}
                    </p>

                    <div className="grid gap-2.5">
                      <Link
                        href={`/projects/${project.slug}`}
                        onClick={() => setIsDialogOpen(false)}
                        className={`flex items-center justify-center gap-2 w-full py-2.5 text-sm font-bold transition-colors ${isLight ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-200'}`}
                      >
                        Explore Case Study
                        <ChevronRight size={16} />
                      </Link>

                      <div className="grid grid-cols-2 gap-2.5">
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-center gap-2 py-2 text-xs font-medium border transition-all ${isLight ? 'bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-200' : 'bg-[#161B22] text-white border-gray-700 hover:border-gray-600 hover:bg-[#1C2128]'}`}
                          >
                            <Globe2 size={14} />
                            Live Demo
                          </a>
                        )}
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-center gap-2 py-2 text-xs font-medium border transition-all ${isLight ? 'bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-200' : 'bg-[#161B22] text-white border-gray-700 hover:border-gray-600 hover:bg-[#1C2128]'}`}
                          >
                            <Github size={14} />
                            Source Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </>
  );
};

export default ProjectCard;
