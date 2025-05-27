"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from '@/components/chatbot/ChatMessage';
import ChatInput from '@/components/chatbot/ChatInput';
import BotAvatar from '@/components/chatbot/BotAvatar';
import { GridPattern } from '@/components/ui/decorative-svg';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const suggestedQuestions = [
  "Summarize yesterday's meeting",
  "What tasks were assigned to me?",
  "When is the next project deadline?",
  "Who is responsible for the marketing presentation?",
  "What decisions were made about the budget?"
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your meeting assistant. I've been trained on your meeting transcripts. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    try {
      // Simulate API call to the LLM model
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: generateResponse(message),
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
    }
  };

  // This is a placeholder function - in a real implementation, you would call your actual API
  const generateResponse = (query: string) => {
    if (query.toLowerCase().includes("summarize")) {
      return "In yesterday's meeting, the team discussed the upcoming product launch. Key points included: 1) Marketing materials need to be finalized by Friday, 2) The development team reported all critical bugs have been resolved, 3) Customer support training will begin next Monday, and 4) The official launch date was confirmed for the 15th of next month.";
    } else if (query.toLowerCase().includes("tasks") || query.toLowerCase().includes("assigned")) {
      return "You were assigned the following tasks: 1) Complete the user onboarding documentation by Thursday, 2) Review the new landing page design and provide feedback by tomorrow, and 3) Schedule a meeting with the external vendors for next week.";
    } else if (query.toLowerCase().includes("deadline")) {
      return "The next major project deadline is the product launch on the 15th of next month. Before that, we have several interim deadlines: Marketing materials (this Friday), QA testing completion (next Wednesday), and press release distribution (next Friday).";
    } else {
      const responses = [
        "Based on your meeting transcripts, the team decided to prioritize the user authentication feature for the next sprint due to security concerns raised by the client.",
        "According to the last meeting, the deadline for the initial prototype was extended to the end of the month after feedback from stakeholders suggested more time was needed for user research.",
        "The marketing team mentioned they need the final designs by next Wednesday to ensure adequate time for creating promotional materials before the launch date.",
        "In yesterday's meeting, John was assigned to handle the client presentation scheduled for next Thursday. He'll be covering the new features and addressing the performance improvements.",
        "The budget discussion concluded with an approved increase of 15% for Q3 to accommodate the new hires and additional server infrastructure requirements.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  const useSuggestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="relative flex flex-col h-full bg-background/50 dark:bg-background/80 rounded-lg border border-border/30 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <GridPattern className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01] text-foreground w-full h-full" />
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-primary/5 dark:bg-primary/10 blur-[60px]" />
        <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-primary/5 dark:bg-primary/10 blur-[60px]" />
      </div>
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center justify-between p-4 border-b border-border/30 backdrop-blur-md"
      >
        <div className="flex items-center space-x-3">
          <div className="relative">
            <BotAvatar />
            <motion.div 
              className="absolute -inset-1 bg-primary/20 rounded-full blur-md -z-10"
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Meeting Assistant</h1>
            <p className="text-sm text-muted-foreground">Powered by Noted.AI</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-accent/50 text-muted-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-accent/50 text-muted-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Messages area with improved styling */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ChatMessage message={msg} />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 p-2"
          >
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <span className="text-sm text-muted-foreground">Assistant is thinking</span>
            </div>
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions */}
      {messages.length < 3 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="px-4 pb-3"
        >
          <div className="text-sm font-medium text-muted-foreground mb-3">Suggested questions:</div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-sm px-3 py-1.5 rounded-full bg-accent/30 hover:bg-accent/50 border border-border/50 text-foreground transition-colors"
                onClick={() => useSuggestion(question)}
                disabled={isTyping}
              >
                {question}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="p-4 border-t border-border/30 backdrop-blur-md"
      >
        <ChatInput onSendMessage={handleSendMessage} isDisabled={isTyping} />
      </motion.div>
    </div>
  );
}
