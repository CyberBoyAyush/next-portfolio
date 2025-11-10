import { z } from 'zod';

// Maximum message length (characters)
const MAX_MESSAGE_LENGTH = 2000;

// Maximum number of messages in a single request
const MAX_MESSAGES_COUNT = 50;

// Message schema
const MessagePartSchema = z.object({
  type: z.enum(['text', 'tool-call', 'tool-result']),
  text: z.string().max(MAX_MESSAGE_LENGTH).optional(),
  toolCallId: z.string().optional(),
  toolName: z.string().optional(),
  args: z.record(z.string(), z.unknown()).optional(),
  result: z.unknown().optional(),
  output: z.unknown().optional(),
});

const MessageSchema = z.object({
  id: z.string().optional(),
  role: z.enum(['user', 'assistant', 'system']),
  parts: z.array(MessagePartSchema).optional(),
  content: z.string().max(MAX_MESSAGE_LENGTH).optional(),
  createdAt: z.date().optional(),
});

const ChatRequestSchema = z.object({
  messages: z.array(MessageSchema).max(MAX_MESSAGES_COUNT),
});

export function validateChatRequest(data: unknown) {
  return ChatRequestSchema.parse(data);
}

// Sanitize text to prevent injection attacks
export function sanitizeText(text: string): string {
  // Remove null bytes
  let sanitized = text.replace(/\0/g, '');
  
  // Limit length
  if (sanitized.length > MAX_MESSAGE_LENGTH) {
    sanitized = sanitized.substring(0, MAX_MESSAGE_LENGTH);
  }
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  return sanitized;
}

// Sanitize email content to prevent injection
export function sanitizeEmailContent(text: string): string {
  // Remove potentially dangerous characters for email injection
  let sanitized = text
    .replace(/[\r\n]+/g, '\n') // Normalize line breaks
    .replace(/\0/g, '') // Remove null bytes
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim();
  
  // Limit length
  if (sanitized.length > 5000) {
    sanitized = sanitized.substring(0, 5000);
  }
  
  return sanitized;
}

// Validate email format strictly
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Sanitize name to prevent injection
export function sanitizeName(name: string): string {
  // Allow only alphanumeric, spaces, hyphens, and common name characters
  let sanitized = name
    .replace(/[^a-zA-Z0-9\s\-'.]/g, '')
    .trim();
  
  // Limit length
  if (sanitized.length > 100) {
    sanitized = sanitized.substring(0, 100);
  }
  
  return sanitized || 'Visitor';
}

export const INPUT_LIMITS = {
  MAX_MESSAGE_LENGTH,
  MAX_MESSAGES_COUNT,
  MAX_EMAIL_LENGTH: 254,
  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_BODY_LENGTH: 5000,
};

