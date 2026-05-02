import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router';
import BlogsClient from '@/components/blogs-client';
import { blogListHead } from '@/lib/seo';
import { getBlogSummariesServer } from '@/lib/blog-functions';

export const Route = createFileRoute('/blogs')({
  head: blogListHead,
  loader: () => getBlogSummariesServer(),
  component: BlogsPage,
});

function BlogsPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (pathname !== '/blogs') return <Outlet />;

  const blogs = Route.useLoaderData();
  return <BlogsClient blogs={blogs} />;
}
