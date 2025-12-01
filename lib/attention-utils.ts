import { isPast, differenceInDays } from 'date-fns';

export interface AttentionIssue {
  type: 'critical' | 'warning';
  message: string;
  action: string;
  link?: string;
}

export interface AttentionSummary {
  total_competitions: number;
  competitions_needing_attention: number;
  total_issues: number;
  critical_issues: number;
  warning_issues: number;
}

/**
 * Get attention items for a competition (frontend version)
 * This mirrors the backend logic for client-side display
 */
export function getCompetitionAttentionItems(competition: any): AttentionIssue[] {
  const items: AttentionIssue[] = [];

  // Critical: Draw overdue
  if (competition.status === 'awaiting_draw' && competition.draw_at) {
    const drawDate = new Date(competition.draw_at);
    if (isPast(drawDate)) {
      const daysLate = differenceInDays(new Date(), drawDate);
      items.push({
        type: 'critical',
        message: `Draw is ${daysLate} day${daysLate > 1 ? 's' : ''} overdue`,
        action: 'Run draw via API',
        link: '/docs/api/draws',
      });
    }
  }

  // Warning: Unresolved complaints
  if (competition.active_complaints_count && competition.active_complaints_count > 0) {
    items.push({
      type: 'warning',
      message: `${competition.active_complaints_count} unresolved complaint${competition.active_complaints_count > 1 ? 's' : ''}`,
      action: 'Respond to complaints',
      link: `/operator/complaints?competition_id=${competition.id}`,
    });
  }

  // Critical: Missing audit after completion
  if (competition.status === 'completed' && competition.draw_audits_count === 0) {
    items.push({
      type: 'critical',
      message: 'Draw completed but no audit recorded',
      action: 'Contact support - data integrity issue',
    });
  }

  // Warning: No entries before draw
  if (competition.status === 'awaiting_draw' && competition.entries_count === 0) {
    items.push({
      type: 'warning',
      message: 'Cannot draw with zero entries',
      action: 'Submit entries via API',
      link: '/docs/api/entries',
    });
  }

  return items;
}

export function hasCriticalAttention(competition: any): boolean {
  return getCompetitionAttentionItems(competition).some(item => item.type === 'critical');
}

export function hasWarningAttention(competition: any): boolean {
  return getCompetitionAttentionItems(competition).some(item => item.type === 'warning');
}

export function hasAnyAttention(competition: any): boolean {
  return getCompetitionAttentionItems(competition).length > 0;
}

export function getAttentionSummaryText(summary: AttentionSummary): string {
  if (summary.competitions_needing_attention === 0) {
    return `All ${summary.total_competitions} competitions healthy`;
  }
  
  const parts = [];
  if (summary.critical_issues > 0) {
    parts.push(`${summary.critical_issues} critical`);
  }
  if (summary.warning_issues > 0) {
    parts.push(`${summary.warning_issues} warning${summary.warning_issues > 1 ? 's' : ''}`);
  }
  
  return parts.join(', ');
}


