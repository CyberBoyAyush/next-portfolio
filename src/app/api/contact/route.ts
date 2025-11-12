import { sendZohoEmail, sendThankYouEmail, parseNameFromEmail } from '@/lib/zoho-mail';
import { sanitizeEmailContent, sanitizeName, isValidEmail } from '@/lib/input-validation';
import { rateLimit, getClientIdentifier } from '@/lib/rate-limit';

export const maxDuration = 30;

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: Request) {
  try {
    // Early environment variable validation
    const requiredEnvVars = [
      'ZOHO_SMTP_HOST',
      'ZOHO_SMTP_PORT',
      'ZOHO_SMTP_USER',
      'ZOHO_SMTP_PASSWORD',
      'ZOHO_FROM_EMAIL',
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
      console.error('Missing environment variables:', missingVars);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Server configuration error. Please contact the administrator.',
          details: process.env.NODE_ENV === 'development'
            ? `Missing: ${missingVars.join(', ')}`
            : undefined,
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }
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
            ...corsHeaders,
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
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
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
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
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
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
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
      console.error('Failed to send notification email to:', process.env.ZOHO_TO_EMAIL);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to send message. Please try again later.',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    // Send thank you email to visitor (non-blocking)
    sendThankYouEmail(sanitizedEmail, sanitizedName, sanitizedMessage).catch(error => {
      console.error('Failed to send thank you email (non-blocking):', error);
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message sent successfully',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'An error occurred. Please try again.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
}
