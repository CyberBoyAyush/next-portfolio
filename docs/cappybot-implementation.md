# CappyBot Implementation Guide

## Overview
CappyBot is an AI-powered portfolio assistant chatbot integrated into the Next.js portfolio website. It uses OpenRouter's Google Gemini 2.5 Flash Lite model and AI SDK v5 to provide visitors with information about Ayush Sharma's work, experience, and projects.

## Features
- **AI-Powered Chat**: Uses Google Gemini 2.5 Flash Lite via OpenRouter
- **Context Grounding**: Leverages existing ai.txt content for accurate responses
- **Email Tool**: Integrated Web3Forms for contact requests
- **Modern UI**: Floating chat button with dark theme and orange accent colors
- **Streaming Responses**: Real-time message streaming using AI SDK v5

## Architecture

### Files Created
1. **src/app/api/chat/route.ts** - API route for chat endpoint
2. **src/components/CappyBot.tsx** - Main chatbot UI component
3. **src/lib/cappybot-context.ts** - System prompt and context
4. **src/lib/cappybot-tools.ts** - Tool definitions (email tool)

### Files Modified
1. **src/app/layout.tsx** - Added CappyBot component
2. **.env.example** - Added environment variable documentation

## Technical Stack
- **AI SDK**: v5 (@ai-sdk/react, ai)
- **LLM Provider**: OpenRouter (@openrouter/ai-sdk-provider)
- **Model**: google/gemini-2.5-flash-lite-preview-09-2025
- **Email Service**: Web3Forms
- **Validation**: Zod
- **UI Framework**: React with Tailwind CSS

## Key Implementation Details

### AI SDK v5 Migration
The implementation uses AI SDK v5 which has several API changes from v4:
- `useChat` hook uses `DefaultChatTransport` for configuration
- `status` property instead of `isLoading`
- Message structure uses `parts` array with typed content
- `sendMessage({ text: string })` instead of `handleSubmit`
- Tool definitions use `inputSchema` instead of `parameters`
- `toUIMessageStreamResponse()` instead of `toDataStreamResponse()`

### Chat Component Structure
```typescript
const { messages, sendMessage, status } = useChat({
  transport: new DefaultChatTransport({
    api: '/api/chat',
  }),
});

const isLoading = status === 'streaming';
```

### Message Rendering
Messages use a parts-based structure:
```typescript
{message.parts?.map((part, i) => {
  if (part.type === 'text') {
    return <span key={i}>{part.text}</span>;
  }
  return null;
})}
```

### Tool Definition
Tools use the new `inputSchema` property:
```typescript
export const sendContactEmailTool = tool({
  description: '...',
  inputSchema: z.object({
    visitorEmail: z.string().email().describe('...'),
    visitorName: z.string().describe('...'),
    message: z.string().describe('...'),
  }),
  execute: async ({ visitorEmail, visitorName, message }) => {
    // Implementation
  },
});
```

## Environment Variables
Required environment variables (add to `.env.local`):

```bash
# OpenRouter API Key (Required)
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Web3Forms Access Key (Required for email tool)
WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here
```

## Setup Instructions

1. **Install Dependencies** (Already done):
   ```bash
   pnpm add ai @ai-sdk/react @openrouter/ai-sdk-provider zod
   ```

2. **Configure Environment Variables**:
   - Copy `.env.example` to `.env.local`
   - Get OpenRouter API key from https://openrouter.ai/
   - Get Web3Forms access key from https://web3forms.com/
   - Update the values in `.env.local`

3. **Build and Test**:
   ```bash
   pnpm run build
   pnpm run dev
   ```

## UI Features

### Floating Button
- Fixed position at bottom-right corner
- Orange gradient background
- Hover animation (scale effect)
- Toggle between MessageCircle and X icons

### Chat Window
- 600px height, 400px width
- Dark theme with neutral-800 borders
- Scrollable message area
- Quick question buttons
- Real-time streaming indicator

### Message Bubbles
- User messages: Orange gradient background
- Assistant messages: Dark neutral background
- Timestamp display
- Rounded corners for modern look

## Context Grounding
CappyBot uses the existing ai.txt content which includes:
- Professional background and experience
- Technical skills and technologies
- Project portfolio
- Contact information
- Work preferences and availability

## Tool Usage
The email tool is triggered when:
- Visitor provides their email address
- Visitor expresses interest in contacting Ayush
- Visitor mentions work opportunities or collaboration

## Best Practices
1. **Minimal File Changes**: Only modified necessary files
2. **Type Safety**: Full TypeScript support with proper types
3. **Error Handling**: Graceful error handling in API and UI
4. **Responsive Design**: Mobile-friendly chat interface
5. **Performance**: Streaming responses for better UX

## Testing Checklist
- [ ] Chat window opens/closes correctly
- [ ] Messages send and receive properly
- [ ] Streaming responses work
- [ ] Quick questions trigger responses
- [ ] Email tool activates when appropriate
- [ ] Error states display correctly
- [ ] Mobile responsiveness works
- [ ] Build completes without errors

## Future Enhancements
- Message persistence (save chat history)
- Typing indicators
- Message reactions
- File attachments
- Voice input/output
- Multi-language support

## Troubleshooting

### Build Errors
- Ensure all dependencies are installed
- Check TypeScript version compatibility
- Verify AI SDK v5 is being used

### Runtime Errors
- Verify environment variables are set
- Check OpenRouter API key is valid
- Ensure Web3Forms access key is correct
- Check browser console for errors

### Styling Issues
- Verify Tailwind CSS is configured
- Check for conflicting CSS classes
- Ensure lucide-react icons are installed

## Resources
- [AI SDK v5 Documentation](https://v5.ai-sdk.dev/)
- [OpenRouter Documentation](https://openrouter.ai/docs)
- [Web3Forms Documentation](https://docs.web3forms.com/)
- [Vercel AI SDK Migration Guide](https://ai-sdk.dev/docs/migration-guides/migration-guide-5-0)

