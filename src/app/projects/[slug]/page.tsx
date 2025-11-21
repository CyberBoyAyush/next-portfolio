'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectBySlug, projects } from '@/data/projects'; // Import projects for navigation
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar, Clock, ChevronRight, ArrowRight, CheckCircle2, Layers, Trophy } from 'lucide-react';
import {
  SiNextdotjs, SiPrisma, SiPostgresql, SiTailwindcss, SiReact,
  SiTypescript, SiAppwrite, SiVercel, SiJavascript, SiOpenai,
  SiAmazon, SiGooglegemini, SiGoogle, SiMeta, SiGooglechrome
} from 'react-icons/si';
import { Server, Chrome, Calendar as CalendarIcon, Bot, Database } from 'lucide-react';
import { OpenRouter, Groq as GroqIcon } from '@lobehub/icons';
import { useRef } from 'react';

// Tech icon mapping
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

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="text-center relative z-10">
          <div className="w-20 h-20 bg-red-500/10 flex items-center justify-center mx-auto mb-6 border border-red-500/20">
            <Trophy className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-8">The project you are looking for doesn't exist or has been moved.</p>
          <button
            onClick={() => router.push('/projects')}
            className="px-6 py-3 bg-white text-black font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  // Find next and previous projects
  const currentIndex = projects.findIndex(p => p.slug === slug);
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;

  return (
    <div className="min-h-screen bg-[#0D1117] pb-20 relative overflow-x-hidden" ref={containerRef}>
      {/* Dynamic Background Ambient Glow */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-[120%] h-[600px] bg-gradient-to-b ${project.color} opacity-10 blur-[120px] -z-10 pointer-events-none`} />

      {/* Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] -z-10" />

      <div className="container mx-auto px-4 md:px-6 pt-24 md:pt-32 max-w-7xl">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12 flex justify-between items-center"
        >
          <button
            onClick={() => router.push('/projects')}
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-4 py-2 hover:bg-white/5 border border-transparent hover:border-white/10"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">All Projects</span>
          </button>

          <div className="flex gap-2">
            {prevProject && (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="w-10 h-10 flex items-center justify-center border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                title={`Previous: ${prevProject.title}`}
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
            )}
            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="w-10 h-10 flex items-center justify-center border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                title={`Next: ${nextProject.title}`}
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </motion.div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap gap-3 mb-6">
              {project.isHackathonProject && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 text-orange-400 text-xs font-medium border border-orange-500/20">
                  <Trophy className="w-3 h-3" />
                  Hackathon Winner
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
                <Calendar className="w-3 h-3" />
                {project.year}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/20">
                <Clock className="w-3 h-3" />
                {project.duration}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-base md:text-xl text-gray-400 leading-relaxed mb-8 max-w-xl">
              {project.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white text-black font-bold overflow-hidden hover:scale-[1.02] transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] text-sm md:text-base"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
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
                  className="group w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-[#161B22] text-white font-bold border border-gray-700/50 hover:border-gray-600 hover:bg-[#1C2128] transition-all hover:scale-[1.02] text-sm md:text-base"
                >
                  <Github className="w-4 h-4 md:w-5 md:h-5" />
                  Source Code
                </a>
              )}
            </div>
          </motion.div>

          {/* Hero Media - Browser Window Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Glow behind image */}
            <div className={`absolute -inset-4 bg-gradient-to-r ${project.color} opacity-20 blur-2xl -z-10`} />

            <div className="bg-[#1C1C1C] border border-gray-800 shadow-2xl overflow-hidden">
              {/* Browser Header */}
              <div className="h-10 bg-[#2A2A2A] flex items-center px-4 gap-2 border-b border-gray-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-6 bg-[#1C1C1C] flex items-center justify-center text-[10px] text-gray-500 font-mono">
                    {project.demoLink ? new URL(project.demoLink).hostname : 'localhost:3000'}
                  </div>
                </div>
              </div>

              {/* Media Content */}
              <div className="relative aspect-[16/9] w-full group cursor-pointer">
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
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 800px"
                    priority
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">

          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Detailed Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className={`w-1.5 h-8 bg-gradient-to-b ${project.color}`} />
                Project Overview
              </h2>
              <div className="prose prose-invert prose-lg max-w-none text-gray-300/90 leading-relaxed">
                {project.detailedDescription.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </motion.section>

            {/* Challenges Grid */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className={`w-1.5 h-8 bg-gradient-to-b ${project.color}`} />
                Technical Challenges
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.challenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="p-6 bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group"
                  >
                    <div className="mb-4 w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black border border-gray-700 flex items-center justify-center text-gray-300 group-hover:text-white group-hover:border-gray-500 transition-colors">
                      <span className="font-mono text-sm">{index + 1}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {challenge}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              {/* Tech Stack Card */}
              <div className="bg-[#161B22]/80 backdrop-blur-xl border border-white/10 p-8 shadow-xl mb-8">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-400" />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all cursor-default group"
                    >
                      <span className="text-gray-400 group-hover:text-white transition-colors">
                        {getTechIcon(tech)}
                      </span>
                      <span className="text-sm text-gray-300 font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Status Card */}
              <div className="bg-gradient-to-br from-[#161B22]/80 to-[#0D1117]/80 backdrop-blur-xl border border-white/10 p-8 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  Status
                </h3>
                <div className="space-y-6">
                  <div className="relative pl-6 border-l border-white/10">
                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ring-[#0D1117]" />
                    <p className="text-xs text-gray-500 font-mono uppercase mb-1">Current Status</p>
                    <p className="text-white font-medium">Completed & Live</p>
                  </div>
                  <div className="relative pl-6 border-l border-white/10">
                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-gray-600 ring-4 ring-[#0D1117]" />
                    <p className="text-xs text-gray-500 font-mono uppercase mb-1">Last Update</p>
                    <p className="text-gray-300 font-medium">{project.year}</p>
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Development Time</span>
                      <span className="text-white font-mono">{project.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Next Project CTA */}
        {nextProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 border-t border-white/10 pt-16"
          >
            <div className="text-center mb-12">
              <p className="text-gray-400 mb-2">Continue Exploring</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Next Project</h2>
            </div>

            <Link href={`/projects/${nextProject.slug}`} className="block group">
              <div className="relative overflow-hidden aspect-[21/9] md:aspect-[3/1] border border-white/10 bg-[#161B22]">
                {/* Background Image with Overlay */}
                <Image
                  src={nextProject.image}
                  alt={nextProject.title}
                  fill
                  className="object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/80 to-transparent" />

                {/* Content */}
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
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
