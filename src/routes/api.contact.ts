import { createFileRoute } from '@tanstack/react-router';
import { sendResendEmail, sendThankYouEmail, parseNameFromEmail } from '@/lib/resend-mail';
import { isValidEmail, sanitizeEmailContent, sanitizeName } from '@/lib/input-validation';
import { getClientIdentifier, rateLimit } from '@/lib/rate-limit';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export const Route = createFileRoute('/api/contact')({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders() }),
      POST: async ({ request }) => {
        try {
          const missingVars = ['RESEND_API_KEY', 'RESEND_FROM_EMAIL'].filter((varName) => !process.env[varName]);
          if (missingVars.length > 0) {
            return Response.json({ success: false, error: 'Server configuration error. Please contact the administrator.', details: process.env.NODE_ENV === 'development' ? `Missing: ${missingVars.join(', ')}` : undefined }, { status: 500, headers: corsHeaders() });
          }

          const clientId = getClientIdentifier(request);
          const rateLimitResult = rateLimit(clientId, { maxRequests: 5, windowMs: 60000 });
          if (!rateLimitResult.success) {
            return Response.json({ success: false, error: 'Too many requests. Please try again later.', retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000) }, { status: 429, headers: { ...corsHeaders(), 'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString() } });
          }

          const { name, email, message } = await request.json() as { name?: string; email?: string; message?: string };
          if (!email || !message) return Response.json({ success: false, error: 'Missing required fields' }, { status: 400, headers: corsHeaders() });
          if (!isValidEmail(email)) return Response.json({ success: false, error: 'Invalid email address' }, { status: 400, headers: corsHeaders() });

          const sanitizedEmail = email.trim().toLowerCase();
          const sanitizedMessage = sanitizeEmailContent(message);
          let sanitizedName = sanitizeName(name ?? '');
          if (!sanitizedName || sanitizedName.length < 2) sanitizedName = parseNameFromEmail(sanitizedEmail);
          if (sanitizedMessage.length < 5) return Response.json({ success: false, error: 'Message is too short (minimum 5 characters)' }, { status: 400, headers: corsHeaders() });

          const emailBody = `New contact form submission:\n\nFrom: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\nMessage:\n${sanitizedMessage}\n\n---\nThis message was sent via the contact form on your portfolio.`;
          const notificationSent = await sendResendEmail({
            to: process.env.RESEND_TO_EMAIL || 'hi@aysh.me',
            subject: `Contact Form: ${sanitizedName} sent you a message`,
            text: emailBody,
            html: emailBody.replace(/\n/g, '<br>'),
          });

          if (!notificationSent) return Response.json({ success: false, error: 'Failed to send message. Please try again later.' }, { status: 500, headers: corsHeaders() });
          sendThankYouEmail(sanitizedEmail, sanitizedName, sanitizedMessage).catch((error) => console.error('Failed to send thank you email (non-blocking):', error));
          return Response.json({ success: true, message: 'Message sent successfully' }, { headers: corsHeaders() });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error('Contact form error:', error);
          return Response.json({ success: false, error: 'An error occurred. Please try again.', details: process.env.NODE_ENV === 'development' ? errorMessage : undefined }, { status: 500, headers: corsHeaders() });
        }
      },
    },
  },
});
