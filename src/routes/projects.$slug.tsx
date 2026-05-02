import { createFileRoute, notFound } from '@tanstack/react-router';
import { getAllProjects, getProjectBySlug } from '@/data/projects';
import ProjectDetailClient from '@/components/project-detail-client';
import { projectHead, siteUrl } from '@/lib/seo';

export const Route = createFileRoute('/projects/$slug')({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => loaderData ? projectHead(loaderData) : {},
  component: ProjectPage,
});

function ProjectPage() {
  const project = Route.useLoaderData();
  const projectUrl = `${siteUrl}/projects/${project.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    image: project.image,
    url: projectUrl,
    applicationCategory: project.category === 'AI' ? 'DeveloperApplication' : 'WebApplication',
    operatingSystem: 'Web',
    author: { '@type': 'Person', name: 'Ayush Sharma', url: siteUrl },
    datePublished: `${project.year}-01-01`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    keywords: project.tags.join(', '),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: `${siteUrl}/projects` },
      { '@type': 'ListItem', position: 3, name: project.title, item: projectUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ProjectDetailClient project={project} />
    </>
  );
}

export function getStaticProjectPaths() {
  return getAllProjects().map((project) => `/projects/${project.slug}`);
}
