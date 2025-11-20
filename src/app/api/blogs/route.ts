import { NextResponse } from 'next/server';
import { getAllBlogs } from '@/lib/blog';

export async function GET() {
  try {
    const blogs = getAllBlogs();
    return NextResponse.json(blogs.map(blog => ({
      slug: blog.slug,
      ...blog.frontmatter,
    })));
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}
