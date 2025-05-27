import { NextRequest, NextResponse } from "next/server";
import { google } from 'googleapis';
import { cookies } from 'next/headers';

// Google OAuth2 configuration
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('google_access_token')?.value;
    const refreshToken = cookieStore.get('google_refresh_token')?.value;
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated with Google Calendar' },
        { status: 401 }
      );
    }

    // Set tokens to OAuth client
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    
    // Get session data from request body
    const sessionData = await req.json();
    const {
      title,
      description,
      date,
      time,
      duration,
      participants,
      isPublic
    } = sessionData;

    // Parse date and time to create proper datetime string
    const [hours, minutes] = time.split(':');
    const startDateTime = new Date(date);
    startDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    
    // Calculate end time based on duration (in minutes)
    const endDateTime = new Date(startDateTime.getTime());
    endDateTime.setMinutes(endDateTime.getMinutes() + parseInt(duration, 10));
    
    // Format emails for attendees
    let attendees = [];
    if (Array.isArray(participants) && participants.length > 0) {
      attendees = participants.map((email: string) => ({ email }));
    }

    // Create calendar event with conferencing
    const event = {
      summary: title,
      description,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      attendees,
      // This is the key part for Google Meet integration
      conferenceData: {
        createRequest: {
          requestId: `noted-ai-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' }
        }
      },
      // For public meetings
      visibility: isPublic ? 'public' : 'private',
    };

    // Create the event with conferencing data
    const response = await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      requestBody: event,
    });

    // Extract the Google Meet link
    const meetLink = response.data.hangoutLink || '';
    
    return NextResponse.json({
      success: true,
      eventId: response.data.id,
      meetLink,
      eventData: response.data
    });
  } catch (error: any) {
    console.error('Google Calendar API error:', error);
    
    // If the error is related to authentication, clear tokens
    if (error.code === 401) {
      cookies().delete('google_access_token');
    }
    
    return NextResponse.json(
      { error: error.message || 'Failed to create Google Meet event' },
      { status: error.code || 500 }
    );
  }
}
