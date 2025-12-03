'use client';

import { DashboardShell } from '@/components/dashboard-shell';
import { DashboardHeader } from "@/components/dashboard-header";
import { useOperatorAuth } from '@/hooks/useOperatorAuth';
import { operatorNavItems } from '@/lib/navigation/operator-nav';
import { DashboardLoading } from '@/components/dashboard-loading';
import { DrawEventsWidget } from '@/components/draw-events-widget';

export default function EventsPage() {
  const { isReady, handleLogout, operatorName } = useOperatorAuth();

  if (!isReady) {
    return <DashboardLoading message="Loading events..." />;
  }

  return (
    <DashboardShell
      navItems={operatorNavItems}
      userRole="operator"
      userName={operatorName}
      onLogout={handleLogout}
    >
      <div className="space-y-6">
        <DashboardHeader title="Events" />

        <div className="px-4 lg:px-6">
          <DrawEventsWidget 
            syncUrlParams={true}
            showActions={true}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </DashboardShell>
  );
}
