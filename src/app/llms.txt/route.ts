import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://aysh.me';

  const content = `# Ayush Sharma - Portfolio

> Full Stack Developer specializing in AI-powered applications, modern web development, and cloud infrastructure. Expertise in React, Next.js, TypeScript, Python, and various AI/ML technologies including OpenRouter, Vercel AI SDK, and LLM integration.

## About

Ayush Sharma is a Full Stack Lead Developer at Kakiyo OÜ, building scalable AI-powered applications with modern web technologies. With expertise in React, Next.js, TypeScript, and cloud infrastructure, I create high-performance applications that solve real-world problems.

## Core Technologies

**Frontend**: React, Next.js, TypeScript, JavaScript, Tailwind CSS, Framer Motion
**Backend**: Node.js, Python, C, C++, PostgreSQL, MongoDB, Firebase, Appwrite, Supabase
**AI/ML**: OpenRouter, Vercel AI SDK, OpenAI API, Gemini, GROQ, Llama, Exa AI, MCP (Model Context Protocol)
**DevOps**: AWS, Docker, Vercel, Cloudflare, VPS Management
**Tools**: Git, Prisma, GraphQL

## Key Pages

- [Home](${baseUrl}/): Main portfolio page with hero, skills, experience, projects, and contact
- [Projects](${baseUrl}/projects): Comprehensive list of all projects with filtering
- [About & Experience](${baseUrl}/#experience): Professional experience and work history
- [Skills](${baseUrl}/#skills): Complete tech stack and technologies
- [Contact](${baseUrl}/#contact): Get in touch via email or social media

## Featured Projects

### AI Projects

- [Plnr](${baseUrl}/projects/plnr): AI-powered CLI tool for intelligent codebase planning using OpenRouter, TypeScript, Node.js, MCP, and Exa AI. Features automatic framework detection, security audits, and multi-model support (GPT-5, Claude 4.5, Grok, Gemini)
- [CappyChat](${baseUrl}/projects/cappychat): Fastest LLM chat platform with multi-model support and real-time sync using Next.js, Appwrite, OpenRouter, and Convex
- [TuduAI](${baseUrl}/projects/tuduai): AI-powered productivity app with natural language task creation using React, OpenAI API, Appwrite, and Clerk authentication
- [SkillCompass](${baseUrl}/projects/skillcompass): AI-powered personalized learning paths with Gemini and Llama 3.3, built in 72 hours for a hackathon
- [Effisense](${baseUrl}/projects/effisense): AI-powered task scheduling with Google Calendar API integration, GROQ, and Appwrite

### Web Applications

- [Bucket Buddy](${baseUrl}/projects/bucket-buddy): Modern cloud storage management solution for AWS S3 with Next.js, Prisma, and PostgreSQL
- [QuickBang](${baseUrl}/projects/quickbang): Lightning-fast search shortcuts browser extension using React and TypeScript
- [PortDev](${baseUrl}/projects/portdev): Create developer portfolios in minutes with React, Firebase, and Framer Motion

## Professional Experience

**Kakiyo OÜ** - Full Stack Lead Developer (July 2025 - Present)
- Built AI-powered LinkedIn automation platform improving engagement by 70%
- Reduced Appwrite costs by 70% through query optimization
- Architecting scalable backend systems with modern cloud infrastructure
- Technologies: React, Next.js, TypeScript, Node.js, PostgreSQL, AWS, Docker

## Contact Information

- Email: [hi@aysh.me](mailto:hi@aysh.me)
- GitHub: [github.com/cyberboyayush](https://github.com/cyberboyayush)
- LinkedIn: [linkedin.com/in/cyberboyayush](https://linkedin.com/in/cyberboyayush)
- Twitter: [@cyberboyayush](https://twitter.com/cyberboyayush)

## Technical Expertise Areas

- **AI/LLM Integration**: Building production-ready AI applications with OpenRouter, OpenAI, Anthropic Claude, and other LLM providers
- **Full Stack Development**: End-to-end application development with React, Next.js, Node.js, and modern databases
- **Cloud Architecture**: Designing and deploying scalable cloud infrastructure on AWS, Vercel, and other platforms
- **Performance Optimization**: Reducing costs and improving response times through caching, query optimization, and best practices
- **Developer Tools**: Creating CLI tools and developer productivity applications

## Project Categories

This portfolio showcases **9 major projects**, with **6 AI-focused applications** demonstrating expertise in:
- LLM integration and prompt engineering
- Real-time AI chat applications
- Natural language processing for productivity
- AI-powered automation and workflows
- Personalized learning and scheduling systems

Last Updated: 2025-11-06
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
