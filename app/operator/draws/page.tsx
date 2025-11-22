'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { operatorApi, authApi, apiClient } from '@/lib/api/client';
import {
  Trophy,
  FileText,
  LayoutDashboard,
  Key,
  Activity,
  ShieldCheck,
  AlertTriangle,
  Settings,
  CheckCircle2,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard-shell';
import { DashboardHeader } from "@/components/dashboard-header";
import { PaginationControls } from '@/components/pagination-controls';

// Format chain position with commas
const formatChainPosition = (sequence: number): string => {
  return `#${sequence.toLocaleString()}`;
};

interface DrawAudit {
  id: string;
  sequence: number;
  competition: {
    id: string;
    title: string;
    external_id: string;
  } | null;
  prize: {
    id: string;
    title: string;
  } | null;
  draw_id: string;
  drawn_at_utc: string;
  total_entries: number;
  selected_entry: {
    id: string;
    external_id: string;
    number: number;
  } | null;
  signature_hash: string;
  previous_signature_hash: string | null;
  pool_hash: string | null;
  rng_seed_or_hash: string;
  created_at: string;
}

export default function OperatorDrawsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [drawAudits, setDrawAudits] = useState<DrawAudit[]>([]);
  const [operatorName, setOperatorName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    loadDrawAudits();
  }, []);

  const loadDrawAudits = async () => {
    try {
      const [auditsData, dashboardData] = await Promise.all([
        operatorApi.getDrawAudits(),
        operatorApi.getDashboard(),
      ]);

      setDrawAudits(auditsData.data || []);
      setOperatorName(dashboardData?.operator?.name || dashboardData?.user?.name || '');
      setLoading(false);
    } catch (error: any) {
      console.error('Failed to load draw audits:', error);
      if (error.message?.includes('TOKEN') || error.status === 401) {
        router.push('/operator/login');
      } else {
        setLoading(false);
      }
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

  const navItems = [
    { href: '/operator/dashboard', title: 'Dashboard', icon: LayoutDashboard },
    { href: '/operator/competitions', title: 'Competitions', icon: Trophy },
    { href: '/operator/draw-events', title: 'Events', icon: Activity },
    { href: '/operator/draws', title: 'Draws', icon: ShieldCheck },
    { href: '/operator/compliance', title: 'Compliance', icon: ShieldCheck },
    { href: '/operator/complaints', title: 'Complaints', icon: AlertTriangle },
    { href: '/operator/api-keys', title: 'API Keys', icon: Key },
    { href: '/operator/details', title: 'Settings', icon: Settings },
    { href: '/docs', title: 'Documentation', icon: FileText },
  ];

  // Calculate pagination
  const totalDrawAudits = drawAudits.length;
  const totalPages = Math.ceil(totalDrawAudits / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedDrawAudits = drawAudits.slice(startIndex, endIndex);

  const paginationData = {
    current_page: currentPage,
    per_page: pageSize,
    total: totalDrawAudits,
    last_page: totalPages,
    from: totalDrawAudits > 0 ? startIndex + 1 : 0,
    to: Math.min(endIndex, totalDrawAudits),
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p className="text-lg text-muted-foreground animate-pulse">Loading draw audits...</p>
      </div>
    );
  }

  return (
    <DashboardShell
      navItems={navItems}
      userRole="operator"
      userName={operatorName}
      onLogout={handleLogout}
    >
      <div className="space-y-8">
        <DashboardHeader title="Draw Audits">
          <Badge variant="outline" className="px-3 py-1">
            {drawAudits.length} Total
          </Badge>
        </DashboardHeader>

        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1.5">
                  <CardTitle className="leading-none font-semibold !text-base">All Draw Audits</CardTitle>
                  <CardDescription className="text-muted-foreground text-sm">
                    Cryptographically verified draw results
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {drawAudits.length > 0 ? (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Chain Position</TableHead>
                        <TableHead>Draw ID</TableHead>
                        <TableHead>Competition</TableHead>
                        <TableHead>Prize</TableHead>
                        <TableHead>Draw Date</TableHead>
                        <TableHead>Entries</TableHead>
                        <TableHead>Winner</TableHead>
                        <TableHead>Signature</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedDrawAudits.map((audit) => (
                      <TableRow key={audit.id}>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {formatChainPosition(audit.sequence)}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {audit.draw_id?.substring(0, 8)}...
                        </TableCell>
                        <TableCell>
                          {audit.competition ? (
                            <div>
                              <div className="font-medium text-foreground">{audit.competition.title}</div>
                              <div className="text-xs text-muted-foreground">
                                ID: {audit.competition.external_id}
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">N/A</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {audit.prize?.title || 'N/A'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(audit.drawn_at_utc).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </TableCell>
                        <TableCell>
                          {audit.total_entries.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {audit.selected_entry ? (
                            <div>
                              <div className="font-medium">#{audit.selected_entry.number}</div>
                              <div className="text-xs text-muted-foreground font-mono">
                                {audit.selected_entry.id?.substring(0, 8)}...
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">N/A</span>
                          )}
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {audit.signature_hash?.substring(0, 12)}...
                        </TableCell>
                        <TableCell>
                          <Badge variant="default" className="gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Verified
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <PaginationControls
                  pagination={paginationData}
                  page={currentPage}
                  pageSize={pageSize}
                  loading={loading}
                  onPageChange={handlePageChange}
                  onPageSizeChange={handlePageSizeChange}
                />
              </>
              ) : (
                <div className="text-center py-12">
                  <ShieldCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2 text-foreground">No draw audits</h3>
                  <p className="text-sm text-muted-foreground">
                    Draw audits will appear here once you conduct draws for your competitions
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}

