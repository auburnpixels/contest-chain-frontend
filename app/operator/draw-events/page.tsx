'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { operatorApi, authApi, apiClient } from '@/lib/api/client';
import { Activity, LayoutDashboard, Trophy, Key, ShieldCheck, AlertTriangle, FileText, CheckCircle, Copy, X, ChevronLeft, ChevronRight, Settings, Eye } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard-shell';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {DashboardHeader} from "@/components/dashboard-header";
import {OperatorActionsMenu} from "@/components/operator-actions-menu";

// Helper function to map technical event types to friendly names
const getEventDisplayName = (eventType: string): string => {
  const mapping: Record<string, string> = {
    'operator.competition_created': 'Competition Created',
    'operator.draw_requested': 'Draw Triggered',
    'operator.api_request': 'API Request',
    'raffle.published': 'Competition Published',
    'raffle.closed': 'Competition Closed',
    'raffle.updated': 'Competition Updated',
    'entry.created': 'Entry Added',
    'entry.deleted': 'Entry Removed',
    'draw.started': 'Draw Started',
    'draw.completed': 'Draw Completed',
    'draw.seed_generated': 'Draw Seed Generated',
    'draw.randomization_run': 'Randomization Run',
    'draw.audit_created': 'Draw Audit Created',
    'complaint.submitted': 'Complaint Submitted',
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
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<any[]>([]);
  const [operatorName, setOperatorName] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [initialized, setInitialized] = useState(false);

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
    loadFilterOptions();
  }, []);

  useEffect(() => {
    if (initialized) {
      loadEvents();
    }
  }, [initialized, page, pageSize, filters.event_type, filters.competition_id, filters.actor_type, filters.from_date, filters.to_date]);

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
      const paginationData = eventsData.pagination || {};
      
      // Enrich events with competition info if available
      const enrichedEvents = events.map((event: any) => ({
        ...event,
        competition_title: event.competition?.title || 'N/A',
        competition_id: event.competition?.id,
      }));

      setEvents(enrichedEvents);
      setPagination(paginationData);
      setLoading(false);
    } catch (error: any) {
      console.error('Failed to load events:', error);
      
      if (error.message?.includes('TOKEN') || error.status === 401 || error.message?.includes('Unauthorized')) {
        router.push('/operator/login');
      } else {
        setLoading(false);
      }
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
    router.push(`/operator/draw-events${queryString ? `?${queryString}` : ''}`, { scroll: false });
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

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(label);
    setTimeout(() => setCopySuccess(''), 2000);
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

  const getCompetitionName = (competitionIdentifier: string) => {
    // Try to match by ID
    const comp = filterOptions.competitions.find((c: any) => 
      c.id === competitionIdentifier || c.id.toString() === competitionIdentifier
    );
    return comp?.title || 'Unknown';
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

  if (loading && events.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p className="text-lg text-muted-foreground animate-pulse">Loading events...</p>
      </div>
    );
  }

  return (
    <DashboardShell
      navItems={navItems}
      userRole="operator"
      userName={operatorName}
      onLogout={handleLogout}
    >
      <div className="space-y-6">
          <DashboardHeader title="Events" />

          <div className="px-4 lg:px-6">
              <Card className="bg-card border-border">
                  <CardHeader>
                      <CardTitle className="leading-none font-semibold !text-base">Filters</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                          {/* Event Type Filter */}
                          <div className="space-y-2">
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

                          {/* Competition Filter */}
                          <div className="space-y-2">
                              <Label htmlFor="competition-filter" className="text-sm font-medium">Competition</Label>
                              <Select value={filters.competition_id || 'all'} onValueChange={(value) => { setFilters({ ...filters, competition_id: value === 'all' ? '' : value }); setPage(1); }}>
                                  <SelectTrigger id="competition-filter">
                                      <SelectValue placeholder="All Competitions" />
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem value="all">All Competitions</SelectItem>
                                      {filterOptions.competitions.map((comp: any) => (
                                          <SelectItem key={comp.id} value={comp.id}>{comp.title}</SelectItem>
                                      ))}
                                  </SelectContent>
                              </Select>
                          </div>

                          {/* Actor Filter */}
                          <div className="space-y-2">
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

                          {/* From Date */}
                          <div className="space-y-2">
                              <Label htmlFor="from-date" className="text-sm font-medium">From Date</Label>
                              <Input
                                  id="from-date"
                                  type="date"
                                  value={filters.from_date}
                                  onChange={(e) => { setFilters({ ...filters, from_date: e.target.value }); setPage(1); }}
                              />
                          </div>

                          {/* To Date */}
                          <div className="space-y-2">
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
                              <CardTitle className="leading-none font-semibold !text-base">Event Log</CardTitle>
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
                                              <TableHead>ID</TableHead>
                                              <TableHead>Event</TableHead>
                                              <TableHead>Competition</TableHead>
                                              <TableHead>Actor</TableHead>
                                              <TableHead>Chain Position</TableHead>
                                              <TableHead>Timestamp</TableHead>
                                              <TableHead>Integrity</TableHead>
                                              <TableHead></TableHead>
                                          </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                          {events.map((event: any) => (
                                              <TableRow key={event.id}>
                                                  <TableCell>
                                                      <code className="text-xs text-muted-foreground font-mono">
                                                          {event.id?.toString().substring(0, 8)}...
                                                      </code>
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
                                                      {(event.actor_type || 'system')}
                                                  </TableCell>
                                                  <TableCell>
                                                    <span>
                                                      {formatChainPosition(event.sequence)}
                                                    </span>
                                                  </TableCell>
                                                  <TableCell>
                                                      {new Date(event.created_at).toLocaleString()}
                                                  </TableCell>
                                                  <TableCell>
                                                      <div className="flex items-center gap-1.5 text-green-500">
                                                          <span className="text-xs font-medium">Valid</span>
                                                      </div>
                                                  </TableCell>
                                                  <TableCell>
                                                      <OperatorActionsMenu
                                                          actions={[
                                                              {
                                                                  label: 'Details',
                                                                  icon: Eye,
                                                                  onSelect: () => {
                                                                      setSelectedEvent(event);
                                                                      setShowModal(true);
                                                                  },
                                                              },
                                                          ]}
                                                      />
                                                  </TableCell>
                                              </TableRow>
                                          ))}
                                      </TableBody>
                                  </Table>
                              </div>

                              {/* Pagination */}
                              <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                                  <div className="text-sm text-muted-foreground">
                                      Showing {pagination.from || 0} to {pagination.to || 0} of {pagination.total} events
                                  </div>

                                  <div className="flex items-center gap-2">
                                      <Button
                                          variant="outline"
                                          size="sm"
                                          disabled={page === 1}
                                          onClick={() => setPage(page - 1)}
                                      >
                                          <ChevronLeft className="h-4 w-4" />
                                          Previous
                                      </Button>

                                      {getPageNumbers().map((pageNum, idx) => (
                                          typeof pageNum === 'string' ? (
                                              <span key={pageNum} className="px-2 text-muted-foreground">...</span>
                                          ) : (
                                              <Button
                                                  key={pageNum}
                                                  variant={page === pageNum ? 'default' : 'outline'}
                                                  size="sm"
                                                  onClick={() => setPage(pageNum as number)}
                                                  className="min-w-[2.5rem]"
                                              >
                                                  {pageNum}
                                              </Button>
                                          )
                                      ))}

                                      <Button
                                          variant="outline"
                                          size="sm"
                                          disabled={page === pagination.last_page}
                                          onClick={() => setPage(page + 1)}
                                      >
                                          Next
                                          <ChevronRight className="h-4 w-4" />
                                      </Button>
                                  </div>

                                  <div className="flex items-center gap-2">
                                      <Label htmlFor="page-size" className="text-sm whitespace-nowrap">Per page:</Label>
                                      <Select value={pageSize.toString()} onValueChange={(value) => { setPageSize(parseInt(value)); setPage(1); }}>
                                          <SelectTrigger id="page-size" className="w-[100px]">
                                              <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                              <SelectItem value="10">10</SelectItem>
                                              <SelectItem value="25">25</SelectItem>
                                              <SelectItem value="100">100</SelectItem>
                                              <SelectItem value="250">250</SelectItem>
                                          </SelectContent>
                                      </Select>
                                  </div>
                              </div>
                          </>
                      ) : (
                          <div className="text-center py-12">
                              <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
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

      {/* Event Details Modal */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="p-6 border-b border-slate-800 bg-slate-900/50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {getEventDisplayName(selectedEvent.event_type)}
                  </h2>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-400">
                      Event {formatChainPosition(selectedEvent.sequence)}
                    </span>
                    <div className="flex items-center gap-1.5 text-green-500">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Valid</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-slate-400 hover:text-white text-2xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Cryptographic Verification */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-slate-800 pb-2">
                  Cryptographic Verification
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-slate-400 mb-1.5 block">Event Hash</label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-green-400 font-mono text-xs break-all bg-green-950/20 p-3 rounded border border-green-900/30">
                        {selectedEvent.event_hash}
                      </code>
                      <button
                        onClick={() => copyToClipboard(selectedEvent.event_hash, 'Event Hash')}
                        className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                        title="Copy hash"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-400 mb-1.5 block">Previous Event Hash</label>
                    {selectedEvent.previous_event_hash ? (
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-blue-400 font-mono text-xs break-all bg-blue-950/20 p-3 rounded border border-blue-900/30">
                          {selectedEvent.previous_event_hash}
                        </code>
                        <button
                          onClick={() => copyToClipboard(selectedEvent.previous_event_hash, 'Previous Hash')}
                          className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                          title="Copy hash"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-slate-500 italic text-sm bg-slate-950/50 p-3 rounded border border-slate-800">
                        Genesis Event (First in chain)
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-400 mb-1.5 block">Chain Position</label>
                      <p className="text-white font-mono text-sm bg-slate-950/50 p-2 rounded border border-slate-800">
                        {formatChainPosition(selectedEvent.sequence)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-400 mb-1.5 block">Event ID</label>
                      <p className="text-white font-mono text-xs bg-slate-950/50 p-2 rounded border border-slate-800 break-all">
                        {selectedEvent.id}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-slate-800 pb-2">
                  Event Information
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-400 mb-1.5 block">Event Type</label>
                    <p className="text-white text-sm bg-slate-950/50 p-2 rounded border border-slate-800">
                      <code className="text-xs">{selectedEvent.event_type}</code>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-400 mb-1.5 block">Actor</label>
                    <p className="text-white text-sm bg-slate-950/50 p-2 rounded border border-slate-800">
                      {selectedEvent.actor_type || 'system'}
                      {selectedEvent.actor_id && ` (ID: ${selectedEvent.actor_id})`}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-400 mb-1.5 block">Competition</label>
                    <p className="text-white text-sm bg-slate-950/50 p-2 rounded border border-slate-800">
                      {selectedEvent.competition_title}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-400 mb-1.5 block">Timestamp</label>
                    <p className="text-white text-sm bg-slate-950/50 p-2 rounded border border-slate-800">
                      {new Date(selectedEvent.created_at).toLocaleString()}
                    </p>
                  </div>
                  {selectedEvent.ip_address && (
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-slate-400 mb-1.5 block">IP Address</label>
                      <p className="text-white text-sm font-mono bg-slate-950/50 p-2 rounded border border-slate-800">
                        {selectedEvent.ip_address}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Signed Payload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-slate-800 pb-2">
                  Signed Payload
                </h3>
                
                <div className="relative">
                  <pre className="text-white font-mono text-xs bg-black p-4 rounded border border-slate-800 overflow-x-auto max-h-64">
{JSON.stringify(selectedEvent.event_payload, null, 2)}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(selectedEvent.event_payload, null, 2), 'Payload')}
                    className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors"
                    title="Copy payload"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center">
              <div>
                {copySuccess && (
                  <span className="text-sm text-green-400">✓ {copySuccess} copied!</span>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => copyToClipboard(selectedEvent.event_hash, 'Event Hash')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-sm font-medium transition-colors"
                >
                  Copy Event Hash
                </button>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(selectedEvent, null, 2), 'Full Details')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-sm font-medium transition-colors"
                >
                  Copy Full Details
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
