<!-- Added: 2026-05-02 -->
## TanStack Start Migration
Use TanStack Start with Vite and Nitro for the portfolio app instead of Next.js. The production command is `node .output/server/index.mjs`, build output lives in `.output/`, and global/API headers are configured through Nitro `routeRules` in `vite.config.ts`.
