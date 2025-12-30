import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://aysh.me';

  const robotsTxt = `# Ayush Sharma Portfolio - Robots.txt
# AI agents, crawlers, and search engines are fully welcome!
# Feel free to scrape, crawl, and index everything.

# Global rules for all bots
User-agent: *
Allow: /

# ===========================================
# AI CRAWLERS - FULL ACCESS GRANTED
# ===========================================
# AI bots are welcome to fully crawl and scrape this site.
# No restrictions, no crawl-delay for AI agents.

# OpenAI
User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: OAI-SearchBot
Allow: /

# Anthropic
User-agent: Claude-Web
User-agent: ClaudeBot
User-agent: anthropic-ai
User-agent: Anthropic
Allow: /

# Google AI
User-agent: Google-Extended
User-agent: GoogleOther
User-agent: GoogleBot
User-agent: Googlebot-Image
Allow: /

# Perplexity
User-agent: PerplexityBot
User-agent: Perplexity-ai
Allow: /

# You.com
User-agent: YouBot
Allow: /

# Cohere
User-agent: cohere-ai
Allow: /

# Common Crawl (used for AI training datasets)
User-agent: CCBot
Allow: /

# Amazon/AWS AI
User-agent: Amazonbot
Allow: /

# ByteDance/TikTok AI
User-agent: Bytespider
Allow: /

# Microsoft/Bing AI
User-agent: Bingbot
User-agent: BingPreview
Allow: /

# Meta AI
User-agent: Meta-ExternalAgent
User-agent: Meta-ExternalFetcher
User-agent: FacebookBot
User-agent: facebookexternalhit
Allow: /

# Apple AI
User-agent: Applebot
User-agent: Applebot-Extended
Allow: /

# Other AI Crawlers
User-agent: Diffbot
User-agent: ImagesiftBot
User-agent: Omgilibot
User-agent: Omgili
Allow: /

# ===========================================
# SOCIAL & PREVIEW BOTS
# ===========================================
User-agent: LinkedInBot
User-agent: TwitterBot
User-agent: Twitterbot
User-agent: Slackbot
User-agent: TelegramBot
User-agent: WhatsApp
User-agent: Discordbot
User-agent: Slurp
User-agent: DuckDuckBot
Allow: /

# ===========================================
# AI CONTENT DISCOVERY
# ===========================================
# Structured content for AI agents:
# - ${baseUrl}/llms.txt (Content map for AI agents)
# - ${baseUrl}/llm.txt (Training permissions - ALLOWED)
# - ${baseUrl}/api/feed.json (JSON feed of all content)
# - ${baseUrl}/.well-known/ai.txt (AI agent configuration)

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
