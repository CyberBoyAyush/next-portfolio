import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";
import ParticlesBackground from "../components/ParticlesBackground";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark !scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white min-h-screen flex flex-col overflow-x-hidden selection:bg-purple-500/30 selection:text-white`}
      >
        <div className="hidden md:block">
          <CustomCursor />
        </div>
        
        <ParticlesBackground variant="network" />
        
        <div className="fixed inset-0 opacity-[0.03] bg-[url('/noise.svg')] pointer-events-none z-[-1]"></div>
        
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
