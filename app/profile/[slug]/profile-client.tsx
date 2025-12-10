'use client';

import { useEffect, useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Card, CardContent } from '@/components/ui/card';
import { publicApi, PublicOperator } from '@/lib/api/client';
import {
    Building2,
    Loader2,
    AlertCircle,
    CheckCircle2,
    ShieldCheck,
    Trophy,
    Ticket,
    History,
    Percent
} from 'lucide-react';
import { dateFormatters } from '@/lib/date-utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DrawAuditsWidget } from '@/components/draw-audits-widget';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IndicatorBadge } from '@/components/ui/indicator-badge';

interface OperatorProfileClientProps {
    slug: string;
}

export function OperatorProfileClient({ slug }: OperatorProfileClientProps) {
    const [operator, setOperator] = useState<PublicOperator | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadOperator();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    const loadOperator = async () => {
        try {
            const data = await publicApi.getPublicOperator(slug);
            setOperator(data);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Operator not found';
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
                        <p className="text-[var(--veristiq-slate-light)]">Loading operator profile...</p>
                    </div>
                </main>
                <SiteFooter />
            </div>
        );
    }

    if (error || !operator) {
        return (
            <div className="min-h-screen bg-white">
                <SiteHeader />
                <main className="container mx-auto px-6 py-20 pt-32">
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error || 'Operator not found'}</AlertDescription>
                    </Alert>
                    <div className="mt-8">
                        <Button asChild>
                            <Link href="/audits">View All Operators</Link>
                        </Button>
                    </div>
                </main>
                <SiteFooter />
            </div>
        );
    }

    const { operator: op, stats } = operator;

    return (
        <div className="min-h-screen bg-[var(--veristiq-snow)] flex flex-col font-sans text-[var(--veristiq-slate)]">
            <SiteHeader />

            {/* Hero Section */}
            <div className="relative bg-[var(--veristiq-slate)] pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6 backdrop-blur-sm shadow-lg ring-1 ring-white/20">
                        <Building2 className="w-8 h-8 text-[var(--veristiq-teal)]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{op.name}</h1>
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                             Registered Operator Profile
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full flex items-center gap-2">
                                <span className="text-gray-400 text-sm">Member since</span>
                                <span className="font-mono text-white font-bold">{dateFormatters.shortDate(op.created_at)}</span>
                            </div>
                            <IndicatorBadge color="green" text="Verified Operator" size="xs" />
                        </div>
                    </div>
                </div>
            </div>

            <main className="flex-1 container mx-auto max-w-7xl px-6 -mt-10 relative z-20 pb-20">
                <div className="space-y-8">
                     {/* Stats Grid */}
                     <div className="grid md:grid-cols-4 gap-4">
                        <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-white/20">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                        <Trophy className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{stats.total_competitions.toLocaleString()}</p>
                                        <p className="text-sm text-muted-foreground">Competitions</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-white/20">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                        <History className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{stats.total_draws.toLocaleString()}</p>
                                        <p className="text-sm text-muted-foreground">Draws Conducted</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-white/20">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                                        <Ticket className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{stats.total_entries.toLocaleString()}</p>
                                        <p className="text-sm text-muted-foreground">Entries Processed</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-white/20">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                        <Percent className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{stats.draw_audit_rate}%</p>
                                        <p className="text-sm text-muted-foreground">Draw Audit Rate</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Draw Audits */}
                    <div className="space-y-4">
                        <DrawAuditsWidget
                            operatorId={op.id}
                            showOperator={false}
                            publicView={true}
                            title="Verified Draws"
                            description="Complete audit history for this operator. Each draw is cryptographically verified and publicly available."
                        />
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
