import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  // Additional profile fields
  bio: {
    type: String,
    maxlength: [160, 'Bio must be less than 160 characters']
  },
  jobTitle: {
    type: String
  },
  location: {
    type: String
  },
  timezone: {
    type: String
  },
  avatar: {
    type: String
  },
  // Notification preferences
  notificationsEnabled: {
    type: Boolean,
    default: true
  },
  emailNotificationsEnabled: {
    type: Boolean,
    default: true
  },
  soundNotificationsEnabled: {
    type: Boolean,
    default: true
  },
  // Appearance preferences
  theme: {
    type: String,
    enum: ['light', 'dark', 'system'],
    default: 'system'
  },
  // User role
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  // Subscription details
  plan: {
    type: String,
    enum: ['free', 'pro', 'enterprise'],
    default: 'free'
  },
  // For account verification
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationTokenExpires: Date,
  // For password reset
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  // Tracking when user was last active
  lastActive: Date
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash the password if it's modified (or new)
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Don't hash password when updating password through settings route
// That's handled in the route itself

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Check if model exists before creating it again (for Next.js hot reloading)
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
