import { google } from 'googleapis';

// Create OAuth2 client
export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Define scopes we need for Google Calendar and Meet
export const scopes = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events'
];

// Helper to check if tokens are valid
export async function verifyToken(accessToken: string) {
  if (!accessToken) return false;
  
  try {
    oauth2Client.setCredentials({
      access_token: accessToken
    });
    
    // Try a simple API call to verify token
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    await calendar.calendarList.list({ maxResults: 1 });
    return true;
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
  }
}

// Helper to refresh token if needed
export async function refreshAccessToken(refreshToken: string) {
  if (!refreshToken) return null;
  
  try {
    oauth2Client.setCredentials({
      refresh_token: refreshToken
    });
    
    const { credentials } = await oauth2Client.refreshAccessToken();
    return credentials;
  } catch (error) {
    console.error('Token refresh error:', error);
    return null;
  }
}
