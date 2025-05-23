"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Users, 
  MessageSquare, 
  MoreVertical, 
  Copy, 
  Share2, 
  Download, 
  Settings,
  ChevronLeft, 
  Clock,
  Star,
  Sparkles,
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { GridPattern } from "@/components/ui/decorative-svg";
import Link from "next/link";

const mockUsers = [
  { id: "user-1", name: "You", avatar: "", isSelf: true, status: "speaking" },
  { id: "user-2", name: "Sarah Johnson", avatar: "", status: "idle" },
  { id: "user-3", name: "Alex Wong", avatar: "", status: "idle" },
  { id: "user-4", name: "David Miller", avatar: "", status: "idle" },
];

// Mock transcript entries
const mockTranscript = [
  { 
    id: "t1", 
    speaker: "Sarah Johnson", 
    timestamp: "00:00:15", 
    text: "Welcome everyone to our product planning session. Today we'll be discussing the roadmap for Q4." 
  },
  { 
    id: "t2", 
    speaker: "You", 
    timestamp: "00:00:28", 
    text: "Thanks Sarah. I'd like to start by sharing some insights from our customer feedback sessions." 
  },
  { 
    id: "t3", 
    speaker: "Alex Wong", 
    timestamp: "00:01:05", 
    text: "That would be great. I also have some analytics data that might help inform our decisions." 
  },
  { 
    id: "t4", 
    speaker: "David Miller", 
    timestamp: "00:01:32", 
    text: "I've prepared a brief presentation on competitor analysis that I think would be useful to review before we make any final decisions." 
  },
  { 
    id: "t5", 
    speaker: "Sarah Johnson", 
    timestamp: "00:02:10", 
    text: "Perfect. Let's start with the customer feedback and then move on to the analytics and competitor analysis." 
  },
];

// Mock insights
const mockInsights = [
  {
    id: "i1",
    title: "Key Focus Areas",
    description: "Customer feedback suggests focusing on mobile app performance and user onboarding experience.",
    priority: "high"
  },
  {
    id: "i2",
    title: "Action Items",
    description: "Schedule UX review for onboarding flow, investigate performance bottlenecks in the mobile app.",
    priority: "medium"
  },
  {
    id: "i3",
    title: "Decision Log",
    description: "Team agreed to prioritize mobile app improvements for Q4 roadmap.",
    priority: "low"
  }
];

export default function LiveSessionPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;
  const [isRecording, setIsRecording] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [transcript, setTranscript] = useState(mockTranscript);
  const [insights, setInsights] = useState(mockInsights);
  const [participants, setParticipants] = useState(mockUsers);
  const [activeTab, setActiveTab] = useState("transcript");
  
  // Simulate live transcription by adding new entries periodically
  useEffect(() => {
    if (!isRecording) return;
    
    const mockTranscriptionUpdate = setInterval(() => {
      const speakers = participants.map(p => p.name);
      const randomSpeaker = speakers[Math.floor(Math.random() * speakers.length)];
      const mockTexts = [
        "I think we should consider implementing this feature in the next sprint.",
        "What about the timeline for delivery? Do we have enough resources?",
        "Let me check with the team and get back to you on that.",
        "The analytics show a significant increase in user engagement after our last update.",
        "We need to address these performance issues before the next release."
      ];
      const randomText = mockTexts[Math.floor(Math.random() * mockTexts.length)];
      
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = elapsedTime % 60;
      const timestamp = `00:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      const newEntry = {
        id: `t${Date.now()}`,
        speaker: randomSpeaker,
        timestamp,
        text: randomText
      };
      
      setTranscript(prev => [...prev, newEntry]);
      
      // Randomly generate insights
      if (Math.random() < 0.2) {
        const insightTypes = ["Potential Action Item", "Key Point", "Question Raised", "Decision Made"];
        const randomType = insightTypes[Math.floor(Math.random() * insightTypes.length)];
        const priorities = ["high", "medium", "low"];
        const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
        
        const newInsight = {
          id: `i${Date.now()}`,
          title: randomType,
          description: randomText,
          priority: randomPriority
        };
        
        setInsights(prev => [...prev, newInsight]);
      }
      
      // Randomly update user status
      const updatedParticipants = [...participants];
      updatedParticipants.forEach(p => p.status = "idle");
      const randomUserIndex = Math.floor(Math.random() * updatedParticipants.length);
      updatedParticipants[randomUserIndex].status = "speaking";
      setParticipants(updatedParticipants);
      
    }, 8000); // Add new transcription every 8 seconds
    
    return () => clearInterval(mockTranscriptionUpdate);
  }, [isRecording, elapsedTime, participants]);
  
  // Timer for session duration
  useEffect(() => {
    if (!isRecording) return;
    
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isRecording]);
  
  // Format elapsed time as HH:MM:SS
  const formatElapsedTime = () => {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  return (
    <div className="h-full flex flex-col">
      <motion.div 
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2">
          <Link href="/dashboard/live" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={16} className="mr-1" />
            <span className="hidden sm:inline">Back to Live</span>
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <Badge variant="outline" className="flex items-center gap-1 bg-red-500/10 text-red-500 border-red-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span>LIVE</span>
          </Badge>
          <h1 className="text-lg font-medium md:text-xl ml-2">Product Planning Session</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center text-muted-foreground text-sm">
            <Clock size={14} className="mr-1" />
            {formatElapsedTime()}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline" className="gap-1">
                  <Share2 size={14} />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Share session link
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2">
                <Download size={14} />
                <span>Download Transcript</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Copy size={14} />
                <span>Copy Session ID</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Settings size={14} />
                <span>Session Settings</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
        {/* Main content area - Transcript & Insights */}
        <motion.div 
          className="lg:col-span-3 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="transcript" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-2">
              <TabsList className="grid grid-cols-2 w-[240px]">
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="insights">
                  <div className="flex items-center gap-1">
                    <Sparkles size={14} />
                    <span>Insights</span>
                    <Badge variant="outline" className="ml-1 text-xs py-0 px-1.5 bg-primary/10 text-primary border-primary/20">
                      {insights.length}
                    </Badge>
                  </div>
                </TabsTrigger>
              </TabsList>
              
              {activeTab === "transcript" && (
                <Button variant="outline" size="sm" className="gap-1">
                  <Download size={14} />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              )}
            </div>
            
            <TabsContent value="transcript" className="flex-1 flex flex-col space-y-0 mt-0">
              <Card className="flex-1 p-4 bg-card/30 backdrop-blur-sm border-border/30 overflow-hidden">
                <div className="h-full flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-4 relative">
                    <div className="absolute inset-0 pointer-events-none">
                      <GridPattern className="absolute inset-0 opacity-[0.01] text-foreground w-full h-full" />
                    </div>
                    <div className="relative z-10 space-y-4 p-1">
                      {transcript.map((entry) => (
                        <motion.div
                          key={entry.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-3 rounded-lg ${entry.speaker === "You" ? "bg-primary/5 border border-primary/10" : "bg-card border border-border/30"}`}
                        >
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{entry.speaker}</span>
                            <span className="text-muted-foreground">{entry.timestamp}</span>
                          </div>
                          <p className="text-base">{entry.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="flex gap-3">
                    <Button
                      variant={isRecording ? "destructive" : "default"}
                      onClick={toggleRecording}
                      className="gap-2"
                    >
                      {isRecording ? (
                        <>
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                          </span>
                          <span>Stop Recording</span>
                        </>
                      ) : (
                        <>
                          <Mic size={16} />
                          <span>Start Recording</span>
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={toggleMute}
                      className="gap-2"
                    >
                      {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
                      <span className="hidden sm:inline">{isMuted ? "Unmute" : "Mute"}</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={toggleVideo}
                      className="gap-2"
                    >
                      {isVideoOn ? <Video size={16} /> : <VideoOff size={16} />}
                      <span className="hidden sm:inline">{isVideoOn ? "Video Off" : "Video On"}</span>
                    </Button>
                    <div className="ml-auto">
                      <Button variant="default" className="gap-2">
                        <span>End Session</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="insights" className="flex-1 space-y-0 mt-0">
              <Card className="p-4 bg-card/30 backdrop-blur-sm border-border/30 overflow-hidden h-full">
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-primary" />
                      AI-Generated Insights
                    </h3>
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                      Live Updates
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    Key points, action items, and insights from the meeting are automatically detected and summarized.
                  </p>
                  
                  <div className="flex-1 overflow-y-auto space-y-3">
                    <AnimatePresence>
                      {insights.map((insight) => (
                        <motion.div
                          key={insight.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-3 rounded-lg bg-card border border-border/30 flex gap-3"
                        >
                          <div className={`mt-1 p-1 h-fit rounded-md ${
                            insight.priority === "high" ? "bg-red-500/10 text-red-500" : 
                            insight.priority === "medium" ? "bg-amber-500/10 text-amber-500" : 
                            "bg-blue-500/10 text-blue-500"
                          }`}>
                            {insight.priority === "high" ? <Sparkles size={14} /> : 
                             insight.priority === "medium" ? <Lightbulb size={14} /> : <Star size={14} />}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{insight.title}</div>
                            <p className="text-sm text-muted-foreground">{insight.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download size={14} />
                      <span>Export Insights</span>
                    </Button>
                    <Button size="sm" className="gap-1">
                      <Sparkles size={14} />
                      <span>Generate Summary</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        {/* Participants sidebar */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full p-4 bg-card/30 backdrop-blur-sm border-border/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="flex items-center gap-2 font-medium">
                <Users size={16} />
                <span>Participants ({participants.length})</span>
              </h3>
              <Button variant="ghost" size="sm">
                <MessageSquare size={14} />
              </Button>
            </div>
            
            <div className="space-y-2">
              {participants.map((user) => (
                <div 
                  key={user.id} 
                  className={`flex items-center justify-between p-2 rounded-md ${
                    user.isSelf ? 'bg-primary/5 border border-primary/10' : 
                    user.status === 'speaking' ? 'bg-primary/5 border border-primary/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || ""} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      {user.status === 'speaking' && (
                        <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium flex items-center">
                        {user.name}
                        {user.isSelf && <span className="text-xs text-muted-foreground ml-1">(You)</span>}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {user.status === 'speaking' ? 'Speaking' : 'Listening'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {user.isSelf && (
                      <>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleMute}>
                          {isMuted ? <MicOff size={14} /> : <Mic size={14} />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleVideo}>
                          {isVideoOn ? <Video size={14} /> : <VideoOff size={14} />}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Session Info</h4>
              <div className="text-sm">
                <div className="flex justify-between py-1 border-b border-border/30">
                  <span className="text-muted-foreground">Session ID</span>
                  <span className="font-mono">{sessionId.substring(0, 8)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/30">
                  <span className="text-muted-foreground">Duration</span>
                  <span>{formatElapsedTime()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Active
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
