import { Resend } from 'resend';

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Parse name from email address
export function parseNameFromEmail(email: string): string {
  const localPart = email.split('@')[0];

  // Remove common separators and numbers
  const nameParts = localPart
    .replace(/[._-]/g, ' ')
    .replace(/\d+/g, '')
    .trim()
    .split(' ')
    .filter(part => part.length > 0);

  // Capitalize each part
  const capitalizedParts = nameParts.map(
    part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
  );

  return capitalizedParts.join(' ') || 'there';
}

// Send email using Resend
export async function sendResendEmail(options: EmailOptions): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set');
    }

    if (!process.env.RESEND_FROM_EMAIL) {
      throw new Error('RESEND_FROM_EMAIL is not set');
    }

    const { data, error } = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME || 'CappyBot'} <${process.env.RESEND_FROM_EMAIL}>`,
      to: [options.to],
      subject: options.subject,
      html: options.html || options.text || '',
      text: options.text,
    });

    if (error) {
      console.error('Error sending email via Resend:', error);
      return false;
    }

    console.log('Email sent successfully:', data?.id);
    return true;
  } catch (error) {
    console.error('Error sending email via Resend:', error);
    return false;
  }
}

// Send personalized thank you email to visitor
export async function sendThankYouEmail(
  visitorEmail: string,
  visitorName: string,
  message: string
): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set');
    }

    if (!process.env.RESEND_FROM_EMAIL) {
      throw new Error('RESEND_FROM_EMAIL is not set');
    }

    const htmlContent = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <p>Hi ${visitorName},</p>

  <p>Thank you for reaching out! I've received your message:</p>

  <blockquote style="border-left: 3px solid #ddd; padding-left: 15px; margin: 20px 0; color: #555;">
    ${message}
  </blockquote>

  <p>I'll review your inquiry and respond from <strong>hi@aysh.me</strong> soon.</p>

  <p>If you'd like to schedule a quick chat, feel free to book a meeting: <a href="https://aysh.me/book">https://aysh.me/book</a></p>

  <p>Best regards,<br>
  Ayush Sharma<br>
  <a href="mailto:hi@aysh.me">hi@aysh.me</a></p>

  <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
  <p style="font-size: 12px; color: #888;">This is an automated confirmation. You will receive a personal response from hi@aysh.me shortly.</p>
</body>
</html>
    `.trim();

    const textContent = `
Hi ${visitorName},

Thank you for reaching out! I've received your message:

"${message}"

I'll review your inquiry and respond from hi@aysh.me soon.

If you'd like to schedule a quick chat, feel free to book a meeting:
https://aysh.me/book

Best regards,
Ayush Sharma
hi@aysh.me

---
This is an automated confirmation. You will receive a personal response from hi@aysh.me shortly.
    `.trim();

    const { data, error } = await resend.emails.send({
      from: `Ayush Sharma <${process.env.RESEND_FROM_EMAIL}>`,
      to: [visitorEmail],
      subject: 'Message received - Ayush Sharma',
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error('Error sending thank you email:', error);
      return false;
    }

    console.log('Thank you email sent successfully:', data?.id);
    return true;
  } catch (error) {
    console.error('Error sending thank you email:', error);
    return false;
  }
}
