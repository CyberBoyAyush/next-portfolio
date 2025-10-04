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
  title: "Ayush Sharma | Portfolio",
  description: "Personal portfolio website of Ayush Sharma, showcasing skills, projects, and contact information",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark !scroll-smooth" suppressHydrationWarning>
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
