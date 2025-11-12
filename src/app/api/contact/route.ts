import { sendZohoEmail, sendThankYouEmail, parseNameFromEmail } from '@/lib/zoho-mail';
import { sanitizeEmailContent, sanitizeName, isValidEmail } from '@/lib/input-validation';
import { rateLimit, getClientIdentifier } from '@/lib/rate-limit';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(req);
    const rateLimitResult = rateLimit(clientId, {
      maxRequests: 5, // 5 contact form submissions per minute
      windowMs: 60000,
    });

    if (!rateLimitResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000),
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // Parse request body
    const { name, email, message } = await req.json();

    // Validate inputs
    if (!email || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid email address',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Sanitize inputs
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedMessage = sanitizeEmailContent(message);

    // Parse name from email if not provided or too short
    let sanitizedName = sanitizeName(name);
    if (!sanitizedName || sanitizedName.length < 2) {
      sanitizedName = parseNameFromEmail(sanitizedEmail);
    }

    // Validate message length
    if (sanitizedMessage.length < 5) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Message is too short (minimum 5 characters)',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Prepare email body for notification
    const emailBody = `
New contact form submission:

From: ${sanitizedName}
Email: ${sanitizedEmail}

Message:
${sanitizedMessage}

---
This message was sent via the contact form on your portfolio.
    `.trim();

    // Send notification email to Ayush
    const notificationSent = await sendZohoEmail({
      to: process.env.ZOHO_TO_EMAIL || 'hi@aysh.me',
      subject: `Contact Form: ${sanitizedName} sent you a message`,
      text: emailBody,
      html: emailBody.replace(/\n/g, '<br>'),
    });

    if (!notificationSent) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to send message. Please try again later.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Send thank you email to visitor
    await sendThankYouEmail(sanitizedEmail, sanitizedName, sanitizedMessage);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message sent successfully',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'An error occurred. Please try again.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
