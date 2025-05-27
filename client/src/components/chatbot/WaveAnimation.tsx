"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface WaveAnimationProps {
  className?: string;
}

export default function WaveAnimation({ className = '' }: WaveAnimationProps) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 h-24 overflow-hidden z-0 pointer-events-none ${className}`}>
      <motion.div
        className="absolute bottom-[-5px] left-0 right-0"
        initial={{ opacity: 0.6 }}
        animate={{
          y: [0, -10, 0],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 8,
          ease: "easeInOut" 
        }}
      >
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path 
            fillOpacity="0.07" 
            fill="currentColor"
            d="M0,96L48,128C96,160,192,224,288,240C384,256,480,224,576,197.3C672,171,768,149,864,149.3C960,149,1056,171,1152,170.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
          </path>
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-[-10px] left-0 right-0"
        initial={{ opacity: 0.5 }}
        animate={{
          y: [0, -5, 0],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 6,
          delay: 0.5,
          ease: "easeInOut" 
        }}
      >
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path 
            fillOpacity="0.1" 
            fill="currentColor"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,261.3C672,256,768,224,864,229.3C960,235,1056,277,1152,277.3C1248,277,1344,235,1392,213.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
          </path>
        </svg>
      </motion.div>
    </div>
  );
}
