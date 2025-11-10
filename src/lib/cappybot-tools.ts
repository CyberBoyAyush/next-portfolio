import { tool } from 'ai';
import { z } from 'zod';
import { sanitizeEmailContent, sanitizeName, isValidEmail } from './input-validation';

export const sendContactEmailTool = tool({
  description: 'Send a contact email to Ayush when a visitor wants to reach out for work opportunities or collaboration. Only use this when the visitor explicitly provides their email and wants to contact Ayush.',
  inputSchema: z.object({
    visitorEmail: z.string().email().describe('The email address of the visitor who wants to contact Ayush'),
    visitorName: z.string().describe('The name of the visitor (if provided)'),
    message: z.string().describe('The message or inquiry from the visitor'),
  }),
  execute: async ({ visitorEmail, visitorName, message }) => {
    try {
      // Validate and sanitize inputs
      if (!isValidEmail(visitorEmail)) {
        return {
          success: false,
          message: 'Please provide a valid email address.',
        };
      }

      const sanitizedName = sanitizeName(visitorName);
      const sanitizedMessage = sanitizeEmailContent(message);
      const sanitizedEmail = visitorEmail.trim().toLowerCase();

      // Additional validation
      if (sanitizedMessage.length < 10) {
        return {
          success: false,
          message: 'Please provide a more detailed message (at least 10 characters).',
        };
      }
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          subject: `CappyBot Contact: ${sanitizedName} wants to connect`,
          from_name: 'CappyBot - Portfolio Assistant',
          email: sanitizedEmail,
          name: sanitizedName,
          message: `
New contact request from CappyBot:

From: ${sanitizedName}
Email: ${sanitizedEmail}

Message:
${sanitizedMessage}

---
This message was sent via CappyBot on your portfolio.
          `.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        return {
          success: true,
          message: `Thank you so much for reaching out! I've successfully forwarded your inquiry to Ayush. He'll review your message and get back to you at ${sanitizedEmail} as soon as possible. Looking forward to connecting you both!`,
        };
      } else {
        return {
          success: false,
          message: 'I apologize, but there was an issue sending your message. Please try contacting Ayush directly at hi@aysh.me or connect with him on LinkedIn.',
        };
      }
    } catch (error) {
      console.error('Error sending contact email:', error);
      return {
        success: false,
        message: 'I apologize, but there was an issue sending your message. Please try contacting Ayush directly at hi@aysh.me or connect with him on LinkedIn.',
      };
    }
  },
});

export const cappybotTools = {
  sendContactEmail: sendContactEmailTool,
};

