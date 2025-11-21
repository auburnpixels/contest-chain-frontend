'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Shield, 
  User,
  LogOut
} from 'lucide-react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    href: string;
    title: string;
    icon: React.ElementType;
  }[];
  userRole: 'operator' | 'regulator';
  userName?: string;
  onLogout: () => void;
}

export function DashboardSidebar({ className, items, userRole, userName, onLogout }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12 min-h-screen bg-black border-r border-zinc-800 flex flex-col", className)}>
      <div className="">
        <div className="">
          <div className="flex items-center p-4 h-12 border-b">
            <h2 className=" text-white">
              CaaS Platform
            </h2>
          </div>
          
          <div className="space-y-1 p-2">
            {items.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 mb-1 transition-all duration-200 font-medium",
                    pathname === item.href 
                      ? "bg-blue-600/10 text-blue-500 hover:bg-blue-600/20 hover:text-blue-400"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", pathname === item.href ? "text-blue-500" : "text-zinc-400")} />
                  {item.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-auto p-4 border-t border-zinc-800 bg-zinc-900/20">
         <div className="flex items-center gap-3 mb-4 px-2">
            <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                <User className="h-4 w-4 text-zinc-400" />
            </div>
            <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium text-white truncate">{userName || 'User'}</span>
                <span className="text-xs text-zinc-500 capitalize">{userRole}</span>
            </div>
         </div>
         <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-zinc-400 hover:text-white hover:bg-zinc-800"
            onClick={onLogout}
        >
            <LogOut className="h-4 w-4" />
            Log out
         </Button>
      </div>
    </div>
  );
}

