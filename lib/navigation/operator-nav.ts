import {
  LayoutDashboard,
  Trophy,
  Activity,
  ShieldCheck,
  AlertTriangle,
  Key,
  FileText,
  Settings,
  Dices,
  Ticket,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  href: string;
  title: string;
  icon: LucideIcon;
}

export const operatorNavItems: NavItem[] = [
  { href: '/operator/dashboard', title: 'Dashboard', icon: LayoutDashboard },
    { href: '/operator/competitions', title: 'Competitions', icon: Trophy },
    { href: '/operator/complaints', title: 'Consumer Complaints', icon: AlertTriangle },
    { href: '/operator/draws', title: 'Draws & Winners', icon: Dices },
    { href: '/operator/entries', title: 'Entries', icon: Ticket },
    { href: '/operator/events', title: 'Event Chain', icon: Activity },
  { href: '/operator/api-keys', title: 'API Keys', icon: Key },
  { href: '/operator/details', title: 'Settings', icon: Settings },
  { href: '/docs', title: 'Documentation', icon: FileText },
];

