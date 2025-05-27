"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Users, 
  Info, 
  ChevronLeft, 
  Save, 
  Share2,
  Video,
  Mic,
  Settings,
  Loader2,
  AlertCircle,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { DecorativeSVG } from "@/components/ui/decorative-svg";
import Link from "next/link";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { OAuthErrorHandler } from "@/components/auth/oauth-error-handler";

export default function ScheduleSession() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "30",
    participants: [] as string[],
    isPublic: false,
    enableVideo: true,
    enableChat: true,
    autoSummary: true,
    meetLink: "" // Google Meet link
  });
  
  const [googleAuthStatus, setGoogleAuthStatus] = useState<{
    isAuthenticated: boolean;
    isLoading: boolean;
  }>({
    isAuthenticated: false,
    isLoading: true
  });
  
  const [createMeetStatus, setCreateMeetStatus] = useState({
    isLoading: false,
    error: null as string | null,
    success: false
  });
  
  const [formSubmitStatus, setFormSubmitStatus] = useState({
    isLoading: false,
    error: null as string | null
  });

  const [oauthError, setOauthError] = useState<{
    code: string | null;
    message: string | null;
  }>({
    code: null,
    message: null
  });
  
  // Check Google authentication status on mount
  useEffect(() => {
    const checkGoogleAuthStatus = async () => {
      try {
        const res = await fetch('/api/google-meet/get-auth-status');
        const data = await res.json();
        setGoogleAuthStatus({
          isAuthenticated: data.isAuthenticated,
          isLoading: false
        });
      } catch (error) {
        console.error("Failed to check Google auth status:", error);
        setGoogleAuthStatus({
          isAuthenticated: false,
          isLoading: false
        });
      }
    };
    
    checkGoogleAuthStatus();
  }, []);
  
  // Check URL params for OAuth callback results
  useEffect(() => {
    const authSuccess = searchParams.get('auth') === 'success';
    const authError = searchParams.get('error');
    const errorCode = searchParams.get('error_code') || searchParams.get('error');
    const errorMessage = searchParams.get('error_message') || searchParams.get('error_description');
    
    if (authSuccess) {
      toast({
        title: "Google Calendar Connected",
        description: "You can now create Google Meet links for your sessions.",
      });
      // Refresh auth status after successful login
      refreshAuthStatus();
      // Clear any previous errors
      setOauthError({ code: null, message: null });
    }
    
    if (authError) {
      // Store the OAuth error details
      setOauthError({
        code: errorCode,
        message: errorMessage
      });
      
      // Only show toast for non-access_denied errors
      if (errorCode !== 'access_denied') {
        toast({
          title: "Authentication Failed",
          description: "Could not connect to Google Calendar. Please try again.",
          variant: "destructive",
        });
      }
    }
  }, [searchParams, toast]);
  
  const refreshAuthStatus = async () => {
    try {
      const res = await fetch('/api/google-meet/get-auth-status');
      const data = await res.json();
      setGoogleAuthStatus({
        isAuthenticated: data.isAuthenticated,
        isLoading: false
      });
    } catch (error) {
      console.error("Failed to check Google auth status:", error);
    }
  };
  
  const handleConnectToGoogle = async () => {
    try {
      const res = await fetch('/api/google-meet/auth');
      const data = await res.json();
      
      if (data.authUrl) {
        window.location.href = data.authUrl;
      }
    } catch (error) {
      console.error("Failed to initiate Google auth:", error);
      toast({
        title: "Authentication Error",
        description: "Could not connect to Google. Please try again later.",
        variant: "destructive",
      });
    }
  };
  
  const handleCreateMeet = async () => {
    if (!googleAuthStatus.isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please connect to Google Calendar first.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.title || !formData.date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please provide a title, date, and time for the meeting.",
        variant: "destructive",
      });
      return;
    }
    
    setCreateMeetStatus({
      isLoading: true,
      error: null,
      success: false
    });
    
    try {
      // Format participants as array if it's a string
      let participantsList = formData.participants;
      if (!Array.isArray(participantsList) && typeof participantsList === 'string') {
        participantsList = (participantsList as unknown as string)
          .split(',')
          .map(email => email.trim())
          .filter(email => email);
      }
      
      const res = await fetch("/api/google-meet/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          participants: participantsList
        }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create Google Meet event");
      }
      
      const data = await res.json();
      
      setFormData(prev => ({ ...prev, meetLink: data.meetLink }));
      setCreateMeetStatus({
        isLoading: false,
        error: null,
        success: true
      });
      
      toast({
        title: "Google Meet Created",
        description: "Your meeting link has been generated successfully.",
      });
    } catch (err: any) {
      console.error("Create Meet error:", err);
      setCreateMeetStatus({
        isLoading: false,
        error: err.message,
        success: false
      });
      
      toast({
        title: "Failed to Create Meet",
        description: err.message || "An error occurred while creating your meeting.",
        variant: "destructive",
      });
      
      // If authentication error, prompt to reconnect
      if (err.message?.includes('authentication') || err.message?.includes('401')) {
        setGoogleAuthStatus(prev => ({ ...prev, isAuthenticated: false }));
      }
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitStatus({
      isLoading: true,
      error: null
    });
    
    try {
      // Submit the form data to our API
      const res = await fetch("/api/sessions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to schedule session");
      }
      
      const data = await res.json();
      
      // Show success toast
      toast({
        title: "Session Scheduled",
        description: "Your transcription session has been successfully scheduled.",
      });
      
      // Redirect to dashboard with a success parameter
      router.push("/dashboard/live?scheduled=success");
    } catch (err: any) {
      setFormSubmitStatus({
        isLoading: false,
        error: err.message
      });
      
      toast({
        title: "Failed to Schedule Session",
        description: err.message || "There was an error scheduling your session.",
        variant: "destructive",
      });
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleToggle = (name: string, value: boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Split email input by commas
    const participantEmails = e.target.value
      .split(',')
      .map(email => email.trim())
      .filter(email => email);
    
    setFormData(prev => ({ ...prev, participants: participantEmails }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Link 
          href="/dashboard/live" 
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft size={16} className="mr-1" />
          <span>Back to Live Dashboard</span>
        </Link>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Schedule a New Session
        </h1>
        <p className="text-muted-foreground mt-1">
          Set up a new live transcription session and invite participants
        </p>
      </motion.div>

      {/* Display OAuth error if present */}
      {oauthError.code && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <OAuthErrorHandler 
            provider="Google Calendar" 
            errorCode={oauthError.code} 
            errorMessage={oauthError.message || undefined}
          />
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <form onSubmit={handleSubmit}>
            <Card className="border-border/30 bg-card/30 backdrop-blur-sm shadow-sm">
              <CardHeader>
                <CardTitle>Session Details</CardTitle>
                <CardDescription>
                  Enter the basic information for your transcription session
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Session Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="E.g., Weekly Team Meeting"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="bg-background/30 border-border/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Brief description or agenda for the session"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="bg-background/30 border-border/30"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>Date</span>
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="bg-background/30 border-border/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time" className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>Time</span>
                    </Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="bg-background/30 border-border/30"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>Duration</span>
                    </Label>
                    <Select 
                      defaultValue={formData.duration} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}
                    >
                      <SelectTrigger className="bg-background/30 border-border/30">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="participants" className="flex items-center gap-2">
                      <Users size={14} />
                      <span>Participants</span>
                    </Label>
                    <Input
                      id="participants"
                      name="participants"
                      placeholder="Enter email addresses, comma-separated"
                      className="bg-background/30 border-border/30"
                      value={Array.isArray(formData.participants) 
                        ? formData.participants.join(', ') 
                        : formData.participants
                      }
                      onChange={handleParticipantsChange}
                    />
                  </div>
                </div>
                
                {/* Google Meet Integration */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="meetLink" className="flex items-center gap-2">
                      <Video size={14} />
                      <span>Google Meet</span>
                    </Label>
                    
                    {!googleAuthStatus.isLoading && !googleAuthStatus.isAuthenticated && (
                      <Button 
                        type="button" 
                        size="sm" 
                        variant="outline" 
                        onClick={handleConnectToGoogle}
                        className="flex items-center gap-2"
                      >
                        <LogIn size={14} />
                        <span>Connect Google Calendar</span>
                      </Button>
                    )}
                  </div>
                  
                  {/* Show loading state */}
                  {googleAuthStatus.isLoading ? (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking Google authentication...
                    </div>
                  ) : googleAuthStatus.isAuthenticated ? (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          id="meetLink"
                          name="meetLink"
                          value={formData.meetLink}
                          readOnly
                          placeholder="No Meet link generated yet"
                          className="bg-background/30 border-border/30 flex-1"
                        />
                        <Button 
                          type="button" 
                          onClick={handleCreateMeet}
                          disabled={createMeetStatus.isLoading}
                          variant="secondary"
                        >
                          {createMeetStatus.isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating...
                            </>
                          ) : (
                            <>Create Meet</>
                          )}
                        </Button>
                      </div>
                      
                      {createMeetStatus.error && !oauthError.code && (
                        <Alert variant="destructive" className="py-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{createMeetStatus.error}</AlertDescription>
                        </Alert>
                      )}
                      
                      {formData.meetLink && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground">Meet link created:</span>
                          <a
                            href={formData.meetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline"
                          >
                            Open in Google Meet
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Connect your Google Calendar to generate a Meet link
                    </div>
                  )}
                </div>
              </CardContent>
              
              <Separator className="my-2" />
              
              <CardHeader>
                <CardTitle>Session Settings</CardTitle>
                <CardDescription>
                  Configure additional options for your transcription session
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="isPublic" className="flex items-center gap-2">
                      <Share2 size={14} />
                      <span>Public Session</span>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow anyone with the link to join
                    </p>
                  </div>
                  <Switch
                    id="isPublic"
                    checked={formData.isPublic}
                    onCheckedChange={(value) => handleToggle("isPublic", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableVideo" className="flex items-center gap-2">
                      <Video size={14} />
                      <span>Enable Video</span>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow video feeds during the session
                    </p>
                  </div>
                  <Switch
                    id="enableVideo"
                    checked={formData.enableVideo}
                    onCheckedChange={(value) => handleToggle("enableVideo", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoSummary" className="flex items-center gap-2">
                      <Settings size={14} />
                      <span>Auto-generate Summary</span>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Create an AI summary when the session ends
                    </p>
                  </div>
                  <Switch
                    id="autoSummary"
                    checked={formData.autoSummary}
                    onCheckedChange={(value) => handleToggle("autoSummary", value)}
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end space-x-2 pt-4 border-t border-border/30">
                <Button type="button" variant="outline" onClick={() => router.push("/dashboard/live")}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="gap-2"
                  disabled={formSubmitStatus.isLoading}
                >
                  {formSubmitStatus.isLoading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" />
                      <span>Scheduling...</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>Schedule Session</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="sticky top-24">
            <Card className="border-border/30 bg-card/30 backdrop-blur-sm overflow-hidden">
              <div className="absolute right-4 top-4 opacity-10 pointer-events-none">
                <motion.div 
                  animate={{ 
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.05, 1, 0.95, 1]
                  }}
                  transition={{ 
                    duration: 15, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                >
                  <DecorativeSVG className="w-32 h-32 text-primary" />
                </motion.div>
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info size={18} className="text-primary" />
                  Tips for Better Sessions
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <h3 className="font-medium mb-1">Optimize Audio Quality</h3>
                    <p className="text-sm text-muted-foreground">
                      Use a quiet room and a good microphone for the best transcription results.
                    </p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <h3 className="font-medium mb-1">Speaker Identification</h3>
                    <p className="text-sm text-muted-foreground">
                      Ask participants to introduce themselves for better speaker attribution.
                    </p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <h3 className="font-medium mb-1">Session Recording</h3>
                    <p className="text-sm text-muted-foreground">
                      Sessions are automatically recorded and transcribed for later reference.
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">After Scheduling</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2 text-muted-foreground">
                      <span className="text-primary text-xl leading-none">•</span>
                      <span>Share the session link with participants</span>
                    </li>
                    <li className="flex gap-2 text-muted-foreground">
                      <span className="text-primary text-xl leading-none">•</span>
                      <span>Join 5 minutes before the scheduled time</span>
                    </li>
                    <li className="flex gap-2 text-muted-foreground">
                      <span className="text-primary text-xl leading-none">•</span>
                      <span>Test your audio before the session begins</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
