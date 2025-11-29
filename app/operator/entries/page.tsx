'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { operatorApi } from '@/lib/api/client';
import {
    Search,
    X,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard-shell';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DashboardHeader } from "@/components/dashboard-header";
import { EntriesTable, OperatorEntry } from "@/components/operator/entries-table";
import { PaginationControls } from "@/components/pagination-controls";
import { useOperatorAuth } from '@/hooks/useOperatorAuth';
import { operatorNavItems } from '@/lib/navigation/operator-nav';
import { DashboardLoading } from '@/components/dashboard-loading';
import { handleApiError } from '@/lib/error-handler';
import { ComplianceScoreCard } from '@/components/compliance/compliance-score-card';
import { CheckCircle2, XCircle, Ticket as TicketIcon } from 'lucide-react';

interface Competition {
  id: string;
  name: string;
  external_id: string;
}

export default function EntriesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isReady, handleLogout } = useOperatorAuth();
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<OperatorEntry[]>([]);
  const [operatorName, setOperatorName] = useState('');
  const [competitions, setCompetitions] = useState<Competition[]>([]);
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
    competition_id: '',
    entry_type: '',
    eligibility: '',
    external_id: '',
    user_reference: '',
  });

  // Debounced external_id for API calls
  const [debouncedExternalId, setDebouncedExternalId] = useState('');
  
  // Debounced user_reference for API calls
  const [debouncedUserReference, setDebouncedUserReference] = useState('');

  // Initialize from URL parameters
  useEffect(() => {
    if (searchParams) {
      const urlPage = parseInt(searchParams.get('page') || '1');
      const urlPageSize = parseInt(searchParams.get('per_page') || '20');
      const urlFilters = {
        competition_id: searchParams.get('competition_id') || '',
        entry_type: searchParams.get('entry_type') || '',
        eligibility: searchParams.get('eligibility') || '',
        external_id: searchParams.get('external_id') || '',
        user_reference: searchParams.get('user_reference') || '',
      };

      setPage(urlPage);
      setPageSize(urlPageSize);
      setFilters(urlFilters);
      setDebouncedExternalId(urlFilters.external_id);
      setDebouncedUserReference(urlFilters.user_reference);
      setInitialized(true);
    }
  }, [searchParams]);

  // Load competitions for filter dropdown
  useEffect(() => {
    if (isReady) {
      loadCompetitions();
    }
  }, [isReady]);

  // Debounce external_id search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedExternalId(filters.external_id);
      setPage(1); // Reset to first page when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.external_id]);

  // Debounce user_reference search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedUserReference(filters.user_reference);
      setPage(1); // Reset to first page when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.user_reference]);

  useEffect(() => {
    if (initialized && isReady) {
      loadEntries();
    }
  }, [initialized, isReady, page, pageSize, filters.competition_id, filters.entry_type, filters.eligibility, debouncedExternalId, debouncedUserReference]);

  useEffect(() => {
    if (initialized) {
      updateURL();
    }
  }, [initialized, page, pageSize, filters.competition_id, filters.entry_type, filters.eligibility, debouncedExternalId, debouncedUserReference]);

  const updateURL = () => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', page.toString());
    if (pageSize !== 20) params.set('per_page', pageSize.toString());
    if (filters.competition_id) params.set('competition_id', filters.competition_id);
    if (filters.entry_type) params.set('entry_type', filters.entry_type);
    if (filters.eligibility) params.set('eligibility', filters.eligibility);
    if (debouncedExternalId) params.set('external_id', debouncedExternalId);
    if (debouncedUserReference) params.set('user_reference', debouncedUserReference);

    const queryString = params.toString();
    router.push(`/operator/entries${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  const loadCompetitions = async () => {
    try {
      const [competitionsData, dashboardData] = await Promise.all([
        operatorApi.getCompetitions({ per_page: 1000 }),
        operatorApi.getDashboard(),
      ]);

      setCompetitions(competitionsData.data || []);
      setOperatorName(dashboardData?.operator?.name || dashboardData?.user?.name || '');
      setDashboardStats(dashboardData?.stats || null);
    } catch (error: any) {
      handleApiError(error, handleLogout);
    }
  };

  const loadEntries = async () => {
    try {
      setLoading(true);
      const params: any = {
        page,
        per_page: pageSize,
      };

      if (filters.competition_id) params.competition_id = filters.competition_id;
      if (filters.entry_type) params.entry_type = filters.entry_type;
      if (filters.eligibility) params.eligibility = filters.eligibility;
      if (debouncedExternalId) params.external_id = debouncedExternalId;
      if (debouncedUserReference) params.user_reference = debouncedUserReference;

      const entriesData = await operatorApi.getEntries(params);

      setEntries(entriesData.data || []);
      setPagination({
        current_page: entriesData.current_page || 1,
        per_page: entriesData.per_page || 20,
        total: entriesData.total || 0,
        last_page: entriesData.last_page || 1,
        from: entriesData.from || 0,
        to: entriesData.to || 0,
      });
      setLoading(false);
    } catch (error: any) {
      handleApiError(error, handleLogout);
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    // Treat "all" as empty string for filters
    const actualValue = value === 'all' ? '' : value;
    setFilters((prev) => ({ ...prev, [key]: actualValue }));
    setPage(1); // Reset to first page when filters change
  };

  const handleClearFilters = () => {
    setFilters({
      competition_id: '',
      entry_type: '',
      eligibility: '',
      external_id: '',
      user_reference: '',
    });
    setPage(1);
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  if (!isReady || (loading && !initialized)) {
    return <DashboardLoading message="Loading entries..." />;
  }

  return (
    <DashboardShell
      navItems={operatorNavItems}
      userRole="operator"
      userName={operatorName}
      onLogout={handleLogout}
    >
      <div className="space-y-8">

        <DashboardHeader title="Entries">
          <Badge variant="outline" className="px-3 py-1">
            {pagination.total} Total
          </Badge>
        </DashboardHeader>

        {/* Metrics Cards - 3 cards */}
        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 xl:grid-cols-3">
          <ComplianceScoreCard
            title="Total entries"
            value={(dashboardStats?.total_entries || 0).toLocaleString()}
            status="neutral"
            icon={TicketIcon}
            footer="All competitions"
          />

          <ComplianceScoreCard
            title="Entry eligibility"
            value={
              dashboardStats?.entry_eligibility_percentage
                ? `${dashboardStats.entry_eligibility_percentage.toFixed(2)}%`
                : 'N/A'
            }
            status={
              dashboardStats?.entry_eligibility_percentage
                ? dashboardStats.entry_eligibility_percentage >= 95
                  ? 'good'
                  : dashboardStats.entry_eligibility_percentage >= 90
                    ? 'warning'
                    : 'critical'
                : 'neutral'
            }
            icon={CheckCircle2}
            footer={`${dashboardStats?.valid_entries || 0} valid entries`}
            helpText="Shows what percentage of your entries are valid for the draw. Higher numbers mean better entry quality."
          />

          <ComplianceScoreCard
            title="Voided entries"
            value={dashboardStats?.voided_entries || 0}
            status={
              dashboardStats?.total_entries > 0 && (dashboardStats.voided_entries / dashboardStats.total_entries) > 0.05
                ? 'warning'
                : 'neutral'
            }
            icon={XCircle}
            footer="Deleted or invalid"
          />
        </div>

        <div className="px-4 lg:px-6">
          {/* Filters */}
          <Card className="mb-6">
              <CardHeader>
                  <CardTitle className="leading-none font-semibold !text-base">Filters</CardTitle>
              </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="flex flex-col gap-1.5">
                  <Label htmlFor="competition_id" className="text-sm font-medium">
                    Competition
                  </Label>
                  <Select
                    value={filters.competition_id || 'all'}
                    onValueChange={(value) => handleFilterChange('competition_id', value)}
                  >
                    <SelectTrigger id="competition_id" className="w-full">
                      <SelectValue placeholder="All competitions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All competitions</SelectItem>
                      {competitions.map((competition) => (
                        <SelectItem key={competition.id} value={competition.id}>
                          {competition.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

              <div className="flex flex-col gap-1.5">
                  <Label htmlFor="entry_type" className="text-sm font-medium">
                    Entry Type
                  </Label>
                  <Select
                    value={filters.entry_type || 'all'}
                    onValueChange={(value) => handleFilterChange('entry_type', value)}
                  >
                    <SelectTrigger id="entry_type" className="w-full">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              <div className="flex flex-col gap-1.5">
                  <Label htmlFor="eligibility" className="text-sm font-medium">
                    Eligibility
                  </Label>
                  <Select
                    value={filters.eligibility || 'all'}
                    onValueChange={(value) => handleFilterChange('eligibility', value)}
                  >
                    <SelectTrigger id="eligibility" className="w-full">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="correct">Correct answer</SelectItem>
                      <SelectItem value="incorrect">Incorrect answer</SelectItem>
                      <SelectItem value="deleted">Deleted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              <div className="flex flex-col gap-1.5">
                  <Label htmlFor="external_id" className="text-sm font-medium">
                    External ID
                  </Label>
                  <Input
                    id="external_id"
                    type="text"
                    placeholder="Search by External ID..."
                    value={filters.external_id}
                    onChange={(e) => handleFilterChange('external_id', e.target.value)}
                    className="w-full"
                  />
                </div>

              <div className="flex flex-col gap-1.5">
                  <Label htmlFor="user_reference" className="text-sm font-medium">
                    User Reference
                  </Label>
                  <Input
                    id="user_reference"
                    type="text"
                    placeholder="Search by User Reference..."
                    value={filters.user_reference}
                    onChange={(e) => handleFilterChange('user_reference', e.target.value)}
                    className="w-full"
                  />
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
                  <CardTitle className="leading-none font-semibold !text-base">All entries</CardTitle>
                  <CardDescription className="text-muted-foreground text-sm">
                    View and filter competition entries
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <p className="text-lg text-muted-foreground animate-pulse">Loading...</p>
                </div>
              ) : entries.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <EntriesTable entries={entries} />
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
                      <TicketIcon className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No entries yet</h3>
                      <p className="text-sm text-muted-foreground mb-6 max-w-md">
                        Entries will appear here automatically once users enter your competitions through the API.
                      </p>
                      <Button variant="outline" asChild>
                        <a href="/docs" target="_blank" rel="noopener noreferrer">
                          View API Documentation
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}



