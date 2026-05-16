import { createFileRoute } from '@tanstack/react-router';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { convertToModelMessages, streamText } from 'ai';
import type { UIMessage } from 'ai';
import { CAPPYBOT_SYSTEM_PROMPT } from '@/lib/cappybot-context';
import { cappybotTools } from '@/lib/cappybot-tools';
import { getClientIdentifier, rateLimit } from '@/lib/rate-limit';

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const clientId = getClientIdentifier(request);
          const rateLimitResult = rateLimit(clientId, { maxRequests: 20, windowMs: 60000 });
          if (!rateLimitResult.success) {
            return Response.json(
              { error: 'Too many requests. Please try again later.', retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000) },
              {
                status: 429,
                headers: {
                  'X-RateLimit-Limit': rateLimitResult.limit.toString(),
                  'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
                  'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
                  'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
                },
              }
            );
          }

          const origin = request.headers.get('origin');
          const allowedOrigins = ['https://aysh.me', 'https://www.aysh.me', process.env.NEXT_PUBLIC_SITE_URL, 'http://localhost:3000'].filter(Boolean);
          if (origin && !allowedOrigins.includes(origin)) return new Response('Forbidden', { status: 403 });

          const { messages } = await request.json() as { messages: Omit<UIMessage, 'id'>[] };
          if (!process.env.OPENROUTER_API_KEY) return new Response('Service temporarily unavailable', { status: 503 });

          const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });
          // grok-4-fast was deprecated in May 2026. xAI recommends grok-4.3.
          const result = streamText({
            model: openrouter.chat('x-ai/grok-4.3'),
            system: CAPPYBOT_SYSTEM_PROMPT,
            messages: convertToModelMessages(messages),
            tools: cappybotTools,
          });

          const response = result.toUIMessageStreamResponse();
          response.headers.set('X-Content-Type-Options', 'nosniff');
          response.headers.set('X-Frame-Options', 'DENY');
          response.headers.set('X-XSS-Protection', '1; mode=block');
          response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
          response.headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString());
          response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
          response.headers.set('X-RateLimit-Reset', new Date(rateLimitResult.reset).toISOString());
          return response;
        } catch (error) {
          if (process.env.NODE_ENV === 'development') console.error('Chat API Error:', error);
          return Response.json({ error: 'An error occurred while processing your request. Please try again.' }, { status: 500 });
        }
      },
    },
  },
});
