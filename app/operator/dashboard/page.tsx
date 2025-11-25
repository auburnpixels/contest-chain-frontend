'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {apiClient, operatorApi, authApi} from '@/lib/api/client';
import {FileText, LayoutDashboard, Trophy, Key, Activity, ShieldCheck, AlertTriangle, Settings} from 'lucide-react';
import {DashboardShell} from '@/components/dashboard-shell';
import {Operator} from '@/lib/api';
import Link from 'next/link';
import {DashboardHeader} from "@/components/dashboard-header";
import {
    CompetitionDetailsDialog,
    OperatorCompetition
} from "@/components/operator/competition-details-dialog";
import {CompetitionsTable} from "@/components/operator/competitions-table";

interface DashboardData {
    user: any;
    operator: Operator;
    compliance: any;
    stats?: {
        active_competitions: number;
        total_competitions: number;
        total_entries: number;
        total_complaints?: number;
        pending_complaints?: number;
    }
}

type CompetitionData = OperatorCompetition;

export default function OperatorDashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [competitions, setCompetitions] = useState<CompetitionData[]>([]);
    const [selectedCompetition, setSelectedCompetition] = useState<CompetitionData | null>(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            // In a real app, these would be actual API calls
            // For now, we simulate the structure returned by Laravel
            const [operatorData, competitionsData] = await Promise.all([
                operatorApi.getDashboard(),
                operatorApi.getCompetitions(),
            ]);

            // Transform or use data directly if it matches
            const allCompetitions = competitionsData.data || competitionsData.competitions || [];
            setDashboardData({
                user: operatorData.user,
                operator: operatorData.operator,
                compliance: operatorData.compliance,
                stats: { // Derived or fetched stats
                    active_competitions: allCompetitions.filter((c: any) => c.status === 'active').length,
                    total_competitions: allCompetitions.length,
                    total_entries: allCompetitions.reduce((sum: number, c: any) => sum + (c.entries_count || c.total_entries || 0), 0)
                }
            });
            // Show only the last 5 competitions on the dashboard
            setCompetitions(allCompetitions.slice(0, 5));
        } catch (error: any) {
            console.error('Failed to load dashboard:', error);

            // Only redirect to login if it's an authentication error
            if (error.message?.includes('TOKEN') || error.status === 401 || error.message?.includes('Unauthorized')) {
                router.push('/operator/login');
            } else {
                // For other errors, just stop loading and show empty state
                setLoading(false);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await authApi.logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
        apiClient.clearToken();
        router.push('/operator/login');
    };

    const handleOpenCompetition = (competition: CompetitionData) => {
        setSelectedCompetition(competition);
        setViewDialogOpen(true);
    };

    const navItems = [
        {href: '/operator/dashboard', title: 'Dashboard', icon: LayoutDashboard},
        {href: '/operator/competitions', title: 'Competitions', icon: Trophy},
        {href: '/operator/draw-events', title: 'Events', icon: Activity},
        {href: '/operator/draws', title: 'Draws', icon: ShieldCheck},
        {href: '/operator/compliance', title: 'Compliance', icon: ShieldCheck},
        {href: '/operator/complaints', title: 'Complaints', icon: AlertTriangle},
        {href: '/operator/api-keys', title: 'API Keys', icon: Key},
        {href: '/operator/details', title: 'Settings', icon: Settings},
        {href: '/docs', title: 'Documentation', icon: FileText},
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
                <p className="text-lg text-muted-foreground animate-pulse">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <DashboardShell
            navItems={navItems}
            userRole="operator"
            userName={dashboardData?.operator?.name || dashboardData?.user?.name}
            onLogout={handleLogout}
        >
            <div className="space-y-8">
                <DashboardHeader title="Dashboard" />

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardDescription>Total Competitions</CardDescription>
                            <CardTitle>{dashboardData?.stats?.total_competitions || 0}</CardTitle>
                        </CardHeader>
                        <CardFooter>
                            <p>
                                Across all statuses
                            </p>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardDescription>Active Competitions</CardDescription>
                            <CardTitle>{dashboardData?.stats?.active_competitions || 0}</CardTitle>
                        </CardHeader>
                        <CardFooter>
                            <p>
                                Currently running
                            </p>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardDescription>Total Entries</CardDescription>
                            <CardTitle>{(dashboardData?.stats?.total_entries || 0).toLocaleString()}</CardTitle>
                        </CardHeader>
                        <CardFooter>
                            <p>
                                All time entries
                            </p>
                        </CardFooter>
                    </Card>

                    <Link href="/operator/complaints?status=pending">
                        <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                            <CardHeader>
                                <CardDescription>Pending Complaints</CardDescription>
                                <CardTitle>{dashboardData?.stats?.pending_complaints || 0}</CardTitle>
                            </CardHeader>
                            <CardFooter>
                                <p>
                                    Requires attention
                                </p>
                            </CardFooter>
                        </Card>
                    </Link>
                </div>

                <div className="px-4 lg:px-6">
                    <Card className="bg-card border-border ">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1.5">
                                    <CardTitle className="leading-none font-semibold !text-base">Recent Competitions</CardTitle>
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
                                    <h3 className="text-lg font-semibold mb-2">No competitions yet</h3>
                                    <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                                        Create competitions via the API. We'll handle the compliance and fairness proof.
                                    </p>
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
