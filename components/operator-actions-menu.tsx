'use client';

import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {LucideIcon, MoreVertical} from 'lucide-react';
import {cn} from '@/lib/utils';

export interface OperatorAction {
    label: string;
    icon: LucideIcon;
    onSelect?: () => void;
    href?: string;
    disabled?: boolean;
    className?: string;
}

export interface OperatorActionsMenuProps {
    actions: OperatorAction[];
    triggerLabel?: string;
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'right' | 'bottom' | 'left';
    className?: string;
}

export function OperatorActionsMenu({
    actions,
    triggerLabel = 'Open actions menu',
    align = 'end',
    side = 'bottom',
    className,
}: OperatorActionsMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label={triggerLabel}
                    className={cn('h-8 w-8 text-muted-foreground hover:text-foreground', className)}
                >
                    <MoreVertical className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={align} side={side} className="w-44">
                {actions.map((action) => {
                    if (action.href) {
                        return (
                            <DropdownMenuItem
                                asChild
                                key={action.label}
                                disabled={action.disabled}
                                className="cursor-pointer"
                            >
                                <Link
                                    href={action.href}
                                    onClick={action.onSelect}
                                    className={cn('flex items-center gap-2', action.className)}
                                >
                                    <action.icon className="h-4 w-4 text-muted-foreground"/>
                                    <span>{action.label}</span>
                                </Link>
                            </DropdownMenuItem>
                        );
                    }

                    return (
                        <DropdownMenuItem
                            key={action.label}
                            disabled={action.disabled}
                            onSelect={(event) => {
                                event.preventDefault();
                                action.onSelect?.();
                            }}
                            className={cn('flex items-center gap-2', action.className)}
                        >
                            <action.icon className="h-4 w-4 text-muted-foreground"/>
                            <span>{action.label}</span>
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}



