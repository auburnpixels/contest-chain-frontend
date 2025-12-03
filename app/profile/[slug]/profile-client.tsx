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
} from 'lucide-react';
import { dateFormatters } from '@/lib/date-utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DrawAuditsWidget } from '@/components/draw-audits-widget';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {CompetitionsWidget} from "@/components/competitions-widget";

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
            const data = await publicApi.getPublicOperator('b3d719b3-72ff-43c5-9534-30ad0824e854');
            // const data = await publicApi.getPublicOperator(slug);
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
            <div className="min-h-screen bg-background">
                <SiteHeader />
                <main className="container mx-auto px-4 py-16">
                    <div className="flex flex-col items-center justify-center gap-4 min-h-[60vh]">
                        <Loader2 className="h-12 w-12 animate-spin text-brand-cobalt" />
                        <p className="text-muted-foreground">Loading operator profile...</p>
                    </div>
                </main>
                <SiteFooter />
            </div>
        );
    }

    if (error || !operator) {
        return (
            <div className="min-h-screen bg-background">
                <SiteHeader />
                <main className="container mx-auto px-4 py-16">
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
        <div className="min-h-screen bg-background">
            <SiteHeader />

            <main>
                <section className="container mx-auto px-4 py-8 max-w-7xl pt-32">
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-brand-cobalt text-white">
                                <Building2 className="h-8 w-8" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <h1 className="text-3xl font-bold tracking-tight text-foreground">{op.name}</h1>
                                </div>
                                <p className="text-muted-foreground text-lg">
                                    Member since {dateFormatters.shortDate(op.created_at)}
                                </p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid md:grid-cols-4 gap-4">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <p className="text-2xl font-bold">{stats.total_competitions.toLocaleString()}</p>
                                            <p className="text-sm text-muted-foreground">Competitions</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <p className="text-2xl font-bold">{stats.total_draws.toLocaleString()}</p>
                                            <p className="text-sm text-muted-foreground">Draws Conducted</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <p className="text-2xl font-bold">{stats.total_entries.toLocaleString()}</p>
                                            <p className="text-sm text-muted-foreground">Entries Processed</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <p className="text-2xl font-bold">{stats.draw_audit_rate}%</p>
                                            <p className="text-sm text-muted-foreground">Draw Audit Rate</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 py-8 max-w-7xl">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            Draw Audits
                        </h2>
                        
                        <DrawAuditsWidget
                            operatorId={op.id}
                            showOperator={false}
                            title="All verified draws"
                            description="Complete audit history for this operator. Each draw is cryptographically verified and publicly available."
                        />
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}
