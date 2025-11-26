/**
 * Centralized badge variant utilities for consistent status coloring
 */

import type { BadgeProps } from '@/components/ui/badge';

type BadgeVariant = BadgeProps['variant'];

/**
 * Get badge variant for competition status
 */
export function getCompetitionStatusVariant(status: string): BadgeVariant {
  const variants: Record<string, BadgeVariant> = {
    active: 'default',
    pending: 'secondary',
    completed: 'outline',
    cancelled: 'destructive',
    draft: 'secondary',
  };
  return variants[status.toLowerCase()] || 'secondary';
}

/**
 * Get badge variant for complaint status
 */
export function getComplaintStatusVariant(status: string): BadgeVariant {
  const variants: Record<string, BadgeVariant> = {
    new: 'default',
    investigating: 'secondary',
    resolved: 'outline',
    dismissed: 'destructive',
    pending: 'secondary',
  };
  return variants[status.toLowerCase()] || 'outline';
}

/**
 * Get badge variant for compliance status
 */
export function getComplianceStatusVariant(status: string): BadgeVariant {
  const variants: Record<string, BadgeVariant> = {
    compliant: 'default',
    'non-compliant': 'destructive',
    warning: 'secondary',
    pending: 'secondary',
  };
  return variants[status.toLowerCase()] || 'secondary';
}

/**
 * Get badge variant for risk score
 * 
 * @param score - Risk score (0-100)
 * @returns Badge variant based on score thresholds
 */
export function getRiskScoreBadgeVariant(score: number): BadgeVariant {
  if (score >= 90) return 'default'; // Low risk
  if (score >= 70) return 'secondary'; // Medium risk
  return 'destructive'; // High risk
}

/**
 * Get badge variant for boolean status
 */
export function getBooleanBadgeVariant(
  value: boolean,
  trueLabel = 'Active',
  falseLabel = 'Inactive'
): { variant: BadgeVariant; label: string } {
  return value
    ? { variant: 'default', label: trueLabel }
    : { variant: 'secondary', label: falseLabel };
}

/**
 * Get badge variant for verification status
 */
export function getVerificationStatusVariant(verified: boolean): BadgeVariant {
  return verified ? 'default' : 'destructive';
}

/**
 * Get badge variant for payment status
 */
export function getPaymentStatusVariant(status: string): BadgeVariant {
  const variants: Record<string, BadgeVariant> = {
    paid: 'default',
    pending: 'secondary',
    failed: 'destructive',
    refunded: 'outline',
  };
  return variants[status.toLowerCase()] || 'secondary';
}
