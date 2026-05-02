import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/book')({
  server: {
    handlers: {
      GET: async () => Response.redirect('https://cal.com/cyberboyayush/30min', 302),
    },
  },
});
