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
import { apiClient, regulatorApi, authApi } from '@/lib/api/client';
import { Activity, Building2, Home, ShieldCheck, AlertTriangle, Eye, MessageSquare, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DashboardShell } from '@/components/dashboard-shell';
import { useRegulatorAuth } from '@/hooks/useRegulatorAuth';
import { regulatorNavItems } from '@/lib/navigation/regulator-nav';
import { DashboardLoading } from '@/components/dashboard-loading';

export default function ComplaintsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isReady, handleLogout } = useRegulatorAuth();
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [allComplaints, setAllComplaints] = useState<any[]>([]);
  const [regulator, setRegulator] = useState<any>(null);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Filter state
  const [filters, setFilters] = useState({
    status: '',
    competition: '',
  });

  // Initialize from URL parameters
  useEffect(() => {
    if (searchParams) {
      const urlFilters = {
        status: searchParams.get('status') || '',
        competition: searchParams.get('competition') || '',
      };

      setFilters(urlFilters);
      setInitialized(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isReady) {
      loadComplaints();
    }
  }, [isReady]);

  useEffect(() => {
    if (initialized) {
      applyFilters();
      updateURL();
    }
  }, [initialized, filters.status, filters.competition, allComplaints]);

  const updateURL = () => {
    const params = new URLSearchParams();
    
    if (filters.status && filters.status !== 'all') {
      params.set('status', filters.status);
    }
    if (filters.competition && filters.competition !== 'all') {
      params.set('competition', filters.competition);
    }

    const queryString = params.toString();
    router.push(`/regulator/complaints${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  const applyFilters = () => {
    let filtered = [...allComplaints];

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(c => c.status === filters.status);
    }

    if (filters.competition && filters.competition !== 'all') {
      filtered = filtered.filter(c => c.competition_uuid === filters.competition);
    }

    setComplaints(filtered);
  };

  const loadComplaints = async () => {
    try {
      // Mock data for now
      const mockData = [
        {
          id: 1,
          competition: 'TWGSB PTA Christmas Cash Raffle',
          competition_uuid: '81c57f36-e1a',
          user_reference: 'user-12345',
          category: 'draw_fairness',
          status: 'pending',
          description: 'Concern about the transparency of the draw process.',
          created_at: new Date('2024-01-15').toISOString(),
        },
        {
          id: 2,
          competition: 'Demo A – Fair Tech Bundle',
          competition_uuid: '1979122a-8ff',
          user_reference: 'user-67890',
          category: 'entry_issue',
          status: 'resolved',
          description: 'Unable to submit free postal entry.',
          created_at: new Date('2024-01-10').toISOString(),
          resolved_at: new Date('2024-01-12').toISOString(),
          resolution: 'Issue was resolved by providing alternative entry method.',
        },
      ];

      setAllComplaints(mockData);
      setComplaints(mockData);
      setRegulator({ name: 'Regulator' });
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
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      competition: '',
    });
  };

  const hasActiveFilters = filters.status || filters.competition;

  // Get unique competitions for filter dropdown
  const uniqueCompetitions = Array.from(
    new Map(allComplaints.map(c => [c.competition_uuid, c])).values()
  );

  const handleViewComplaint = (complaint: any) => {
    setSelectedComplaint(complaint);
    setIsDialogOpen(true);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending':
        return 'outline';
      case 'investigating':
        return 'secondary';
      case 'resolved':
        return 'default';
      case 'dismissed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  if (!isReady || loading) {
    return <DashboardLoading message="Loading complaints..." />;
  }

  return (
    <>
      <DashboardShell
        navItems={regulatorNavItems}
        userRole="regulator"
        userName={regulator?.name}
        onLogout={handleLogout}
      >
        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Complaints</h1>
              <p className="text-muted-foreground mt-1">
                Track and manage competition complaints
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm px-3 py-1 h-9">
                {allComplaints.filter(c => c.status === 'pending').length} Pending
              </Badge>
            </div>
          </div>

          {/* Filters Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
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
                      {uniqueCompetitions.map((complaint) => (
                        <SelectItem key={complaint.competition_uuid} value={complaint.competition_uuid}>
                          {complaint.competition}
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

          {/* Complaints Table */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Complaints</CardTitle>
                  <CardDescription className="mt-1">
                    Review and investigate reported issues
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {complaints.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-slate-900/50 border-slate-800">
                      <TableHead>ID</TableHead>
                      <TableHead>Competition</TableHead>
                      <TableHead>User Ref</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complaints.map((complaint) => (
                      <TableRow key={complaint.id} className="hover:bg-slate-900/50 border-slate-800">
                        <TableCell className="font-medium">
                          #{complaint.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-foreground">{complaint.competition}</div>
                            <div className="text-xs text-muted-foreground font-mono">
                              {complaint.competition_uuid}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-foreground">
                            {complaint.user_reference || 'N/A'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs">
                            {complaint.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(complaint.status) as any}>
                            {complaint.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(complaint.created_at).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewComplaint(complaint)}
                            className="gap-1 hover:bg-slate-800"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2 text-foreground">No complaints</h3>
                  <p className="text-sm text-muted-foreground">
                    {hasActiveFilters 
                      ? 'No complaints match the selected filters.'
                      : 'All operators are maintaining excellent compliance'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
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
                  <Badge variant={getStatusVariant(selectedComplaint.status) as any}>
                    {selectedComplaint.status}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Competition:</p>
                <p className="text-sm font-semibold">{selectedComplaint.competition}</p>
                <p className="text-xs text-muted-foreground font-mono">{selectedComplaint.competition_uuid}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">User Reference:</p>
                <p className="text-sm font-semibold">{selectedComplaint.user_reference || 'N/A'}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Category:</p>
                <Badge variant="secondary">{selectedComplaint.category}</Badge>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Description:</p>
                <div className="text-sm bg-muted p-3 rounded">{selectedComplaint.description}</div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Submitted:</p>
                <p className="text-sm">{new Date(selectedComplaint.created_at).toLocaleString()}</p>
              </div>

              {selectedComplaint.resolved_at && (
                <>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Resolved:</p>
                    <p className="text-sm">{new Date(selectedComplaint.resolved_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Resolution:</p>
                    <div className="text-sm bg-muted p-3 rounded">{selectedComplaint.resolution}</div>
                  </div>
                </>
              )}

              {selectedComplaint.status === 'pending' && (
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-500">
                    Begin Investigation
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Dismiss
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

