'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { publicApi, TicketVerification } from '@/lib/api/client';
import { 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  Calendar, 
  Shield, 
  ExternalLink,
  Loader2,
  AlertCircle
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
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-brand-cobalt" />
            <p className="text-muted-foreground">Verifying ticket...</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="container mx-auto px-4 py-16">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Ticket Not Found</AlertTitle>
            <AlertDescription>
              No ticket found with ID: {externalId} in this competition
            </AlertDescription>
          </Alert>
          <div className="mt-8 flex gap-4">
            <Button asChild>
              <Link href="/verify">Try Again</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Winner Alert */}
        {ticket.result.is_winner && (
          <Alert className="mb-8 bg-green-50 dark:bg-green-950/20 border-green-500">
            <Trophy className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-900 dark:text-green-100">
              Congratulations! You&apos;re a winner!
            </AlertTitle>
            <AlertDescription className="text-green-800 dark:text-green-200">
              This ticket won: {ticket.result.prize}
            </AlertDescription>
          </Alert>
        )}

        {/* Ticket Verification Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">Ticket Verification</CardTitle>
                <p className="text-muted-foreground mt-2">
                  Ticket ID: <span className="font-mono">{ticket.ticket.external_id}</span>
                </p>
              </div>
              <Badge variant={ticket.ticket.is_eligible ? 'default' : 'secondary'}>
                {ticket.ticket.is_eligible ? 'Eligible' : 'Not Eligible'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Competition Info */}
            <div>
              <h3 className="font-semibold mb-2">Competition</h3>
              <p className="text-lg">{ticket.competition.name}</p>
              <p className="text-sm text-muted-foreground">
                Operated by {ticket.operator.name}
              </p>
            </div>

            {/* Entry Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Entry Submitted</p>
                  <p className="text-sm text-muted-foreground">
                    {dateFormatters.shortDateTime(ticket.ticket.submitted_at)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                {ticket.ticket.is_eligible ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                )}
                <div>
                  <p className="text-sm font-medium">Question Answered</p>
                  <p className="text-sm text-muted-foreground">
                    {ticket.ticket.is_eligible ? 'Correctly ✓' : 'Incorrectly ✗'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Entry Type</p>
                  <p className="text-sm text-muted-foreground">
                    {ticket.ticket.is_free_entry ? 'Free Entry' : 'Paid Entry'}
                  </p>
                </div>
              </div>
            </div>

            {/* Draw Status */}
            {ticket.draw_status.has_been_drawn ? (
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Draw Completed</AlertTitle>
                <AlertDescription>
                  <p>
                    Draw conducted on {dateFormatters.shortDateTime(ticket.draw_status.drawn_at!)}
                  </p>
                  {ticket.result.is_winner ? (
                    <div className="mt-3">
                      <Button asChild size="sm">
                        <Link href={ticket.result.draw_audit_url!}>
                          View Draw Audit <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <p className="text-sm">This ticket was not selected as the winner.</p>
                      <Button asChild size="sm" variant="outline" className="mt-2">
                        <Link href={`/audit/${ticket.draw_status.draw_audit_id}`}>
                          View Full Draw Audit
                        </Link>
                      </Button>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Draw Pending</AlertTitle>
                <AlertDescription>
                  The draw for this competition has not been conducted yet. 
                  Check back after the draw date to see if you&apos;ve won.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Verification Explanation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">About This Verification</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              This verification is powered by CAFAAS, an independent audit system 
              that records every entry and draw with cryptographic proof.
            </p>
            <p>
              Your ticket was submitted to the CAFAAS platform and is part of the 
              tamper-proof audit trail. Once the draw is conducted, the full audit 
              record will be publicly available for verification.
            </p>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link href="/verify">Verify Another Ticket</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/audits">View All Draw Audits</Link>
            </Button>
          </div>
          
          <ComplaintDialog 
            competitionId={ticket.competition.id}
            competitionName={ticket.competition.name}
          />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}


