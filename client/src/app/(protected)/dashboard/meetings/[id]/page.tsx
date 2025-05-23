"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeft, Download, FileText, Clock, Calendar, 
  Users, Star, MessageSquare, Share2, BarChart2,
  BookOpen, Filter, Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data - replace with API call
const MOCK_MEETINGS = [
  {
    id: '1',
    title: 'Weekly Team Standup',
    date: '2023-11-15T09:00:00',
    duration: '30 minutes',
    participants: ['John Doe', 'Jane Smith', 'Alex Johnson', 'Taylor Swift', 'Robert Wilson'],
    transcriptPreview: 'We discussed the current sprint progress and identified blockers...',
    fullTranscript: `
John: Good morning everyone, let's get started with our weekly standup. Can each of you share your progress since last week?

Jane: I've completed the user authentication module and fixed the password reset bug. I'm currently working on the profile page redesign.

Alex: I'm still working on the API integration. I've run into some issues with the third-party service. Their documentation is outdated, so I'm in contact with their support team.

John: That's a blocker we need to address. How long do you think it will take to resolve?

Alex: I hope to have it resolved by tomorrow, but it depends on their support team's response time.

Taylor: I've finished the marketing materials for the new feature launch. I need feedback on the email templates by EOD.

Robert: The database optimization is complete. We're seeing a 30% improvement in query performance. I'll be focusing on the backup system next.

John: Great progress everyone. Let's make sure we address Alex's blocker as a priority. I'll follow up with the third-party service if needed.
    `,
    insights: [
      'Action item: John to follow up with third-party service regarding API integration issues',
      'Decision made to prioritize fixing API integration before moving forward',
      'Sentiment analysis: Neutral meeting tone with focus on problem solving',
      'Jane completed user authentication module and bug fixes',
      'Database optimization resulted in 30% performance improvement'
    ],
    keyTopics: ['API Integration', 'User Authentication', 'Database Optimization', 'Marketing Materials'],
    summary: 'The team discussed progress on current sprint items with a focus on addressing API integration issues. Jane completed the authentication module, Alex is blocked on third-party API integration, Taylor finished marketing materials, and Robert completed database optimizations with 30% performance improvement. The team agreed to prioritize resolving the API integration blocker.',
    isStarred: true
  },
  {
    id: '2',
    title: 'Client Presentation: Acme Corp',
    date: '2023-11-14T14:00:00',
    duration: '45 minutes',
    participants: ['Jane Smith', 'Robert Johnson', 'Sarah Williams', 'Acme Team'],
    transcriptPreview: 'The client expressed interest in our new service offerings and requested...',
    fullTranscript: `
Jane: Thank you for joining us today. We're excited to walk you through our new service offerings that we think will be a perfect fit for Acme Corp.

Client: We're looking forward to it. We've been particularly interested in your enterprise solution.

Jane: Great! Let me walk you through that first. Our enterprise tier includes advanced analytics, custom integrations, and dedicated support.

Robert: And as you can see on this slide, we've recently enhanced our reporting capabilities, which allows for more granular insights into user behavior.

Client: That looks promising. How does this integrate with our existing systems?

Sarah: That's a great question. We've designed our platform with flexibility in mind. We can connect with your current CRM, ERP, or custom systems through our API.

Client: And what about implementation time?

Jane: Typically, we can have you fully onboarded within 4-6 weeks, depending on the complexity of your integrations.

Client: That timeline works for us. Could you send us a detailed proposal with custom pricing options?

Jane: Absolutely, we'll have that to you by next Wednesday.
    `,
    insights: [
      'Client showed high interest in the enterprise tier',
      'Integration capabilities are a key decision factor',
      'Sentiment analysis: Positive client response to product offerings',
      'Timeline expectation: 4-6 weeks for implementation',
      'Action required: Send detailed proposal by next Wednesday'
    ],
    keyTopics: ['Enterprise Solution', 'Integration Capabilities', 'Implementation Timeline', 'Pricing Proposal'],
    summary: 'The presentation to Acme Corp focused on our enterprise service tier, highlighting analytics, integrations, and support features. The client expressed strong interest and asked about integration with existing systems and implementation timeline. They requested a detailed proposal with custom pricing options to be delivered by next Wednesday. Overall reception was positive with integration capabilities being a key factor in their decision-making process.',
    isStarred: false
  },
  {
    id: '3',
    title: 'Product Strategy Session',
    date: '2023-11-13T11:00:00',
    duration: '60 minutes',
    participants: ['Alex Johnson', 'Sam Wilson', 'Taylor Green', 'Morgan Lee'],
    transcriptPreview: 'We mapped out the Q1 roadmap focusing on three key initiatives...',
    fullTranscript: `
Alex: Let's focus today on mapping our Q1 roadmap. Based on user feedback and market trends, I suggest we prioritize mobile experience, analytics integration, and the collaboration features.

Sam: I agree with mobile being a priority. Our analytics show 60% of users now access the platform via mobile devices, and the experience has some pain points.

Taylor: The collaboration features might take longer than a quarter to implement properly. We might need to extend that to Q2.

Morgan: I'm concerned about our budget constraints. Can we tackle all three initiatives in one quarter?

Alex: That's a valid concern. If we had to choose, I would prioritize mobile experience first, then analytics, and push collaboration features to Q2.

Sam: The beta testing feedback specifically mentioned navigation issues on mobile. Users are getting lost between sections.

Taylor: Right, and that's directly impacting our retention metrics. I agree we should fix that first.

Morgan: Let's map out the resources needed for each initiative and see if we can at least start the groundwork for all three in Q1, even if collaboration features extend to Q2.

Alex: That sounds like a good approach. Let's create a detailed resource allocation plan by the end of the week.
    `,
    insights: [
      'Decision: Prioritize mobile experience improvements first',
      'Budget constraints may limit implementation scope',
      'User feedback highlights critical navigation issues on mobile',
      'Collaboration features likely to extend into Q2',
      'Action item: Create resource allocation plan by end of week'
    ],
    keyTopics: ['Q1 Roadmap', 'Mobile Experience', 'Analytics Integration', 'Collaboration Features', 'Budget Constraints'],
    summary: 'The team discussed Q1 roadmap prioritization focusing on mobile experience improvements, analytics integration, and collaboration features. Due to budget constraints and development time, they agreed to prioritize mobile experience first (addressing critical navigation issues identified in user feedback), followed by analytics integration. Collaboration features will likely extend into Q2. The team will create a detailed resource allocation plan by the end of the week.',
    isStarred: true
  }
];

export default function MeetingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [meeting, setMeeting] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('transcript');

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Find the meeting with the matching ID
        const foundMeeting = MOCK_MEETINGS.find(m => m.id === params.id);
        
        if (foundMeeting) {
          setMeeting(foundMeeting);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch meeting:", error);
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchMeeting();
    }
  }, [params.id]);

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

  const handleBack = () => {
    router.back();
  };

  const handleToggleStar = () => {
    setMeeting(prev => ({
      ...prev,
      isStarred: !prev.isStarred
    }));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground">Loading meeting details...</p>
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="p-6 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-2">Meeting not found</h1>
          <p className="text-muted-foreground mb-6">The meeting you're looking for doesn't exist or has been removed.</p>
          <Button onClick={handleBack}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Meetings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full overflow-auto"
    >
      <div className="mb-6">
        <Button variant="ghost" onClick={handleBack} className="mb-4 text-muted-foreground hover:text-foreground group">
          <ArrowLeft size={18} className="mr-1 transition-transform group-hover:-translate-x-1" /> 
          Back to meetings
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              {meeting.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
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
          </motion.div>
          
          <motion.div 
            className="flex gap-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button variant="outline" className="gap-2">
              <Share2 size={16} />
              Share
            </Button>
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              Download
            </Button>
            <Button 
              variant={meeting.isStarred ? "secondary" : "outline"} 
              className="gap-2"
              onClick={handleToggleStar}
            >
              <Star size={16} className={meeting.isStarred ? "fill-yellow-500 text-yellow-500" : ""} />
              {meeting.isStarred ? "Starred" : "Star"}
            </Button>
          </motion.div>
        </div>
      </div>
      
      <Tabs defaultValue="transcript" onValueChange={setActiveTab} className="mb-6">
        <TabsList className="bg-background/30 backdrop-blur-md">
          <TabsTrigger value="transcript" className="data-[state=active]:bg-primary/20">
            <FileText size={16} className="mr-2" /> Transcript
          </TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-primary/20">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="summary" className="data-[state=active]:bg-primary/20">
            <BookOpen size={16} className="mr-2" /> Summary
          </TabsTrigger>
        </TabsList>
        
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <TabsContent value="transcript" className="mt-4 space-y-4">
            <div className="bg-background/30 backdrop-blur-md rounded-lg border border-border/30 p-6">
              <h2 className="text-xl font-medium mb-4">Full Transcript</h2>
              <div className="whitespace-pre-line text-muted-foreground">
                {meeting.fullTranscript}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="insights" className="mt-4">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-background/30 backdrop-blur-md rounded-lg border border-border/30 p-6">
                <h2 className="text-xl font-medium mb-4">Key Insights</h2>
                <ul className="space-y-4">
                  {meeting.insights.map((insight, i) => (
                    <li key={i} className="flex space-x-3 pb-3 border-b border-border/20 last:border-0 last:pb-0">
                      <div>
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        </span>
                      </div>
                      <p className="text-muted-foreground">{insight}</p>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-6">
                <div className="bg-background/30 backdrop-blur-md rounded-lg border border-border/30 p-6">
                  <h2 className="text-lg font-medium mb-3 flex items-center">
                    <Filter size={16} className="mr-2 text-primary/70" /> Key Topics
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {meeting.keyTopics.map((topic, i) => (
                      <div 
                        key={i} 
                        className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm"
                      >
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-background/30 backdrop-blur-md rounded-lg border border-border/30 p-6">
                  <h2 className="text-lg font-medium mb-3 flex items-center">
                    <Users size={16} className="mr-2 text-primary/70" /> Participants
                  </h2>
                  <div className="space-y-2">
                    {meeting.participants.map((participant, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-background/50 transition-colors"
                      >
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                          {participant.split(' ').map(name => name[0]).join('')}
                        </div>
                        <span className="text-sm">{participant}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-background/30 backdrop-blur-md rounded-lg border border-border/30 p-6">
                  <h2 className="text-lg font-medium mb-3 flex items-center">
                    <BarChart2 size={16} className="mr-2 text-primary/70" /> Meeting Stats
                  </h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span>{meeting.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Participants</span>
                      <span>{meeting.participants.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Transcript Length</span>
                      <span>{meeting.fullTranscript.length} chars</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Key Insights</span>
                      <span>{meeting.insights.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="summary" className="mt-4">
            <div className="bg-background/30 backdrop-blur-md rounded-lg border border-border/30 p-6">
              <h2 className="text-xl font-medium mb-4 flex items-center">
                <BookOpen size={18} className="mr-2 text-primary" /> Executive Summary
              </h2>
              <p className="text-muted-foreground">
                {meeting.summary}
              </p>
              
              <div className="mt-6 pt-6 border-t border-border/20">
                <h3 className="text-lg font-medium mb-3">Key Action Items</h3>
                <ul className="space-y-2">
                  {meeting.insights
                    .filter(insight => insight.toLowerCase().includes('action'))
                    .map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="h-5 w-5 flex-shrink-0 rounded border border-primary/30 mt-0.5"></div>
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        </motion.div>
      </Tabs>
      
      <div className="flex justify-between mb-6">
        <Button variant="outline" className="gap-2 text-destructive border-destructive/20 hover:bg-destructive/10">
          <Trash2 size={16} />
          Delete Meeting
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <MessageSquare size={16} />
            Add Comment
          </Button>
          <Button className="gap-2">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Generate Report
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
