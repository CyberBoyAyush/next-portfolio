import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router';
import ProjectsClient from '@/components/projects-client';
import { projectsHead } from '@/lib/seo';

export const Route = createFileRoute('/projects')({
  head: projectsHead,
  component: ProjectsPage,
});

function ProjectsPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (pathname !== '/projects') return <Outlet />;

  return <ProjectsClient />;
}
