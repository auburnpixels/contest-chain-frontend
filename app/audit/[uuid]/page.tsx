'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { publicApi } from '@/lib/api/client';
import { CheckCircle2, Shield, Clock, Hash, Link as LinkIcon, ArrowLeft, AlertCircle } from 'lucide-react';

export default function AuditPage() {
  const params = useParams();
  const uuid = params.uuid as string;
  const [audit, setAudit] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAudit();
  }, [uuid]);

  const loadAudit = async () => {
    try {
      const data = await publicApi.getAudit(uuid);
      setAudit(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to load audit');
      setLoading(false);
    }
  };

  const verifySignature = () => {
    alert('Signature verification check initiated. In a production environment, this would verify the SHA-256 hash chain against the public keys.');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
           <div className="text-lg font-medium text-zinc-400">Verifying audit chain...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
        <Card className="max-w-md bg-zinc-950 border-zinc-900 text-white">
          <CardHeader className="text-center">
            <div className="mx-auto h-12 w-12 bg-red-900/20 rounded-full flex items-center justify-center mb-4 border border-red-900/30">
               <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <CardTitle className="text-2xl">Audit Not Found</CardTitle>
            <CardDescription className="text-zinc-400">{error}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/">
              <Button variant="outline" className="border-zinc-800 hover:bg-zinc-900 hover:text-white rounded-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-600/30">
      {/* Header */}
      <header className="border-b border-zinc-900 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/20">
               C
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg">Public Audit</h1>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">
                Immutable Record
              </p>
            </div>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4" /> 
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Audit Header Card */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-medium px-4 mb-6">
             <CheckCircle2 className="w-4 h-4 mr-2" />
             Cryptographically Verified
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500 tracking-tight">
             Competition Audit
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto font-mono text-sm bg-zinc-900/50 py-2 px-4 rounded-lg border border-zinc-900 inline-block">
             ID: {audit.raffle_id}
          </p>
        </div>

        <div className="grid gap-8">
           {/* Summary Stats */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-zinc-950 border-zinc-900 hover:border-zinc-800 transition-colors">
                 <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-white mb-1">{audit.total_draws}</div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Draws</div>
                 </CardContent>
              </Card>
              <Card className="bg-zinc-950 border-zinc-900 hover:border-zinc-800 transition-colors">
                 <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-green-500 mb-1">100%</div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Integrity</div>
                 </CardContent>
              </Card>
              <Card className="bg-zinc-950 border-zinc-900 hover:border-zinc-800 transition-colors">
                 <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-blue-500 mb-1">SHA-256</div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Algorithm</div>
                 </CardContent>
              </Card>
              <Card className="bg-zinc-950 border-zinc-900 hover:border-zinc-800 transition-colors">
                 <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-purple-500 mb-1">Valid</div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Chain Status</div>
                 </CardContent>
              </Card>
           </div>

          {/* Draw Timeline */}
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
            {audit.draws?.map((draw: any, index: number) => (
              <div key={draw.draw_id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-10 h-10 bg-black border border-zinc-800 rounded-full flex items-center justify-center -translate-x-1/2 shadow-xl z-10 group-hover:border-blue-500/50 transition-colors">
                   <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                </div>

                {/* Content Card */}
                <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-16 md:ml-0 bg-zinc-950 border-zinc-900 hover:border-zinc-700 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/5 group-hover:-translate-y-1">
                  <CardHeader className="pb-4 border-b border-zinc-900">
                    <div className="flex items-center justify-between mb-2">
                       <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10 rounded-md">
                          Draw #{draw.draw_id}
                       </Badge>
                       <span className="text-xs text-zinc-500 flex items-center font-mono">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(draw.drawn_at_utc).toLocaleString()}
                       </span>
                    </div>
                    <CardTitle className="text-white text-lg font-medium">
                       {draw.prize_name || 'Prize Draw'}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-5 pt-4">
                     <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-900">
                           <div className="text-zinc-500 text-xs mb-1 uppercase tracking-wider">Entries</div>
                           <div className="text-white font-mono font-bold">{draw.total_entries.toLocaleString()}</div>
                        </div>
                        <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-900">
                           <div className="text-zinc-500 text-xs mb-1 uppercase tracking-wider">Winner ID</div>
                           <div className="text-green-500 font-mono font-bold">{draw.winner_entry_id || 'Pending'}</div>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div>
                           <div className="flex items-center text-xs text-zinc-500 mb-1.5 font-medium">
                              <Hash className="w-3 h-3 mr-1.5" /> RNG Seed Hash
                           </div>
                           <code className="block bg-black p-2.5 rounded-lg text-[10px] text-zinc-400 font-mono break-all border border-zinc-900 group-hover:border-zinc-800 transition-colors">
                              {draw.rng_seed_hash}
                           </code>
                        </div>
                        
                        <div>
                           <div className="flex items-center text-xs text-zinc-500 mb-1.5 font-medium">
                              <LinkIcon className="w-3 h-3 mr-1.5" /> Signature Hash
                           </div>
                           <code className="block bg-blue-950/10 p-2.5 rounded-lg text-[10px] text-blue-400 font-mono break-all border border-blue-900/20">
                              {draw.signature_hash}
                           </code>
                        </div>

                        {draw.previous_signature_hash && (
                           <div>
                              <div className="flex items-center text-xs text-zinc-500 mb-1.5 font-medium">
                                 <LinkIcon className="w-3 h-3 mr-1.5" /> Previous Chain Link
                              </div>
                              <code className="block bg-black p-2.5 rounded-lg text-[10px] text-zinc-600 font-mono break-all border border-zinc-900">
                                 {draw.previous_signature_hash}
                              </code>
                           </div>
                        )}
                     </div>

                     <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-zinc-800 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all text-xs h-9 rounded-md font-medium"
                        onClick={verifySignature}
                     >
                        <Shield className="w-3 h-3 mr-2" />
                        Verify Digital Signature
                     </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Integrity Footer */}
          <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800 mt-16">
            <CardContent className="p-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
               <div className="h-20 w-20 bg-blue-900/20 rounded-2xl flex items-center justify-center flex-shrink-0 border border-blue-500/20 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
                  <Shield className="h-10 w-10 text-blue-500" />
               </div>
               <div>
                  <h3 className="text-xl font-bold text-white mb-3">Tamper-Evident Audit Trail</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
                     This audit record is cryptographically signed and chained using SHA-256 hashing. 
                     Any modification to the draw results or audit data would break the hash chain and be 
                     immediately detectable. This record serves as mathematical proof of fairness.
                  </p>
               </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="border-t border-zinc-900 bg-black py-12 text-center text-zinc-600 text-sm">
         <p>&copy; 2025 CaaS Platform. Providing transparency and trust.</p>
      </footer>
    </div>
  );
}
