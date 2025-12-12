'use client';

import { Badge } from '@/components/ui/badge';
import { DashboardShell } from '@/components/dashboard-shell';
import { DashboardHeader } from "@/components/dashboard-header";
import { useOperatorAuth } from '@/hooks/useOperatorAuth';
import { operatorNavItems } from '@/lib/navigation/operator-nav';
import { DashboardLoading } from '@/components/dashboard-loading';
import { Trophy, ShieldCheck as ShieldCheckIcon, AlertTriangle } from 'lucide-react';
import { AsyncMetricCard } from '@/components/async-metric-card';
import { operatorApi } from '@/lib/api/client';
import { CompetitionsWidget } from '@/components/competitions-widget';

export default function CompetitionsPage() {
  const { isReady, handleLogout, operatorName } = useOperatorAuth();

  if (!isReady) {
    return <DashboardLoading message="Loading competitions..." />;
  }

  return (
    <DashboardShell
      navItems={operatorNavItems}
      userRole="operator"
      userName={operatorName ?? undefined}
      onLogout={handleLogout}
    >
      <div className="space-y-8">
        <DashboardHeader title="Competitions" />

        {/* Metrics Cards - 4 cards */}
        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 xl:grid-cols-4">
          <AsyncMetricCard
            title="Total competitions"
            fetchData={operatorApi.getMetrics.competitions}
            icon={Trophy}
            helpText="Total number of competitions you've created — including active, awaiting draw, and completed."
            renderValue={(data) => data.metadata?.total_competitions || 0}
            renderFooter={() => "All time"}
          />

          <AsyncMetricCard
            title="Active competitions"
            fetchData={operatorApi.getMetrics.competitions}
            icon={Trophy}
            helpText="Competitions that are open for entries. After you have closed them, they move to 'Awaiting Draw'."
            renderValue={(data) => data.metadata?.active_competitions || 0}
            renderFooter={() => "Currently running"}
          />

          <AsyncMetricCard
            title="Draw audits"
            fetchData={operatorApi.getMetrics.competitions}
            icon={ShieldCheckIcon}
            helpText="Shows how many completed competitions have verified draw audits. Every draw is recorded with a secure audit trail for complete transparency."
            renderValue={(data) => {
              const withAudits = data.metadata?.completed_competitions_with_draw_audits || 0;
              const total = data.metadata?.completed_competitions_with_entries || 0;
              return `${withAudits} of ${total}`;
            }}
            renderFooter={() => "Completed competitions with verified draws"}
          />

          <AsyncMetricCard
            title="Needs attention"
            fetchData={operatorApi.getMetrics.attention}
            icon={AlertTriangle}
            useIndicatorBadge={true}
            helpText="Competitions that need attention — overdue draws, open complaints, or missing data."
            renderValue={(data) => data.metadata?.competitions_needing_attention || 'None'}
            renderFooter={(data) => {
              const needingAttention = data.metadata?.competitions_needing_attention || 0;
              const totalIssues = data.metadata?.total_issues || 0;
              return needingAttention > 0 
                ? `${Number(totalIssues).toLocaleString()} issues to resolve`
                : 'All competitions healthy';
            }}
          />
        </div>

        <div className="px-4 lg:px-6">
          <CompetitionsWidget 
            showTitle={false}
            syncUrlParams={true}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </DashboardShell>
  );
}
