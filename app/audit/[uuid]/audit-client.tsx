'use client';

import {useEffect, useState} from 'react';
import {SiteHeader} from '@/components/site-header';
import {SiteFooter} from '@/components/site-footer';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {publicApi, DrawAuditDetail} from '@/lib/api/client';
import {
    Loader2,
    AlertCircle,
    Copy,
    Check,
    ExternalLink,
    Shield, Building2,
} from 'lucide-react';
import {dateFormatters} from '@/lib/date-utils';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {Badge} from '@/components/ui/badge';
import {IndicatorBadge} from '@/components/ui/indicator-badge';
import {Separator} from '@/components/ui/separator';
import {InfoTooltip} from '@/components/info-tooltip';
import {DrawAuditDetailsDialog} from "@/components/operator/draw-audit-details-dialog";

interface AuditClientProps {
    uuid: string;
}

export function AuditClient({uuid}: AuditClientProps) {
    const [auditData, setAuditData] = useState<DrawAuditDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [copiedField, setCopiedField] = useState<string | null>(null);

    useEffect(() => {
        loadAudit();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uuid]);

    const loadAudit = async () => {
        try {
            //const data = await publicApi.getDrawAudit(uuid);
            const data = await publicApi.getDrawAudit('59ab883b-fe52-46f0-a544-5d86b7be2bc2');
            setAuditData(data);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Audit not found';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async (text: string, fieldName: string) => {
        await navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const formatChainPosition = (sequence: number): string => {
        return `#${sequence.toLocaleString()}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <SiteHeader/>
                <main className="container mx-auto px-4 py-16">
                    <div className="flex flex-col items-center justify-center gap-4 min-h-[60vh]">
                        <Loader2 className="h-12 w-12 animate-spin text-brand-cobalt"/>
                        <p className="text-muted-foreground">Loading audit details...</p>
                    </div>
                </main>
                <SiteFooter/>
            </div>
        );
    }

    if (error || !auditData) {
        return (
            <div className="min-h-screen bg-background">
                <SiteHeader/>
                <main className="container mx-auto px-4 py-16">
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertDescription>{error || 'Audit not found'}</AlertDescription>
                    </Alert>
                    <div className="mt-8">
                        <Button asChild>
                            <Link href="/audits">View All Audits</Link>
                        </Button>
                    </div>
                </main>
                <SiteFooter/>
            </div>
        );
    }

    const audit = auditData;

    return (
        <div className="min-h-screen bg-background">
            <SiteHeader/>

            <main>
                <section className="container mx-auto px-4 py-8 max-w-7xl pt-32">
                    <div className="flex flex-col gap-8">
                        {/* Header */}
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-brand-cobalt text-white">
                                    <Building2 className="h-8 w-8"/>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Raffaly</h1>
                                    </div>
                                    <p className="text-muted-foreground text-lg">
                                        Member since
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">

                                    <h1 className="text-3xl font-bold tracking-tight">
                                        Draw Audit
                                    </h1>
                                    <IndicatorBadge color="green" text="Verified" size="sm"/>
                                </div>
                                <p className="text-muted-foreground text-lg font-mono">
                                    {audit.draw_id}
                                </p>
                            </div>
                        </div>
                        
                        {/* Key Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Key Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-sm font-medium text-muted-foreground">Chain Position</h3>
                                        <Badge variant="outline" className="font-mono w-fit">
                                            {formatChainPosition(audit.sequence)}
                                        </Badge>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-sm font-medium text-muted-foreground">Draw Time</h3>
                                        <p className="text-sm font-medium">
                                            {dateFormatters.shortDateTime(audit.drawn_at_utc)}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-sm font-medium text-muted-foreground">Total Entries</h3>
                                        <p className="text-sm font-medium">
                                            {audit.total_entries.toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-sm font-medium text-muted-foreground">Winning Ticket</h3>
                                        <p className="text-sm font-mono break-all">
                                            {audit.winning_ticket || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Competition & Prize Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Competition Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {audit.competition && (
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-sm font-medium text-muted-foreground">Competition</h3>
                                            <p className="text-sm font-medium">{audit.competition.name}</p>
                                            <p className="text-xs text-muted-foreground font-mono">
                                                {audit.competition.external_id}
                                            </p>
                                            <Link
                                                href={`/competition/${audit.competition.id}`}
                                                className="text-xs text-brand-cobalt hover:underline flex items-center gap-1 mt-1"
                                            >
                                                View Competition <ExternalLink className="h-3 w-3"/>
                                            </Link>
                                        </div>
                                    )}

                                    {audit.prize_name && (
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-sm font-medium text-muted-foreground">Prize</h3>
                                            <p className="text-sm font-medium">{audit.prize_name}</p>
                                        </div>
                                    )}

                                    {audit.operator && (
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-sm font-medium text-muted-foreground">Operator</h3>
                                            <p className="text-sm font-medium">{audit.operator.name}</p>
                                            <Link
                                                href={`/profile/${audit.operator.slug}`}
                                                className="text-xs text-brand-cobalt hover:underline flex items-center gap-1 mt-1"
                                            >
                                                View Profile <ExternalLink className="h-3 w-3"/>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Cryptographic Verification */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Cryptographic Verification</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Signature Hash */}
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                                        Signature Hash
                                        <InfoTooltip>
                                            Unique identifier for this draw event in the audit chain. Links to previous
                                            draws to prevent tampering.
                                        </InfoTooltip>
                                    </h3>
                                    <div className="flex items-start gap-2">
                                        <p className="text-xs font-mono break-all bg-muted p-3 rounded flex-1">
                                            {audit.signature_hash}
                                        </p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-9 w-9 p-0 shrink-0"
                                            onClick={() => copyToClipboard(audit.signature_hash, 'signature_hash')}
                                        >
                                            {copiedField === 'signature_hash' ? (
                                                <Check className="h-4 w-4 text-green-500"/>
                                            ) : (
                                                <Copy className="h-4 w-4"/>
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                {audit.previous_signature_hash && (
                                    <>
                                        <Separator/>
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                                                Previous Signature Hash
                                                <InfoTooltip>
                                                    Links this draw to the previous event in the chain, creating an
                                                    unbreakable sequence.
                                                </InfoTooltip>
                                            </h3>
                                            <div className="flex items-start gap-2">
                                                <p className="text-xs font-mono break-all bg-muted p-3 rounded flex-1">
                                                    {audit.previous_signature_hash}
                                                </p>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-9 w-9 p-0 shrink-0"
                                                    onClick={() =>
                                                        copyToClipboard(
                                                            audit.previous_signature_hash!,
                                                            'previous_signature_hash'
                                                        )
                                                    }
                                                >
                                                    {copiedField === 'previous_signature_hash' ? (
                                                        <Check className="h-4 w-4 text-green-500"/>
                                                    ) : (
                                                        <Copy className="h-4 w-4"/>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <Separator/>

                                {/* RNG Seed/Hash */}
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                                        RNG Seed / Hash
                                        <InfoTooltip>
                                            The cryptographic fingerprint of the random seed used to select the winner.
                                            This proves the randomness source can&apos;t be changed after the draw.
                                        </InfoTooltip>
                                    </h3>
                                    <div className="flex items-start gap-2">
                                        <p className="text-xs font-mono break-all bg-muted p-3 rounded flex-1">
                                            {audit.rng_seed_or_hash || 'N/A'}
                                        </p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-9 w-9 p-0 shrink-0"
                                            onClick={() => copyToClipboard(audit.rng_seed_or_hash, 'rng_seed_or_hash')}
                                            disabled={!audit.rng_seed_or_hash}
                                        >
                                            {copiedField === 'rng_seed_or_hash' ? (
                                                <Check className="h-4 w-4 text-green-500"/>
                                            ) : (
                                                <Copy className="h-4 w-4"/>
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                {audit.pool_hash && (
                                    <>
                                        <Separator/>
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                                                Pool Hash
                                                <InfoTooltip>
                                                    Fingerprint of all eligible entries at draw time. Proves entries
                                                    weren&apos;t added or removed after the draw started.
                                                </InfoTooltip>
                                            </h3>
                                            <div className="flex items-start gap-2">
                                                <p className="text-xs font-mono break-all bg-muted p-3 rounded flex-1">
                                                    {audit.pool_hash}
                                                </p>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-9 w-9 p-0 shrink-0"
                                                    onClick={() => copyToClipboard(audit.pool_hash!, 'pool_hash')}
                                                >
                                                    {copiedField === 'pool_hash' ? (
                                                        <Check className="h-4 w-4 text-green-500"/>
                                                    ) : (
                                                        <Copy className="h-4 w-4"/>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* Chain Verification */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Chain Verification</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">
                                    This audit is part of an immutable chain of events. Verify the integrity of the
                                    entire audit chain to ensure no records have been tampered with.
                                </p>
                                <Button asChild variant="outline">
                                    <Link href="/chain-status">
                                        Verify Chain Integrity <ExternalLink className="h-4 w-4 ml-2"/>
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Metadata */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Metadata</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-sm font-medium text-muted-foreground">Audit ID</h3>
                                        <p className="text-sm font-mono break-all">{audit.id}</p>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-sm font-medium text-muted-foreground">Created At</h3>
                                        <p className="text-sm">{dateFormatters.shortDateTime(audit.created_at)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Navigation */}
                        <div className="flex gap-4">
                            <Button asChild variant="outline">
                                <Link href="/audits">← Back to All Audits</Link>
                            </Button>
                            {audit.competition && (
                                <Button asChild variant="outline">
                                    <Link href={`/competition/${audit.competition.id}`}>
                                        View Competition
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter/>
        </div>
    );
}
