'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { operatorApi } from '@/lib/api/client';
import { Eye, Activity, CheckCircle, X, AlertTriangle } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard-shell';
import { DismissibleAlert } from '@/components/dismissible-alert';
import { InfoTooltip } from '@/components/info-tooltip';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {DashboardHeader} from "@/components/dashboard-header";
import {OperatorActionsMenu} from "@/components/operator-actions-menu";
import { PaginationControls } from "@/components/pagination-controls";
import {IndicatorBadge} from "@/components/ui/indicator-badge";
import { useOperatorAuth } from '@/hooks/useOperatorAuth';
import { operatorNavItems } from '@/lib/navigation/operator-nav';
import { DashboardLoading } from '@/components/dashboard-loading';
import { useDialog } from '@/hooks/useDialog';
import { EventDetailsDialog, DrawEvent } from '@/components/operator/event-details-dialog';
import { ComplianceScoreCard } from '@/components/compliance/compliance-score-card';
import { ShieldCheck } from 'lucide-react';
import { dateFormatters } from '@/lib/date-utils';

// Helper function to map technical event types to friendly names
const getEventDisplayName = (eventType: string): string => {
  const mapping: Record<string, string> = {
    'competition.created': 'Competition Created',
    'operator.competition_created': 'Competition Created',
    'operator.draw_requested': 'Draw Triggered',
    'operator.api_request': 'API Request',
    'operator.entry_created': 'Entry Created',
    'competition.published': 'Competition Published',
    'competition.closed': 'Competition Closed',
    'competition.updated': 'Competition Updated',
    'entry.created': 'Entry Added',
    'entry.deleted': 'Entry Removed',
    'draw.started': 'Draw Started',
    'draw.completed': 'Draw Completed',
    'draw.seed_generated': 'Draw Seed Generated',
    'draw.randomization_run': 'Randomization Run',
    'draw.audit_created': 'Draw Audit Created',
    'complaint.submitted': 'Complaint Submitted',
    'prize.created': 'Prize Created',
    'prize.deleted': 'Prize Deleted',
  };
  return mapping[eventType] || eventType;
};

// Format chain position with commas
const formatChainPosition = (sequence: number): string => {
  return `#${sequence.toLocaleString()}`;
};

export default function EventsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isReady, handleLogout } = useOperatorAuth();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<DrawEvent[]>([]);
  const [operatorName, setOperatorName] = useState('');
  const eventDialog = useDialog<DrawEvent>();
  const [initialized, setInitialized] = useState(false);
  const [verifyingChain, setVerifyingChain] = useState(false);
  const [chainStatus, setChainStatus] = useState<any>(null);
  const [chainIntegrity, setChainIntegrity] = useState<any>(null);
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [showChainModal, setShowChainModal] = useState(false);
  const [exportingCsv, setExportingCsv] = useState(false);
  const [exportingJson, setExportingJson] = useState(false);

  // Filter options
  const [filterOptions, setFilterOptions] = useState<any>({
    event_types: [],
    competitions: [],
    actor_types: ['operator', 'system', 'user', 'admin'],
  });

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 25,
    total: 0,
    last_page: 1,
    from: 0,
    to: 0,
  });

  // Filter state
  const [filters, setFilters] = useState({
    event_type: '',
    competition_id: '',
    actor_type: '',
    from_date: '',
    to_date: '',
  });

  // Initialize from URL parameters
  useEffect(() => {
    if (searchParams) {
      const urlPage = parseInt(searchParams.get('page') || '1');
      const urlPageSize = parseInt(searchParams.get('pageSize') || '25');
      const urlFilters = {
        event_type: searchParams.get('event') || '',
        competition_id: searchParams.get('competition') || '',
        actor_type: searchParams.get('actor') || '',
        from_date: searchParams.get('from') || '',
        to_date: searchParams.get('to') || '',
      };

      setPage(urlPage);
      setPageSize(urlPageSize);
      setFilters(urlFilters);
      setInitialized(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isReady) {
      loadFilterOptions();
    }
  }, [isReady]);

  useEffect(() => {
    if (initialized && isReady) {
      loadEvents();
    }
  }, [initialized, isReady, page, pageSize, filters.event_type, filters.competition_id, filters.actor_type, filters.from_date, filters.to_date]);

  useEffect(() => {
    if (initialized) {
      updateURL();
    }
  }, [initialized, page, pageSize, filters.event_type, filters.competition_id, filters.actor_type, filters.from_date, filters.to_date]);

  const loadFilterOptions = async () => {
    try {
      const [filtersData, dashboardData] = await Promise.all([
        operatorApi.getDrawEventsFilters(),
        operatorApi.getDashboard(),
      ]);
      
      setOperatorName(dashboardData?.operator?.name || dashboardData?.user?.name || '');
      setChainIntegrity(dashboardData?.system?.chain_integrity || null);
      setDashboardStats(dashboardData?.stats || null);
      setFilterOptions(filtersData);
    } catch (error: any) {
      console.error('Failed to load filter options:', error);
    }
  };

  const loadEvents = async () => {
    try {
      setLoading(true);
      const params: any = {
        page,
        per_page: pageSize,
      };

      if (filters.event_type) params.event_type = filters.event_type;
      if (filters.competition_id) params.competition_id = filters.competition_id;
      if (filters.actor_type) params.actor_type = filters.actor_type;
      if (filters.from_date) params.from_date = filters.from_date;
      if (filters.to_date) params.to_date = filters.to_date;

      const eventsData = await operatorApi.getDrawEvents(params);

      const events = eventsData.data || [];
      
      // Enrich events with competition info if available
      const enrichedEvents = events.map((event: DrawEvent) => ({
        ...event,
        competition_title: event.competition?.name || 'N/A',
        competition_id: event.competition?.id,
      }));

      setEvents(enrichedEvents);
      setPagination({
        current_page: eventsData.current_page || 1,
        per_page: eventsData.per_page || 25,
        total: eventsData.total || 0,
        last_page: eventsData.last_page || 1,
        from: eventsData.from || 0,
        to: eventsData.to || 0,
      });
      setLoading(false);
    } catch (error: any) {
      console.error('[Events] Failed to load events:', error);
      if (error.status === 401) {
        await handleLogout();
      }
      setLoading(false);
    }
  };

  const updateURL = () => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', page.toString());
    if (pageSize !== 25) params.set('pageSize', pageSize.toString());
    if (filters.event_type) params.set('event', filters.event_type);
    if (filters.competition_id) params.set('competition', filters.competition_id);
    if (filters.actor_type) params.set('actor', filters.actor_type);
    if (filters.from_date) params.set('from', filters.from_date);
    if (filters.to_date) params.set('to', filters.to_date);

    const queryString = params.toString();
    router.push(`/operator/events${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  const handleVerifyChain = async () => {
    try {
      setVerifyingChain(true);
      const result = await operatorApi.verifyChain();
      setChainStatus(result);
      setShowChainModal(true);
    } catch (error: any) {
      console.error('Chain verification failed:', error);
      alert('Failed to verify chain: ' + error.message);
    } finally {
      setVerifyingChain(false);
    }
  };

  const handleExportCsv = async () => {
    try {
      setExportingCsv(true);
      
      // Fetch all events with current filters
      const params: any = {
        page: 1,
        per_page: 10000, // Get all events
      };
      
      if (filters.event_type) params.event_type = filters.event_type;
      if (filters.competition_id) params.competition_id = filters.competition_id;
      if (filters.actor_type) params.actor_type = filters.actor_type;
      if (filters.from_date) params.from_date = filters.from_date;
      if (filters.to_date) params.to_date = filters.to_date;

      const eventsData = await operatorApi.getDrawEvents(params);
      const allEvents = eventsData.data || [];

      // Convert to CSV
      const csvHeaders = ['ID', 'Event Type', 'Competition', 'Actor', 'Chain Position', 'Timestamp', 'Event Hash'];
      const csvRows = allEvents.map((event: any) => [
        event.id,
        event.event_type,
        event.competition?.name || 'N/A',
        event.actor_type || 'system',
        event.sequence,
        new Date(event.created_at).toISOString(),
        event.event_hash,
      ]);

      const csvContent = [
        csvHeaders.join(','),
        ...csvRows.map((row: any[]) => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      ].join('\n');

      // Download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `draw-events-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
    } catch (error: any) {
      console.error('CSV export failed:', error);
      alert('Failed to export CSV: ' + error.message);
    } finally {
      setExportingCsv(false);
    }
  };

  const handleExportJson = async () => {
    try {
      setExportingJson(true);
      
      // Fetch all events with current filters
      const params: any = {
        page: 1,
        per_page: 10000, // Get all events
      };
      
      if (filters.event_type) params.event_type = filters.event_type;
      if (filters.competition_id) params.competition_id = filters.competition_id;
      if (filters.actor_type) params.actor_type = filters.actor_type;
      if (filters.from_date) params.from_date = filters.from_date;
      if (filters.to_date) params.to_date = filters.to_date;

      const eventsData = await operatorApi.getDrawEvents(params);
      const allEvents = eventsData.data || [];

      // Download JSON file
      const jsonContent = JSON.stringify(allEvents, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `draw-events-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
    } catch (error: any) {
      console.error('JSON export failed:', error);
      alert('Failed to export JSON: ' + error.message);
    } finally {
      setExportingJson(false);
    }
  };

  const filterByCompetition = (competitionIdentifier: string | undefined) => {
    if (competitionIdentifier) {
      setFilters({ ...filters, competition_id: competitionIdentifier });
      setPage(1);
    }
  };

  const removeFilter = (filterKey: string) => {
    setFilters({ ...filters, [filterKey]: '' });
    setPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      event_type: '',
      competition_id: '',
      actor_type: '',
      from_date: '',
      to_date: '',
    });
    setPage(1);
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const getCompetitionName = (competitionIdentifier: string) => {
    // Try to match by ID
    const comp = filterOptions.competitions.find((c: any) => 
      c.id === competitionIdentifier || c.id.toString() === competitionIdentifier
    );
    return comp?.name || 'Unknown';
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    const lastPage = pagination.last_page;

    if (lastPage <= maxVisible + 2) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= maxVisible; i++) pages.push(i);
        pages.push('ellipsis-end');
        pages.push(lastPage);
      } else if (page >= lastPage - 2) {
        pages.push(1);
        pages.push('ellipsis-start');
        for (let i = lastPage - maxVisible + 1; i <= lastPage; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('ellipsis-start');
        for (let i = page - 1; i <= page + 1; i++) pages.push(i);
        pages.push('ellipsis-end');
        pages.push(lastPage);
      }
    }

    return pages;
  };

  if (loading && events.length === 0) {
    return <DashboardLoading message="Loading events..." />;
  }

  return (
    <DashboardShell
      navItems={operatorNavItems}
      userRole="operator"
      userName={operatorName}
      onLogout={handleLogout}
    >
      <div className="space-y-6">
          <DashboardHeader title="Event chain">
              <div className="flex gap-2">
                  <Button
                      variant="outline"
                      size="sm"
                      onClick={handleVerifyChain}
                      disabled={verifyingChain}
                  >
                      {verifyingChain ? (
                          <>
                              Verifying...
                          </>
                      ) : (
                          <>
                              Verify Integrity
                          </>
                      )}
                  </Button>
                  <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExportCsv}
                      disabled={exportingCsv || loading}
                  >
                      {exportingCsv ? (
                          <>
                              Exporting...
                          </>
                      ) : (
                          <>
                              Export CSV
                          </>
                      )}
                  </Button>
                  <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExportJson}
                      disabled={exportingJson || loading}
                  >
                      {exportingJson ? (
                          <>
                              Exporting...
                          </>
                      ) : (
                          <>
                              Export JSON
                          </>
                      )}
                  </Button>
              </div>
          </DashboardHeader>

          {/* Explainer Banner */}
          <div className="px-4 lg:px-6">
            <DismissibleAlert
              id="events-explainer"
              title="What are events?"
              description="Every action in CAFAAS (competitions created, entries added, draws run) is logged as an event. These events are cryptographically linked in a chain to prevent tampering. Think of it as a tamper-proof audit log."
            />
          </div>

          {/* Metrics Cards - 2 cards */}
          <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2">
            <ComplianceScoreCard
              title="Total events"
              value={(dashboardStats?.api_events_total || 0).toLocaleString()}
              status="neutral"
              icon={Activity}
              footer="All time"
            />

            <ComplianceScoreCard
              title="Chain integrity"
              value={
                chainIntegrity?.chain_status === 'valid' 
                  ? 'Verified'
                  : chainIntegrity?.chain_status === 'invalid' 
                    ? 'Invalid' 
                    : chainIntegrity?.chain_status === 'building'
                      ? 'Building...'
                      : 'Verifying...'
              }
              status={chainIntegrity?.chain_status === 'valid' ? 'good' : chainIntegrity?.chain_status === 'invalid' ? 'critical' : 'neutral'}
              icon={ShieldCheck}
              footer={`${chainIntegrity?.verified_events || 0} of ${chainIntegrity?.total_events || 0} events verified`}
              helpText="Confirms your competition's audit records are securely linked and can't be changed. This ensures your draw results remain trustworthy."
            />
          </div>

          <div className="px-4 lg:px-6">
              <Card className="bg-card border-border">
                  <CardHeader>
                      <CardTitle className="leading-none font-semibold !text-base">Filters</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                          <div className="flex flex-col gap-1.5">
                              <Label htmlFor="event-filter" className="text-sm font-medium">Event Type</Label>
                              <Select value={filters.event_type || 'all'} onValueChange={(value) => { setFilters({ ...filters, event_type: value === 'all' ? '' : value }); setPage(1); }}>
                                  <SelectTrigger id="event-filter">
                                      <SelectValue placeholder="All Events" />
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem value="all">All Events</SelectItem>
                                      {filterOptions.event_types.map((type: string) => (
                                          <SelectItem key={type} value={type}>{getEventDisplayName(type)}</SelectItem>
                                      ))}
                                  </SelectContent>
                              </Select>
                          </div>

                          <div className="flex flex-col gap-1.5">
                              <Label htmlFor="competition-filter" className="text-sm font-medium">Competition</Label>
                              <Select value={filters.competition_id || 'all'} onValueChange={(value) => { setFilters({ ...filters, competition_id: value === 'all' ? '' : value }); setPage(1); }}>
                                  <SelectTrigger id="competition-filter">
                                      <SelectValue placeholder="All Competitions" />
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem value="all">All Competitions</SelectItem>
                                      {filterOptions.competitions.map((comp: any) => (
                                          <SelectItem key={comp.id} value={comp.id}>{comp.name}</SelectItem>
                                      ))}
                                  </SelectContent>
                              </Select>
                          </div>

                          <div className="flex flex-col gap-1.5">
                              <Label htmlFor="actor-filter" className="text-sm font-medium">Actor</Label>
                              <Select value={filters.actor_type || 'all'} onValueChange={(value) => { setFilters({ ...filters, actor_type: value === 'all' ? '' : value }); setPage(1); }}>
                                  <SelectTrigger id="actor-filter">
                                      <SelectValue placeholder="All Actors" />
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem value="all">All Actors</SelectItem>
                                      <SelectItem value="operator">Operator</SelectItem>
                                      <SelectItem value="system">System</SelectItem>
                                      <SelectItem value="user">User</SelectItem>
                                      <SelectItem value="admin">Admin</SelectItem>
                                  </SelectContent>
                              </Select>
                          </div>

                          <div className="flex flex-col gap-1.5">
                              <Label htmlFor="from-date" className="text-sm font-medium">From Date</Label>
                              <Input
                                  id="from-date"
                                  type="date"
                                  value={filters.from_date}
                                  onChange={(e) => { setFilters({ ...filters, from_date: e.target.value }); setPage(1); }}
                              />
                          </div>

                          <div className="flex flex-col gap-1.5">
                              <Label htmlFor="to-date" className="text-sm font-medium">To Date</Label>
                              <Input
                                  id="to-date"
                                  type="date"
                                  value={filters.to_date}
                                  onChange={(e) => { setFilters({ ...filters, to_date: e.target.value }); setPage(1); }}
                              />
                          </div>
                      </div>

                      {/* Active Filters */}
                      {hasActiveFilters && (
                          <div className="flex items-center gap-2 mt-4 flex-wrap">
                              <span className="text-sm text-muted-foreground">Active filters:</span>
                              {filters.event_type && (
                                  <Badge variant="secondary" className="gap-1">
                                      Event: {getEventDisplayName(filters.event_type)}
                                      <button onClick={() => removeFilter('event_type')} className="ml-1 hover:text-foreground">
                                          <X className="h-3 w-3" />
                                      </button>
                                  </Badge>
                              )}
                              {filters.competition_id && (
                                  <Badge variant="secondary" className="gap-1">
                                      Competition: {getCompetitionName(filters.competition_id)}
                                      <button onClick={() => removeFilter('competition_id')} className="ml-1 hover:text-foreground">
                                          <X className="h-3 w-3" />
                                      </button>
                                  </Badge>
                              )}
                              {filters.actor_type && (
                                  <Badge variant="secondary" className="gap-1">
                                      Actor: {filters.actor_type}
                                      <button onClick={() => removeFilter('actor_type')} className="ml-1 hover:text-foreground">
                                          <X className="h-3 w-3" />
                                      </button>
                                  </Badge>
                              )}
                              {filters.from_date && (
                                  <Badge variant="secondary" className="gap-1">
                                      From: {filters.from_date}
                                      <button onClick={() => removeFilter('from_date')} className="ml-1 hover:text-foreground">
                                          <X className="h-3 w-3" />
                                      </button>
                                  </Badge>
                              )}
                              {filters.to_date && (
                                  <Badge variant="secondary" className="gap-1">
                                      To: {filters.to_date}
                                      <button onClick={() => removeFilter('to_date')} className="ml-1 hover:text-foreground">
                                          <X className="h-3 w-3" />
                                      </button>
                                  </Badge>
                              )}
                              <Button variant="ghost" size="sm" onClick={clearAllFilters}>Clear All</Button>
                          </div>
                      )}
                  </CardContent>
              </Card>
          </div>


          <div className="px-4 lg:px-6">
              <Card>
                  <CardHeader>
                      <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-1.5">
                              <CardTitle className="leading-none font-semibold !text-base">Event log</CardTitle>
                              <CardDescription className="text-muted-foreground text-sm">
                                  Recent system activity across your competitions
                              </CardDescription>
                          </div>
                      </div>
                  </CardHeader>
                  <CardContent>
                      {events.length > 0 ? (
                          <>
                              <div className="overflow-x-auto">
                                  <Table>
                                      <TableHeader>
                                          <TableRow>
                                              <TableHead>
                                                  <div className="flex items-center">
                                                      <span>Chain Position</span>
                                                      <InfoTooltip>
                                                          Shows when this event happened in the overall audit timeline. Earlier numbers mean earlier events. This ensures the order can’t be altered.
                                                      </InfoTooltip>
                                                  </div>
                                              </TableHead>
                                              <TableHead>Event Type</TableHead>
                                              <TableHead>Competition</TableHead>
                                              <TableHead>Actor</TableHead>
                                              <TableHead>Timestamp</TableHead>
                                              <TableHead>
                                                  <div className="flex items-center">
                                                      <span>Integrity</span>
                                                      <InfoTooltip>
                                                          Valid means the event is securely chained and cannot be altered. Pending means it's still waiting to be added.
                                                      </InfoTooltip>
                                                  </div>
                                              </TableHead>
                                              <TableHead></TableHead>
                                          </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                          {events.map((event) => (
                                              <TableRow key={event.id}>
                                                  <TableCell>
                                                    <Badge variant="outline">
                                                      {formatChainPosition(event.sequence)}
                                                    </Badge>
                                                  </TableCell>
                                                  <TableCell>
                                                      {getEventDisplayName(event.event_type)}
                                                  </TableCell>
                                                  <TableCell
                                                      className="max-w-[200px] truncate cursor-pointer hover:underline"
                                                      onClick={() => filterByCompetition(event.competition_id)}
                                                      title="Click to filter by this competition"
                                                  >
                                                      {event.competition_title}
                                                  </TableCell>
                                                  <TableCell>
                                                      <Badge variant="outline">
                                                          {(event.actor_type || 'system')}
                                                      </Badge>
                                                  </TableCell>
                                                  <TableCell>
                                                      {dateFormatters.shortDateTime(event.created_at)}
                                                  </TableCell>
                                                  <TableCell>
                                                      <IndicatorBadge
                                                          color={event.is_chained ? 'green': 'yellow'}
                                                          text={event.is_chained ? 'Valid' : 'Pending'}
                                                      />
                                                  </TableCell>
                                                  <TableCell>
                                                      <OperatorActionsMenu
                                                          actions={[
                                                              {
                                                                  label: 'Details',
                                                                  onSelect: () => eventDialog.open(event),
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
                                onPageSizeChange={handlePageSizeChange}
                                pageSizeOptions={[10, 25, 100, 250]}
                              />
                          </>
                      ) : (
                          <div className="text-center py-12">
                              <h3 className="text-lg font-medium mb-2 text-foreground">No events found</h3>
                              <p className="text-sm text-muted-foreground">
                                  {hasActiveFilters ? 'Try adjusting your filters' : 'Events will appear here once your competitions become active.'}
                              </p>
                          </div>
                      )}
                  </CardContent>
              </Card>
          </div>

      </div>

      {/* Event Details Dialog */}
      <EventDetailsDialog
        event={eventDialog.item}
        open={eventDialog.isOpen}
        onOpenChange={(open) => !open && eventDialog.close()}
      />

      {/* Chain Verification Modal */}
      {showChainModal && chainStatus && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowChainModal(false)}>
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="p-6 border-b border-slate-800 bg-slate-900/50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Chain Integrity Verification
                  </h2>
                  <div className="flex items-center gap-3">
                    {chainStatus.chain_status === 'valid' ? (
                      <div className="flex items-center gap-2 text-green-500">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-lg font-semibold">Chain Valid</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-brand-cobalt">
                        <AlertTriangle className="h-5 w-5" />
                        <span className="text-lg font-semibold">Chain Invalid</span>
                      </div>
                    )}
                    <span className="text-sm text-muted-foreground">
                      Verified at {new Date(chainStatus.verified_at).toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowChainModal(false)}
                  className="text-muted-foreground hover:text-white text-2xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Summary Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-black/50 p-4 rounded border border-slate-800">
                  <label className="text-sm font-medium text-muted-foreground block mb-1">Total Events</label>
                  <p className="text-2xl font-bold text-white">
                    {chainStatus.summary?.total_events || chainStatus.total_events || 0}
                  </p>
                </div>
                <div className="bg-black/50 p-4 rounded border border-slate-800">
                  <label className="text-sm font-medium text-muted-foreground block mb-1">Verified</label>
                  <p className="text-2xl font-bold text-green-500">
                    {chainStatus.summary?.verified_events || chainStatus.verified_events || 0}
                  </p>
                </div>
                <div className="bg-black/50 p-4 rounded border border-slate-800">
                  <label className="text-sm font-medium text-muted-foreground block mb-1">Pending</label>
                  <p className="text-2xl font-bold text-yellow-500">
                    {chainStatus.summary?.unchained_events || chainStatus.unchained_events || 0}
                  </p>
                </div>
                <div className="bg-black/50 p-4 rounded border border-slate-800">
                  <label className="text-sm font-medium text-muted-foreground block mb-1">Failed</label>
                  <p className="text-2xl font-bold text-brand-cobalt">
                    {chainStatus.summary?.failed_events || chainStatus.failed_events || 0}
                  </p>
                </div>
              </div>

              {/* Issues */}
              {chainStatus.chain_status !== 'valid' && (
                <div className="space-y-4">
                  {(chainStatus.broken_links && chainStatus.broken_links.length > 0) && (
                    <div>
                      <h3 className="text-lg font-semibold text-white border-b border-slate-800 pb-2 mb-3">
                        Broken Links ({chainStatus.broken_links.length})
                      </h3>
                      <div className="space-y-2">
                        {chainStatus.broken_links.map((link: any, idx: number) => (
                          <div key={idx} className="bg-red-950/20 border border-red-900/30 rounded p-3">
                            <p className="text-sm text-white mb-2">
                              Event <code className="font-mono">#{link.sequence}</code> - {link.event_type}
                            </p>
                            <p className="text-xs text-red-400 font-mono break-all">
                              Expected: {link.expected_previous_hash || 'null'}
                            </p>
                            <p className="text-xs text-red-400 font-mono break-all">
                              Actual: {link.actual_previous_hash || 'null'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(chainStatus.invalid_hashes && chainStatus.invalid_hashes.length > 0) && (
                    <div>
                      <h3 className="text-lg font-semibold text-white border-b border-slate-800 pb-2 mb-3">
                        Invalid Hashes ({chainStatus.invalid_hashes.length})
                      </h3>
                      <div className="space-y-2">
                        {chainStatus.invalid_hashes.map((hash: any, idx: number) => (
                          <div key={idx} className="bg-red-950/20 border border-red-900/30 rounded p-3">
                            <p className="text-sm text-white mb-2">
                              Event <code className="font-mono">#{hash.sequence}</code> - {hash.event_type}
                            </p>
                            <p className="text-xs text-red-400 font-mono break-all">
                              Expected: {hash.expected_hash}
                            </p>
                            <p className="text-xs text-red-400 font-mono break-all">
                              Actual: {hash.actual_hash}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Success Message */}
              {chainStatus.chain_status === 'valid' && (
                <div className="bg-green-950/20 border border-green-900/30 rounded p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-white font-medium mb-1">Chain Integrity Verified</p>
                      <p className="text-sm text-muted-foreground">
                        All events have been verified and the chain is intact. No tampering detected.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-end">
              <button
                onClick={() => setShowChainModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
