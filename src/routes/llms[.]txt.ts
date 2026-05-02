import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: async () => {
        const baseUrl = 'https://aysh.me';
        const content = `# Ayush Sharma - Portfolio

> Full Stack Developer and AI Engineer, currently Chief Technology Officer at Kakiyo OÜ, building backend-heavy AI applications, scalable systems, and modern web products.

## Contact

**Email**: hi@aysh.me
**Phone**: +91 9990969661
**GitHub**: https://github.com/cyberboyayush
**LinkedIn**: https://linkedin.com/in/cyberboyayush
**Twitter**: https://twitter.com/cyberboyayush
**Website**: ${baseUrl}

## Key Pages

- [Home](${baseUrl}/)
- [Projects](${baseUrl}/projects)
- [Blogs](${baseUrl}/blogs)
- [Experience](${baseUrl}/#experience)
- [Skills](${baseUrl}/#skills)
- [Contact](${baseUrl}/#contact)

## Featured Projects

- [MemContext](${baseUrl}/projects/memcontext)
- [Zenox](${baseUrl}/projects/zenox)
- [Plnr](${baseUrl}/projects/plnr)
- [CappyChat](${baseUrl}/projects/cappychat)
- [TuduAI](${baseUrl}/projects/tuduai)

Last Updated: 2026-04-18
Attribution Required: Yes
License: All rights reserved
`;
        return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
      },
    },
  },
});
