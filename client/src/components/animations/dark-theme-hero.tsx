"use client";

import { motion } from "framer-motion";

interface DarkThemeHeroProps {
  className?: string;
}

export default function DarkThemeHero({ className }: DarkThemeHeroProps) {
  return (
    <div className={className}>
      <motion.svg
        viewBox="0 0 500 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate="visible"
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Laptop screen */}
        <motion.rect
          x="100"
          y="50"
          width="300"
          height="200"
          rx="10"
          fill="#18181b"
          stroke="#333"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Screen content */}
        <motion.rect
          x="120"
          y="70"
          width="260"
          height="160"
          rx="5"
          fill="#27272a"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />

        {/* Laptop base */}
        <motion.path
          d="M90 250 L100 250 L100 251 L400 251 L400 250 L410 250 L390 280 L110 280 Z"
          fill="#27272a"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />

        {/* Audio waves for meeting recording visualization */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
          {[...Array(8)].map((_, i) => (
            <motion.rect
              key={i}
              x={140 + i * 15}
              y={90}
              width="8"
              height="30"
              rx="4"
              fill="url(#gradient1)"
              initial={{ height: 10, y: 100 }}
              animate={{ 
                height: [10, 30 + Math.random() * 30, 10],
                y: [100, 90 - Math.random() * 15, 100] 
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
                repeatType: "reverse"
              }}
            />
          ))}
        </motion.g>

        {/* AI processing visualization */}
        <motion.circle
          cx="310"
          cy="110"
          r="30"
          fill="url(#gradient2)"
          opacity="0.7"
          filter="url(#glow)"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.1, 0.8],
            opacity: [0.5, 0.8, 0.5] 
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Connector lines from audio to AI */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.7, duration: 0.8 }}>
          {[...Array(5)].map((_, i) => {
            const startX = 200 + i * 10;
            return (
              <motion.path
                key={i}
                d={`M${startX} 100 Q${250 + i * 5} ${90 + i * 5} 280 110`}
                stroke="url(#gradient1)"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  delay: 0.8 + i * 0.1,
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  repeatDelay: 2
                }}
              />
            );
          })}
        </motion.g>

        {/* Document summary output */}
        <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.5 }}>
          <motion.rect
            x="140"
            y="160"
            width="220"
            height="50"
            rx="5"
            fill="#3f3f46"
            initial={{ width: 0 }}
            animate={{ width: 220 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          />
          
          {/* Document lines */}
          {[...Array(3)].map((_, i) => (
            <motion.line
              key={i}
              x1="150"
              y1={172 + i * 12}
              x2={340 - i * 20}
              y2={172 + i * 12}
              stroke="#6366f1"
              strokeWidth="2"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 190 - i * 20, opacity: 1 }}
              transition={{ delay: 1.5 + i * 0.2, duration: 0.3 }}
            />
          ))}
        </motion.g>

        {/* Floating particles around the AI element */}
        <motion.g>
          {[...Array(12)].map((_, i) => {
            const x = 310 + 50 * Math.cos(i * Math.PI / 6);
            const y = 110 + 50 * Math.sin(i * Math.PI / 6);
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r={1 + Math.random() * 2}
                fill={i % 2 === 0 ? "#6366f1" : "#ec4899"}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  x: [0, (Math.random() - 0.5) * 20, 0],
                  y: [0, (Math.random() - 0.5) * 20, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            );
          })}
        </motion.g>

        {/* Notification indicators */}
        <motion.circle
          cx="350"
          cy="90"
          r="6"
          fill="#22c55e"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: [0, 1.2, 1] }}
          transition={{ delay: 2, duration: 0.5 }}
        />

        {/* Bottom illustration */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.5 }}>
          <motion.ellipse
            cx="250"
            cy="340"
            rx="100"
            ry="15"
            fill="#27272a"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          />

          <motion.g initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.7, duration: 0.5 }}>
            {/* Person 1 */}
            <motion.circle
              cx="200"
              cy="320"
              r="15"
              fill="#6366f1"
            />
            <motion.rect
              x="195"
              y="340"
              width="10"
              height="20"
              rx="5"
              fill="#6366f1"
            />

            {/* Person 2 */}
            <motion.circle
              cx="250"
              cy="320"
              r="15"
              fill="#a855f7"
            />
            <motion.rect
              x="245"
              y="340"
              width="10"
              height="20"
              rx="5"
              fill="#a855f7"
            />

            {/* Person 3 */}
            <motion.circle
              cx="300"
              cy="320"
              r="15"
              fill="#ec4899"
            />
            <motion.rect
              x="295"
              y="340"
              width="10"
              height="20"
              rx="5"
              fill="#ec4899"
            />
          </motion.g>

          {/* Conversation bubbles */}
          <motion.g>
            <motion.ellipse
              cx="180"
              cy="290"
              rx="20"
              ry="10"
              fill="#3f3f46"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.9, duration: 0.3 }}
            />
            <motion.ellipse
              cx="240"
              cy="280"
              rx="25"
              ry="12"
              fill="#3f3f46"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.1, duration: 0.3 }}
            />
            <motion.ellipse
              cx="310"
              cy="290"
              rx="20"
              ry="10"
              fill="#3f3f46"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.3, duration: 0.3 }}
            />
          </motion.g>
        </motion.g>
      </motion.svg>
    </div>
  );
}
