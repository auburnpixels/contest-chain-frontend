'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { apiClient, operatorApi, authApi } from '@/lib/api/client';
import { Activity, ShieldCheck, AlertTriangle, Eye, MessageSquare, LayoutDashboard, Trophy, Key, FileText, Settings, X } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard-shell';
import {DashboardHeader} from "@/components/dashboard-header";
import {OperatorActionsMenu} from "@/components/operator-actions-menu";
import { PaginationControls } from '@/components/pagination-controls';
import { getComplaintStatusBadge, getComplaintCountByStatus, formatComplaintCategory, type Complaint } from '@/lib/complaint-status';

export default function OperatorComplaintsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [operatorName, setOperatorName] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [competitions, setCompetitions] = useState<any[]>([]);

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
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

  // Initialize from URL parameters
  useEffect(() => {
    if (searchParams) {
      const urlPage = parseInt(searchParams.get('page') || '1');
      const urlPageSize = parseInt(searchParams.get('per_page') || '10');
      const urlFilters = {
        status: searchParams.get('status') || '',
        competition: searchParams.get('competition') || '',
      };

      setPage(urlPage);
      setPageSize(urlPageSize);
      setFilters(urlFilters);
      setInitialized(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (initialized) {
      loadComplaints();
    }
  }, [initialized, page, pageSize, filters.status, filters.competition]);

  useEffect(() => {
    if (initialized) {
      updateURL();
    }
  }, [initialized, page, pageSize, filters.status, filters.competition]);

  useEffect(() => {
    loadCompetitions();
  }, []);

  const updateURL = () => {
    const params = new URLSearchParams();
    
    params.set('page', page.toString());
    params.set('per_page', pageSize.toString());
    
    if (filters.status && filters.status !== 'all') {
      params.set('status', filters.status);
    }
    if (filters.competition && filters.competition !== 'all') {
      params.set('competition', filters.competition);
    }

    router.push(`/operator/complaints?${params.toString()}`, { scroll: false });
  };

  const loadCompetitions = async () => {
    try {
      const competitionsData = await operatorApi.getCompetitions({ per_page: 1000 });
      setCompetitions(competitionsData.data || []);
    } catch (error: any) {
      console.error('Failed to load competitions:', error);
    }
  };

  const loadComplaints = async () => {
    setLoading(true);
    try {
      const [dashboardData, complaintsData] = await Promise.all([
        operatorApi.getDashboard(),
        operatorApi.getComplaints({
          page,
          per_page: pageSize,
          status: filters.status && filters.status !== 'all' ? filters.status : undefined,
          competition: filters.competition && filters.competition !== 'all' ? filters.competition : undefined,
        }),
      ]);
      
      setOperatorName(dashboardData?.operator?.name || dashboardData?.user?.name || '');
      setComplaints(complaintsData.data || []);
      
      // Update pagination data if available from API
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
      
      // For authentication errors, the API client will handle token refresh automatically
      // Only show error state, don't redirect - let AuthContext handle authentication
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? '' : value,
    }));
    setPage(1); // Reset to page 1 when filters change
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      competition: '',
    });
    setPage(1);
  };

  const hasActiveFilters = filters.status || filters.competition;

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    apiClient.clearToken();
    router.push('/operator/login');
  };

  const handleViewComplaint = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setIsDialogOpen(true);
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p className="text-lg text-muted-foreground animate-pulse">Loading complaints...</p>
      </div>
    );
  }

  return (
    <>
      <DashboardShell
        navItems={navItems}
        userRole="operator"
        userName={operatorName}
        onLogout={handleLogout}
      >
        <div className="space-y-8">
            <DashboardHeader title="Complaints">
                <Badge variant="outline" className="px-3 py-1">
                    {getComplaintCountByStatus(complaints, 'pending')} Pending
                </Badge>
            </DashboardHeader>

          {/* Filters Card */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle className="leading-none font-semibold !text-base">Filters</CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  Filter complaints by status or competition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="investigating">Investigating</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="dismissed">Dismissed</SelectItem>
                        <SelectItem value="escalated">Escalated</SelectItem>
                        <SelectItem value="on_hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="competition" className="text-sm font-medium">
                      Competition
                    </Label>
                    <Select
                      value={filters.competition || 'all'}
                      onValueChange={(value) => handleFilterChange('competition', value)}
                    >
                      <SelectTrigger id="competition" className="w-full">
                        <SelectValue placeholder="All competitions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All competitions</SelectItem>
                        {competitions.map((competition) => (
                          <SelectItem key={competition.uuid} value={competition.uuid}>
                            {competition.name}
                          </SelectItem>
                        ))}
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
          </div>

          {/* Complaints Table */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1.5">
                    <CardTitle className="leading-none font-semibold !text-base">Active Complaints</CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">
                      Review issues reported by participants
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {complaints.length > 0 ? (
                  <>
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
                            <TableCell>
                              {complaint.competition}
                            </TableCell>
                            <TableCell>
                              {complaint.reporter_name}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {formatComplaintCategory(complaint.category || '')}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {getComplaintStatusBadge(complaint)}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(complaint.created_at).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </TableCell>
                            <TableCell className="text-right">
                              <OperatorActionsMenu
                                actions={[
                                  {
                                    label: 'View',
                                    icon: Eye,
                                    onSelect: () => handleViewComplaint(complaint),
                                  },
                                ]}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <PaginationControls
                      pagination={pagination}
                      page={page}
                      pageSize={pageSize}
                      loading={loading}
                      onPageChange={handlePageChange}
                      onPageSizeChange={handlePageSizeChange}
                    />
                  </>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2 text-foreground">No complaints</h3>
                    <p className="text-sm text-muted-foreground">
                      {hasActiveFilters 
                        ? 'No complaints match the selected filters.'
                        : 'Great job! You have no active complaints.'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardShell>

      {/* Complaint Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
            <DialogDescription>
              Full complaint information and resolution status
            </DialogDescription>
          </DialogHeader>
          {selectedComplaint && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Complaint ID:</p>
                  <p className="text-sm font-semibold">#{selectedComplaint.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Status:</p>
                  {getComplaintStatusBadge(selectedComplaint)}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Competition:</p>
                <p className="text-sm font-semibold">{selectedComplaint.competition}</p>
                <p className="text-xs text-muted-foreground font-mono">{selectedComplaint.competition_id}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Category:</p>
                <Badge variant="secondary">{formatComplaintCategory(selectedComplaint.category || '')}</Badge>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Description:</p>
                <div className="text-sm bg-muted p-3 rounded">{selectedComplaint.message}</div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Submitted:</p>
                <p className="text-sm">{new Date(selectedComplaint.created_at).toLocaleString()}</p>
              </div>

              {selectedComplaint.status === 'pending' && (
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-500">
                    Respond
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

