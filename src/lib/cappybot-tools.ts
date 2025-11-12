import { tool } from 'ai';
import { z } from 'zod';
import { sanitizeEmailContent, sanitizeName, isValidEmail } from './input-validation';
import { sendResendEmail, sendThankYouEmail, parseNameFromEmail } from './resend-mail';

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

      const sanitizedEmail = visitorEmail.trim().toLowerCase();
      const sanitizedMessage = sanitizeEmailContent(message);

      // Parse name from email if not provided or too short
      let sanitizedName = sanitizeName(visitorName);
      if (!sanitizedName || sanitizedName.length < 2) {
        sanitizedName = parseNameFromEmail(sanitizedEmail);
      }

      // Additional validation
      if (sanitizedMessage.length < 10) {
        return {
          success: false,
          message: 'Please provide a more detailed message (at least 10 characters).',
        };
      }
      const emailBody = `
New contact request from CappyBot:

From: ${sanitizedName}
Email: ${sanitizedEmail}

Message:
${sanitizedMessage}

---
This message was sent via CappyBot on your portfolio.
      `.trim();

      // Send notification email to Ayush
      const notificationSent = await sendResendEmail({
        to: process.env.RESEND_TO_EMAIL || 'hi@aysh.me',
        subject: `CappyBot Contact: ${sanitizedName} wants to connect`,
        text: emailBody,
        html: emailBody.replace(/\n/g, '<br>'),
      });

      if (!notificationSent) {
        return {
          success: false,
          message: 'I apologize, but there was an issue sending your message. Please try contacting Ayush directly at hi@aysh.me or connect with him on LinkedIn.',
        };
      }

      // Send thank you email to visitor
      const thankYouSent = await sendThankYouEmail(
        sanitizedEmail,
        sanitizedName,
        sanitizedMessage
      );

      if (thankYouSent) {
        return {
          success: true,
          message: `Thank you so much for reaching out, ${sanitizedName}! I've successfully forwarded your inquiry to Ayush, and you should receive a confirmation email shortly at ${sanitizedEmail}. Ayush will review your message and get back to you from hi@aysh.me as soon as possible. Looking forward to connecting you both!`,
        };
      } else {
        // Notification sent but thank you email failed
        return {
          success: true,
          message: `Thank you so much for reaching out, ${sanitizedName}! I've successfully forwarded your inquiry to Ayush. He'll review your message and get back to you at ${sanitizedEmail} as soon as possible. (Note: There was an issue sending the confirmation email, but your message was delivered to Ayush!)`,
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

