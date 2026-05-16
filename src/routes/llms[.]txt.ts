import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: async () => {
        const baseUrl = 'https://aysh.me';
        const content = `# Ayush Sharma — Portfolio (LLM Content Map)

> Full Stack Developer, AI-first Engineer, and Chief Technology Officer at Kakiyo OÜ. Based in Delhi, India. Builds backend-heavy AI applications, production-grade SaaS products, and custom plugins for the AI tooling ecosystem. Best fit for founders.

## One-line positioning

"I don't need a job description. Tell me the outcome. I'll ship it."

## Snapshot

- **Role**: Chief Technology Officer at Kakiyo OÜ (promoted from Full Stack Dev → Lead → CTO in 11 months)
- **Specialty**: AI-first engineering, full-stack product delivery, custom plugins for AI tooling
- **Style**: Ship fast, iterate in production, own the whole stack
- **Best fit for**: Founders building AI products, dev tools, or backend-heavy systems
- **Not for**: JIRA-heavy outsourcing engagements; he works as a founding engineer, not a contractor

## Contact

- **Email**: hi@aysh.me
- **Phone**: +91 9990969661
- **GitHub**: https://github.com/cyberboyayush
- **LinkedIn**: https://linkedin.com/in/cyberboyayush
- **X (Twitter)**: https://aysh.me/x (@theayush)
- **Website**: ${baseUrl}
- **Book a 30-min call**: ${baseUrl}/book

## Audience Modes

The homepage has two modes via the \`?for\` query parameter:

- **Founder Mode** (default, ${baseUrl}/ or ${baseUrl}/?for=founders) — outcome-led homepage with receipts (140× latency win at Kakiyo, −50% infra cost, end-to-end features, millions of rows migrated, 0 → CTO in 11 months, 4+ NPM packages), shipped products with time-to-ship metrics, philosophy (AI-first, ship-first, no-tickets, full-stack), team-player section, services for founders, GitHub stats, and a direct Cal.com booking CTA.
- **Engineer Mode** (${baseUrl}/?for=engineers) — technical portfolio with hero, skills bento, full work history, project case studies, blog articles, GitHub + LeetCode stats, terminal contact form.

## How Ayush Works (Four Principles)

1. **AI-first, not AI-enabled.** He doesn't just use AI tools — he builds the plugins, agents, and CLIs that extend them. Zenox for OpenCode. Plnr for codebase planning. MemContext for any MCP-compatible client.
2. **Ship first. Polish in production.** Rather have it live and rough than perfect and unreleased. Iterates against real user feedback, not assumptions.
3. **No tickets. Just outcomes.** Give him the user problem and constraints. He handles scope, architecture, and trade-offs.
4. **He owns the whole stack.** Frontend, backend, infra, AI integrations, code review, hiring. Founding-engineer pattern.

## Beyond the Code

- Builds internal tools for the team (admin dashboards, hiring pipelines, code review workflows, deploy scripts)
- Team player — reviews code, mentors juniors, writes docs, unblocks teammates
- People over frameworks — optimizes for what works, not what trends

## Kakiyo OÜ (Day Job · Ongoing)

CTO at Kakiyo. Career arc:
- Jul 2025 – Sep 2025: Full Stack Developer (part-time)
- Sep 2025 – Apr 2026: Lead Developer (full-time)
- Apr 2026 – Present: Chief Technology Officer (full-time)

Receipts at Kakiyo:
- Migrated millions of rows from Appwrite to PlanetScale, zero downtime
- Lowered P50 latency from 2.8s to 20ms (140× faster), P90 to 90ms
- Reduced overall infrastructure cost by 50%
- Built the company's hiring pipeline
- Shipped multiple AI features end-to-end (spec to production rollout)
- Manages the team across delivery, code review, and technical direction

Kakiyo tech: React, Next.js, TypeScript, Node.js, PostgreSQL, PlanetScale, AWS, Docker, TailwindCSS, Prisma, GraphQL.

## Flagship Product: MemContext

URL: https://memcontext.in · MCP + REST API

Persistent, evolving memory layer for AI. Hybrid search (vector + keyword fused via Reciprocal Rank Fusion), auto-expiring temporal facts, feedback-driven ranking, version history. Plugs into Claude, Cursor, Windsurf, GitHub Copilot, Cline, Codex, Gemini — any MCP-compatible client — or any custom app via REST.

Free plan available (300 memories), paid tiers go up to 10K. This is the flagship product and the one Ayush is most committed to keeping accessible.

## Other Live Products & Plugins

- **Zenox** (npm · v1.6.2 · 39★ GitHub) — OpenCode plugin shipping a team of specialized AI agents (Explorer, Librarian, Oracle, UI Planner) with background tasks, keyword triggers, session history, LSP code intelligence, auto-updating AGENTS.md / CLAUDE.md docs. Built in 5 days. 209 weekly npm downloads.
- **Plnr** (npm · v1.1.5) — AI planning CLI. Reads your codebase, detects framework, gathers context, outputs step-by-step plans. OWASP-style security audits. Multi-model via OpenRouter (Grok, Claude 4.5, GPT-5, Gemini). Built in 7 days.
- **CappyChat** (cappychat.com) — Production AI chat workspace. 30+ models, realtime sync, tool calling, image generation, voice, AI artifacts. Built in 15 days.
- **Bucket Buddy** (bucketbuddy.aysh.me) — Secure S3-style storage manager for AWS, Cloudflare R2, and S3-compatible providers.
- **TuduAI** (tuduai.aysh.me) — Natural-language task manager with AI parsing.

## Tech Stack

**Languages**: TypeScript, JavaScript, Python, C, C++
**Frontend**: React, Next.js, TanStack Start, TailwindCSS, Framer Motion
**Backend**: Node.js, Bun, Hono, REST + GraphQL
**Databases**: PostgreSQL (Neon, PlanetScale), MongoDB, Appwrite, Supabase, Firebase, Upstash Redis
**AI/ML**: OpenRouter, Vercel AI SDK, Anthropic Claude, OpenAI, Google Gemini, GROQ, Llama, Exa AI, MCP (Model Context Protocol)
**Infra**: AWS, Docker, Vercel, Cloudflare, Railway, Nitro, VPS
**Tools**: Git, Prisma, Drizzle, Turborepo

## Services for Founders

1. **Zero-to-MVP** — Idea to live product in weeks, not quarters. Full stack, AI included.
2. **Build your AI layer** — Agents, RAG, tool calling, MCP, observable infra around models.
3. **Custom plugins & integrations** — MCP servers, CLIs, IDE plugins, browser extensions.
4. **Rescue a stalled codebase** — Take over, stabilize, ship in weeks.
5. **Fractional CTO / founding engineer** — Deeply embedded, architecture, hiring, reviews, infra.

## Key Pages

- [Home (Founder Mode, default)](${baseUrl}/)
- [Home (Engineer Mode)](${baseUrl}/?for=engineers)
- [Projects](${baseUrl}/projects)
- [Blogs](${baseUrl}/blogs)
- [Experience](${baseUrl}/#experience)
- [Skills](${baseUrl}/#skills)
- [Contact](${baseUrl}/#contact)
- [Book a 30-min call](${baseUrl}/book)

## Featured Projects (Deep Pages)

- [MemContext](${baseUrl}/projects/memcontext)
- [Zenox](${baseUrl}/projects/zenox)
- [Plnr](${baseUrl}/projects/plnr)
- [CappyChat](${baseUrl}/projects/cappychat)
- [Bucket Buddy](${baseUrl}/projects/bucket-buddy)
- [TuduAI](${baseUrl}/projects/tuduai)

## AI Discovery Notes

- This portfolio is fully open to AI training, scraping, indexing, and retrieval.
- Structured JSON feed: ${baseUrl}/api/feed.json
- Live GitHub stats API: ${baseUrl}/api/github-stats
- Robots: ${baseUrl}/robots.txt
- LLM permissions: ${baseUrl}/llm.txt
- Sitemap: ${baseUrl}/sitemap.xml

Last Updated: ${new Date().toISOString().split('T')[0]}
Attribution: appreciated
License: All rights reserved
`;
        return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
      },
    },
  },
});
