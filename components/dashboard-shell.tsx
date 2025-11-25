'use client';

import { useState } from 'react';
import { DashboardSidebar } from './dashboard-sidebar';
import { Button } from './ui/button';
import { Menu, X, LayoutDashboard, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardShellProps {
  children: React.ReactNode;
  navItems: any[];
  userRole: 'operator' | 'regulator';
  userName?: string;
  onLogout: () => void;
}

export function DashboardShell({ children, navItems, userRole, userName, onLogout }: DashboardShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <DashboardSidebar 
        items={navItems} 
        userRole={userRole} 
        userName={userName}
        onLogout={onLogout}
        className="hidden md:flex w-64 fixed inset-y-0 z-50"
      />

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
         <div className="flex items-center gap-2">
            <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.5)]", 
              "bg-blue-600"
            )}>
              {userRole === 'operator' ? <LayoutDashboard className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
            </div>
            <span className="font-bold text-white">CaaS</span>
         </div>
         <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white hover:bg-zinc-800">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
         </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-background animate-in slide-in-from-left-10 duration-200">
           <div className="pt-16 h-full">
             <DashboardSidebar 
                items={navItems} 
                userRole={userRole} 
                userName={userName}
                onLogout={onLogout}
                className="w-full border-none"
              />
           </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:pl-64 pt-16 md:pt-0 transition-all duration-200 ease-in-out">
          <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 md:gap-6">
                  {children}
              </div>
          </div>
      </main>
    </div>
  );
}

