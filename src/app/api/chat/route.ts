import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText, convertToModelMessages } from 'ai';
import { CAPPYBOT_SYSTEM_PROMPT } from '@/lib/cappybot-context';
import { cappybotTools } from '@/lib/cappybot-tools';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENROUTER_API_KEY) {
      return new Response('OpenRouter API key not configured', { status: 500 });
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

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response('An error occurred while processing your request', {
      status: 500,
    });
  }
}

