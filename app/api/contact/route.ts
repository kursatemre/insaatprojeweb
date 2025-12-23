import { NextRequest, NextResponse } from 'next/server';
import { createMessage } from '@/lib/api/messages';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, company, location, project_type, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !project_type || !message) {
      return NextResponse.json(
        { success: false, error: 'Zorunlu alanlar eksik' },
        { status: 400 }
      );
    }

    // Save to database
    const result = await createMessage({
      name,
      email,
      phone,
      company: company || undefined,
      location: location || undefined,
      project_type,
      message,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    // TODO: Send email notification
    // Email notification can be implemented with services like:
    // - Resend (https://resend.com)
    // - SendGrid
    // - Nodemailer with SMTP
    //
    // Example with Resend:
    // const emailResult = await sendEmailNotification({
    //   to: 'info@ekipproje.com',
    //   subject: `Yeni İletişim Formu - ${project_type}`,
    //   data: { name, email, phone, company, location, project_type, message }
    // });

    return NextResponse.json({
      success: true,
      data: result.data,
      message: 'Mesajınız başarıyla gönderildi!',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
