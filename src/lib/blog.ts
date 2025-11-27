import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogFrontmatter } from '@/types/blog';

const blogsDirectory = path.join(process.cwd(), 'src/data/blogs');

export function getAllBlogSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(blogsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => fileName.replace(/\.mdx$/, ''));
  } catch (error) {
    return [];
  }
}

export function getBlogBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Ensure date is a string
    const frontmatter = {
      ...data,
      date: data.date instanceof Date ? data.date.toISOString() : data.date,
    } as BlogFrontmatter;

    return {
      slug,
      frontmatter,
      content,
    };
  } catch (error) {
    return null;
  }
}

export function getAllBlogs(): BlogPost[] {
  const slugs = getAllBlogSlugs();
  const blogs = slugs
    .map((slug) => getBlogBySlug(slug))
    .filter((blog): blog is BlogPost => blog !== null && !blog.frontmatter.isHidden)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateB - dateA; // Sort by date descending (newest first)
    });

  return blogs;
}

export function getFeaturedBlogs(): BlogPost[] {
  return getAllBlogs().filter((blog) => blog.frontmatter.featured);
}

export function getRelatedBlogs(currentSlug: string, tags: string[], limit = 3): BlogPost[] {
  return getAllBlogs()
    .filter((blog) => blog.slug !== currentSlug)
    .map((blog) => ({
      blog,
      score: blog.frontmatter.tags.filter((tag) => tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ blog }) => blog);
}
