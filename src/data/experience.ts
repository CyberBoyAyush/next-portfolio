export interface Role {
  title: string;
  type: string;
  duration: string;
  startDate: string;
  endDate?: string;
}

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
  roles?: Role[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: 'Kakiyo OÜ',
    position: 'Chief Technology Officer',
    duration: 'July 2025 - Present',
    startDate: 'July 2025',
    description: 'Progressed from Full Stack Developer to CTO while leading backend architecture, AI product delivery, hiring, and infrastructure decisions for Kakiyo.',
    responsibilities: [
      'Migrated millions of rows from Appwrite to PlanetScale.',
      'Lowered latency from 2.8 seconds (P50) to 20 ms (P50) and 90 ms (P90).',
      'Removed latency bottlenecks across critical user flows.',
      'Crafted end-to-end features from product requirements to production rollout.',
      'Created the hiring pipeline for the company.',
      'Managed the team across delivery, reviews, and technical direction.',
      'Reduced the overall infrastructure cost by 50%.'
    ],
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'PlanetScale',
      'AWS',
      'Docker',
      'TailwindCSS',
      'Prisma',
      'GraphQL'
    ],
    location: 'Remote',
    color: 'from-blue-600 to-indigo-600',
    logo: '/images/kakiyo.png',
    current: true,
    roles: [
      {
        title: 'Chief Technology Officer',
        type: 'Full-time',
        duration: 'Apr 2026 - Present',
        startDate: 'Apr 2026'
      },
      {
        title: 'Lead Developer',
        type: 'Full-time',
        duration: 'Sep 2025 - Apr 2026',
        startDate: 'Sep 2025',
        endDate: 'Apr 2026'
      },
      {
        title: 'Full Stack Developer',
        type: 'Part-time',
        duration: 'Jul 2025 - Sep 2025',
        startDate: 'July 2025',
        endDate: 'Sep 2025'
      }
    ]
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
