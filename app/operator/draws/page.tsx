'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { operatorApi } from '@/lib/api/client';
import {
  CheckCircle2,
  X,
  Dices,
  ShieldCheck,
  LayoutDashboard,
  Trophy,
  Activity,
  AlertTriangle,
  Key,
  Settings,
  FileText,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard-shell';
import { DashboardHeader } from "@/components/dashboard-header";
import { PaginationControls } from '@/components/pagination-controls';
import {IndicatorBadge} from "@/components/ui/indicator-badge";
import { useOperatorAuth } from '@/hooks/useOperatorAuth';
import { operatorNavItems } from '@/lib/navigation/operator-nav';
import { DashboardLoading } from '@/components/dashboard-loading';
import { handleApiError } from '@/lib/error-handler';

// Format chain position with commas
const formatChainPosition = (sequence: number): string => {
  return `#${sequence.toLocaleString()}`;
};

interface DrawAudit {
  id: string;
  sequence: number;
  competition: {
    id: string;
    name: string;
    external_id: string;
  } | null;
  prize: {
    id: string;
    name: string;
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
  const searchParams = useSearchParams();
  const { isReady, handleLogout } = useOperatorAuth();
  const [loading, setLoading] = useState(true);
  const [drawAudits, setDrawAudits] = useState<DrawAudit[]>([]);
  const [allDrawAudits, setAllDrawAudits] = useState<DrawAudit[]>([]);
  const [operatorName, setOperatorName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [initialized, setInitialized] = useState(false);

  // Filter options
  const [competitions, setCompetitions] = useState<any[]>([]);

  // Filter state
  const [filters, setFilters] = useState({
    competition_id: '',
  });

  // Initialize from URL parameters
  useEffect(() => {
    if (searchParams) {
      const urlPage = parseInt(searchParams.get('page') || '1');
      const urlPageSize = parseInt(searchParams.get('pageSize') || '10');
      const urlFilters = {
        competition_id: searchParams.get('competition') || '',
      };

      setCurrentPage(urlPage);
      setPageSize(urlPageSize);
      setFilters(urlFilters);
      setInitialized(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (initialized && isReady) {
      loadDrawAudits();
    }
  }, [initialized, isReady]);

  useEffect(() => {
    if (initialized) {
      applyFilters();
      updateURL();
    }
  }, [initialized, filters.competition_id]);

  const loadDrawAudits = async () => {
    try {
      setLoading(true);
      console.log('[Draws] Fetching draw audits...');
      const [auditsData, dashboardData, competitionsData] = await Promise.all([
        operatorApi.getDrawAudits(),
        operatorApi.getDashboard(),
        operatorApi.getCompetitions({ per_page: 1000 }),
      ]);

      // Sort by sequence (chain position) in descending order
      const sortedAudits = (auditsData.data || []).sort((a: DrawAudit, b: DrawAudit) => b.sequence - a.sequence);
      
      setAllDrawAudits(sortedAudits);
      setDrawAudits(sortedAudits);
      setCompetitions(competitionsData.data || []);
      setOperatorName(dashboardData?.operator?.name || dashboardData?.user?.name || '');
      setLoading(false);
      
      // Apply filters after loading
      applyFilters();
    } catch (error: any) {
      handleApiError(error, handleLogout);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allDrawAudits];

    if (filters.competition_id) {
      filtered = filtered.filter(audit => audit.competition?.id === filters.competition_id);
    }

    setDrawAudits(filtered);
    setCurrentPage(1);
  };

  const updateURL = () => {
    const params = new URLSearchParams();
    if (currentPage > 1) params.set('page', currentPage.toString());
    if (pageSize !== 10) params.set('pageSize', pageSize.toString());
    if (filters.competition_id) params.set('competition', filters.competition_id);

    const queryString = params.toString();
    router.push(`/operator/draws${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const handleFilterChange = (key: string, value: string) => {
    const actualValue = value === 'all' ? '' : value;
    setFilters((prev) => ({ ...prev, [key]: actualValue }));
  };

  const removeFilter = (filterKey: string) => {
    setFilters({ ...filters, [filterKey]: '' });
  };

  const clearAllFilters = () => {
    setFilters({
      competition_id: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  const getCompetitionName = (competitionId: string) => {
    const comp = competitions.find((c: any) => c.id === competitionId);
    return comp?.name || 'Unknown';
  };

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

  if (!isReady || (loading && !initialized)) {
    return <DashboardLoading message="Loading draw audits..." />;
  }

  return (
    <DashboardShell
      navItems={operatorNavItems}
      userRole="operator"
      userName={operatorName}
      onLogout={handleLogout}
    >
      <div className="space-y-8">
        <DashboardHeader title="Draw Audits">
          <Badge variant="outline" className="px-3 py-1">
            {allDrawAudits.length} Total
          </Badge>
        </DashboardHeader>

        <div className="px-4 lg:px-6">
          {/* Filters Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="leading-none font-semibold !text-base">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="competition-filter" className="text-sm font-medium">Competition</Label>
                  <Select 
                    value={filters.competition_id || 'all'} 
                    onValueChange={(value) => handleFilterChange('competition_id', value)}
                  >
                    <SelectTrigger id="competition-filter">
                      <SelectValue placeholder="All Competitions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Competitions</SelectItem>
                      {competitions.map((comp: any) => (
                        <SelectItem key={comp.id} value={comp.id}>{comp.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="flex items-center gap-2 mt-4 flex-wrap">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {filters.competition_id && (
                    <Badge variant="secondary" className="gap-1">
                      Competition: {getCompetitionName(filters.competition_id)}
                      <button onClick={() => removeFilter('competition_id')} className="ml-1 hover:text-foreground">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" onClick={clearAllFilters}>Clear All</Button>
                </div>
              )}
            </CardContent>
          </Card>

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
                          <TableHead>ID</TableHead>
                          <TableHead>Competition</TableHead>
                          <TableHead>Prize</TableHead>
                          <TableHead>Draw Date</TableHead>
                          <TableHead>Entries</TableHead>
                          <TableHead>Winner</TableHead>
                          <TableHead>Chain Position</TableHead>
                            <TableHead>Signature</TableHead>
                            <TableHead>Integrity</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedDrawAudits.map((audit) => (
                      <TableRow key={audit.id}>
                          <TableCell>
                              {audit.draw_id?.substring(0, 8)}...
                          </TableCell>
                          <TableCell>
                              {audit.competition ? (
                                  <div className="font-medium text-foreground">{audit.competition.name}</div>
                              ) : (
                                  <span className="text-muted-foreground">N/A</span>
                              )}
                          </TableCell>
                          <TableCell>
                              {audit.prize?.name }
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
                              <span>#{audit.selected_entry.number}</span>
                          ) : (
                              <span></span>
                          )}
                        </TableCell>
                          <TableCell>
                              <Badge variant="outline" className="font-mono">
                                  {formatChainPosition(audit.sequence)}
                              </Badge>
                          </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {audit.signature_hash?.substring(0, 12)}...
                        </TableCell>
                        <TableCell>
                          <IndicatorBadge color="green" text="Verified" />
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

