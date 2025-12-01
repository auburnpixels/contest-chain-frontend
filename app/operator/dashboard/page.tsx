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
import { exportToJSON } from '@/lib/export-utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
    const [verifying, setVerifying] = useState(false);

    useEffect(() => {
        if (isReady) {
            loadDashboardData();
            loadLastApiEvent();
        }
    }, [isReady]);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            
            const [operatorData, competitionsData] = await Promise.all([
                operatorApi.getDashboard(),
                operatorApi.getCompetitions({ per_page: 5 }),
            ]);
            
            const allCompetitions = competitionsData.data || competitionsData.competitions || [];
            
            setDashboardData({
                user: operatorData.user,
                operator: operatorData.operator,
                compliance: operatorData.compliance,
                attention: operatorData.attention,
                recent_competitions: operatorData.recent_competitions || allCompetitions.slice(0, 5),
                stats: {
                    // Use backend stats as base
                    ...operatorData.stats,
                    // Override with calculated values where needed
                    total_competitions: allCompetitions.length,
                    active_competitions: allCompetitions.filter((c: any) => c.status === 'active').length,
                    total_entries: allCompetitions.reduce((sum: number, c: any) => sum + (c.entries_count || 0), 0),
                },
                system: operatorData.system || {},
            });
            setCompetitions(operatorData.recent_competitions || allCompetitions.slice(0, 5));
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

    const handleRunVerification = async () => {
        try {
            setVerifying(true);
            await operatorApi.verifyChain();
            // Reload dashboard to show updated chain status
            await loadDashboardData();
        } catch (error: any) {
            handleApiError(error, handleLogout);
        } finally {
            setVerifying(false);
        }
    };

    const shouldShowVerifyButton = (chainData?: ChainIntegrityData): boolean => {
        if (!chainData) return true;
        if (chainData.chain_status === 'invalid') return true;
        if ((chainData.verified_events ?? 0) < (chainData.total_events ?? 0)) return true;
        return false;
    };

    if (!isReady || loading) {
        return <DashboardLoading message="Loading dashboard..." />;
    }

    const chainIntegrity = dashboardData?.system?.chain_integrity;

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
                    <MetricCard
                        title="Competitions Needing Attention"
                        value={dashboardData?.attention?.competitions_needing_attention || 'None'}
                        status={
                            !dashboardData?.attention?.competitions_needing_attention || dashboardData.attention.competitions_needing_attention === 0
                                ? 'good'
                                : (dashboardData.attention.critical_issues || 0) > 0
                                    ? 'critical'
                                    : 'warning'
                        }
                        useIndicatorBadge={true}
                        footer={
                            dashboardData?.attention?.competitions_needing_attention && dashboardData.attention.competitions_needing_attention > 0
                                ? `${dashboardData.attention.total_issues || 0} total ${(dashboardData.attention.total_issues || 0) === 1 ? 'issue' : 'issues'}`
                                : `All ${dashboardData?.attention?.total_competitions || 0} competitions healthy`
                        }
                        helpText="Displays competitions that need attention — such as overdue draws, open complaints, or missing audit records."
                    />

                    {/* Chain Integrity Status */}
                    <MetricCard
                        title="Chain integrity status"
                        value={
                            chainIntegrity?.chain_status === 'valid' 
                                ? 'Verified'
                                : chainIntegrity?.chain_status === 'invalid' 
                                    ? 'Invalid' 
                                    : chainIntegrity?.chain_status === 'building'
                                        ? 'Building...'
                                        : 'Verifying...'
                        }
                        useIndicatorBadge={true}
                        status={chainIntegrity?.chain_status === 'valid' ? 'good' : chainIntegrity?.chain_status === 'invalid' ? 'critical' : 'neutral'}
                        footer={`${chainIntegrity?.verified_events || 0} of ${chainIntegrity?.total_events || 0} events verified`}
                        helpText="Verifies that your competition's audit records are securely chained and tamper-proof, ensuring your draw results stay trustworthy."
                    />

                    {/* Active Competitions */}
                    <MetricCard
                        title="Active competitions"
                        value={dashboardData?.stats?.active_competitions || 0}
                        status="neutral"
                        footer={`${dashboardData?.stats?.total_competitions || 0} total competitions`}
                        helpText="Competitions that are open for entries. Once you close the competition, they automatically switch to ‘Awaiting Draw'."
                    />

                    {/* Pending Complaints */}
                    <MetricCard
                        title="Pending complaints"
                        value={dashboardData?.stats?.pending_complaints || 0}
                        status={(dashboardData?.stats?.pending_complaints || 0) > 0 ? 'warning' : 'good'}
                        footer="Requiring response"
                        useIndicatorBadge={true}
                        helpText="Unresolved customer complaints. Addressing these promptly helps strengthen trust and support compliance."
                    />

                    {/* Total Entries */}
                    <MetricCard
                        title="Total entries"
                        value={(dashboardData?.stats?.total_entries || 0).toLocaleString()}
                        status="neutral"
                        footer="Across all competitions"
                        helpText="The total number of entries submitted across all your competitions — including both paid and free entries."
                    />

                    {/* Draws This Month */}
                    <MetricCard
                        title="Draws this month"
                        value={dashboardData?.stats?.draws_this_month || 0}
                        status="neutral"
                        footer="Completed successfully"
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
                                                <FileText className="mr-2 h-4 w-4" />
                                                View API Example
                                            </a>
                                        </Button>
                                        <Button variant="outline" asChild>
                                            <Link href="/operator/api-keys">
                                                <Key className="mr-2 h-4 w-4" />
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
