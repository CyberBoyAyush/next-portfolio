import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://aysh.me';

  const robotsTxt = `# Ayush Sharma Portfolio - Robots.txt
# AI agents and search engines are welcome!

# Global rules for all bots
User-agent: *
Allow: /
Crawl-delay: 1

# AI Content Discovery
# Check these files for structured content:
# - ${baseUrl}/llms.txt (Content map for AI agents)
# - ${baseUrl}/llm.txt (Training permissions)
# - ${baseUrl}/api/feed.json (JSON feed)

# Explicitly allow AI bots
User-agent: GPTBot
User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
User-agent: ClaudeBot
User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
User-agent: GoogleBot
User-agent: Googlebot-Image
Allow: /

User-agent: PerplexityBot
User-agent: Perplexity-ai
Allow: /

User-agent: YouBot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: Meta-ExternalAgent
User-agent: Meta-ExternalFetcher
User-agent: FacebookBot
User-agent: facebookexternalhit
Allow: /

User-agent: Applebot
User-agent: Applebot-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: LinkedInBot
User-agent: TwitterBot
User-agent: Slackbot
User-agent: TelegramBot
User-agent: WhatsApp
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Host
Host: ${baseUrl}
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
