'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { publicApi, TicketVerification } from '@/lib/api/client';
import { 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  Calendar, 
  Shield, 
  ExternalLink,
  Loader2,
  AlertCircle,
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { dateFormatters } from '@/lib/date-utils';
import { ComplaintDialog } from '@/components/public/complaint-dialog';

export default function VerifyTicketPage() {
  const params = useParams();
  const competitionId = params.competitionId as string;
  const externalId = params.externalId as string;
  const [ticket, setTicket] = useState<TicketVerification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTicket();
  }, [competitionId, externalId]);

  const loadTicket = async () => {
    try {
      const data = await publicApi.verifyTicket(competitionId, externalId);
      setTicket(data);
    } catch (err: any) {
      setError(err.message || 'Ticket not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--veristiq-slate)]">
        <SiteHeader />
        <main className="container mx-auto px-4 py-32 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-[var(--veristiq-snow)] flex flex-col">
        <SiteHeader />
        
        {/* Hero Background */}
        <div className="absolute top-0 inset-x-0 h-[400px] bg-[var(--veristiq-slate)] z-0 overflow-hidden">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>
        </div>

        <main className="flex-1 container mx-auto px-4 py-32 max-w-2xl relative z-10">
          <Card className="border-red-200 shadow-xl bg-white/95 backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center gap-3 text-red-600 mb-2">
                    <AlertCircle className="h-6 w-6" />
                    <CardTitle className="text-xl">Verification Failed</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <p className="text-gray-600">
                    We could not verify a ticket with ID <span className="font-mono font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-800">{externalId}</span> for this competition.
                </p>
                <div className="flex gap-4">
                    <Button asChild className="bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white">
                        <Link href="/verify">Search Again</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/">Return Home</Link>
                    </Button>
                </div>
            </CardContent>
          </Card>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--veristiq-snow)] font-sans text-[var(--veristiq-slate)] flex flex-col">
      <SiteHeader />
      
      {/* Hero Background */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-[var(--veristiq-slate)] z-0 overflow-hidden">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>
           <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-32 max-w-4xl relative z-10">
        
        <div className="mb-8 flex items-center justify-between text-white">
            <Link href="/verify" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Search
            </Link>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[var(--veristiq-teal)]" />
                <span className="font-semibold text-sm tracking-tight">Verified by Veristiq</span>
            </div>
        </div>

        {/* Winner Alert */}
        {ticket.result.is_winner && (
          <div className="mb-8 bg-gradient-to-r from-blue-500 to-emerald-600 rounded-xl p-1 shadow-lg animate-in slide-in-from-top-4 duration-700">
            <div className="bg-white rounded-lg p-6 flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600 shrink-0">
                    <Trophy className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-blue-800 mb-1">Congratulations! You&apos;re a winner!</h3>
                    <p className="text-blue-700">
                        This ticket has been verified as the winner of: <span className="font-bold">{ticket.result.prize}</span>
                    </p>
                </div>
            </div>
          </div>
        )}

        {/* Ticket Verification Card */}
        <Card className="mb-8 shadow-2xl border-white/10 overflow-hidden bg-white">
          <div className="bg-gray-50 border-b border-gray-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-[var(--veristiq-slate)]">Ticket Verification</h1>
                <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
                  <span>ID:</span>
                  <span className="font-mono font-bold bg-white border border-gray-200 px-2 py-0.5 rounded text-[var(--veristiq-primary-blue)] shadow-sm">
                    {ticket.ticket.external_id}
                  </span>
                </div>
              </div>
              <Badge variant={ticket.ticket.is_eligible ? 'default' : 'secondary'} className={ticket.ticket.is_eligible ? "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200 text-sm py-1 px-3 shadow-none" : "text-sm py-1 px-3 bg-gray-100 text-gray-600 shadow-none"}>
                {ticket.ticket.is_eligible ? 'Eligible for Draw' : 'Not Eligible'}
              </Badge>
          </div>
          
          <CardContent className="p-8 space-y-8">
            {/* Competition Info */}
            <div className="grid md:grid-cols-2 gap-8 pb-8 border-b border-gray-100">
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Competition</h3>
                    <p className="text-xl font-semibold text-[var(--veristiq-slate)]">{ticket.competition.name}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                        <Shield className="w-4 h-4 text-gray-400" />
                        Operated by {ticket.operator.name}
                    </div>
                </div>
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Status</h3>
                    <div className="flex items-center gap-2">
                        {ticket.draw_status.has_been_drawn ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100">
                                <CheckCircle2 className="w-4 h-4" /> Draw Completed
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm font-medium border border-amber-100">
                                <Loader2 className="w-4 h-4" /> Draw Pending
                            </span>
                        )}
                    </div>
                    {ticket.draw_status.has_been_drawn && ticket.draw_status.drawn_at && (
                        <p className="text-sm text-gray-500 mt-2">
                            Drawn on {dateFormatters.shortDateTime(ticket.draw_status.drawn_at)}
                        </p>
                    )}
                </div>
            </div>

            {/* Entry Details */}
            <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Entry Details</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50/50 rounded-lg p-4 border border-gray-100 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-2 mb-2 text-gray-500 text-sm">
                            <Calendar className="w-4 h-4" /> Submitted
                        </div>
                        <p className="font-semibold text-[var(--veristiq-slate)]">
                            {dateFormatters.shortDateTime(ticket.ticket.submitted_at)}
                        </p>
                    </div>

                    <div className="bg-gray-50/50 rounded-lg p-4 border border-gray-100 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-2 mb-2 text-gray-500 text-sm">
                            <Shield className="w-4 h-4" /> Type
                        </div>
                        <p className="font-semibold text-[var(--veristiq-slate)]">
                            {ticket.ticket.is_free_entry ? 'Free Entry' : 'Paid Entry'}
                        </p>
                    </div>

                    <div className="bg-gray-50/50 rounded-lg p-4 border border-gray-100 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-2 mb-2 text-gray-500 text-sm">
                            <CheckCircle2 className="w-4 h-4" /> Question
                        </div>
                        <p className={`font-semibold ${ticket.ticket.is_eligible ? 'text-blue-600' : 'text-red-600'}`}>
                            {ticket.ticket.is_eligible ? 'Answered Correctly' : 'Incorrect Answer'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Draw Result / Actions */}
            {ticket.draw_status.has_been_drawn && (
                <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h4 className="font-bold text-[var(--veristiq-slate)] text-lg mb-1">Draw Audit Record</h4>
                            <p className="text-sm text-gray-600">
                                View the cryptographic proof of this draw's fairness.
                            </p>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            {ticket.result.is_winner ? (
                                <Button asChild className="bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white w-full md:w-auto shadow-sm">
                                    <Link href={ticket.result.draw_audit_url!}>
                                        View Draw Proof <ExternalLink className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            ) : (
                                <Button asChild variant="outline" className="w-full md:w-auto border-blue-200 text-blue-700 hover:bg-blue-50 bg-white">
                                    <Link href={`/audit/${ticket.draw_status.draw_audit_id}`}>
                                        View Full Audit Log <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
          </CardContent>
        </Card>

        {/* Verification Explanation */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-[var(--veristiq-slate)] border-none text-white shadow-xl md:col-span-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/10 pointer-events-none"></div>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-[var(--veristiq-teal)]" />
                        Independent Verification
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-300 space-y-2 relative z-10">
                    <p>
                    This ticket was cryptographically hashed and logged on the Veristiq immutable ledger at the time of entry. 
                    The draw was conducted using a verifiable CSPRNG seeded with external entropy.
                    </p>
                </CardContent>
            </Card>

            <div className="flex flex-col gap-3">
                <ComplaintDialog 
                    competitionId={ticket.competition.id}
                    competitionName={ticket.competition.name}
                    trigger={
                        <Button variant="outline" className="w-full h-full border-gray-200 bg-white hover:bg-gray-50 text-[var(--veristiq-slate)] justify-start px-6 shadow-sm">
                            <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
                            Report an Issue
                        </Button>
                    }
                />
            </div>
        </div>

      </main>
      <SiteFooter />
    </div>
  );
}
