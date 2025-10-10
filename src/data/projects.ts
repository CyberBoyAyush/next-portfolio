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
  slug: string;
  detailedDescription: string;
  challenges: string[];
  videoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Plnr',
    description: 'CLI Based AI Tool for planning out implementations with code context',
    image: 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPOlniThGfXwQSdnq1mVN6FjDvZ2PBJOhHc8oa',
    tags: ['Typescript','OpenRouter','Ink','Chalk'],
    demoLink: 'https://www.npmjs.com/package/plnr',
    githubLink: 'https://github.com/CyberBoyAyush/plnr',
    featured: true,
    year: '2025',
    duration: '7 Days',
    color: 'from-indigo-600 to-purple-600',
    slug: 'plnr',
    detailedDescription: 'Plnr is a CLI tool that helps developers plan out their implementations with code context. It uses OpenAI and OpenRouter APIs to generate code snippets based on user input. The tool is designed to be fast, accurate, and easy to use.',
    challenges: [
      'Creating a CLI UI that is easy to use and understand',
      'Creating cli based tools and managing them',
      'How can i make tools which are both fast, secure and works',
      'Handling multiple tool calling'
    ],
  },
  {
    id: 2,
    title: 'CappyChat',
    description: 'Fastest LLM chat on the planet right now, Multi Model and Realtime Sync too.',
    image: 'https://res.cloudinary.com/dyetf2h9n/image/upload/v1759138327/AV_1_zztl3w.png',
    tags: ['NextJS', 'Appwrite', 'OpenRouter', 'Realtime API', 'Convex', 'Vercel'],
    demoLink: 'https://cappychat.com',
    githubLink: 'https://github.com/cyberboyayush/CappyChat',
    featured: true,
    year: '2025',
    duration: '15 Days',
    color: 'from-indigo-600 to-purple-600',
    slug: 'cappychat',
    detailedDescription: 'CappyChat revolutionizes AI conversations with blazing-fast response times and multi-model support. Leveraging OpenRouter API and Convex for real-time synchronization, it provides seamless switching between different LLM models. The application features a clean interface with real-time collaboration capabilities, making AI chat accessible and efficient.',
    challenges: [
      'Achieving sub-second response times with optimized API calls',
      'Implementing real-time sync across multiple devices using Appwrite Realtime',
      'Managing state for multiple AI models simultaneously',
      'Handling rate limits and API errors gracefully'
    ],
    videoUrl: 'https://www.youtube.com/embed/vP5HSx9GxjI?si=SwFiZUV4No-Ji8pV'
  },
  {
    id: 3,
    title: 'Bucket Buddy',
    description: 'Modern Cloud Storage Management',
    image: 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPI5rAcrjSq8BcalUnAK51orufTp2SNkO7GxHz',
    tags: ['NextJS', 'Prisma', 'Postgres', 'AWS API', 'TailwindCSS', 'VPS'],
    demoLink: 'https://bucketbuddy.aysh.me/',
    githubLink: 'https://github.com/cyberboyayush/bucketbuddy',
    featured: false,
    year: '2025',
    duration: '7 Days',
    color: 'from-indigo-600 to-purple-600',
    slug: 'bucket-buddy',
    detailedDescription: 'Bucket Buddy is a comprehensive cloud storage management solution that simplifies S3 bucket operations. Built with modern technologies, it provides an intuitive interface for managing AWS S3 buckets with features like drag-and-drop uploads, file previews, and advanced search capabilities. The application focuses on security and performance, offering seamless integration with AWS services.',
    challenges: [
      'Implementing secure AWS credential management while maintaining ease of use',
      'Optimizing large file uploads with chunked uploads and progress tracking',
      'Building real-time sync between local state and AWS S3 buckets',
      'Designing an intuitive UI for complex S3 operations'
    ]
  },
  {
    id: 4,
    title: 'TuduAI',
    description: ' An AI-powered productivity app with natural language task creation, collaborative workspaces, and a minimalist UI for effortless planning.',
    image: 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPFe7ghJ5FxlZUcq1BwOub9PyMKG7d26vQfaTC',
    tags: ["React", "Javascript", "TailwindCSS", "Appwrite", "OpenAi API", "Clerk"],
    demoLink: 'https://tuduai.aysh.me/',
    githubLink: 'https://github.com/cyberboyayush/tuduai',
    featured: true,
    year: '2025',
    duration: '15 Days',
    color: 'from-indigo-600 to-purple-600',
    slug: 'tuduai',
    detailedDescription: 'TuduAI transforms task management with natural language processing. Simply describe your tasks in plain English, and the AI understands context, priority, and deadlines. Built with React and powered by OpenAI, it features collaborative workspaces, smart task organization, and a minimalist interface that keeps you focused on what matters.',
    challenges: [
      'Implementing accurate natural language parsing for task creation',
      'Building real-time collaboration features with Appwrite',
      'Integrating Clerk authentication seamlessly',
      'Creating an intuitive yet powerful task management interface'
    ]
  },
  {
    id: 5,
    title: 'QuickBang',
    description: 'Lightning-fast search shortcuts to enhance your workflow.',
    image: 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAP4yZsxBVEKBr0gueU6fJkSAaYjWMON8X2HPdV',
    tags: ["React", "Typecript", "Browser Engine"],
    demoLink: 'https://quickbang.aysh.me/',
    githubLink: 'https://github.com/cyberboyayush/quickbang',
    featured: false,
    year: '2025',
    duration: '5 Days',
    color: 'from-indigo-600 to-purple-600',
    slug: 'quickbang',
    detailedDescription: 'QuickBang is a browser extension that brings the power of DuckDuckGo bangs to any search bar. Type shortcuts like !g for Google, !gh for GitHub, and instantly search across different platforms. Built with React and TypeScript, it integrates seamlessly with browser engines for lightning-fast searches.',
    challenges: [
      'Creating cross-browser compatible extension architecture',
      'Implementing fast pattern matching for bang shortcuts',
      'Designing minimal UI that doesn\'t interfere with browsing',
      'Handling various search bar implementations across websites'
    ]
  },
  {
    id: 6,
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
    slug: 'effisense',
    detailedDescription: 'Effisense leverages AI to revolutionize productivity management. It analyzes your tasks, predicts completion times, and intelligently balances your workload. Integration with Google Calendar ensures your schedule stays optimized, while Recharts provides beautiful visualizations of your productivity patterns. Built with GROQ for fast AI inference.',
    challenges: [
      'Building accurate AI models for task duration prediction',
      'Integrating Google Calendar API with real-time sync',
      'Creating intuitive data visualizations with Recharts',
      'Implementing intelligent workload balancing algorithms'
    ]
  },
  {
    id: 7,
    title: 'SkillCompass',
    description: 'Unlock your potential with AI-powered personalized learning paths, interactive content, and real-time progress tracking.',
    image: 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPUFlBGN1k8DdHYcXLswQzrg6SM7qbVytx3Npf',
    tags: ["React", "Gemini", "Appwrite", "TailwindCSS", "Groq", "Llama 3.3"],
    demoLink: 'https://skillcompass.ayush-sharma.in/',
    githubLink: 'https://github.com/glucon-d/skillcompass',
    featured: true,
    year: '2025',
    duration: '72 Hours',
    color: 'from-indigo-600 to-purple-600',
    isHackathonProject: true,
    slug: 'skillcompass',
    detailedDescription: 'SkillCompass was built in 72 hours for a hackathon, combining Gemini AI and Llama 3.3 to create personalized learning paths. It analyzes your goals and current skill level to generate custom curricula with interactive content. Real-time progress tracking keeps you motivated, while Appwrite handles user data securely. Won recognition for innovative AI integration.',
    challenges: [
      'Developing the entire application in just 72 hours',
      'Integrating multiple AI models (Gemini and Llama 3.3) effectively',
      'Creating adaptive learning paths based on user progress',
      'Building a polished UI under extreme time constraints'
    ],
    videoUrl: 'https://www.youtube.com/embed/-7sjCjZc0SI?si=4UnRtmOgKWqKjA1t'
  },
  {
    id: 8,
    title: 'PortDev',
    description: 'Create Devloper Portfolio in Minutes.',
    image: 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPiVdP9VfLSeCsIaE1NktK9ur3Tyv6x4QMqg8z',
    tags: ["React", "Firebase", "TailwindCSS", "Framer Motion"],
    demoLink: 'https://portdevv.vercel.app/',
    githubLink: 'https://github.com/cyberboyayush/portdev',
    featured: false,
    year: '2025',
    duration: '1.5 months',
    color: 'from-rose-600 to-pink-600',
    slug: 'portdev',
    detailedDescription: 'PortDev makes creating developer portfolios effortless. With pre-built templates and Firebase backend, developers can have their portfolio live in minutes. Features include project showcases, skill listings, and contact forms. Built with React, TailwindCSS, and animated with Framer Motion for smooth, professional transitions.',
    challenges: [
      'Designing flexible templates that work for various developer profiles',
      'Implementing real-time preview of portfolio changes',
      'Integrating Firebase for seamless data storage',
      'Creating smooth animations without impacting performance'
    ],
  },
  {
    id: 9,
    title: 'React Portfolio',
    description: 'Personal Portfolio Website using React Js',
    image: 'https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPIh52zvSq8BcalUnAK51orufTp2SNkO7GxHzm',
    tags: ["React", "TailwindCSS", "Framer Motion", "Particles.js"],
    demoLink: 'https://cyberboyayush.vercel.app/',
    githubLink: 'https://github.com/cyberboyayush/React-Portfolio',
    featured: false,
    year: '2025',
    duration: '5 days',
    color: 'from-indigo-600 to-purple-600',
    slug: 'react-portfolio',
    detailedDescription: 'A personal portfolio website built with React, showcasing projects and skills with elegant animations. Features particle effects, smooth scrolling, and responsive design. Uses Framer Motion for fluid page transitions and TailwindCSS for modern styling. Optimized for performance and SEO.',
    challenges: [
      'Optimizing Particles.js performance on mobile devices',
      'Creating smooth scroll animations without lag',
      'Ensuring responsive design across all screen sizes',
      'Balancing visual effects with fast load times'
    ]
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

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};
