'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { publicApi } from '@/lib/api/client';
import { Download, Shield, ChevronLeft, ChevronRight, Copy, Check, X, Filter as FilterIcon, List, GitBranch } from 'lucide-react';

interface DrawAudit {
  id: number;
  draw_id: string;
  operator: {
    uuid: string;
    name: string;
    slug: string;
    url?: string;
  } | null;
  competition: {
    uuid: string;
    name: string;
    slug: string;
  } | null;
  prize_name: string | null;
  drawn_at_utc: string;
  total_entries: number;
  winning_ticket: number;
  pool_hash: string;
  signature_hash: string;
  previous_signature_hash: string | null;
}

interface Operator {
  uuid: string;
  name: string;
  slug: string;
  url?: string;
}

interface Competition {
  uuid: string;
  name: string;
  slug: string;
}

interface Prize {
  id: string;
  name: string;
}

export default function DrawAuditsPage() {
  const searchParams = useSearchParams();
  const [audits, setAudits] = useState<DrawAudit[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [selectedOperator, setSelectedOperator] = useState<string>('all');
  const [selectedCompetition, setSelectedCompetition] = useState<string>('all');
  const [selectedPrize, setSelectedPrize] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [loadingCompetitions, setLoadingCompetitions] = useState(false);
  const [loadingPrizes, setLoadingPrizes] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'chain'>('table');

  // Initialize from URL params
  useEffect(() => {
    const operator = searchParams.get('operator') || 'all';
    const competition = searchParams.get('competition') || 'all';
    const prize = searchParams.get('prize') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    
    setSelectedOperator(operator);
    setSelectedCompetition(competition);
    setSelectedPrize(prize);
    setCurrentPage(page);
  }, [searchParams]);

  // Load operators on mount
  useEffect(() => {
    loadOperators();
  }, []);

  // Load competitions when operator changes
  useEffect(() => {
    if (selectedOperator !== 'all') {
      loadCompetitions(selectedOperator);
    } else {
      setCompetitions([]);
      setSelectedCompetition('all');
    }
  }, [selectedOperator]);

  // Load prizes when operator or competition changes
  useEffect(() => {
    if (selectedOperator !== 'all' || selectedCompetition !== 'all') {
      loadPrizes(
        selectedOperator !== 'all' ? selectedOperator : undefined,
        selectedCompetition !== 'all' ? selectedCompetition : undefined
      );
    } else {
      setPrizes([]);
      setSelectedPrize('all');
    }
  }, [selectedOperator, selectedCompetition]);

  // Load audits when filters change
  useEffect(() => {
    loadAudits(
      selectedOperator !== 'all' ? selectedOperator : undefined,
      selectedCompetition !== 'all' ? selectedCompetition : undefined,
      selectedPrize !== 'all' ? selectedPrize : undefined,
      currentPage
    );
  }, [selectedOperator, selectedCompetition, selectedPrize, currentPage]);

  const loadOperators = async () => {
    try {
      const response = await publicApi.getOperators();
      setOperators(response.data || []);
    } catch (err) {
      // Error loading operators
    }
  };

  const loadCompetitions = async (operatorUuid: string) => {
    setLoadingCompetitions(true);
    try {
      const response = await publicApi.getPublicCompetitions(operatorUuid);
      setCompetitions(response.data || []);
    } catch (err) {
      // Error loading competitions
    } finally {
      setLoadingCompetitions(false);
    }
  };

  const loadPrizes = async (operatorUuid?: string, competitionUuid?: string) => {
    setLoadingPrizes(true);
    try {
      const response = await publicApi.getPublicPrizes(operatorUuid, competitionUuid);
      setPrizes(response.data || []);
    } catch (err) {
      // Error loading prizes
    } finally {
      setLoadingPrizes(false);
    }
  };

  const loadAudits = async (operator?: string, competition?: string, prize?: string, page: number = 1) => {
    setLoading(true);
    try {
      const response = await publicApi.getDrawAudits(operator, competition, prize, page);
      setAudits(response.data || []);
      setCurrentPage(response.meta?.current_page || 1);
      setTotalPages(response.meta?.last_page || 1);
      setTotalItems(response.meta?.total || 0);
    } catch (err) {
      // Error loading audits
    } finally {
      setLoading(false);
    }
  };

  const updateURL = () => {
    const params = new URLSearchParams();
    if (selectedOperator !== 'all') params.set('operator', selectedOperator);
    if (selectedCompetition !== 'all') params.set('competition', selectedCompetition);
    if (selectedPrize !== 'all') params.set('prize', selectedPrize);
    if (currentPage > 1) params.set('page', currentPage.toString());
    
    const queryString = params.toString();
    window.history.replaceState({}, '', `/audits${queryString ? `?${queryString}` : ''}`);
  };

  useEffect(() => {
    updateURL();
  }, [selectedOperator, selectedCompetition, selectedPrize, currentPage]);

  const handleOperatorChange = (value: string) => {
    setSelectedOperator(value);
    setSelectedCompetition('all');
    setSelectedPrize('all');
    setCurrentPage(1);
  };

  const handleCompetitionChange = (value: string) => {
    setSelectedCompetition(value);
    setSelectedPrize('all');
    setCurrentPage(1);
  };

  const handlePrizeChange = (value: string) => {
    setSelectedPrize(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedOperator('all');
    setSelectedCompetition('all');
    setSelectedPrize('all');
    setCurrentPage(1);
  };

  const handleDownloadJson = async () => {
    try {
      const operatorUuid = selectedOperator !== 'all' ? selectedOperator : undefined;
      const competitionUuid = selectedCompetition !== 'all' ? selectedCompetition : undefined;
      const prizeId = selectedPrize !== 'all' ? selectedPrize : undefined;
      const data = await publicApi.downloadDrawAuditsJson(operatorUuid, competitionUuid, prizeId);
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `draw-audits-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      // Error downloading JSON
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(id);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const truncateHash = (hash: string, length: number = 16) => {
    if (!hash) return '';
    return hash.length > length ? `${hash.substring(0, length)}...` : hash;
  };

  const hasActiveFilters = selectedOperator !== 'all' || selectedCompetition !== 'all' || selectedPrize !== 'all';
  const activeFilterCount = [selectedOperator !== 'all', selectedCompetition !== 'all', selectedPrize !== 'all'].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand-cobalt/20 selection:text-brand-cobalt">
      <SiteHeader />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-24 bg-zinc-900/30 border-b border-white/5 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cobalt/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                Draw Audit Log
              </h1>
              <p className="text-xl text-zinc-400 leading-relaxed mb-8">
                Complete transparency log of all competition draws. <br/>
                Every draw is cryptographically signed and linked in an unbreakable chain.
              </p>
              
              <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-black/40 border border-white/10 rounded-full text-sm text-zinc-400">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      Live Feed
                  </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-black sticky top-16 z-30 border-b border-white/5 shadow-xl">
          <div className="container mx-auto px-6 max-w-7xl">
             <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    <Select value={selectedOperator} onValueChange={handleOperatorChange}>
                      <SelectTrigger className="w-full sm:w-[200px] bg-zinc-900 border-white/10 text-white focus:ring-brand-cobalt/50 h-10">
                        <SelectValue placeholder="All Operators" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-white/10 text-white">
                        <SelectItem value="all">All Operators</SelectItem>
                        {operators.map((op) => (
                          <SelectItem key={op.uuid} value={op.uuid} className="focus:bg-zinc-800 cursor-pointer">
                            {op.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select 
                      value={selectedCompetition} 
                      onValueChange={handleCompetitionChange}
                      disabled={selectedOperator === 'all' || loadingCompetitions}
                    >
                      <SelectTrigger className="w-full sm:w-[200px] bg-zinc-900 border-white/10 text-white focus:ring-brand-cobalt/50 h-10 disabled:opacity-50">
                        <SelectValue placeholder="All Competitions" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-white/10 text-white">
                        <SelectItem value="all">All Competitions</SelectItem>
                        {competitions.map((comp) => (
                          <SelectItem key={comp.uuid} value={comp.uuid} className="focus:bg-zinc-800 cursor-pointer">
                            {comp.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                </div>

                {/* View Toggles & Actions */}
                <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
                     <div className="flex items-center bg-zinc-900 rounded-lg p-1 border border-white/10">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setViewMode('table')}
                          className={`h-8 px-3 rounded-md transition-all ${viewMode === 'table' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-white'}`}
                        >
                          <List className="mr-2 h-4 w-4" />
                          Table
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setViewMode('chain')}
                          className={`h-8 px-3 rounded-md transition-all ${viewMode === 'chain' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-white'}`}
                        >
                          <GitBranch className="mr-2 h-4 w-4" />
                          Chain
                        </Button>
                     </div>
                     
                    {hasActiveFilters && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleClearFilters}
                          className="text-zinc-500 hover:text-white h-9"
                        >
                          <X className="mr-1 h-3 w-3" />
                          Clear
                        </Button>
                    )}
                </div>
             </div>
          </div>
        </section>

        {/* Chain View */}
        {viewMode === 'chain' && (
          <section className="py-12 bg-black min-h-[60vh]">
            <div className="container mx-auto px-6 max-w-4xl">
              {loading ? (
                <div className="flex items-center justify-center py-24">
                  <Loader2 className="h-10 w-10 animate-spin text-brand-cobalt" />
                </div>
              ) : audits.length === 0 ? (
                <div className="text-center py-24 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
                    <p className="text-zinc-500">No audits found matching your filters.</p>
                </div>
              ) : (
                <div className="space-y-0 relative pl-8 border-l-2 border-zinc-800 ml-4 md:ml-0">
                  {audits.map((audit, index) => {
                    const isLinked = audit.previous_signature_hash && 
                                     index < audits.length - 1 && 
                                     audits[index + 1].signature_hash === audit.previous_signature_hash;
                    
                    return (
                      <div key={audit.id} className="relative pb-12 last:pb-0 group">
                        {/* Dot on timeline */}
                        <div className="absolute -left-[41px] top-0 h-5 w-5 rounded-full bg-black border-4 border-zinc-800 group-hover:border-brand-cobalt transition-colors z-10" />
                        
                        <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 hover:bg-zinc-900 transition-colors">
                           <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{audit.competition?.name || 'Unknown Competition'}</h3>
                                    <p className="text-zinc-400 text-sm">
                                        by <span className="text-zinc-300">{audit.operator?.name}</span> • Draw #{audit.draw_id}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-zinc-300 font-mono text-sm">{new Date(audit.drawn_at_utc).toLocaleString()}</p>
                                    <Badge variant="outline" className="mt-2 border-green-500/20 text-green-500 bg-green-500/10">
                                        <Shield className="h-3 w-3 mr-1" /> Verified
                                    </Badge>
                                </div>
                           </div>

                           <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-black/40 rounded-lg border border-white/5">
                                <div>
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Total Entries</p>
                                    <p className="font-mono text-white text-lg">{audit.total_entries.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Winning Ticket</p>
                                    <p className="font-mono text-green-500 text-lg">#{audit.winning_ticket}</p>
                                </div>
                           </div>

                           <div className="space-y-3 font-mono text-xs">
                                <div>
                                    <p className="text-zinc-600 mb-1">Signature Hash (This Event)</p>
                                    <div className="flex items-center gap-2 bg-black/60 p-2 rounded border border-white/5 text-zinc-400 break-all">
                                        <div className="h-2 w-2 rounded-full bg-brand-cobalt shrink-0" />
                                        {audit.signature_hash}
                                        <Button variant="ghost" size="icon" className="h-4 w-4 ml-auto hover:text-white" onClick={() => copyToClipboard(audit.signature_hash, `sig-${audit.id}`)}>
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                                {audit.previous_signature_hash && (
                                <div>
                                    <p className="text-zinc-600 mb-1">Linked Previous Hash</p>
                                    <div className="flex items-center gap-2 bg-black/60 p-2 rounded border border-white/5 text-zinc-500 break-all">
                                        <div className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
                                        {audit.previous_signature_hash}
                                    </div>
                                </div>
                                )}
                           </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
        <section className="py-12 bg-black min-h-[60vh]">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="border border-white/10 rounded-xl overflow-hidden bg-zinc-900/30">
                {loading ? (
                  <div className="flex items-center justify-center py-24">
                    <Loader2 className="h-10 w-10 animate-spin text-brand-cobalt" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-zinc-900/80">
                        <TableRow className="border-white/5 hover:bg-transparent">
                          <TableHead className="text-zinc-400 font-medium">Operator</TableHead>
                          <TableHead className="text-zinc-400 font-medium">Competition</TableHead>
                          <TableHead className="text-zinc-400 font-medium">Draw ID</TableHead>
                          <TableHead className="text-zinc-400 font-medium">Drawn At</TableHead>
                          <TableHead className="text-zinc-400 font-medium text-right">Entries</TableHead>
                          <TableHead className="text-zinc-400 font-medium text-right">Winner</TableHead>
                          <TableHead className="text-zinc-400 font-medium font-mono text-xs">Pool Hash</TableHead>
                          <TableHead className="text-zinc-400 font-medium font-mono text-xs">Signature</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {audits.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center text-zinc-500 py-12">
                              No draw audits found
                            </TableCell>
                          </TableRow>
                        ) : (
                          audits.map((audit) => (
                            <TableRow key={audit.id} className="border-white/5 hover:bg-white/5 transition-colors">
                              <TableCell className="font-medium text-white">
                                {audit.operator?.name || 'N/A'}
                              </TableCell>
                              <TableCell className="text-zinc-300">{audit.competition?.name || 'N/A'}</TableCell>
                              <TableCell className="font-mono text-xs text-zinc-500">{audit.draw_id}</TableCell>
                              <TableCell className="text-sm text-zinc-300">
                                {new Date(audit.drawn_at_utc).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="text-right text-zinc-300">
                                {audit.total_entries.toLocaleString()}
                              </TableCell>
                              <TableCell className="text-right text-green-500 font-mono font-bold">
                                #{audit.winning_ticket}
                              </TableCell>
                              <TableCell className="font-mono text-xs text-zinc-600">
                                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => copyToClipboard(audit.pool_hash, `pool-${audit.id}`)}>
                                  {truncateHash(audit.pool_hash)}
                                  <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </TableCell>
                              <TableCell className="font-mono text-xs text-brand-cobalt">
                                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => copyToClipboard(audit.signature_hash, `sig-${audit.id}`)}>
                                  {truncateHash(audit.signature_hash)}
                                  <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
            </div>

             {/* Pagination */}
             {totalPages > 1 && (
                  <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-6">
                    <div className="text-sm text-zinc-500">
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="border-white/10 bg-transparent hover:bg-white/5 text-white"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="border-white/10 bg-transparent hover:bg-white/5 text-white"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
            )}
          </div>
        </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
