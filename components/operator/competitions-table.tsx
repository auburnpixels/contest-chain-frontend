import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { OperatorActionsMenu } from '@/components/operator-actions-menu';
import { Eye, Activity, ShieldCheck, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import {
  formatEntries,
  OperatorCompetition
} from './competition-details-dialog';
import { formatDrawDate } from '@/lib/date-utils';
import { getStatusIndicatorBadge } from '@/lib/competition-status';

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
          <TableHead>ID</TableHead>
          <TableHead>External ID</TableHead>
          <TableHead>Competition</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Prizes</TableHead>
          <TableHead>Entries</TableHead>
          <TableHead>Complaints</TableHead>
          <TableHead>Draw At</TableHead>
          {showActions && <TableHead></TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {competitions.map((competition) => (
          <TableRow key={competition.id}>
            <TableCell className="font-mono text-xs text-muted-foreground">
              {competition.id?.substring(0, 8)}...
            </TableCell>
            <TableCell>
              <Badge variant="outline">
                {competition.external_id}
              </Badge>
            </TableCell>
            <TableCell className="font-medium text-foreground">
              {competition.name}
            </TableCell>
            <TableCell>
              {getStatusIndicatorBadge(competition)}
            </TableCell>
            <TableCell>
              {competition.prizes?.length || 0}
            </TableCell>
            <TableCell>
              {formatEntries(competition)}
            </TableCell>
            <TableCell>
              {(competition.complaints_count || 0) > 0 ? (
                <span className="text-red-500">
                    {competition.complaints_count}
                </span>
              ) : (
                0
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
                      icon: Eye,
                      onSelect: onViewDetails ? () => onViewDetails(competition) : undefined,
                    },
                    {
                      label: 'Events',
                      icon: Activity,
                      href: `/operator/draw-events?competition=${competition.id}`,
                    },
                    {
                      label: 'Audits',
                      icon: ShieldCheck,
                      href: `/operator/competitions/${competition.id}`,
                      disabled: (competition.draw_audits_count || 0) === 0,
                    },
                      {
                          label: 'Complaints',
                          icon: AlertTriangle,
                          href: `/operator/complaints/${competition.id}`,
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

