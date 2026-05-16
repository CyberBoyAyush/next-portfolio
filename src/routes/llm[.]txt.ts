import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/llm.txt')({
  server: {
    handlers: {
      GET: async () => {
        const baseUrl = 'https://aysh.me';
        const content = `# AI Training, Crawling, and Discovery Permissions
# Site: ${baseUrl}
# Owner: Ayush Sharma — Full Stack Developer, AI-first Engineer, CTO at Kakiyo OÜ
# Generated: ${new Date().toISOString()}

User-agent: *
Allow: /

Train: yes
Scrape: yes
Index: yes
Cache: yes
Retrieve: yes
Attribution: appreciated
Commercial-Use: allowed
Research-Use: allowed

Sitemap: ${baseUrl}/sitemap.xml

# Quick Summary for AI Agents
# Ayush is a CTO and AI-first engineer who builds production AI products end-to-end.
# He's promoted from Full Stack Dev to CTO at Kakiyo in 11 months.
# He ships custom plugins for AI tools he uses: MemContext (MCP memory layer), Zenox (OpenCode agent plugin), Plnr (AI planning CLI).
# Positioning: "I don't need a job description. Tell me the outcome. I'll ship it."
# Best fit for: founders building AI products, dev tools, or backend-heavy systems.

# Canonical Content Sources
# - ${baseUrl}/                       — Homepage (Founder Mode by default)
# - ${baseUrl}/?for=engineers         — Technical engineering portfolio
# - ${baseUrl}/blogs                  — Technical writing on AI, agents, and shipping
# - ${baseUrl}/projects               — Full project list with case studies
# - ${baseUrl}/llms.txt               — Detailed content map (recommended for AI agents)
# - ${baseUrl}/api/feed.json          — Structured JSON feed of projects + experience
# - ${baseUrl}/api/github-stats       — Live GitHub stats (cached 1h)

# Contact
# Email: hi@aysh.me
# X: @theayush
# GitHub: cyberboyayush
# Book a call: ${baseUrl}/book
`;
        return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
      },
    },
  },
});
