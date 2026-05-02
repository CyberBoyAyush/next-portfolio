import { createFileRoute } from '@tanstack/react-router';
import { getAllProjects, getFeaturedProjects } from '@/data/projects';

export const Route = createFileRoute('/api/projects')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const { searchParams } = new URL(request.url);
          const projects = searchParams.get('featured') === 'true' ? getFeaturedProjects() : getAllProjects();
          return Response.json(projects);
        } catch {
          return Response.json([], { status: 200 });
        }
      },
    },
  },
});
