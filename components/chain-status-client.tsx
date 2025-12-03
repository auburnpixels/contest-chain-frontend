'use client';

import { useEffect, useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { publicApi, ChainVerification } from '@/lib/api/client';
import { 
  CheckCircle2, 
  XCircle, 
  Shield, 
  Activity,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { dateFormatters } from '@/lib/date-utils';

export default function ChainStatusClient() {
  const [chainData, setChainData] = useState<ChainVerification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadChainStatus();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      loadChainStatus(true);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadChainStatus = async (silent = false) => {
    if (!silent) {
      setLoading(true);
    } else {
      setIsRefreshing(true);
    }

    try {
      const data = await publicApi.verifyChain();
      setChainData(data);
      setLastRefresh(new Date());
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to load chain status');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const getIntegrityPercentage = () => {
    if (!chainData || chainData.total_events === 0) return 0;
    return Math.round((chainData.verified_events / chainData.total_events) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center gap-4 min-h-[60vh]">
            <Loader2 className="h-12 w-12 animate-spin text-brand-cobalt" />
            <p className="text-muted-foreground">Verifying chain integrity...</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (error || !chainData) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="container mx-auto px-4 py-16">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {error || 'Failed to load chain verification status'}
            </AlertDescription>
          </Alert>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const isValid = chainData.chain_status === 'valid';
  const integrityPercentage = getIntegrityPercentage();

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand-cobalt/20 selection:text-brand-cobalt">
      <SiteHeader />
      
      <main>
        {/* Hero Status Section */}
        <section className="bg-zinc-900/30 border-b border-white/5 py-24 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] opacity-20 pointer-events-none ${isValid ? 'bg-green-500' : 'bg-red-500'}`} />
          
          <div className="container mx-auto px-6 text-center relative z-10">
            {isValid ? (
              <>
                <div className="h-24 w-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20 animate-pulse">
                    <CheckCircle2 className="h-12 w-12 text-green-500" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                  Chain Integrity: <span className="text-green-500">VERIFIED</span>
                </h1>
                <p className="text-xl text-zinc-400 mb-2 max-w-2xl mx-auto">
                  All draw audits are cryptographically secure and tamper-proof.
                  The chain is unbroken.
                </p>
              </>
            ) : (
              <>
                <div className="h-24 w-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/20">
                    <XCircle className="h-12 w-12 text-red-500" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                  Chain Integrity: <span className="text-red-500">ISSUES DETECTED</span>
                </h1>
                <p className="text-xl text-zinc-400 mb-2 max-w-2xl mx-auto">
                  Potential integrity issues have been detected. Verification failed.
                </p>
              </>
            )}
            
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-black/40 rounded-full border border-white/10 text-sm text-zinc-400">
                <Activity className="h-4 w-4 text-brand-cobalt" />
                Last verified: {dateFormatters.relativeTime(chainData.verified_at)}
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => loadChainStatus()}
                disabled={isRefreshing}
                className="bg-black border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-900"
              >
                {isRefreshing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Refreshing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Now
                  </>
                )}
              </Button>
            </div>
          </div>
        </section>

        {/* Metrics Grid */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Total Draw Audits */}
              <div className="bg-zinc-900/50 border border-white/10 p-8 rounded-2xl relative overflow-hidden group hover:border-brand-cobalt/30 transition-colors">
                 <div className="absolute top-0 right-0 p-8 opacity-50 group-hover:opacity-100 transition-opacity">
                    <Shield className="h-8 w-8 text-brand-cobalt" />
                 </div>
                 <p className="text-zinc-500 font-medium mb-4 text-sm uppercase tracking-wider">Total Draw Audits</p>
                 <div className="text-5xl font-bold text-white mb-2">{chainData.total_events.toLocaleString()}</div>
                 <p className="text-sm text-zinc-400">Recorded in the ledger</p>
              </div>

              {/* Verified Events */}
              <div className="bg-zinc-900/50 border border-white/10 p-8 rounded-2xl relative overflow-hidden group hover:border-green-500/30 transition-colors">
                 <div className="absolute top-0 right-0 p-8 opacity-50 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                 </div>
                 <p className="text-zinc-500 font-medium mb-4 text-sm uppercase tracking-wider">Verified Events</p>
                 <div className="text-5xl font-bold text-white mb-2">{chainData.verified_events.toLocaleString()}</div>
                 <p className="text-sm text-zinc-400">Cryptographically confirmed</p>
              </div>

              {/* Chain Integrity */}
              <div className="bg-zinc-900/50 border border-white/10 p-8 rounded-2xl relative overflow-hidden group hover:border-brand-cobalt/30 transition-colors">
                 <div className="absolute top-0 right-0 p-8 opacity-50 group-hover:opacity-100 transition-opacity">
                    <Activity className="h-8 w-8 text-brand-cobalt" />
                 </div>
                 <p className="text-zinc-500 font-medium mb-4 text-sm uppercase tracking-wider">Chain Health</p>
                 <div className="text-5xl font-bold text-white mb-2">{integrityPercentage}%</div>
                 <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-500 text-xs font-medium border border-green-500/20">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    Operational
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        {(!isValid || chainData.unchained_events > 0 || chainData.failed_events > 0) && (
          <section className="bg-zinc-900/30 py-16 border-y border-white/5">
            <div className="container mx-auto px-6 max-w-4xl">
              <div className="bg-black/50 border border-amber-500/30 rounded-2xl overflow-hidden">
                <div className="px-8 py-6 border-b border-amber-500/20 bg-amber-500/5 flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <h3 className="text-lg font-bold text-amber-500">Technical Verification Details</h3>
                </div>
                <div className="p-8 space-y-4">
                  {chainData.unchained_events > 0 && (
                    <div className="flex items-start gap-4 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-1" />
                      <div>
                        <p className="font-bold text-amber-500">
                          Unchained Events: {chainData.unchained_events}
                        </p>
                        <p className="text-sm text-amber-200/70">
                          Some events are not properly linked in the cryptographic chain
                        </p>
                      </div>
                    </div>
                  )}
                  {/* ... other error states kept simple ... */}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Explanation Section */}
        <section className="py-24 bg-black border-t border-white/5">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-white text-center">What is Chain Integrity?</h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                 <div>
                    <p className="text-xl text-zinc-300 leading-relaxed mb-6">
                        CAFAAS uses a <strong className="text-white">cryptographic chain</strong> to ensure 
                        every draw audit is tamper-proof.
                    </p>
                    <p className="text-zinc-400 leading-relaxed mb-8">
                        Each audit contains a cryptographic hash that includes the hash of the previous audit. 
                        This creates an unbreakable chain of proof — just like a blockchain.
                    </p>
                    <div className="flex gap-4">
                        <Button asChild className="bg-brand-cobalt hover:bg-brand-cobalt/90 text-white">
                            <Link href="/audits">
                            View Audit Log <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" asChild className="border-white/10 text-zinc-300 hover:bg-white/5 hover:text-white">
                            <Link href="/how-it-works">
                            Learn More
                            </Link>
                        </Button>
                    </div>
                 </div>
                 
                 <div className="space-y-4">
                    <div className="p-6 bg-zinc-900/50 rounded-xl border border-white/5">
                        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-brand-cobalt" />
                            1. Unique Hash
                        </h4>
                        <p className="text-sm text-zinc-400">Each draw creates a unique fingerprint (SHA-256).</p>
                    </div>
                    <div className="p-6 bg-zinc-900/50 rounded-xl border border-white/5">
                        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-brand-cobalt" />
                            2. Linked History
                        </h4>
                        <p className="text-sm text-zinc-400">The hash includes the previous audit's hash.</p>
                    </div>
                    <div className="p-6 bg-zinc-900/50 rounded-xl border border-white/5">
                        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-brand-cobalt" />
                            3. Tamper Proof
                        </h4>
                        <p className="text-sm text-zinc-400">Any change to past data breaks the chain instantly.</p>
                    </div>
                 </div>
            </div>
          </div>
        </section>

        {/* Auto-Refresh Notice */}
        <section className="bg-zinc-950 py-6 border-t border-white/5">
          <div className="container mx-auto px-6 text-center">
            <p className="text-xs text-zinc-500 font-mono">
              <Activity className="inline h-3 w-3 mr-2" />
              SYSTEM STATUS AUTO-REFRESHES EVERY 30 SECONDS
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}








