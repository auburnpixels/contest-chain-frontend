import { ComplianceAlert } from '@/components/compliance/compliance-alerts';

export interface RaffleDetail {
  id: string;
  raffle_id: string;
  raffle_id_short: string;
  external_id: string;
  name: string;
  status: string;
  total_entries: number;
  entries_count: number;
  postal_entries: number;
  free_entries_count: number;
  free_entry_percentage: number;
  has_audit: boolean;
  audit_count: number;
  draw_audits_count: number;
  active_complaints: number;
  active_complaints_count: number;
  complaints_count: number;
  compliance_score: number;
  compliance_status?: string;
  compliance_percentage?: number;
  is_draw_overdue?: boolean;
  draw_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ComplianceSummary {
  raffles_hosted: number;
  with_free_entry_route: number;
  with_free_entry_percentage: number;
  with_audit_logs: number;
  with_audit_logs_percentage: number;
  active_complaints: number;
  postal_entries_received: number;
  avg_postal_per_raffle: number;
}

/**
 * Calculate overall compliance score across all competitions
 */
export function calculateOverallScore(raffles: RaffleDetail[]): number {
  if (raffles.length === 0) return 100;

  const totalScore = raffles.reduce((sum, raffle) => sum + raffle.compliance_score, 0);
  return Math.round(totalScore / raffles.length);
}

/**
 * Format compliance status based on score
 */
export function formatComplianceStatus(score: number): {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  color: 'good' | 'warning' | 'critical';
} {
  if (score >= 95) {
    return { label: 'Excellent', variant: 'default', color: 'good' };
  }
  if (score >= 80) {
    return { label: 'Good', variant: 'secondary', color: 'warning' };
  }
  return { label: 'Needs Improvement', variant: 'destructive', color: 'critical' };
}

/**
 * Identify critical compliance issues that require immediate attention
 */
export function identifyCriticalIssues(raffles: RaffleDetail[]): ComplianceAlert[] {
  const alerts: ComplianceAlert[] = [];

  // Count overdue complaints
  const totalActiveComplaints = raffles.reduce((sum, raffle) => sum + (raffle.active_complaints_count || raffle.active_complaints || 0), 0);
  if (totalActiveComplaints > 0) {
    alerts.push({
      type: 'complaint',
      message: `${totalActiveComplaints} complaint${totalActiveComplaints > 1 ? 's' : ''} require${totalActiveComplaints === 1 ? 's' : ''} attention`,
      link: '/operator/complaints',
    });
  }

  // Find completed competitions without audits
  const completedWithoutAudits = raffles.filter(
    (raffle) =>
      (raffle.status === 'completed' || raffle.status === 'drawn' || raffle.status === 'ended') &&
      !raffle.has_audit
  );

  completedWithoutAudits.forEach((raffle) => {
    alerts.push({
      type: 'audit',
      message: `Audit incomplete for "${raffle.name}"`,
      link: `/operator/competitions/${raffle.raffle_id}`,
      competitionId: raffle.raffle_id,
    });
  });

  // Find competitions with very low compliance scores
  const lowComplianceCompetitions = raffles.filter((raffle) => raffle.compliance_score < 50);
  lowComplianceCompetitions.forEach((raffle) => {
    alerts.push({
      type: 'draw',
      message: `Low compliance score (${raffle.compliance_score}%) for "${raffle.name}"`,
      link: `/operator/competitions/${raffle.raffle_id}`,
      competitionId: raffle.raffle_id,
    });
  });

  return alerts;
}

/**
 * Calculate draw integrity metrics
 */
export function calculateDrawIntegrity(raffles: RaffleDetail[]): {
  audited: number;
  total: number;
  percentage: number;
} {
  const audited = raffles.filter((raffle) => raffle.has_audit).length;
  const total = raffles.length;
  const percentage = total > 0 ? Math.round((audited / total) * 100) : 0;

  return { audited, total, percentage };
}

/**
 * Calculate postal fairness ratio across all competitions
 */
export function calculatePostalFairnessRatio(raffles: RaffleDetail[]): number {
  const totalEntries = raffles.reduce((sum, raffle) => sum + raffle.total_entries, 0);
  const totalPostalEntries = raffles.reduce((sum, raffle) => sum + raffle.postal_entries, 0);

  if (totalEntries === 0) return 0;
  return Math.round((totalPostalEntries / totalEntries) * 100 * 100) / 100; // Round to 2 decimals
}

/**
 * Prepare compliance report data for export
 */
export function generateComplianceReportData(
  operator: { name: string; id: string },
  summary: ComplianceSummary,
  raffles: RaffleDetail[],
  chainIntegrity: { verified: boolean; percentage: number },
  criticalIssues: ComplianceAlert[]
) {
  const overallScore = calculateOverallScore(raffles);
  const status = formatComplianceStatus(overallScore);
  const drawIntegrity = calculateDrawIntegrity(raffles);
  const postalRatio = calculatePostalFairnessRatio(raffles);

  return {
    report_metadata: {
      generated_at: new Date().toISOString(),
      operator_name: operator.name,
      operator_id: operator.id,
      report_type: 'Compliance Summary Report',
    },
    compliance_overview: {
      overall_score: overallScore,
      status: status.label,
      chain_integrity_verified: chainIntegrity.verified,
      chain_integrity_percentage: chainIntegrity.percentage,
      draw_integrity: {
        audited_competitions: drawIntegrity.audited,
        total_competitions: drawIntegrity.total,
        percentage: drawIntegrity.percentage,
      },
      postal_fairness_ratio: postalRatio,
    },
    summary_statistics: {
      total_competitions: summary.raffles_hosted,
      competitions_with_free_entry: summary.with_free_entry_route,
      competitions_with_audits: summary.with_audit_logs,
      active_complaints: summary.active_complaints,
      total_postal_entries: summary.postal_entries_received,
      avg_postal_per_competition: summary.avg_postal_per_raffle,
    },
    critical_issues: criticalIssues.map((issue) => ({
      type: issue.type,
      message: issue.message,
      competition_id: issue.competitionId,
    })),
    competition_details: raffles.map((raffle) => ({
      id: raffle.raffle_id,
      external_id: raffle.external_id,
      name: raffle.name,
      status: raffle.status,
      compliance_score: raffle.compliance_score,
      total_entries: raffle.total_entries,
      postal_entries: raffle.postal_entries,
      free_entry_percentage: raffle.free_entry_percentage,
      has_audit: raffle.has_audit,
      audit_count: raffle.audit_count,
      active_complaints: raffle.active_complaints,
    })),
  };
}

/**
 * Get mock industry benchmarks (placeholder for future backend implementation)
 */
export function getMockIndustryBenchmarks(operatorScore: number, operatorPostalRatio: number) {
  return {
    avgCompliance: 63,
    avgPostal: 48,
    avgResponseTime: 24,
    operatorRanking: operatorScore >= 80 ? 'Top 10%' : operatorScore >= 65 ? 'Top 25%' : 'Top 50%',
  };
}

/**
 * Format response time for display
 */
export function formatResponseTime(minutes: number): string {
  if (minutes === 0) return 'N/A';
  if (minutes < 60) return `${Math.round(minutes)} min`;
  
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

/**
 * Calculate operator ranking based on score vs industry average
 */
export function calculateRanking(operatorScore: number, industryAvg: number): string {
  if (!industryAvg) return 'Calculating...';
  
  const diff = operatorScore - industryAvg;
  
  if (diff >= 20) return 'Top 5%';
  if (diff >= 10) return 'Top 10%';
  if (diff >= 0) return 'Top 25%';
  if (diff >= -10) return 'Top 50%';
  return 'Below Average';
}
