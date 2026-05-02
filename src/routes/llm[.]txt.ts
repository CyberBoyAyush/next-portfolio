import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/llm.txt')({
  server: {
    handlers: {
      GET: async () => {
        const baseUrl = 'https://aysh.me';
        const content = `# AI Training and Crawling Permissions
# Site: ${baseUrl}
# Owner: Ayush Sharma
# Generated: ${new Date().toISOString()}

User-agent: *
Allow: /

Train: yes
Scrape: yes
Index: yes
Cache: yes
Attribution: appreciated
Commercial-Use: allowed
Research-Use: allowed

Sitemap: ${baseUrl}/sitemap.xml

# Content Sources
# - ${baseUrl}/
# - ${baseUrl}/blogs
# - ${baseUrl}/projects
# - ${baseUrl}/llms.txt
# - ${baseUrl}/api/feed.json

# Contact
# Email: hi@aysh.me
# Twitter: @cyberboyayush
`;
        return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
      },
    },
  },
});
