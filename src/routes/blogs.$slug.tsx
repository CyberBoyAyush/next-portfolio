import { createFileRoute, notFound } from '@tanstack/react-router';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { getBlogPageDataServer } from '@/lib/blog-functions';
import { blogHead, siteUrl } from '@/lib/seo';
import CodeBlock from '@/components/code-block';
import { LinkWithPreview } from '@/components/link-with-preview';
import { BlogImage } from '@/components/blog-image';
import CopyMarkdownButton from '@/components/copy-markdown-button';
import BlogContent, { BlogProvider, BlogFontWrapper, BlogFloatingControls } from '@/components/blog-content-wrapper';
import BlogShareButton from '@/components/blog-share-button';
import BlogEngagementSection from '@/components/blog-engagement-section';
import TableOfContents from '@/components/table-of-contents';
import BlogNavbar from '@/components/blog-navbar';
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
import blogContentCss from '@/styles/blog-content.css?url';
import highlightCss from 'highlight.js/styles/github-dark.css?url';

export const Route = createFileRoute('/blogs/$slug')({
  loader: ({ params }) => {
    if (!params.slug) throw notFound();
    return getBlogPageDataServer({ data: { slug: params.slug } });
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { links: [{ rel: 'stylesheet', href: blogContentCss }, { rel: 'stylesheet', href: highlightCss }] };
    const head = blogHead(loaderData.blog);
    return {
      ...head,
      links: [...head.links, { rel: 'stylesheet', href: blogContentCss }, { rel: 'stylesheet', href: highlightCss }],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { blog, relatedBlogs, headings } = Route.useLoaderData();
  const { slug, frontmatter, content } = blog;
  const blogUrl = `${siteUrl}/blogs/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.imageUrl || `${siteUrl}/icon.png`,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    author: { '@type': 'Person', name: frontmatter.author, url: siteUrl },
    publisher: {
      '@type': 'Person',
      name: 'Ayush Sharma',
      url: siteUrl,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/icon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': blogUrl },
    keywords: frontmatter.tags.join(', '),
    articleSection: 'Technology',
    inLanguage: 'en-US',
    wordCount: content.split(/\s+/).length,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blogs` },
      { '@type': 'ListItem', position: 3, name: frontmatter.title, item: blogUrl },
    ],
  };

  return (
    <BlogProvider>
      <style>{`body > header, body > div > header { display: none !important; } #main-mobile-nav { display: none !important; }`}</style>
      <BlogNavbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <BlogPageWrapper>
        <article className="py-8 md:py-16">
          <BlogFontWrapper>
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
              <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
                <BlogBackButton href="/blogs" />
                <div className="hidden sm:block">
                  <CopyMarkdownButton content={content} frontmatter={frontmatter} />
                </div>
                <BlogFloatingControls>
                  <CopyMarkdownButton content={content} frontmatter={frontmatter} orientation="vertical" />
                </BlogFloatingControls>
              </div>

              <BlogMobileBottomBar />
              {frontmatter.imageUrl && <BlogCoverImage src={frontmatter.imageUrl} alt={frontmatter.title} />}
              <BlogHeader title={frontmatter.title} description={frontmatter.description} date={frontmatter.date} readingTime={frontmatter.readingTime} author={frontmatter.author} tags={frontmatter.tags}>
                <BlogShareButton title={frontmatter.title} />
              </BlogHeader>

              <div id="blog-content-start" className="h-0 w-0" aria-hidden="true" />
              <div className="hidden lg:block">
                <TableOfContents headings={headings} contentTriggerId="blog-content-start" contentEndId="blog-content-end" />
              </div>

              <div className="xl:ml-20 lg:mr-80 xl:mr-96">
                <div className="max-w-prose lg:max-w-[65ch] xl:max-w-[70ch]">
                  <div className="lg:hidden mb-8">
                    <TableOfContents headings={headings} />
                  </div>
                  <div className="prose prose-invert prose-base sm:prose-lg max-w-none">
                    <BlogContent>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight, rehypeSlug]}
                        components={{
                          pre: ({ children, ...props }) => (
                            <CodeBlock>
                              <pre {...props}>{children}</pre>
                            </CodeBlock>
                          ),
                          a: ({ href, children, ...props }) => (
                            <LinkWithPreview href={href ?? '#'} {...props}>
                              {children}
                            </LinkWithPreview>
                          ),
                          img: ({ src, alt, ...props }) => {
                            const safeSrc = typeof src === 'string' ? src : '';
                            if (!safeSrc) return null;
                            return <BlogImage src={safeSrc} alt={alt ?? ''} {...props} />;
                          },
                        }}
                      >
                        {content}
                      </ReactMarkdown>
                    </BlogContent>
                  </div>
                </div>
              </div>

              <div id="blog-content-end" className="h-0 w-0" aria-hidden="true" />
              <BlogEngagementSection slug={slug} />
              {relatedBlogs.length > 0 && (
                <BlogRelatedSection>
                  <div className="flex flex-col gap-4">
                    {relatedBlogs.map((related) => (
                      <BlogRelatedCard key={related.slug} href={`/blogs/${related.slug}`} imageUrl={related.frontmatter.imageUrl} title={related.frontmatter.title} description={related.frontmatter.description} date={related.frontmatter.date} readingTime={related.frontmatter.readingTime} tags={related.frontmatter.tags} />
                    ))}
                  </div>
                </BlogRelatedSection>
              )}
              <BlogFooterSection />
            </div>
          </BlogFontWrapper>
        </article>
      </BlogPageWrapper>
    </BlogProvider>
  );
}
