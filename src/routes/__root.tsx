import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import { ThemeProvider } from '@/components/theme-provider';
import { AudienceProvider } from '@/context/audience-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Spotlight from '@/components/spotlight';
import OnekoCat from '@/components/oneko-cat';
import CappyBot from '@/components/cappy-bot';
import { rootHead, siteUrl, heroProfileImage } from '@/lib/seo';
import appCss from '@/styles/globals.css?url';
import terminalCss from '@/styles/terminal.css?url';

export const Route = createRootRoute({
  head: () => ({
    ...rootHead(),
    links: [
      ...rootHead().links,
      { rel: 'stylesheet', href: appCss },
      { rel: 'stylesheet', href: terminalCss },
    ],
  }),
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-32 text-center">
      <h1 className="text-4xl font-bold text-white">Page not found</h1>
      <p className="mt-4 text-gray-400">The page you are looking for does not exist.</p>
    </div>
  ),
  component: RootComponent,
});

function RootComponent() {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ayush Sharma',
    alternateName: ['CyberBoyAyush', '@theayush'],
    url: siteUrl,
    image: heroProfileImage,
    jobTitle: 'Chief Technology Officer',
    worksFor: {
      '@type': 'Organization',
      name: 'Kakiyo OÜ',
      url: 'https://kakiyo.com',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Delhi',
      addressCountry: 'IN',
    },
    description:
      'AI-first engineer and Chief Technology Officer at Kakiyo OÜ. Builds production AI products end-to-end and ships custom plugins for the AI tooling ecosystem (MemContext, Zenox, Plnr). Positioning: "Tell me the outcome. I will ship it." Best fit for founders.',
    knowsAbout: [
      'AI-first Engineering',
      'AI Agents',
      'Model Context Protocol (MCP)',
      'Retrieval-Augmented Generation (RAG)',
      'Tool Calling',
      'OpenRouter',
      'Vercel AI SDK',
      'Anthropic Claude',
      'OpenAI',
      'Google Gemini',
      'GROQ',
      'Llama',
      'Exa AI',
      'React',
      'Next.js',
      'TanStack Start',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Bun',
      'Hono',
      'Python',
      'PostgreSQL',
      'PlanetScale',
      'MongoDB',
      'Appwrite',
      'Supabase',
      'Drizzle ORM',
      'Prisma',
      'GraphQL',
      'AWS',
      'Docker',
      'Cloudflare',
      'Vercel',
      'Railway',
      'Nitro',
      'Backend Architecture',
      'Low-latency Systems',
      'Scalable Systems',
      'Founding Engineering',
      'Fractional CTO',
    ],
    sameAs: [
      'https://github.com/cyberboyayush',
      'https://linkedin.com/in/cyberboyayush',
      'https://x.com/theayush',
      'https://memcontext.in',
      'https://cappychat.com',
      'https://www.npmjs.com/package/zenox',
      'https://www.npmjs.com/package/plnr',
    ],
    email: 'hi@aysh.me',
    telephone: '+91-9990969661',
    hasOccupation: {
      '@type': 'Occupation',
      name: 'AI-first Engineer & Chief Technology Officer',
      occupationLocation: { '@type': 'Country', name: 'India' },
      skills:
        'AI-first engineering, full-stack product delivery, MCP integrations, custom plugin development, backend architecture, founding-engineer execution',
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ayush Sharma Portfolio',
    url: siteUrl,
    description:
      'Portfolio of Ayush Sharma — AI-first engineer and CTO at Kakiyo OÜ. Two homepage modes: Founder Mode (default, outcome-led) and Engineer Mode (technical-deep). Showcases live products (MemContext, Zenox, Plnr, CappyChat), case studies, and technical writing.',
    author: { '@type': 'Person', name: 'Ayush Sharma' },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/blogs?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const professionalServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Ayush Sharma — Founding Engineer / Fractional CTO',
    url: siteUrl,
    provider: { '@type': 'Person', name: 'Ayush Sharma', url: siteUrl },
    serviceType: [
      'Zero-to-MVP product engineering',
      'AI layer architecture (agents, RAG, MCP, tool calling)',
      'Custom plugins and integrations (MCP servers, CLIs, IDE plugins)',
      'Stalled-codebase rescue',
      'Fractional CTO / founding engineer engagements',
    ],
    areaServed: { '@type': 'Place', name: 'Remote / Global' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Founders and startup teams building AI products, dev tools, or backend-heavy systems',
    },
  };

  return (
    <html lang="en" className="dark !scroll-smooth" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }} />
      </head>
      <body
        className="font-geist antialiased bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col overflow-x-hidden selection:bg-gray-600/30 selection:text-white transition-colors duration-300"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AudienceProvider>
            <Spotlight />
            <div className="fixed inset-0 opacity-[0.03] bg-[url('/noise.svg')] pointer-events-none z-[-1]" />
            <Navbar />
            <main className="flex-grow relative">
              <Outlet />
            </main>
            <OnekoCat />
            <CappyBot />
            <Footer />
          </AudienceProvider>
        </ThemeProvider>
        <script defer src="https://stats.ayush-sharma.in/script.js" data-website-id="da6760a3-fa2d-4b1f-85f6-14ed18ebdf92" />
        <Scripts />
      </body>
    </html>
  );
}
