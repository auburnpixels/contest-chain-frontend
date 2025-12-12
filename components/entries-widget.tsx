'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { operatorApi } from '@/lib/api/client';
import { Search } from 'lucide-react';
import { EntriesTable, OperatorEntry } from '@/components/operator/entries-table';
import { PaginationControls } from '@/components/pagination-controls';
import { handleApiError } from '@/lib/error-handler';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { SearchableSelect, SearchableSelectOption } from '@/components/ui/searchable-select';

export interface EntriesWidgetProps {
  title?: string;                 // Section title (default: "All entries")
  description?: string;           // Section description
  showFilters?: boolean;          // Show filter section (default: true)
  showTitle?: boolean;            // Show title section (default: true)
  pageSize?: number;              // Initial page size (default: 20)
  syncUrlParams?: boolean;        // Sync filters/pagination to URL (default: false)
  competitionId?: string;         // Pre-filter to specific competition
  onLogout?: () => void;          // Logout handler for error handling
}

export function EntriesWidget({
  title = 'All entries',
  description = 'View and filter competition entries',
  showFilters = true,
  showTitle = true,
  pageSize: initialPageSize = 20,
  syncUrlParams = false,
  competitionId,
  onLogout,
}: EntriesWidgetProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<OperatorEntry[]>([]);
  const [competitions, setCompetitions] = useState<SearchableSelectOption[]>([]);
  const [competitionsLoading, setCompetitionsLoading] = useState(false);
  const [initialized, setInitialized] = useState(!syncUrlParams);

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
    competition_id: competitionId || '',
    entry_type: '',
    eligibility: '',
    external_id: '',
    user_reference: '',
  });

  // Debounced filter values for text inputs (reduces API calls while typing)
  const debouncedExternalId = useDebouncedValue(filters.external_id, 500);
  const debouncedUserReference = useDebouncedValue(filters.user_reference, 500);

  // Initialize from URL parameters if syncUrlParams is enabled
  useEffect(() => {
    if (syncUrlParams && searchParams) {
      const urlPage = parseInt(searchParams.get('page') || '1');
      const urlPageSize = parseInt(searchParams.get('per_page') || String(initialPageSize));
      const urlFilters = {
        competition_id: competitionId || searchParams.get('competition_id') || '',
        entry_type: searchParams.get('entry_type') || '',
        eligibility: searchParams.get('eligibility') || '',
        external_id: searchParams.get('external_id') || '',
        user_reference: searchParams.get('user_reference') || '',
      };

      setPage(urlPage);
      setPageSize(urlPageSize);
      setFilters(urlFilters);
      setInitialized(true);
    }
  }, [syncUrlParams, searchParams, initialPageSize, competitionId]);

  // Load competitions for filter dropdown
  useEffect(() => {
    if (initialized && !competitionId) {
      loadCompetitions();
    }
  }, [initialized, competitionId]);

  // Load entries when initialized or filters change (using debounced values for text inputs)
  useEffect(() => {
    if (initialized) {
      loadEntries();
    }
  }, [initialized, page, pageSize, filters.competition_id, filters.entry_type, filters.eligibility, debouncedExternalId, debouncedUserReference]);

  // Update URL if syncUrlParams is enabled
  useEffect(() => {
    if (initialized && syncUrlParams) {
      updateURL();
    }
  }, [initialized, syncUrlParams, page, pageSize, filters.competition_id, filters.entry_type, filters.eligibility, debouncedExternalId, debouncedUserReference]);

  const updateURL = () => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', page.toString());
    if (pageSize !== 20) params.set('per_page', pageSize.toString());
    if (filters.competition_id && !competitionId) params.set('competition_id', filters.competition_id);
    if (filters.entry_type) params.set('entry_type', filters.entry_type);
    if (filters.eligibility) params.set('eligibility', filters.eligibility);
    if (debouncedExternalId) params.set('external_id', debouncedExternalId);
    if (debouncedUserReference) params.set('user_reference', debouncedUserReference);

    const queryString = params.toString();
    router.push(`${window.location.pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  const loadCompetitions = useCallback(async (search: string = '') => {
    try {
      setCompetitionsLoading(true);
      const competitionsData = await operatorApi.getCompetitions({
        per_page: 50,
        name: search || undefined,
      });
      const options: SearchableSelectOption[] = (competitionsData.data || []).map((c: any) => ({
        value: c.id,
        label: c.name,
      }));
      setCompetitions(options);
    } catch (error) {
      if (onLogout) {
        handleApiError(error, onLogout);
      }
    } finally {
      setCompetitionsLoading(false);
    }
  }, [onLogout]);

  const loadEntries = async () => {
    try {
      setLoading(true);
      const params: {
        page: number;
        per_page: number;
        competition_id?: string;
        entry_type?: string;
        eligibility?: string;
        external_id?: string;
        user_reference?: string;
      } = {
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
    } catch (error) {
      if (onLogout) {
        handleApiError(error, onLogout);
      }
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
      competition_id: competitionId || '',
      entry_type: '',
      eligibility: '',
      external_id: '',
      user_reference: '',
    });
    setPage(1);
  };

  const handleRemoveFilter = (key: string) => {
    handleFilterChange(key, '');
  };

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'competition_id' && competitionId) return false;
    return value !== '';
  });

  const getActiveFilters = () => {
    const active: Array<{ key: string; label: string; value: string }> = [];
    
    if (filters.competition_id && !competitionId) {
      const comp = competitions.find(c => c.value === filters.competition_id);
      if (comp) {
        active.push({ key: 'competition_id', label: 'Competition', value: comp.label });
      }
    }
    
    if (filters.entry_type) {
      active.push({ 
        key: 'entry_type', 
        label: 'Type', 
        value: filters.entry_type === 'paid' ? 'Paid' : 'Free' 
      });
    }
    
    if (filters.eligibility) {
      const eligibilityLabels: Record<string, string> = {
        correct: 'Correct answer',
        incorrect: 'Incorrect answer',
        deleted: 'Voided',
      };
      active.push({ 
        key: 'eligibility', 
        label: 'Eligibility', 
        value: eligibilityLabels[filters.eligibility] || filters.eligibility 
      });
    }
    
    if (filters.external_id) {
      active.push({ key: 'external_id', label: 'External ID', value: filters.external_id });
    }
    
    if (filters.user_reference) {
      active.push({ key: 'user_reference', label: 'User Reference', value: filters.user_reference });
    }
    
    return active;
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const activeFilters = getActiveFilters();

  return (
    <div className="space-y-6">
      {/* Table Card */}
      <Card>
          <div className="px-6">
              <div className="flex flex-col gap-2 border-b pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      <div className="flex flex-col gap-1.5">
                          <Label htmlFor="external_id" className="text-sm font-medium">
                              External ID
                          </Label>
                          <Input
                              id="external_id"
                              type="text"
                              placeholder="Search by external ID..."
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
                              placeholder="Search by user reference..."
                              value={filters.user_reference}
                              onChange={(e) => handleFilterChange('user_reference', e.target.value)}
                              className="w-full"
                          />
                      </div>

                      {!competitionId && (
                          <div className="flex flex-col gap-1.5">
                              <Label htmlFor="competition_id" className="text-sm font-medium">
                                  Competition
                              </Label>
                              <SearchableSelect
                                  value={filters.competition_id || 'all'}
                                  onValueChange={(value) => handleFilterChange('competition_id', value)}
                                  onSearch={loadCompetitions}
                                  options={competitions}
                                  placeholder="All competitions"
                                  searchPlaceholder="Search competitions..."
                                  emptyText="No competitions found."
                                  loading={competitionsLoading}
                                  allOptionLabel="All competitions"
                              />
                          </div>
                      )}

                      <div className="flex flex-col gap-1.5">
                          <Label htmlFor="entry_type" className="text-sm font-medium">
                              Type
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
                                  <SelectItem value="eligible">Eligible</SelectItem>
                                  <SelectItem value="ineligible">Ineligible</SelectItem>
                                  <SelectItem value="deleted">Voided</SelectItem>
                              </SelectContent>
                          </Select>
                      </div>
                  </div>

                  {hasActiveFilters && (
                  <div className="flex flex-col gap-1.5 justify-end">
                      <button
                          onClick={handleClearFilters}
                          className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                      >
                          Reset filters
                      </button>
                  </div>
                  )}
              </div>
          </div>

        {showTitle && (
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1.5">
                <CardTitle className="leading-none font-semibold !text-base">{title}</CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  {description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        )}

        <CardContent className={showTitle ? '' : ''}>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-lg text-muted-foreground animate-pulse">Loading...</p>
            </div>
          ) : entries.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <EntriesTable entries={entries} showCompetitionName={!competitionId} />
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
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
                  >
                    Reset filters
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2">No entries yet</h3>
                  <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
                    Entries are automatically recorded when users enter your competitions through the API. Each one is securely logged to ensure full transparency and fairness.
                  </p>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}



