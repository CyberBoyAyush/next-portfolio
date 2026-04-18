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
  category: "AI" | "Others";
}

export const projects: Project[] = [
  {
    id: 1,
    title: "MemContext",
    description:
      "Persistent, evolving memory layer for AI coding agents with MCP-native integrations, hybrid retrieval, and cross-session recall.",
    image:
      "https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPuFUBv7VILjGC7RxNs1WqaPXeldA0nz3E968k",
    tags: [
      "TypeScript",
      "Hono",
      "Next.js",
      "React",
      "TailwindCSS",
      "Drizzle",
      "Neon",
      "PostgreSQL",
      "MCP",
      "Turborepo",
      "Upstash Redis",
      "OpenRouter",
      "Vercel AI SDK",
    ],
    demoLink: "https://memcontext.in",
    githubLink: "https://github.com/CyberBoyAyush/memcontext",
    featured: true,
    year: "2026",
    duration: "2 Months",
    color: "from-violet-600 to-indigo-600",
    slug: "memcontext",
    detailedDescription:
      "MemContext solves one of the biggest gaps in AI-assisted development: agents lose user preferences, project context, and prior decisions between sessions. I built it as a persistent memory layer that plugs into MCP-compatible tools so assistants can save, retrieve, and evolve context instead of starting from zero every time. The hosted product is designed to be simple to adopt, connect an API key, add the MCP config, and your assistant starts remembering across sessions.\n\nThe system combines a Hono API, MCP server, Next.js dashboard, public docs, and marketing site inside a Turborepo monorepo. Under the hood it uses hybrid retrieval with vector embeddings and PostgreSQL full-text search, relation-aware memory updates, temporal expiry, feedback-aware ranking, and project-scoped organization. That makes the memory layer useful not only for one agent, but across Claude, Cursor, OpenCode, Codex CLI, Windsurf, and other MCP-compatible clients.",
    challenges: [
      "Combining vector embeddings, PostgreSQL full-text search, and query-variant retrieval into a memory layer that surfaces relevant context instead of noisy matches.",
      "Designing evolving memory flows so entries can be saved, updated, extended, expired, and ranked by feedback without creating duplicate context.",
      "Building MCP-native integrations that work reliably across multiple coding agents, transports, and setup styles.",
      "Structuring a monorepo that shares types cleanly across the API, MCP server, dashboard, docs, and website while keeping deployments independent.",
    ],
    category: "AI",
  },
  {
    id: 2,
    title: "Zenox",
    description:
      "Agent orchestration plugin for OpenCode with specialized subagents, background tasks, and fast multi-agent workflows.",
    image:
      "https://res.cloudinary.com/dyetf2h9n/image/upload/v1768073623/ZENOX_e4boob.png",
    tags: ["TypeScript", "OpenCode", "AI Agents", "MCP", "Bun"],
    demoLink: "https://www.npmjs.com/package/zenox",
    githubLink: "https://github.com/CyberBoyAyush/zenox",
    featured: true,
    year: "2026",
    duration: "5 Days",
    color: "from-cyan-600 to-blue-600",
    slug: "zenox",
    detailedDescription:
      "Zenox extends OpenCode with a team-of-agents model instead of a single monolithic assistant. I designed four specialized agents: Explorer for codebase search, Librarian for external docs and examples, Oracle for strategy and reviews, and UI Planner for frontend work. The goal was to make agent delegation feel fast, practical, and built for real engineering workflows.\n\nThe plugin adds background task execution, keyword-triggered deep research modes, configurable reasoning profiles, and bundled MCP support for Exa, GitHub search, and sequential thinking. It turns OpenCode into a more scalable orchestration environment where agents can research and act in parallel instead of serially.",
    challenges: [
      "Designing delegation rules that route work to the right agent without making the system feel unpredictable.",
      "Implementing background execution and result retrieval so independent research can run in parallel and still surface coherently.",
      "Balancing aggressive automation with clear developer control over when agents should search, review, or escalate.",
      "Integrating multiple MCP tools into one plugin while keeping prompts, modes, and output quality consistent.",
    ],
    category: "AI",
  },
  {
    id: 3,
    title: "Plnr",
    description:
      "AI planning and security CLI for codebases that turns architecture context into concrete implementation plans.",
    image:
      "https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPipbvM9fLSeCsIaE1NktK9ur3Tyv6x4QMqg8z",
    tags: ["TypeScript", "OpenRouter", "Node.js", "MCP", "Exa AI"],
    demoLink: "https://www.npmjs.com/package/plnr",
    githubLink: "https://github.com/CyberBoyAyush/plnr",
    featured: true,
    year: "2025",
    duration: "7 Days",
    color: "from-indigo-600 to-purple-600",
    slug: "plnr",
    detailedDescription:
      "Plnr is a CLI built for the phase before implementation starts: understanding the codebase, mapping the architecture, and turning ambiguity into an actionable plan. It inspects frameworks, dependencies, code patterns, and security risks, then combines that context with modern LLMs to produce implementation guidance that is grounded in the repo instead of generic advice.\n\nI also built dedicated planning, chat, and security flows so it can answer architecture questions, generate step-by-step execution plans, and run OWASP-style audits from the terminal. The project is especially strong for backend-heavy repositories where context gathering and risk reduction matter before code gets written.",
    challenges: [
      "Fitting rich codebase context into model windows without losing the signals that matter for planning.",
      "Building prompt flows that can switch between chat, planning, and security review while still staying context-aware.",
      "Integrating live docs and web search through MCP so generated plans are based on current library behavior.",
      "Designing a CLI UX that feels fast and readable even when analysis spans many files and multiple reasoning steps.",
    ],
    category: "AI",
    videoUrl: "https://www.youtube.com/embed/8VMi3AoLEz4?si=b5JoXW31UPcFPfLj",
  },
  {
    id: 4,
    title: "CappyChat",
    description:
      "Production AI chat workspace with multi-model routing, realtime sync, tool calling, and a local-first UX.",
    image:
      "https://res.cloudinary.com/dyetf2h9n/image/upload/v1759138327/AV_1_zztl3w.png",
    tags: [
      "Next.js",
      "TypeScript",
      "Appwrite",
      "OpenRouter",
      "Zustand",
      "Upstash Redis",
      "TailwindCSS",
    ],
    demoLink: "https://cappychat.com",
    githubLink: "https://github.com/cyberboyayush/CappyChat",
    featured: true,
    year: "2025",
    duration: "15 Days",
    color: "from-indigo-600 to-purple-600",
    slug: "cappychat",
    detailedDescription:
      "CappyChat is my take on a serious AI chat product, not just a thin wrapper over one model. It supports 30+ models, realtime sync, a local-first architecture, voice input, file uploads, image generation, and collaborative workflows. The product is optimized around responsiveness so users can switch models, recover prior context, and keep working without the interface feeling slow or fragile.\n\nThe later versions pushed the system much further with plan mode, AI artifacts, model-driven tool calling, web search, logging, and production hardening. That meant solving not only for prompt quality but also for rate limits, synchronization, bundle size, state management, and the UX details required to make a real AI application feel fast in everyday use.",
    challenges: [
      "Building a local-first chat experience that stays responsive while still syncing reliably across devices through Appwrite Realtime.",
      "Supporting many model providers and capabilities without turning the interface into configuration overload.",
      "Adding tool calling, artifacts, and web search in a way that keeps responses useful instead of noisy.",
      "Hardening the product for production with logging, rate limiting, and performance work across a rapidly evolving feature set.",
    ],
    videoUrl: "https://www.youtube.com/embed/vP5HSx9GxjI?si=SwFiZUV4No-Ji8pV",
    category: "AI",
  },
  {
    id: 5,
    title: "Bucket Buddy",
    description:
      "Secure S3-style storage manager for AWS, Cloudflare R2, and other compatible providers with a polished developer UX.",
    image:
      "https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPI5rAcrjSq8BcalUnAK51orufTp2SNkO7GxHz",
    tags: ["Next.js", "Prisma", "Postgres", "AWS SDK", "TailwindCSS", "Better Auth"],
    demoLink: "https://bucketbuddy.aysh.me/",
    githubLink: "https://github.com/cyberboyayush/bucketbuddy",
    featured: true,
    year: "2025",
    duration: "7 Days",
    color: "from-indigo-600 to-purple-600",
    slug: "bucket-buddy",
    detailedDescription:
      "Bucket Buddy turns object storage management into a cleaner, safer workflow for developers and small teams. Instead of forcing users into raw cloud consoles, it provides a focused interface for bucket setup, file previews, uploads, search, and multi-provider management across AWS S3, Cloudflare R2, and other S3-compatible services.\n\nA major part of the project was building trust into the product: credential handling, session management, and a UI that makes storage operations feel straightforward without hiding critical information. It is a backend-oriented tool wrapped in a much better user experience.",
    challenges: [
      "Handling cloud credentials securely while still making multi-provider setup approachable for non-expert users.",
      "Designing file operations, previews, and bulk actions for large object stores without making the UI feel bloated.",
      "Normalizing provider-specific behavior across AWS S3 and S3-compatible services.",
      "Keeping uploads, browsing, and search responsive while working through remote storage APIs.",
    ],
    category: "Others",
  },
  {
    id: 6,
    title: "TuduAI",
    description:
      "Natural-language task manager with collaborative workspaces, smart organization, and AI-assisted task creation.",
    image:
      "https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPFe7ghJ5FxlZUcq1BwOub9PyMKG7d26vQfaTC",
    tags: [
      "React",
      "JavaScript",
      "TailwindCSS",
      "Appwrite",
      "OpenAI API",
      "Clerk",
    ],
    demoLink: "https://tuduai.aysh.me/",
    githubLink: "https://github.com/cyberboyayush/tuduai",
    featured: true,
    year: "2025",
    duration: "15 Days",
    color: "from-indigo-600 to-purple-600",
    slug: "tuduai",
    detailedDescription:
      "TuduAI is a productivity app built around the idea that users should be able to write tasks the way they think. Instead of forcing structured inputs up front, the app uses AI to parse natural language, extract dates and intent, and create organized tasks automatically. It also layers in workspace collaboration so teams can plan together instead of treating task management as a solo workflow.\n\nThe value of the product comes from turning loose, human input into structured execution. That meant combining AI parsing, task grouping, reminders, and comments into a system that still feels minimal instead of over-engineered.",
    challenges: [
      "Making natural-language task creation reliable enough to be useful in real planning, not just in demos.",
      "Designing collaboration flows on top of Appwrite without slowing down the core single-user experience.",
      "Balancing a minimal interface with enough structure for deadlines, comments, and workspace membership.",
      "Handling fuzzy date and intent parsing from natural language without creating confusing task output.",
    ],
    category: "AI",
  },
  {
    id: 7,
    title: "QuickBang",
    description: "Browser search shortcut utility that brings bang-style redirects to any search bar.",
    image:
      "https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAP4yZsxBVEKBr0gueU6fJkSAaYjWMON8X2HPdV",
    tags: ["React", "TypeScript", "Browser Engine"],
    demoLink: "https://quickbang.aysh.me/",
    githubLink: "https://github.com/cyberboyayush/quickbang",
    featured: false,
    year: "2025",
    duration: "5 Days",
    color: "from-indigo-600 to-purple-600",
    slug: "quickbang",
    detailedDescription:
      "QuickBang is a lightweight browser utility inspired by DuckDuckGo bangs. It lets users type shortcuts like `!g`, `!gh`, or `!yt` directly into a search field and jump to the right destination instantly. The idea was to remove friction from repetitive search workflows without requiring users to learn a heavy extension UI.\n\nIt is intentionally small and fast: most of the work happens on the client, configuration stays simple, and the product focuses on one job only, making search redirection feel immediate and useful.",
    challenges: [
      "Building shortcut parsing that feels instant and predictable across different query patterns.",
      "Keeping the extension simple enough to stay fast while still supporting customization.",
      "Handling browser-specific behavior around search engines and search bar integrations.",
      "Designing a narrow utility product that solves one workflow well without adding unnecessary UI.",
    ],
    category: "Others",
  },
  {
    id: 8,
    title: "Effisense",
    description:
      "AI productivity dashboard for scheduling, focus planning, analytics, and Google Calendar-aware workload management.",
    image:
      "https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPfgNH3bZTmUXblVz2o8y4iIF6cHMBLqAhke5Y",
    tags: [
      "React",
      "Google API",
      "GROQ",
      "Appwrite",
      "TailwindCSS",
      "Recharts",
      "Google Calendar API",
    ],
    demoLink: "https://effisense.ayush-sharma.in/",
    githubLink: "https://github.com/cyberboyayush/effisense",
    featured: false,
    year: "2025",
    duration: "3 Months",
    color: "from-indigo-600 to-purple-600",
    slug: "effisense",
    detailedDescription:
      "Effisense is an AI-powered productivity dashboard that tries to answer a harder question than simple task lists: how should your actual time be allocated? It combines task planning, focus-time suggestions, productivity analytics, and Google Calendar integration so users can understand both what they need to do and when they should realistically do it.\n\nThe project also pushed into behavioral insight and reporting. With charts, AI-generated suggestions, and scheduling support, it moves beyond storage and into helping users manage workload quality.",
    challenges: [
      "Using AI to generate time and focus recommendations that feel practical instead of arbitrary.",
      "Integrating Google Calendar cleanly while keeping the task workflow central to the product.",
      "Turning productivity data into visualizations that help users act, not just observe.",
      "Keeping a feature-rich dashboard coherent across planning, analytics, and scheduling flows.",
    ],
    category: "AI",
  },
  {
    id: 9,
    title: "SkillCompass",
    description:
      "Adaptive learning platform that generates AI-powered curricula, flashcards, quizzes, and progress tracking.",
    image:
      "https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPUFlBGN1k8DdHYcXLswQzrg6SM7qbVytx3Npf",
    tags: ["React", "Gemini", "Appwrite", "TailwindCSS", "Groq", "Llama 3.3"],
    demoLink: "https://skillcompass.ayush-sharma.in/",
    githubLink: "https://github.com/glucon-d/skillcompass",
    featured: false,
    year: "2025",
    duration: "72 Hours",
    color: "from-indigo-600 to-purple-600",
    isHackathonProject: true,
    slug: "skillcompass",
    detailedDescription:
      "SkillCompass was built in 72 hours for a hackathon and focused on personalized learning instead of static course catalogs. Users define a goal, and the system generates a learning path with interactive content, quizzes, flashcards, and progress tracking that adapts to their journey.\n\nThe project combined Gemini, Groq, Appwrite, and external content sources to create a compact but ambitious learning product in a very short timeframe. It is a good example of shipping a broad AI feature set quickly without losing usability.",
    challenges: [
      "Building a multi-surface learning experience in only 72 hours without collapsing into unfinished features.",
      "Coordinating multiple AI providers so curriculum generation and interactive content stayed reliable.",
      "Designing adaptive progress flows that feel motivating instead of overwhelming.",
      "Shipping a polished UX under hackathon constraints while still integrating auth, storage, and AI generation.",
    ],
    videoUrl: "https://www.youtube.com/embed/-7sjCjZc0SI?si=4UnRtmOgKWqKjA1t",
    category: "AI",
  },
  {
    id: 10,
    title: "PortDev",
    description: "Portfolio generator for developers with dynamic skill visuals, templates, and real-time content management.",
    image:
      "https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPiVdP9VfLSeCsIaE1NktK9ur3Tyv6x4QMqg8z",
    tags: ["React", "Firebase", "TailwindCSS", "Framer Motion"],
    demoLink: "https://portdevv.vercel.app/",
    githubLink: "https://github.com/cyberboyayush/portdev",
    featured: false,
    year: "2025",
    duration: "1.5 Months",
    color: "from-rose-600 to-pink-600",
    slug: "portdev",
    detailedDescription:
      "PortDev is a portfolio builder made specifically for developers who want something more tailored than generic website builders. It focuses on technical profiles, project showcases, skill sections, and live content management, with a UI designed to help users publish quickly without having to assemble everything from scratch.\n\nOne of the more interesting parts of the product is the dynamic skill visualization and logo fetching flow, which makes technical stacks look richer without burdening users with manual setup for every icon or skill asset.",
    challenges: [
      "Designing templates that feel useful for different developer profiles without becoming too restrictive.",
      "Building dynamic skill and icon presentation so portfolios feel polished with minimal manual input.",
      "Using Firebase for auth, storage, and content sync while keeping the editing flow straightforward.",
      "Balancing visual polish with a fast path to publication for users who just want to get online quickly.",
    ],
    category: "Others",
  },
  {
    id: 11,
    title: "React Portfolio",
    description: "Earlier portfolio built with React, Framer Motion, and custom interaction details for a stronger personal web presence.",
    image:
      "https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPIh52zvSq8BcalUnAK51orufTp2SNkO7GxHzm",
    tags: ["React", "TailwindCSS", "Framer Motion", "Particles.js"],
    demoLink: "https://cyberboyayush.vercel.app/",
    githubLink: "https://github.com/cyberboyayush/React-Portfolio",
    featured: false,
    year: "2025",
    duration: "5 Days",
    color: "from-indigo-600 to-purple-600",
    slug: "react-portfolio",
    detailedDescription:
      "This was my earlier portfolio system built in React to sharpen how I present projects, skills, and experience online. It leaned into motion, scroll-based interactions, dark mode, and custom effects to create a stronger personal brand than a plain static site.\n\nThe project mattered less as a product and more as a proving ground for interaction design, responsive behavior, and the kind of front-end craft that later fed into more polished product work.",
    challenges: [
      "Getting animations, scroll behavior, and visual effects to feel smooth without dragging down performance.",
      "Balancing a visually expressive interface with mobile responsiveness and readability.",
      "Designing a personal site that felt distinctive while still keeping the content easy to scan.",
      "Managing motion-heavy UI choices without turning the portfolio into a distraction from the work itself.",
    ],
    category: "Others",
  },
];

export const getFeaturedProjects = (): Project[] => {
  return projects.filter((project) => project.featured);
};

export const getAllProjects = (): Project[] => {
  return projects;
};

export const getProjectById = (id: number): Project | undefined => {
  return projects.find((project) => project.id === id);
};

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug);
};
