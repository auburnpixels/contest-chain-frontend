'use client';

import { useEffect, useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { publicApi, PublicCompetition } from '@/lib/api/client';
import { 
  Loader2, 
  Calendar, 
  Ticket, 
  Trophy, 
  ShieldCheck, 
  User, 
  AlertTriangle,
  History,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { dateFormatters } from '@/lib/date-utils';

type Props = {
  uuid: string;
};

export default function CompetitionDetailsClient({ uuid }: Props) {
  const [data, setData] = useState<PublicCompetition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (uuid) {
      loadCompetition();
    }
  }, [uuid]);

  const loadCompetition = async () => {
    try {
      const result = await publicApi.getPublicCompetition(uuid);
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Failed to load competition');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <SiteHeader />
        <main className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-10 w-10 animate-spin text-brand-cobalt" />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-black text-white">
        <SiteHeader />
        <main className="container mx-auto px-4 py-16 text-center min-h-[60vh] flex flex-col justify-center items-center">
          <div className="h-20 w-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Competition Not Found</h1>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">
            The competition you are looking for does not exist, has been removed, or the link is incorrect.
          </p>
          <Button asChild className="bg-brand-cobalt hover:bg-brand-cobalt/90 text-white">
            <Link href="/audits">Browse Audit Log</Link>
          </Button>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const { competition, operator, draw_audits, entry_stats, entry_timeline } = data;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand-cobalt/20 selection:text-brand-cobalt">
      <SiteHeader />
      
      <main className="container mx-auto px-6 py-24 max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12 border-b border-white/10 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="text-xs uppercase tracking-wider border-white/20 text-zinc-300 bg-white/5 px-2 py-1">
                {competition.status}
              </Badge>
              <span className="text-xs text-zinc-500 font-mono">
                ID: {competition.external_id}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">{competition.name}</h1>
            <div className="flex items-center gap-2 text-zinc-400">
              <User className="h-4 w-4" />
              <span>Operated by </span>
              <Link 
                href={`/operator-profile/${operator.slug}`}
                className="font-medium text-white hover:text-brand-cobalt transition-colors underline decoration-white/20 underline-offset-4"
              >
                {operator.name}
              </Link>
            </div>
          </div>
          
          <div className="flex gap-4">
            {operator.url && (
              <Button variant="outline" asChild className="border-white/10 text-zinc-300 hover:text-white hover:bg-white/5">
                <a href={operator.url} target="_blank" rel="noopener noreferrer">
                  Visit Operator <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
            <Button asChild className="bg-brand-cobalt hover:bg-brand-cobalt/90 text-white shadow-lg shadow-brand-cobalt/20">
              <Link href="/verify">Verify My Ticket</Link>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Entry Stats Card */}
            <div className="bg-zinc-900/30 border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex items-center gap-2">
                <Ticket className="h-5 w-5 text-brand-cobalt" />
                <h3 className="font-bold text-white">Entry Statistics</h3>
              </div>
              <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-center">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Total</p>
                    <p className="text-3xl font-bold text-white">{entry_stats.total_entries.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-green-500/5 rounded-xl border border-green-500/10 text-center">
                    <p className="text-xs text-green-500/70 uppercase tracking-wider mb-2">Eligible</p>
                    <p className="text-3xl font-bold text-green-500">{entry_stats.eligible_entries.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10 text-center">
                    <p className="text-xs text-red-500/70 uppercase tracking-wider mb-2">Voided</p>
                    <p className="text-3xl font-bold text-red-500">{entry_stats.voided_entries.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-center">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Free Entries</p>
                    <p className="text-3xl font-bold text-zinc-300">{entry_stats.free_entries.toLocaleString()}</p>
                  </div>
              </div>
            </div>

            {/* Draw Audits Timeline */}
            <div className="bg-zinc-900/30 border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex items-center gap-2">
                <History className="h-5 w-5 text-brand-cobalt" />
                <h3 className="font-bold text-white">Draw History</h3>
              </div>
              <div className="p-8">
                {draw_audits.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="h-16 w-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                        <History className="h-8 w-8 text-zinc-600" />
                    </div>
                    <p className="text-zinc-500">No draws have been completed for this competition yet.</p>
                  </div>
                ) : (
                  <div className="relative border-l-2 border-zinc-800 ml-4 space-y-8 py-2">
                    {draw_audits.map((audit: any) => (
                      <div key={audit.id} className="ml-8 relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-zinc-800 bg-brand-cobalt" />
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 rounded-xl border border-white/10 bg-black/40 hover:border-brand-cobalt/30 transition-colors group">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-lg text-white">{audit.prize_name}</h3>
                              <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-500 border-green-500/20 px-2 py-0.5 h-5">
                                VERIFIED
                              </Badge>
                            </div>
                            <p className="text-sm text-zinc-400 mb-4">
                              Drawn {dateFormatters.shortDateTime(audit.drawn_at_utc)}
                            </p>
                            
                            <div className="flex items-center gap-2 text-sm bg-zinc-900/50 px-3 py-1.5 rounded-lg border border-white/5 w-fit">
                              <span className="text-zinc-500">Winning Ticket:</span>
                              <code className="font-mono text-brand-cobalt font-bold">
                                {audit.winning_ticket.external_id}
                              </code>
                            </div>
                          </div>
                          
                          <Button variant="outline" size="sm" asChild className="border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 shrink-0">
                            <Link href={`/audit/${audit.id}`}>View Audit Proof</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            
            {/* Dates Card */}
            <div className="bg-zinc-900/30 border border-white/10 rounded-2xl overflow-hidden p-6">
              <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-cobalt" />
                Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm pb-4 border-b border-white/5">
                  <span className="text-zinc-500">Created</span>
                  <span className="font-medium text-zinc-300">{dateFormatters.shortDate(competition.created_at)}</span>
                </div>
                <div className="flex justify-between items-center text-sm pb-4 border-b border-white/5">
                  <span className="text-zinc-500">Last Updated</span>
                  <span className="font-medium text-zinc-300">{dateFormatters.shortDate(competition.updated_at)}</span>
                </div>
                {competition.draw_at && (
                  <div className="flex justify-between items-center text-sm pt-2">
                    <span className="text-zinc-500">Draw Scheduled</span>
                    <span className="font-medium text-white">{dateFormatters.shortDate(competition.draw_at)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Compliance Badge */}
            <div className="bg-gradient-to-br from-brand-cobalt/20 to-black border border-brand-cobalt/30 rounded-2xl p-8 text-center">
                <div className="h-16 w-16 bg-brand-cobalt rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-cobalt/20">
                  <ShieldCheck className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-white mb-2">Cafaas Verified</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  This competition is monitored by the Cafaas fairness engine. All entries and draws are cryptographically audited.
                </p>
            </div>

          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}








