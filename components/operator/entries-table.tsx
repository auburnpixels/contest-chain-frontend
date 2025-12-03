'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { isEntryEligible } from '@/lib/utils';
import { dateFormatters } from '@/lib/date-utils';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import {IndicatorBadge} from "@/components/ui/indicator-badge";

export interface OperatorEntry {
  id: string;
  external_id: string;
  user_reference: string;
  competition_id: string;
  is_free: boolean;
  question_answered_correctly?: boolean;
  deleted_at?: string | null;
  created_at: string;
  competition?: {
    name: string;
  };
}

interface EntriesTableProps {
  entries: OperatorEntry[];
  showCompetitionName?: boolean;
}

export function EntriesTable({ entries, showCompetitionName = true }: EntriesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>External ID</TableHead>
          <TableHead>User Reference</TableHead>
            {showCompetitionName && <TableHead>Competition</TableHead>}
          <TableHead>Type</TableHead>
          <TableHead>Eligibility</TableHead>
          <TableHead>Issued At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => {
          const isEligible = isEntryEligible(entry.is_free, entry.question_answered_correctly || false, entry.deleted_at);
          
          return (
            <TableRow key={entry.id}>
              <TableCell>
                {entry.external_id}
              </TableCell>
                <TableCell>
                    {entry.user_reference}
                </TableCell>
                {showCompetitionName && (
                    <TableCell className="max-w-[200px] truncate">
                        {entry.competition?.name || 'Unknown'}
                    </TableCell>
                )}
              <TableCell>
                <Badge variant="outline">
                  {entry.is_free ? 'Free' : 'Paid'}
                </Badge>
              </TableCell>
              <TableCell>
                  <IndicatorBadge
                      text={entry.deleted_at ? 'Voided' : isEligible ? 'Correct answer' : 'Incorrect answer'}
                      color={entry.deleted_at || !isEligible ? 'red' : 'green'}
                      size="xs"
                  />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {dateFormatters.shortDateTime(entry.created_at)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
