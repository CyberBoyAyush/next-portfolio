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
    description: 'Progressed from Full Stack Developer to CTO. Run kakiyo.com at 5M+ requests/day — architecture, reliability, hiring, and shipping on a custom stack built for this scale.',
    responsibilities: [
      'Operate kakiyo.com at 5M+ requests/day for 10K+ users and 9K+ teams.',
      'Led a zero-downtime Appwrite to PlanetScale migration: 35+ tables, 40M+ rows, with rollback paths.',
      'Replaced Appwrite primitives (auth, realtime, database, email) with a custom stack built for this scale.',
      'Cut P50 latency from 2.8s to 20ms (P90: 90ms), dropped error rate ~90%, with near-100% uptime.',
      'Cut infrastructure from $1,200/mo to $200/mo.',
      'Ship features end-to-end on that stack — spec to production.',
      'Built the hiring pipeline and run the team across delivery, reviews, and technical direction.',
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
