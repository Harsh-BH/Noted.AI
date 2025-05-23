import React from "react";
import { Toaster } from "sonner";
import "../../../styles/auth.css";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="auth-container min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="animated-bg"></div>
      <div className="animated-grid"></div>
      
      {/* Particles */}
      <div className="particles-container">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>
      
      {/* Animated SVG Elements */}
      <div className="svg-container">
        {/* Notes */}
        <svg className="note-svg note-1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="30" x2="80" y2="30" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="70" x2="60" y2="70" stroke="currentColor" strokeWidth="2" />
        </svg>
        
        <svg className="note-svg note-2" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,10 L70,10 L90,30 L90,90 L10,90 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M70,10 L70,30 L90,30" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="60" x2="80" y2="60" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="80" x2="60" y2="80" stroke="currentColor" strokeWidth="2" />
        </svg>
        
        <svg className="note-svg note-3" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="80" height="80" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="25" y1="25" x2="75" y2="25" stroke="currentColor" strokeWidth="2" />
          <line x1="25" y1="45" x2="75" y2="45" stroke="currentColor" strokeWidth="2" />
          <line x1="25" y1="65" x2="55" y2="65" stroke="currentColor" strokeWidth="2" />
        </svg>
        
        {/* Folding Note with Animation */}
        <svg className="folding-note" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M90,10 L90,90 L10,90 L10,10 Z" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="20" y1="30" x2="80" y2="30" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="70" x2="60" y2="70" stroke="currentColor" strokeWidth="2" />
        </svg>
        
        {/* Pencil with writing animation */}
        <svg className="pencil-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,80 L70,30 L80,40 L30,90 Z" fill="#FFC107" stroke="currentColor" strokeWidth="2" />
          <path d="M70,30 L80,20 L90,30 L80,40 Z" fill="#FF5722" stroke="currentColor" strokeWidth="2" />
          <path d="M20,80 L30,90 L10,90 Z" fill="#795548" stroke="currentColor" strokeWidth="2" />
        </svg>
        
        {/* Ink dots */}
        <div className="ink-dot ink-1"></div>
        <div className="ink-dot ink-2"></div>
        <div className="ink-dot ink-3"></div>
        <div className="ink-dot ink-4"></div>
        <div className="ink-dot ink-5"></div>
        
        {/* Floating text */}
        <div className="floating-text text-1">AI</div>
        <div className="floating-text text-2">Note</div>
        <div className="floating-text text-3">📝</div>
        <div className="floating-text text-4">✨</div>
        <div className="floating-text text-5">💡</div>
        
        {/* Sparkles */}
        <svg className="sparkle sparkle-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14 9L22 12L14 15L12 24L10 15L2 12L10 9L12 0Z" fill="rgba(99, 102, 241, 0.7)" />
        </svg>
        <svg className="sparkle sparkle-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14 9L22 12L14 15L12 24L10 15L2 12L10 9L12 0Z" fill="rgba(99, 102, 241, 0.7)" />
        </svg>
        <svg className="sparkle sparkle-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14 9L22 12L14 15L12 24L10 15L2 12L10 9L12 0Z" fill="rgba(99, 102, 241, 0.7)" />
        </svg>
        <svg className="sparkle sparkle-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14 9L22 12L14 15L12 24L10 15L2 12L10 9L12 0Z" fill="rgba(99, 102, 241, 0.7)" />
        </svg>
        <svg className="sparkle sparkle-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14 9L22 12L14 15L12 24L10 15L2 12L10 9L12 0Z" fill="rgba(99, 102, 241, 0.7)" />
        </svg>
      </div>
      
      <div className="z-10 relative w-full max-w-md">
        {children}
      </div>
      
      <Toaster />
    </div>
  );
};

export default AuthLayout;
