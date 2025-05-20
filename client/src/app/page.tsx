"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ChevronRight, Mic, FileText, BrainCircuit, Zap, Calendar, Users, 
  MessageSquare, Sparkles, Star, ArrowRight, ChevronDown, ArrowUp,
  MousePointer
} from "lucide-react";
import ParticleBackground from "@/components/animations/particle-background";
import DarkThemeHero from "@/components/animations/dark-theme-hero";
import FloatingIcons from "@/components/animations/floating-icons";
import TextGlitch from "@/components/animations/text-glitch";
import ScrollIndicator from "@/components/animations/scroll-indicator";

export default function Home() {
  // Refs for scroll animations
  const targetRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const testimonialRef = useRef(null);
  const ctaRef = useRef(null);
  
  // State for scroll to top button
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Main scroll progress
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Smoothed scroll progress for progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Greatly enhanced transform values for more prominent parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -300]); 
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const heroRotate = useTransform(scrollYProgress, [0, 0.2], [0, -5]);
  
  // Features section enhanced parallax
  const { scrollYProgress: featuresScrollProgress } = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"]
  });
  const featuresBgY = useTransform(featuresScrollProgress, [0, 1], [300, -300]);
  const featuresBgX = useTransform(featuresScrollProgress, [0, 0.5, 1], [-50, 0, 50]);
  const featuresScale = useTransform(featuresScrollProgress, [0, 0.5, 1], [0.8, 1.05, 0.8]);
  const featuresRotate = useTransform(featuresScrollProgress, [0, 0.5, 1], [-2, 0, 2]);
  
  // How it works section enhanced parallax
  const { scrollYProgress: howItWorksScrollProgress } = useScroll({
    target: howItWorksRef,
    offset: ["start end", "end start"]
  });
  const howItWorksBgY = useTransform(howItWorksScrollProgress, [0, 1], [200, -200]);
  const howItWorksBgX = useTransform(howItWorksScrollProgress, [0, 1], [-100, 100]);
  const howItWorksRotate = useTransform(howItWorksScrollProgress, [0, 0.5, 1], [-3, 0, 3]);
  
  // Testimonial section enhanced parallax
  const { scrollYProgress: testimonialScrollProgress } = useScroll({
    target: testimonialRef,
    offset: ["start end", "end start"]
  });
  const testimonialBgY = useTransform(testimonialScrollProgress, [0, 1], [100, -100]);
  const testimonialRotate = useTransform(testimonialScrollProgress, [0, 1], [2, -2]);
  const testimonialScale = useTransform(testimonialScrollProgress, [0, 0.5, 1], [0.9, 1.05, 0.9]);
  
  // CTA section enhanced parallax
  const { scrollYProgress: ctaScrollProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"]
  });
  const ctaScale = useTransform(ctaScrollProgress, [0, 0.5, 1], [0.7, 1.1, 0.7]);
  const ctaRotate = useTransform(ctaScrollProgress, [0, 0.5, 1], [-3, 0, 3]);

  // Check scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Scroll to next section function
  const scrollToNextSection = () => {
    const heroHeight = window.innerHeight;
    window.scrollTo({
      top: heroHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white font-sans" ref={targetRef}>
      {/* Progress bar at the top */}
      <motion.div 
        className="scroll-progress-bar" 
        style={{ scaleX, transformOrigin: "0%" }}
      />
      
      {/* Enhanced floating particles background with higher opacity */}
      <ParticleBackground className="fixed inset-0 z-0 opacity-70" />
      
      {/* Hero Section with enhanced effects and better centering */}
      <motion.section 
        className="relative py-24 md:py-36 overflow-hidden flex items-center justify-center min-h-screen"
        style={{ 
          y: heroY, 
          opacity: heroOpacity, 
          scale: heroScale,
          rotate: heroRotate
        }}
      >
        {/* Additional animated gradient blobs with increased size and opacity */}
        <motion.div 
          className="absolute top-1/3 left-1/4 w-[30rem] h-[30rem] rounded-full bg-indigo-600/30 blur-[120px]"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [-20, 20, -20],
            y: [-20, 20, -20],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[25rem] h-[25rem] rounded-full bg-purple-600/30 blur-[120px]"
          animate={{ 
            scale: [1.2, 0.9, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [20, -20, 20],
            y: [20, -20, 20],
          }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
        />
        
        {/* New animated floating elements */}
        <FloatingIcons className="absolute inset-0 z-10 opacity-80" />
        
        <div className="container relative z-10 px-8 md:px-10 mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col space-y-8 max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex justify-center"
              >
                <Badge className="bg-indigo-500/30 text-indigo-200 hover:bg-indigo-500/40 transition-all px-5 py-2 text-base font-medium">
                  <Sparkles className="w-4 h-4 mr-1.5" /> Meet Summize <Sparkles className="w-4 h-4 ml-1.5" />
                </Badge>
              </motion.div>
              
              <div className="relative">
                <motion.h1 
                  className="text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 tracking-tight leading-tight drop-shadow-[0_5px_25px_rgba(123,97,255,0.3)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <TextGlitch>AI-Powered Meeting Summarizer</TextGlitch>
                </motion.h1>
                
                {/* Decorative elements around heading */}
                <motion.div 
                  className="absolute -right-20 -top-16 text-indigo-500/80"
                  initial={{ opacity: 0, scale: 0, rotate: -30 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 1, duration: 0.8, type: "spring" }}
                >
                  <Star className="w-12 h-12" />
                </motion.div>
                <motion.div 
                  className="absolute -left-16 -bottom-10 text-purple-500/80"
                  initial={{ opacity: 0, scale: 0, rotate: 30 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 1.1, duration: 0.8, type: "spring" }}
                >
                  <MessageSquare className="w-10 h-10" />
                </motion.div>
              </div>
              
              <motion.p 
                className="text-xl md:text-2xl text-zinc-300 mx-auto font-light leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Automatically transcribe, summarize, and organize your meeting discussions with cutting-edge AI. Never miss important details again.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-5 pt-8 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white group shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transition-all duration-300 text-lg px-10 py-8">
                  Start for free
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" className="border-zinc-600 text-zinc-200 hover:bg-zinc-800/90 hover:text-white transition-all duration-300 text-lg px-10 py-8">
                  Watch demo
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-20 max-w-2xl mx-auto w-full"
            >
              <DarkThemeHero className="w-full drop-shadow-[0_20px_50px_rgba(99,102,241,0.3)]" />
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator at bottom of hero */}
        <ScrollIndicator 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20" 
          onClick={scrollToNextSection} 
        />
      </motion.section>
      
      {/* Stats Section with enhanced animations and better centering */}
      <section className="py-28 border-t border-zinc-800/50 relative">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 to-transparent z-0"
          style={{ y: featuresBgY }}
        />
        
        <div className="container relative z-10 px-8 mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {[
              { number: "93%", label: "Time saved on meeting notes" },
              { number: "10K+", label: "Daily active users" },
              { number: "250K+", label: "Meetings summarized" },
              { number: "99.9%", label: "Customer satisfaction" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="flex flex-col items-center text-center"
              >
                <p className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300 drop-shadow-[0_2px_15px_rgba(123,97,255,0.4)]">
                  {stat.number}
                </p>
                <p className="text-zinc-300 mt-3 font-medium text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section with enhanced animations and better centering */}
      <section ref={featuresRef} className="relative py-44 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-indigo-900/40 via-transparent to-purple-900/40 z-0"
          style={{ 
            y: featuresBgY, 
            x: featuresBgX, 
            scale: featuresScale, 
            rotate: featuresRotate 
          }}
        />
        
        <motion.div 
          className="absolute -top-[10%] -right-[5%] w-[80%] h-[80%] bg-indigo-600/30 rounded-full blur-[150px] z-0"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.2, 0.3],
            x: [-40, 40, -40],
            y: [0, -40, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <div className="container relative z-10 px-8 mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center space-y-8 mb-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-indigo-500/30 text-indigo-200 hover:bg-indigo-500/40 transition-all px-5 py-2 text-base font-medium">
                <Sparkles className="w-4 h-4 mr-1.5" /> Features
              </Badge>
            </motion.div>
            <motion.h2 
              className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300 tracking-tight drop-shadow-[0_2px_15px_rgba(123,97,255,0.4)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Everything you need for productive meetings
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Summize transforms your meetings into actionable insights, saving your team hours every week.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                icon: <Mic className="h-10 w-10 text-indigo-300" />,
                title: "Audio/Video to Text",
                description: "Automatically transcribes Zoom, Meet, or uploaded recordings with high accuracy."
              },
              {
                icon: <BrainCircuit className="h-10 w-10 text-purple-300" />,
                title: "Smart Summarization",
                description: "Uses OpenAI GPT-4 to create action items, key points, and highlights."
              },
              {
                icon: <Zap className="h-10 w-10 text-pink-300" />,
                title: "Integrations",
                description: "Push summaries to Slack, Notion, and Google Calendar with one click."
              },
              {
                icon: <FileText className="h-10 w-10 text-indigo-300" />,
                title: "Searchable Summaries",
                description: "Semantic search across all past meetings to find what you need."
              },
              {
                icon: <Users className="h-10 w-10 text-purple-300" />,
                title: "Multi-user Support",
                description: "Account system with roles for your entire team to collaborate."
              },
              {
                icon: <Calendar className="h-10 w-10 text-pink-300" />,
                title: "Calendar Sync",
                description: "Automatically process recordings from calendar events."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.05,
                  transition: { duration: 0.2 } 
                }}
              >
                <Card className="h-full bg-zinc-900/70 border-zinc-800/70 backdrop-blur-xl hover:border-indigo-500/60 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(99,102,241,0.3)]">
                  <CardHeader className="flex flex-col items-center text-center pb-4">
                    <div className="p-5 w-fit rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mb-5 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-white text-2xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center px-6">
                    <CardDescription className="text-zinc-300 text-lg font-light leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section with enhanced animations and better centering */}
      <section ref={howItWorksRef} className="py-44 relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black to-zinc-900/50 z-0"
          style={{ 
            y: howItWorksBgY, 
            x: howItWorksBgX, 
            rotate: howItWorksRotate 
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 left-0 w-full h-96 bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-purple-600/20 blur-[120px] z-0"
          animate={{ 
            opacity: [0.15, 0.3, 0.15],
            y: [-50, 0, -50],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <div className="container relative z-10 px-8 mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center space-y-8 mb-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-purple-500/30 text-purple-200 hover:bg-purple-500/40 transition-all px-5 py-2 text-base font-medium">
                <Sparkles className="w-4 h-4 mr-1.5" /> How It Works
              </Badge>
            </motion.div>
            <motion.h2 
              className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300 tracking-tight drop-shadow-[0_2px_15px_rgba(168,85,247,0.4)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Simple three-step process
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              From meeting to actionable summary in minutes, not hours.
            </motion.p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 mt-16 relative max-w-5xl mx-auto">
            {/* Enhanced connecting line for desktop */}
            <div className="hidden md:block absolute top-[90px] left-[5%] right-[5%] h-2 bg-gradient-to-r from-indigo-500/70 via-purple-500/70 to-pink-500/70 z-0 shadow-[0_0_20px_rgba(139,92,246,0.6)]" />
            
            {[
              {
                step: "01",
                title: "Upload Recording",
                description: "Upload your meeting recording or connect your video conferencing app."
              },
              {
                step: "02",
                title: "AI Processing",
                description: "Our AI transcribes the audio and generates a comprehensive summary."
              },
              {
                step: "03",
                title: "Review & Share",
                description: "Review the summary, make edits if needed, and share with your team."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3, duration: 0.8 }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col items-center text-center relative z-10 md:w-1/3"
              >
                <motion.div 
                  className="flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-3xl font-bold mb-10 shadow-[0_0_40px_rgba(139,92,246,0.5)]"
                  whileHover={{ 
                    scale: 1.15,
                    boxShadow: "0 0 60px rgba(139,92,246,0.7)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {step.step}
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white">{step.title}</h3>
                <p className="text-zinc-300 max-w-xs mx-auto text-lg font-light leading-relaxed">{step.description}</p>
                
                {/* New animated arrow for better flow visualization */}
                {index < 2 && (
                  <motion.div 
                    className="text-indigo-400 absolute top-[90px] -right-[10%] rotate-[-20deg] hidden md:block"
                    animate={{ 
                      x: [0, 10, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  >
                    <ArrowRight className="w-12 h-12" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section with enhanced animations and better centering */}
      <section ref={testimonialRef} className="py-44 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-[#0a0a0a]"
          style={{ 
            y: testimonialBgY, 
            rotate: testimonialRotate,
            scale: testimonialScale
          }}
        />
        
        <motion.div 
          className="absolute top-0 right-0 w-[50%] h-[60%] bg-indigo-600/15 blur-[150px] rounded-full z-0"
          animate={{ 
            opacity: [0.1, 0.25, 0.1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        
        <motion.div 
          className="absolute bottom-0 left-0 w-[50%] h-[60%] bg-purple-600/15 blur-[150px] rounded-full z-0"
          animate={{ 
            opacity: [0.1, 0.25, 0.1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, delay: 1 }}
        />
        
        <div className="container relative z-10 px-8 mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center space-y-8 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-pink-500/30 text-pink-200 hover:bg-pink-500/40 transition-all px-5 py-2 text-base font-medium">
                <Sparkles className="w-4 h-4 mr-1.5" /> Testimonials
              </Badge>
            </motion.div>
            <motion.h2 
              className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300 tracking-tight drop-shadow-[0_2px_15px_rgba(236,72,153,0.4)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Loved by teams everywhere
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Hear what our customers have to say about Summize
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.4
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              {
                quote: "Summize has completely transformed our meeting culture. We spend less time in meetings and more time on execution.",
                name: "Sarah Johnson",
                title: "Engineering Manager",
                avatar: "/avatars/avatar-1.jpg"
              },
              {
                quote: "The AI summaries are surprisingly accurate and catch details I would have missed. It's like having an extra team member.",
                name: "David Chen",
                title: "Product Lead",
                avatar: "/avatars/avatar-2.jpg"
              },
              {
                quote: "The Slack integration is a game-changer. Everyone stays in the loop without attending every single meeting.",
                name: "Alexa Rodriguez",
                title: "Operations Director",
                avatar: "/avatars/avatar-3.jpg"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 80 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.05,
                  transition: { duration: 0.2 } 
                }}
                transition={{ duration: 0.8 }}
              >
                <Card className="h-full bg-zinc-900/80 border-zinc-800/70 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(139,92,246,0.3)] hover:border-purple-500/40 transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-16 w-16 text-indigo-500/70 mx-auto mb-3"
                    >
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                    </svg>
                  </CardHeader>
                  <CardContent className="text-center px-8">
                    <p className="mb-10 italic text-zinc-200 text-xl leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                    <div className="flex flex-col items-center">
                      <Avatar className="h-24 w-24 mb-5 ring-2 ring-indigo-500/50 shadow-[0_0_25px_rgba(99,102,241,0.5)]">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback className="bg-indigo-500/20 text-indigo-200 text-2xl">{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-white text-2xl">{testimonial.name}</p>
                        <p className="text-zinc-400 text-lg">{testimonial.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section with enhanced animations and better centering */}
      <section ref={ctaRef} className="py-44 relative overflow-hidden">
        <div className="container px-8 mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ 
              scale: ctaScale,
              rotate: ctaRotate
            }}
            className="relative overflow-hidden rounded-3xl p-16 md:p-24 max-w-5xl mx-auto shadow-[0_0_70px_rgba(99,102,241,0.4)]"
          >
            {/* Enhanced animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-95"></div>
            <motion.div 
              className="absolute inset-0 opacity-95"
              animate={{ 
                background: [
                  "linear-gradient(60deg, rgba(79, 70, 229, 0.95) 0%, rgba(124, 58, 237, 0.95) 50%, rgba(236, 72, 153, 0.95) 100%)",
                  "linear-gradient(120deg, rgba(236, 72, 153, 0.95) 0%, rgba(124, 58, 237, 0.95) 50%, rgba(79, 70, 229, 0.95) 100%)",
                  "linear-gradient(60deg, rgba(79, 70, 229, 0.95) 0%, rgba(124, 58, 237, 0.95) 50%, rgba(236, 72, 153, 0.95) 100%)"
                ]
              }}
              transition={{ duration: 15, repeat: Infinity }}
            />
            
            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-[0_2px_15px_rgba(255,255,255,0.4)]">
                  Ready to transform your meetings?
                </h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                viewport={{ once: true }}
              >
                <p className="text-2xl md:text-3xl text-white/95 max-w-xl font-light leading-relaxed">
                  Join thousands of teams using Summize to save time and improve productivity.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-8 w-full justify-center pt-6"
              >
                <motion.div whileHover={{ scale: 1.08 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Button size="lg" className="bg-white text-indigo-700 hover:bg-white/90 font-medium text-xl px-14 py-8 shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-all duration-300">
                    Get Started Free
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.08 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 text-xl px-14 py-8 border-2 transition-all duration-300">
                    Book a Demo
                  </Button>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Enhanced floating elements for effect */}
            <motion.div
              className="absolute w-40 h-40 rounded-full bg-white/10 top-10 left-10"
              animate={{ 
                y: [0, 30, 0],
                x: [0, 15, 0],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 15, 0]
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-32 h-32 rounded-full bg-white/10 bottom-20 right-20"
              animate={{ 
                y: [0, -30, 0],
                x: [0, -15, 0],
                opacity: [0.2, 0.5, 0.2],
                rotate: [0, -15, 0]
              }}
              transition={{ duration: 9, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-24 h-24 rounded-full bg-white/10 top-1/2 right-1/4"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 7, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </section>
      
      {/* Footer with enhanced styling and better centering */}
      <footer className="border-t border-zinc-800 py-20 md:py-24 bg-black">
        <div className="container px-8 mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
            <div className="col-span-2 md:col-span-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-6">
                <BrainCircuit className="h-8 w-8 text-indigo-400" />
                <span className="text-2xl font-bold text-white">Summize</span>
              </div>
              <p className="text-zinc-300 mb-6 text-lg font-light">
                AI-powered meeting summarization for productive teams.
              </p>
              <div className="flex space-x-5 justify-center md:justify-start">
                <Link href="#" className="text-zinc-400 hover:text-indigo-300 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" className="text-zinc-400 hover:text-indigo-300 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-zinc-400 hover:text-indigo-300 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-base font-semibold uppercase tracking-wider text-zinc-200 mb-5">Product</h3>
              <ul className="space-y-4">
                <li><Link href="#" className="text-zinc-300 hover:text-indigo-300 transition-colors font-light">Features</Link></li>
                <li><Link href="#" className="text-zinc-300 hover:text-indigo-300 transition-colors font-light">Pricing</Link></li>
                <li><Link href="#" className="text-zinc-300 hover:text-indigo-300 transition-colors font-light">Integrations</Link></li>
                <li><Link href="#" className="text-zinc-300 hover:text-indigo-300 transition-colors font-light">Changelog</Link></li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-base font-semibold uppercase tracking-wider text-zinc-200 mb-5">Resources</h3>
              <ul className="space-y-4">
                <li><Link href="#" className="text-zinc-300 hover:text-indigo-300 transition-colors font-light">Documentation</Link></li>
                <li><Link href="#" className="text-zinc-300 hover:text-indigo-300 transition-colors font-light">Blog</Link></li>
                <li><Link href="#" className="text-zinc-300 hover:text-indigo-300 transition-colors font-light">Community</Link></li>
                <li><Link href="#" className="text-zinc-300 hover:text-indigo-300 transition-colors font-light">Support</Link></li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-base font-semibold uppercase tracking-wider text-zinc-200 mb-5">Company</h3>
              <ul className="space-y-4">
                <li><Link href="#" className="text-zinc-300 hover:text-indigo-300 transition-colors font-light">About</Link></li>
                <li><Link href="#" className="text-zinc-300 hover:text-indigo-300 transition-colors font-light">Careers</Link></li>
                <li><Link href="#" className="text-zinc-300 hover:text-indigo-300 transition-colors font-light">Privacy</Link></li>
                <li><Link href="#" className="text-zinc-300 hover:text-indigo-300 transition-colors font-light">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
            <p className="text-zinc-400 text-base">
              © {new Date().getFullYear()} Summize. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <Link href="#" className="text-zinc-400 hover:text-indigo-300 transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-zinc-400 hover:text-indigo-300 transition-colors">Terms of Service</Link>
              <Link href="#" className="text-zinc-400 hover:text-indigo-300 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-to-top hover:bg-zinc-800 hover:scale-110 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
