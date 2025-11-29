import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { IndicatorBadge } from '@/components/ui/indicator-badge';
import { dateFormatters } from '@/lib/date-utils';
import { maskEmail } from '@/lib/utils';

export interface OperatorEntry {
  id: string;
  external_id: string;
  ticket_number: number;
  is_free: boolean;
  user_reference: string | null;
  question_answered_correctly: boolean;
  deleted_at: string | null;
  created_at: string;
  competition: {
    id: string;
    name: string;
    external_id: string;
  } | null;
}

interface EntriesTableProps {
  entries: OperatorEntry[];
}

export function EntriesTable({ entries }: EntriesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>External ID</TableHead>
          <TableHead>Competition</TableHead>
          <TableHead>User Reference</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Eligible</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => {
          const isDeleted = !!entry.deleted_at;
          
          return (
          <TableRow key={entry.id} className={isDeleted ? 'opacity-60' : ''}>
            <TableCell className="font-mono text-xs text-muted-foreground">
              {entry.id?.substring(0, 8)}...
            </TableCell>
            <TableCell>
                {entry.external_id}
            </TableCell>
              <TableCell>
                  <div className="max-w-[200px] truncate">
                      {entry.competition?.name || '—'}
                  </div>
              </TableCell>
            <TableCell>
              {maskEmail(entry.user_reference)}
            </TableCell>
            <TableCell>
              <Badge variant="outline">
                {entry.is_free ? 'Free' : 'Paid'}
              </Badge>
            </TableCell>
            <TableCell>
              {isDeleted ? (
                <IndicatorBadge color="red" text="Deleted" />
              ) : entry.question_answered_correctly ? (
                <IndicatorBadge color="green" text="Correct answer" />
              ) : (
                <IndicatorBadge color="red" text="Incorrect answer" />
              )}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {dateFormatters.shortDateTime(entry.created_at)}
            </TableCell>
          </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}



