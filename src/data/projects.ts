export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink?: string;
  githubLink?: string;
  featured: boolean;
  year: string;
  duration: string;
  color: string;
  isHackathonProject?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Bucket Buddy',
    description: 'Modern Cloud Storage Management',
    image: 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPI5rAcrjSq8BcalUnAK51orufTp2SNkO7GxHz',
    tags: ['NextJS', 'Prisma', 'Postgres', 'AWS API', 'TailwindCSS', 'VPS'],
    demoLink: 'https://bucketbuddy.aysh.me/',
    githubLink: 'https://github.com/cyberboyayush/bucketbuddy',
    featured: true,
    year: '2025',
    duration: '7 Days',
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 2,
    title: 'AVChat',
    description: 'Fastest LLM chat on the planet right now, Multi Model and Realtime Sync too',
    image: 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPZM6OMJNYVhDAoFJpwBTRvjuNX3c1dgE7CIGe',
    tags: ['NextJS', 'Appwrite', 'OpenRouter', 'Realtime API', 'Convex', 'Vercel'],
    demoLink: 'https://avchat.xyz/',
    githubLink: 'https://github.com/cyberboyayush/AVChat',
    featured: true,
    year: '2025',
    duration: '15 Days',
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 3,
    title: 'TuduAI',
    description: ' An AI-powered productivity app with natural language task creation, collaborative workspaces, and a minimalist UI for effortless planning.',
    image: 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPFe7ghJ5FxlZUcq1BwOub9PyMKG7d26vQfaTC',
    tags: ["React", "Javascript", "TailwindCSS", "Appwrite", "OpenAi API", "Clerk"],
    demoLink: 'https://tuduai.aysh.me/',
    githubLink: 'https://github.com/cyberboyayush/tuduai',
    featured: true,
    year: '2025',
    duration: '15 Days',
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 4,
    title: 'QuickBang',
    description: 'Lightning-fast search shortcuts to enhance your workflow.',
    image: 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAP4yZsxBVEKBr0gueU6fJkSAaYjWMON8X2HPdV',
    tags: ["React", "Typecript", "Browser Engine"],
    demoLink: 'https://quickbang.aysh.me/',
    githubLink: 'https://github.com/cyberboyayush/quickbang',
    featured: false,
    year: '2025',
    duration: '5 Days',
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 5,
    title: 'Effisense',
    description: 'Experience the future of productivity with AI-powered task scheduling, smart prioritization, and intelligent workload balancing.',
    image: 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPfgNH3bZTmUXblVz2o8y4iIF6cHMBLqAhke5Y',
    tags: ["React", "Google API", "GROQ", "Appwrite", "TailwindCSS", "Recharts", "Google Calendar API"],
    demoLink: 'https://effisense.ayush-sharma.in/',
    githubLink: 'https://github.com/cyberboyayush/effisense',
    featured: true,
    year: '2025',
    duration: '3 months',
    color: 'from-indigo-600 to-purple-600',
  },
  {
    id: 6,
    title: 'SkillCompass',
    description: 'Unlock your potential with AI-powered personalized learning paths, interactive content, and real-time progress tracking.',
    image: 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPUFlBGN1k8DdHYcXLswQzrg6SM7qbVytx3Npf',
    tags: ["React", "Gemini", "Appwrite", "TailwindCSS", "Groq", "Llama 3.3"],
    demoLink: 'https://skillcompass.ayush-sharma.in/',
    githubLink: 'https://github.com/glucon-d/skillcompass',
    featured: false,
    year: '2025',
    duration: '72 Hours',
    color: 'from-indigo-600 to-purple-600',
    isHackathonProject: true
  },
  {
    id: 7,
    title: 'PortDev',
    description: 'Create Devloper Portfolio in Minutes.',
    image: 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPiVdP9VfLSeCsIaE1NktK9ur3Tyv6x4QMqg8z',
    tags: ["React", "Firebase", "TailwindCSS", "Framer Motion"],
    demoLink: 'https://portdevv.vercel.app/',
    githubLink: 'https://github.com/cyberboyayush/portdev',
    featured: false,
    year: '2025',
    duration: '1.5 months',
    color: 'from-rose-600 to-pink-600'
  },
  {
    id: 8,
    title: 'React Portfolio',
    description: 'Personal Portfolio Website using React Js',
    image: 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPIh52zvSq8BcalUnAK51orufTp2SNkO7GxHzm',
    tags: ["React", "TailwindCSS", "Framer Motion", "Particles.js"],
    demoLink: 'https://cyberboyayush.vercel.app/',
    githubLink: 'https://github.com/cyberboyayush/React-Portfolio',
    featured: false,
    year: '2025',
    duration: '5 days',
    color: 'from-indigo-600 to-purple-600'
  }
];

// Helper functions
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

export const getAllProjects = (): Project[] => {
  return projects;
};

export const getProjectById = (id: number): Project | undefined => {
  return projects.find(project => project.id === id);
};
