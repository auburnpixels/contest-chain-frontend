'use client';

import { useEffect, useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { publicApi, DrawAuditDetail } from '@/lib/api/client';
import {
    Loader2,
    AlertCircle,
    ExternalLink,
    Building2,
    CheckCircle2,
    Download,
    Link as LinkIcon
} from 'lucide-react';
import { dateFormatters } from '@/lib/date-utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IndicatorBadge } from '@/components/ui/indicator-badge';
import { DrawAuditDetails } from '@/components/draw-audit-details';

interface AuditClientProps {
  uuid: string;
}

export function AuditClient({ uuid }: AuditClientProps) {
  const [auditData, setAuditData] = useState<DrawAuditDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAudit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  const loadAudit = async () => {
    try {
      const data = await publicApi.getDrawAudit(uuid);
      setAuditData(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Audit not found';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <SiteHeader />
        <main className="container mx-auto px-6 py-20 pt-32">
          <div className="flex flex-col items-center justify-center gap-4 min-h-[50vh]">
            <Loader2 className="h-10 w-10 animate-spin text-[var(--veristiq-primary-blue)]" />
            <p className="text-[var(--veristiq-slate-light)]">Verifying audit integrity...</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (error || !auditData) {
    return (
      <div className="min-h-screen bg-white">
        <SiteHeader />
        <main className="container mx-auto px-6 py-20 pt-32">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || 'Audit not found'}</AlertDescription>
          </Alert>
          <div className="mt-8">
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const audit = auditData;

  return (
    <div className="min-h-screen bg-[var(--veristiq-snow)] font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-5xl">
            {/* Header / Status Banner */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                     <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-2xl font-bold">Public Fairness Audit</h1>
                        <IndicatorBadge color="green" text="Verified Intact" size="sm" />
                    </div>
                    <p className="text-[var(--veristiq-slate-light)]">
                        Audit ID: <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{audit.draw_id}</span>
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" /> Export JSON
                    </Button>
                    <Button className="bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white gap-2">
                         <LinkIcon className="w-4 h-4" /> Verify Chain
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Competition Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Competition Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">Competition Name</h3>
                                <p className="font-medium text-lg">{audit.competition?.name || 'N/A'}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                 <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Prize</h3>
                                    <p>{audit.prize?.name || audit.prize_name || 'N/A'}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Draw Time</h3>
                                    <p>{dateFormatters.shortDateTime(audit.drawn_at_utc)}</p>
                                </div>
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                 <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Entries</h3>
                                    <p>{audit.total_entries.toLocaleString()}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Winner Ticket</h3>
                                    <p className="font-mono bg-green-50 text-green-700 px-2 py-1 rounded inline-block font-bold">
                                        {audit.selected_entry ? audit.selected_entry.external_id : audit.winning_ticket}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Technical Proofs */}
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                Cryptographic Proofs
                            </CardTitle>
                            <CardDescription>The following hashes link this draw to the immutable audit chain.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <DrawAuditDetails audit={audit} showOperator={false} />
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                     {/* Chain Visual */}
                    <Card className="bg-[var(--veristiq-slate)] text-white border-0">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <LinkIcon className="w-5 h-5 text-[var(--veristiq-teal)]" />
                                Chain Visualization
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="relative pl-4 border-l-2 border-white/20 space-y-6">
                                 {/* Prev Block */}
                                 <div className="opacity-50 text-sm">
                                     <div className="w-3 h-3 bg-gray-500 rounded-full absolute -left-[7px]"></div>
                                     <p className="font-mono text-xs text-gray-400 mb-1">Previous Event</p>
                                     <p className="font-mono text-xs truncate w-full bg-white/10 p-2 rounded">
                                         {audit.previous_signature_hash?.substring(0, 20)}...
                                     </p>
                                 </div>

                                 {/* Current Block */}
                                 <div className="text-sm">
                                     <div className="w-3 h-3 bg-[var(--veristiq-teal)] rounded-full absolute -left-[7px] shadow-[0_0_10px_rgba(12,226,188,0.5)]"></div>
                                     <p className="font-mono text-xs text-[var(--veristiq-teal)] mb-1">Current Event (This Draw)</p>
                                     <div className="bg-white/10 p-3 rounded border border-[var(--veristiq-teal)]">
                                         <p className="font-bold mb-1">Event #{audit.sequence}</p>
                                         <p className="font-mono text-xs break-all text-gray-300">
                                             {audit.signature_hash.substring(0, 20)}...
                                         </p>
                                     </div>
                                 </div>

                                  {/* Next Block */}
                                 <div className="opacity-50 text-sm">
                                     <div className="w-3 h-3 bg-gray-500 rounded-full absolute -left-[7px]"></div>
                                     <p className="font-mono text-xs text-gray-400 mb-1">Next Event</p>
                                     <p className="font-mono text-xs bg-white/10 p-2 rounded text-gray-500 italic">
                                         [Pending or Future]
                                     </p>
                                 </div>
                             </div>
                        </CardContent>
                    </Card>

                    {/* Operator Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Operator</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Building2 className="w-6 h-6 text-gray-500" />
                                </div>
                                <div>
                                    <p className="font-bold">{audit.operator.name}</p>
                                    <p className="text-xs text-gray-500">Member since {dateFormatters.shortDate(audit.operator.created_at)}</p>
                                </div>
                            </div>
                             <Button variant="outline" className="w-full" asChild>
                                <Link href={`/profile/${audit.operator.slug}`}>View Operator Profile</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
