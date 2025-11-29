import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { getCompetitionStatusVariant } from '@/lib/badge-variants';

interface CompetitionBreakdownDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  competition: {
    raffle_id: string;
    name: string;
    status: string;
    external_id: string;
    total_entries: number;
    postal_entries: number;
    free_entry_percentage: number;
    has_audit: boolean;
    audit_count: number;
    active_complaints: number;
    compliance_score: number;
  } | null;
}

export function CompetitionBreakdownDialog({
  open,
  onOpenChange,
  competition,
}: CompetitionBreakdownDialogProps) {
  if (!competition) return null;

  const getScoreStatus = (score: number) => {
    if (score >= 95) return { color: 'text-green-600', label: 'Excellent' };
    if (score >= 80) return { color: 'text-yellow-600', label: 'Good' };
    return { color: 'text-red-600', label: 'Needs Improvement' };
  };

  const scoreStatus = getScoreStatus(competition.compliance_score);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{competition.name}</DialogTitle>
          <DialogDescription>Competition Compliance Breakdown</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant={getCompetitionStatusVariant(competition.status)} className="mt-1">
                {competition.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">External ID</p>
              <p className="font-medium">{competition.external_id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Compliance Score</p>
              <p className={`text-2xl font-bold ${scoreStatus.color}`}>
                {competition.compliance_score}%
              </p>
              <p className="text-sm text-muted-foreground">{scoreStatus.label}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Competition ID</p>
              <code className="text-xs font-mono">{competition.raffle_id.substring(0, 8)}...</code>
            </div>
          </div>

          {/* Entry Statistics */}
          <div>
            <h4 className="font-semibold mb-3">Entry Statistics</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Entries</p>
                <p className="text-xl font-bold">{competition.total_entries}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Postal Entries</p>
                <p className="text-xl font-bold">{competition.postal_entries}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Free Entry %</p>
                <p className="text-xl font-bold">{competition.free_entry_percentage.toFixed(2)}%</p>
              </div>
            </div>
          </div>

          {/* Compliance Checks */}
          <div>
            <h4 className="font-semibold mb-3">Compliance Checks</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {competition.has_audit ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span className="text-sm">
                  Draw Integrity: {competition.has_audit ? `${competition.audit_count} audits` : 'No audits'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {competition.postal_entries > 0 ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                )}
                <span className="text-sm">
                  Free Entry Route: {competition.postal_entries > 0 ? 'Available' : 'Not used'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {competition.active_complaints === 0 ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                )}
                <span className="text-sm">
                  Complaints: {competition.active_complaints === 0 ? 'None active' : `${competition.active_complaints} active`}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Link href={`/operator/competitions/${competition.raffle_id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Competition
              </Button>
            </Link>
            {competition.has_audit && (
              <Link href={`/draw-audits/${competition.raffle_id}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  View Audits
                </Button>
              </Link>
            )}
            <Link href={`/operator/complaints?competition=${competition.raffle_id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                View Complaints
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

