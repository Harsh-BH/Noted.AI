import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

// In a real app, this would save to a database
const sessions = new Map();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Validate required fields
    if (!data.title || !data.date || !data.time) {
      return NextResponse.json({ 
        error: "Missing required fields", 
        success: false 
      }, { status: 400 });
    }
    
    // Create a session object with an ID
    const sessionId = uuidv4();
    const session = {
      id: sessionId,
      ...data,
      // Combine date and time into a single ISO date string
      date: new Date(`${data.date}T${data.time}`).toISOString(),
      createdAt: new Date().toISOString()
    };
    
    // In a real app, save to database
    sessions.set(sessionId, session);
    
    return NextResponse.json({ 
      success: true,
      session,
      sessionId
    });
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json({ 
      error: "Failed to create session", 
      success: false 
    }, { status: 500 });
  }
}
