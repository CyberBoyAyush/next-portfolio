import { tool } from 'ai';
import { z } from 'zod';

export const sendContactEmailTool = tool({
  description: 'Send a contact email to Ayush when a visitor wants to reach out for work opportunities or collaboration. Only use this when the visitor explicitly provides their email and wants to contact Ayush.',
  inputSchema: z.object({
    visitorEmail: z.string().email().describe('The email address of the visitor who wants to contact Ayush'),
    visitorName: z.string().describe('The name of the visitor (if provided)'),
    message: z.string().describe('The message or inquiry from the visitor'),
  }),
  execute: async ({ visitorEmail, visitorName, message }) => {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          subject: `CappyBot Contact: ${visitorName || 'Visitor'} wants to connect`,
          from_name: 'CappyBot - Portfolio Assistant',
          email: visitorEmail,
          name: visitorName || 'Visitor',
          message: `
New contact request from CappyBot:

From: ${visitorName || 'Visitor'}
Email: ${visitorEmail}

Message:
${message}

---
This message was sent via CappyBot on your portfolio.
          `.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        return {
          success: true,
          message: `Thank you so much for reaching out! I've successfully forwarded your inquiry to Ayush. He'll review your message and get back to you at ${visitorEmail} as soon as possible. Looking forward to connecting you both!`,
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

