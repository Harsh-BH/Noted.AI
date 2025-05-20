"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";

interface TextGlitchProps {
  children: ReactNode;
  className?: string;
}

export default function TextGlitch({ children, className }: TextGlitchProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger animation at random intervals for initial load effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1500);
    }, 2000);

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  // Glow and slight movement animation
  const glowVariants = {
    idle: {
      textShadow: "0 0 8px rgba(124, 58, 237, 0.5)",
    },
    hover: {
      textShadow: [
        "0 0 10px rgba(124, 58, 237, 0.6)",
        "0 0 20px rgba(124, 58, 237, 0.8)",
        "0 0 30px rgba(124, 58, 237, 0.6)",
        "0 0 10px rgba(124, 58, 237, 0.6)",
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
      },
    },
    animating: {
      textShadow: [
        "0 0 10px rgba(124, 58, 237, 0.6)",
        "0 0 30px rgba(139, 92, 246, 0.9)",
        "0 0 50px rgba(167, 139, 250, 0.7)",
        "0 0 10px rgba(124, 58, 237, 0.6)",
      ],
      x: [0, -3, 5, 0, 2, -4, 0],
      transition: {
        textShadow: { duration: 0.5 },
        x: { duration: 0.5, times: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1] }
      }
    }
  };

  return (
    <motion.span
      className={className}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      variants={glowVariants}
      initial="idle"
      animate={isAnimating ? "animating" : isHovered ? "hover" : "idle"}
    >
      {children}
    </motion.span>
  );
}
