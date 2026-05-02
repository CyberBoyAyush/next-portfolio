import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: async () => {
        const baseUrl = 'https://aysh.me';
        const robotsTxt = `# Ayush Sharma Portfolio - Robots.txt
# AI agents, crawlers, and search engines are fully welcome!

User-agent: *
Allow: /

User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-Web
User-agent: ClaudeBot
User-agent: anthropic-ai
User-agent: Anthropic
Allow: /

User-agent: Google-Extended
User-agent: GoogleOther
User-agent: GoogleBot
User-agent: Googlebot-Image
Allow: /

User-agent: PerplexityBot
User-agent: Perplexity-ai
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
Host: ${baseUrl}
`;
        return new Response(robotsTxt, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' } });
      },
    },
  },
});
