"use client";

import { motion } from "framer-motion";

interface HeroAnimationProps {
  className?: string;
}

export default function HeroAnimation({ className }: HeroAnimationProps) {
  return (
    <div className={className}>
      <motion.svg
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate="visible"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
        </defs>

        {/* Background for the illustration */}
        <motion.rect
          x="50"
          y="50"
          rx="20"
          ry="20"
          width="400"
          height="300"
          fill="white"
          stroke="hsl(var(--border))"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Chat bubbles representing meeting transcription/summary */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* First bubble - left side */}
          <motion.rect
            x="80"
            y="100"
            rx="10"
            ry="10"
            width="140"
            height="60"
            fill="hsl(var(--muted))"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />
          <motion.circle
            cx="90"
            cy="90"
            r="15"
            fill="hsl(var(--muted))"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />

          {/* Second bubble - right side */}
          <motion.rect
            x="260"
            y="130"
            rx="10"
            ry="10"
            width="160"
            height="80"
            fill="hsl(var(--primary)/0.2)"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />
          <motion.circle
            cx="410"
            cy="120"
            r="15"
            fill="hsl(var(--primary)/0.2)"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />

          {/* Third bubble - left side */}
          <motion.rect
            x="100"
            y="180"
            rx="10"
            ry="10"
            width="120"
            height="50"
            fill="hsl(var(--muted))"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />
          <motion.circle
            cx="110"
            cy="170"
            r="15"
            fill="hsl(var(--muted))"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />
        </motion.g>

        {/* AI element processing the meeting */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.circle
            cx="250"
            cy="250"
            r="40"
            fill="url(#gradient)"
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1.1, 1] }}
            transition={{ 
              delay: 1.2, 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
          
          {/* Pulsing rings around the AI element */}
          <motion.circle
            cx="250"
            cy="250"
            r="60"
            fill="none"
            stroke="hsl(var(--primary)/0.3)"
            strokeWidth="2"
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "loop" 
            }}
          />
          <motion.circle
            cx="250"
            cy="250"
            r="50"
            fill="none"
            stroke="hsl(var(--primary)/0.5)"
            strokeWidth="2"
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: 1.3, opacity: 0 }}
            transition={{ 
              duration: 2, 
              delay: 0.5,
              repeat: Infinity,
              repeatType: "loop" 
            }}
          />
        </motion.g>

        {/* Summary output document */}
        <motion.g
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <motion.rect
            x="150"
            y="320"
            rx="10"
            ry="10"
            width="200"
            height="120"
            fill="white"
            stroke="hsl(var(--border))"
            strokeWidth="2"
          />
          
          {/* Document lines */}
          <motion.line
            x1="170"
            y1="340"
            x2="330"
            y2="340"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{ delay: 1.4, duration: 0.3 }}
          />
          <motion.line
            x1="170"
            y1="360"
            x2="310"
            y2="360"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
            initial={{ width: 0 }}
            animate={{ width: 140 }}
            transition={{ delay: 1.5, duration: 0.3 }}
          />
          <motion.line
            x1="170"
            y1="380"
            x2="320"
            y2="380"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
            initial={{ width: 0 }}
            animate={{ width: 150 }}
            transition={{ delay: 1.6, duration: 0.3 }}
          />
          <motion.line
            x1="170"
            y1="400"
            x2="290"
            y2="400"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 1.7, duration: 0.3 }}
          />
          <motion.line
            x1="170"
            y1="420"
            x2="310"
            y2="420"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
            initial={{ width: 0 }}
            animate={{ width: 140 }}
            transition={{ delay: 1.8, duration: 0.3 }}
          />
        </motion.g>
      </motion.svg>
    </div>
  );
}
