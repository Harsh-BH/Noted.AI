import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  // Fix: await the cookies() call
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('google_access_token')?.value;
  
  return NextResponse.json({
    isAuthenticated: !!accessToken
  });
}
