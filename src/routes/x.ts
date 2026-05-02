import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/x')({
  server: {
    handlers: {
      GET: async () => Response.redirect('https://x.com/theayush', 302),
    },
  },
});
