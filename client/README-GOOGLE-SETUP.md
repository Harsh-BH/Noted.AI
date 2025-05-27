# Setting Up Google Calendar API Integration

This guide will help you set up the Google Calendar API to enable Google Meet creation functionality in the Noted.AI application.

## 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Take note of your Project ID

## 2. Enable Required APIs

1. Navigate to "APIs & Services" > "Library"
2. Search for and enable the following APIs:
   - Google Calendar API
   - Google Meet API

## 3. Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Select User Type (External or Internal)
3. Fill in the required information:
   - App name: Noted.AI
   - User support email: your-email@example.com
   - Developer contact information: your-email@example.com
4. Add the following scopes:
   - `https://www.googleapis.com/auth/calendar`
   - `https://www.googleapis.com/auth/calendar.events`
5. Add any test users if using External user type

## 4. Create OAuth 2.0 Client ID

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth Client ID"
3. Application type: Web application
4. Name: Noted.AI Web Client
5. Add Authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - Your production URL
6. Add Authorized redirect URIs:
   - `http://localhost:3000/api/google-meet/callback` (for development)
   - Your production callback URL
7. Click "Create"
8. Note your Client ID and Client Secret

## 5. Configure Environment Variables

Add the following to your `.env.local` file:

```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/api/google-meet/callback
```

## 6. Install Required Packages

Run:

```bash
npm install googleapis
```

## 7. Testing the Integration

1. Start your application
2. Navigate to the Schedule Session page
3. Click "Connect Google Calendar"
4. Go through the OAuth consent flow
5. Once authenticated, you should be able to create Google Meet links

## Troubleshooting

- **API Not Enabled**: Make sure you've enabled both Google Calendar and Google Meet APIs
- **OAuth Errors**: Check that your redirect URIs are correctly configured
- **Invalid Client**: Verify your Client ID and Client Secret are correctly set in environment variables
- **Scope Issues**: Ensure the requested scopes match those configured in the OAuth consent screen
