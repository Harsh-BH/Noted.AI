"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Calendar, FileText, Clock, ChevronRight, 
  Download, Trash2, Star, Filter, Users, X, 
  ArrowLeft, MessageSquare
} from 'lucide-react';
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock data - replace with API call
const MOCK_MEETINGS = [
  {
    id: '1',
    title: 'Weekly Team Standup',
    date: '2023-11-15T09:00:00',
    duration: '30 minutes',
    participants: ['John Doe', 'Jane Smith', 'Alex Johnson'],
    transcriptPreview: 'We discussed the current sprint progress and identified blockers. The frontend team reported issues with the new API integration that engineering needs to address. Marketing provided updates on the upcoming campaign launch.',
    fullTranscript: 'We discussed the current sprint progress and identified blockers. The frontend team reported issues with the new API integration that engineering needs to address. Marketing provided updates on the upcoming campaign launch. We agreed to prioritize fixing the API issues before moving forward with new feature development. The design team showed mockups for the new dashboard layout, which received positive feedback. We scheduled a follow-up meeting for Thursday to review progress.',
    insights: [
      'Action item: John to update documentation by Friday',
      'Decision made to prioritize feature X over feature Y',
      'Sentiment analysis: Positive meeting tone with productive outcomes',
      'Follow-up meeting scheduled for Thursday at 2 PM',
      'Key topics: API integration, marketing campaign, design review'
    ],
    isStarred: true
  },
  {
    id: '2',
    title: 'Client Presentation: Acme Corp',
    date: '2023-11-14T14:00:00',
    duration: '45 minutes',
    participants: ['Jane Smith', 'Robert Johnson', 'Sarah Williams', 'Acme Team'],
    transcriptPreview: 'The client expressed interest in our new service offerings and requested additional information about pricing tiers. They were particularly interested in the enterprise solution.',
    fullTranscript: 'The client expressed interest in our new service offerings and requested additional information about pricing tiers. They were particularly interested in the enterprise solution. We walked through the product demo, showcasing the new analytics dashboard and reporting features. The client asked about integration capabilities with their existing systems. We promised to send a detailed proposal by next week with custom pricing options and integration specifications.',
    insights: [
      'Client showed high interest in the premium tier',
      'Follow-up needed on pricing structure',
      'Sentiment analysis: Enthusiastic response to product demo',
      'Decision driver: Integration capabilities with existing systems',
      'Action required: Send detailed proposal by next Wednesday'
    ],
    isStarred: false
  },
  {
    id: '3',
    title: 'Product Strategy Session',
    date: '2023-11-13T11:00:00',
    duration: '60 minutes',
    participants: ['Alex Johnson', 'Sam Wilson', 'Taylor Green', 'Morgan Lee'],
    transcriptPreview: 'We mapped out the Q1 roadmap focusing on three key initiatives: mobile experience improvements, analytics integration, and the new collaboration features.',
    fullTranscript: 'We mapped out the Q1 roadmap focusing on three key initiatives: mobile experience improvements, analytics integration, and the new collaboration features. The team expressed concerns about the timeline for the collaboration features, suggesting we might need additional resources or to extend to Q2. We reviewed user feedback from the beta testing phase, which highlighted navigation issues on mobile that need to be addressed urgently. Budget constraints were discussed, with agreement to prioritize the most critical user-facing improvements first.',
    insights: [
      'Consensus reached on prioritizing mobile experience',
      'Budget approval needed for new analytics integration',
      'Sentiment analysis: Mixed opinions on timeline feasibility',
      'Risk identified: Collaboration features may require timeline extension',
      'User feedback indicates critical navigation issues on mobile'
    ],
    isStarred: true
  },
];

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, starred, recent
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  useEffect(() => {
    // Replace with actual API call
    const fetchMeetings = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMeetings(MOCK_MEETINGS);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch meetings:", error);
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.transcriptPreview.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'starred') {
      return matchesSearch && meeting.isStarred;
    } else if (filter === 'recent') {
      // Logic for recent meetings (last 7 days)
      const meetingDate = new Date(meeting.date);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return matchesSearch && meetingDate > sevenDaysAgo;
    }
    
    return matchesSearch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Funtions for handling meeting selection
  const handleViewMeeting = (meeting) => {
    setSelectedMeeting(meeting);
  };

  const handleCloseDetails = () => {
    setSelectedMeeting(null);
  };

  return (
    <div className="w-full h-full relative">
      <AnimatePresence mode="wait">
        {selectedMeeting ? (
          <MeetingDetails 
            meeting={selectedMeeting} 
            onClose={handleCloseDetails} 
            formatDate={formatDate} // Pass the formatDate function to MeetingDetails
          />
        ) : (
          <motion.div
            key="meetings-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full overflow-auto"
          >
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between items-center mb-6"
              >
                <div>
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    Your Meetings
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    View transcripts and AI insights from all your recorded meetings
                  </p>
                </div>
                <div className="hidden md:block">
                  <MeetingsIllustration />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 mb-6"
              >
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    type="text"
                    placeholder="Search meetings..."
                    className="pl-10 pr-4 py-2 w-full bg-background/40 backdrop-blur-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
                    All
                  </FilterButton>
                  <FilterButton active={filter === 'starred'} onClick={() => setFilter('starred')}>
                    <Star size={16} /> Starred
                  </FilterButton>
                  <FilterButton active={filter === 'recent'} onClick={() => setFilter('recent')}>
                    Recent
                  </FilterButton>
                </div>
              </motion.div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-60">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="mt-4 text-muted-foreground">Loading your meetings...</p>
              </div>
            ) : filteredMeetings.length > 0 ? (
              <div className="space-y-6">
                <AnimatePresence>
                  {filteredMeetings.map((meeting, index) => (
                    <MeetingCard 
                      key={meeting.id} 
                      meeting={meeting} 
                      index={index} 
                      onView={() => handleViewMeeting(meeting)} 
                      formatDate={formatDate} // Pass the formatDate function here
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <EmptyState searchTerm={searchTerm} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const FilterButton = ({ children, active, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className={cn(
        "px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-all duration-200",
        active ? "bg-primary/20 text-primary" : "bg-background/30 text-muted-foreground hover:bg-background/50 backdrop-blur-sm"
      )}
    >
      {children}
    </button>
  );
}

const MeetingCard = ({ meeting, index, onView, formatDate }) => { // Add formatDate parameter here
  return (
    <motion.div
      key={meeting.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-background/30 backdrop-blur-md rounded-xl border border-border/30 overflow-hidden transition-all hover:bg-background/40 hover:border-primary/30">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center">
                <h2 className="text-xl font-semibold">{meeting.title}</h2>
                {meeting.isStarred && (
                  <Star className="ml-2 text-yellow-500 fill-yellow-500" size={18} />
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar size={14} className="text-primary/70" />
                  <span>{formatDate(meeting.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} className="text-primary/70" />
                  <span>{meeting.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={14} className="text-primary/70" />
                  <span>{meeting.participants.length} participants</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <ActionButton icon={<Download size={16} />} tooltip="Download transcript" />
              <ActionButton icon={<Star size={16} />} tooltip={meeting.isStarred ? "Unstar" : "Star"} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center text-foreground font-medium">
                <FileText size={16} className="mr-2 text-primary" />
                <h3>Transcript Preview</h3>
              </div>
              <p className="text-muted-foreground text-sm line-clamp-3">{meeting.transcriptPreview}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-foreground font-medium">
                <svg className="w-4 h-4 mr-2 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <h3>AI Insights</h3>
              </div>
              <ul className="text-sm space-y-1">
                {meeting.insights.slice(0, 2).map((insight, i) => (
                  <li key={i} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/70 mt-1.5 mr-2"></span>
                    <span className="text-muted-foreground line-clamp-1">{insight}</span>
                  </li>
                ))}
                {meeting.insights.length > 2 && (
                  <li className="text-xs text-primary/80">+ {meeting.insights.length - 2} more insights</li>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <Button
              variant="ghost"
              className="group flex items-center text-sm font-medium text-primary hover:text-primary/90"
              onClick={onView}
            >
              <span>View full details</span>
              <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const MeetingDetails = ({ meeting, onClose, formatDate }) => { // Add formatDate parameter here
  return (
    <motion.div
      key="meeting-details"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full overflow-auto"
    >
      <div className="mb-6">
        <Button variant="ghost" onClick={onClose} className="mb-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} className="mr-1" /> Back to meetings
        </Button>
        
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{meeting.title}</h1>
          <div className="flex gap-2">
            <ActionButton icon={<Download size={16} />} tooltip="Download transcript" />
            <ActionButton 
              icon={meeting.isStarred ? <Star className="fill-yellow-500" size={16} /> : <Star size={16} />} 
              tooltip={meeting.isStarred ? "Unstar" : "Star"}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-primary/70" />
            <span>{formatDate(meeting.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-primary/70" />
            <span>{meeting.duration}</span>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-background/30 backdrop-blur-md rounded-lg border border-border/30 p-5">
            <div className="flex items-center mb-4 text-foreground font-medium">
              <FileText size={18} className="mr-2 text-primary" />
              <h2 className="text-xl">Full Transcript</h2>
            </div>
            <p className="text-muted-foreground whitespace-pre-line">
              {meeting.fullTranscript}
            </p>
          </div>
          
          <div className="bg-background/30 backdrop-blur-md rounded-lg border border-border/30 p-5">
            <div className="flex items-center mb-4 text-foreground font-medium">
              <MessageSquare size={18} className="mr-2 text-primary" />
              <h2 className="text-xl">Participants</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {meeting.participants.map((participant, i) => (
                <div 
                  key={i} 
                  className="bg-background/50 rounded-full px-3 py-1 text-sm text-foreground border border-border/30"
                >
                  {participant}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-background/30 backdrop-blur-md rounded-lg border border-border/30 p-5">
            <div className="flex items-center mb-4 text-foreground font-medium">
              <svg className="w-5 h-5 mr-2 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <h2 className="text-xl">AI Insights</h2>
            </div>
            <ul className="space-y-3">
              {meeting.insights.map((insight, i) => (
                <li key={i} className="flex items-start pb-2 border-b border-border/20 last:border-0">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/70 mt-1.5 mr-2.5"></span>
                  <span className="text-muted-foreground">{insight}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-background/30 backdrop-blur-md rounded-lg border border-border/30 p-5">
            <div className="flex items-center mb-4 text-foreground font-medium">
              <Filter size={18} className="mr-2 text-primary" />
              <h2 className="text-xl">Actions</h2>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Download size={14} className="mr-2" />
                Download Transcript
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                Generate Summary
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar size={14} className="mr-2" />
                Schedule Follow-up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const ActionButton = ({ icon, tooltip }) => {
  return (
    <motion.button 
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 text-muted-foreground hover:text-primary hover:bg-background/50 rounded-full transition-colors"
      title={tooltip}
    >
      {icon}
    </motion.button>
  );
}

const EmptyState = ({ searchTerm }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <div className="w-48 h-48 mb-6 opacity-80">
        <EmptyStateIllustration />
      </div>
      <h3 className="text-xl font-medium mb-2">No meetings found</h3>
      <p className="text-muted-foreground max-w-md mb-6">
        {searchTerm 
          ? `No results for "${searchTerm}". Try a different search term or clear filters.` 
          : "You don't have any recorded meetings yet. Start a recording to see your meetings here."}
      </p>
      <Button
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Record a New Meeting
      </Button>
    </motion.div>
  );
}

const MeetingsIllustration = () => {
  return (
    <motion.div
      animate={{ 
        y: [0, -5, 0, 5, 0],
      }}
      transition={{ 
        duration: 5,
        repeat: Infinity,
        repeatType: "loop"
      }}
    >
      <svg width="150" height="150" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="98" fill="currentColor" className="text-primary/5" />
        
        {/* Main device/screen */}
        <rect x="50" y="70" width="100" height="75" rx="4" className="fill-background stroke-primary" strokeWidth="2" />
        <rect x="55" y="75" width="90" height="55" rx="2" className="fill-primary/10" />
        
        {/* Video conference participants */}
        <rect x="60" y="80" width="38" height="30" rx="2" className="fill-primary/20" />
        <circle cx="79" cy="90" r="8" className="fill-primary/30" />
        <path d="M73 104C73 101.239 75.2386 99 78 99H80C82.7614 99 85 101.239 85 104V104H73V104Z" className="fill-primary/30" />
        
        <rect x="102" y="80" width="38" height="30" rx="2" className="fill-primary/20" />
        <circle cx="121" cy="90" r="8" className="fill-primary/30" />
        <path d="M115 104C115 101.239 117.239 99 120 99H122C124.761 99 127 101.239 127 104V104H115V104Z" className="fill-primary/30" />
        
        <rect x="60" y="115" width="38" height="30" rx="2" className="fill-primary/20" />
        <circle cx="79" cy="125" r="8" className="fill-primary/30" />
        <path d="M73 139C73 136.239 75.2386 134 78 134H80C82.7614 134 85 136.239 85 139V139H73V139Z" className="fill-primary/30" />
        
        <rect x="102" y="115" width="38" height="30" rx="2" className="fill-primary/20" />
        <circle cx="121" cy="125" r="8" className="fill-primary/30" />
        <path d="M115 139C115 136.239 117.239 134 120 134H122C124.761 134 127 136.239 127 139V139H115V139Z" className="fill-primary/30" />
        
        {/* Sound waves */}
        <path d="M155 100C160.523 100 165 95.5228 165 90C165 84.4772 160.523 80 155 80" stroke="currentColor" className="text-primary/60" strokeWidth="2" strokeLinecap="round" />
        <path d="M155 110C166.046 110 175 101.046 175 90C175 78.9543 166.046 70 155 70" stroke="currentColor" className="text-primary/60" strokeWidth="2" strokeLinecap="round" />
        
        {/* Document/transcript elements */}
        <rect x="30" y="50" width="30" height="40" rx="2" fill="white" stroke="currentColor" className="text-primary/60" strokeWidth="2" />
        <line x1="35" y1="60" x2="55" y2="60" stroke="currentColor" className="text-primary/60" strokeWidth="2" strokeLinecap="round" />
        <line x1="35" y1="66" x2="50" y2="66" stroke="currentColor" className="text-primary/60" strokeWidth="2" strokeLinecap="round" />
        <line x1="35" y1="72" x2="52" y2="72" stroke="currentColor" className="text-primary/60" strokeWidth="2" strokeLinecap="round" />
        <line x1="35" y1="78" x2="48" y2="78" stroke="currentColor" className="text-primary/60" strokeWidth="2" strokeLinecap="round" />
        
        {/* AI insights spark */}
        <path d="M155 50L160 30L165 50L180 55L165 60L160 75L155 60L140 55L155 50Z" className="fill-purple-400/70" />
      </svg>
    </motion.div>
  );
}

const EmptyStateIllustration = () => {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="98" className="fill-primary/5" />
      <rect x="60" y="60" width="80" height="80" rx="4" className="fill-background stroke-primary/30" strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="100" cy="85" r="15" className="fill-primary/20" />
      <rect x="80" y="105" width="40" height="6" rx="2" className="fill-primary/20" />
      <rect x="85" y="115" width="30" height="4" rx="2" className="fill-primary/10" />
      <rect x="75" y="125" width="50" height="4" rx="2" className="fill-primary/10" />
      
      <path d="M140 95C145.523 95 150 90.5228 150 85C150 79.4772 145.523 75 140 75" stroke="currentColor" className="text-primary/30" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <path d="M140 105C151.046 105 160 96.0457 160 85C160 73.9543 151.046 65 140 65" stroke="currentColor" className="text-primary/30" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <path d="M60 85C54.4772 85 50 89.4772 50 95C50 100.523 54.4772 105 60 105" stroke="currentColor" className="text-primary/30" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <path d="M60 75C48.9543 75 40 83.9543 40 95C40 106.046 48.9543 115 60 115" stroke="currentColor" className="text-primary/30" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      
      <path d="M100 40V50" stroke="currentColor" className="text-primary/30" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 4" />
      <path d="M100 150V160" stroke="currentColor" className="text-primary/30" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 4" />
      <path d="M40 100H50" stroke="currentColor" className="text-primary/30" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 4" />
      <path d="M150 100H160" stroke="currentColor" className="text-primary/30" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 4" />
    </svg>
  );
}
