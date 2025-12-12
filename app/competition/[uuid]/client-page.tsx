'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { publicApi, PublicCompetition } from '@/lib/api/client';
import {
    Trophy,
    Loader2,
    AlertCircle,
    Building2,
    Ticket,
    Award,
} from 'lucide-react';
import { dateFormatters } from '@/lib/date-utils';
import { DrawAuditsWidget } from "@/components/draw-audits-widget";
import { CompetitionDetailsView } from "@/components/competition-details-view";

export default function PublicCompetitionClientPage() {
  const params = useParams();
  const uuid = params.uuid as string;
  const [competition, setCompetition] = useState<PublicCompetition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCompetition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  const loadCompetition = async () => {
    try {
      const data = await publicApi.getPublicCompetition(uuid);
      setCompetition(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Competition not found';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--veristiq-snow)] flex flex-col font-sans text-[var(--veristiq-slate)]">
        <SiteHeader />
        <main className="container mx-auto px-6 py-20 pt-32">
          <div className="flex flex-col items-center justify-center gap-4 min-h-[50vh]">
            <Loader2 className="h-10 w-10 animate-spin text-[var(--veristiq-primary-blue)]" />
            <p className="text-[var(--veristiq-slate-light)]">Loading competition...</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (error || !competition) {
    return (
      <div className="min-h-screen bg-[var(--veristiq-snow)] flex flex-col font-sans text-[var(--veristiq-slate)]">
        <SiteHeader />
        <main className="container mx-auto px-6 py-20 pt-32">
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

  const { competition: comp, operator, entry_stats, draw_audits } = competition;

  // Calculate stats
  const totalPrizes = comp.prizes?.length || 0;
  const drawnPrizes = draw_audits?.length || 0;

  return (
    <div className="min-h-screen bg-[var(--veristiq-snow)] flex flex-col font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />

      {/* Hero Section */}
      <div className="relative bg-[var(--veristiq-slate)] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6 backdrop-blur-sm shadow-lg ring-1 ring-white/20">
            <Trophy className="w-8 h-8 text-[var(--veristiq-teal)]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{comp.name}</h1>
          <div className="flex flex-col items-center gap-4">
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Operated by <Link href={`/profile/${operator.slug}`} className="text-[var(--veristiq-teal)] hover:underline">{operator.name}</Link>
            </p>
            <p className="text-gray-400">
              Created {dateFormatters.shortDate(comp.created_at)}
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto max-w-7xl px-6 -mt-10 relative z-20 pb-20">
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-white/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <Ticket className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{(entry_stats?.total_entries || 0).toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Entries</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-white/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalPrizes}</p>
                    <p className="text-sm text-muted-foreground">Total Prizes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-white/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{drawnPrizes}/{totalPrizes}</p>
                    <p className="text-sm text-muted-foreground">Prizes Drawn</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Competition Details Card */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-white/20">
            <CardHeader>
              <CardTitle>Competition Details</CardTitle>
              <CardDescription>
                Basic information about this competition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CompetitionDetailsView competition={comp} />
            </CardContent>
          </Card>

          {/* Draw Audits */}
          <div className="space-y-4">
            <DrawAuditsWidget
              operatorId={operator.id}
              competitionId={comp.id}
              showOperator={false}
              publicView={true}
              showFilters={false}
              title="Verified Draws"
              description="Complete audit history for this competition. Each draw is cryptographically verified and publicly available."
            />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
