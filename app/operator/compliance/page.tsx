'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { apiClient, operatorApi, authApi } from '@/lib/api/client';
import {
    Activity,
    ShieldCheck,
    AlertTriangle,
    Trophy,
    CheckCircle2,
    FileText,
    Mail,
    TrendingUp,
    LayoutDashboard,
    Key,
    Settings,
    Copy,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard-shell';
import {DashboardHeader} from "@/components/dashboard-header";
import {OperatorActionsMenu} from "@/components/operator-actions-menu";
import { PaginationControls } from '@/components/pagination-controls';

interface RaffleDetail {
  raffle_id: string;
  raffle_id_short: string;
  external_id: string;
  name: string;
  status: string;
  total_entries: number;
  postal_entries: number;
  free_entry_percentage: number;
  has_audit: boolean;
  audit_count: number;
  active_complaints: number;
  compliance_score: number;
}

interface ComplianceSummary {
  raffles_hosted: number;
  with_free_entry_route: number;
  with_free_entry_percentage: number;
  with_audit_logs: number;
  with_audit_logs_percentage: number;
  active_complaints: number;
  postal_entries_received: number;
  avg_postal_per_raffle: number;
}

interface ComplianceData {
  summary: ComplianceSummary;
  raffles: RaffleDetail[];
  operator: any;
  user: any;
}

export default function OperatorCompliancePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ComplianceData | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    loadComplianceData();
  }, []);

  const loadComplianceData = async () => {
    try {
      const response = await operatorApi.getComplianceSummary();
      setData(response);
      setLoading(false);
    } catch (error: any) {
      console.error('Failed to load compliance data:', error);
      
      // For authentication errors, the API client will handle token refresh automatically
      // Only show error state, don't redirect - let AuthContext handle authentication
      setLoading(false);
    }
  };

  const handleCopyId = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const exportToCSV = () => {
    if (!data?.raffles || data.raffles.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = [
      'Raffle ID',
      'External ID',
      'Title',
      'Status',
      'Total Entries',
      'Postal Entries',
      'Free Entry %',
      'Has Audit',
      'Audit Count',
      'Active Complaints',
      'Compliance Score',
    ];

    const rows = data.raffles.map((raffle) => [
      raffle.raffle_id,
      raffle.external_id || '',
      raffle.name,
      raffle.status,
      raffle.total_entries,
      raffle.postal_entries,
      raffle.free_entry_percentage.toFixed(2),
      raffle.has_audit ? 'Yes' : 'No',
      raffle.audit_count,
      raffle.active_complaints,
      raffle.compliance_score,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `compliance-report-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    if (!data) {
      alert('No data to export');
      return;
    }

    const exportData = {
      exported_at: new Date().toISOString(),
      operator: data.operator,
      summary: data.summary,
      raffles: data.raffles,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `compliance-report-${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' } } = {
      active: { label: 'active', variant: 'default' },
      ended: { label: 'ended', variant: 'secondary' },
      completed: { label: 'completed', variant: 'outline' },
      drawn: { label: 'drawn', variant: 'outline' },
    };
    
    const config = statusMap[status.toLowerCase()] || { label: status, variant: 'secondary' };

    return <Badge variant={config.variant} className="capitalize">{config.label.replace('_', ' ')}</Badge>;
  };

  const getComplianceScoreBadge = (score: number) => {
    if (score === 100) {
      return <Badge className="bg-green-600 hover:bg-green-700">{score}%</Badge>;
    } else if (score >= 60) {
      return <Badge className="bg-yellow-600 hover:bg-yellow-700">{score}%</Badge>;
    } else {
      return <Badge variant="destructive">{score}%</Badge>;
    }
  };

  const navItems = [
    { href: '/operator/dashboard', title: 'Dashboard', icon: LayoutDashboard },
    { href: '/operator/competitions', title: 'Competitions', icon: Trophy },
    { href: '/operator/draw-events', title: 'Events', icon: Activity },
    { href: '/operator/compliance', title: 'Compliance', icon: ShieldCheck },
    { href: '/operator/complaints', title: 'Complaints', icon: AlertTriangle },
    { href: '/operator/api-keys', title: 'API Keys', icon: Key },
    { href: '/operator/details', title: 'Settings', icon: Settings },
    { href: '/docs', title: 'Documentation', icon: FileText },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p className="text-lg text-muted-foreground animate-pulse">Loading compliance data...</p>
      </div>
    );
  }

  const stats = data?.summary;
  const raffles = data?.raffles || [];

  // Calculate pagination
  const totalRaffles = raffles.length;
  const totalPages = Math.ceil(totalRaffles / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedRaffles = raffles.slice(startIndex, endIndex);

  const paginationData = {
    current_page: currentPage,
    per_page: pageSize,
    total: totalRaffles,
    last_page: totalPages,
    from: totalRaffles > 0 ? startIndex + 1 : 0,
    to: Math.min(endIndex, totalRaffles),
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  return (
    <DashboardShell
      navItems={navItems}
      userRole="operator"
      userName={data?.operator?.name || data?.user?.name}
      onLogout={handleLogout}
    >
      <div className="space-y-8">
          <DashboardHeader title="Compliance">
              <Button variant="outline" size="sm" onClick={exportToCSV}>
                  Export CSV
              </Button>
              <Button variant="outline" size="sm" onClick={exportToJSON}>
                  Export JSON
              </Button>
          </DashboardHeader>

          <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-4">
            <Card>
                <CardHeader>
                    <CardDescription>Raffles Hosted</CardDescription>
                    <CardTitle>{stats?.raffles_hosted || 0}</CardTitle>
                </CardHeader>
                <CardFooter>
                    <p>
                        Total active and completed raffles
                    </p>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardDescription>Audit Coverage</CardDescription>
                    <CardTitle>{stats?.with_audit_logs_percentage?.toFixed(2) || 0}%</CardTitle>
                </CardHeader>
                <CardFooter>
                    <p>
                        {stats?.with_audit_logs || 0} of {stats?.raffles_hosted || 0} with full audit trails
                    </p>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardDescription>Active Complaints</CardDescription>
                    <CardTitle>{stats?.active_complaints || 0}</CardTitle>
                </CardHeader>
                <CardFooter>
                    <p>
                        Issues requiring your attention
                    </p>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardDescription>Postal Entries</CardDescription>
                    <CardTitle>{stats?.postal_entries_received || 0}</CardTitle>
                </CardHeader>
                <CardFooter>
                    <p>
                        Total processed postal entries
                    </p>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardDescription>Avg Postal/Raffle</CardDescription>
                    <CardTitle>{stats?.avg_postal_per_raffle?.toFixed(2) || 0}</CardTitle>
                </CardHeader>
                <CardFooter>
                    <p>
                        Average free entries per competition
                    </p>
                </CardFooter>
            </Card>
        </div>

        {/* Raffle Details Section */}
          <div className="px-4 lg:px-6">
              <Card>
                  <CardHeader>
                      <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-1.5">
                              <CardTitle className="leading-none font-semibold !text-base">Competition Details</CardTitle>
                              <CardDescription className="text-muted-foreground text-sm">
                                  Detailed compliance information for each competition
                              </CardDescription>
                          </div>
                      </div>
                  </CardHeader>
                  <CardContent>
                      {raffles.length === 0 ? (
                          <div className="text-center py-12 text-muted-foreground">
                              <ShieldCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                              <p className="text-sm">No competitions found</p>
                          </div>
                      ) : (
                          <>
                              <div className="overflow-x-auto">
                                  <Table>
                                      <TableHeader>
                                          <TableRow>
                                              <TableHead>ID</TableHead>
                                              <TableHead>External ID</TableHead>
                                              <TableHead>Title</TableHead>
                                              <TableHead>Status</TableHead>
                                              <TableHead>Total Entries</TableHead>
                                              <TableHead>Postal Entries</TableHead>
                                              <TableHead>Free Entry %</TableHead>
                                              <TableHead>Complaints</TableHead>
                                              <TableHead>Compliance Score</TableHead>
                                              <TableHead></TableHead>
                                          </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                          {paginatedRaffles.map((raffle) => (
                                          <TableRow key={raffle.raffle_id}>
                                              <TableCell>
                                                  <code className="text-xs text-muted-foreground font-mono">
                                                      {raffle.raffle_id_short?.toString().substring(0, 8)}...
                                                  </code>
                                              </TableCell>
                                              <TableCell>
                                                  <Badge variant="outline">
                                                      {raffle.external_id}
                                                  </Badge>
                                              </TableCell>
                                              <TableCell className="max-w-xs truncate" title={raffle.name}>
                                                  {raffle.name}
                                              </TableCell>
                                              <TableCell>
                                                  {getStatusBadge(raffle.status)}
                                              </TableCell>
                                              <TableCell>
                                                  {raffle.total_entries}
                                              </TableCell>
                                              <TableCell>
                                                  {raffle.postal_entries}
                                              </TableCell>
                                              <TableCell>
                                                  {raffle.free_entry_percentage.toFixed(2)}%
                                              </TableCell>
                                              <TableCell>
                                                  {raffle.active_complaints > 0 ? (
                                                      <span className="text-red-600">0</span>
                                                  ) : (
                                                      <span>0</span>
                                                  )}
                                              </TableCell>
                                              <TableCell>
                                                  {getComplianceScoreBadge(raffle.compliance_score)}
                                              </TableCell>
                                              <TableCell>
                                                  <OperatorActionsMenu
                                                      actions={[
                                                          {
                                                              label: 'View audits',
                                                              icon: ShieldCheck,
                                                              href: `/draw-audits/${raffle.raffle_id}`,
                                                              disabled: !raffle.has_audit,
                                                          },
                                                          {
                                                              label: 'Complaints',
                                                              icon: AlertTriangle,
                                                              href: `/operator/complaints?competition=${raffle.raffle_id}`,
                                                          },
                                                      ]}
                                                  />
                                              </TableCell>
                                          </TableRow>
                                      ))}
                                  </TableBody>
                              </Table>
                              </div>
                              <PaginationControls
                                  pagination={paginationData}
                                  page={currentPage}
                                  pageSize={pageSize}
                                  loading={loading}
                                  onPageChange={handlePageChange}
                                  onPageSizeChange={handlePageSizeChange}
                              />
                          </>
                      )}
                  </CardContent>
              </Card>
          </div>
      </div>
    </DashboardShell>
  );
}
