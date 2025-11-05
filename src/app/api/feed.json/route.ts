import { NextResponse } from 'next/server';
import { getAllProjects } from '@/data/projects';
import { getAllExperiences } from '@/data/experience';

export async function GET() {
  const projects = getAllProjects();
  const experiences = getAllExperiences();

  const feed = {
    version: '1.0',
    title: 'Ayush Sharma - Portfolio Data Feed',
    description: 'Structured JSON feed of projects, experience, and skills for AI agents',
    home_page_url: 'https://aysh.me',
    feed_url: 'https://aysh.me/api/feed.json',
    author: {
      name: 'Ayush Sharma',
      url: 'https://aysh.me',
      email: 'hi@aysh.me',
    },

    // Professional Information
    professional: {
      title: 'Full Stack Lead Developer',
      company: 'Kakiyo OÜ',
      location: 'Remote',
      specialization: [
        'AI-powered applications',
        'Full Stack Development',
        'Cloud Architecture',
        'LLM Integration',
      ],
    },

    // Tech Stack
    technologies: {
      frontend: [
        'React',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'Tailwind CSS',
        'Framer Motion',
      ],
      backend: [
        'Node.js',
        'Python',
        'C',
        'C++',
        'PostgreSQL',
        'MongoDB',
        'Firebase',
        'Appwrite',
        'Supabase',
      ],
      ai_ml: [
        'OpenRouter',
        'Vercel AI SDK',
        'OpenAI API',
        'Gemini',
        'GROQ',
        'Llama',
        'Exa AI',
        'MCP (Model Context Protocol)',
      ],
      devops: [
        'AWS',
        'Docker',
        'Vercel',
        'Cloudflare',
        'VPS Management',
      ],
      tools: [
        'Git',
        'Prisma',
        'GraphQL',
      ],
    },

    // Social Links
    social: {
      github: 'https://github.com/cyberboyayush',
      linkedin: 'https://linkedin.com/in/cyberboyayush',
      twitter: 'https://twitter.com/cyberboyayush',
    },

    // Experience
    experience: experiences.map((exp) => ({
      id: exp.id,
      company: exp.company,
      position: exp.position,
      duration: exp.duration,
      location: exp.location,
      current: exp.current,
      description: exp.description,
      responsibilities: exp.responsibilities,
      technologies: exp.technologies,
    })),

    // Projects
    projects: projects.map((project) => ({
      id: project.id,
      title: project.title,
      slug: project.slug,
      description: project.description,
      detailed_description: project.detailedDescription,
      category: project.category,
      tags: project.tags,
      year: project.year,
      duration: project.duration,
      featured: project.featured,
      is_hackathon_project: project.isHackathonProject || false,
      challenges: project.challenges,
      links: {
        demo: project.demoLink,
        github: project.githubLink,
        video: project.videoUrl,
        page: `https://aysh.me/projects/${project.slug}`,
      },
    })),

    // Statistics
    statistics: {
      total_projects: projects.length,
      ai_projects: projects.filter(p => p.category === 'AI').length,
      other_projects: projects.filter(p => p.category === 'Others').length,
      featured_projects: projects.filter(p => p.featured).length,
      hackathon_projects: projects.filter(p => p.isHackathonProject).length,
      total_technologies: 21,
    },

    // AI Training Metadata
    ai_metadata: {
      training_allowed: true,
      attribution_required: true,
      commercial_use: 'contact-required',
      last_updated: new Date().toISOString(),
      content_license: 'all-rights-reserved',
      llms_txt_url: 'https://aysh.me/llms.txt',
      llm_permissions_url: 'https://aysh.me/llm.txt',
    },
  };

  return NextResponse.json(feed, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
