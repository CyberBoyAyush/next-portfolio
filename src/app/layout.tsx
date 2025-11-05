import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spotlight from "../components/Spotlight";
import OnekoCat from "@/components/OnekoCat";
import Script  from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
  icons: {
    icon: [
      {
        url: '/icon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    apple: {
      url: '/favicon/favicon.png',
      sizes: '180x180',
      type: 'image/png',
    },
    shortcut: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aysh.me',
    siteName: 'Ayush Sharma Portfolio',
    title: 'Ayush Sharma | Full Stack Developer & AI Engineer',
    description: 'Full Stack Lead Developer specializing in AI-powered applications, modern web development, and cloud infrastructure. Expert in React, Next.js, TypeScript, and LLM integration.',
    images: [
      {
        url: '/icon.png',
        width: 1200,
        height: 630,
        alt: 'Ayush Sharma - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cyberboyayush',
    creator: '@cyberboyayush',
    title: 'Ayush Sharma | Full Stack Developer & AI Engineer',
    description: 'Full Stack Lead Developer specializing in AI-powered applications and modern web development.',
    images: ['/icon.png'],
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ayush Sharma',
    url: 'https://aysh.me',
    image: 'https://aysh.me/icon.png',
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
    email: 'contact@ayush-sharma.in',
    alumniOf: {
      '@type': 'Organization',
      name: 'Various Educational Institutions',
    },
  };

  return (
    <html lang="en" className="dark !scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* AI Agent Autodiscovery Links */}
        <link rel="alternate" type="text/plain" title="LLM Content Map" href="/llms.txt" />
        <link rel="alternate" type="text/plain" title="LLM Training Permissions" href="/llm.txt" />
        <link rel="alternate" type="application/json" title="Structured Data Feed" href="/api/feed.json" />

        {/* AI-Specific Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="ai-content-declaration" content="training-allowed-with-attribution" />
        <meta name="llm-training" content="allowed" />
        <meta name="llm-attribution" content="required" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0D1117] text-white min-h-screen flex flex-col overflow-x-hidden selection:bg-gray-600/30 selection:text-white`}
        suppressHydrationWarning
      >
        <Spotlight />

        <div className="fixed inset-0 opacity-[0.03] bg-[url('/noise.svg')] pointer-events-none z-[-1]"></div>

        <Navbar />
        <main className="flex-grow relative">
          {children}
        </main>
        <OnekoCat />
        <Footer />
        <Script defer src="https://stats.ayush-sharma.in/script.js" data-website-id="da6760a3-fa2d-4b1f-85f6-14ed18ebdf92" />
      </body>
    </html>
  );
}
