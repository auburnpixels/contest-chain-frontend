'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { regulatorApi } from '@/lib/api/client';
import { 
  Building2, 
  Trophy,
  CheckCircle2,
  Mail,
  TrendingUp,
  Copy,
  Check,
  X
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard-shell';
import { useRegulatorAuth } from '@/hooks/useRegulatorAuth';
import { regulatorNavItems } from '@/lib/navigation/regulator-nav';
import { DashboardLoading } from '@/components/dashboard-loading';

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
  user: any;
}

export default function CompliancePage() {
  const { isReady, handleLogout } = useRegulatorAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ComplianceData | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (isReady) {
      loadComplianceData();
    }
  }, [isReady]);

  const loadComplianceData = async () => {
    try {
      setLoading(true);
      const response = await regulatorApi.getComplianceDashboard();
      setData(response);
      setLoading(false);
    } catch (error: any) {
      console.error('Failed to load compliance data:', error);
      if (error.status === 401) {
        await handleLogout();
      }
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
    link.setAttribute('download', `compliance-dashboard-${new Date().toISOString().split('T')[0]}.csv`);
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
      summary: data.summary,
      raffles: data.raffles,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `compliance-dashboard-${new Date().toISOString().split('T')[0]}.json`);
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
    router.push('/regulator/login');
  };

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' } } = {
      active: { label: 'active', variant: 'default' },
      ended: { label: 'ended', variant: 'secondary' },
      completed: { label: 'completed', variant: 'outline' },
      drawn: { label: 'drawn', variant: 'outline' },
    };
    
    const config = statusMap[status.toLowerCase()] || { label: status, variant: 'secondary' };
    return <Badge variant={config.variant} className="capitalize">{config.label}</Badge>;
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
    { href: '/regulator/dashboard', title: 'Dashboard', icon: Home },
    { href: '/regulator/operators', title: 'Operators', icon: Building2 },
    { href: '/regulator/events', title: 'Events', icon: Activity },
    { href: '/regulator/complaints', title: 'Complaints', icon: AlertTriangle },
    { href: '/regulator/compliance', title: 'Compliance', icon: ShieldCheck },
  ];

  if (loading) {
    return <DashboardLoading message="Loading compliance data..." />;
  }

  const stats = data?.summary;
  const raffles = data?.raffles || [];

  return (
    <DashboardShell
      navItems={navItems}
      userRole="regulator"
      userName={data?.user?.name}
      onLogout={handleLogout}
    >
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Compliance Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Platform-wide compliance metrics and statistics
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportToCSV}>
              Export CSV
            </Button>
            <Button variant="outline" onClick={exportToJSON}>
              Export JSON
            </Button>
          </div>
        </div>

        {/* Top Row Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-sm">Raffles Hosted</CardDescription>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats?.raffles_hosted || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total active and completed raffles
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-sm">With Free Entry Route</CardDescription>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {stats?.with_free_entry_percentage?.toFixed(0) || 0}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats?.with_free_entry_route || 0} of {stats?.raffles_hosted || 0}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-sm">With Audit Logs</CardDescription>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {stats?.with_audit_logs_percentage?.toFixed(2) || 0}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats?.with_audit_logs || 0} of {stats?.raffles_hosted || 0}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-sm">Active Complaints</CardDescription>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats?.active_complaints || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Complaints pending resolution
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-sm">Postal Entries Received</CardDescription>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats?.postal_entries_received || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total free postal entries across platform
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-sm">Avg Postal per Raffle</CardDescription>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {stats?.avg_postal_per_raffle?.toFixed(2) || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Average free entries per competition
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Raffle Details Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Raffle Details</CardTitle>
                <CardDescription>
                  Detailed compliance information for each competition
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {raffles.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ShieldCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">No raffles found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3 px-2">Raffle ID</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3 px-2">Title</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3 px-2">Status</th>
                      <th className="text-right text-sm font-medium text-muted-foreground pb-3 px-2">Total Entries</th>
                      <th className="text-right text-sm font-medium text-muted-foreground pb-3 px-2">Postal Entries</th>
                      <th className="text-right text-sm font-medium text-muted-foreground pb-3 px-2">Free Entry %</th>
                      <th className="text-center text-sm font-medium text-muted-foreground pb-3 px-2">Audit</th>
                      <th className="text-center text-sm font-medium text-muted-foreground pb-3 px-2">Complaints</th>
                      <th className="text-center text-sm font-medium text-muted-foreground pb-3 px-2">Compliance Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {raffles.map((raffle) => (
                      <tr key={raffle.raffle_id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <code className="text-xs bg-muted px-2 py-1 rounded">
                              {raffle.raffle_id_short}
                            </code>
                            <button
                              onClick={() => handleCopyId(raffle.raffle_id)}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                              title="Copy full ID"
                            >
                              {copiedId === raffle.raffle_id ? (
                                <Check className="h-3 w-3 text-green-600" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-2 max-w-xs truncate" title={raffle.name}>
                          {raffle.name}
                        </td>
                        <td className="py-3 px-2">
                          {getStatusBadge(raffle.status)}
                        </td>
                        <td className="py-3 px-2 text-right font-mono text-sm">
                          {raffle.total_entries}
                        </td>
                        <td className="py-3 px-2 text-right font-mono text-sm">
                          {raffle.postal_entries}
                        </td>
                        <td className="py-3 px-2 text-right font-mono text-sm text-green-600">
                          {raffle.free_entry_percentage.toFixed(2)}%
                        </td>
                        <td className="py-3 px-2 text-center">
                          {raffle.has_audit ? (
                            <div className="flex items-center justify-center gap-2">
                              <Check className="h-4 w-4 text-green-600" />
                              <button
                                onClick={() => router.push(`/regulator/events`)}
                                className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
                              >
                                View
                              </button>
                            </div>
                          ) : (
                            <X className="h-4 w-4 text-red-600 mx-auto" />
                          )}
                        </td>
                        <td className="py-3 px-2 text-center">
                          {raffle.active_complaints > 0 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold">
                              {raffle.active_complaints}
                            </span>
                          ) : (
                            <Check className="h-4 w-4 text-green-600 mx-auto" />
                          )}
                        </td>
                        <td className="py-3 px-2 text-center">
                          {getComplianceScoreBadge(raffle.compliance_score)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}

