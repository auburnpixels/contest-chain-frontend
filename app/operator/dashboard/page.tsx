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
import type { ChainIntegrityData } from '@/lib/integrity-utils';
import { ComplianceScoreDisplay } from '@/components/operator/compliance-score-display';
import type { ComplianceScore } from '@/lib/api';
import { Activity, ShieldCheck, Trophy, TrendingUp, AlertTriangle, FileText, Download, CheckCircle2, Ticket } from 'lucide-react';
import { ComplianceScoreCard } from '@/components/compliance/compliance-score-card';
import { IndustryBenchmarks } from '@/components/compliance/industry-benchmarks';
import { exportToJSON } from '@/lib/export-utils';
import { 
  calculateOverallScore,
  formatComplianceStatus,
  generateComplianceReportData,
  type RaffleDetail 
} from '@/lib/compliance-utils';

interface DashboardData {
    user: any;
    operator: Operator;
    compliance: any;
    stats?: {
        total_competitions?: number;
        active_competitions?: number;
        total_entries?: number;
        total_complaints?: number;
        pending_complaints?: number;
        draws_this_month?: number;
        api_events_total?: number;
        active_api_keys?: number;
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
    const [averageComplianceScore, setAverageComplianceScore] = useState<ComplianceScore | null>(null);
    const [verifying, setVerifying] = useState(false);
    const [complianceSummary, setComplianceSummary] = useState<any>(null);
    const [industryBenchmarks, setIndustryBenchmarks] = useState<any>(null);

    useEffect(() => {
        if (isReady) {
            loadDashboardData();
            loadLastApiEvent();
            loadComplianceSummary();
            loadIndustryBenchmarks();
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
            
            // Calculate average compliance score from competitions with scores
            const competitionsWithScores = allCompetitions.filter((c: any) => c.compliance_score != null);
            if (competitionsWithScores.length > 0) {
                const avgScore = Math.round(
                    competitionsWithScores.reduce((sum: number, c: any) => sum + c.compliance_score, 0) / 
                    competitionsWithScores.length
                );
                const hasFinalScores = competitionsWithScores.some((c: any) => c.compliance_score_detail?.is_final);
                
                setAverageComplianceScore({
                    total_score: avgScore,
                    grade: avgScore >= 85 ? 'excellent' : avgScore >= 60 ? 'acceptable' : 'poor',
                    grade_label: avgScore >= 85 ? 'Excellent' : avgScore >= 60 ? 'Acceptable' : 'Poor',
                    grade_color: avgScore >= 85 ? 'text-green-500' : avgScore >= 60 ? 'text-yellow-500' : 'text-red-500',
                    is_final: hasFinalScores,
                    categories: {} as any, // Not needed for dashboard display
                    calculated_at: new Date().toISOString(),
                });
            }
            
            setDashboardData({
                user: operatorData.user,
                operator: operatorData.operator,
                compliance: operatorData.compliance,
                stats: {
                    total_competitions: allCompetitions.length,
                    active_competitions: allCompetitions.filter((c: any) => c.status === 'active').length,
                    total_entries: allCompetitions.reduce((sum: number, c: any) => sum + (c.entries_count || 0), 0),
                    pending_complaints: operatorData.stats?.pending_complaints || 0,
                    draws_this_month: operatorData.stats?.draws_this_month || 0,
                    api_events_total: operatorData.stats?.api_events_total || 0,
                    active_api_keys: operatorData.stats?.active_api_keys || 0,
                },
                system: operatorData.system || {},
            });
            setCompetitions(allCompetitions);
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

    const loadComplianceSummary = async () => {
        try {
            const response = await operatorApi.getComplianceSummary();
            setComplianceSummary(response);
        } catch (error: any) {
            // Silently fail - compliance data is supplementary
        }
    };

    const loadIndustryBenchmarks = async () => {
        try {
            const benchmarks = await operatorApi.getIndustryBenchmarks();
            setIndustryBenchmarks(benchmarks);
        } catch (error: any) {
            // Silently fail - will use mock data or hide section
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
                    {/* Overall Compliance Score */}
                    <ComplianceScoreCard
                        title="Overall compliance score"
                        value={complianceSummary?.raffles ? `${calculateOverallScore(complianceSummary.raffles)}%` : 'Calculating...'}
                        status={complianceSummary?.raffles ? formatComplianceStatus(calculateOverallScore(complianceSummary.raffles)).color as any : 'neutral'}
                        icon={complianceSummary?.raffles && calculateOverallScore(complianceSummary.raffles) >= 80 ? CheckCircle2 : AlertTriangle}
                        footer={complianceSummary?.raffles ? `Status: ${formatComplianceStatus(calculateOverallScore(complianceSummary.raffles)).label}` : 'Score becomes available after logging events'}
                        helpText="A combined score based on all compliance checks. Higher scores mean your competition meets more industry best-practice standards."
                    />

                    {/* Chain Integrity Status */}
                    <ComplianceScoreCard
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
                        status={chainIntegrity?.chain_status === 'valid' ? 'good' : chainIntegrity?.chain_status === 'invalid' ? 'critical' : 'neutral'}
                        icon={chainIntegrity?.chain_status === 'valid' ? CheckCircle2 : AlertTriangle}
                        footer={`${chainIntegrity?.verified_events || 0} of ${chainIntegrity?.total_events || 0} events verified`}
                        helpText="Confirms your competition's audit records are securely linked and can't be changed. This ensures your draw results remain trustworthy."
                    />

                    {/* Active Competitions */}
                    <ComplianceScoreCard
                        title="Active competitions"
                        value={dashboardData?.stats?.active_competitions || 0}
                        status="neutral"
                        icon={Trophy}
                        footer={`${dashboardData?.stats?.total_competitions || 0} total competitions`}
                    />

                    {/* Pending Complaints */}
                    <ComplianceScoreCard
                        title="Pending complaints"
                        value={dashboardData?.stats?.pending_complaints || 0}
                        status={(dashboardData?.stats?.pending_complaints || 0) > 0 ? 'warning' : 'good'}
                        icon={AlertTriangle}
                        footer="Requiring response"
                    />

                    {/* Total Entries */}
                    <ComplianceScoreCard
                        title="Total entries"
                        value={(dashboardData?.stats?.total_entries || 0).toLocaleString()}
                        status="neutral"
                        icon={Ticket}
                        footer="Across all competitions"
                    />

                    {/* Draws This Month */}
                    <ComplianceScoreCard
                        title="Draws this month"
                        value={dashboardData?.stats?.draws_this_month || 0}
                        status="neutral"
                        icon={Activity}
                        footer="Completed successfully"
                    />
                </div>

                {/* Industry Benchmarks */}
                {industryBenchmarks && complianceSummary?.raffles && (
                    <div className="px-4 lg:px-6">
                        <IndustryBenchmarks
                            comparisons={[
                                {
                                    label: 'Compliance score',
                                    yourValue: calculateOverallScore(complianceSummary.raffles),
                                    industryValue: industryBenchmarks?.avg_compliance_score || 63,
                                    unit: '%',
                                    format: 'percentage',
                                },
                                {
                                    label: 'Response time',
                                    yourValue: complianceSummary?.complaint_response_time?.average_hours || 0,
                                    industryValue: industryBenchmarks?.avg_response_time_hours || 24,
                                    unit: 'hours',
                                    format: 'time',
                                },
                            ]}
                            ranking={calculateOverallScore(complianceSummary.raffles) >= (industryBenchmarks?.avg_compliance_score || 63) ? 'Above Average' : 'Below Average'}
                        />
                    </div>
                )}

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
                                    onClick={() => {
                                        if (!complianceSummary) {
                                            alert('No compliance data available to export');
                                            return;
                                        }
                                        const reportData = generateComplianceReportData(
                                            { 
                                                name: dashboardData?.operator?.name || 'Unknown', 
                                                id: dashboardData?.operator?.id || '' 
                                            },
                                            complianceSummary.summary,
                                            complianceSummary.raffles || [],
                                            {
                                                verified: chainIntegrity?.chain_status === 'valid',
                                                percentage: chainIntegrity?.chain_status === 'valid' ? 100 : 0,
                                                lastCheck: new Date().toISOString(),
                                            },
                                            []
                                        );
                                        exportToJSON(reportData, `compliance-report-${new Date().toISOString().split('T')[0]}`);
                                    }}
                                    disabled={!complianceSummary}
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
                                    <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">No competitions yet</h3>
                                    <p className="text-sm text-muted-foreground mb-6 max-w-md">
                                        Once you create competitions via the CAFAAS API, they'll appear here with real-time compliance tracking and audit trails.
                                    </p>
                                    <div className="flex gap-3">
                                        <Link href="/docs">
                                            <Button variant="outline">View API Documentation</Button>
                                        </Link>
                                        <Link href="/operator/api-keys">
                                            <Button variant="ghost">Get API Key</Button>
                                        </Link>
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

            <CompetitionDetailsDialog
                competition={selectedCompetition}
                open={viewDialogOpen}
                onOpenChange={setViewDialogOpen}
            />
        </DashboardShell>
    );
}
