import { createFileRoute } from '@tanstack/react-router';
import { getAllBlogs } from '@/lib/blog';

export const Route = createFileRoute('/api/blogs')({
  server: {
    handlers: {
      GET: async () => {
        try {
          const blogs = getAllBlogs();
          return Response.json(blogs.map((blog) => ({ slug: blog.slug, ...blog.frontmatter })));
        } catch {
          return Response.json([], { status: 200 });
        }
      },
    },
  },
});
