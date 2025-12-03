import {
  Home,
  Building2,
  Activity,
  AlertTriangle,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  href: string;
  title: string;
  icon: LucideIcon;
}

export const regulatorNavItems: NavItem[] = [
  { href: '/regulator/dashboard', title: 'Dashboard', icon: Home },
  { href: '/regulator/operators', title: 'Operators', icon: Building2 },
  { href: '/audits', title: 'Audits', icon: FileText },
  { href: '/regulator/events', title: 'Events', icon: Activity },
  { href: '/regulator/complaints', title: 'Complaints', icon: AlertTriangle },
  { href: '/regulator/compliance', title: 'Compliance', icon: ShieldCheck },
];

