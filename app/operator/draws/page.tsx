'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { operatorApi } from '@/lib/api/client';
import {
  Dices,
  ShieldCheck,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard-shell';
import { DashboardHeader } from "@/components/dashboard-header";
import { useOperatorAuth } from '@/hooks/useOperatorAuth';
import { operatorNavItems } from '@/lib/navigation/operator-nav';
import { DashboardLoading } from '@/components/dashboard-loading';
import { handleApiError } from '@/lib/error-handler';
import { AsyncMetricCard } from '@/components/async-metric-card';
import { Calendar } from 'lucide-react';
import { DrawAuditsWidget } from '@/components/draw-audits-widget';

export default function OperatorDrawsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isReady, handleLogout, operatorName, operatorId } = useOperatorAuth();
  const [loading, setLoading] = useState(true);
  const [totalDraws, setTotalDraws] = useState(0);

  useEffect(() => {
    if (isReady) {
      loadTotalDraws();
    }
  }, [isReady]);

  const loadTotalDraws = async () => {
    try {
      const response = await operatorApi.getMetrics.draws();
      setTotalDraws(response.metadata?.total_draws || 0);
      setLoading(false);
    } catch (error: any) {
      handleApiError(error, handleLogout);
      setLoading(false);
    }
  };

  if (!isReady || loading) {
    return <DashboardLoading message="Loading draw audits..." />;
  }

  return (
    <DashboardShell
      navItems={operatorNavItems}
      userRole="operator"
      userName={operatorName}
      onLogout={handleLogout}
    >
      <div className="space-y-8">
        <DashboardHeader title="Draws & Winners" />

        {/* Metrics Cards - 3 cards */}
        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 xl:grid-cols-3">
          <AsyncMetricCard
            title="Total draws"
            fetchData={operatorApi.getMetrics.draws}
            icon={Dices}
            renderValue={(data) => data.metadata?.total_draws || 0}
            renderFooter={() => "All time"}
          />

          <AsyncMetricCard
            title="Chain verified"
            fetchData={operatorApi.getMetrics.draws}
            icon={ShieldCheck}
            renderValue={(data) => {
              const total = data.metadata?.total_draws || 0;
              const verified = data.metadata?.draws_with_valid_signatures || 0;
              return total > 0 ? `${verified} of ${total}` : '0 of 0';
            }}
            renderFooter={() => "With valid signatures"}
          />

          <AsyncMetricCard
            title="Recent draws"
            fetchData={operatorApi.getMetrics.draws}
            icon={Calendar}
            renderValue={(data) => data.metadata?.draws_last_7_days || 0}
            renderFooter={() => "Last 7 days"}
          />
        </div>

        <div className="px-4 lg:px-6">
          <DrawAuditsWidget 
            operatorId={operatorId || undefined}
            showOperator={false}
            showTitle={false}
            publicView={false}
            title="All draw audits"
            description="Cryptographically verified draw results"
          />
        </div>
      </div>
    </DashboardShell>
  );
}
