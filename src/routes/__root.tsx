import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Spotlight from '@/components/spotlight';
import OnekoCat from '@/components/oneko-cat';
import CappyBot from '@/components/cappy-bot';
import { rootHead, siteUrl } from '@/lib/seo';
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
    url: siteUrl,
    image: 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPlhi1W0hsc5pTOzgtJsIUQNxveLu9Gr6FBYjX',
    jobTitle: 'Chief Technology Officer',
    worksFor: { '@type': 'Organization', name: 'Kakiyo OÜ' },
    description: 'Chief Technology Officer, Full Stack Developer, and AI Engineer focused on backend-heavy AI applications, scalable systems, low-latency architecture, and end-to-end product execution.',
    knowsAbout: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'AI/ML', 'Applied AI', 'LLM Integration', 'OpenRouter', 'Vercel AI SDK', 'Cloud Architecture', 'AWS', 'Docker', 'PostgreSQL', 'PlanetScale', 'MongoDB', 'Backend Architecture', 'Scalable Systems'],
    sameAs: ['https://github.com/cyberboyayush', 'https://linkedin.com/in/cyberboyayush', 'https://twitter.com/cyberboyayush'],
    email: 'hi@aysh.me',
    telephone: '+91-9990969661',
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ayush Sharma Portfolio',
    url: siteUrl,
    description: 'Portfolio of a Full Stack Developer and AI Engineer, currently Chief Technology Officer at Kakiyo OÜ, building backend-heavy AI applications, scalable systems, case studies, and technical writing with React, Next.js, TypeScript, and production AI integrations.',
    author: { '@type': 'Person', name: 'Ayush Sharma' },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/blogs?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className="dark !scroll-smooth" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body
        className="font-geist antialiased bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col overflow-x-hidden selection:bg-gray-600/30 selection:text-white transition-colors duration-300"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Spotlight />
          <div className="fixed inset-0 opacity-[0.03] bg-[url('/noise.svg')] pointer-events-none z-[-1]" />
          <Navbar />
          <main className="flex-grow relative">
            <Outlet />
          </main>
          <OnekoCat />
          <CappyBot />
          <Footer />
        </ThemeProvider>
        <script defer src="https://stats.ayush-sharma.in/script.js" data-website-id="da6760a3-fa2d-4b1f-85f6-14ed18ebdf92" />
        <Scripts />
      </body>
    </html>
  );
}
