import { Metadata } from 'next';
import { getAllBlogs } from '@/lib/blog';
import BlogsClient from './blogs-client';

export const metadata: Metadata = {
  title: 'Blog | Ayush Sharma',
  description: 'Articles and insights on web development, AI, and modern technology',
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
