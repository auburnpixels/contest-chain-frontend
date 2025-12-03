'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { operatorApi } from '@/lib/api/client';
import { Trophy, X, RefreshCw } from 'lucide-react';
import { useDialog } from '@/hooks/useDialog';
import { PaginationControls } from '@/components/pagination-controls';
import { CompetitionsTable } from '@/components/operator/competitions-table';
import { CompetitionDetailsDialog, OperatorCompetition } from '@/components/operator/competition-details-dialog';
import { handleApiError } from '@/lib/error-handler';
import { Badge } from '@/components/ui/badge';

export interface CompetitionsWidgetProps {
  title?: string;                 // Section title (default: "Competitions")
  description?: string;           // Section description
  showFilters?: boolean;          // Show filter section (default: true)
  showTitle?: boolean;            // Show title section (default: true)
  pageSize?: number;              // Initial page size (default: 20)
  maxItems?: number;              // Max items to show (for dashboard - limits total results)
  syncUrlParams?: boolean;        // Sync filters/pagination to URL (default: false)
  onLogout?: () => void;          // Logout handler for error handling
}

export function CompetitionsWidget({
  title = 'Competitions',
  description = 'Manage your competitions',
  showFilters = true,
  showTitle = true,
  pageSize: initialPageSize = 20,
  maxItems,
  syncUrlParams = false,
  onLogout,
}: CompetitionsWidgetProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [competitions, setCompetitions] = useState<OperatorCompetition[]>([]);
  const [initialized, setInitialized] = useState(!syncUrlParams);
  const dialog = useDialog<OperatorCompetition>();

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: initialPageSize,
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

  // Initialize from URL parameters if syncUrlParams is enabled
  useEffect(() => {
    if (syncUrlParams && searchParams) {
      const urlPage = parseInt(searchParams.get('page') || '1');
      const urlPageSize = parseInt(searchParams.get('per_page') || String(initialPageSize));
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
  }, [syncUrlParams, searchParams, initialPageSize]);

  // Load competitions when initialized or filters change
  useEffect(() => {
    if (initialized) {
      loadCompetitions();
    }
  }, [initialized, page, pageSize, filters.external_id, filters.name, filters.status]);

  // Update URL if syncUrlParams is enabled
  useEffect(() => {
    if (initialized && syncUrlParams) {
      updateURL();
    }
  }, [initialized, syncUrlParams, page, pageSize, filters.external_id, filters.name, filters.status]);

  const updateURL = () => {
    if (!syncUrlParams) return;

    const params = new URLSearchParams();
    if (page > 1) params.set('page', page.toString());
    if (pageSize !== initialPageSize) params.set('per_page', pageSize.toString());
    if (filters.external_id) params.set('external_id', filters.external_id);
    if (filters.name) params.set('name', filters.name);
    if (filters.status) params.set('status', filters.status);

    const queryString = params.toString();
    router.push(`${window.location.pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  const loadCompetitions = async () => {
    try {
      setLoading(true);
      const params: any = {
        page,
        per_page: maxItems || pageSize,
      };

      if (filters.external_id) params.external_id = filters.external_id;
      if (filters.name) params.name = filters.name;
      if (filters.status) params.status = filters.status;

      const competitionsData = await operatorApi.getCompetitions(params);

      // If maxItems is set, limit the results
      const limitedData = maxItems 
        ? (competitionsData.data || []).slice(0, maxItems)
        : competitionsData.data || [];

      setCompetitions(limitedData);
      setPagination({
        current_page: competitionsData.current_page || 1,
        per_page: competitionsData.per_page || pageSize,
        total: competitionsData.total || 0,
        last_page: competitionsData.last_page || 1,
        from: competitionsData.from || 0,
        to: competitionsData.to || 0,
      });
      setLoading(false);
    } catch (error: any) {
      if (onLogout) {
        handleApiError(error, onLogout);
      } else {
        console.error('Failed to load competitions:', error);
      }
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page when filters change
  };

  const handleReset = () => {
    setFilters({
      external_id: '',
      name: '',
      status: '',
    });
    setPage(1);
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  if (loading && competitions.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading competitions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table Section with integrated filters */}
      <Card>
        {showFilters && (
          <div className="px-6">
            <div className="flex flex-col gap-4 border-b pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name-filter" className="text-sm font-medium">Name</Label>
                  <Input
                    id="name-filter"
                    placeholder="Search by name..."
                    value={filters.name}
                    onChange={(e) => handleFilterChange('name', e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="external-id-filter" className="text-sm font-medium">External ID</Label>
                  <Input
                    id="external-id-filter"
                    placeholder="Search by external ID..."
                    value={filters.external_id}
                    onChange={(e) => handleFilterChange('external_id', e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="status-filter" className="text-sm font-medium">Status</Label>
                  <Select 
                    value={filters.status || 'all'} 
                    onValueChange={(value) => handleFilterChange('status', value === 'all' ? '' : value)}
                  >
                    <SelectTrigger id="status-filter">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="awaiting_draw">Awaiting Draw</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5 justify-end">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleReset}
                    disabled={!hasActiveFilters}
                    className="w-full gap-2"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Reset
                  </Button>
                </div>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {filters.name && (
                    <Badge variant="secondary" className="gap-1">
                      Name: {filters.name}
                      <button onClick={() => handleFilterChange('name', '')} className="ml-1 hover:text-foreground">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.external_id && (
                    <Badge variant="secondary" className="gap-1">
                      External ID: {filters.external_id}
                      <button onClick={() => handleFilterChange('external_id', '')} className="ml-1 hover:text-foreground">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.status && (
                    <Badge variant="secondary" className="gap-1">
                      Status: {filters.status}
                      <button onClick={() => handleFilterChange('status', '')} className="ml-1 hover:text-foreground">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {showTitle && (
          <CardHeader>
            <div className="flex flex-col gap-1.5">
              <CardTitle className="leading-none font-semibold !text-base">{title}</CardTitle>
              {description && (
                <CardDescription className="text-muted-foreground text-sm">
                  {description}
                </CardDescription>
              )}
            </div>
          </CardHeader>
        )}

        <CardContent>
          {competitions.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <CompetitionsTable
                  competitions={competitions}
                  onViewDetails={dialog.open}
                />
              </div>

              {/* Only show pagination if not using maxItems (dashboard mode) */}
              {!maxItems && (
                <PaginationControls
                  pagination={pagination}
                  page={page}
                  pageSize={pageSize}
                  loading={loading}
                  onPageChange={setPage}
                  onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPage(1);
                  }}
                />
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <div className="bg-muted rounded-full p-4 mb-4">
                <Trophy className="h-8 w-8 text-muted-foreground opacity-50" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-1">No competitions found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                {hasActiveFilters
                  ? 'Try adjusting your filters to see more results.'
                  : 'Create your first competition to get started.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog */}
      <CompetitionDetailsDialog
        competition={dialog.item}
        open={dialog.isOpen}
        onOpenChange={(open) => !open && dialog.close()}
      />
    </div>
  );
}

