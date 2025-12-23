/**
 * Email Service
 *
 * This file provides email notification functionality.
 * Currently configured for future integration with email services like:
 * - Resend (https://resend.com) - Recommended for Next.js
 * - SendGrid
 * - AWS SES
 * - Nodemailer with SMTP
 *
 * To enable email notifications:
 * 1. Choose an email service provider
 * 2. Add API keys to .env.local
 * 3. Uncomment and configure the sendEmail function below
 * 4. Call this function from API routes
 */

interface EmailData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  location?: string;
  project_type: string;
  message: string;
}

/**
 * Send email notification for new contact form submission
 *
 * @param data Contact form data
 * @returns Promise with success status
 */
export async function sendContactNotification(data: EmailData): Promise<{ success: boolean; error?: string }> {
  // TODO: Implement with your chosen email service

  // Example with Resend:
  /*
  import { Resend } from 'resend';
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'Ekip Proje <onboarding@resend.dev>',
      to: 'info@ekipproje.com',
      subject: `Yeni İletişim Formu - ${data.project_type}`,
      html: `
        <h2>Yeni İletişim Formu Mesajı</h2>
        <p><strong>Ad Soyad:</strong> ${data.name}</p>
        <p><strong>E-posta:</strong> ${data.email}</p>
        <p><strong>Telefon:</strong> ${data.phone}</p>
        ${data.company ? `<p><strong>Şirket:</strong> ${data.company}</p>` : ''}
        ${data.location ? `<p><strong>Şehir:</strong> ${data.location}</p>` : ''}
        <p><strong>Proje Türü:</strong> ${data.project_type}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${data.message}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: 'Email gönderilemedi' };
  }
  */

  // For now, just log (development mode)
  if (process.env.NODE_ENV === 'development') {
    console.log('📧 Email Notification (Development Mode)');
    console.log('To: info@ekipproje.com');
    console.log('Subject:', `Yeni İletişim Formu - ${data.project_type}`);
    console.log('Data:', data);
  }

  // Return success for now (no actual email sent)
  return { success: true };
}

/**
 * Configuration Instructions:
 *
 * 1. For Resend (Recommended):
 *    npm install resend
 *    Add to .env.local: RESEND_API_KEY=your_api_key
 *
 * 2. For SendGrid:
 *    npm install @sendgrid/mail
 *    Add to .env.local: SENDGRID_API_KEY=your_api_key
 *
 * 3. For Nodemailer (SMTP):
 *    npm install nodemailer
 *    Add to .env.local:
 *      SMTP_HOST=smtp.gmail.com
 *      SMTP_PORT=587
 *      SMTP_USER=your_email
 *      SMTP_PASS=your_password
 */
