import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

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

// Create transporter (reusable)
function createZohoTransporter() {
  if (!process.env.ZOHO_SMTP_HOST ||
      !process.env.ZOHO_SMTP_PORT ||
      !process.env.ZOHO_SMTP_USER ||
      !process.env.ZOHO_SMTP_PASSWORD ||
      !process.env.ZOHO_FROM_EMAIL) {
    throw new Error('Missing required Zoho SMTP environment variables');
  }

  return nodemailer.createTransport({
    host: process.env.ZOHO_SMTP_HOST,
    port: parseInt(process.env.ZOHO_SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.ZOHO_SMTP_USER,
      pass: process.env.ZOHO_SMTP_PASSWORD,
    },
  });
}

export async function sendZohoEmail(options: EmailOptions): Promise<boolean> {
  try {
    const transporter = createZohoTransporter();
    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"${process.env.ZOHO_FROM_NAME || 'CappyBot'}" <${process.env.ZOHO_FROM_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email via Zoho:', error);
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
    const transporter = createZohoTransporter();
    await transporter.verify();

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

  <p>If you'd like to schedule a quick chat, feel free to book a meeting: <a href="https://zcal.co/ayush/30min">https://zcal.co/ayush/30min</a></p>

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
https://zcal.co/ayush/30min

Best regards,
Ayush Sharma
hi@aysh.me

---
This is an automated confirmation. You will receive a personal response from hi@aysh.me shortly.
    `.trim();

    const info = await transporter.sendMail({
      from: `"Ayush Sharma" <${process.env.ZOHO_FROM_EMAIL}>`,
      to: visitorEmail,
      subject: `Message received - Ayush Sharma`,
      text: textContent,
      html: htmlContent,
    });

    console.log('Thank you email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending thank you email:', error);
    return false;
  }
}
