"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  Download, 
  Search, 
  Filter, 
  FileText, 
  BarChart, 
  Users,
  ArrowUpDown,
  ChevronDown,
  FileSpreadsheet,
  LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DecorativeSVG, GridPattern } from "@/components/ui/decorative-svg";

// Mock data
const mockSessions = [
  {
    id: "sess-001",
    title: "Weekly Team Standup",
    date: "2023-11-10T10:00:00",
    duration: "28 min",
    participants: 8,
    transcript: true,
    summary: true,
    insights: 5
  },
  {
    id: "sess-002",
    title: "Product Roadmap Planning",
    date: "2023-11-08T14:30:00",
    duration: "54 min",
    participants: 12,
    transcript: true,
    summary: true,
    insights: 9
  },
  {
    id: "sess-003",
    title: "Client Onboarding - Acme Corp",
    date: "2023-11-05T09:15:00",
    duration: "45 min",
    participants: 5,
    transcript: true,
    summary: true,
    insights: 4
  },
  {
    id: "sess-004",
    title: "Design Review - Mobile App",
    date: "2023-11-03T16:00:00",
    duration: "62 min",
    participants: 7,
    transcript: true,
    summary: false,
    insights: 0
  },
  {
    id: "sess-005",
    title: "Marketing Campaign Brainstorm",
    date: "2023-10-28T11:30:00",
    duration: "47 min",
    participants: 6,
    transcript: true,
    summary: true,
    insights: 12
  }
];

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("all");
  
  // Filter sessions based on search query and date range
  const filteredSessions = mockSessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase());
    const sessionDate = new Date(session.date);
    const now = new Date();
    
    let matchesDateRange = true;
    if (selectedDateRange === "week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      matchesDateRange = sessionDate >= oneWeekAgo;
    } else if (selectedDateRange === "month") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(now.getMonth() - 1);
      matchesDateRange = sessionDate >= oneMonthAgo;
    }
    
    return matchesSearch && matchesDateRange;
  });

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <Link 
            href="/dashboard/live" 
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ChevronLeft size={16} className="mr-1" />
            <span>Back to Live Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Session History
          </h1>
          <p className="text-muted-foreground mt-1">
            Browse and access your past transcription sessions
          </p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative p-6 rounded-xl overflow-hidden bg-primary/5 border border-primary/10"
      >
        <div className="absolute -top-12 -right-12 opacity-10 pointer-events-none">
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
            <DecorativeSVG className="w-48 h-48 text-primary" />
          </motion.div>
        </div>
        
        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search sessions by title, date, or participants..." 
                  className="pl-9 bg-background/30 border-border/30"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select defaultValue={selectedDateRange} onValueChange={setSelectedDateRange}>
                <SelectTrigger className="bg-background/30 border-border/30 w-full">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">Past Week</SelectItem>
                  <SelectItem value="month">Past Month</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-background/30 border-border/30">
                    <Filter size={14} />
                    <span>Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Has transcript
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Has summary
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Has insights
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Showing {filteredSessions.length} of {mockSessions.length} sessions
            </div>
            
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground mr-1">Sort by:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1 h-8">
                    <span>Date</span>
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem checked>
                    Date (newest first)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Date (oldest first)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Duration
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Participants
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="list" className="mt-6">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-4">
          <motion.div 
            className="space-y-3"
            variants={{
              hidden: { opacity: 0 },
              show: { 
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {filteredSessions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4 opacity-30" />
                <h3 className="text-lg font-medium mb-1">No sessions found</h3>
                <p className="text-muted-foreground max-w-md">
                  No transcription sessions matched your search criteria. Try adjusting your filters or create a new session.
                </p>
                <Button asChild className="mt-6">
                  <Link href="/dashboard/live/schedule">Schedule New Session</Link>
                </Button>
              </div>
            ) : (
              filteredSessions.map((session) => (
                <motion.div
                  key={session.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                >
                  <Card className="overflow-hidden border-border/30 hover:border-primary/20 transition-colors">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4">
                        <div className="space-y-1 mb-2 sm:mb-0">
                          <Link href={`/dashboard/live/${session.id}`} className="font-medium text-lg hover:text-primary transition-colors">
                            {session.title}
                          </Link>
                          <div className="flex flex-wrap gap-4">
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
                              {session.participants} participants
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex gap-1">
                              {session.transcript && (
                                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                  Transcript
                                </Badge>
                              )}
                              {session.summary && (
                                <Badge variant="outline" className="bg-blue-500/5 text-blue-500 border-blue-500/20">
                                  Summary
                                </Badge>
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              Duration: {session.duration}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0" asChild>
                              <Link href={`/dashboard/live/${session.id}`}>
                                <FileSpreadsheet size={14} />
                                <span className="sr-only">View transcript</span>
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Download size={14} />
                              <span className="sr-only">Download</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-4">
          <div className="flex justify-center items-center p-12 border border-dashed border-border/50 rounded-lg">
            <div className="text-center">
              <LayoutDashboard className="h-12 w-12 text-muted-foreground mb-4 mx-auto opacity-30" />
              <h3 className="text-lg font-medium mb-1">Calendar View Coming Soon</h3>
              <p className="text-muted-foreground max-w-md">
                We're working on a calendar view to help you visualize your meeting schedule. 
                Check back soon!
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
