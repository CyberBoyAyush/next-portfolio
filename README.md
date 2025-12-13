# Ayush Sharma - Portfolio

A high-performance, interactive developer portfolio engineered with Next.js 16, React 19, and Tailwind CSS v4. This project demonstrates modern web development practices, featuring a terminal-inspired aesthetic, integrated AI capabilities, and a comprehensive MDX-based blog system with user engagement features.

[![Live Demo](https://img.shields.io/badge/Live_Demo-aysh.me-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://aysh.me)

## Overview

This application serves as a central hub for showcasing professional experience, technical skills, and written content. It focuses on performance, accessibility, and a seamless user experience, utilizing the latest features of the Next.js App Router and React Server Components.

## Key Features

- **Modern Architecture**: Built on Next.js 16 with Turbopack for rapid development and optimal production performance.
- **AI Integration (CappyBot)**: A custom AI assistant powered by the Vercel AI SDK and OpenRouter, providing contextual answers about the portfolio owner.
- **Advanced MDX Blog**:
  - Server-side rendering of Markdown content.
  - Syntax highlighting via `rehype-highlight`.
  - Interactive reading progress tracking.
  - User-configurable reading preferences (font selection, zoom levels).
  - Table of contents with auto-scroll navigation.
- **Blog Engagement System**:
  - Like button with session-based tracking.
  - Threaded comments with reply functionality.
  - Author badge for blog owner responses.
  - Email masking for user privacy.
  - PostgreSQL database via Neon with Drizzle ORM.
- **Interactive UI/UX**:
  - Responsive "Skills Cloud" with brand-aware color transitions.
  - Dynamic "Tech Ticker" component.
  - Hardware-accelerated animations using Framer Motion.
  - Custom cursor and particle background effects.
  - Oneko cat companion.
- **Design System**: A consistent, dark-themed UI built with Tailwind CSS v4, featuring glassmorphism and grid-based layouts with light/dark theme support for blog pages.

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **AI & Data Fetching**: Vercel AI SDK, OpenRouter
- **Database**: PostgreSQL (Neon), Drizzle ORM
- **Content Management**: MDX, Gray Matter
- **Email**: Resend
- **Icons**: React Icons, Lucide React, Tabler Icons, Lobehub Icons

## Getting Started

This project utilizes **pnpm** for package management.

### Prerequisites

- Node.js v20 or higher
- pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/cyberboyayush/next-portfolio.git
   cd next-portfolio
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Environment Configuration:
   Create a `.env` file in the root directory with the following variables:

   ```env
   # AI Integration
   OPENROUTER_API_KEY=your_openrouter_api_key

   # Database (Neon PostgreSQL)
   DATABASE_URL=your_neon_database_url

   # Email (Resend)
   RESEND_API_KEY=your_resend_api_key
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

## Scripts

- `pnpm dev`: Starts the development server with Turbopack.
- `pnpm build`: Creates an optimized production build.
- `pnpm start`: Runs the production server.
- `pnpm lint`: Runs ESLint to ensure code quality.

## Project Structure

```
src/
├── app/             # Next.js App Router pages and API endpoints
│   └── api/         # API routes (chat, contact, blogs/likes/comments)
├── components/      # Reusable React components (kebab-case filenames)
├── data/            # Static content (experience, projects, blog posts)
├── lib/             # Shared utility functions and configurations
│   └── db.ts        # Drizzle ORM schema and database connection
├── styles/          # Global CSS and Tailwind directives
└── types/           # TypeScript interfaces and type definitions
```

## Naming Conventions

This project follows consistent naming conventions:

- **Files**: kebab-case (e.g., `blog-like-button.tsx`, `section-heading.tsx`)
- **Components**: PascalCase (e.g., `BlogLikeButton`, `SectionHeading`)
- **Functions/Variables**: camelCase (e.g., `handleSubmit`, `isLoading`)

## Content Management

### Adding Blog Posts

The blog system is powered by local MDX files, offering a seamless writing experience with full component support.

1. **Create a File**: Navigate to `src/data/blogs/` and create a new `.mdx` file (e.g., `my-new-tech-guide.mdx`).

2. **Add Frontmatter**: Paste the following metadata block at the top of your file:

   ```yaml
   ---
   title: "Understanding Next.js App Router"
   date: "2024-03-20"
   description: "A deep dive into the new routing paradigms."
   tags: ["Next.js", "React", "Web Development"]
   author: "Ayush Sharma"
   readingTime: "5 min read"
   imageUrl: "/images/blogs/nextjs-cover.png"
   featured: true
   isHidden: false
   ---
   ```

3. **Write Content**: Use standard Markdown or MDX below the frontmatter. The system automatically handles syntax highlighting for code blocks.

4. **Images**: Place blog images in `public/images/blogs/` and reference them relative to the public root.

### Blog Engagement Features

Each blog post includes:

- **Like Button**: Session-based likes stored in PostgreSQL, preventing duplicate likes per session.
- **Comments**: Email-based commenting system with:
  - Threaded replies (one level deep).
  - Author badge for blog owner responses.
  - Email privacy protection via masking.
  - Real-time updates without page refresh.

## Database Schema

The project uses Drizzle ORM with Neon PostgreSQL:

```typescript
// Blog Likes - tracks user likes per blog post
blogLikes: {
  id: serial primary key,
  blogSlug: text (indexed),
  sessionId: text,
  createdAt: timestamp
}

// Blog Comments - supports threaded replies
blogComments: {
  id: serial primary key,
  blogSlug: text (indexed),
  parentId: integer (self-referencing for replies),
  email: text,
  content: text,
  createdAt: timestamp
}
```

## License

This project is open source and available under the [MIT License](LICENSE).

---

Developed by [Ayush Sharma](https://aysh.me).
