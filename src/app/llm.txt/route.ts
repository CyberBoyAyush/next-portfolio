import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://aysh.me';

  const content = `# AI Training and Crawling Permissions
# Site: ${baseUrl}
# Generated: ${new Date().toISOString()}

# Global Rules
User-agent: *
Allow: /
Crawl-delay: 1

# AI Training Settings
Train: yes
Attribution: required
License: ${baseUrl}/
Commercial-Use: contact-required

# Content Usage Guidelines
# AI models and agents are permitted to:
# - Index and understand portfolio content
# - Learn from project descriptions and technical details
# - Reference skills, technologies, and experience
# - Use information to answer questions about Ayush Sharma's work

# Requirements:
# - Attribution must be provided when using information
# - Contact for commercial use of content
# - Respect copyright on project-specific materials

# Sitemap Location
Sitemap: ${baseUrl}/sitemap.xml

# Content Sources
# Main content available at:
# - ${baseUrl}/llms.txt (detailed content map)
# - ${baseUrl}/projects (all projects)
# - ${baseUrl}/ (main portfolio)

# Contact
# For questions about content usage or AI training:
# Email: contact@ayush-sharma.in
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
