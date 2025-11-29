import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { OperatorActionsMenu } from '@/components/operator-actions-menu';
import { Eye, Activity, ShieldCheck, AlertTriangle, Ticket } from 'lucide-react';
import Link from 'next/link';
import {
  formatEntries,
  OperatorCompetition
} from './competition-details-dialog';
import { formatDrawDate } from '@/lib/date-utils';
import { getStatusIndicatorBadge } from '@/lib/competition-status';
import { ComplianceScoreDisplay } from './compliance-score-display';
import { DrawIntegrityBadge } from '@/components/draw-integrity-badge';
import {InfoTooltip} from "@/components/info-tooltip";

interface CompetitionsTableProps {
  competitions: OperatorCompetition[];
  showActions?: boolean;
  onViewDetails?: (competition: OperatorCompetition) => void;
}

export function CompetitionsTable({ 
  competitions, 
  showActions = true,
  onViewDetails 
}: CompetitionsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
            <TableHead>Competition</TableHead>
            <TableHead>External ID</TableHead>
          <TableHead>Status</TableHead>
            <TableHead>Entries</TableHead>
            <TableHead>Prizes</TableHead>
          <TableHead>Complaints</TableHead>
          <TableHead>
              <div className="flex items-center">
                  <span>Draw integrity</span>
                  <InfoTooltip>
                      Displays how many prizes have full, verified audit trails. Green means the draws for this competition has been checked and recorded correctly.
                  </InfoTooltip>
              </div>
          </TableHead>
          <TableHead>Compliance</TableHead>
            <TableHead>Draw at</TableHead>
          {showActions && <TableHead></TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {competitions.map((competition) => (
          <TableRow key={competition.id}>
              <TableCell className="font-medium text-foreground">
                  {competition.name}
              </TableCell>
            <TableCell>
                {competition.external_id}
            </TableCell>
            <TableCell>
              {getStatusIndicatorBadge(competition)}
            </TableCell>
              <TableCell>
                  {competition.entries_count} <span className="text-muted-foreground">({competition.free_entries_count} free)</span>
              </TableCell>
            <TableCell>
              {competition.prizes?.length || 0}
            </TableCell>
            <TableCell>
              {(competition.complaints_count || 0) > 0 ? (
                  <Link href={`/operator/complaints?competition=${competition.id}`}>
                      <span className=" underline">{competition.complaints_count} complaints</span>
                  </Link>
              ) : (
                <span className="text-muted-foreground">0</span>
              )}
            </TableCell>
            <TableCell>
              <DrawIntegrityBadge
                totalPrizes={competition.total_prizes || 0}
                drawnPrizes={competition.drawn_prizes || 0}
                hasCompleteIntegrity={competition.has_complete_draw_integrity || false}
              />
            </TableCell>
            <TableCell>
              {competition.compliance_score_detail ? (
                <ComplianceScoreDisplay score={competition.compliance_score_detail} size="sm" />
              ) : (
                <span className="text-muted-foreground">Pending</span>
              )}
            </TableCell>
            <TableCell>
              {formatDrawDate(competition)}
            </TableCell>

            {showActions && (
              <TableCell>
                <OperatorActionsMenu
                  actions={[
                    {
                      label: 'Details',
                      onSelect: onViewDetails ? () => onViewDetails(competition) : undefined,
                    },
                    {
                      label: 'Entries',
                      href: `/operator/entries?competition_id=${competition.id}`,
                    },
                    {
                      label: 'Events',
                      href: `/operator/draw-events?competition=${competition.id}`,
                    },
                    {
                      label: 'Audits',
                      href: `/operator/draws?competition=${competition.id}`,
                      disabled: (competition.draw_audits_count || 0) === 0,
                    },
                      {
                          label: 'Complaints',
                          href: `/operator/complaints?competition=${competition.id}`,
                          disabled: (competition.complaints_count || 0) === 0,
                      },
                  ]}
                />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

