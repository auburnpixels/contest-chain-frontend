'use client';

import { useEffect, useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { publicApi, DrawAuditDetail } from '@/lib/api/client';
import {
    Loader2,
    AlertCircle,
    Building2,
    Download,
    Link as LinkIcon,
    ShieldCheck,
    Copy,
    Check,
    Clock
} from 'lucide-react';
import { dateFormatters } from '@/lib/date-utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IndicatorBadge } from '@/components/ui/indicator-badge';
import { InfoTooltip } from '@/components/info-tooltip';

interface AuditClientProps {
  uuid: string;
}

export function AuditClient({ uuid }: AuditClientProps) {
  const [auditData, setAuditData] = useState<DrawAuditDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    loadAudit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  const copyToClipboard = async (text: string, fieldName: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

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
    <div className="min-h-screen bg-[var(--veristiq-snow)] flex flex-col font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />

      {/* Hero Section */}
      <div className="relative bg-[var(--veristiq-slate)] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
            <div className={`inline-flex items-center justify-center p-3 ${audit.is_chained ? 'bg-white/10' : 'bg-yellow-500/20'} rounded-full mb-6 backdrop-blur-sm shadow-lg ring-1 ${audit.is_chained ? 'ring-white/20' : 'ring-yellow-500/30'}`}>
                {audit.is_chained ? (
                    <ShieldCheck className="w-8 h-8 text-[var(--veristiq-teal)]" />
                ) : (
                    <Clock className="w-8 h-8 text-yellow-400" />
                )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                {audit.is_chained ? 'Verified Audit Record' : 'Pending Audit Record'}
            </h1>
            <div className="flex flex-col items-center gap-4">
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    {audit.is_chained 
                        ? 'Immutable proof of fairness for competition draw events.'
                        : 'This draw audit is pending chain verification. Chain linking is processed asynchronously.'}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full flex items-center gap-2">
                        <span className="text-gray-400 text-sm">Draw ID</span>
                        <span className="font-mono text-white font-bold">{audit.draw_id}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto max-w-7xl px-6 -mt-10 relative z-20 pb-20">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Competition Details */}
                    <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-white/20">
                        <CardHeader>
                            <CardTitle className="!text-xl">Competition Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">Competition Name</h3>
                                <p className="font-medium text-lg">{audit.competition?.name || 'N/A'}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                    <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Prize</h3>
                                    <p>{audit.prize_name || 'N/A'}</p>
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
                                        {audit.winning_ticket || 'Pending'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Technical Proofs */}
                        <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-white/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 !text-xl">
                                {audit.is_chained ? (
                                    <ShieldCheck className="w-5 h-5 text-green-500" />
                                ) : (
                                    <Clock className="w-5 h-5 text-yellow-500" />
                                )}
                                Cryptographic Proofs
                            </CardTitle>
                            <CardDescription>
                                {audit.is_chained 
                                    ? 'The following hashes link this draw to the immutable audit chain.'
                                    : 'Chain hashes will be finalized once verification completes.'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             {/* Signature Hash */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                                    Signature Hash
                                    <InfoTooltip>
                                        Unique identifier for this draw event in the audit chain. Links to previous draws to prevent tampering.
                                    </InfoTooltip>
                                </h3>
                                <div className="flex items-start gap-2">
                                    <p className="text-xs font-mono break-all bg-gray-100 p-2 rounded flex-1">
                                        {audit.signature_hash}
                                    </p>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 shrink-0"
                                        onClick={() => copyToClipboard(audit.signature_hash, 'signature_hash')}
                                    >
                                        {copiedField === 'signature_hash' ? (
                                            <Check className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Previous Signature Hash */}
                            {audit.previous_signature_hash && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                                        Previous Signature Hash
                                        <InfoTooltip>
                                            Links this draw to the previous event in the chain, creating an unbreakable sequence.
                                        </InfoTooltip>
                                    </h3>
                                    <div className="flex items-start gap-2">
                                        <p className="text-xs font-mono break-all bg-gray-100 p-2 rounded flex-1">
                                            {audit.previous_signature_hash}
                                        </p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 shrink-0"
                                            onClick={() => copyToClipboard(audit.previous_signature_hash!, 'previous_signature_hash')}
                                        >
                                            {copiedField === 'previous_signature_hash' ? (
                                                <Check className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <Copy className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* RNG Seed */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                                    RNG Seed / Hash
                                    <InfoTooltip>
                                        The cryptographic fingerprint of the random seed used to select the winner. This proves the randomness source can't be changed after the draw.
                                    </InfoTooltip>
                                </h3>
                                <div className="flex items-start gap-2">
                                    <p className="text-xs font-mono break-all bg-gray-100 p-2 rounded flex-1">
                                        {audit.rng_seed_or_hash || 'N/A'}
                                    </p>
                                    {audit.rng_seed_or_hash && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 shrink-0"
                                            onClick={() => copyToClipboard(audit.rng_seed_or_hash, 'rng_seed_or_hash')}
                                        >
                                            {copiedField === 'rng_seed_or_hash' ? (
                                                <Check className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <Copy className="h-4 w-4" />
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </div>
                            
                            {/* Pool Hash */}
                            {audit.pool_hash && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                                        Pool Hash
                                        <InfoTooltip>
                                            Fingerprint of all eligible entries at draw time. Proves entries weren't added or removed after the draw started.
                                        </InfoTooltip>
                                    </h3>
                                    <div className="flex items-start gap-2">
                                        <p className="text-xs font-mono break-all bg-gray-100 p-2 rounded flex-1">
                                            {audit.pool_hash}
                                        </p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 shrink-0"
                                            onClick={() => copyToClipboard(audit.pool_hash!, 'pool_hash')}
                                        >
                                            {copiedField === 'pool_hash' ? (
                                                <Check className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <Copy className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Actions Card */}
                    <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-white/20">
                        <CardHeader>
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button className="w-full bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white gap-2">
                                <LinkIcon className="w-4 h-4" /> Verify Chain
                            </Button>
                            <Button variant="outline" className="w-full gap-2">
                                <Download className="w-4 h-4" /> Export JSON
                            </Button>
                        </CardContent>
                    </Card>

                        {/* Chain Visual */}
                    <Card className="bg-[var(--veristiq-slate)] text-white border-0 shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <LinkIcon className={`w-5 h-5 ${audit.is_chained ? 'text-[var(--veristiq-teal)]' : 'text-yellow-400'}`} />
                                Chain Visualization
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {audit.is_chained ? (
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
                            ) : (
                                <div className="text-center py-6">
                                    <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-4 animate-pulse" />
                                    <p className="text-white font-medium mb-2">Pending Chain Verification</p>
                                    <p className="text-sm text-gray-400 max-w-xs mx-auto">
                                        This draw audit is being processed and will be linked to the chain shortly.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Operator Info */}
                    {audit.operator && (
                        <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-white/20">
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
                                        <p className="text-xs text-gray-500">@{audit.operator.slug}</p>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href={`/profile/${audit.operator.slug}`}>View Operator Profile</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
      </main>

      <SiteFooter />
    </div>
  );
}
