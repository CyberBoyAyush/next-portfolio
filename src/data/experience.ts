export interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  startDate: string;
  endDate?: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  location: string;
  color: string;
  logo?: string;
  current: boolean;
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: 'Kakiyo OÜ',
    position: 'Full Stack Lead Developer',
    duration: 'July 2025 - Present',
    startDate: 'July 2025',
    description: 'Leading full-stack development initiatives, architecting scalable solutions, and driving technical excellence in modern web applications.',
    responsibilities: [
      'Built AI-powered LinkedIn automation platform with Next.js/React, improving client outreach engagement by 70%',
      'Reduced Appwrite costs by 70% through query optimization and caching, maintaining sub-100ms API response times',
      'Shipped production features rapidly with 99.9% uptime, iterating based on real-time user feedback',
      'Architect and implement scalable backend systems with modern cloud infrastructure',
      'Lead technical decisions and mentor development teams on best practices',
      'Drive performance optimization initiatives across full-stack applications'
    ],
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'AWS',
      'Docker',
      'TailwindCSS',
      'Prisma',
      'GraphQL'
    ],
    location: 'Remote',
    color: 'from-blue-600 to-indigo-600',
    logo: '/images/kakiyo.png',
    current: true
  }
];

// Helper functions
export const getCurrentExperience = (): Experience | undefined => {
  return experiences.find(exp => exp.current);
};

export const getAllExperiences = (): Experience[] => {
  return experiences.sort((a, b) => {
    // Sort by current first, then by start date (most recent first)
    if (a.current && !b.current) return -1;
    if (!a.current && b.current) return 1;
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
};

export const getExperienceById = (id: number): Experience | undefined => {
  return experiences.find(exp => exp.id === id);
};
