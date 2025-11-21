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

export default function OperatorComplaintsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [operatorName, setOperatorName] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const dashboardData = await operatorApi.getDashboard();
      setOperatorName(dashboardData?.operator?.name || dashboardData?.user?.name || '');

      // Mock data for now
      setComplaints([
        // Empty for now or add sample if you want to show how it looks
        /*
        {
          id: 1,
          competition: 'Christmas Hamper Raffle',
          competition_id: '81c57f36-e1a',
          reporter_name: 'John Doe',
          category: 'Entry Issue',
          status: 'pending',
          description: 'I cannot find my ticket number in the email.',
          created_at: new Date().toISOString(),
        }
        */
      ]);
      
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
    { href: '/operator/dashboard', title: 'Dashboard', icon: LayoutDashboard },
    { href: '/operator/competitions', title: 'Competitions', icon: Trophy },
    { href: '/operator/draw-events', title: 'Events', icon: Activity },
    { href: '/operator/compliance', title: 'Compliance', icon: ShieldCheck },
    { href: '/operator/complaints', title: 'Complaints', icon: AlertTriangle },
    { href: '/operator/api-keys', title: 'API Keys', icon: Key },
    { href: '/operator/details', title: 'Settings', icon: Settings },
    { href: '/docs', title: 'Documentation', icon: FileText },
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
        userRole="operator"
        userName={operatorName}
        onLogout={handleLogout}
      >
        <div className="space-y-8">
            <DashboardHeader title="Complaints">
                <Badge variant="outline" className="px-3 py-1">
                    {complaints.filter(c => c.status === 'pending').length} Pending
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
                                                        {complaint.competition_id}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium text-foreground">{complaint.reporter_name}</div>
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
                  <Badge variant={getStatusVariant(selectedComplaint.status) as any}>
                    {selectedComplaint.status}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Competition:</p>
                <p className="text-sm font-semibold">{selectedComplaint.competition}</p>
                <p className="text-xs text-muted-foreground font-mono">{selectedComplaint.competition_id}</p>
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

