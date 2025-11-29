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
import { Download, Shield, ChevronLeft, ChevronRight, Copy, Check, X, Filter as FilterIcon } from 'lucide-react';

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
    <div className="min-h-screen bg-white dark:bg-black font-sans selection:bg-brand-cobalt/20 selection:text-brand-cobalt">
      <SiteHeader />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50 transition-colors duration-300">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-white tracking-tight">
                Draw Audit Log
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Complete transparency log of all competition draws with cryptographic verification.
                Every draw is recorded with a tamper-evident signature and linked in an unbreakable chain.
              </p>
            </div>
          </div>
        </section>

        {/* Educational Content */}
        <section className="py-16 bg-white dark:bg-black transition-colors duration-300">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <Card className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-zinc-900 dark:text-white">
                  <Shield className="h-5 w-5 text-brand-cobalt" />
                  Why We Do This
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-zinc-600 dark:text-zinc-400">
                <p>
                  Every draw is recorded here the moment it happens. Once recorded, it&apos;s locked in forever
                  - we can&apos;t change the winner, the time, or who was eligible. It&apos;s like a receipt that
                  proves everything was fair. Use the filters below to view audits by specific operator, competition, or prize.
                </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="table-explained" className="border-zinc-200 dark:border-zinc-800">
                    <AccordionTrigger className="text-zinc-900 dark:text-white hover:text-brand-cobalt dark:hover:text-brand-cobalt">
                      What you&apos;ll see in the table
                    </AccordionTrigger>
                    <AccordionContent className="text-zinc-600 dark:text-zinc-400 space-y-2">
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong>Pool Hash</strong> - A unique fingerprint of all tickets that were eligible to win</li>
                        <li><strong>Signature</strong> - A tamper-proof seal that locks everything together (if we changed anything, this would break)</li>
                        <li><strong>Previous Signature</strong> - Links this draw to the previous one, forming an unbreakable chain</li>
                        <li><strong>Draw ID</strong> - A unique reference number for this specific draw</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="cant-change" className="border-zinc-200 dark:border-zinc-800">
                    <AccordionTrigger className="text-zinc-900 dark:text-white hover:text-brand-cobalt dark:hover:text-brand-cobalt">
                      Can&apos;t Cafaas just change this data?
                    </AccordionTrigger>
                    <AccordionContent className="text-zinc-600 dark:text-zinc-400 space-y-2">
                      <p>
                        Technically yes - but you&apos;d catch us immediately. If your ticket was in the draw,
                        you can verify it&apos;s in the Pool Hash. If we changed the winner or timestamp, the
                        Signature would break. Each draw also links to the previous one through the Previous
                        Signature field - forming a chain like blockchain. You can&apos;t insert, remove, or alter
                        any draw without breaking the entire chain.
                      </p>
                      <p>
                        Plus, this page is public the moment the draw happens - anyone can screenshot it,
                        archive it, or check it in real-time. Changing it would be obvious and destroy our
                        entire business.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="verify" className="border-zinc-200 dark:border-zinc-800">
                    <AccordionTrigger className="text-zinc-900 dark:text-white hover:text-brand-cobalt dark:hover:text-brand-cobalt">
                      How can I verify this myself? (Technical users)
                    </AccordionTrigger>
                    <AccordionContent className="text-zinc-600 dark:text-zinc-400 space-y-4">
                      <p className="text-sm italic">
                        Most people will never need these steps — but we make them public so anyone can
                        check the math.
                      </p>

                      <div>
                        <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">Step 1: Check your ticket was eligible</h4>
                        <p className="text-sm">
                          Contact us with the Draw ID and your ticket number. We&apos;ll provide a list of all
                          eligible ticket numbers and a mapping showing which ticket ID corresponds to your
                          ticket number.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">Step 2: Verify the Pool Hash</h4>
                        <p className="text-sm">
                          The Pool Hash is calculated from ticket IDs (not the visible numbers). Once you have
                          your ticket&apos;s ID from the mapping:
                        </p>
                        <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                          <li>Take all the ticket IDs from the eligible list</li>
                          <li>Sort them and join with commas: 1,2,3,4,5...</li>
                          <li>Calculate SHA256 hash - it should match the Pool Hash shown</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">Step 3: Verify the signature</h4>
                        <p className="text-sm">
                          Copy the data from the table: Competition UUID, Draw ID, timestamp, total entries,
                          winner ticket ID (not number), Pool Hash, and Previous Signature (if any). Combine
                          them with pipes (|) and calculate a SHA256 hash. It should match the Signature shown.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">Step 4: Verify the chain</h4>
                        <p className="text-sm">
                          Each audit&apos;s Previous Signature should match the Signature of the draw before it.
                          This creates an unbreakable chain - if any draw is altered, inserted, or removed,
                          the chain breaks and verification fails.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">Step 5: Download the JSON</h4>
                        <p className="text-sm">
                          Click &quot;Download JSON&quot; below to get machine-readable data you can verify
                          programmatically.
                        </p>
                      </div>

                      <p className="text-sm font-semibold text-brand-cobalt mt-4">
                        Bottom line: You don&apos;t have to take our word that draws are fair - the numbers prove it.
                        That&apos;s our commitment to transparency.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-zinc-50 dark:bg-zinc-900/50 transition-colors duration-300">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <Card className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FilterIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                    <CardTitle className="text-base text-zinc-900 dark:text-white">Filters</CardTitle>
                    {hasActiveFilters && (
                      <Badge variant="secondary" className="ml-2 bg-brand-cobalt/10 text-brand-cobalt border-brand-cobalt/20">
                        {activeFilterCount} active
                      </Badge>
                    )}
                  </div>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearFilters}
                      className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white h-8"
                    >
                      <X className="mr-1 h-3 w-3" />
                      Clear All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Operator</label>
                    <Select value={selectedOperator} onValueChange={handleOperatorChange}>
                      <SelectTrigger className="bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white">
                        <SelectValue placeholder="All Operators" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                        <SelectItem value="all">All Operators</SelectItem>
                        {operators.map((op) => (
                          <SelectItem key={op.uuid} value={op.uuid}>
                            {op.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Competition</label>
                    <Select 
                      value={selectedCompetition} 
                      onValueChange={handleCompetitionChange}
                      disabled={selectedOperator === 'all' || loadingCompetitions}
                    >
                      <SelectTrigger className="bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white disabled:opacity-50">
                        <SelectValue placeholder={
                          selectedOperator === 'all' 
                            ? 'Select operator first' 
                            : loadingCompetitions 
                            ? 'Loading...' 
                            : 'All Competitions'
                        } />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                        <SelectItem value="all">All Competitions</SelectItem>
                        {competitions.map((comp) => (
                          <SelectItem key={comp.uuid} value={comp.uuid}>
                            {comp.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Prize</label>
                    <Select 
                      value={selectedPrize} 
                      onValueChange={handlePrizeChange}
                      disabled={selectedOperator === 'all' || loadingPrizes}
                    >
                      <SelectTrigger className="bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white disabled:opacity-50">
                        <SelectValue placeholder={
                          selectedOperator === 'all'
                            ? 'Select operator first'
                            : loadingPrizes
                            ? 'Loading...'
                            : 'All Prizes'
                        } />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                        <SelectItem value="all">All Prizes</SelectItem>
                        {prizes.map((prize) => (
                          <SelectItem key={prize.id} value={prize.id}>
                            {prize.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleDownloadJson} className="bg-brand-cobalt hover:bg-brand-cobalt/90 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Download JSON
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Data Table Section */}
        <section className="py-8 bg-white dark:bg-black transition-colors duration-300">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <Card className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-cobalt"></div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                          <TableHead className="text-zinc-600 dark:text-zinc-400">Operator</TableHead>
                          <TableHead className="text-zinc-600 dark:text-zinc-400">Competition</TableHead>
                          <TableHead className="text-zinc-600 dark:text-zinc-400">Prize</TableHead>
                          <TableHead className="text-zinc-600 dark:text-zinc-400">Draw ID</TableHead>
                          <TableHead className="text-zinc-600 dark:text-zinc-400">Drawn At</TableHead>
                          <TableHead className="text-zinc-600 dark:text-zinc-400 text-right">Entries</TableHead>
                          <TableHead className="text-zinc-600 dark:text-zinc-400 text-right">Winner</TableHead>
                          <TableHead className="text-zinc-600 dark:text-zinc-400 font-mono">Pool Hash</TableHead>
                          <TableHead className="text-zinc-600 dark:text-zinc-400 font-mono">Signature</TableHead>
                          <TableHead className="text-zinc-600 dark:text-zinc-400 font-mono">Prev Signature</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {audits.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={10} className="text-center text-zinc-500 dark:text-zinc-400 py-12">
                              No draw audits found
                            </TableCell>
                          </TableRow>
                        ) : (
                          audits.map((audit) => (
                            <TableRow key={audit.id} className="border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                              <TableCell className="font-medium text-zinc-900 dark:text-white">
                                {audit.operator ? (
                                  audit.operator.url ? (
                                    <a
                                      href={audit.operator.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-brand-cobalt hover:text-brand-cobalt/80"
                                    >
                                      {audit.operator.name}
                                    </a>
                                  ) : (
                                    audit.operator.name
                                  )
                                ) : (
                                  <span className="text-zinc-400 dark:text-zinc-600">N/A</span>
                                )}
                              </TableCell>
                              <TableCell className="text-zinc-700 dark:text-zinc-300">{audit.competition?.name || 'N/A'}</TableCell>
                              <TableCell className="text-zinc-700 dark:text-zinc-300">{audit.prize_name || 'N/A'}</TableCell>
                              <TableCell className="font-mono text-xs text-zinc-700 dark:text-zinc-300">{audit.draw_id}</TableCell>
                              <TableCell className="text-sm text-zinc-700 dark:text-zinc-300">
                                {new Date(audit.drawn_at_utc).toLocaleString()}
                              </TableCell>
                              <TableCell className="text-right text-zinc-700 dark:text-zinc-300">
                                {audit.total_entries.toLocaleString()}
                              </TableCell>
                              <TableCell className="text-right text-green-600 dark:text-green-500 font-mono">
                                {audit.winning_ticket}
                              </TableCell>
                              <TableCell className="font-mono text-xs text-zinc-700 dark:text-zinc-300">
                                <div className="flex items-center gap-2">
                                  <span title={audit.pool_hash}>{truncateHash(audit.pool_hash)}</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    onClick={() => copyToClipboard(audit.pool_hash, `pool-${audit.id}`)}
                                  >
                                    {copiedHash === `pool-${audit.id}` ? (
                                      <Check className="h-3 w-3 text-green-600 dark:text-green-500" />
                                    ) : (
                                      <Copy className="h-3 w-3 text-zinc-400" />
                                    )}
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell className="font-mono text-xs text-brand-cobalt">
                                <div className="flex items-center gap-2">
                                  <span title={audit.signature_hash}>
                                    {truncateHash(audit.signature_hash)}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    onClick={() =>
                                      copyToClipboard(audit.signature_hash, `sig-${audit.id}`)
                                    }
                                  >
                                    {copiedHash === `sig-${audit.id}` ? (
                                      <Check className="h-3 w-3 text-green-600 dark:text-green-500" />
                                    ) : (
                                      <Copy className="h-3 w-3 text-zinc-400" />
                                    )}
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell className="font-mono text-xs text-zinc-400 dark:text-zinc-600">
                                {audit.previous_signature_hash ? (
                                  <div className="flex items-center gap-2">
                                    <span title={audit.previous_signature_hash}>
                                      {truncateHash(audit.previous_signature_hash)}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                      onClick={() =>
                                        copyToClipboard(
                                          audit.previous_signature_hash!,
                                          `prev-${audit.id}`
                                        )
                                      }
                                    >
                                      {copiedHash === `prev-${audit.id}` ? (
                                        <Check className="h-3 w-3 text-green-600 dark:text-green-500" />
                                      ) : (
                                        <Copy className="h-3 w-3 text-zinc-400" />
                                      )}
                                    </Button>
                                  </div>
                                ) : (
                                  <span className="text-zinc-400 dark:text-zinc-700">Genesis</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 px-6 py-4">
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="border-zinc-200 dark:border-zinc-800"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="border-zinc-200 dark:border-zinc-800"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Footer Notice */}
            <div className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
              <p>
                Showing {audits.length} of {totalItems.toLocaleString()} total audits
                {hasActiveFilters && ` (${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''} applied)`}
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
