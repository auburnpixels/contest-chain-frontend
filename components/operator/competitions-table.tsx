import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { OperatorActionsMenu } from '@/components/operator-actions-menu';
import { Eye, Activity, ShieldCheck, AlertTriangle, AlertCircle, Ticket } from 'lucide-react';
import Link from 'next/link';
import {
  formatEntries,
  OperatorCompetition
} from './competition-details-dialog';
import { formatDrawDate } from '@/lib/date-utils';
import { getStatusIndicatorBadge } from '@/lib/competition-status';
import { getCompetitionAttentionItems, hasCriticalAttention, hasWarningAttention, AttentionIssue } from '@/lib/attention-utils';
import { InfoTooltip } from '@/components/info-tooltip';
import { AttentionTooltip } from './attention-tooltip';

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
            <TableHead>
              <div className="flex items-center">
                External ID
                <InfoTooltip>
                  The unique identifier you use to reference this competition in API calls. Used for creating entries, running draws, etc.
                </InfoTooltip>
              </div>
            </TableHead>
          <TableHead>
            <div className="flex items-center">
              Status
              <InfoTooltip>
                Competition lifecycle: Active (accepting entries) → Awaiting Draw (entries closed) → Completed
              </InfoTooltip>
            </div>
          </TableHead>
            <TableHead>
              <div className="flex items-center">
                Entries
                <InfoTooltip>
                  Total number of entries submitted. Shows paid and free entries separately. More entries = more chances in the draw.
                </InfoTooltip>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                Prizes
                <InfoTooltip>
                  Number of prizes available in this competition. Each prize gets its own cryptographically-secure draw.
                </InfoTooltip>
              </div>
            </TableHead>
          <TableHead>
            <div className="flex items-center">
              Issues
              <InfoTooltip>
                Highlights competitions with overdue draws, unresolved complaints, or missing audit records. Click the badge for details.
              </InfoTooltip>
            </div>
          </TableHead>
            <TableHead>
              <div className="flex items-center">
                Draw At
                <InfoTooltip>
                  Scheduled date and time for the draw. Once this date passes, the competition moves to 'awaiting draw' status.
                </InfoTooltip>
              </div>
            </TableHead>
          {showActions && <TableHead></TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {competitions.map((competition) => {
          const attentionItems = competition.attention_issues || getCompetitionAttentionItems(competition);
          const hasCritical = attentionItems.some((item: AttentionIssue) => item.type === 'critical');
          const hasWarning = attentionItems.some((item: AttentionIssue) => item.type === 'warning');

          return (
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
                  {Number(competition.entries_count).toLocaleString()} <span className="text-muted-foreground">({Number(competition.free_entries_count).toLocaleString()} free)</span>
              </TableCell>
            <TableCell>
              {competition.prizes?.length || 0}
            </TableCell>
            <TableCell>
              <AttentionTooltip attentionItems={attentionItems} />
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
          );
        })}
      </TableBody>
    </Table>
  );
}

