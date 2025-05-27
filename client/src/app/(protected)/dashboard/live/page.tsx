"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Play, 
  Plus, 
  History, 
  ArrowRight, 
  Headphones, 
  Mic, 
  Users,
  Loader2,
  CalendarX
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { GridPattern, DecorativeSVG } from "@/components/ui/decorative-svg";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

// Session type definition
interface Session {
  id: string;
  title: string;
  date: string;
  participants: number | string[];
  duration: string;
  description?: string;
}

export default function LiveDashboard() {
  const [sessionCode, setSessionCode] = useState("");
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch upcoming sessions from API
    fetchUpcomingSessions();
  }, []);

  const fetchUpcomingSessions = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate an API call with a timeout
      const response = await fetch('/api/sessions/upcoming');
      
      if (!response.ok) {
        throw new Error('Failed to fetch upcoming sessions');
      }
      
      const data = await response.json();
      setUpcomingSessions(data.sessions || []);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      toast({
        title: "Failed to load sessions",
        description: "Please try refreshing the page",
        variant: "destructive",
      });
      setUpcomingSessions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Live Transcription
          </h1>
          <p className="text-muted-foreground mt-1">
            Create, join or manage your live transcription sessions
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/dashboard/live/history">
              <History size={16} />
              <span>History</span>
            </Link>
          </Button>
          <Button asChild className="gap-2">
            <Link href="/dashboard/live/schedule">
              <Plus size={16} />
              <span>New Session</span>
            </Link>
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2 space-y-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div 
            className="relative bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-border/30 backdrop-blur-sm"
            variants={item}
          >
            <div className="absolute right-4 top-4 opacity-10">
              <DecorativeSVG className="w-24 h-24 text-primary" />
            </div>
            <h2 className="text-xl font-medium mb-4">Quick Join</h2>
            <p className="text-muted-foreground mb-4">
              Enter a session code to join an existing transcription session instantly.
            </p>
            <div className="flex gap-3">
              <Input 
                placeholder="Enter session code..." 
                value={sessionCode} 
                onChange={(e) => setSessionCode(e.target.value)}
                className="bg-background/30 border-border/30"
              />
              <Button 
                disabled={!sessionCode} 
                className="gap-2"
                onClick={() => sessionCode && window.location.assign(`/dashboard/live/${sessionCode}`)}
              >
                <Play size={16} />
                <span>Join</span>
              </Button>
            </div>
          </motion.div>
          
          <motion.div variants={item}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium">Upcoming Sessions</h2>
              <Link href="/dashboard/live/schedule" className="text-primary text-sm flex items-center hover:underline">
                Schedule new <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {isLoading ? (
                <div className="p-12 flex flex-col items-center justify-center text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground">Loading your upcoming sessions...</p>
                </div>
              ) : upcomingSessions.length > 0 ? (
                upcomingSessions.map((session) => (
                  <motion.div
                    key={session.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg p-4 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{session.title}</h3>
                        <div className="flex gap-4 mt-2">
                          <div className="flex items-center text-muted-foreground text-sm">
                            <Calendar size={14} className="mr-1" />
                            {new Date(session.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-muted-foreground text-sm">
                            <Clock size={14} className="mr-1" />
                            {new Date(session.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                          <div className="flex items-center text-muted-foreground text-sm">
                            <Users size={14} className="mr-1" />
                            {typeof session.participants === 'number' 
                              ? session.participants 
                              : session.participants.length}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {session.duration}
                        </Badge>
                        <Button size="sm" asChild>
                          <Link href={`/dashboard/live/${session.id}`}>
                            Join
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-12 flex flex-col items-center justify-center text-center border border-dashed border-border rounded-lg bg-card/30">
                  <CalendarX className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="font-medium text-lg">No Upcoming Sessions</h3>
                  <p className="text-muted-foreground mt-1 mb-4">
                    You don't have any scheduled sessions coming up.
                  </p>
                  <Button asChild>
                    <Link href="/dashboard/live/schedule" className="gap-2">
                      <Plus size={16} />
                      <span>Schedule a Session</span>
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="lg:row-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full border-border/30 bg-card/30 backdrop-blur-sm overflow-hidden">
            <div className="p-6 space-y-6">
              <div className="relative">
                <h2 className="text-xl font-medium mb-2">Features</h2>
                <div className="absolute right-0 top-0">
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, 0, -5, 0],
                      scale: [1, 1.05, 1, 0.95, 1]
                    }}
                    transition={{ 
                      duration: 10, 
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  >
                    <Headphones className="w-10 h-10 text-primary/30" />
                  </motion.div>
                </div>
              </div>

              <div className="space-y-4">
                <FeatureItem 
                  title="Real-time Transcription" 
                  description="Automatically transcribe your meetings in real-time with AI precision." 
                  icon={<Mic />}
                />
                <FeatureItem 
                  title="Collaborative Notes" 
                  description="Share and collaborate on notes with meeting participants." 
                  icon={<Users />}
                />
                <FeatureItem 
                  title="Meeting Summaries" 
                  description="Get AI-generated summaries after your sessions." 
                  icon={<ArrowRight />}
                />
              </div>
              
              <div className="relative mt-8 pt-6 border-t border-border/30">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-lg opacity-30" />
                <h3 className="font-medium mb-2 relative">Pro Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground relative">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Share session codes with participants before starting</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Use a high-quality microphone for better transcription</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Speakers should introduce themselves for better attribution</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureItem({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <motion.div 
      className="flex gap-4 p-4 rounded-lg bg-background/30 border border-border/30 hover:border-primary/20 transition-all"
      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
    >
      <div className="mt-1 text-primary">
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}
