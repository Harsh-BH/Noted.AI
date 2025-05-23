"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Clock, 
  Star, 
  Plus, 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  PenTool, 
  BrainCircuit, 
  Zap,
  
} from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export default function DashboardPage() {
  return (
    <motion.div 
      className="space-y-5 max-h-full"  // Reduced vertical spacing to fit content
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background decorative elements */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />
      <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-primary/5 rounded-full blur-[60px] -z-10" />
      
      <motion.div 
        className="flex items-center justify-between"
        variants={itemVariants}
      >
        <div>
          <p className="text-muted-foreground mb-1">Good morning, User</p>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <Button className="flex items-center gap-2 group relative overflow-hidden glass-button">
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <Plus size={16} className="relative z-10" />
          <span className="relative z-10">New Note</span>
        </Button>
      </motion.div>

      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" // Reduced gap
        variants={itemVariants}
      >
        <StatsCard 
          title="Recent Notes"
          icon={<FileText className="h-4 w-4 text-primary" />}
          value="12"
          description="+2 notes in the last week"
          trend={<TrendingUp className="h-3 w-3 text-green-500" />}
        />

        <StatsCard 
          title="Study Time"
          icon={<Clock className="h-4 w-4 text-primary" />}
          value="24.5 hrs"
          description="+5.2 hrs compared to last week"
          trend={<TrendingUp className="h-3 w-3 text-green-500" />}
        />

        <StatsCard 
          title="Starred Notes"
          icon={<Star className="h-4 w-4 text-primary/90" />}
          value="7"
          description="Your most important content"
        />
      </motion.div>

      <motion.div 
        className="grid gap-4 md:grid-cols-2" // Reduced gap
        variants={itemVariants}
      >
        <Card className="col-span-1 overflow-hidden group hover:shadow-lg transition-all duration-300 glass-card relative">
          {/* Enhanced glassy background effects */}
          <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Activity
              <motion.div
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles size={18} className="text-primary" />
              </motion.div>
            </CardTitle>
            <CardDescription>Your recent notes and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3"> {/* Reduced spacing */}
              {[
                { title: 'Physics Notes', icon: <PenTool size={18} /> },
                { title: 'Chemistry Study Guide', icon: <BrainCircuit size={18} /> },
                { title: 'History Timeline', icon: <Calendar size={18} /> }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 border-b border-border/30 pb-3 cursor-pointer group"
                >
                  <div className="relative h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary transition-colors duration-300 group-hover:bg-primary/20 overflow-hidden">
                    {item.icon}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.title} {i+1}</p>
                    <p className="text-sm text-muted-foreground">Updated {i+1} day{i !== 0 ? 's' : ''} ago</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 overflow-hidden group hover:shadow-lg transition-all duration-300 glass-card relative">
          {/* Enhanced glassy background effects */}
          <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Upcoming Tests
              <Calendar size={18} className="text-primary" />
            </CardTitle>
            <CardDescription>Prepare for these upcoming exams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3"> {/* Reduced spacing */}
              {[
                { exam: 'Chemistry Mid-term', icon: <Zap size={18} /> },
                { exam: 'Math Quiz', icon: <Zap size={18} /> },
                { exam: 'History Final', icon: <BrainCircuit size={18} /> }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 border-b border-border/30 pb-3 group"
                >
                  <div className="relative h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors overflow-hidden">
                    {item.icon}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.exam}</p>
                    <p className="text-sm text-muted-foreground">In {(i + 1) * 3} days</p>
                  </div>
                  <Button variant="outline" size="sm" className="relative overflow-hidden group bg-background/20 backdrop-blur-xl border-border/30 hover:bg-background/30">
                    <span className="relative z-10">View Notes</span>
                    <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        className="grid gap-4 grid-cols-1 md:grid-cols-3" // Reduced gap
        variants={itemVariants}
      >
        <Card className="overflow-hidden relative glass-card">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] -z-0" />
          <CardHeader className="pb-2"> {/* Reduced padding */}
            <CardTitle className="flex items-center text-base gap-2">
              <Zap size={18} className="text-primary" />
              AI Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-1"> {/* Reduced spacing & padding */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 backdrop-blur-xl hover:bg-primary/10 transition-colors cursor-pointer">
              <BrainCircuit className="text-primary h-4 w-4" />
              <p className="text-sm">Generate flashcards from your Physics notes</p>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 backdrop-blur-xl hover:bg-primary/10 transition-colors cursor-pointer">
              <Zap className="text-primary h-4 w-4" />
              <p className="text-sm">Summarize your History chapter notes</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden relative glass-card md:col-span-2">
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-[60px] -z-0" />
          <CardHeader className="pb-2"> {/* Reduced padding */}
            <CardTitle className="flex items-center text-base gap-2">
              <TrendingUp size={18} className="text-primary" />
              Study Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-1"> {/* Reduced padding */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Chemistry</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary/80 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Physics</span>
                  <span className="text-sm text-muted-foreground">60%</span>
                </div>
                <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary/80 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Mathematics</span>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary/80 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

interface StatsCardProps {
  title: string;
  icon: React.ReactNode;
  value: string;
  description: string;
  trend?: React.ReactNode;
}

function StatsCard({ title, icon, value, description, trend }: StatsCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 glass-card relative">
      {/* Enhanced glassy effect with animation */}
      <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-primary/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute inset-0 bg-gradient-to-br from-background/30 to-background/10 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="rounded-full p-1.5 bg-background/30 backdrop-blur-xl group-hover:bg-primary/10 transition-colors duration-300">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold group-hover:scale-105 transition-transform duration-300 flex items-center gap-1">
          {value}
          {trend && <span className="ml-1">{trend}</span>}
        </div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
