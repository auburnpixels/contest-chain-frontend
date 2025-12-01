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
    <div className={cn("pb-12 min-h-screen flex flex-col bg-card border-r border-zinc-800", className)}>
      <div className="">
        <div className="">
          <div className="flex items-center p-4 h-12 border-b">
            <h2>
              Cafaas Platform
            </h2>
          </div>
          
          <div className="space-y-1 p-2">
            {items.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 mb-1 transition-all duration-200 font-normal hover:text-white hover:bg-white/5",
                    pathname === item.href 
                      ? "bg-brand-cobalt/10 text-brand-cobalt font-medium"
                      : "text-zinc-400"
                  )}
                >
                  <item.icon className={cn("h-4 w-4")} />
                  {item.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-auto p-4 border-t">
         <div className="flex items-center gap-3 mb-4 px-2">
            <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                <User className="h-4 w-4 text-zinc-400" />
            </div>
            <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium truncate">{userName || 'User'}</span>
                <span className="text-xs capitalize">{userRole}</span>
            </div>
         </div>
         <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 "
            onClick={onLogout}
        >
            <LogOut className="h-4 w-4" />
            Log out
         </Button>
      </div>
    </div>
  );
}

