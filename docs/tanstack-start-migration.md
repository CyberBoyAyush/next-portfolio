# TanStack Start Migration

Date: 2026-05-02

This project was migrated from Next.js App Router to TanStack Start while preserving the existing portfolio UI, public routes, SEO metadata, blog pages, project pages, and server APIs.

## Runtime

- Framework: TanStack Start with TanStack Router.
- Build tool: Vite.
- Server runtime: Nitro Node server for Railway.
- Package manager: pnpm only.
- Production start command: `node .output/server/index.mjs`.

## Route Migration

- `src/app/layout.tsx` was replaced by `src/routes/__root.tsx`.
- `src/app/page.tsx` was replaced by `src/routes/index.tsx`.
- `/blogs` now lives in `src/routes/blogs.tsx`.
- `/blogs/[slug]` now lives in `src/routes/blogs.$slug.tsx`.
- `/projects` now lives in `src/routes/projects.tsx`.
- `/projects/[slug]` now lives in `src/routes/projects.$slug.tsx`.
- Redirects `/book` and `/x` are implemented as TanStack server routes.

## API Migration

- `/api/chat` moved to `src/routes/api.chat.ts`.
- `/api/contact` moved to `src/routes/api.contact.ts`.
- `/api/projects` moved to `src/routes/api.projects.ts`.
- `/api/blogs` moved to `src/routes/api.blogs.ts`.
- `/api/blogs/$slug/likes` moved to `src/routes/api.blogs.$slug.likes.ts`.
- `/api/blogs/$slug/comments` moved to `src/routes/api.blogs.$slug.comments.ts`.
- `/api/feed.json` moved to `src/routes/api.feed[.]json.ts`.

## SEO Migration

- Global metadata is defined in `src/lib/seo.ts` and applied from `src/routes/__root.tsx`.
- Blog and project pages use route-level `head()` metadata.
- JSON-LD for Person, WebSite, BlogPosting, BreadcrumbList, and SoftwareApplication is preserved.
- `robots.txt`, `llm.txt`, `llms.txt`, and `sitemap.xml` are implemented as TanStack server routes.
- Static prerendering is enabled for public pages, blog pages, project pages, sitemap, robots, and LLM text endpoints.

## Blog Migration

- The old `next-mdx-remote/rsc` renderer was replaced with `react-markdown` plus `remark-gfm`, `rehype-highlight`, and `rehype-slug`.
- Blog filesystem reads are isolated behind TanStack server functions in `src/lib/blog-functions.ts` so Node `fs` and `path` do not enter the browser bundle.
- Existing blog components, code blocks, link previews, table of contents, related posts, copy markdown, likes, comments, and blog theme controls are preserved.

## UI Preservation

- Reused React components were moved from `src/app` into `src/components`.
- `next/link` was replaced with `src/components/link.tsx` backed by TanStack Router for internal links and native anchors for external/hash links.
- `next/image` was replaced with `src/components/image.tsx`, preserving the `fill`, `priority`, `quality`, and `unoptimized` call sites used by existing UI code.
- `next/font` was replaced with Fontsource variable fonts imported from `src/styles/globals.css` and helper definitions in `src/lib/fonts.ts`.

## Image Optimization

- UploadThing and Cloudinary source URLs remain in project and blog data.
- Runtime image delivery is optimized through Cloudflare Transformations on the `aysh.me` zone.
- Cloudflare allowed origins must include `1kf0b6y5pd.ufs.sh` and `res.cloudinary.com`.
- `src/lib/image-optimization.ts` wraps supported remote image URLs with `/cdn-cgi/image` transformations.
- Responsive image `srcset` uses fixed widths `480`, `768`, and `1200` to keep Cloudflare unique transformations predictable.
- The hero profile image is preloaded through the Cloudflare transformation path with `format=auto`.

## Files Removed

- `next.config.ts`
- `next-env.d.ts`
- `postcss.config.mjs`
- `package-lock.json`
- All old `src/app` route files

## Verification

- `pnpm typecheck` passes.
- `pnpm build` passes and generates `.output/server/index.mjs` for Railway.
- `pnpm lint` has no errors.
- Production Lighthouse performance improved after Cloudflare image optimization, with a measured run reaching 85 performance, 100 accessibility, 92 best practices, and 100 SEO.
