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
    title: 'AVChat',
    description: 'Fastest LLM chat on the planet right now. Supports real time sync too.',
    image: '/images/projects/AV.png',
    tags: ['NextJS', 'Appwrite', 'OpenRouter', 'Realtime API', 'Convex', 'Vercel'],
    demoLink: 'https://avchat.ayush-sharma.in/',
    featured: true,
    year: '2025',
    duration: '15 Days',
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 2,
    title: 'TuduAI',
    description: ' An AI-powered productivity app with natural language task creation, collaborative workspaces, and a minimalist UI for effortless planning.',
    image: '/images/projects/tuduai.png',
    tags: ["React", "Javascript", "TailwindCSS", "Appwrite", "OpenAi API", "Clerk"],
    demoLink: 'https://tuduai.vercel.app/',
    featured: true,
    year: '2025',
    duration: '15 Days',
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 3,
    title: 'QuickBang',
    description: 'Lightning-fast search shortcuts to enhance your workflow.',
    image: '/images/projects/quickbang.png',
    tags: ["React", "Typecript", "Browser Engine"],
    demoLink: 'https://quickbang.vercel.app/',
    githubLink: 'https://github.com/cyberboyayush/quickbang',
    featured: true,
    year: '2025',
    duration: '5 Days',
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 4,
    title: 'Effisense',
    description: 'Experience the future of productivity with AI-powered task scheduling, smart prioritization, and intelligent workload balancing.',
    image: '/images/projects/effisense.png',
    tags: ["React", "Google API", "GROQ", "Appwrite", "TailwindCSS", "Recharts"],
    demoLink: 'https://effisense.ayush-sharma.in/',
    githubLink: 'https://github.com/cyberboyayush/effisense',
    featured: true,
    year: '2025',
    duration: '3 months',
    color: 'from-indigo-600 to-purple-600',
  },
  {
    id: 5,
    title: 'SkillCompass',
    description: 'Unlock your potential with AI-powered personalized learning paths, interactive content, and real-time progress tracking.',
    image: '/images/projects/skillcompass.png',
    tags: ["React", "Gemini", "Appwrite", "TailwindCSS", "Groq", "Llama 3.3"],
    demoLink: 'https://skillcompass.ayush-sharma.in/',
    githubLink: 'https://github.com/glucon-d/skillcompass',
    featured: true,
    year: '2025',
    duration: '72 Hours',
    color: 'from-indigo-600 to-purple-600',
    isHackathonProject: true
  },
  {
    id: 6,
    title: 'Pathgenie',
    description: 'AI powered career guidance platform for personalized career recommendations.',
    image: '/images/projects/pathgenie.png',
    tags: ["React", "Gemini", "Appwrite", "TailwindCSS", "Groq", "Llama 3.3"],
    demoLink: 'https://pathgenie.ayush-sharma.in/',
    githubLink: 'https://github.com/glucon-d/pathgenie',
    featured: true,
    year: '2025',
    duration: '2 months',
    color: 'from-blue-600 to-cyan-600',
    isHackathonProject: true
  },
  {
    id: 7,
    title: 'PortDev',
    description: 'Create Devloper Portfolio in Minutes.',
    image: '/images/projects/portdev.png',
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
    image: '/images/projects/react-portfolio.png',
    tags: ["React", "TailwindCSS", "Framer Motion", "Particles.js"],
    demoLink: 'https://cyberboyayush.in/',
    githubLink: 'https://github.com/cyberboyayush/React-Portfolio',
    featured: false,
    year: '2025',
    duration: '5 days',
    color: 'from-violet-600 to-purple-600'
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
