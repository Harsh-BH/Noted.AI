import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { signToken } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    // Connect to database with better error handling
    try {
      await dbConnect();
      console.log('Connected to MongoDB in signup route');
    } catch (dbError) {
      console.error('Database connection error in signup route:', dbError);
      return NextResponse.json(
        { error: 'Database connection failed. Please try again later.' },
        { status: 503 }
      );
    }
    
    // Parse request body
    const { name, email, password } = await request.json();
    console.log('Processing signup for:', email);
    
    // Check if user already exists
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 409 }
        );
      }
    } catch (findError) {
      console.error('Error checking for existing user:', findError);
      return NextResponse.json(
        { error: 'Error checking for existing user' },
        { status: 500 }
      );
    }
    
    // Create new user
    let user;
    try {
      user = await User.create({
        name,
        email,
        password,
      });
      console.log('User created successfully:', user._id);
    } catch (createError) {
      console.error('Error creating user:', createError);
      return NextResponse.json(
        { error: 'Failed to create user account' },
        { status: 500 }
      );
    }
    
    // Generate JWT token
    const token = signToken({
      id: user._id,
      name: user.name,
      email: user.email,
    });
    
    // Create response with user data
    const response = NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      message: 'Account created successfully',
    }, { status: 201 });
    
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
    console.error('Signup error:', error);
    
    // Provide more specific error messages based on error type
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Invalid user data: ' + error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
