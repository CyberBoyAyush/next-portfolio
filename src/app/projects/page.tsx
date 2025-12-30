import { Metadata } from 'next';
import ProjectsClient from './projects-client';

export const metadata: Metadata = {
  title: 'Projects | Ayush Sharma',
  description: 'Explore my portfolio of web development and AI projects including CappyChat, Bucket Buddy, TuduAI, and more. Built with React, Next.js, TypeScript, and modern technologies.',
  openGraph: {
    title: 'Projects | Ayush Sharma',
    description: 'Explore my portfolio of web development and AI projects including CappyChat, Bucket Buddy, TuduAI, and more.',
    type: 'website',
    url: '/projects',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Ayush Sharma',
    description: 'Explore my portfolio of web development and AI projects.',
  },
  alternates: {
    canonical: '/projects',
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
