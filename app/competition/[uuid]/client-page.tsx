'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
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
    CheckCircle2,
    BarChart3, Building2,
} from 'lucide-react';
import { dateFormatters } from '@/lib/date-utils';
import { getCompetitionStatusVariant } from '@/lib/badge-variants';
import {IndicatorBadge} from "@/components/ui/indicator-badge";
import {DrawAuditDetails} from "@/components/draw-audit-details";
import {DrawAuditsWidget} from "@/components/draw-audits-widget";
import {CompetitionDetailsView} from "@/components/competition-details-view";

export default function PublicCompetitionClientPage() {
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

  const { competition: comp, operator } = competition;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <section className="container mx-auto px-4 py-8 max-w-7xl pt-32">
          <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex flex-col gap-10 mb-2">
                  <div className="flex flex-col gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-brand-cobalt text-white">
                      <Building2 className="h-8 w-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">{operator.name}</h1>
                      </div>
                      <p className="text-muted-foreground text-lg">
                        Competition created {dateFormatters.shortDate(comp.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <h1 className="text-xl font-bold tracking-tight text-foreground">
                        Competition Audits
                      </h1>
                      <IndicatorBadge color="green" text="Verified" size="xs" />
                    </div>

                    <p className="text-muted-foreground text-lg font-mono">
                      {comp.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card>
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

            <DrawAuditsWidget
              operatorId={operator.id}
              competitionId={comp.id}
              showOperator={false}
              publicView={true}
              showFilters={false}
              title="All verified draws"
              description="Complete audit history for this competition. Each draw is cryptographically verified and publicly available."
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
