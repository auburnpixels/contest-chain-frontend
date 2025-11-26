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
  { href: '/operator/events', title: 'Events', icon: Activity },
  { href: '/operator/draws', title: 'Draws', icon: Dices },
  { href: '/operator/compliance', title: 'Compliance', icon: ShieldCheck },
  { href: '/operator/complaints', title: 'Complaints', icon: AlertTriangle },
  { href: '/operator/api-keys', title: 'API Keys', icon: Key },
  { href: '/operator/details', title: 'Settings', icon: Settings },
  { href: '/docs', title: 'Documentation', icon: FileText },
];

