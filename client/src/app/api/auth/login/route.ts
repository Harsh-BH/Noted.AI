import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { signToken } from '@/lib/jwt';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    // Connect to database with better error handling
    try {
      await dbConnect();
      console.log('Connected to MongoDB in login route');
    } catch (dbError) {
      console.error('Database connection error in login route:', dbError);
      return NextResponse.json(
        { error: 'Database connection failed. Please try again later.' },
        { status: 503 }
      );
    }
    
    // Parse request body
    const { email, password } = await request.json();
    console.log('Processing login for:', email);
    
    // Check if user exists
    let user;
    try {
      user = await User.findOne({ email }).select('+password');
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }
    } catch (findError) {
      console.error('Error finding user:', findError);
      return NextResponse.json(
        { error: 'Error looking up account' },
        { status: 500 }
      );
    }
    
    // Check if password matches
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }
    } catch (passwordError) {
      console.error('Error comparing password:', passwordError);
      return NextResponse.json(
        { error: 'Error verifying credentials' },
        { status: 500 }
      );
    }
    
    // Generate JWT token
    const token = signToken({
      id: user._id,
      name: user.name,
      email: user.email,
    });
    
    console.log('Login successful, setting auth token for user:', user._id);
    
    // Create response with user data
    const response = NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      message: 'Login successful',
    });
    
    // Set cookie directly in response
    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'lax',
    });
    
    return response;
    
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
