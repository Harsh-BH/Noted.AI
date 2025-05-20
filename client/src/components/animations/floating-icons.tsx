"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Mic, FileText, MessageSquare, PieChart, ArrowUpRight, RefreshCw, Clock } from "lucide-react";

interface FloatingIconsProps {
  className?: string;
}

export default function FloatingIcons({ className }: FloatingIconsProps) {
  // Array of icons with their positions and animations
  const icons = [
    {
      icon: <BrainCircuit size={32} />,
      initialX: "10%",
      initialY: "20%",
      animateX: ["10%", "15%", "10%"],
      animateY: ["20%", "15%", "20%"],
      duration: 15,
      delay: 0,
      color: "text-indigo-400"
    },
    {
      icon: <Mic size={24} />,
      initialX: "85%",
      initialY: "30%",
      animateX: ["85%", "80%", "85%"],
      animateY: ["30%", "25%", "30%"],
      duration: 12,
      delay: 1,
      color: "text-purple-400"
    },
    {
      icon: <FileText size={28} />,
      initialX: "75%",
      initialY: "70%",
      animateX: ["75%", "70%", "75%"],
      animateY: ["70%", "75%", "70%"],
      duration: 18,
      delay: 2,
      color: "text-pink-400"
    },
    {
      icon: <MessageSquare size={22} />,
      initialX: "20%",
      initialY: "75%",
      animateX: ["20%", "25%", "20%"],
      animateY: ["75%", "80%", "75%"],
      duration: 14,
      delay: 3,
      color: "text-indigo-300"
    },
    {
      icon: <PieChart size={26} />,
      initialX: "35%",
      initialY: "15%",
      animateX: ["35%", "40%", "35%"],
      animateY: ["15%", "10%", "15%"],
      duration: 16,
      delay: 1.5,
      color: "text-purple-300"
    },
    {
      icon: <ArrowUpRight size={20} />,
      initialX: "60%",
      initialY: "20%",
      animateX: ["60%", "65%", "60%"],
      animateY: ["20%", "15%", "20%"],
      duration: 13,
      delay: 2.5,
      color: "text-pink-300"
    },
    {
      icon: <RefreshCw size={24} />,
      initialX: "15%",
      initialY: "50%",
      animateX: ["15%", "10%", "15%"],
      animateY: ["50%", "55%", "50%"],
      duration: 17,
      delay: 0.5,
      color: "text-indigo-300"
    },
    {
      icon: <Clock size={22} />,
      initialX: "80%",
      initialY: "50%",
      animateX: ["80%", "85%", "80%"],
      animateY: ["50%", "45%", "50%"],
      duration: 15,
      delay: 3.5,
      color: "text-purple-300"
    }
  ];

  return (
    <div className={className}>
      {icons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.color} opacity-40 filter blur-[0.5px]`}
          style={{
            left: item.initialX,
            top: item.initialY,
          }}
          animate={{
            x: item.animateX,
            y: item.animateY,
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  );
}
