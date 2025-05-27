import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function DELETE(request: Request) {
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
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Connect to database
    await dbConnect();
    
    // Find and delete user
    const user = await User.findByIdAndDelete(decoded.id);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Create response and clear auth token
    const response = NextResponse.json({ message: 'Account deleted successfully' });
    response.cookies.delete('auth-token');
    
    return response;
    
  } catch (error: any) {
    console.error('Account deletion error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}