'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { operatorApi, authApi, apiClient } from '@/lib/api/client';
import {
    Trophy,
    Search,
    FileText,
    LayoutDashboard,
    Key,
    Activity,
    ShieldCheck,
    AlertTriangle,
    Settings,
    Eye,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard-shell';
import { Input } from '@/components/ui/input';
import {DashboardHeader} from "@/components/dashboard-header";
import {
  CompetitionDetailsDialog,
  formatDrawDate,
  formatEntries,
  getStatusBadge,
  OperatorCompetition
} from "@/components/operator/competition-details-dialog";
import {OperatorActionsMenu} from "@/components/operator-actions-menu";

type CompetitionData = OperatorCompetition;

export default function CompetitionsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [competitions, setCompetitions] = useState<CompetitionData[]>([]);
  const [operatorName, setOperatorName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompetition, setSelectedCompetition] = useState<CompetitionData | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  useEffect(() => {
    loadCompetitions();
  }, []);

  const loadCompetitions = async () => {
    try {
      const [competitionsData, dashboardData] = await Promise.all([
        operatorApi.getCompetitions(),
        operatorApi.getDashboard(),
      ]);
      setCompetitions(competitionsData.data || []);
      setOperatorName(dashboardData?.operator?.name || dashboardData?.user?.name || '');
      setLoading(false);
    } catch (error: any) {
      console.error('Failed to load competitions:', error);
      
      if (error.message?.includes('TOKEN') || error.status === 401 || error.message?.includes('Unauthorized')) {
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

  const handleOpenCompetition = (competition: CompetitionData) => {
    setSelectedCompetition(competition);
    setViewDialogOpen(true);
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

  // Filter competitions by search term
  const filteredCompetitions = competitions.filter((comp) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      comp.title?.toLowerCase().includes(term) ||
      comp.external_id?.toLowerCase().includes(term) ||
      comp.id?.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p className="text-lg text-muted-foreground animate-pulse">Loading competitions...</p>
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

        <DashboardHeader title="Competitions" />

          <div className="px-4 lg:px-6">
              <Card>
                  <CardHeader>
                      <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-1.5">
                              <CardTitle className="leading-none font-semibold !text-base">All Competitions</CardTitle>
                              <CardDescription className="text-muted-foreground text-sm">
                                  Monitor your competitions
                              </CardDescription>
                          </div>
                      </div>
                  </CardHeader>
                  <CardContent>
                      {filteredCompetitions.length > 0 ? (
                          <div className="overflow-x-auto">
                              <Table>
                                  <TableHeader>
                                      <TableRow>
                                          <TableHead>ID</TableHead>
                                          <TableHead>External ID</TableHead>
                                          <TableHead>Competition</TableHead>
                                          <TableHead>Status</TableHead>
                                          <TableHead>Prizes</TableHead>
                                          <TableHead>Entries</TableHead>
                                          <TableHead>Draw At</TableHead>
                                          <TableHead></TableHead>
                                      </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                      {filteredCompetitions.map((competition) => (
                                          <TableRow key={competition.id}>
                                              <TableCell className="font-mono text-xs text-muted-foreground">
                                                  {competition.id?.substring(0, 8)}...
                                              </TableCell>
                                              <TableCell>
                                                  <Badge variant="outline">
                                                      {competition.external_id}
                                                  </Badge>
                                              </TableCell>
                                              <TableCell className="font-medium text-foreground">
                                                  {competition.title}
                                              </TableCell>
                                              <TableCell>
                                                  {getStatusBadge(competition)}
                                              </TableCell>
                                              <TableCell>
                                                  {competition.prizes?.length || 0}
                                              </TableCell>
                                              <TableCell>
                                                  {formatEntries(competition)}
                                              </TableCell>
                                              <TableCell>
                                                  {formatDrawDate(competition)}
                                              </TableCell>
                                              <TableCell>
                                                  <OperatorActionsMenu
                                                      actions={[
                                                          {
                                                              label: 'Details',
                                                              icon: Eye,
                                                              onSelect: () => handleOpenCompetition(competition),
                                                          },
                                                          {
                                                              label: 'Events',
                                                              icon: Activity,
                                                              href: `/operator/draw-events?competition=${competition.id}`,
                                                          },
                                                          {
                                                              label: 'Audits',
                                                              icon: ShieldCheck,
                                                              href: `/operator/competitions/${competition.id}`,
                                                              disabled: (competition.draw_audits_count || 0) === 0,
                                                          },
                                                      ]}
                                                  />
                                              </TableCell>
                                          </TableRow>
                                      ))}
                                  </TableBody>
                              </Table>
                          </div>
                      ) : (
                          <div className="text-center py-12">
                              {searchTerm ? (
                                  <>
                                      <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                                      <h3 className="text-lg font-medium mb-2 text-foreground">No matches found</h3>
                                      <p className="text-sm text-muted-foreground mb-4">
                                          Try adjusting your search terms
                                      </p>
                                      <Button variant="outline" onClick={() => setSearchTerm('')}>Clear Search</Button>
                                  </>
                              ) : (
                                  <>
                                      <h3 className="text-lg font-medium mb-2 text-foreground">No competitions found</h3>
                                      <p className="text-sm text-muted-foreground mb-4">
                                          Create your first competition via the API to get started
                                      </p>
                                      <Link href="/docs">
                                          <Button variant="outline">View API Documentation</Button>
                                      </Link>
                                  </>
                              )}
                          </div>
                      )}
                  </CardContent>
              </Card>
          </div>

          <div className="px-4">

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
