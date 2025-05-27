import React from 'react';
import { motion } from 'framer-motion';

export default function BotAvatar() {
  return (
    <motion.div
      className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M12 2a3 3 0 0 0-3 3v1h6V5a3 3 0 0 0-3-3Z"></path>
        <path d="M19 6H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"></path>
        <path d="M9 12v4"></path>
        <path d="M15 12v4"></path>
        <path d="M13 16v.01"></path>
        <path d="M11 16v.01"></path>
      </svg>
    </motion.div>
  );
}
