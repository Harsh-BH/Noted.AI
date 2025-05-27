import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

// Handle OAuth callback from Google
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get('code');
  
  if (!code) {
    return NextResponse.redirect(new URL('/dashboard/live/schedule?error=no_code', req.url));
  }

  try {
    // Exchange code for tokens
    const response = await fetch(`${req.nextUrl.origin}/api/google-meet/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to exchange code for tokens');
    }

    return NextResponse.redirect(new URL('/dashboard/live/schedule?auth=success', req.url));
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(new URL('/dashboard/live/schedule?error=auth_failed', req.url));
  }
}
