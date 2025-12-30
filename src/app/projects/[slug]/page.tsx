import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectBySlug, Project } from '@/data/projects';
import ProjectDetailClient from './project-detail-client';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Projects | Ayush Sharma`,
    description: project.description,
    keywords: project.tags,
    openGraph: {
      title: `${project.title} - Project by Ayush Sharma`,
      description: project.description,
      type: 'article',
      url: `/projects/${slug}`,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.title} project screenshot`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.image],
      creator: '@cyberboyayush',
    },
    alternates: {
      canonical: `/projects/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const baseUrl = 'https://aysh.me';
  const projectUrl = `${baseUrl}/projects/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    image: project.image,
    url: projectUrl,
    applicationCategory: project.category === 'AI' ? 'DeveloperApplication' : 'WebApplication',
    operatingSystem: 'Web',
    author: {
      '@type': 'Person',
      name: 'Ayush Sharma',
      url: baseUrl,
    },
    datePublished: `${project.year}-01-01`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    keywords: project.tags.join(', '),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projects',
        item: `${baseUrl}/projects`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: projectUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProjectDetailClient project={project} />
    </>
  );
}
