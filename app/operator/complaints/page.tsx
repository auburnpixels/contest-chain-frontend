'use client';

import { Badge } from '@/components/ui/badge';
import { DashboardShell } from '@/components/dashboard-shell';
import { DashboardHeader } from "@/components/dashboard-header";
import { useOperatorAuth } from '@/hooks/useOperatorAuth';
import { operatorNavItems } from '@/lib/navigation/operator-nav';
import { DashboardLoading } from '@/components/dashboard-loading';
import { MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import { AsyncMetricCard } from '@/components/async-metric-card';
import { operatorApi } from '@/lib/api/client';
import { ComplaintsWidget } from '@/components/complaints-widget';
import { getComplaintCountByStatus } from '@/lib/complaint-status';
import { useEffect, useState } from 'react';

export default function OperatorComplaintsPage() {
  const { isReady, handleLogout, operatorName } = useOperatorAuth();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (isReady) {
      loadPendingCount();
    }
  }, [isReady]);

  const loadPendingCount = async () => {
    try {
      const response = await operatorApi.getMetrics.complaints();
      setPendingCount(response.metadata?.pending_complaints || 0);
    } catch (error) {
      console.error('Failed to load pending count:', error);
    }
  };

  if (!isReady) {
    return <DashboardLoading message="Loading complaints..." />;
  }

  return (
    <DashboardShell
      navItems={operatorNavItems}
      userRole="operator"
      userName={operatorName ?? undefined}
      onLogout={handleLogout}
    >
      <div className="space-y-8">
        <DashboardHeader title="Consumer Complaints">
          <Badge variant="outline" className="px-3 py-1">
            {pendingCount} Pending
          </Badge>
        </DashboardHeader>

        {/* Metrics Cards - 3 cards */}
        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 xl:grid-cols-3">
          <AsyncMetricCard
            title="Total complaints"
            fetchData={operatorApi.getMetrics.complaints}
            icon={MessageSquare}
            useIndicatorBadge={true}
            renderValue={(data) => data.metadata?.total_complaints || 0}
            renderFooter={(data) => `${data.metadata?.pending_complaints || 0} unresolved`}
          />

          <AsyncMetricCard
            title="Response time"
            fetchData={operatorApi.getMetrics.complaints}
            icon={Clock}
            useIndicatorBadge={true}
            renderValue={(data) => {
              const avgMinutes = data.metadata?.average_response_time_minutes;
              if (!avgMinutes) return 'N/A';
              return `${Math.round(avgMinutes)} minutes`;
            }}
            renderFooter={() => "Average response time"}
          />

          <AsyncMetricCard
            title="Resolved this month"
            fetchData={operatorApi.getMetrics.complaints}
            icon={CheckCircle2}
            useIndicatorBadge={true}
            renderValue={(data) => data.metadata?.resolved_complaints_this_month || 0}
            renderFooter={() => "This month"}
          />
        </div>

        <div className="px-4 lg:px-6">
          <ComplaintsWidget
            showTitle={false}
            syncUrlParams={true}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </DashboardShell>
  );
}
