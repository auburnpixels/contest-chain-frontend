'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {
    LayoutDashboard,
    Shield,
    User,
    LogOut, Activity
} from 'lucide-react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    title: string;
    tagline?: string;
}

export function DashboardHeader({children, title, tagline = '' }: SidebarProps) {

    return (
        <header className="bg-background sticky top-0 z-10 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
                <div className="flex flex-col">
                    <h1 className="text-base font-medium">{title}</h1>
                    {tagline && (
                        <p className="text-muted-foreground text-xs">{tagline}</p>
                    )}
                </div>

                {children && (
                    <div className="flex items-center gap-1">
                        {children}
                    </div>
                )}
            </div>
        </header>
    );
}

