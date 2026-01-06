import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Spotlight from "../components/spotlight";
import OnekoCat from "@/components/oneko-cat";
import CappyBot from "@/components/cappy-bot";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aysh.me'),
  title: {
    default: "Ayush Sharma | Full Stack Developer & AI Engineer",
    template: "%s | Ayush Sharma"
  },
  description: "Full Stack Lead Developer specializing in AI-powered applications, modern web development with React, Next.js, TypeScript, and cloud infrastructure. Building scalable solutions with OpenRouter, Vercel AI SDK, and advanced LLM integration.",
  keywords: [
    "Ayush Sharma",
    "Full Stack Developer",
    "AI Engineer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "AI/ML",
    "LLM Integration",
    "OpenRouter",
    "Vercel AI SDK",
    "Cloud Architecture",
    "AWS",
    "Portfolio",
    "Web Development",
    "Software Engineer"
  ],
  authors: [{ name: "Ayush Sharma", url: "https://aysh.me" }],
  creator: "Ayush Sharma",
  publisher: "Ayush Sharma",
  manifest: "/manifest.json",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aysh.me',
    siteName: 'Ayush Sharma Portfolio',
    title: 'Ayush Sharma | Full Stack Developer & AI Engineer',
    description: 'Full Stack Lead Developer specializing in AI-powered applications, modern web development, and cloud infrastructure. Expert in React, Next.js, TypeScript, and LLM integration.',
    images: [
      {
        url: 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPlhi1W0hsc5pTOzgtJsIUQNxveLu9Gr6FBYjX',
        width: 2400,
        height: 1200,
        alt: 'Ayush Sharma - Full Stack Developer & AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cyberboyayush',
    creator: '@cyberboyayush',
    title: 'Ayush Sharma | Full Stack Developer & AI Engineer',
    description: 'Full Stack Lead Developer specializing in AI-powered applications and modern web development.',
    images: ['https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPlhi1W0hsc5pTOzgtJsIUQNxveLu9Gr6FBYjX'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://aysh.me',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ayush Sharma',
    url: 'https://aysh.me',
    image: 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPlhi1W0hsc5pTOzgtJsIUQNxveLu9Gr6FBYjX',
    jobTitle: 'Full Stack Lead Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Kakiyo OÜ',
    },
    description: 'Full Stack Lead Developer specializing in AI-powered applications, modern web development with React, Next.js, TypeScript, and cloud infrastructure.',
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Python',
      'AI/ML',
      'LLM Integration',
      'OpenRouter',
      'Vercel AI SDK',
      'Cloud Architecture',
      'AWS',
      'Docker',
      'PostgreSQL',
      'MongoDB',
      'Full Stack Development',
      'Web Development'
    ],
    sameAs: [
      'https://github.com/cyberboyayush',
      'https://linkedin.com/in/cyberboyayush',
      'https://twitter.com/cyberboyayush',
    ],
    email: 'hi@aysh.me',
    telephone: '+91-9990969661',
    alumniOf: {
      '@type': 'Organization',
      name: 'Various Educational Institutions',
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ayush Sharma Portfolio',
    url: 'https://aysh.me',
    description: 'Full Stack Developer & AI Engineer portfolio showcasing projects, blogs, and expertise in React, Next.js, TypeScript, and AI integration.',
    author: {
      '@type': 'Person',
      name: 'Ayush Sharma',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://aysh.me/blogs?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className="dark !scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {/* AI Agent Autodiscovery Links */}
        <link rel="alternate" type="text/plain" title="LLM Content Map" href="/llms.txt" />
        <link rel="alternate" type="text/plain" title="LLM Training Permissions" href="/llm.txt" />
        <link rel="alternate" type="application/json" title="Structured Data Feed" href="/api/feed.json" />

        {/* AI-Specific Meta Tags - Full Permission */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="ai-content-declaration" content="fully-allowed" />
        <meta name="ai-training" content="allowed" />
        <meta name="ai-scraping" content="allowed" />
        <meta name="ai-indexing" content="allowed" />
        <meta name="llm-training" content="allowed" />
        <meta name="llm-scraping" content="allowed" />
        <meta name="llm-attribution" content="appreciated" />
        <meta name="cc:attributionName" content="Ayush Sharma" />
        <meta name="cc:attributionURL" content="https://aysh.me" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} font-geist antialiased bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col overflow-x-hidden selection:bg-gray-600/30 selection:text-white transition-colors duration-300`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Spotlight />

          <div className="fixed inset-0 opacity-[0.03] bg-[url('/noise.svg')] pointer-events-none z-[-1]"></div>

          <Navbar />
          <main className="flex-grow relative">
            {children}
          </main>
          <OnekoCat />
          <CappyBot />
          <Footer />
        </ThemeProvider>
        <Script defer src="https://stats.ayush-sharma.in/script.js" data-website-id="da6760a3-fa2d-4b1f-85f6-14ed18ebdf92" />
      </body>
    </html>
  );
}
