'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getProjectBySlug } from '@/data/projects';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar, Clock, AlertCircle } from 'lucide-react';
import { 
  SiNextdotjs, SiPrisma, SiPostgresql, SiTailwindcss, SiReact, 
  SiTypescript, SiAppwrite, SiVercel, SiJavascript, SiOpenai, 
  SiAmazon, SiGooglegemini, SiGoogle, SiMeta 
} from 'react-icons/si';
import { Server, Chrome, Calendar as CalendarIcon, Bot, Database, Network } from 'lucide-react';
import { OpenRouter, Groq as GroqIcon } from '@lobehub/icons';

// Tech icon mapping (same as ProjectCard)
const getTechIcon = (tech: string) => {
  const techLower = tech.toLowerCase();
  const iconSize = 16; // Responsive size for mobile
  const iconClass = "w-4 h-4 sm:w-5 sm:h-5";
  
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
  if (techLower.includes('google') && techLower.includes('calendar')) return <CalendarIcon className={iconClass} />;
  if (techLower.includes('google')) return <SiGoogle className={iconClass} />;
  if (techLower.includes('openrouter')) return <OpenRouter size={iconSize} />;
  if (techLower.includes('groq')) return <GroqIcon size={iconSize} />;
  if (techLower.includes('llama')) return <SiMeta className={iconClass} />;
  if (techLower.includes('browser') || techLower.includes('chrome')) return <Chrome className={iconClass} />;
  if (techLower.includes('clerk')) return <Bot className={iconClass} />;
  if (techLower.includes('realtime')) return <Bot className={iconClass} />;
  if (techLower.includes('recharts') || techLower.includes('chart')) return <Bot className={iconClass} />;
  
  return null;
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <button
            onClick={() => router.push('/projects')}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1117] pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[length:40px_40px] [background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]" />

      <div className="container mx-auto px-4 max-w-5xl py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/projects')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </motion.button>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{project.title}</h1>
              <p className="text-xl text-gray-400">{project.description}</p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{project.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{project.duration}</span>
            </div>
            {project.isHackathonProject && (
              <div className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold">
                Hackathon Project
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-white text-black font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-gray-100"
              >
                <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                Live Demo
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#0D1117] text-white font-semibold rounded-2xl hover:bg-gray-900 transition-all duration-200 hover:scale-[1.02] border-2 border-gray-800 hover:border-gray-700 shadow-lg hover:shadow-2xl"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                Source Code
              </a>
            )}
          </div>
        </motion.div>

        {/* Project Media - Video or Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-12 border border-gray-800 bg-gray-900"
        >
          {project.videoUrl ? (
            <iframe
              src={project.videoUrl}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          )}
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* About Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">About the Project</h2>
              <p className="text-gray-300 leading-relaxed">
                {project.detailedDescription}
              </p>
            </motion.section>

            {/* Challenges Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-orange-400" />
                Challenges Faced
              </h2>
              <div className="space-y-3">
                {project.challenges.map((challenge, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm font-semibold mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-300">{challenge}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-gray-900/80 to-gray-900/50 backdrop-blur-sm border border-gray-800/80 rounded-2xl p-4 sm:p-6 shadow-xl"
            >
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-5 flex items-center gap-2">
                <div className="w-1.5 h-5 sm:h-6 bg-blue-500 rounded-full" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tech, index) => {
                  const icon = getTechIcon(tech);
                  return (
                    <div
                      key={index}
                      className="group inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2.5 bg-gray-800/60 text-gray-200 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl border border-gray-700/60 hover:border-gray-600 hover:bg-gray-800 transition-all duration-200 hover:scale-[1.02] shadow-md hover:shadow-lg"
                    >
                      <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                        {icon}
                      </div>
                      <span className="whitespace-nowrap">{tech}</span>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* Project Stats */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-gray-900/80 to-gray-900/50 backdrop-blur-sm border border-gray-800/80 rounded-2xl p-4 sm:p-6 shadow-xl"
            >
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-5 flex items-center gap-2">
                <div className="w-1.5 h-5 sm:h-6 bg-purple-500 rounded-full" />
                Project Info
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center p-2.5 sm:p-3 bg-gray-800/40 rounded-lg border border-gray-700/40">
                  <span className="text-gray-400 font-medium text-xs sm:text-sm">Year</span>
                  <span className="text-white font-semibold text-sm sm:text-base">{project.year}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 sm:p-3 bg-gray-800/40 rounded-lg border border-gray-700/40">
                  <span className="text-gray-400 font-medium text-xs sm:text-sm">Duration</span>
                  <span className="text-white font-semibold text-sm sm:text-base">{project.duration}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 sm:p-3 bg-gray-800/40 rounded-lg border border-gray-700/40">
                  <span className="text-gray-400 font-medium text-xs sm:text-sm">Status</span>
                  <span className="flex items-center gap-2 text-green-400 font-semibold text-sm sm:text-base">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-400 animate-pulse" />
                    Live
                  </span>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}
