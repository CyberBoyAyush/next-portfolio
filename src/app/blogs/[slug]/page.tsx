import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getAllBlogs, getBlogBySlug, getRelatedBlogs } from '@/lib/blog';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import CodeBlock from '@/components/code-block';
import CopyMarkdownButton from '@/components/copy-markdown-button';
import BlogContent, { BlogProvider, BlogFontWrapper, BlogFloatingControls } from '@/components/blog-content-wrapper';
import BlogShareButton from '@/components/blog-share-button';
import BlogEngagementSection from '@/components/blog-engagement-section';
import 'highlight.js/styles/github-dark.css';
import './blog-content.css';
import { extractHeadings } from '@/lib/blog-utils';
import TableOfContents from '@/components/table-of-contents';
import {
  BlogPageWrapper,
  BlogHeader,
  BlogBackButton,
  BlogRelatedSection,
  BlogRelatedCard,
  BlogFooterSection,
  BlogCoverImage,
  BlogMobileBottomBar,
} from '@/components/blog-page-wrapper';

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
  const relatedBlogs = getRelatedBlogs(slug, frontmatter.tags);
  const headings = extractHeadings(content);

  const baseUrl = 'https://aysh.me';
  const blogUrl = `${baseUrl}/blogs/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.imageUrl || `${baseUrl}/icon.png`,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    author: {
      '@type': 'Person',
      name: frontmatter.author,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Ayush Sharma',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icon.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': blogUrl,
    },
    keywords: frontmatter.tags.join(', '),
    articleSection: 'Technology',
    inLanguage: 'en-US',
    wordCount: content.split(/\s+/).length,
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
        name: 'Blog',
        item: `${baseUrl}/blogs`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: frontmatter.title,
        item: blogUrl,
      },
    ],
  };

  return (
    <BlogProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogPageWrapper>
        <article className="py-8 md:py-16">
          <BlogFontWrapper>
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
              {/* Back button and floating controls (desktop only) */}
              <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
                <BlogBackButton href="/blogs" />
                <div className="hidden sm:block">
                  <CopyMarkdownButton content={content} frontmatter={frontmatter} />
                </div>
                <BlogFloatingControls>
                  <CopyMarkdownButton content={content} frontmatter={frontmatter} orientation="vertical" />
                </BlogFloatingControls>
              </div>
              
              {/* Mobile bottom bar with controls */}
              <BlogMobileBottomBar />

              {/* Cover Image */}
              {frontmatter.imageUrl && (
                <BlogCoverImage src={frontmatter.imageUrl} alt={frontmatter.title} />
              )}

              {/* Header */}
              <BlogHeader
                title={frontmatter.title}
                description={frontmatter.description}
                date={frontmatter.date}
                readingTime={frontmatter.readingTime}
                author={frontmatter.author}
                tags={frontmatter.tags}
              >
                <BlogShareButton title={frontmatter.title} />
              </BlogHeader>

              {/* Sentinel for TOC visibility - placed right before content starts */}
              <div id="blog-content-start" className="h-0 w-0" aria-hidden="true" />

              {/* Fixed TOC for Desktop - renders outside the content flow */}
              <div className="hidden lg:block">
                <TableOfContents 
                  headings={headings} 
                  contentTriggerId="blog-content-start" 
                  contentEndId="blog-content-end"
                />
              </div>

              {/* Content Layout */}
              <div className="xl:ml-20 lg:mr-80 xl:mr-96">
                <div className="max-w-prose lg:max-w-[65ch] xl:max-w-[70ch]">
                  {/* Mobile TOC */}
                  <div className="lg:hidden mb-8">
                    <TableOfContents headings={headings} />
                  </div>

                  {/* Content */}
                  <div className="prose prose-invert prose-base sm:prose-lg max-w-none">
                    <BlogContent>
                      <MDXRemote
                        source={content}
                        options={{
                          mdxOptions: {
                            remarkPlugins: [remarkGfm],
                            rehypePlugins: [rehypeHighlight, rehypeSlug],
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
                </div>
              </div>

              {/* Sentinel for TOC to hide - placed at end of content */}
              <div id="blog-content-end" className="h-0 w-0" aria-hidden="true" />

              {/* Engagement Section */}
              <BlogEngagementSection slug={slug} />

              {/* Related Blogs */}
              {relatedBlogs.length > 0 && (
                <BlogRelatedSection>
                  <div className="flex flex-col gap-4">
                    {relatedBlogs.map((related) => (
                      <BlogRelatedCard
                        key={related.slug}
                        href={`/blogs/${related.slug}`}
                        imageUrl={related.frontmatter.imageUrl}
                        title={related.frontmatter.title}
                        description={related.frontmatter.description}
                        date={related.frontmatter.date}
                        readingTime={related.frontmatter.readingTime}
                        tags={related.frontmatter.tags}
                      />
                    ))}
                  </div>
                </BlogRelatedSection>
              )}

              {/* Footer */}
              <BlogFooterSection />
            </div>
          </BlogFontWrapper>
        </article>
      </BlogPageWrapper>
    </BlogProvider>
  );
}
