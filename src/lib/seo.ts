import type { BlogPost } from '@/types/blog';
import type { Project } from '@/data/projects';
import { getOptimizedImageSrc } from '@/lib/image-optimization';

export const siteUrl = 'https://aysh.me';
export const siteName = 'Ayush Sharma Portfolio';
export const defaultOgImage = 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPlhi1W0hsc5pTOzgtJsIUQNxveLu9Gr6FBYjX';
export const blogOgImage = 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPpI4L2UUj5BXoEqJIk6cGWnQRgCupb9K7ijPt';
// Clean, professional headshot — used in Founder Mode and as the canonical
// SEO / OG / preload image. Founders want a clear, trustworthy face.
export const heroProfileImage = 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPWUHGCk89NTOdPBya4zEtewIFUr87S6hJn1Dq';

// Moody, terminal-aesthetic portrait — used in Engineer Mode where the
// darker visual language matches the rest of the technical-deep flow.
export const heroProfileImageEngineer = 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPhWVT9F8tcdLGNp9S0ETXmuk4jy87UFaBIrYw';

const ROOT_TITLE = 'Ayush Sharma | AI-first Engineer & CTO at Kakiyo';
const ROOT_DESCRIPTION = 'AI-first engineer and CTO at Kakiyo OÜ. I build production AI products end-to-end and ship custom plugins for the tools I use — MemContext (MCP memory layer), Zenox (OpenCode agents), Plnr (AI planning CLI). 140× latency wins, 50% infra cost cuts, end-to-end features. Best fit for founders.';
const ROOT_TWITTER_DESCRIPTION = 'AI-first engineer and CTO. I ship production AI products and custom plugins for the tools I use. Tell me the outcome — I\'ll ship it.';

export function rootHead() {
  return {
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: ROOT_TITLE },
      { name: 'description', content: ROOT_DESCRIPTION },
      { name: 'keywords', content: 'Ayush Sharma, AI engineer, AI-first engineer, Chief Technology Officer, CTO, Kakiyo, Founding Engineer, Fractional CTO, MemContext, Zenox, Plnr, MCP, Model Context Protocol, AI plugins, OpenCode plugin, AI CLI, Full Stack Developer, React, Next.js, TanStack Start, TypeScript, Node.js, Python, OpenRouter, Vercel AI SDK, Anthropic Claude, OpenAI, Gemini, PostgreSQL, PlanetScale, AWS, Docker, Cloudflare, Portfolio, Hire AI engineer, Hire founding engineer' },
      { name: 'author', content: 'Ayush Sharma' },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:url', content: siteUrl },
      { property: 'og:site_name', content: siteName },
      { property: 'og:title', content: ROOT_TITLE },
      { property: 'og:description', content: ROOT_DESCRIPTION },
      { property: 'og:image', content: defaultOgImage },
      { property: 'og:image:width', content: '2400' },
      { property: 'og:image:height', content: '1200' },
      { property: 'og:image:alt', content: 'Ayush Sharma — AI-first Engineer and CTO at Kakiyo' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@theayush' },
      { name: 'twitter:creator', content: '@theayush' },
      { name: 'twitter:title', content: ROOT_TITLE },
      { name: 'twitter:description', content: ROOT_TWITTER_DESCRIPTION },
      { name: 'twitter:image', content: defaultOgImage },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'ai-content-declaration', content: 'fully-allowed' },
      { name: 'ai-training', content: 'allowed' },
      { name: 'ai-scraping', content: 'allowed' },
      { name: 'ai-indexing', content: 'allowed' },
      { name: 'ai-retrieval', content: 'allowed' },
      { name: 'llm-training', content: 'allowed' },
      { name: 'llm-scraping', content: 'allowed' },
      { name: 'llm-retrieval', content: 'allowed' },
      { name: 'llm-attribution', content: 'appreciated' },
      { name: 'cc:attributionName', content: 'Ayush Sharma' },
      { name: 'cc:attributionURL', content: siteUrl },
    ],
    links: [
      { rel: 'preconnect', href: 'https://1kf0b6y5pd.ufs.sh', crossOrigin: 'anonymous' as const },
      { rel: 'dns-prefetch', href: 'https://1kf0b6y5pd.ufs.sh' },
      { rel: 'preconnect', href: 'https://res.cloudinary.com', crossOrigin: 'anonymous' as const },
      { rel: 'dns-prefetch', href: 'https://res.cloudinary.com' },
      { rel: 'preload', as: 'image', href: getOptimizedImageSrc(heroProfileImage, 256, 80), fetchPriority: 'high' as const },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon/favicon.png' },
      { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/favicon/favicon.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/icon.png' },
      { rel: 'shortcut icon', href: '/icon.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'canonical', href: siteUrl },
      { rel: 'alternate', type: 'text/plain', title: 'LLM Content Map', href: '/llms.txt' },
      { rel: 'alternate', type: 'text/plain', title: 'LLM Training Permissions', href: '/llm.txt' },
      { rel: 'alternate', type: 'application/json', title: 'Structured Data Feed', href: '/api/feed.json' },
    ],
  };
}

export function blogListHead() {
  return {
    meta: [
      { title: 'Blog | Ayush Sharma' },
      { name: 'description', content: 'In-depth articles on web development, AI, React, Next.js, TypeScript, and modern technology. Learn about LLMs, system design, and best practices.' },
      { property: 'og:title', content: 'Blog | Ayush Sharma' },
      { property: 'og:description', content: 'In-depth articles on web development, AI, React, Next.js, TypeScript, and modern technology.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `${siteUrl}/blogs` },
      { property: 'og:image', content: blogOgImage },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Blog | Ayush Sharma' },
      { name: 'twitter:description', content: 'In-depth articles on web development, AI, and modern technology.' },
      { name: 'twitter:image', content: blogOgImage },
    ],
    links: [{ rel: 'canonical', href: `${siteUrl}/blogs` }],
  };
}

export function blogHead(blog: BlogPost) {
  const image = blog.frontmatter.imageUrl;
  return {
    meta: [
      { title: `${blog.frontmatter.title} | Ayush Sharma` },
      { name: 'description', content: blog.frontmatter.description },
      { name: 'keywords', content: blog.frontmatter.tags.join(', ') },
      { property: 'og:title', content: blog.frontmatter.title },
      { property: 'og:description', content: blog.frontmatter.description },
      { property: 'og:type', content: 'article' },
      { property: 'article:published_time', content: blog.frontmatter.date },
      { property: 'article:author', content: blog.frontmatter.author },
      { property: 'og:url', content: `${siteUrl}/blogs/${blog.slug}` },
      { property: 'og:site_name', content: 'Ayush Sharma' },
      ...(image ? [{ property: 'og:image', content: image }, { name: 'twitter:image', content: image }] : []),
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: blog.frontmatter.title },
      { name: 'twitter:description', content: blog.frontmatter.description },
      { name: 'twitter:creator', content: '@cyberboyayush' },
    ],
    links: [{ rel: 'canonical', href: `${siteUrl}/blogs/${blog.slug}` }],
  };
}

export function projectsHead() {
  return {
    meta: [
      { title: 'Projects | Ayush Sharma' },
      { name: 'description', content: 'Explore my portfolio of web development and AI projects including CappyChat, Bucket Buddy, TuduAI, and more. Built with React, Next.js, TypeScript, and modern technologies.' },
      { property: 'og:title', content: 'Projects | Ayush Sharma' },
      { property: 'og:description', content: 'Explore my portfolio of web development and AI projects including CappyChat, Bucket Buddy, TuduAI, and more.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `${siteUrl}/projects` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Projects | Ayush Sharma' },
      { name: 'twitter:description', content: 'Explore my portfolio of web development and AI projects.' },
    ],
    links: [{ rel: 'canonical', href: `${siteUrl}/projects` }],
  };
}

export function projectHead(project: Project) {
  return {
    meta: [
      { title: `${project.title} | Projects | Ayush Sharma` },
      { name: 'description', content: project.description },
      { name: 'keywords', content: project.tags.join(', ') },
      { property: 'og:title', content: `${project.title} - Project by Ayush Sharma` },
      { property: 'og:description', content: project.description },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: `${siteUrl}/projects/${project.slug}` },
      { property: 'og:image', content: project.image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: `${project.title} project screenshot` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: project.title },
      { name: 'twitter:description', content: project.description },
      { name: 'twitter:image', content: project.image },
      { name: 'twitter:creator', content: '@cyberboyayush' },
    ],
    links: [{ rel: 'canonical', href: `${siteUrl}/projects/${project.slug}` }],
  };
}
