'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Download, Shield, ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';

interface DrawAudit {
  id: number;
  draw_id: string;
  operator: {
    id: string;
    name: string;
    slug: string;
    url?: string;
  } | null;
  competition: {
    id: string;
    title: string;
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
  id: string;
  name: string;
  slug: string;
  url?: string;
}

export default function DrawAuditsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [audits, setAudits] = useState<DrawAudit[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [selectedOperator, setSelectedOperator] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  useEffect(() => {
    loadOperators();
    const operator = searchParams.get('operator') || 'all';
    setSelectedOperator(operator);
    loadAudits(operator);
  }, [searchParams]);

  const loadOperators = async () => {
    try {
      const response = await publicApi.getOperators();
      setOperators(response.data || []);
    } catch (err) {
      console.error('Failed to load operators:', err);
    }
  };

  const loadAudits = async (operator?: string, page: number = 1) => {
    setLoading(true);
    try {
      const operatorUuid = operator && operator !== 'all' ? operator : undefined;
      const response = await publicApi.getDrawAudits(operatorUuid, page);
      setAudits(response.data || []);
      setCurrentPage(response.meta?.current_page || 1);
      setTotalPages(response.meta?.last_page || 1);
    } catch (err) {
      console.error('Failed to load audits:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOperatorChange = (value: string) => {
    setSelectedOperator(value);
    const params = new URLSearchParams();
    if (value !== 'all') {
      params.set('operator', value);
    }
    router.push(`/draw-audits${params.toString() ? `?${params.toString()}` : ''}`);
    loadAudits(value);
  };

  const handleDownloadJson = async () => {
    try {
      const operatorUuid = selectedOperator !== 'all' ? selectedOperator : undefined;
      const data = await publicApi.downloadDrawAuditsJson(operatorUuid);
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
      console.error('Failed to download JSON:', err);
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

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="border-b border-zinc-900 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/20">
              C
            </div>
            <div>
              <h1 className="font-bold text-lg">Draw Audit Log</h1>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">
                Complete Transparency
              </p>
            </div>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-900">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500 tracking-tight">
            Draw Audit Log
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Complete transparency log of all competition draws with cryptographic verification.
            Every draw is recorded with a tamper-evident signature and linked in an unbreakable chain.
          </p>
        </div>

        {/* Educational Content */}
        <Card className="mb-8 bg-zinc-950 border-zinc-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              Why We Do This
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-zinc-300">
            <p>
              Every draw is recorded here the moment it happens. Once recorded, it's locked in forever
              - we can't change the winner, the time, or who was eligible. It's like a receipt that
              proves everything was fair.
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="table-explained" className="border-zinc-800">
                <AccordionTrigger className="text-white hover:text-zinc-300">
                  What you'll see in the table
                </AccordionTrigger>
                <AccordionContent className="text-zinc-400 space-y-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Pool Hash</strong> - A unique fingerprint of all tickets that were eligible to win</li>
                    <li><strong>Signature</strong> - A tamper-proof seal that locks everything together (if we changed anything, this would break)</li>
                    <li><strong>Previous Signature</strong> - Links this draw to the previous one, forming an unbreakable chain</li>
                    <li><strong>Draw ID</strong> - A unique reference number for this specific draw</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cant-change" className="border-zinc-800">
                <AccordionTrigger className="text-white hover:text-zinc-300">
                  Can't Raffaly just change this data?
                </AccordionTrigger>
                <AccordionContent className="text-zinc-400 space-y-2">
                  <p>
                    Technically yes - but you'd catch us immediately. If your ticket was in the draw,
                    you can verify it's in the Pool Hash. If we changed the winner or timestamp, the
                    Signature would break. Each draw also links to the previous one through the Previous
                    Signature field - forming a chain like blockchain. You can't insert, remove, or alter
                    any draw without breaking the entire chain.
                  </p>
                  <p>
                    Plus, this page is public the moment the draw happens - anyone can screenshot it,
                    archive it, or check it in real-time. Changing it would be obvious and destroy our
                    entire business.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="verify" className="border-zinc-800">
                <AccordionTrigger className="text-white hover:text-zinc-300">
                  How can I verify this myself? (Technical users)
                </AccordionTrigger>
                <AccordionContent className="text-zinc-400 space-y-4">
                  <p className="text-sm italic">
                    Most people will never need these steps — but we make them public so anyone can
                    check the math.
                  </p>

                  <div>
                    <h4 className="font-semibold text-white mb-1">Step 1: Check your ticket was eligible</h4>
                    <p className="text-sm">
                      Contact us with the Draw ID and your ticket number. We'll provide a list of all
                      eligible ticket numbers and a mapping showing which ticket ID corresponds to your
                      ticket number.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-1">Step 2: Verify the Pool Hash</h4>
                    <p className="text-sm">
                      The Pool Hash is calculated from ticket IDs (not the visible numbers). Once you have
                      your ticket's ID from the mapping:
                    </p>
                    <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                      <li>Take all the ticket IDs from the eligible list</li>
                      <li>Sort them and join with commas: 1,2,3,4,5...</li>
                      <li>Calculate SHA256 hash - it should match the Pool Hash shown</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-1">Step 3: Verify the signature</h4>
                    <p className="text-sm">
                      Copy the data from the table: Competition UUID, Draw ID, timestamp, total entries,
                      winner ticket ID (not number), Pool Hash, and Previous Signature (if any). Combine
                      them with pipes (|) and calculate a SHA256 hash. It should match the Signature shown.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-1">Step 4: Verify the chain</h4>
                    <p className="text-sm">
                      Each audit's Previous Signature should match the Signature of the draw before it.
                      This creates an unbreakable chain - if any draw is altered, inserted, or removed,
                      the chain breaks and verification fails.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-1">Step 5: Download the JSON</h4>
                    <p className="text-sm">
                      Click "Download JSON" below to get machine-readable data you can verify
                      programmatically.
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-blue-400 mt-4">
                    Bottom line: You don't have to take our word that draws are fair - the numbers prove it.
                    That's our commitment to transparency.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Select value={selectedOperator} onValueChange={handleOperatorChange}>
              <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                <SelectValue placeholder="All Operators" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-zinc-800 text-white">
                <SelectItem value="all">All Operators</SelectItem>
                {operators.map((op) => (
                  <SelectItem key={op.id} value={op.id}>
                    {op.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleDownloadJson} className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Download JSON
          </Button>
        </div>

        {/* Data Table */}
        <Card className="bg-zinc-950 border-zinc-900">
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800 hover:bg-zinc-900/50">
                      <TableHead className="text-zinc-400">Operator</TableHead>
                      <TableHead className="text-zinc-400">Competition</TableHead>
                      <TableHead className="text-zinc-400">Prize</TableHead>
                      <TableHead className="text-zinc-400">Draw ID</TableHead>
                      <TableHead className="text-zinc-400">Drawn At</TableHead>
                      <TableHead className="text-zinc-400 text-right">Entries</TableHead>
                      <TableHead className="text-zinc-400 text-right">Winner</TableHead>
                      <TableHead className="text-zinc-400 font-mono">Pool Hash</TableHead>
                      <TableHead className="text-zinc-400 font-mono">Signature</TableHead>
                      <TableHead className="text-zinc-400 font-mono">Prev Signature</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {audits.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center text-zinc-500 py-12">
                          No draw audits found
                        </TableCell>
                      </TableRow>
                    ) : (
                      audits.map((audit) => (
                        <TableRow key={audit.id} className="border-zinc-800 hover:bg-zinc-900/50">
                          <TableCell className="font-medium">
                            {audit.operator ? (
                              audit.operator.url ? (
                                <a
                                  href={audit.operator.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300"
                                >
                                  {audit.operator.name}
                                </a>
                              ) : (
                                audit.operator.name
                              )
                            ) : (
                              <span className="text-zinc-600">N/A</span>
                            )}
                          </TableCell>
                          <TableCell>{audit.competition?.title || 'N/A'}</TableCell>
                          <TableCell>{audit.prize_name || 'N/A'}</TableCell>
                          <TableCell className="font-mono text-xs">{audit.draw_id}</TableCell>
                          <TableCell className="text-sm">
                            {new Date(audit.drawn_at_utc).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            {audit.total_entries.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right text-green-500 font-mono">
                            {audit.winning_ticket}
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            <div className="flex items-center gap-2">
                              <span title={audit.pool_hash}>{truncateHash(audit.pool_hash)}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => copyToClipboard(audit.pool_hash, `pool-${audit.id}`)}
                              >
                                {copiedHash === `pool-${audit.id}` ? (
                                  <Check className="h-3 w-3 text-green-500" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-xs text-blue-400">
                            <div className="flex items-center gap-2">
                              <span title={audit.signature_hash}>
                                {truncateHash(audit.signature_hash)}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() =>
                                  copyToClipboard(audit.signature_hash, `sig-${audit.id}`)
                                }
                              >
                                {copiedHash === `sig-${audit.id}` ? (
                                  <Check className="h-3 w-3 text-green-500" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-xs text-zinc-600">
                            {audit.previous_signature_hash ? (
                              <div className="flex items-center gap-2">
                                <span title={audit.previous_signature_hash}>
                                  {truncateHash(audit.previous_signature_hash)}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() =>
                                    copyToClipboard(
                                      audit.previous_signature_hash!,
                                      `prev-${audit.id}`
                                    )
                                  }
                                >
                                  {copiedHash === `prev-${audit.id}` ? (
                                    <Check className="h-3 w-3 text-green-500" />
                                  ) : (
                                    <Copy className="h-3 w-3" />
                                  )}
                                </Button>
                              </div>
                            ) : (
                              <span className="text-zinc-700">Genesis</span>
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
              <div className="flex items-center justify-between border-t border-zinc-800 px-6 py-4">
                <div className="text-sm text-zinc-500">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => loadAudits(selectedOperator, currentPage - 1)}
                    disabled={currentPage === 1}
                    className="border-zinc-800"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => loadAudits(selectedOperator, currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="border-zinc-800"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer Notice */}
        <div className="mt-12 text-center text-zinc-600 text-sm">
          <p>
            Showing {audits.length} of {totalPages * 50} total audits
            {selectedOperator !== 'all' && ' (filtered by operator)'}
          </p>
        </div>
      </main>

      <footer className="border-t border-zinc-900 bg-black py-12 text-center text-zinc-600 text-sm mt-12">
        <p>&copy; 2025 CaaS Platform. Providing transparency and trust.</p>
      </footer>
    </div>
  );
}

