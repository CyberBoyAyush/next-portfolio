'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, Star, Zap } from 'lucide-react';
import Image from 'next/image';

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
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isInView: boolean;
  showFeaturedBadge?: boolean;
  variant?: 'default' | 'compact';
}

const ProjectCard = ({ 
  project, 
  index, 
  isInView, 
  showFeaturedBadge = false,
  variant = 'default'
}: ProjectCardProps) => {
  const isCompact = variant === 'compact';

  // For compact variant, use vertical layout on all screens
  // For default variant, use vertical on mobile, horizontal on desktop
  const shouldUseVerticalLayout = isCompact || true; // Force vertical for now, can be made responsive

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/40 overflow-hidden hover:border-gray-500/60 transition-all duration-700 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-2 hover:scale-[1.02]"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-600/5 to-gray-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Badges Container - Positioned on opposite sides */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
        {/* Featured Badge - Left side */}
        <div className="flex">
          {showFeaturedBadge && project.featured && (
            <div className="px-3 py-1.5 bg-gradient-to-r from-black/70 to-gray-900/70 backdrop-blur-xl border border-yellow-500/30 text-yellow-100 text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-xl shadow-black/40">
              <Star size={11} className="text-yellow-400 fill-yellow-400" />
              <span>Top Project</span>
            </div>
          )}
        </div>
        
        {/* Hackathon Badge - Right side */}
        <div className="flex">
          {project.isHackathonProject && (
            <div className="px-3 py-1.5 bg-gradient-to-r from-black/70 to-gray-900/70 backdrop-blur-xl border border-orange-500/30 text-orange-100 text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-xl shadow-black/40">
              <Zap size={11} className="text-orange-400 fill-orange-400" />
              <span>Built in 48hrs</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Layout - Always Vertical for Consistency */}
      <div className="flex flex-col w-full">
        {/* Project Image */}
        <div className={`relative ${isCompact ? 'h-48' : 'h-56'} overflow-hidden flex-shrink-0`}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          {/* Dynamic color overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-5 group-hover:opacity-15 transition-opacity duration-700`} />
          {/* Improved gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
          
          {/* Enhanced overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        {/* Project Content */}
        <div className={`${isCompact ? 'p-5' : 'p-6'} flex flex-col space-y-4`}>
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <h3 className={`${isCompact ? 'text-lg' : 'text-xl'} font-bold text-white group-hover:text-gray-50 transition-colors duration-300 leading-tight flex-1`}>
                {project.title}
              </h3>
              <div className="flex items-center text-xs text-gray-400 bg-gray-800/60 px-2 py-1 rounded-lg border border-gray-600/30 backdrop-blur-sm flex-shrink-0">
                <Calendar size={12} className="mr-1.5" />
                {project.year}
              </div>
            </div>

            <p className={`text-gray-300 ${isCompact ? 'text-sm' : 'text-sm'} leading-relaxed group-hover:text-gray-200 transition-colors duration-300 line-clamp-3`}>
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, isCompact ? 4 : 5).map((tech, idx) => (
              <span
                key={tech}
                className={`${isCompact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs'} bg-gray-800/70 text-gray-200 font-medium rounded-lg border border-gray-600/40 hover:bg-gray-700/80 hover:border-gray-500/60 transition-all duration-300 backdrop-blur-sm`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {tech}
              </span>
            ))}
            {project.tags.length > (isCompact ? 4 : 5) && (
              <span className={`${isCompact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs'} bg-gray-800/50 text-gray-400 font-medium rounded-lg border border-gray-600/30`}>
                +{project.tags.length - (isCompact ? 4 : 5)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {project.demoLink && (
              <motion.a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 ${isCompact ? 'py-2.5 px-4 text-sm' : 'py-3 px-5 text-sm'} bg-gradient-to-r from-gray-700/80 to-gray-600/80 hover:from-gray-600 hover:to-gray-500 text-white font-semibold rounded-xl border border-gray-500/30 hover:border-gray-400/60 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm hover:shadow-lg hover:shadow-gray-800/30`}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </motion.a>
            )}
            {project.githubLink && (
              <motion.a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${isCompact ? 'py-2.5 px-4' : 'py-3 px-5'} bg-gray-800/70 hover:bg-gray-700/90 text-gray-300 hover:text-white rounded-xl border border-gray-600/40 hover:border-gray-500/60 transition-all duration-300 flex items-center justify-center backdrop-blur-sm hover:shadow-lg hover:shadow-gray-800/30`}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={18} />
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600/50 via-gray-500/50 to-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default ProjectCard;
