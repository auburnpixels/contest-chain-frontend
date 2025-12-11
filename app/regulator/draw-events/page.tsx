'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { apiClient, regulatorApi, authApi } from '@/lib/api/client';
import { Activity, Building2, Home, ShieldCheck, AlertTriangle, Eye, Hash, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DashboardShell } from '@/components/dashboard-shell';
import { useRegulatorAuth } from '@/hooks/useRegulatorAuth';
import { regulatorNavItems } from '@/lib/navigation/regulator-nav';
import { DashboardLoading } from '@/components/dashboard-loading';

export default function DrawEventsPage() {
  const router = useRouter();
  const { isReady, handleLogout } = useRegulatorAuth();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<any[]>([]);
  const [regulator, setRegulator] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (isReady) {
      loadDrawEvents();
    }
  }, [isReady]);

  const loadDrawEvents = async () => {
    try {
      // Fetch draw events - you'll need to implement this endpoint
      const response = await fetch(`${apiClient.getToken() ? '/internal/regulator/events' : ''}`);
      // For now, using mock data
      setEvents([
        {
          id: '2c6d431d-4f1c-41ae-941d-8592f9a32c6f',
          sequence: 6514,
          event_type: 'competition.updated',
          event_hash: 'bbf63e562c354e4db633fb0f4d5db7caf70057c05bac25afa3e500a588c2fcf2',
          previous_event_hash: 'bfc7d24f6c3339815625b8acbee67cc868b3f63ed8b89847fc7d8b26230b70b7',
          competition: 'TWGSB PTA Christmas Cash Raffle',
          competition_id: 545,
          actor: 'System',
          ip_address: '172.17.0.1',
          user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0',
          created_at: new Date().toISOString(),
          payload: {
            competition_id: 545,
            title: 'TWGSB PTA Christmas Cash Raffle.',
            changes: {
              total_revenue: { old: 87400, new: 88400 },
              take_home_pay: { old: 80408, new: 81328 },
              raffaly_commission: { old: 6992, new: 7072 }
            },
            updated_fields: ['total_revenue', 'take_home_pay', 'raffaly_commission']
          }
        }
      ]);
      
      setRegulator({ name: 'Regulator' });
      setLoading(false);
    } catch (error: any) {
      console.error('Failed to load draw events:', error);
      
      // For authentication errors, the API client will handle token refresh automatically
      // Only show error state, don't redirect - let AuthContext handle authentication
      setLoading(false);
    }
  };


  const handleViewEvent = (event: any) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  if (!isReady || loading) {
    return <DashboardLoading message="Loading draw events..." />;
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
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Draw Events</h1>
              <p className="text-muted-foreground mt-1">
                Immutable audit trail of all draw-related events
              </p>
            </div>
          </div>

          {/* Events Table */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Event Chain</CardTitle>
                  <CardDescription className="mt-1">
                    Cryptographically linked event log
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-sm px-3 py-1 h-9">
                  {events.length} Events
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {events.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-slate-900/50 border-slate-800">
                        <TableHead>ID</TableHead>
                        <TableHead>Event Type</TableHead>
                        <TableHead>Hash</TableHead>
                        <TableHead>Previous Hash</TableHead>
                        <TableHead>Competition</TableHead>
                        <TableHead>Actor</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {events.map((event) => (
                        <TableRow key={event.id} className="hover:bg-slate-900/50 border-slate-800">
                          <TableCell className="font-mono text-xs">
                            {event.id.substring(0, 8)}...
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-mono text-xs">
                              {event.event_type}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            <div className="flex items-center gap-2">
                              <Hash className="h-3 w-3 text-muted-foreground" />
                              {event.event_hash.substring(0, 12)}...
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            <div className="flex items-center gap-2">
                              <Hash className="h-3 w-3 text-muted-foreground" />
                              {event.previous_event_hash.substring(0, 12)}...
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs truncate">{event.competition}</div>
                          </TableCell>
                          <TableCell>{event.actor}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {new Date(event.created_at).toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewEvent(event)}
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
                </div>
              ) : (
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2 text-foreground">No events found</h3>
                  <p className="text-sm text-muted-foreground">
                    Event logs will appear here as draws are executed
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardShell>

      {/* Event Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
            <DialogDescription>
              Complete event information and payload
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Full Event ID:</p>
                  <p className="text-sm font-mono bg-muted p-2 rounded break-all">{selectedEvent.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Sequence:</p>
                  <p className="text-sm font-mono bg-muted p-2 rounded">{selectedEvent.sequence}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Event Hash (Full):</p>
                <p className="text-sm font-mono bg-muted p-2 rounded break-all">{selectedEvent.event_hash}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Previous Hash (Full):</p>
                <p className="text-sm font-mono bg-muted p-2 rounded break-all">{selectedEvent.previous_event_hash}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">IP Address:</p>
                  <p className="text-sm font-mono bg-muted p-2 rounded">{selectedEvent.ip_address}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">User Agent:</p>
                  <p className="text-sm font-mono bg-muted p-2 rounded break-all">{selectedEvent.user_agent}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Event Payload:</p>
                <pre className="text-xs font-mono bg-muted p-4 rounded overflow-x-auto">
                  {JSON.stringify(selectedEvent.payload, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

