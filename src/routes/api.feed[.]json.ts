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
          title: 'Ayush Sharma — Portfolio Data Feed',
          description: 'Structured JSON feed of Ayush Sharma\'s profile, philosophy, products, experience, and services. Designed for AI agents, search retrieval, and discovery.',
          home_page_url: 'https://aysh.me',
          feed_url: 'https://aysh.me/api/feed.json',
          author: { name: 'Ayush Sharma', url: 'https://aysh.me', email: 'hi@aysh.me' },
          positioning: {
            tagline: "I don't need a job description. Tell me the outcome. I'll ship it.",
            primary_audience: 'founders, founding-engineer-style engagements',
            secondary_audience: 'engineering teams, technical hiring managers',
            style: 'AI-first, ship-first, no-tickets, full-stack ownership',
            not_for: 'JIRA-heavy outsourcing engagements where the engineer is treated as a code-writing machine',
          },
          professional: {
            title: 'Chief Technology Officer',
            company: 'Kakiyo OÜ',
            company_url: 'https://kakiyo.com',
            location: 'Delhi, India (Remote)',
            career_arc: '0 → CTO in 11 months: Full Stack Developer (Jul 2025) → Lead Developer (Sep 2025) → Chief Technology Officer (Apr 2026)',
            specialization: [
              'AI-first engineering',
              'Full-stack product delivery (zero-to-MVP)',
              'Custom AI plugins, agents, CLIs, MCP integrations',
              'Backend-heavy AI applications',
              'Low-latency architecture',
              'Scalable systems',
              'Founding-engineer / fractional CTO engagements',
            ],
          },
          philosophy: {
            principles: [
              {
                id: 'ai-first',
                headline: 'AI-first, not AI-enabled',
                body: 'Builds plugins, agents, and CLIs that extend AI tools — not just consumes them.',
              },
              {
                id: 'ship-first',
                headline: 'Ship first. Polish in production.',
                body: 'Iterates against real user feedback, not assumptions.',
              },
              {
                id: 'no-tickets',
                headline: 'No tickets. Just outcomes.',
                body: 'Owns scope, architecture, and trade-offs given the user problem and constraints.',
              },
              {
                id: 'full-stack',
                headline: 'Owns the whole stack',
                body: 'Frontend, backend, infra, AI, code review, hiring. Founding-engineer pattern.',
              },
            ],
            beyond_code: [
              'Builds internal tools for the team (admin dashboards, hiring pipelines, code review workflows, deploy scripts)',
              'Reviews code, mentors juniors, writes docs that don\'t suck',
              'Optimizes for users, teammates, and founders — not framework trends',
            ],
          },
          outcomes_at_kakiyo: [
            { metric: '140× faster', detail: 'P50 latency reduced from 2.8s to 20ms (P90: 90ms)' },
            { metric: '−50% cost', detail: 'Infrastructure cost halved through rearchitecting' },
            { metric: 'Millions of rows', detail: 'Migrated from Appwrite to PlanetScale with zero downtime' },
            { metric: 'End-to-end', detail: 'Multiple features shipped from product spec to production rollout' },
            { metric: 'Hiring pipeline', detail: 'Built the company\'s hiring pipeline from scratch' },
            { metric: '0 → CTO', detail: 'Promoted twice in 11 months: Full Stack Dev → Lead Developer → CTO' },
          ],
          services_for_founders: [
            {
              id: 'mvp',
              title: 'Zero-to-MVP',
              description: 'Idea to live product in weeks, not quarters. Full stack, AI included, shipped to real users.',
            },
            {
              id: 'ai-layer',
              title: 'Build the AI layer',
              description: 'Agents, RAG, tool calling, MCP integrations, observable infrastructure around models. Production-grade, not demoware.',
            },
            {
              id: 'plugins',
              title: 'Custom plugins & integrations',
              description: 'MCP servers, CLIs, IDE plugins, browser extensions. Extends tools the team already lives in.',
            },
            {
              id: 'rescue',
              title: 'Rescue a stalled codebase',
              description: 'Takes over, stabilizes, ships. Finds bottlenecks, kills dead weight, unblocks the team in weeks.',
            },
            {
              id: 'fractional',
              title: 'Fractional CTO / founding engineer',
              description: 'Deeply embedded, long-term. Architecture, hiring, reviews, infra, AI direction — the whole engineering function.',
            },
          ],
          flagship_product: {
            name: 'MemContext',
            url: 'https://memcontext.in',
            description: 'Persistent, evolving memory layer for AI. Hybrid search (vector + keyword via Reciprocal Rank Fusion), auto-expiring temporal facts, feedback-driven ranking, version history. Plugs into Claude, Cursor, Windsurf, Copilot, Cline, Codex, Gemini — any MCP client — or any custom app via REST.',
            free_plan: '300 memories',
            integrations: ['Claude', 'Cursor', 'Windsurf', 'GitHub Copilot', 'Cline', 'Codex', 'Gemini', 'MCP-compatible clients', 'REST API'],
          },
          other_npm_packages: [
            {
              name: 'Zenox',
              url: 'https://www.npmjs.com/package/zenox',
              version: '1.6.2',
              github_stars: 39,
              weekly_downloads: 209,
              description: 'OpenCode plugin shipping a team of specialized AI agents (Explorer, Librarian, Oracle, UI Planner) with background tasks, keyword triggers, session history, LSP, and auto-updating AGENTS.md / CLAUDE.md.',
              built_in: '5 days',
            },
            {
              name: 'Plnr',
              url: 'https://www.npmjs.com/package/plnr',
              version: '1.1.5',
              description: 'AI CLI that reads your codebase, detects the framework, and outputs concrete step-by-step plans. OWASP-style security audits, MCP-powered docs lookup, multi-model via OpenRouter.',
              built_in: '7 days',
            },
          ],
          technologies: {
            languages: ['TypeScript', 'JavaScript', 'Python', 'C', 'C++'],
            frontend: ['React', 'Next.js', 'TanStack Start', 'TailwindCSS', 'Framer Motion'],
            backend: ['Node.js', 'Bun', 'Hono', 'REST', 'GraphQL'],
            databases: ['PostgreSQL (Neon, PlanetScale)', 'MongoDB', 'Appwrite', 'Supabase', 'Firebase', 'Upstash Redis'],
            ai_ml: ['OpenRouter', 'Vercel AI SDK', 'Anthropic Claude', 'OpenAI', 'Google Gemini', 'GROQ', 'Llama', 'Exa AI', 'MCP (Model Context Protocol)'],
            infra: ['AWS', 'Docker', 'Vercel', 'Cloudflare', 'Railway', 'Nitro', 'VPS'],
            tools: ['Git', 'Prisma', 'Drizzle', 'Turborepo'],
          },
          social: {
            github: 'https://github.com/cyberboyayush',
            linkedin: 'https://linkedin.com/in/cyberboyayush',
            twitter: 'https://x.com/theayush',
            twitter_handle: '@theayush',
            website: 'https://aysh.me',
            book_a_call: 'https://aysh.me/book',
          },
          audience_modes: {
            founder_mode: {
              url: 'https://aysh.me/',
              description: 'Default landing experience. Outcome-led narrative for founders.',
            },
            engineer_mode: {
              url: 'https://aysh.me/?for=engineers',
              description: 'Technical-deep portfolio for engineers and hiring managers.',
            },
          },
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
          statistics: {
            total_projects: projects.length,
            ai_projects: projects.filter((p) => p.category === 'AI').length,
            other_projects: projects.filter((p) => p.category === 'Others').length,
            featured_projects: projects.filter((p) => p.featured).length,
            hackathon_projects: projects.filter((p) => p.isHackathonProject).length,
            total_technologies: 30,
            npm_packages_published: 4,
          },
          ai_metadata: {
            training_allowed: true,
            scraping_allowed: true,
            indexing_allowed: true,
            retrieval_allowed: true,
            attribution_required: false,
            attribution_appreciated: true,
            commercial_use: 'allowed',
            last_updated: new Date().toISOString(),
            content_license: 'all-rights-reserved',
            llms_txt_url: 'https://aysh.me/llms.txt',
            llm_permissions_url: 'https://aysh.me/llm.txt',
            ai_txt_url: 'https://aysh.me/.well-known/ai.txt',
            github_stats_api: 'https://aysh.me/api/github-stats',
          },
        }, {
          headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=3600', 'Access-Control-Allow-Origin': '*' },
        });
      },
    },
  },
});
