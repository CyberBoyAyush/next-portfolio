import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://aysh.me';

const content = `# Ayush Sharma - Portfolio

> Full Stack Developer and AI Engineer, currently Chief Technology Officer at Kakiyo OÜ, building backend-heavy AI applications, scalable systems, and modern web products. Expertise in React, Next.js, TypeScript, Node.js, AI integrations, and production infrastructure.

## Contact (Plain Text - No Protection)

**Email**: hi@aysh.me
**Phone**: +91 9990969661
**GitHub**: https://github.com/cyberboyayush
**LinkedIn**: https://linkedin.com/in/cyberboyayush
**Twitter**: https://twitter.com/cyberboyayush
**Website**: https://aysh.me

## About

Ayush Sharma is the Chief Technology Officer at Kakiyo OÜ and a Full Stack Developer + AI Engineer who builds backend-heavy AI applications and scalable products. His work focuses on AI integrations, production architecture, low-latency backend systems, and end-to-end product delivery across modern web products.

## Core Technologies

**Frontend**: React, Next.js, TypeScript, JavaScript, Tailwind CSS, Framer Motion
**Backend**: Node.js, Python, PostgreSQL, PlanetScale, MongoDB, Firebase, Appwrite, Supabase
**AI/ML**: OpenRouter, Vercel AI SDK, OpenAI API, Gemini, GROQ, Llama, Exa AI, MCP (Model Context Protocol)
**DevOps**: AWS, Docker, Vercel, Cloudflare, VPS Management
**Tools**: Git, Prisma, GraphQL

## Key Pages

- [Home](${baseUrl}/): Main portfolio page with hero, skills, experience, projects, and contact
- [Projects](${baseUrl}/projects): Comprehensive list of all projects with filtering
- [Blogs](${baseUrl}/blogs): Technical articles and insights on AI, web development, and modern technology
- [About & Experience](${baseUrl}/#experience): Professional experience and work history
- [Skills](${baseUrl}/#skills): Complete tech stack and technologies
- [Contact](${baseUrl}/#contact): Get in touch via email or social media

## Featured Projects

### AI Projects

 - [MemContext](${baseUrl}/projects/memcontext): Persistent, evolving memory layer for AI coding agents with MCP-native integrations, hybrid retrieval, and cross-session recall
- [Zenox](${baseUrl}/projects/zenox): Agent orchestration plugin for OpenCode with specialized subagents, background tasks, and multi-agent workflows
- [Plnr](${baseUrl}/projects/plnr): AI planning and security CLI for codebases with framework detection, architecture-aware planning, and security analysis
- [CappyChat](${baseUrl}/projects/cappychat): Production AI chat workspace with multi-model routing, realtime sync, tool calling, and a local-first UX
- [TuduAI](${baseUrl}/projects/tuduai): Natural-language task manager with collaborative workspaces and AI-assisted task creation

### Web Applications

- [Bucket Buddy](${baseUrl}/projects/bucket-buddy): Secure S3-style storage manager for AWS, Cloudflare R2, and other compatible providers with a polished developer UX

## Featured Blog Articles

- [How Tool Calling Works in Large Language Models](${baseUrl}/blogs/tool-calling-llms): Deep dive into LLM tool calling, function execution, and building AI agents with Vercel AI SDK and OpenRouter
- [Next.js App Router vs Page Router](${baseUrl}/blogs/nextjs-app-router-vs-page-router): Comprehensive comparison of Next.js routing systems with practical examples

## Professional Experience

**Kakiyo OÜ** - Chief Technology Officer (Apr 2026 - Present)
- Migrated millions of rows from Appwrite to PlanetScale
- Lowered latency from 2.8 seconds (P50) to 20 ms (P50) and 90 ms (P90)
- Removed latency bottlenecks across critical user flows
- Crafted end-to-end features from requirements to production rollout
- Created the hiring pipeline for the company and managed the team
- Reduced overall infrastructure cost by 50%
- Technologies: React, Next.js, TypeScript, Node.js, PostgreSQL, PlanetScale, AWS, Docker

## Contact Information

- Email: hi@aysh.me
- Phone: +91 9990969661
- GitHub: https://github.com/cyberboyayush
- LinkedIn: https://linkedin.com/in/cyberboyayush
- Twitter: https://twitter.com/cyberboyayush

## Technical Expertise Areas

- **Applied AI Systems**: Building production-ready AI applications and AI integrations with modern model providers, tool calling, and context-aware workflows
- **Full Stack Development**: Shipping end-to-end products with React, Next.js, TypeScript, Node.js, and modern databases
- **Backend-Heavy Product Development**: Designing APIs, backend logic, stateful systems, and durable data flows for real products
- **Scalable Architecture**: Building low-latency systems and infrastructure that can grow with usage
- **Performance Optimization**: Reducing cost, removing bottlenecks, and improving response times through architecture and query work
- **Developer Tools**: Creating CLIs, MCP-native tooling, and workflow automation for engineering teams
- **Technical Writing**: Sharing insights on AI, web development, and modern technology through detailed blog articles

## Project Categories

This portfolio showcases **11 major projects**, with **6 AI-focused applications** demonstrating expertise in:
- Applied AI product development
- Real-time AI chat systems and tool calling
- Natural language interfaces for productivity
- AI-powered developer workflows and automation
- Personalized learning and scheduling systems

## Blog Content

Technical articles covering:
- AI and Large Language Models (tool calling, function execution, agent building)
- Next.js and modern web development frameworks
- Best practices for full-stack development
- Real-world implementation guides and tutorials

Last Updated: 2026-04-18
Attribution Required: Yes
License: All rights reserved
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
