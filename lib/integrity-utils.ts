/**
 * Utility functions for integrity display and competition metrics
 */

import { CheckCircle, AlertTriangle, Circle, RefreshCw } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface CompetitionIntegrityStatus {
  icon: LucideIcon;
  color: string;
  bgColor: string;
  label: string;
}

/**
 * Get integrity icon and color based on competition status
 * - ✓ (green CheckCircle) if status === 'completed' with draw_audits_count > 0
 * - ! (yellow AlertTriangle) if status === 'awaiting_draw'
 * - - (grey Circle) if status === 'active'
 */
export function getIntegrityStatus(competition: {
  status: string;
  draw_audits_count?: number;
}): CompetitionIntegrityStatus {
  if (competition.status === 'completed' && (competition.draw_audits_count ?? 0) > 0) {
    return {
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      label: 'Verified',
    };
  }

  if (competition.status === 'awaiting_draw') {
    return {
      icon: AlertTriangle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      label: 'Pending Draw',
    };
  }

  // Active or other statuses
  return {
    icon: Circle,
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10',
    label: 'Active',
  };
}

/**
 * Format free vs paid entries
 * Returns "X free / Y paid" format
 */
export function formatFreeVsPaid(
  freeCount: number = 0,
  totalCount: number = 0
): string {
  const paidCount = Math.max(0, totalCount - freeCount);
  
  if (totalCount === 0) {
    return '0 free / 0 paid';
  }
  
  return `${freeCount.toLocaleString()} free / ${paidCount.toLocaleString()} paid`;
}

/**
 * Get chain integrity status display information
 */
export interface ChainIntegrityData {
  chain_status: 'valid' | 'invalid';
  unchained_events?: number;
  verified_events?: number;
  total_events?: number;
}

export interface ChainIntegrityDisplay {
  icon: LucideIcon;
  color: string;
  bgColor: string;
  label: string;
  description: string;
  actionable?: boolean;
}

export function getChainIntegrityDisplay(
  chainData?: ChainIntegrityData
): ChainIntegrityDisplay {
  // If no chain data at all
  if (!chainData) {
    return {
      icon: Circle,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      label: 'Not verified',
      description: 'Chain verification has not been run yet',
      actionable: true,
    };
  }

  // If verification failed
  if (chainData.chain_status === 'invalid') {
    return {
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      label: 'Issue detected',
      description: 'Chain integrity check found inconsistencies',
      actionable: true,
    };
  }

  // If partial verification (some events not verified)
  if ((chainData.unchained_events ?? 0) > 0 || 
      (chainData.verified_events ?? 0) < (chainData.total_events ?? 0)) {
    return {
      icon: RefreshCw,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      label: 'Verifying',
      description: 'Full chain verification is pending',
      actionable: true,
    };
  }

  // If fully verified
  return {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    label: 'Verified',
    description: 'All events verified successfully',
    actionable: false,
  };
}

/**
 * Format compliance score for display
 */
export function formatComplianceScore(score: number, isFinal: boolean): string {
  if (typeof score !== 'number') {
    return 'N/A';
  }

  const suffix = isFinal ? '' : ' (Est.)';
  return `${score}%${suffix}`;
}

/**
 * Get compliance grade variant for badge display
 */
export function getComplianceGradeVariant(score: number, isFinal: boolean): 'default' | 'secondary' | 'destructive' | 'outline' {
  if (!isFinal) return 'outline';
  
  if (score >= 90) return 'default';
  if (score >= 70) return 'secondary';
  return 'destructive';
}

/**
 * Get compliance color class
 */
export function getComplianceColor(score: number, isFinal: boolean): string {
  if (!isFinal) return 'text-muted-foreground';
  
  if (score >= 90) return 'text-green-600';
  if (score >= 70) return 'text-yellow-600';
  return 'text-red-600';
}

/**
 * Get compliance icon
 */
export function getComplianceIcon(score: number, isFinal: boolean): LucideIcon {
  if (!isFinal) return RefreshCw;
  
  if (score >= 90) return CheckCircle;
  if (score >= 70) return AlertTriangle;
  return Circle;
}

/**
 * Get system status based on chain integrity
 */
export function getSystemStatus(chainIntegrity?: ChainIntegrityData): {
  status: 'operational' | 'degraded' | 'unknown';
  color: string;
  label: string;
} {
  if (!chainIntegrity) {
    return {
      status: 'unknown',
      color: 'gray',
      label: 'Unknown',
    };
  }

  if (chainIntegrity.chain_status === 'invalid') {
    return {
      status: 'degraded',
      color: 'yellow',
      label: 'Degraded',
    };
  }

  return {
    status: 'operational',
    color: 'green',
    label: 'Operational',
  };
}


