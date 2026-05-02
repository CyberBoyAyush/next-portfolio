import { createServerFn } from '@tanstack/react-start';
import { notFound } from '@tanstack/react-router';
import { z } from 'zod';
import { getAllBlogs, getBlogBySlug, getFeaturedBlogs, getRelatedBlogs } from '@/lib/blog';
import { extractHeadings } from '@/lib/blog-utils';

export const getFeaturedBlogsServer = createServerFn({ method: 'GET' }).handler(() => getFeaturedBlogs());

export const getBlogSummariesServer = createServerFn({ method: 'GET' }).handler(() =>
  getAllBlogs().map((blog) => ({ slug: blog.slug, ...blog.frontmatter }))
);

export const getBlogPageDataServer = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ slug: z.string() }))
  .handler(({ data }) => {
    const blog = getBlogBySlug(data.slug);
    if (!blog || blog.frontmatter.isHidden) throw notFound();

    return {
      blog,
      relatedBlogs: getRelatedBlogs(data.slug, blog.frontmatter.tags),
      headings: extractHeadings(blog.content),
    };
  });
