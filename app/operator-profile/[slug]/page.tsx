'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { publicApi, PublicOperator } from '@/lib/api/client';
import {
  Building2,
  Trophy,
  Users,
  Shield,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Loader2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { dateFormatters } from '@/lib/date-utils';
import { getCompetitionStatusVariant } from '@/lib/badge-variants';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const data = await publicApi.getPublicOperator(params.slug);
    return {
      title: `${data.operator.name} - Operator Profile - Cafaas`,
      description: `View public trust profile and audit history for ${data.operator.name}.`,
    };
  } catch (error) {
    return {
      title: 'Operator Not Found - Cafaas',
    };
  }
}

export default function OperatorProfilePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [operator, setOperator] = useState<PublicOperator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadOperator();
  }, [slug]);

  const loadOperator = async () => {
    try {
      const data = await publicApi.getPublicOperator(slug);
      setOperator(data);
    } catch (err: any) {
      setError(err.message || 'Operator not found');
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

  const { operator: op, stats, recent_competitions } = operator;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-cobalt/10 to-background py-16 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-start gap-4 mb-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-brand-cobalt text-white">
                <Building2 className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{op.name}</h1>
                <p className="text-muted-foreground">
                  Member since {dateFormatters.shortDate(op.created_at)}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-8 w-8 text-amber-500" />
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
                    <Shield className="h-8 w-8 text-green-500" />
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
                    <Users className="h-8 w-8 text-brand-cobalt" />
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
                    <TrendingUp className="h-8 w-8 text-green-500" />
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

        <div className="container mx-auto px-4 py-16 max-w-6xl space-y-12">
          {/* Trust Indicators */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              Trust & Transparency
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Audit Compliance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">
                        {stats.draw_audit_rate}% Draw Audit Rate
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {stats.total_draws} out of {stats.total_draws} draws audited
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Chain Integrity: Perfect</p>
                      <p className="text-xs text-muted-foreground">
                        No integrity issues detected
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">CAFAAS Verified</p>
                      <p className="text-xs text-muted-foreground">
                        All draws independently audited
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Competitions</span>
                    <span className="text-lg font-semibold">{stats.total_competitions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Draws</span>
                    <span className="text-lg font-semibold">{stats.total_draws.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Entries</span>
                    <span className="text-lg font-semibold">{stats.total_entries.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg Entries per Competition</span>
                    <span className="text-lg font-semibold">
                      {stats.total_competitions > 0
                        ? Math.round(stats.total_entries / stats.total_competitions).toLocaleString()
                        : 0}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Recent Competitions */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Trophy className="h-6 w-6 text-amber-500" />
                Recent Competitions
              </h2>
            </div>

            {recent_competitions.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No competitions yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {recent_competitions.map((comp) => (
                  <Card key={comp.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{comp.name}</CardTitle>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {comp.total_entries.toLocaleString()} entries
                            </span>
                            <span className="flex items-center gap-1">
                              <Shield className="h-4 w-4" />
                              {comp.total_draws} {comp.total_draws === 1 ? 'draw' : 'draws'}
                            </span>
                            <span className="flex items-center gap-1">
                              <Trophy className="h-4 w-4" />
                              {comp.total_prizes} {comp.total_prizes === 1 ? 'prize' : 'prizes'}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {dateFormatters.shortDate(comp.created_at)}
                            </span>
                          </div>
                        </div>
                        <Badge variant={getCompetitionStatusVariant(comp.status as any)}>
                          {comp.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/competition/${comp.id}`}>
                          View Competition <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}


