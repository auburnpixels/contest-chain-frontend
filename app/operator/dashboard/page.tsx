'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { operatorApi } from '@/lib/api/client';
import { DashboardShell } from '@/components/dashboard-shell';
import { Operator } from '@/lib/api';
import Link from 'next/link';
import { DashboardLoading } from '@/components/dashboard-loading';
import { DashboardHeader } from '@/components/dashboard-header';
import {
    CompetitionDetailsDialog,
    OperatorCompetition
} from "@/components/operator/competition-details-dialog";
import { CompetitionsTable } from "@/components/operator/competitions-table";
import { SystemHealthCard } from "@/components/operator/system-health-card";
import { ChainIntegrityBadge } from "@/components/operator/chain-integrity-badge";
import { useOperatorAuth } from '@/hooks/useOperatorAuth';
import { operatorNavItems } from '@/lib/navigation/operator-nav';
import { handleApiError } from '@/lib/error-handler';
import { Activity, ShieldCheck, Trophy, TrendingUp, AlertTriangle, FileText, Download, CheckCircle2, Ticket, Info, Key } from 'lucide-react';
import { MetricCard } from '@/components/metric-card';
import { AsyncMetricCard } from '@/components/async-metric-card';
import { exportToJSON } from '@/lib/export-utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { MetricResponse } from '@/types/metrics';

interface DashboardData {
    user: any;
    operator: Operator;
    compliance: any;
    recent_competitions?: CompetitionData[];
    attention?: {
        total_competitions: number;
        competitions_needing_attention: number;
        total_issues: number;
        critical_issues: number;
        warning_issues: number;
    };
    stats?: {
        total_competitions?: number;
        active_competitions?: number;
        total_entries?: number;
        total_complaints?: number;
        pending_complaints?: number;
        draws_this_month?: number;
        api_events_total?: number;
        active_api_keys?: number;
        competitions_with_draw_audits?: number;
    };
    system?: {
        rng_version?: string;
        chain_integrity?: ChainIntegrityData;
    };
}

type CompetitionData = OperatorCompetition;

export default function OperatorDashboardPage() {
    const { isReady, handleLogout } = useOperatorAuth();
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [competitions, setCompetitions] = useState<CompetitionData[]>([]);
    const [selectedCompetition, setSelectedCompetition] = useState<CompetitionData | null>(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [lastApiEvent, setLastApiEvent] = useState<string | null>(null);

    useEffect(() => {
        if (isReady) {
            loadDashboardData();
            loadLastApiEvent();
        }
    }, [isReady]);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            
            // Only load lightweight user/operator data and recent competitions
            const operatorData = await operatorApi.getDashboard();
            
            setDashboardData({
                user: operatorData.user,
                operator: operatorData.operator,
                recent_competitions: operatorData.recent_competitions || [],
            });
            setCompetitions(operatorData.recent_competitions || []);
        } catch (error: any) {
            handleApiError(error, handleLogout);
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
        } catch (error: any) {
            // Silently fail - this is not critical
        }
    };

    const handleOpenCompetition = (competition: CompetitionData) => {
        setSelectedCompetition(competition);
        setViewDialogOpen(true);
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
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1.5">
                                    <CardTitle className="leading-none font-semibold !text-base">Recent competitions</CardTitle>
                                    <CardDescription className="text-muted-foreground text-sm">
                                        Your 5 most recent competitions
                                    </CardDescription>
                                </div>

                                {competitions.length > 0 && (
                                    <Link href="/operator/competitions">
                                        <Button variant="outline" size="sm">
                                            View All
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            {competitions.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <h3 className="text-xl font-semibold mb-2">Ready to run your first competition?</h3>
                                    <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
                                        Create your first competition using the CAFAAS API. Once it's live, we'll automatically track entries, run secure draws, and generate tamper-proof audit records
                                    </p>
                                    <div className="flex gap-3 justify-center">
                                        <Button asChild>
                                            <a href="/docs/api/competitions/create" target="_blank" rel="noopener noreferrer">
                                                View API Example
                                            </a>
                                        </Button>
                                        <Button variant="outline" asChild>
                                            <Link href="/operator/api-keys">
                                                Get Your API Key
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <CompetitionsTable 
                                    competitions={competitions}
                                    showActions={true}
                                    onViewDetails={handleOpenCompetition}
                                />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Exportable Audit Reports */}
            <div className="px-4 lg:px-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="leading-none font-semibold !text-base">Exportable Audit Reports</CardTitle>
                        <CardDescription className="text-muted-foreground text-sm">
                            Download compliance reports for regulatory submission or internal review
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => alert('PDF report generation coming soon. Use JSON export for now.')}
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Full Compliance Report (PDF)
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => alert('Chain integrity proof PDF coming soon.')}
                            >
                                <ShieldCheck className="h-4 w-4 mr-2" />
                                Chain Integrity Proof (PDF)
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => alert('Draw audit bundle export coming soon.')}
                            >
                                <FileText className="h-4 w-4 mr-2" />
                                Draw Audit Bundle (JSON)
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            PDF reports are formatted for regulatory compliance and include verification signatures.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <CompetitionDetailsDialog
                competition={selectedCompetition}
                open={viewDialogOpen}
                onOpenChange={setViewDialogOpen}
            />
        </DashboardShell>
    );
}
