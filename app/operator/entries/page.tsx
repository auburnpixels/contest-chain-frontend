'use client';

import { DashboardShell } from '@/components/dashboard-shell';
import { DashboardHeader } from "@/components/dashboard-header";
import { useOperatorAuth } from '@/hooks/useOperatorAuth';
import { operatorNavItems } from '@/lib/navigation/operator-nav';
import { DashboardLoading } from '@/components/dashboard-loading';
import { AsyncMetricCard } from '@/components/async-metric-card';
import { CheckCircle2, XCircle, Ticket as TicketIcon } from 'lucide-react';
import { operatorApi } from '@/lib/api/client';
import { EntriesWidget } from '@/components/entries-widget';

export default function EntriesPage() {
  const { isReady, handleLogout, operatorName } = useOperatorAuth();

  if (!isReady) {
    return <DashboardLoading message="Loading entries..." />;
  }

  return (
    <DashboardShell
      navItems={operatorNavItems}
      userRole="operator"
      userName={operatorName ?? undefined}
      onLogout={handleLogout}
    >
      <div className="space-y-8">

        <DashboardHeader title="Entries" />

        {/* Metrics Cards - 3 cards */}
        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 xl:grid-cols-3">
          <AsyncMetricCard
            title="Total entries"
            fetchData={operatorApi.getMetrics.entries}
            icon={TicketIcon}
            renderValue={(data) => {
              const total = data.metadata?.total_entries || 0;
              return total.toLocaleString();
            }}
            renderFooter={() => "All competitions"}
          />

          <AsyncMetricCard
            title="Entry eligibility"
            fetchData={operatorApi.getMetrics.entries}
            icon={CheckCircle2}
            renderValue={(data) => {
              const pct = data.metadata?.entry_eligibility_percentage;
              return pct ? `${Math.round(pct)}%` : 'N/A';
            }}
            renderFooter={(data) => `${Number(data.metadata?.valid_entries || 0).toLocaleString()} valid entries`}
          />

          <AsyncMetricCard
            title="Voided entries"
            fetchData={operatorApi.getMetrics.entries}
            icon={XCircle}
            renderValue={(data) => data.metadata?.voided_entries || 0}
            renderFooter={() => "Deleted or invalid"}
          />
        </div>

        <div className="px-4 lg:px-6">
          <EntriesWidget 
            syncUrlParams={true}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </DashboardShell>
  );
}
