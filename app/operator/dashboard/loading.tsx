'use client';

import { DashboardShell } from '@/components/dashboard-shell';
import { LayoutDashboard, Trophy, Key, FileText } from 'lucide-react';

export default function DashboardLoading() {
  // Skeleton nav items to match structure
  const navItems = [
    { href: '#', title: 'Dashboard', icon: LayoutDashboard },
    { href: '#', title: 'Competitions', icon: Trophy },
    { href: '#', title: 'API Keys', icon: Key },
    { href: '#', title: 'Documentation', icon: FileText },
  ];

  return (
    <DashboardShell 
      navItems={navItems} 
      userRole="operator" 
      userName="Loading..." 
      onLogout={() => {}}
    >
      <div className="space-y-8 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-slate-800 rounded-lg" />
          <div className="h-10 w-32 bg-slate-800 rounded-lg" />
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-slate-800/50 rounded-xl border border-slate-800 p-6 space-y-4">
               <div className="flex justify-between">
                 <div className="h-4 w-24 bg-slate-800 rounded" />
                 <div className="h-4 w-4 bg-slate-800 rounded" />
               </div>
               <div className="h-8 w-16 bg-slate-800 rounded" />
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
           <div className="col-span-4 h-96 bg-slate-800/50 rounded-xl border border-slate-800" />
           <div className="col-span-3 h-96 bg-slate-800/50 rounded-xl border border-slate-800" />
        </div>
      </div>
    </DashboardShell>
  );
}

