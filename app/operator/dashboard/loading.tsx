'use client';

import { DashboardShell } from '@/components/dashboard-shell';
import { operatorNavItems } from '@/lib/navigation/operator-nav';

export default function DashboardLoading() {
  return (
    <DashboardShell 
      navItems={operatorNavItems} 
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

