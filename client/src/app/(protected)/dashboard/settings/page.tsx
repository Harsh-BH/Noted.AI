"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Globe, 
  Calendar, 
  PenLine, 
  Save, 
  Trash2, 
  Shield, 
  LogOut, 
  ChevronRight,
  CheckCircle,
  Camera,
  UploadCloud,
  Sparkles,
  PanelLeft,
  Moon,
  Sun,
  Check,
  X
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Form schema for profile information
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  bio: z.string().max(160).optional(),
  jobTitle: z.string().optional(),
  location: z.string().optional(),
  timezone: z.string().optional(),
});

// Form schema for password change
const passwordFormSchema = z.object({
  currentPassword: z
    .string()
    .min(6, { message: "Current password must be at least 6 characters." }),
  newPassword: z
    .string()
    .min(6, { message: "New password must be at least 6 characters." }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password confirmation must be at least 6 characters." }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Mock user type and data
type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  bio?: string;
  jobTitle?: string;
  location?: string;
  timezone?: string;
  notificationsEnabled: boolean;
  emailNotificationsEnabled: boolean;
  soundNotificationsEnabled: boolean;
  plan: "free" | "pro" | "enterprise";
  device?: string;
  lastSeen?: string;
}

const MOCK_USER_PROFILE: UserProfile = {
  id: "user-123",
  name: "Alex Johnson",
  email: "alex@example.com",
  createdAt: "2022-04-15T10:00:00Z",
  bio: "Machine learning engineer and data science enthusiast. Love to explore new technologies and create innovative solutions.",
  jobTitle: "Senior ML Engineer",
  location: "San Francisco, CA",
  timezone: "America/Los_Angeles",
  notificationsEnabled: true,
  emailNotificationsEnabled: true,
  soundNotificationsEnabled: true,
  plan: "pro",
  device: "Chrome on macOS",
  lastSeen: "Just now",
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USER_PROFILE);
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with user profile data
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userProfile.name,
      email: userProfile.email,
      bio: userProfile.bio || "",
      jobTitle: userProfile.jobTitle || "",
      location: userProfile.location || "",
      timezone: userProfile.timezone || "",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle profile form submission
  const onProfileSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user profile state
      setUserProfile(prev => ({
        ...prev,
        ...values,
      }));
      
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password form submission
  const onPasswordSubmit = async (values: z.infer<typeof passwordFormSchema>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Password changed successfully");
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
      console.error("Password change error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle notification toggle
  const handleNotificationToggle = (key: keyof UserProfile) => {
    setUserProfile(prev => ({
      ...prev,
      [key]: !prev[key as keyof UserProfile],
    }));
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast.success("Account deleted successfully");
        // Redirect to logout or home page
        logout();
      } catch (error) {
        toast.error("Failed to delete account. Please try again.");
        console.error("Account deletion error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Format date to readable string
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="container px-0 animate-fadeIn pb-8">
      <div className="relative mb-8 mt-2">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background/20 backdrop-blur-sm" />
          <div className="absolute -top-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-[100px]" />
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight mb-1">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <motion.aside 
          className="lg:w-64 shrink-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="sticky top-6">
            <Card className="overflow-hidden bg-background/60 backdrop-blur-lg border-border/50">
              <CardHeader className="p-4 pb-0">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative group">
                    <Avatar className="w-20 h-20 border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                      <AvatarImage src={userProfile.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.name}`} />
                      <AvatarFallback>{userProfile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-full">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h2 className="font-medium text-lg">{userProfile.name}</h2>
                    <p className="text-sm text-muted-foreground">{userProfile.email}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Badge variant={userProfile.plan === "pro" ? "default" : "outline"} className="flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    <span className="capitalize">{userProfile.plan} Plan</span>
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>Joined {formatDate(userProfile.createdAt)}</span>
                  </div>
                  {userProfile.location && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-3 w-3" />
                      <span>{userProfile.location}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="p-0">
                <div className="grid grid-cols-3 w-full rounded-none bg-transparent border-b">
                  <Button 
                    variant="ghost"
                    onClick={() => setActiveTab('profile')}
                    className={cn(
                      "rounded-none h-10",
                      activeTab === 'profile' 
                        ? "border-b-2 border-b-primary text-primary" 
                        : "text-muted-foreground"
                    )}
                  >
                    <User className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost"
                    onClick={() => setActiveTab('security')}
                    className={cn(
                      "rounded-none h-10",
                      activeTab === 'security' 
                        ? "border-b-2 border-b-primary text-primary" 
                        : "text-muted-foreground"
                    )}
                  >
                    <Lock className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost"
                    onClick={() => setActiveTab('preferences')}
                    className={cn(
                      "rounded-none h-10",
                      activeTab === 'preferences' 
                        ? "border-b-2 border-b-primary text-primary" 
                        : "text-muted-foreground"
                    )}
                  >
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <nav className="mt-6">
              <Card className="overflow-hidden bg-background/60 backdrop-blur-lg border-border/50">
                <div className="p-1">
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "w-full justify-start text-muted-foreground hover:text-foreground px-2",
                      activeTab === 'profile' && "bg-primary/10 text-primary font-medium"
                    )}
                    onClick={() => setActiveTab('profile')}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile Information
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "w-full justify-start text-muted-foreground hover:text-foreground px-2",
                      activeTab === 'security' && "bg-primary/10 text-primary font-medium"
                    )}
                    onClick={() => setActiveTab('security')}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Security Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "w-full justify-start text-muted-foreground hover:text-foreground px-2",
                      activeTab === 'preferences' && "bg-primary/10 text-primary font-medium"
                    )}
                    onClick={() => setActiveTab('preferences')}
                  >
                    <PanelLeft className="h-4 w-4 mr-2" />
                    App Preferences
                  </Button>
                  <Separator className="my-1" />
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start hover:text-destructive px-2"
                    onClick={handleDeleteAccount}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </Card>
            </nav>
          </div>
        </motion.aside>
        
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="profile" className="mt-0 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="bg-background/60 backdrop-blur-lg border-border/50">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your personal details and profile information</CardDescription>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant={isEditing ? "ghost" : "secondary"} 
                            size="sm" 
                            onClick={() => setIsEditing(!isEditing)}
                          >
                            {isEditing ? (
                              <>
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                              </>
                            ) : (
                              <>
                                <PenLine className="h-4 w-4 mr-2" />
                                Edit Profile
                              </>
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isEditing ? "Cancel editing" : "Edit your profile"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardHeader>
                  <CardContent>
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={profileForm.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                      <Input
                                        placeholder="Your full name"
                                        className="pl-10"
                                        readOnly={!isEditing}
                                        disabled={!isEditing}
                                        {...field}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={profileForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                      <Input
                                        placeholder="Your email address"
                                        className="pl-10"
                                        readOnly={true} // Email usually can't be changed directly
                                        disabled={true}
                                        {...field}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={profileForm.control}
                            name="bio"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Tell us about yourself (optional)"
                                    className="h-24"
                                    readOnly={!isEditing}
                                    disabled={!isEditing}
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Brief description for your profile. Max 160 characters.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={profileForm.control}
                              name="jobTitle"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Job Title</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Your job title (optional)"
                                      readOnly={!isEditing}
                                      disabled={!isEditing}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={profileForm.control}
                              name="location"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Location</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Your location (optional)"
                                      readOnly={!isEditing}
                                      disabled={!isEditing}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          {isEditing && (
                            <div className="pt-4">
                              <FormField
                                control={profileForm.control}
                                name="timezone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Timezone</FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      disabled={!isEditing}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select your timezone" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="America/Los_Angeles">Pacific Time (US & Canada)</SelectItem>
                                        <SelectItem value="America/New_York">Eastern Time (US & Canada)</SelectItem>
                                        <SelectItem value="Europe/London">London</SelectItem>
                                        <SelectItem value="Europe/Paris">Paris</SelectItem>
                                        <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                                        <SelectItem value="Australia/Sydney">Sydney</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormDescription>
                                      Your timezone will be used for notifications and calendar events.
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}
                        </div>

                        <AnimatePresence>
                          {isEditing && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="flex justify-end"
                            >
                              <Button 
                                type="submit" 
                                disabled={isLoading}
                                className="gap-2"
                              >
                                {isLoading ? (
                                  <>
                                    <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving Changes...
                                  </>
                                ) : (
                                  <>
                                    <Save className="h-4 w-4" />
                                    Save Changes
                                  </>
                                )}
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Card className="bg-background/60 backdrop-blur-lg border-border/50">
                  <CardHeader>
                    <CardTitle>Avatar</CardTitle>
                    <CardDescription>Customize your profile picture</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-6 items-center">
                      <div className="relative group">
                        <Avatar className="w-32 h-32 border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                          <AvatarImage src={userProfile.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.name}`} />
                          <AvatarFallback>{userProfile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-full">
                          <Camera className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="text-sm">
                          <p className="text-muted-foreground">Recommended: Square JPG, PNG, or GIF, at least 200x200 pixels.</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" className="gap-2">
                            <UploadCloud className="h-4 w-4" />
                            Upload New Picture
                          </Button>
                          <Button variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="security" className="mt-0 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="bg-background/60 backdrop-blur-lg border-border/50">
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password to keep your account secure</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...passwordForm}>
                      <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                        <FormField
                          control={passwordForm.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    type="password"
                                    placeholder="Your current password"
                                    className="pl-10"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={passwordForm.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                      type="password"
                                      placeholder="Your new password"
                                      className="pl-10"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <FormDescription>
                                  Password should be at least 6 characters.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={passwordForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                      type="password"
                                      placeholder="Confirm your new password"
                                      className="pl-10"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="flex justify-end">
                          <Button type="submit" disabled={isLoading} className="gap-2">
                            {isLoading ? (
                              <>
                                <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Changing Password...
                              </>
                            ) : (
                              <>
                                <Lock className="h-4 w-4" />
                                Change Password
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Card className="bg-background/60 backdrop-blur-lg border-border/50">
                  <CardHeader>
                    <CardTitle>Session Management</CardTitle>
                    <CardDescription>Manage your active sessions and devices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="success" className="bg-green-500 text-white">Current</Badge>
                            <span className="font-medium">{userProfile.device}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{userProfile.lastSeen}</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="destructive" className="gap-2">
                          <LogOut className="h-4 w-4" />
                          Logout from all devices
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Card className="bg-background/60 backdrop-blur-lg border-border/50">
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium">Protect your account with 2FA</h3>
                        <p className="text-sm text-muted-foreground">Require a verification code when you sign in</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="preferences" className="mt-0 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="bg-background/60 backdrop-blur-lg border-border/50">
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize the appearance of the application</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border border-border hover:border-primary rounded-lg p-4 cursor-pointer transition-colors flex flex-col items-center justify-between gap-4">
                        <div className="h-20 w-full rounded bg-background flex items-center justify-center">
                          <Sun className="h-8 w-8 text-primary" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-medium">Light</h3>
                          <p className="text-xs text-muted-foreground">Light theme</p>
                        </div>
                      </div>
                      <div className="border border-border hover:border-primary rounded-lg p-4 cursor-pointer transition-colors flex flex-col items-center justify-between gap-4">
                        <div className="h-20 w-full rounded bg-slate-950 flex items-center justify-center">
                          <Moon className="h-8 w-8 text-sky-400" />
                        </div>
                        <div className="text-center">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">Dark</h3>
                            <Badge>Active</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">Dark theme</p>
                        </div>
                      </div>
                      <div className="border border-border hover:border-primary rounded-lg p-4 cursor-pointer transition-colors flex flex-col items-center justify-between gap-4">
                        <div className="h-20 w-full rounded bg-gradient-to-r from-white to-slate-900 flex items-center justify-center">
                          <div className="flex space-x-1">
                            <Sun className="h-8 w-8 text-amber-500" />
                            <Moon className="h-8 w-8 text-sky-400" />
                          </div>
                        </div>
                        <div className="text-center">
                          <h3 className="font-medium">System</h3>
                          <p className="text-xs text-muted-foreground">Follow system preference</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Card className="bg-background/60 backdrop-blur-lg border-border/50">
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Configure how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">Enable Notifications</h3>
                        <p className="text-sm text-muted-foreground">Receive notifications for important events</p>
                      </div>
                      <Switch 
                        checked={userProfile.notificationsEnabled}
                        onCheckedChange={() => handleNotificationToggle('notificationsEnabled')}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch 
                        checked={userProfile.emailNotificationsEnabled}
                        onCheckedChange={() => handleNotificationToggle('emailNotificationsEnabled')}
                        disabled={!userProfile.notificationsEnabled}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">Sound Notifications</h3>
                        <p className="text-sm text-muted-foreground">Play sounds for notifications</p>
                      </div>
                      <Switch 
                        checked={userProfile.soundNotificationsEnabled}
                        onCheckedChange={() => handleNotificationToggle('soundNotificationsEnabled')}
                        disabled={!userProfile.notificationsEnabled}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Card className="bg-background/60 backdrop-blur-lg border-border/50">
                  <CardHeader>
                    <CardTitle>Account Management</CardTitle>
                    <CardDescription>Manage your account subscription and data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Current Plan</h3>
                      <div className="flex items-center justify-between rounded-lg border p-4 border-primary/30 bg-primary/5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold capitalize">{userProfile.plan} Plan</span>
                            {userProfile.plan !== "free" && (
                              <Badge variant="secondary">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Active
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {userProfile.plan === "free" 
                              ? "Basic features with limited storage" 
                              : userProfile.plan === "pro" 
                                ? "Full access to all features and premium support"
                                : "Enterprise-grade features with dedicated support"}
                          </p>
                        </div>
                        {userProfile.plan === "free" && (
                          <Button className="gap-2">
                            <Sparkles className="h-4 w-4" />
                            Upgrade
                          </Button>
                        )}
                        {userProfile.plan !== "free" && (
                          <Button variant="outline">Manage Subscription</Button>
                        )}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2">Data Export</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Download a copy of your data from Noted.AI
                      </p>
                      <Button variant="outline" className="gap-2">
                        <UploadCloud className="h-4 w-4" />
                        Request Data Export
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="pt-2">
                      <h3 className="font-medium text-red-500 mb-2">Danger Zone</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Once you delete your account, there is no going back. This action cannot be undone.
                      </p>
                      <Button 
                        variant="destructive" 
                        className="gap-2"
                        onClick={handleDeleteAccount}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Decorative SVG at the bottom */}
      <div className="fixed bottom-4 right-4 opacity-20 pointer-events-none">
        <svg 
          width="300" 
          height="150" 
          viewBox="0 0 300 150" 
          className="text-primary/20"
        >
          <path
            fill="currentColor"
            d="M24.4,-40.2C30.4,-33.5,33.5,-25,37.7,-16.2C41.9,-7.4,47.4,1.6,47.1,10.5C46.8,19.4,40.8,28.3,32.6,34.3C24.4,40.3,14,43.6,3.2,39.9C-7.6,36.3,-18.7,25.8,-28.4,17C-38.2,8.2,-46.8,1,-46.5,-6C-46.1,-12.9,-36.9,-19.5,-28.5,-26.5C-20.2,-33.5,-12.7,-40.9,-2.9,-37.5C6.9,-34,18.4,-26.8,24.4,-20.2L24.4,-40.2Z"
            transform="translate(150 75)"
          />
        </svg>
      </div>
    </div>
  );
}
