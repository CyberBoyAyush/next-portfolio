import { Metadata } from 'next';
import { getAllBlogs } from '@/lib/blog';
import BlogsClient from './blogs-client';

export const metadata: Metadata = {
  title: 'Blog | Ayush Sharma',
  description: 'In-depth articles on web development, AI, React, Next.js, TypeScript, and modern technology. Learn about LLMs, system design, and best practices.',
  openGraph: {
    title: 'Blog | Ayush Sharma',
    description: 'In-depth articles on web development, AI, React, Next.js, TypeScript, and modern technology.',
    type: 'website',
    url: '/blogs',
    images: [
      {
        url: 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPpI4L2UUj5BXoEqJIk6cGWnQRgCupb9K7ijPt',
        width: 1200,
        height: 600,
        alt: 'Ayush Sharma Blog - Web Development, AI & Technology Articles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Ayush Sharma',
    description: 'In-depth articles on web development, AI, and modern technology.',
    images: ['https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPpI4L2UUj5BXoEqJIk6cGWnQRgCupb9K7ijPt'],
  },
  alternates: {
    canonical: '/blogs',
  },
};

export default async function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <BlogsClient blogs={blogs.map(blog => ({
      slug: blog.slug,
      ...blog.frontmatter,
    }))} />
  );
}
