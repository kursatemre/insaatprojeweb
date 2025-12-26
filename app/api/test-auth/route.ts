import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';

export async function GET() {
  try {
    const result = await getCurrentSession();

    return NextResponse.json({
      success: true,
      authenticated: result.success,
      user: result.success ? result.user : null,
      error: result.error || null,
      env: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT_SET',
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'NOT_SET',
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      env: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT_SET',
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'NOT_SET',
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      }
    }, { status: 500 });
  }
}
