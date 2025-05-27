import { NextResponse } from "next/server";
import { oauth2Client } from "@/lib/google/auth";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  
  // Handle OAuth errors
  if (error) {
    // Extract error details
    const errorCode = error;
    const errorDescription = url.searchParams.get("error_description") || "Authentication failed";
    
    // Redirect to the schedule page with error parameters
    const redirectUrl = `/dashboard/live/schedule?error=${errorCode}&error_message=${encodeURIComponent(errorDescription)}`;
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }
  
  // Handle successful authentication
  if (code) {
    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
      
      // Store tokens securely (e.g., in database or encrypted cookies)
      // This is simplified - in production, store in secure session/DB
      const session = { /* Your session handling logic */ };
      
      // Redirect back to schedule page with success parameter
      return NextResponse.redirect(new URL("/dashboard/live/schedule?auth=success", request.url));
    } catch (error: any) {
      console.error("Token exchange error:", error);
      
      // Handle specific OAuth errors
      const errorMessage = error.message || "Failed to authenticate";
      const errorCode = error.code || "unknown_error";
      
      // Redirect with error information
      return NextResponse.redirect(
        new URL(`/dashboard/live/schedule?error=${errorCode}&error_message=${encodeURIComponent(errorMessage)}`, request.url)
      );
    }
  }
  
  // No code or error - something went wrong
  return NextResponse.redirect(new URL("/dashboard/live/schedule?error=no_response", request.url));
}
