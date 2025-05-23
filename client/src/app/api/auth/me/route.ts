import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request: Request) {
  try {
    // Get the token from cookies using the request header
    const token = request.headers.get('cookie')?.split(';')
      .find(c => c.trim().startsWith('auth-token='))
      ?.split('=')[1];
    
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      // Clear invalid token
      const response = NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
      response.cookies.delete('auth-token');
      return response;
    }
    
    // Connect to database
    await dbConnect();
    
    // Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      // User not found but token was valid
      const response = NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
      response.cookies.delete('auth-token');
      return response;
    }
    
    // Return user info
    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
    
  } catch (error: any) {
    console.error('Auth verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
