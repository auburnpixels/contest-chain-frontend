'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { apiClient, regulatorApi, authApi } from '@/lib/api/client';
import { Activity, Building2, Home, ShieldCheck, AlertTriangle, Eye, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DashboardShell } from '@/components/dashboard-shell';

export default function ComplaintsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [regulator, setRegulator] = useState<any>(null);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      // Mock data for now
      setComplaints([
        {
          id: 1,
          competition: 'TWGSB PTA Christmas Cash Raffle',
          competition_uuid: '81c57f36-e1a',
          reporter: 'john.doe@example.com',
          reporter_name: 'John Doe',
          category: 'Draw Fairness',
          status: 'pending',
          description: 'Concern about the transparency of the draw process.',
          created_at: new Date('2024-01-15').toISOString(),
        },
        {
          id: 2,
          competition: 'Demo A – Fair Tech Bundle',
          competition_uuid: '1979122a-8ff',
          reporter: 'jane.smith@example.com',
          reporter_name: 'Jane Smith',
          category: 'Entry Issue',
          status: 'resolved',
          description: 'Unable to submit free postal entry.',
          created_at: new Date('2024-01-10').toISOString(),
          resolved_at: new Date('2024-01-12').toISOString(),
          resolution: 'Issue was resolved by providing alternative entry method.',
        },
      ]);
      
      setRegulator({ name: 'Regulator' });
      setLoading(false);
    } catch (error: any) {
      console.error('Failed to load complaints:', error);
      if (error.status === 401) {
        router.push('/regulator/login');
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
    router.push('/regulator/login');
  };

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

  const navItems = [
    { href: '/regulator/dashboard', title: 'Dashboard', icon: Home },
    { href: '/regulator/operators', title: 'Operators', icon: Building2 },
    { href: '/regulator/draw-events', title: 'Events', icon: Activity },
    { href: '/regulator/complaints', title: 'Complaints', icon: AlertTriangle },
    { href: '/regulator/compliance', title: 'Compliance', icon: ShieldCheck },
  ];

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
                {complaints.filter(c => c.status === 'pending').length} Pending
              </Badge>
            </div>
          </div>

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
                      <TableHead>Reporter</TableHead>
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
                          <div>
                            <div className="font-medium text-foreground">{complaint.reporter_name}</div>
                            <div className="text-xs text-muted-foreground">{complaint.reporter}</div>
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
                    All operators are maintaining excellent compliance
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
                <p className="text-sm font-medium text-muted-foreground mb-1">Reporter:</p>
                <p className="text-sm font-semibold">{selectedComplaint.reporter_name}</p>
                <p className="text-xs text-muted-foreground">{selectedComplaint.reporter}</p>
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

