import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { getAllBlogs, getBlogBySlug } from '@/lib/blog';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import CodeBlock from '@/components/CodeBlock';
import CopyMarkdownButton from '@/components/CopyMarkdownButton';
import BlogContent, { BlogProvider, BlogZoomControls } from '@/components/BlogContentWrapper';
import BlogShareButton from '@/components/BlogShareButton';
import 'highlight.js/styles/github-dark.css';
import './blog-content.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog || blog.frontmatter.isHidden) {
    return {
      title: 'Blog Not Found',
    };
  }

  let ogImages = [];

  if (blog.frontmatter.imageUrl) {
    ogImages.push({
      url: blog.frontmatter.imageUrl,
      width: 1408,
      height: 768,
      alt: blog.frontmatter.title,
    });
  }

  return {
    title: `${blog.frontmatter.title} | Ayush Sharma`,
    description: blog.frontmatter.description,
    keywords: blog.frontmatter.tags,
    authors: [{ name: blog.frontmatter.author }],
    openGraph: {
      title: blog.frontmatter.title,
      description: blog.frontmatter.description,
      type: 'article',
      publishedTime: blog.frontmatter.date,
      authors: [blog.frontmatter.author],
      tags: blog.frontmatter.tags,
      images: ogImages,
      url: `/blogs/${slug}`,
      siteName: 'Ayush Sharma',
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.frontmatter.title,
      description: blog.frontmatter.description,
      images: blog.frontmatter.imageUrl ? [blog.frontmatter.imageUrl] : [],
      creator: '@cyberboyayush',
    },
    alternates: {
      canonical: `/blogs/${slug}`,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog || blog.frontmatter.isHidden) {
    notFound();
  }

  const { frontmatter, content } = blog;

  return (
    <BlogProvider>
      <main className="min-h-screen bg-[#0D1117] pt-20 md:pt-20">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10 bg-[#0D1117]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-gradient-radial from-blue-800/10 to-transparent opacity-50 blur-[120px]" />
        </div>

        <div className="absolute inset-0 -z-10 bg-size-[30px_30px] md:bg-size-[40px_40px] bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)]"></div>

        <article className="py-8 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            {/* Back button, Zoom controls, and Copy Markdown button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to Blogs</span>
              </Link>
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <BlogZoomControls />
                <CopyMarkdownButton content={content} frontmatter={frontmatter} />
              </div>
            </div>

            {/* Cover Image */}
          {frontmatter.imageUrl && (
            <div className="relative w-full aspect-1408/768 overflow-hidden mb-8 sm:mb-10 md:mb-12 border border-gray-800">
              <Image
                src={frontmatter.imageUrl}
                alt={frontmatter.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          )}

          {/* Header */}
          <header className="mb-8 sm:mb-10 md:mb-12">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <time dateTime={frontmatter.date}>
                  {new Date(frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <span className="text-gray-600">•</span>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{frontmatter.readingTime}</span>
              </div>
              <span className="text-gray-600">•</span>
              <span>By {frontmatter.author}</span>
              <div className="flex-1 flex justify-center sm:justify-end w-full sm:w-auto mt-4 sm:mt-0 sm:flex-none sm:ml-auto">
                <BlogShareButton title={frontmatter.title} />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              {frontmatter.title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed mb-6 sm:mb-8">
              {frontmatter.description}
            </p>

            {/* Tags */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 text-gray-500 text-xs sm:text-sm">
                <Tag size={14} />
                <span className="font-medium">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 sm:px-3 bg-gray-800/60 text-gray-300 text-xs sm:text-sm border border-gray-700/50 hover:border-gray-600 hover:bg-gray-800 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-invert prose-base sm:prose-lg max-w-none">
            <BlogContent>
              <MDXRemote
                source={content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeHighlight],
                  },
                }}
                components={{
                  pre: ({ children, ...props }) => (
                    <CodeBlock>
                      <pre {...props}>{children}</pre>
                    </CodeBlock>
                  ),
                }}
              />
            </BlogContent>
          </div>

          {/* Footer */}
          <footer className="mt-12 sm:mt-14 md:mt-16 pt-6 sm:pt-8 border-t border-gray-800">
            <Link
              href="/blogs"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-medium border border-white/10 hover:border-white/20 transition-all group w-full sm:w-auto"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to all articles</span>
            </Link>
          </footer>
        </div>
      </article>
    </main>
    </BlogProvider>
  );
}
