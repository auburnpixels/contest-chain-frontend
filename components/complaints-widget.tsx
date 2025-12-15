'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { operatorApi } from '@/lib/api/client';
import { MessageSquare } from 'lucide-react';
import { PaginationControls } from '@/components/pagination-controls';
import { OperatorActionsMenu } from '@/components/operator-actions-menu';
import { getComplaintStatusBadge, formatComplaintCategory, type Complaint } from '@/lib/complaint-status';
import { dateFormatters } from "@/lib/date-utils";
import { Separator } from "@/components/ui/separator";
import { SearchableSelect, SearchableSelectOption } from '@/components/ui/searchable-select';

export interface ComplaintsWidgetProps {
  title?: string;                 // Section title (default: "Complaints")
  description?: string;           // Section description
  showFilters?: boolean;          // Show filter section (default: true)
  showTitle?: boolean;            // Show title section (default: true)
  pageSize?: number;              // Initial page size (default: 10)
  syncUrlParams?: boolean;        // Sync filters/pagination to URL (default: false)
  onLogout?: () => void;          // Logout handler for error handling
}

export function ComplaintsWidget({
  title = 'Complaints',
  description = 'Review issues reported by participants',
  showFilters = true,
  showTitle = true,
  pageSize: initialPageSize = 10,
  syncUrlParams = false,
  onLogout,
}: ComplaintsWidgetProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [competitions, setCompetitions] = useState<SearchableSelectOption[]>([]);
  const [competitionsLoading, setCompetitionsLoading] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
    status: '',
    competition: '',
  });

  // Initialize from URL parameters if syncUrlParams is enabled
  useEffect(() => {
    if (syncUrlParams && searchParams) {
      const urlPage = parseInt(searchParams.get('page') || '1');
      const urlPageSize = parseInt(searchParams.get('per_page') || String(initialPageSize));
      const urlFilters = {
        status: searchParams.get('status') || '',
        competition: searchParams.get('competition') || '',
      };

      setPage(urlPage);
      setPageSize(urlPageSize);
      setFilters(urlFilters);
      setInitialized(true);
    }
  }, [syncUrlParams, searchParams, initialPageSize]);

  // Load competitions for filter
  useEffect(() => {
    if (initialized) {
      loadCompetitions();
    }
  }, [initialized]);

  // Load complaints when initialized or filters change
  useEffect(() => {
    if (initialized) {
      loadComplaints();
    }
  }, [initialized, page, pageSize, filters.status, filters.competition]);

  // Update URL if syncUrlParams is enabled
  useEffect(() => {
    if (initialized && syncUrlParams) {
      updateURL();
    }
  }, [initialized, syncUrlParams, page, pageSize, filters.status, filters.competition]);

  const updateURL = () => {
    if (!syncUrlParams) return;

    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('per_page', pageSize.toString());

    if (filters.status && filters.status !== 'all') {
      params.set('status', filters.status);
    }
    if (filters.competition && filters.competition !== 'all') {
      params.set('competition', filters.competition);
    }

    router.push(`${window.location.pathname}?${params.toString()}`, { scroll: false });
  };

  const loadCompetitions = useCallback(async (search: string = '') => {
    try {
      setCompetitionsLoading(true);
      const competitionsData = await operatorApi.getCompetitions({ 
        per_page: 50,
        name: search || undefined,
      });
      const options: SearchableSelectOption[] = (competitionsData.data || [])
        .filter((c: any) => c.uuid || c.id)
        .map((c: any) => ({
          value: c.uuid || c.id,
          label: c.name,
        }));
      setCompetitions(options);
    } catch (error) {
      console.error('Failed to load competitions:', error);
    } finally {
      setCompetitionsLoading(false);
    }
  }, []);

  const loadComplaints = async () => {
    setLoading(true);
    try {
      const complaintsData = await operatorApi.getComplaints({
        page,
        per_page: pageSize,
        status: filters.status && filters.status !== 'all' ? filters.status : undefined,
        competition: filters.competition && filters.competition !== 'all' ? filters.competition : undefined,
      });

      setComplaints(complaintsData.data || []);

      if (complaintsData.current_page !== undefined) {
        setPagination({
          current_page: complaintsData.current_page,
          per_page: complaintsData.per_page,
          total: complaintsData.total,
          last_page: complaintsData.last_page,
          from: complaintsData.from,
          to: complaintsData.to,
        });
      }

      setLoading(false);
    } catch (error: any) {
      console.error('Failed to load complaints:', error);
      if (error.status === 401 && onLogout) {
        await onLogout();
      }
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? '' : value,
    }));
    setPage(1);
  };

  const handleReset = () => {
    setFilters({
      status: '',
      competition: '',
    });
    setPage(1);
  };

  const hasActiveFilters = filters.status || filters.competition;

  const handleViewComplaint = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setIsDialogOpen(true);
  };

  if (loading && complaints.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading complaints...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table Section with integrated filters */}
      <Card>
          {showTitle && (
              <CardHeader>
                  <div className="flex flex-col border-b pb-4">
                      <CardTitle className="leading-none font-semibold !text-base">{title}</CardTitle>
                      {description && (
                          <CardDescription className="text-muted-foreground text-sm">
                              {description}
                          </CardDescription>
                      )}
                  </div>
              </CardHeader>
          )}

        {showFilters && (
          <div className="px-6">
            <div className="border-b pb-4">
              <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1.5">
                          <Label htmlFor="competition-filter" className="text-sm font-medium">Competition</Label>
                          <SearchableSelect
                              value={filters.competition || 'all'}
                              onValueChange={(value) => handleFilterChange('competition', value)}
                              onSearch={loadCompetitions}
                              options={competitions}
                              placeholder="All competitions"
                              searchPlaceholder="Search competitions..."
                              emptyText="No competitions found."
                              loading={competitionsLoading}
                              allOptionLabel="All competitions"
                          />
                      </div>

                      <div className="flex flex-col gap-1.5">
                          <Label htmlFor="status-filter" className="text-sm font-medium">Status</Label>
                          <Select
                              value={filters.status || 'all'}
                              onValueChange={(value) => handleFilterChange('status', value)}
                          >
                              <SelectTrigger id="status-filter" className="w-full">
                                  <SelectValue placeholder="All statuses" />
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="all">All statuses</SelectItem>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="resolved">Resolved</SelectItem>
                              </SelectContent>
                          </Select>
                      </div>
                  </div>

                  {hasActiveFilters && (
                    <div className="flex flex-col gap-1.5 justify-end">
                        <button
                          onClick={handleReset}
                          className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                        >
                          Reset filters
                        </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}

        <CardContent>
          {complaints.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Competition</TableHead>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complaints.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {complaint.id?.substring(0, 8)}...
                        </TableCell>
                        <TableCell>{complaint.competition}</TableCell>
                        <TableCell>
                          {complaint.name} ({complaint.email})
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {formatComplaintCategory(complaint.category || '')}
                          </Badge>
                        </TableCell>
                        <TableCell>{getComplaintStatusBadge(complaint)}</TableCell>
                        <TableCell>
                          {dateFormatters.shortDateTime(complaint.created_at)}
                        </TableCell>
                        <TableCell className="text-right">
                          <OperatorActionsMenu
                            actions={[
                              {
                                label: 'Details',
                                onSelect: () => handleViewComplaint(complaint),
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
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <h3 className="text-lg font-medium text-foreground mb-1">No complaints</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                {hasActiveFilters
                  ? 'No complaints match the selected filters.'
                  : 'Great job! You have no active complaints.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Complaint Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
       <DialogContent className="!max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="border-b pb-4">Complaint details</DialogTitle>
          </DialogHeader>
          {selectedComplaint && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-medium text-muted-foreground">Competition</h3>
                  {selectedComplaint.competition}
                </div>

                <div className="flex flex-col gap-1 items-start">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Status:</p>
                  {getComplaintStatusBadge(selectedComplaint)}
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">User reference</h3>
                  {selectedComplaint.name} ({selectedComplaint.email})
                </div>

                <div className="flex flex-col gap-1 items-start">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Category:</p>
                  <Badge variant="outline">{formatComplaintCategory(selectedComplaint.category || '')}</Badge>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Created at</h3>
                {dateFormatters.shortDateTime(selectedComplaint.created_at)}
              </div>

              <Separator />

              {selectedComplaint.message && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                  <p className="text-sm whitespace-pre-wrap">{selectedComplaint.message}</p>
                </div>
              )}

              {selectedComplaint.admin_notes && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Admin Notes</h3>
                    <p className="text-sm whitespace-pre-wrap">{selectedComplaint.admin_notes}</p>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

