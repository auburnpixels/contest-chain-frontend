'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { publicApi, PublicCompetition } from '@/lib/api/client';
import {
  Trophy,
  Calendar,
  Users,
  Shield,
  ExternalLink,
  Loader2,
  AlertCircle,
  Search,
  TrendingUp,
  CheckCircle2,
  BarChart3,
} from 'lucide-react';
import { dateFormatters } from '@/lib/date-utils';
import { getCompetitionStatusVariant } from '@/lib/badge-variants';
import type { Metadata } from 'next';

type Props = {
  params: { uuid: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const data = await publicApi.getPublicCompetition(params.uuid);
    return {
      title: `${data.competition.name} - Cafaas`,
      description: `View competition details and draw audits for ${data.competition.name}. Operated by ${data.operator.name}.`,
    };
  } catch (error) {
    return {
      title: 'Competition Not Found - Cafaas',
    };
  }
}

export default function PublicCompetitionPage() {
  const params = useParams();
  const router = useRouter();
  const uuid = params.uuid as string;
  const [competition, setCompetition] = useState<PublicCompetition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');

  useEffect(() => {
    loadCompetition();
  }, [uuid]);

  const loadCompetition = async () => {
    try {
      const data = await publicApi.getPublicCompetition(uuid);
      setCompetition(data);
    } catch (err: any) {
      setError(err.message || 'Competition not found');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketNumber.trim()) return;
    router.push(`/verify/${uuid}/${encodeURIComponent(ticketNumber)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center gap-4 min-h-[60vh]">
            <Loader2 className="h-12 w-12 animate-spin text-brand-cobalt" />
            <p className="text-muted-foreground">Loading competition...</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (error || !competition) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="container mx-auto px-4 py-16">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || 'Competition not found'}</AlertDescription>
          </Alert>
          <div className="mt-8">
            <Button asChild>
              <Link href="/audits">View All Competitions</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const { competition: comp, operator, draw_audits, entry_stats, stats } = competition;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-cobalt/10 to-background py-16 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{comp.name}</h1>
                <p className="text-muted-foreground flex items-center gap-2">
                  Operated by{' '}
                  <Link href={`/operator/${operator.slug}`} className="text-brand-cobalt hover:underline">
                    {operator.name}
                  </Link>
                </p>
              </div>
              <Badge variant={getCompetitionStatusVariant(comp.status as any)} className="text-sm">
                {comp.status}
              </Badge>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-brand-cobalt" />
                    <div>
                      <p className="text-2xl font-bold">{entry_stats.total_entries.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total Entries</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-8 w-8 text-amber-500" />
                    <div>
                      <p className="text-2xl font-bold">{comp.prizes.length}</p>
                      <p className="text-sm text-muted-foreground">Prizes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Shield className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.total_draws}</p>
                      <p className="text-sm text-muted-foreground">Draw Audits</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-8 w-8 text-brand-cobalt" />
                    <div>
                      <p className="text-sm font-semibold">Draw At</p>
                      <p className="text-xs text-muted-foreground">
                        {comp.draw_at ? dateFormatters.shortDate(comp.draw_at) : 'TBD'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Verify Ticket Widget */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Verify Your Ticket
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVerifyTicket} className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="ticketNumber" className="sr-only">
                      Ticket Number
                    </Label>
                    <Input
                      id="ticketNumber"
                      type="text"
                      placeholder="Enter your ticket number..."
                      value={ticketNumber}
                      onChange={(e) => setTicketNumber(e.target.value)}
                    />
                  </div>
                  <Button type="submit" disabled={!ticketNumber.trim()}>
                    Verify
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-2">
                  Enter the ticket number you received when entering this competition
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16 max-w-6xl space-y-12">
          {/* Prizes */}
          {comp.prizes.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Trophy className="h-6 w-6 text-amber-500" />
                Prizes
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {comp.prizes.map((prize) => (
                  <Card key={prize.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{prize.name}</CardTitle>
                    </CardHeader>
                    {prize.description && (
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{prize.description}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Draw Audits */}
          {draw_audits.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-500" />
                Draw Audits ({draw_audits.length})
              </h2>
              <div className="space-y-4">
                {draw_audits.map((audit) => (
                  <Card key={audit.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {audit.prize?.name || 'Prize Draw'}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            Drawn on {dateFormatters.shortDateTime(audit.drawn_at)}
                          </p>
                        </div>
                        <Badge variant="default">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Entries</p>
                          <p className="text-lg font-semibold">{audit.total_entries.toLocaleString()}</p>
                        </div>
                        {audit.winner && (
                          <div>
                            <p className="text-sm text-muted-foreground">Winning Ticket</p>
                            <p className="text-lg font-semibold font-mono">{audit.winner.external_id}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm text-muted-foreground">Signature Hash</p>
                          <p className="text-xs font-mono truncate">{audit.signature_hash}</p>
                        </div>
                      </div>
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/audit/${audit.id}`}>
                          View Full Audit <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Entry Statistics */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-brand-cobalt" />
              Entry Statistics
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Entry Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Entries</span>
                    <span className="text-lg font-semibold">{entry_stats.total_entries.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Paid Entries</span>
                    <span className="text-lg font-semibold">{entry_stats.paid_entries.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Free Entries</span>
                    <span className="text-lg font-semibold">{entry_stats.free_entries.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Eligible Entries</span>
                    <span className="text-lg font-semibold">
                      {entry_stats.eligible_entries.toLocaleString()} ({entry_stats.eligibility_rate}%)
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transparency</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">All entries recorded on-chain</p>
                      <p className="text-xs text-muted-foreground">Cryptographically verified</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Draws independently audited</p>
                      <p className="text-xs text-muted-foreground">CAFAAS verified fairness</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Tamper-proof audit trail</p>
                      <p className="text-xs text-muted-foreground">Immutable record of all events</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Competition Info */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>About This Competition</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Competition ID</span>
                  <span className="font-mono">{comp.external_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={getCompetitionStatusVariant(comp.status as any)}>
                    {comp.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>{dateFormatters.shortDate(comp.created_at)}</span>
                </div>
                {comp.draw_at && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Draw At</span>
                    <span>{dateFormatters.shortDateTime(comp.draw_at)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Operator</span>
                  <Link href={`/operator/${operator.slug}`} className="text-brand-cobalt hover:underline">
                    {operator.name}
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}


