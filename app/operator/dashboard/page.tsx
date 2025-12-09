'use client';

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { operatorApi } from '@/lib/api/client';
import { DashboardShell } from '@/components/dashboard-shell';
import {
    CompetitionDetailsDialog,
    OperatorCompetition
} from "@/components/operator/competition-details-dialog";
import { SystemHealthCard } from "@/components/operator/system-health-card";
import { ChainIntegrityBadge } from "@/components/operator/chain-integrity-badge";
import { CompetitionsWidget } from '@/components/competitions-widget';
import { useOperatorAuth } from '@/hooks/useOperatorAuth';
import { operatorNavItems } from '@/lib/navigation/operator-nav';
import { Activity, ShieldCheck, Trophy, TrendingUp, AlertTriangle, FileText, Download, CheckCircle2, Ticket, Info, Key } from 'lucide-react';
import { MetricCard } from '@/components/metric-card';
import { AsyncMetricCard } from '@/components/async-metric-card';
import { exportToJSON } from '@/lib/export-utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { MetricResponse } from '@/types/metrics';
import Link from 'next/link';
import { DashboardLoading } from '@/components/dashboard-loading';
import { DashboardHeader } from '@/components/dashboard-header';
import { Operator } from '@/lib/api';

interface DashboardData {
    user: any;
    operator: Operator;
}

export default function OperatorDashboardPage() {
    const { isReady, handleLogout } = useOperatorAuth();
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [lastApiEvent, setLastApiEvent] = useState<string | null>(null);
    const hasLoadedRef = useRef(false); // Prevent duplicate loads during hot reload

    useEffect(() => {
        // CRITICAL: Prevent duplicate loads during development hot reload
        if (isReady && !hasLoadedRef.current) {
            hasLoadedRef.current = true;
            loadDashboardData();
            loadLastApiEvent();
        }
    }, [isReady]);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            
            // Only load lightweight user/operator data
            const operatorData = await operatorApi.getDashboard();
            
            setDashboardData({
                user: operatorData.user,
                operator: operatorData.operator,
            });
        } catch (error: any) {
            console.error('Failed to load dashboard:', error);
            
            // Handle rate limit errors specifically
            if (error.status === 429) {
                console.error('Rate limit exceeded. Please wait a moment and refresh the page.');
            }
        } finally {
            setLoading(false);
        }
    };

    const loadLastApiEvent = async () => {
        try {
            const response = await operatorApi.getDrawEvents({ per_page: 1 });
            if (response?.data && response.data.length > 0) {
                setLastApiEvent(response.data[0].created_at);
            }
        } catch (error) {
            console.error('Failed to load last API event:', error);
        }
    };

    if (!isReady || loading) {
        return <DashboardLoading message="Loading dashboard..." />;
    }

    return (
        <DashboardShell
            navItems={operatorNavItems}
            userRole="operator"
            userName={dashboardData?.operator?.name || dashboardData?.user?.name}
            onLogout={handleLogout}
        >
            <div className="space-y-8">
                <DashboardHeader title="Dashboard">
                    {lastApiEvent && (
                        <Badge variant="outline" className="flex items-center gap-1.5 text-xs">
                            <Activity className="h-3 w-3" />
                            <span className="hidden sm:inline">Last API event:</span>
                            <span className="font-medium">{lastApiEvent}</span>
                        </Badge>
                    )}
                </DashboardHeader>

                {/* Top Metrics Grid - 6 cards */}
                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 xl:grid-cols-3">
                    {/* Competitions Needing Attention */}
                    <AsyncMetricCard
                        title="Competitions needing attention"
                        fetchData={operatorApi.getMetrics.attention}
                        useIndicatorBadge={true}
                        helpText="Displays competitions that need attention — such as overdue draws, open complaints, or missing audit records."
                        renderValue={(data) => data.value === 0 ? 'None' : data.value}
                        renderFooter={(data) => {
                            const needingAttention = data.metadata?.competitions_needing_attention || 0;
                            const totalIssues = data.metadata?.total_issues || 0;
                            const totalCompetitions = data.metadata?.total_competitions || 0;
                            return needingAttention > 0
                                ? `${Number(totalIssues || 0).toLocaleString()} total ${totalIssues === 1 ? 'issue' : 'issues'}`
                                : `All ${totalCompetitions} competitions healthy`;
                        }}
                    />

                    {/* Chain Integrity Status */}
                    <AsyncMetricCard
                        title="Chain integrity status"
                        fetchData={operatorApi.getMetrics.chainIntegrity}
                        useIndicatorBadge={true}
                        helpText="Verifies that your competition's audit records are securely chained and tamper-proof, ensuring your draw results stay trustworthy."
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

                    {/* Active Competitions */}
                    <AsyncMetricCard
                        title="Active competitions"
                        fetchData={operatorApi.getMetrics.competitions}
                        helpText="Competitions that are open for entries. Once you close the competition, they automatically switch to 'Awaiting Draw'."
                        renderFooter={(data) => `${Number(data.metadata?.total_competitions || 0).toLocaleString()} total competitions`}
                    />

                    {/* Pending Complaints */}
                    <AsyncMetricCard
                        title="Pending complaints"
                        fetchData={operatorApi.getMetrics.complaints}
                        useIndicatorBadge={true}
                        helpText="Unresolved customer complaints. Addressing these promptly helps strengthen trust and support compliance."
                    />

                    {/* Total Entries */}
                    <AsyncMetricCard
                        title="Total entries"
                        fetchData={operatorApi.getMetrics.entries}
                        helpText="The total number of entries submitted across all your competitions — including both paid and free entries."
                        renderValue={(data) => typeof data.value === 'number' ? data.value.toLocaleString() : data.value}
                    />

                    {/* Draws This Month */}
                    <AsyncMetricCard
                        title="Draws this month"
                        fetchData={operatorApi.getMetrics.draws}
                        helpText="Shows how many secure draws you've completed this month. Each draw creates a tamper-proof audit record."
                    />
                </div>

                {/* Recent Competitions */}
                <div className="px-4 lg:px-6">
                    <div className="mb-4 flex items-center justify-between">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/operator/competitions">
                                View All
                            </Link>
                        </Button>
                    </div>

                    <CompetitionsWidget
                        showFilters={false}
                        showTitle={true}
                        maxItems={5}
                        pageSize={5}
                        onLogout={handleLogout}
                        title="Recent Competitions"
                        description=""
                    />
                </div>
            </div>
        </DashboardShell>
    );
}
