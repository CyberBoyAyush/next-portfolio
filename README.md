# Ayush Sharma - Portfolio

A high-performance developer portfolio built with TanStack Start, Vite, Nitro, React 19, and Tailwind CSS v4. The site includes a terminal-inspired UI, project case studies, technical writing, AI chat, blog engagement, SEO routes, and optimized image delivery through Cloudflare Transformations.

[![Live Demo](https://img.shields.io/badge/Live_Demo-aysh.me-000000?style=for-the-badge&logo=railway&logoColor=white)](https://aysh.me)

## Overview

This application is the public portfolio for Ayush Sharma. It showcases projects, experience, skills, technical articles, and an AI assistant. The app was migrated from Next.js to TanStack Start and now runs as a Nitro Node server on Railway.

## Key Features

- **TanStack Start Architecture**: File-based routing with TanStack Router, Vite builds, and Nitro server output.
- **Railway Deployment**: Production runs with `node .output/server/index.mjs`.
- **AI Assistant (CappyBot)**: Context-aware assistant powered by the Vercel AI SDK and OpenRouter.
- **Markdown Blog System**:
  - Local `.mdx` content parsed with Gray Matter.
  - Rendered with `react-markdown`, `remark-gfm`, `rehype-highlight`, and `rehype-slug`.
  - Reading progress, table of contents, link previews, copy markdown, related posts, and reading controls.
- **Blog Engagement**:
  - Session-based likes.
  - Threaded comments with email validation and moderation.
  - PostgreSQL via Neon and Drizzle ORM.
- **SEO and AI Discovery**:
  - `robots.txt`, `sitemap.xml`, `llm.txt`, `llms.txt`, and JSON feed routes.
  - Route-level metadata and JSON-LD for public pages.
- **Image Delivery**:
  - Original image source URLs stay in UploadThing or Cloudinary data.
  - Rendered images are optimized through Cloudflare Transformations on `aysh.me`.
  - Responsive `srcset` uses fixed widths: `480`, `768`, and `1200`.
- **Interactive UI**:
  - Framer Motion animations.
  - Theme and font controls for blog pages.
  - Oneko companion and polished project cards.

## Technology Stack

- **Framework**: TanStack Start
- **Router**: TanStack Router
- **Build Tool**: Vite
- **Server Runtime**: Nitro Node server
- **Deployment**: Railway
- **Core**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **AI**: Vercel AI SDK, OpenRouter
- **Database**: Neon PostgreSQL, Drizzle ORM
- **Content**: Markdown/MDX files, Gray Matter, React Markdown
- **Email**: Resend
- **Images**: UploadThing and Cloudinary originals, Cloudflare Transformations for delivery
- **Icons**: React Icons, Lucide React, Tabler Icons, local brand icons

## Getting Started

This project uses **pnpm** only.

### Prerequisites

- Node.js `>=20`
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

3. Create a `.env` file:

   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key
   DATABASE_URL=your_neon_database_url
   RESEND_API_KEY=your_resend_api_key
   RESEND_FROM_EMAIL=your_verified_sender_email
   RESEND_FROM_NAME=Ayush Sharma
   RESEND_TO_EMAIL=your_contact_receiver_email
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

The app runs at [http://localhost:3000](http://localhost:3000) by default.

## Scripts

- `pnpm dev`: Starts the Vite development server.
- `pnpm build`: Builds the TanStack Start/Nitro production output.
- `pnpm start`: Runs `.output/server/index.mjs`.
- `pnpm typecheck`: Runs TypeScript checks.
- `pnpm lint`: Runs ESLint.

## Production

Railway should use:

```bash
pnpm build
node .output/server/index.mjs
```

The production server output is generated in `.output/`.

Required production environment variables:

- `OPENROUTER_API_KEY`
- `DATABASE_URL`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_FROM_NAME`
- `RESEND_TO_EMAIL`

## Image Optimization

Image source data remains unchanged. Project and blog images may point to UploadThing or Cloudinary, but the rendered image URLs are optimized through Cloudflare Transformations where supported.

Cloudflare Transformations must be enabled for the `aysh.me` zone with these allowed source origins:

- `1kf0b6y5pd.ufs.sh`
- `res.cloudinary.com`

The image helper generates URLs like:

```txt
https://aysh.me/cdn-cgi/image/width=768,quality=75,format=auto/https://1kf0b6y5pd.ufs.sh/f/...
```

Keep the width set small to avoid unnecessary unique transformations:

```txt
480, 768, 1200
```

## Project Structure

```txt
src/
├── components/          # Reusable React components
├── data/                # Projects, experience, and blog content
├── lib/                 # Server functions, SEO, database, images, utilities
├── routes/              # TanStack Start routes and API handlers
├── styles/              # Global styles and blog content styles
├── types/               # TypeScript types
├── router.tsx           # Router creation
└── routeTree.gen.ts     # Generated TanStack route tree
```

## Content Management

### Adding Blog Posts

Blog posts live in `src/data/blogs/` as `.mdx` files.

1. Create a file such as `my-new-guide.mdx`.
2. Add frontmatter:

   ```yaml
   ---
   title: "Understanding System Design"
   date: "2026-05-02"
   description: "A practical introduction to system design tradeoffs."
   tags: ["System Design", "Backend"]
   author: "Ayush Sharma"
   readingTime: "8 min read"
   imageUrl: "https://1kf0b6y5pd.ufs.sh/f/..."
   featured: true
   isHidden: false
   ---
   ```

3. Write Markdown content below the frontmatter.

Use UploadThing or Cloudinary URLs for cover images. Cloudflare optimization is applied at render time.

## Database Schema

The app uses Drizzle ORM with Neon PostgreSQL for blog likes and comments.

```typescript
blogLikes: {
  id: serial primary key,
  blogSlug: text,
  sessionId: text,
  createdAt: timestamp
}

blogComments: {
  id: serial primary key,
  blogSlug: text,
  parentId: integer,
  email: text,
  content: text,
  createdAt: timestamp
}
```

## Documentation

- Migration notes: `docs/tanstack-start-migration.md`
- Historical blog implementation notes: `docs/blog-implementation.md`
- CappyBot implementation notes: `docs/cappybot-implementation.md`

## License

This project is open source and available under the [MIT License](LICENSE).

---

Developed by [Ayush Sharma](https://aysh.me).
