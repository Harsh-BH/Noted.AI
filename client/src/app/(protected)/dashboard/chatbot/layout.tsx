import React from 'react';
import ClientWaveAnimation from '@/components/chatbot/ClientWaveAnimation';

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="chatbot-layout h-full overflow-hidden flex flex-col relative">
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>
      {/* Using the client wrapper component instead of direct dynamic import */}
      <ClientWaveAnimation className="text-primary" />
    </div>
  );
}
