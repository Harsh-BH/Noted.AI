"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import with no SSR is allowed within a client component
const WaveAnimation = dynamic(() => import('@/components/chatbot/WaveAnimation'), { ssr: false });

interface ClientWaveAnimationProps {
  className?: string;
}

export default function ClientWaveAnimation({ className }: ClientWaveAnimationProps) {
  return <WaveAnimation className={className} />;
}
