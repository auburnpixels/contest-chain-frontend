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
    <div className={cn("pb-12 min-h-screen flex flex-col bg-card border-r", className)}>
      <div className="">
        <div className="">
          <div className="flex items-center p-4 h-12 border-b">
            <h2>
              Veristiq
            </h2>
          </div>
          
          <div className="space-y-1 p-2">
            {items.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 mb-1 transition-all duration-200 font-normal",
                    pathname === item.href 
                      ? "font-medium bg-accent"
                      : ""
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
            <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium truncate">{userName || 'User'}</span>
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

