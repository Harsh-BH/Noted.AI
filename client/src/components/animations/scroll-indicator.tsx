"use client";

import { motion } from "framer-motion";
import { ChevronDown, MousePointer } from "lucide-react";

interface ScrollIndicatorProps {
  className?: string;
  onClick?: () => void;
}

export default function ScrollIndicator({ className, onClick }: ScrollIndicatorProps) {
  return (
    <motion.div 
      className={`flex flex-col items-center space-y-2 cursor-pointer ${className}`}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      {/* Mouse outline */}
      <motion.div 
        className="relative w-6 h-10 rounded-full border-2 border-indigo-400/60 flex items-center justify-center"
        animate={{ 
          boxShadow: [
            "0 0 0 rgba(99, 102, 241, 0)", 
            "0 0 8px rgba(99, 102, 241, 0.5)", 
            "0 0 0 rgba(99, 102, 241, 0)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Mouse wheel/scroll */}
        <motion.div 
          className="w-1 h-2 bg-indigo-400 rounded-full" 
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
      
      {/* Scroll text */}
      <motion.p 
        className="text-xs text-zinc-400 uppercase tracking-widest"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Scroll
      </motion.p>
      
      {/* Animated arrows */}
      <motion.div className="flex flex-col items-center">
        {[0, 1, 2].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, 8, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              delay: i * 0.2,
              ease: "easeOut" 
            }}
          >
            <ChevronDown className="h-4 w-4 text-indigo-400" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
