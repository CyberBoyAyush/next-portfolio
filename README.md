# Ayush Sharma - Portfolio

A high-performance, interactive developer portfolio engineered with Next.js 16, React 19, and Tailwind CSS v4. This project demonstrates modern web development practices, featuring a terminal-inspired aesthetic, integrated AI capabilities, and a comprehensive MDX-based blog system.


[![Live Demo](https://img.shields.io/badge/Live_Demo-aysh.me-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://aysh.me)

## Overview

This application serves as a central hub for showcasing professional experience, technical skills, and written content. It focuses on performance, accessibility, and a seamless user experience, utilizing the latest features of the Next.js App Router and React Server Components.

## Key Features

-   **Modern Architecture**: Built on Next.js 16 with Turbopack for rapid development and optimal production performance.
-   **AI Integration (CappyBot)**: A custom AI assistant powered by the Vercel AI SDK and OpenRouter, providing contextual answers about the portfolio owner.
-   **Advanced MDX Blog**:
    -   Server-side rendering of Markdown content.
    -   Syntax highlighting via `rehype-highlight`.
    -   Interactive reading progress tracking.
    -   User-configurable reading preferences (font selection, zoom levels).
-   **Interactive UI/UX**:
    -   Responsive "Skills Cloud" with brand-aware color transitions.
    -   Dynamic "Tech Ticker" component.
    -   Hardware-accelerated animations using Framer Motion.
    -   Custom cursor and particle background effects.
-   **Design System**: A consistent, dark-themed UI built with Tailwind CSS v4, featuring glassmorphism and grid-based layouts.

## Technology Stack

-   **Framework**: Next.js 16 (App Router)
-   **Core**: React 19
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS v4
-   **Animations**: Framer Motion
-   **AI & Data Fetching**: Vercel AI SDK, OpenRouter
-   **Content Management**: MDX, Gray Matter
-   **Icons**: React Icons, Lucide React, Tabler Icons

## Getting Started

This project utilizes **pnpm** for package management.

### Prerequisites

-   Node.js v20 or higher
-   pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/cyberboyayush/next-portfolio.git
    cd next-portfolio
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

3.  Environment Configuration:
    Create a `.env` file in the root directory and configure the necessary API keys (e.g., `OPENROUTER_API_KEY`) for full functionality.

4.  Start the development server:
    ```bash
    pnpm dev
    ```

    The application will be available at [http://localhost:3000](http://localhost:3000).

## Scripts

-   `pnpm dev`: Starts the development server with Turbopack.
-   `pnpm build`: Creates an optimized production build.
-   `pnpm start`: Runs the production server.
-   `pnpm lint`: Runs ESLint to ensure code quality.

## Project Structure

```
src/
├── app/             # Next.js App Router pages and API endpoints
├── components/      # Reusable React components
├── data/            # Static content (experience, projects, blog posts)
├── lib/             # Shared utility functions and configurations
├── styles/          # Global CSS and Tailwind directives
└── types/           # TypeScript interfaces and type definitions
```

## Content Management

### 📝 Adding Blog Posts

The blog system is powered by local MDX files, offering a seamless writing experience with full component support.

1.  **Create a File**: Navigate to `src/data/blogs/` and create a new `.mdx` file (e.g., `my-new-tech-guide.mdx`).
2.  **Add Frontmatter**: Paste the following metadata block at the top of your file:

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

3.  **Write Content**: Use standard Markdown or MDX below the frontmatter. The system automatically handles syntax highlighting for code blocks.
4.  **Images**: Place blog images in `public/images/blogs/` and reference them relative to the public root.

## License

This project is open source and available under the [MIT License](LICENSE).

---

Developed by [Ayush Sharma](https://aysh.me).
