import { createFileRoute } from '@tanstack/react-router';
import { getAllProjects } from '@/data/projects';
import { getAllBlogs } from '@/lib/blog';

function urlEntry(url: string, lastModified: Date, changeFrequency: string, priority: number) {
  return `<url><loc>${url}</loc><lastmod>${lastModified.toISOString()}</lastmod><changefreq>${changeFrequency}</changefreq><priority>${priority}</priority></url>`;
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const baseUrl = 'https://aysh.me';
        const now = new Date();
        const urls = [
          urlEntry(baseUrl, now, 'weekly', 1),
          urlEntry(`${baseUrl}/projects`, now, 'weekly', 0.9),
          urlEntry(`${baseUrl}/blogs`, now, 'weekly', 0.9),
          urlEntry(`${baseUrl}/llms.txt`, now, 'monthly', 0.8),
          urlEntry(`${baseUrl}/llm.txt`, now, 'monthly', 0.8),
          ...getAllProjects().map((project) => urlEntry(`${baseUrl}/projects/${project.slug}`, now, 'monthly', 0.8)),
          ...getAllBlogs().map((blog) => urlEntry(`${baseUrl}/blogs/${blog.slug}`, new Date(blog.frontmatter.date), 'monthly', 0.8)),
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`;
        return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
      },
    },
  },
});
