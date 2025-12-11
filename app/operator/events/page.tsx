'use client';

import { DashboardShell } from '@/components/dashboard-shell';
import { DashboardHeader } from "@/components/dashboard-header";
import { useOperatorAuth } from '@/hooks/useOperatorAuth';
import { operatorNavItems } from '@/lib/navigation/operator-nav';
import { DashboardLoading } from '@/components/dashboard-loading';
import { DrawEventsWidget } from '@/components/draw-events-widget';
import { AsyncMetricCard } from '@/components/async-metric-card';
import { Activity } from 'lucide-react';
import { operatorApi } from '@/lib/api/client';

export default function EventsPage() {
  const { isReady, handleLogout, operatorName } = useOperatorAuth();
  
  if (!isReady) {
    return <DashboardLoading message="Loading events..." />;
  }

  return (
    <DashboardShell
      navItems={operatorNavItems}
      userRole="operator"
      userName={operatorName ?? undefined}
      onLogout={handleLogout}
    >
      <div className="space-y-6">
        <DashboardHeader title="Events" />

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2">
          <AsyncMetricCard
            title="Total events"
            fetchData={operatorApi.getMetrics.events}
            icon={Activity}
            renderValue={(data) => (data.metadata?.total_events || 0).toLocaleString()}
            renderFooter={() => "All time"}
          />

          <AsyncMetricCard
            title="Chain integrity status"
            fetchData={operatorApi.getMetrics.eventsChainIntegrity}
            useIndicatorBadge={true}
            helpText="Verifies that your competition's event records are securely chained and tamper-proof, ensuring your audit trail stays trustworthy."
            renderValue={(data) => {
              const chainStatus = data.metadata?.chain_status;
              if (chainStatus === 'valid') return 'Verified';
              if (chainStatus === 'invalid') return 'Invalid';
              if (chainStatus === 'building') return 'Building...';
              return 'Verifying...';
            }}
            renderFooter={(data) => {
              const verified = data.metadata?.verified_events || 0;
              const total = Number(data.metadata?.total_events || 0).toLocaleString();
              return `${verified} of ${total} events verified`;
            }}
          />
        </div>

        <div className="px-4 lg:px-6">
          <DrawEventsWidget 
            syncUrlParams={true}
            showActions={false}
            showTitle={false}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </DashboardShell>
  );
}
