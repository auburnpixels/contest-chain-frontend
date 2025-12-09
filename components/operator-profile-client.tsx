'use client';

import { useEffect, useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { publicApi, PublicOperator } from '@/lib/api/client';
import { 
  Loader2, 
  Building2, 
  Globe, 
  ShieldCheck, 
  Trophy, 
  History,
  AlertTriangle,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { dateFormatters } from '@/lib/date-utils';

type Props = {
  slug: string;
};

export default function OperatorProfileClient({ slug }: Props) {
  const [data, setData] = useState<PublicOperator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (slug) {
      loadOperator();
    }
  }, [slug]);

  const loadOperator = async () => {
    try {
      const result = await publicApi.getPublicOperator(slug);
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Failed to load operator profile');
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
          <h1 className="text-3xl font-bold mb-4">Operator Not Found</h1>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">
            The operator profile you are looking for does not exist or has been removed.
          </p>
          <Button asChild className="bg-brand-cobalt hover:bg-brand-cobalt/90 text-white">
            <Link href="/">Return Home</Link>
          </Button>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const { operator, stats, recent_competitions } = data;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand-cobalt/20 selection:text-brand-cobalt">
      <SiteHeader />
      
      <main className="container mx-auto px-6 py-24 max-w-5xl">
        {/* Profile Header */}
        <div className="bg-zinc-900/30 border border-white/10 rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left backdrop-blur-xl">
          <div className="h-24 w-24 bg-black rounded-full flex items-center justify-center shrink-0 border border-white/10 shadow-xl">
            <Building2 className="h-10 w-10 text-zinc-500" />
          </div>
          
          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4 justify-center md:justify-start">
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{operator.name}</h1>
              <Badge variant="secondary" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20 h-6 px-3">
                <ShieldCheck className="h-3 w-3 mr-1.5" />
                Verified Operator
              </Badge>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-zinc-400 mb-8 justify-center md:justify-start">
              <span>Member since {dateFormatters.shortDate(operator.created_at)}</span>
              {operator.url && (
                <a 
                  href={operator.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Globe className="h-3 w-3" />
                  {new URL(operator.url).hostname}
                </a>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto md:mx-0">
              <div className="text-center p-4 bg-black/40 rounded-xl border border-white/5">
                <p className="text-2xl font-bold text-white mb-1">{stats.total_competitions}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Competitions</p>
              </div>
              <div className="text-center p-4 bg-black/40 rounded-xl border border-white/5">
                <p className="text-2xl font-bold text-white mb-1">{stats.total_audits}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Audits</p>
              </div>
              <div className="text-center p-4 bg-black/40 rounded-xl border border-white/5">
                <p className="text-2xl font-bold text-white mb-1">{stats.total_entries.toLocaleString()}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Entries</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Competitions */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
              <Trophy className="h-6 w-6 text-brand-cobalt" />
              Recent Competitions
            </h2>
            <Button variant="ghost" asChild className="text-zinc-400 hover:text-white hover:bg-white/5">
              <Link href={`/audits?operator=${operator.uuid}`}>
                View All Audits <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {recent_competitions.length === 0 ? (
              <div className="col-span-2 text-center py-24 bg-zinc-900/20 rounded-2xl border border-dashed border-white/10">
                <p className="text-zinc-500">No public competitions found for this operator.</p>
              </div>
            ) : (
              recent_competitions.map((comp: any) => (
                <Link key={comp.id} href={`/competition/${comp.id}`} className="group">
                    <div className="bg-zinc-900/30 border border-white/10 rounded-xl p-6 hover:bg-zinc-900 hover:border-brand-cobalt/30 transition-all duration-300 h-full">
                        <div className="flex justify-between items-start gap-4 mb-4">
                            <h3 className="font-bold text-lg text-white group-hover:text-brand-cobalt transition-colors line-clamp-1">
                                {comp.name}
                            </h3>
                            <Badge variant="outline" className="border-white/10 text-zinc-400 bg-white/5">
                                {comp.status}
                            </Badge>
                        </div>
                        
                        <div className="flex justify-between text-sm text-zinc-500 mb-6">
                            <span className="font-mono text-xs">ID: {comp.external_id}</span>
                            <span>{dateFormatters.shortDate(comp.created_at)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm pt-4 border-t border-white/5">
                            {comp.status === 'completed' ? (
                                <span className="text-green-500 flex items-center gap-2 font-medium">
                                <CheckCircle2 className="h-4 w-4" />
                                Audit Available
                                </span>
                            ) : (
                                <span className="text-zinc-400 flex items-center gap-2">
                                <History className="h-4 w-4" />
                                In Progress
                                </span>
                            )}
                        </div>
                    </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}









