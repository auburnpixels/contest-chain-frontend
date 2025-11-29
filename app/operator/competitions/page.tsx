'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { operatorApi } from '@/lib/api/client';
import {
    Trophy,
    Search,
    X,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard-shell';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DashboardHeader } from "@/components/dashboard-header";
import {
  CompetitionDetailsDialog,
  OperatorCompetition
} from "@/components/operator/competition-details-dialog";
import { CompetitionsTable } from "@/components/operator/competitions-table";
import { PaginationControls } from "@/components/pagination-controls";
import { useOperatorAuth } from '@/hooks/useOperatorAuth';
import { operatorNavItems } from '@/lib/navigation/operator-nav';
import { DashboardLoading } from '@/components/dashboard-loading';
import { useDialog } from '@/hooks/useDialog';
import { handleApiError } from '@/lib/error-handler';
import { ComplianceScoreCard } from '@/components/compliance/compliance-score-card';
import { CheckCircle2, ShieldCheck as ShieldCheckIcon } from 'lucide-react';

type CompetitionData = OperatorCompetition;

export default function CompetitionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isReady, handleLogout } = useOperatorAuth();
  const [loading, setLoading] = useState(true);
  const [competitions, setCompetitions] = useState<CompetitionData[]>([]);
  const [operatorName, setOperatorName] = useState('');
  const dialog = useDialog<CompetitionData>();
  const [initialized, setInitialized] = useState(false);
  const [dashboardStats, setDashboardStats] = useState<any>(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 20,
    total: 0,
    last_page: 1,
    from: 0,
    to: 0,
  });

  // Filter state
  const [filters, setFilters] = useState({
    external_id: '',
    name: '',
    status: '',
  });

  // Initialize from URL parameters
  useEffect(() => {
    if (searchParams) {
      const urlPage = parseInt(searchParams.get('page') || '1');
      const urlPageSize = parseInt(searchParams.get('per_page') || '20');
      const urlFilters = {
        external_id: searchParams.get('external_id') || '',
        name: searchParams.get('name') || '',
        status: searchParams.get('status') || '',
      };

      setPage(urlPage);
      setPageSize(urlPageSize);
      setFilters(urlFilters);
      setInitialized(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (initialized && isReady) {
      loadCompetitions();
    }
  }, [initialized, isReady, page, pageSize, filters.external_id, filters.name, filters.status]);

  useEffect(() => {
    if (initialized) {
      updateURL();
    }
  }, [initialized, page, pageSize, filters.external_id, filters.name, filters.status]);

  const updateURL = () => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', page.toString());
    if (pageSize !== 20) params.set('per_page', pageSize.toString());
    if (filters.external_id) params.set('external_id', filters.external_id);
    if (filters.name) params.set('name', filters.name);
    if (filters.status) params.set('status', filters.status);

    const queryString = params.toString();
    router.push(`/operator/competitions${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  const loadCompetitions = async () => {
    try {
      setLoading(true);
      const params: any = {
        page,
        per_page: pageSize,
      };

      if (filters.external_id) params.external_id = filters.external_id;
      if (filters.name) params.name = filters.name;
      if (filters.status) params.status = filters.status;

      const [competitionsData, dashboardData] = await Promise.all([
        operatorApi.getCompetitions(params),
        operatorApi.getDashboard(),
      ]);

      setCompetitions(competitionsData.data || []);
      setPagination({
        current_page: competitionsData.current_page || 1,
        per_page: competitionsData.per_page || 20,
        total: competitionsData.total || 0,
        last_page: competitionsData.last_page || 1,
        from: competitionsData.from || 0,
        to: competitionsData.to || 0,
      });
      setOperatorName(dashboardData?.operator?.name || dashboardData?.user?.name || '');
      setDashboardStats(dashboardData?.stats || null);
      setLoading(false);
    } catch (error: any) {
      handleApiError(error, handleLogout);
      setLoading(false);
    }
  };

  const handleOpenCompetition = (competition: CompetitionData) => {
    dialog.open(competition);
  };

  const handleFilterChange = (key: string, value: string) => {
    // Treat "all" as empty string for status filter
    const actualValue = value === 'all' ? '' : value;
    setFilters((prev) => ({ ...prev, [key]: actualValue }));
    setPage(1); // Reset to first page when filters change
  };

  const removeFilter = (filterKey: string) => {
    setFilters({ ...filters, [filterKey]: '' });
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      external_id: '',
      name: '',
      status: '',
    });
    setPage(1);
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  if (!isReady || (loading && !initialized)) {
    return <DashboardLoading message="Loading competitions..." />;
  }

  return (
    <DashboardShell
      navItems={operatorNavItems}
      userRole="operator"
      userName={operatorName}
      onLogout={handleLogout}
    >
      <div className="space-y-8">

        <DashboardHeader title="Competitions">
          <Badge variant="outline" className="px-3 py-1">
            {pagination.total} Total
          </Badge>
        </DashboardHeader>

        {/* Metrics Cards - 4 cards */}
        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 xl:grid-cols-4">
          <ComplianceScoreCard
            title="Total competitions"
            value={dashboardStats?.total_competitions || 0}
            status="neutral"
            icon={Trophy}
            footer="All time"
          />

          <ComplianceScoreCard
            title="Active competitions"
            value={dashboardStats?.active_competitions || 0}
            status="neutral"
            icon={Trophy}
            footer="Currently running"
          />

          <ComplianceScoreCard
            title="Draw integrity"
            value={`${dashboardStats?.competitions_with_compliance_scores || 0} of ${dashboardStats?.total_competitions || 0}`}
            status={
              dashboardStats?.total_competitions > 0 && 
              (dashboardStats.competitions_with_compliance_scores / dashboardStats.total_competitions) >= 0.8
                ? 'good'
                : dashboardStats?.total_competitions > 0 && 
                  (dashboardStats.competitions_with_compliance_scores / dashboardStats.total_competitions) >= 0.5
                  ? 'warning'
                  : 'neutral'
            }
            icon={ShieldCheckIcon}
            footer="With compliance scores"
            helpText="Shows how many of your competitions have fully verified draws and complete audit records."
          />

          <ComplianceScoreCard
            title="Average compliance"
            value={
              dashboardStats?.average_compliance_score 
                ? `${Math.round(dashboardStats.average_compliance_score)}%`
                : 'N/A'
            }
            status={
              dashboardStats?.average_compliance_score
                ? dashboardStats.average_compliance_score >= 80
                  ? 'good'
                  : dashboardStats.average_compliance_score >= 60
                    ? 'warning'
                    : 'critical'
                : 'neutral'
            }
            icon={CheckCircle2}
            footer="Overall health metric"
            helpText="Your overall compliance rating across all competitions. Scores over 80% mean you’re performing exceptionally well."
          />
        </div>

        <div className="px-4 lg:px-6">
          {/* Filters */}
          <Card className="mb-6">
              <CardHeader>
                  <CardTitle className="leading-none font-semibold !text-base">Filters</CardTitle>
              </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1.5">
                  <Label htmlFor="external_id" className="text-sm font-medium">
                    External ID
                  </Label>
                  <Input
                    id="external_id"
                    placeholder="Search by external ID..."
                    value={filters.external_id}
                    onChange={(e) => handleFilterChange('external_id', e.target.value)}
                    className="w-full"
                  />
                </div>

              <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Search by name..."
                    value={filters.name}
                    onChange={(e) => handleFilterChange('name', e.target.value)}
                    className="w-full"
                  />
                </div>

              <div className="flex flex-col gap-1.5">
                  <Label htmlFor="status" className="text-sm font-medium">
                    Status
                  </Label>
                  <Select
                    value={filters.status || 'all'}
                    onValueChange={(value) => handleFilterChange('status', value)}
                  >
                    <SelectTrigger id="status" className="w-full">
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="awaiting_draw">Awaiting draw</SelectItem>
                      <SelectItem value="drawn">Drawn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 flex items-end">
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                      className="w-full"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1.5">
                  <CardTitle className="leading-none font-semibold !text-base">All competitions</CardTitle>
                  <CardDescription className="text-muted-foreground text-sm">
                    Monitor and filter your competitions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <p className="text-lg text-muted-foreground animate-pulse">Loading...</p>
                </div>
              ) : competitions.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <CompetitionsTable 
                      competitions={competitions}
                      showActions={true}
                      onViewDetails={handleOpenCompetition}
                    />
                  </div>

                  {/* Pagination - Always show */}
                  <PaginationControls
                    pagination={pagination}
                    page={page}
                    pageSize={pageSize}
                    loading={loading}
                    onPageChange={setPage}
                    onPageSizeChange={handlePageSizeChange}
                    pageSizeOptions={[10, 20, 50, 100]}
                  />
                </>
              ) : (
                <div className="text-center py-12">
                  {hasActiveFilters ? (
                    <>
                      <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium mb-2 text-foreground">No matches found</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Try adjusting your filters
                      </p>
                      <Button variant="outline" onClick={handleClearFilters}>Clear Filters</Button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center">
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
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <CompetitionDetailsDialog
        competition={dialog.item}
        open={dialog.isOpen}
        onOpenChange={(open) => !open && dialog.close()}
      />
    </DashboardShell>
  );
}
