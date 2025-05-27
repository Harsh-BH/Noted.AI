import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// Schema for profile updates
const profileUpdateSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).optional(),
  bio: z.string().max(160).optional(),
  jobTitle: z.string().optional(),
  location: z.string().optional(),
  timezone: z.string().optional(),
  avatar: z.string().optional(),
});

// Schema for password change
const passwordUpdateSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
}).refine(data => data.currentPassword !== data.newPassword, {
  message: "New password must be different from current password",
  path: ["newPassword"],
});

// Schema for notification preferences
const notificationUpdateSchema = z.object({
  notificationsEnabled: z.boolean().optional(),
  emailNotificationsEnabled: z.boolean().optional(),
  soundNotificationsEnabled: z.boolean().optional(),
});

// Schema for appearance preferences
const appearanceUpdateSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).optional(),
});

// Helper function to authenticate and get user
async function authenticateAndGetUser(request: Request) {
  // Get the token from cookies using the request header
  const token = request.headers.get('cookie')?.split(';')
    .find(c => c.trim().startsWith('auth-token='))
    ?.split('=')[1];
  
  if (!token) {
    return { error: 'Not authenticated', status: 401 };
  }
  
  const decoded = verifyToken(token);
  if (!decoded || !decoded.id) {
    return { error: 'Not authenticated', status: 401 };
  }
  
  // Connect to database
  await dbConnect();
  
  // Find user
  const user = await User.findById(decoded.id);
  if (!user) {
    return { error: 'User not found', status: 404 };
  }
  
  return { user };
}

// Get user settings
export async function GET(request: Request) {
  try {
    const result = await authenticateAndGetUser(request);
    
    if ('error' in result) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }
    
    const user = result.user;
    
    // Return sanitized user data
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      jobTitle: user.jobTitle,
      location: user.location,
      timezone: user.timezone,
      avatar: user.avatar,
      notificationsEnabled: user.notificationsEnabled,
      emailNotificationsEnabled: user.emailNotificationsEnabled,
      soundNotificationsEnabled: user.soundNotificationsEnabled,
      theme: user.theme,
      plan: user.plan,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    
    return NextResponse.json({ user: userResponse });
    
  } catch (error: any) {
    console.error('Settings fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update user settings
export async function PUT(request: Request) {
  try {
    const result = await authenticateAndGetUser(request);
    
    if ('error' in result) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }
    
    const user = result.user;
    
    // Parse request body
    const requestBody = await request.json();
    
    // Determine update type and process accordingly
    const { updateType } = requestBody;
    let updateData = {};
    let validatedData;
    
    switch (updateType) {
      case 'profile':
        try {
          validatedData = profileUpdateSchema.parse(requestBody.data);
          updateData = validatedData;
        } catch (error) {
          if (error instanceof z.ZodError) {
            return NextResponse.json(
              { error: error.errors },
              { status: 400 }
            );
          }
          throw error;
        }
        break;
        
      case 'password':
        try {
          validatedData = passwordUpdateSchema.parse(requestBody.data);
          
          // Verify current password
          const isPasswordValid = await bcrypt.compare(
            validatedData.currentPassword,
            user.password
          );
          
          if (!isPasswordValid) {
            return NextResponse.json(
              { error: 'Current password is incorrect' },
              { status: 400 }
            );
          }
          
          // Hash new password
          const salt = await bcrypt.genSalt(10);
          updateData = {
            password: await bcrypt.hash(validatedData.newPassword, salt)
          };
        } catch (error) {
          if (error instanceof z.ZodError) {
            return NextResponse.json(
              { error: error.errors },
              { status: 400 }
            );
          }
          throw error;
        }
        break;
        
      case 'notifications':
        try {
          validatedData = notificationUpdateSchema.parse(requestBody.data);
          updateData = validatedData;
        } catch (error) {
          if (error instanceof z.ZodError) {
            return NextResponse.json(
              { error: error.errors },
              { status: 400 }
            );
          }
          throw error;
        }
        break;
        
      case 'appearance':
        try {
          validatedData = appearanceUpdateSchema.parse(requestBody.data);
          updateData = validatedData;
        } catch (error) {
          if (error instanceof z.ZodError) {
            return NextResponse.json(
              { error: error.errors },
              { status: 400 }
            );
          }
          throw error;
        }
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid update type' },
          { status: 400 }
        );
    }
    
    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    // Return sanitized user data
    const userResponse = {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      bio: updatedUser.bio,
      jobTitle: updatedUser.jobTitle,
      location: updatedUser.location,
      timezone: updatedUser.timezone,
      avatar: updatedUser.avatar,
      notificationsEnabled: updatedUser.notificationsEnabled,
      emailNotificationsEnabled: updatedUser.emailNotificationsEnabled,
      soundNotificationsEnabled: updatedUser.soundNotificationsEnabled,
      theme: updatedUser.theme,
      plan: updatedUser.plan,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
    
    return NextResponse.json({ user: userResponse });
    
  } catch (error: any) {
    console.error('Settings update error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
