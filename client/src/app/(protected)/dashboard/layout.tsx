"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { UserButton } from "@/components/user-button";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  FolderOpen, 
  Search,
  Bell,
  Menu,
  X,
  BookOpen,
  Compass,
  Users,
  BarChart3,
  Cloud,
  LogOut,
  Upload,
  BotMessageSquare,
  MessagesSquare,
  MessageCircleCode
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { DecorativeSVG, GridPattern } from "@/components/ui/decorative-svg";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  // Check if we're on mobile when the component mounts and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col md:flex-row bg-gradient-to-br from-background to-background/90 overflow-hidden">
      {/* Enhanced decorative background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <GridPattern className="absolute inset-0 opacity-[0.015] text-foreground w-full h-full" />
        <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[100px]" />
        <motion.div 
          className="absolute top-20 right-20"
          animate={{ 
            rotate: [0, 5, 0, -5, 0],
            scale: [1, 1.05, 1, 0.95, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        >
          <DecorativeSVG className="text-primary/5 w-96 h-96" />
        </motion.div>
      </div>
      
      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black md:hidden z-20"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
      
      {/* Enhanced glassy sidebar */}
      <motion.aside 
        className={cn(
          "fixed md:relative top-0 left-0 z-30 w-[280px] h-screen",
          "bg-gradient-to-b from-background/60 to-background/30 backdrop-blur-2xl",
          "border-r border-border/30 shadow-xl md:shadow-none overflow-hidden",
          "flex flex-col md:flex-shrink-0 transition-transform duration-300 ease-in-out",
          "md:translate-x-0",
          isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"
        )}
        initial={false}
        animate={{ 
          x: isMobile && !isSidebarOpen ? -280 : 0,
          boxShadow: isMobile ? "10px 0 30px rgba(0, 0, 0, 0.1)" : "none" 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <Link href="/dashboard" className="flex items-center gap-2 group">
              <div className="relative">
                <Logo className="text-primary z-10 relative" size={32} />
                <motion.div 
                  className="absolute inset-0 bg-primary/30 rounded-full blur-xl -z-0"
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Noted.AI</span>
            </Link>
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
                <X size={20} />
              </Button>
            )}
          </div>
          
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-3 flex items-center">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input 
              placeholder="Search notes..."
              className="pl-9 bg-background/20 border-border/30 focus-visible:ring-primary/30 backdrop-blur-md"
            />
          </div>
          
          <nav className="space-y-1">
            <div className="text-xs uppercase text-muted-foreground tracking-wider pl-3 mb-2">Main</div>
            <NavItem 
              href="/dashboard" 
              icon={<LayoutDashboard size={18} />} 
              label="Dashboard" 
              active={pathname === "/dashboard"} 
            />
            <NavItem 
              href="/dashboard/notes" 
              icon={<FileText size={18} />} 
              label="My Notes" 
              active={pathname === "/dashboard/notes"} 
            />
            <NavItem 
              href="/dashboard/upload" 
              icon={<Upload size={18} />} 
              label="Upload" 
              active={pathname === "/dashboard/upload"} 
            />
            
            <div className="text-xs uppercase text-muted-foreground tracking-wider pl-3 mt-6 mb-2">Discover</div>
            <NavItem 
              href="/dashboard/meetings" 
              icon={<MessageCircleCode size={18} />} 
              label="Meetings" 
              active={pathname === "/dashboard/meetings"} 
            />
            <NavItem 
              href="/dashboard/live" 
              icon={<MessagesSquare size={18} />} 
              label="Live Meet" 
              active={pathname === "/dashboard/library"} 
            />
            <NavItem 
              href="/dashboard/chatbot" 
              icon={<BotMessageSquare size={18} />} 
              label="ChatBot" 
              active={pathname === "/dashboard/chatbot"} 
            />
            
            <div className="text-xs uppercase text-muted-foreground tracking-wider pl-3 mt-6 mb-2">Settings</div>
            <NavItem 
              href="/dashboard/analytics" 
              icon={<BarChart3 size={18} />} 
              label="Analytics" 
              active={pathname === "/dashboard/analytics"} 
            />
            <NavItem 
              href="/dashboard/settings" 
              icon={<Settings size={18} />} 
              label="Settings" 
              active={pathname === "/dashboard/settings"} 
            />
          </nav>

          <div className="mt-auto pt-6 border-t border-border/30">
            {/* Add Logout Button here, before the Pro Features card */}
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm w-full text-left mb-4 text-muted-foreground hover:text-foreground group transition-colors duration-200"
            >
              <span className="flex items-center justify-center">
                <LogOut size={18} />
              </span>
              <span>Logout</span>
              <div className="absolute inset-0 rounded-md opacity-0 transition-opacity bg-background/30 backdrop-blur-sm group-hover:opacity-100 z-[-1]" />
            </button>
            
            
          </div>
        </div>
      </motion.aside>

      {/* Main Content with enhanced glassmorphism */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Glassy header */}
        <header className="h-16 border-b border-border/30 bg-background/40 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar} 
                className="md:hidden"
              >
                <Menu size={20} />
              </Button>
            )}
            
            <div className="relative w-full max-w-md hidden md:flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search notes..." 
                className="bg-background/20 border-border/30 pl-9 w-full focus-visible:ring-1 focus-visible:ring-primary/30 backdrop-blur-xl"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative group">
              <Bell size={20} className="text-muted-foreground" />
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <div className="absolute inset-0 rounded-md opacity-0 transition-opacity bg-primary/10 group-hover:opacity-100" />
            </Button>
            <ThemeToggle />
            <div className="relative cursor-pointer transition-transform hover:scale-105 group">
              <UserButton />
              <div className="absolute inset-0 rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/20 blur-md"></div>
            </div>
          </div>
        </header>

        {/* Content area with fixed height to prevent scrolling */}
        <div className="flex-1 overflow-hidden">
          <motion.div 
            className="h-full p-4 md:p-6 overflow-auto"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ href, icon, label, active }: NavItemProps) {
  return (
    <Link href={href} className="relative block group">
      <div className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200",
        active 
          ? "text-primary font-medium" 
          : "text-muted-foreground hover:text-foreground"
      )}>
        <span className="flex items-center justify-center">{icon}</span>
        <span>{label}</span>
      </div>
      {active && (
        <motion.div 
          layoutId="active-nav"
          className="absolute inset-0 bg-primary/10 border-l-2 border-primary rounded-md z-[-1] backdrop-blur-sm"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      {!active && (
        <div className="absolute inset-0 rounded-md opacity-0 transition-opacity bg-background/30 backdrop-blur-sm group-hover:opacity-100 z-[-1]" />
      )}
    </Link>
  );
}
