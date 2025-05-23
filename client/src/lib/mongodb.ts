import mongoose from 'mongoose';

// Connection URI - replace with your actual MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/notedai';

// Track connection status
let isConnected = false;

/**
 * Connect to MongoDB using Mongoose
 */
const connectToDatabase = async (): Promise<void> => {
  // If already connected, don't connect again
  if (isConnected) {
    console.log('=> Using existing database connection');
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      // These options may need to be adjusted based on your needs
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = !!db.connections[0].readyState;
    
    console.log('=> MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to database');
  }
};

/**
 * Disconnect from MongoDB
 */
export const disconnectFromDatabase = async (): Promise<void> => {
  if (!isConnected) {
    return;
  }
  
  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('=> MongoDB disconnected');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
    throw new Error('Failed to disconnect from database');
  }
};

// Export the connect function as default
export default connectToDatabase;

// Also export as named export for flexibility
export { connectToDatabase, mongoose };
