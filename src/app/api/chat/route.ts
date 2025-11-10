import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText, convertToModelMessages } from 'ai';
import { CAPPYBOT_SYSTEM_PROMPT } from '@/lib/cappybot-context';
import { cappybotTools } from '@/lib/cappybot-tools';
import { rateLimit, getClientIdentifier } from '@/lib/rate-limit';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(req);
    const rateLimitResult = rateLimit(clientId, {
      maxRequests: 20, // 20 requests per minute (strict for chat API security)
      windowMs: 60000,
    });

    if (!rateLimitResult.success) {
      return new Response(
        JSON.stringify({
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000),
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // CORS check - only allow requests from your domain
    // Note: Scrapers typically don't send Origin header, so they won't be blocked
    const origin = req.headers.get('origin');
    const allowedOrigins = [
      'https://aysh.me',
      'https://www.aysh.me',
      process.env.NEXT_PUBLIC_SITE_URL,
      'http://localhost:3000', // For development
    ].filter(Boolean);

    // Only check CORS if Origin header is present (browsers send it, scrapers usually don't)
    if (origin && !allowedOrigins.includes(origin)) {
      return new Response('Forbidden', { status: 403 });
    }

    // Parse request body
    const { messages } = await req.json();

    if (!process.env.OPENROUTER_API_KEY) {
      return new Response('Service temporarily unavailable', { status: 503 });
    }

    const openrouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const result = streamText({
      model: openrouter.chat('x-ai/grok-4-fast'),
      system: CAPPYBOT_SYSTEM_PROMPT,
      messages: convertToModelMessages(messages),
      tools: cappybotTools,
    });

    const response = result.toUIMessageStreamResponse();

    // Add security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString());
    response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
    response.headers.set('X-RateLimit-Reset', new Date(rateLimitResult.reset).toISOString());

    return response;
  } catch (error) {
    // Log error securely (in production, use a logging service)
    if (process.env.NODE_ENV === 'development') {
      console.error('Chat API Error:', error);
    }

    // Generic error response (don't expose internal details)
    return new Response(
      JSON.stringify({
        error: 'An error occurred while processing your request. Please try again.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

