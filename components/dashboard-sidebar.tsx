'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LogOut, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
    <div className={cn("min-h-screen flex flex-col bg-card border-r", className)}>
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
      
      <div className="mt-auto border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 w-full p-4 hover:bg-accent transition-colors text-left">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                {userName ? userName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{userName || 'User'}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" side="top">
            <DropdownMenuItem onSelect={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

