'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { apiClient, operatorApi, authApi } from '@/lib/api/client';
import { Activity, ShieldCheck, AlertTriangle, Eye, MessageSquare, LayoutDashboard, Trophy, Key, FileText, Settings } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard-shell';
import {DashboardHeader} from "@/components/dashboard-header";
import {OperatorActionsMenu} from "@/components/operator-actions-menu";
import { PaginationControls } from '@/components/pagination-controls';
import { getComplaintStatusBadge, getComplaintCountByStatus, formatComplaintCategory, type Complaint } from '@/lib/complaint-status';

export default function OperatorComplaintsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [operatorName, setOperatorName] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const [dashboardData, complaintsData] = await Promise.all([
        operatorApi.getDashboard(),
        operatorApi.getComplaints(),
      ]);
      
      setOperatorName(dashboardData?.operator?.name || dashboardData?.user?.name || '');
      setComplaints(complaintsData.data || []);
      
      setLoading(false);
    } catch (error: any) {
      console.error('Failed to load complaints:', error);
      if (error.message?.includes('TOKEN') || error.status === 401) {
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

  // Calculate pagination
  const totalComplaints = complaints.length;
  const totalPages = Math.ceil(totalComplaints / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedComplaints = complaints.slice(startIndex, endIndex);

  const paginationData = {
    current_page: currentPage,
    per_page: pageSize,
    total: totalComplaints,
    last_page: totalPages,
    from: totalComplaints > 0 ? startIndex + 1 : 0,
    to: Math.min(endIndex, totalComplaints),
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
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
                                        {paginatedComplaints.map((complaint) => (
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
                                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                                <h3 className="text-lg font-medium mb-2 text-foreground">No complaints</h3>
                                <p className="text-sm text-muted-foreground">
                                    Great job! You have no active complaints.
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

