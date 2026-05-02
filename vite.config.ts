import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { nitro } from 'nitro/vite';
import { getAllBlogs } from './src/lib/blog';
import { getAllProjects } from './src/data/projects';

const staticPages = [
  '/',
  '/blogs',
  '/projects',
  '/robots.txt',
  '/llm.txt',
  '/llms.txt',
  '/sitemap.xml',
  ...getAllBlogs().map((blog) => `/blogs/${blog.slug}`),
  ...getAllProjects().map((project) => `/projects/${project.slug}`),
];

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

const apiHeaders = {
  ...securityHeaders,
  'Cache-Control': 'no-store, max-age=0',
};

export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      srcDirectory: 'src',
      router: {
        routesDirectory: 'routes',
        generatedRouteTree: 'routeTree.gen.ts',
      },
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoStaticPathsDiscovery: true,
        filter: ({ path }) => !['/x', '/book'].includes(path) && !path.endsWith('.pdf'),
        failOnError: true,
      },
      pages: staticPages.map((path) => ({ path, prerender: { enabled: true } })),
    }),
    viteReact(),
    nitro({
      routeRules: {
        '/**': {
          headers: securityHeaders,
        },
        '/api/**': {
          headers: apiHeaders,
        },
      },
    }),
  ],
});
