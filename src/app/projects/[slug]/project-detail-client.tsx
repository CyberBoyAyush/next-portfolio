'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Project, projects } from '@/data/projects';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar, Clock, ArrowRight, CheckCircle2, Layers, Trophy } from 'lucide-react';
import {
  SiNextdotjs, SiPrisma, SiPostgresql, SiTailwindcss, SiReact,
  SiTypescript, SiAppwrite, SiVercel, SiJavascript, SiOpenai,
  SiAmazon, SiGooglegemini, SiGoogle, SiMeta, SiGooglechrome
} from 'react-icons/si';
import { Server, Calendar as CalendarIcon, Bot, Database } from 'lucide-react';
import { OpenRouter, Groq as GroqIcon } from '@lobehub/icons';
import { useRef } from 'react';
import { useThemeSafe } from '@/components/theme-provider';

const getTechIcon = (tech: string) => {
  const techLower = tech.toLowerCase();
  const iconSize = 18;
  const iconClass = "w-5 h-5";

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
  if (techLower.includes('browser') || techLower.includes('chrome')) return <SiGooglechrome className={iconClass} />;
  if (techLower.includes('clerk')) return <Bot className={iconClass} />;
  if (techLower.includes('realtime')) return <Bot className={iconClass} />;
  if (techLower.includes('recharts') || techLower.includes('chart')) return <Bot className={iconClass} />;

  return <Layers className={iconClass} />;
};

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const router = useRouter();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === 'light';

  const currentIndex = projects.findIndex(p => p.slug === project.slug);
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;

  return (
    <div className={`min-h-screen pb-20 relative overflow-x-hidden transition-colors duration-300 ${isLight ? 'bg-[#fafafa]' : 'bg-[#0D1117]'}`} ref={containerRef}>
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-[120%] h-[600px] bg-gradient-to-b ${project.color} blur-[120px] -z-10 pointer-events-none ${isLight ? 'opacity-5' : 'opacity-10'}`} />
      <div className={`fixed inset-0 bg-[size:40px_40px] -z-10 ${
        isLight 
          ? 'bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)]' 
          : 'bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)]'
      }`} />

      <div className="container mx-auto px-4 md:px-6 pt-24 md:pt-32 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12 flex justify-between items-center"
        >
          <button
            onClick={() => router.push('/projects')}
            className={`group flex items-center gap-2 transition-colors px-4 py-2 border border-transparent ${
              isLight 
                ? 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 hover:border-gray-200' 
                : 'text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/10'
            }`}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">All Projects</span>
          </button>

          <div className="flex gap-2">
            {prevProject && (
              <Link
                href={`/projects/${prevProject.slug}`}
                className={`w-10 h-10 flex items-center justify-center border transition-all ${
                  isLight 
                    ? 'border-gray-200 bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200' 
                    : 'border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                title={`Previous: ${prevProject.title}`}
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
            )}
            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className={`w-10 h-10 flex items-center justify-center border transition-all ${
                  isLight 
                    ? 'border-gray-200 bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200' 
                    : 'border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                title={`Next: ${nextProject.title}`}
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap gap-3 mb-6">
              {project.isHackathonProject && (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium border ${
                  isLight ? 'bg-orange-100 text-orange-600 border-orange-200' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                }`}>
                  <Trophy className="w-3 h-3" />
                  Hackathon Winner
                </span>
              )}
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium border ${
                isLight ? 'bg-blue-100 text-blue-600 border-blue-200' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
              }`}>
                <Calendar className="w-3 h-3" />
                {project.year}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium border ${
                isLight ? 'bg-purple-100 text-purple-600 border-purple-200' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
              }`}>
                <Clock className="w-3 h-3" />
                {project.duration}
              </span>
            </div>

            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight ${isLight ? 'text-gray-900' : 'text-white'}`}>
              {project.title}
            </h1>
            <p className={`text-base md:text-xl leading-relaxed mb-8 max-w-xl ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
              {project.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3 md:px-8 md:py-4 font-bold overflow-hidden hover:scale-[1.02] transition-all text-sm md:text-base ${
                    isLight 
                      ? 'bg-gray-900 text-white shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)]' 
                      : 'bg-white text-black shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]'
                  }`}
                >
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isLight ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-gray-100 to-white'
                  }`} />
                  <span className="relative flex items-center gap-2">
                    Live Demo
                    <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  </span>
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3 md:px-8 md:py-4 font-bold border transition-all hover:scale-[1.02] text-sm md:text-base ${
                    isLight 
                      ? 'bg-gray-100 text-gray-900 border-gray-300 hover:border-gray-400 hover:bg-gray-200' 
                      : 'bg-[#161B22] text-white border-gray-700/50 hover:border-gray-600 hover:bg-[#1C2128]'
                  }`}
                >
                  <Github className="w-4 h-4 md:w-5 md:h-5" />
                  Source Code
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className={`absolute -inset-4 bg-gradient-to-r ${project.color} blur-2xl -z-10 ${isLight ? 'opacity-10' : 'opacity-20'}`} />

            <div className={`border shadow-2xl overflow-hidden ${isLight ? 'bg-white border-gray-200' : 'bg-[#1C1C1C] border-gray-800'}`}>
              <div className={`h-10 flex items-center px-4 gap-2 border-b ${isLight ? 'bg-gray-100 border-gray-200' : 'bg-[#2A2A2A] border-gray-800'}`}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex-1 mx-4">
                  <div className={`h-6 flex items-center justify-center text-[10px] font-mono ${isLight ? 'bg-white text-gray-500' : 'bg-[#1C1C1C] text-gray-500'}`}>
                    {project.demoLink ? new URL(project.demoLink).hostname : 'localhost:3000'}
                  </div>
                </div>
              </div>

              <div className="relative aspect-[16/9] w-full group cursor-pointer">
                {project.videoUrl ? (
                  <iframe
                    src={project.videoUrl}
                    title={`${project.title} demo video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <Image
                    src={project.image}
                    alt={`${project.title} - ${project.description}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 800px"
                    priority
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
          <div className="lg:col-span-2 space-y-16">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                <span className={`w-1.5 h-8 bg-gradient-to-b ${project.color}`} />
                Project Overview
              </h2>
              <div className={`prose prose-lg max-w-none leading-relaxed ${isLight ? 'prose-gray text-gray-600' : 'prose-invert text-gray-300/90'}`}>
                {project.detailedDescription.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                <span className={`w-1.5 h-8 bg-gradient-to-b ${project.color}`} />
                Technical Challenges
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.challenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className={`p-6 border transition-all group ${
                      isLight 
                        ? 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                    }`}
                  >
                    <div className={`mb-4 w-10 h-10 rounded-full bg-gradient-to-br border flex items-center justify-center transition-colors ${
                      isLight 
                        ? 'from-gray-200 to-gray-100 border-gray-300 text-gray-600 group-hover:text-gray-900 group-hover:border-gray-400' 
                        : 'from-gray-800 to-black border-gray-700 text-gray-300 group-hover:text-white group-hover:border-gray-500'
                    }`}>
                      <span className="font-mono text-sm">{index + 1}</span>
                    </div>
                    <p className={`leading-relaxed text-sm ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                      {challenge}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <div className={`backdrop-blur-xl border p-8 shadow-xl mb-8 ${
                isLight ? 'bg-white/80 border-gray-200' : 'bg-[#161B22]/80 border-white/10'
              }`}>
                <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  <Layers className={`w-5 h-5 ${isLight ? 'text-blue-600' : 'text-blue-400'}`} />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tech) => (
                    <div
                      key={tech}
                      className={`flex items-center gap-2 px-3 py-2 border transition-all cursor-default group ${
                        isLight 
                          ? 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300' 
                          : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                      }`}
                    >
                      <span className={`transition-colors ${isLight ? 'text-gray-500 group-hover:text-gray-900' : 'text-gray-400 group-hover:text-white'}`}>
                        {getTechIcon(tech)}
                      </span>
                      <span className={`text-sm font-medium ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`backdrop-blur-xl border p-8 shadow-xl ${
                isLight 
                  ? 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200' 
                  : 'bg-gradient-to-br from-[#161B22]/80 to-[#0D1117]/80 border-white/10'
              }`}>
                <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  <CheckCircle2 className={`w-5 h-5 ${isLight ? 'text-green-600' : 'text-green-400'}`} />
                  Status
                </h3>
                <div className="space-y-6">
                  <div className={`relative pl-6 border-l ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
                    <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ${isLight ? 'ring-white' : 'ring-[#0D1117]'}`} />
                    <p className="text-xs text-gray-500 font-mono uppercase mb-1">Current Status</p>
                    <p className={`font-medium ${isLight ? 'text-gray-900' : 'text-white'}`}>Completed & Live</p>
                  </div>
                  <div className={`relative pl-6 border-l ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
                    <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-gray-400 ring-4 ${isLight ? 'ring-white' : 'ring-[#0D1117]'}`} />
                    <p className="text-xs text-gray-500 font-mono uppercase mb-1">Last Update</p>
                    <p className={`font-medium ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{project.year}</p>
                  </div>
                  <div className={`pt-4 border-t ${isLight ? 'border-gray-200' : 'border-white/5'}`}>
                    <div className="flex items-center justify-between text-sm">
                      <span className={isLight ? 'text-gray-500' : 'text-gray-400'}>Development Time</span>
                      <span className={`font-mono ${isLight ? 'text-gray-900' : 'text-white'}`}>{project.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {nextProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mt-32 border-t pt-16 ${isLight ? 'border-gray-200' : 'border-white/10'}`}
          >
            <div className="text-center mb-12">
              <p className={`mb-2 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Continue Exploring</p>
              <h2 className={`text-3xl md:text-4xl font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>Next Project</h2>
            </div>

            <Link href={`/projects/${nextProject.slug}`} className="block group">
              {isLight ? (
                <div className="relative overflow-hidden border border-gray-200 bg-white">
                  <div className="grid md:grid-cols-2">
                    <div className="relative aspect-video md:aspect-auto">
                      <Image
                        src={nextProject.image}
                        alt={`${nextProject.title} - ${nextProject.description}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-8 md:p-12">
                      <span className="text-blue-600 font-mono text-sm mb-3 group-hover:underline">
                        View Case Study →
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {nextProject.title}
                      </h3>
                      <p className="text-gray-500 line-clamp-2 mb-6">
                        {nextProject.description}
                      </p>
                      <div className="w-12 h-12 bg-gray-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative overflow-hidden aspect-[21/9] md:aspect-[3/1] border border-white/10 bg-[#161B22]">
                  <Image
                    src={nextProject.image}
                    alt={`${nextProject.title} - ${nextProject.description}`}
                    fill
                    className="object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/80 to-transparent" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <span className="text-blue-400 font-mono mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      View Case Study
                    </span>
                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-4 transform group-hover:scale-105 transition-transform duration-300">
                      {nextProject.title}
                    </h3>
                    <p className="text-gray-400 max-w-2xl text-center line-clamp-2 group-hover:text-gray-300 transition-colors">
                      {nextProject.description}
                    </p>

                    <div className="mt-8 w-12 h-12 bg-white text-black flex items-center justify-center transform scale-0 group-hover:scale-100 transition-all duration-300 delay-100">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              )}
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
