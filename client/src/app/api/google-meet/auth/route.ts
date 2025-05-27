import { NextRequest, NextResponse } from "next/server";
import { google } from 'googleapis';
import { cookies } from 'next/headers';

// Google OAuth2 configuration
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI // e.g., http://localhost:3000/api/google-meet/callback
);

// Generate auth URL
export async function GET(req: NextRequest) {
  try {
    const scopes = [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events'
    ];

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent',
      include_granted_scopes: true,
      redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
    });

    return NextResponse.json({ authUrl });
  } catch (error) {
    console.error("Google auth generation error:", error);
    return NextResponse.json({ error: "Failed to generate auth URL" }, { status: 500 });
  }
}

// Handle token exchange
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { code } = data;
    
    const { tokens } = await oauth2Client.getToken(code);
    
    // Fix: await the cookies() call
    const cookieStore = await cookies();
    
    if (tokens.access_token) {
      cookieStore.set('google_access_token', tokens.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 1 hour
        path: '/',
      });
    }
    
    if (tokens.refresh_token) {
      cookieStore.set('google_refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('OAuth token exchange error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
