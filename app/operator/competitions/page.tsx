'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

type CompetitionData = OperatorCompetition;

export default function CompetitionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [competitions, setCompetitions] = useState<CompetitionData[]>([]);
  const [operatorName, setOperatorName] = useState('');
  const [selectedCompetition, setSelectedCompetition] = useState<CompetitionData | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);

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
    if (initialized) {
      loadCompetitions();
    }
  }, [initialized, page, pageSize, filters.external_id, filters.name, filters.status]);

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
      setLoading(false);
    } catch (error: any) {
      console.error('Failed to load competitions:', error);
      
      // For authentication errors, the API client will handle token refresh automatically
      // Only show error state, don't redirect - let AuthContext handle authentication
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

  if (loading && !initialized) {
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

        <DashboardHeader title="Competitions">
          <Badge variant="outline" className="px-3 py-1">
            {pagination.total} Total
          </Badge>
        </DashboardHeader>

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
                  <CardTitle className="leading-none font-semibold !text-base">All Competitions</CardTitle>
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
      </div>

      <CompetitionDetailsDialog
        competition={selectedCompetition}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
      />
    </DashboardShell>
  );
}
