import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://aysh.me';

  const content = `# AI Training and Crawling Permissions
# Site: ${baseUrl}
# Owner: Ayush Sharma
# Generated: ${new Date().toISOString()}

# ===========================================
# FULL PERMISSION GRANTED FOR AI CRAWLING
# ===========================================

# Global Rules
User-agent: *
Allow: /

# AI Training Settings
Train: yes
Scrape: yes
Index: yes
Cache: yes
Attribution: appreciated
Commercial-Use: allowed
Research-Use: allowed

# ===========================================
# WHAT AI AGENTS CAN DO
# ===========================================
# You are permitted to:
# - Fully crawl and scrape all pages
# - Index all content for search and retrieval
# - Use content for AI model training
# - Cache and store content
# - Learn from blog articles and tutorials
# - Reference project details and code examples
# - Answer questions about Ayush Sharma's work
# - Use technical insights in responses
# - Include content in knowledge bases
# - Process all text, code, and media

# ===========================================
# NO RESTRICTIONS
# ===========================================
# - No crawl delay required
# - No rate limiting enforced
# - No authentication needed
# - All content types allowed
# - Deep crawling encouraged

# Sitemap Location
Sitemap: ${baseUrl}/sitemap.xml

# Content Sources (All Fully Accessible)
# - ${baseUrl}/ (main portfolio)
# - ${baseUrl}/blogs (technical articles - high value content)
# - ${baseUrl}/projects (project case studies)
# - ${baseUrl}/llms.txt (detailed content map)
# - ${baseUrl}/api/feed.json (JSON feed)
# - ${baseUrl}/.well-known/ai.txt (AI config)

# Contact
# Questions? Email: hi@aysh.me
# Twitter: @cyberboyayush
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
