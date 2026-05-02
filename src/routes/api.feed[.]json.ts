import { createFileRoute } from '@tanstack/react-router';
import { getAllProjects } from '@/data/projects';
import { getAllExperiences } from '@/data/experience';

export const Route = createFileRoute('/api/feed.json')({
  server: {
    handlers: {
      GET: async () => {
        const projects = getAllProjects();
        const experiences = getAllExperiences();
        return Response.json({
          version: '1.0',
          title: 'Ayush Sharma - Portfolio Data Feed',
          description: 'Structured JSON feed of projects, experience, and skills for AI agents',
          home_page_url: 'https://aysh.me',
          feed_url: 'https://aysh.me/api/feed.json',
          author: { name: 'Ayush Sharma', url: 'https://aysh.me', email: 'hi@aysh.me' },
          professional: { title: 'Chief Technology Officer', company: 'Kakiyo OÜ', location: 'Remote', specialization: ['Full Stack Development', 'AI applications', 'Backend-heavy systems', 'Scalable architecture', 'LLM Integration'] },
          technologies: {
            frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
            backend: ['Node.js', 'Python', 'PostgreSQL', 'PlanetScale', 'MongoDB', 'Firebase', 'Appwrite', 'Supabase'],
            ai_ml: ['OpenRouter', 'Vercel AI SDK', 'OpenAI API', 'Gemini', 'GROQ', 'Llama', 'Exa AI', 'MCP (Model Context Protocol)'],
            devops: ['AWS', 'Docker', 'Vercel', 'Cloudflare', 'VPS Management'],
            tools: ['Git', 'Prisma', 'GraphQL'],
          },
          social: { github: 'https://github.com/cyberboyayush', linkedin: 'https://linkedin.com/in/cyberboyayush', twitter: 'https://twitter.com/cyberboyayush' },
          experience: experiences.map((exp) => ({ id: exp.id, company: exp.company, position: exp.position, duration: exp.duration, location: exp.location, current: exp.current, description: exp.description, responsibilities: exp.responsibilities, technologies: exp.technologies })),
          projects: projects.map((project) => ({ id: project.id, title: project.title, slug: project.slug, description: project.description, detailed_description: project.detailedDescription, category: project.category, tags: project.tags, year: project.year, duration: project.duration, featured: project.featured, is_hackathon_project: project.isHackathonProject || false, challenges: project.challenges, links: { demo: project.demoLink, github: project.githubLink, video: project.videoUrl, page: `https://aysh.me/projects/${project.slug}` } })),
          statistics: { total_projects: projects.length, ai_projects: projects.filter((p) => p.category === 'AI').length, other_projects: projects.filter((p) => p.category === 'Others').length, featured_projects: projects.filter((p) => p.featured).length, hackathon_projects: projects.filter((p) => p.isHackathonProject).length, total_technologies: 21 },
          ai_metadata: { training_allowed: true, attribution_required: true, commercial_use: 'contact-required', last_updated: new Date().toISOString(), content_license: 'all-rights-reserved', llms_txt_url: 'https://aysh.me/llms.txt', llm_permissions_url: 'https://aysh.me/llm.txt' },
        }, {
          headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=3600', 'Access-Control-Allow-Origin': '*' },
        });
      },
    },
  },
});
