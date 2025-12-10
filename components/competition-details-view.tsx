'use client';

import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getStatusIndicatorBadge } from '@/lib/competition-status';
import { formatDrawDate } from '@/lib/date-utils';
import { AttentionTooltip } from '@/components/operator/attention-tooltip';
import { AttentionIssue } from '@/lib/attention-utils';

export interface CompetitionDetailsViewProps {
  competition: {
    id?: string;
    name: string;
    external_id?: string;
    status: string;
    ticket_quantity?: number;
    max_tickets?: number;
    draw_at?: string | null;
    entries_count?: number;
    free_entries_count?: number;
    prizes?: Array<{
      id: string;
      name: string;
      draw_order?: number;
      has_been_drawn?: boolean;
      winning_ticket?: {
        id: string;
        external_id: string;
      } | null;
    }>;
    // Optional operator-only fields
    compliance_status?: string;
    compliance_percentage?: number;
    issues?: string[];
    attention_issues?: AttentionIssue[];
  };
}

export function CompetitionDetailsView({ competition }: CompetitionDetailsViewProps) {
  const attentionItems = competition.issues || competition.attention_issues || [];
  const hasEntries = typeof competition.entries_count !== 'undefined';
  const hasMaxTickets = typeof competition.ticket_quantity !== 'undefined' || typeof competition.max_tickets !== 'undefined';
  const hasDrawDate = typeof competition.draw_at !== 'undefined';
  const hasAttentionItems = attentionItems.length > 0;

  return (
    <div className="space-y-4 text-sm">
      {/* Name and External ID */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1 items-start">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Name</h3>
          {competition.name}
        </div>

        <div className="flex flex-col gap-1 items-start">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">External ID</h3>
          {competition.external_id || '—'}
        </div>
      </div>

      <Separator />

      {/* Status and Entries (if available) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-muted-foreground">Status</label>
          <div className="mt-1">
            {getStatusIndicatorBadge(competition)}
          </div>
        </div>

        {hasEntries && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-muted-foreground">Entries</label>
            <p className="mt-1 text-sm font-medium">
              {(competition.entries_count || 0).toLocaleString()}{' '}
              {typeof competition.free_entries_count !== 'undefined' && (
                <span className="text-muted-foreground">({competition.free_entries_count} free)</span>
              )}
            </p>
          </div>
        )}
      </div>

      {(hasMaxTickets || hasAttentionItems) && <Separator />}

      {/* Maximum entries and Issues (if available) */}
      {(hasMaxTickets || hasAttentionItems) && (
        <div className="grid grid-cols-2 gap-4">
          {hasMaxTickets && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-muted-foreground">Maximum entries</label>
              <p className="mt-1 text-sm">
                {Number(competition.ticket_quantity || competition.max_tickets || 0).toLocaleString()}
              </p>
            </div>
          )}

          {hasAttentionItems && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-muted-foreground">Issues</label>
              <div>
                <AttentionTooltip attentionItems={attentionItems} />
              </div>
            </div>
          )}
        </div>
      )}

      {hasDrawDate && <Separator />}

      {/* Draw Date (if available) */}
      {hasDrawDate && (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-muted-foreground">Draw At</label>
            <div className="mt-1">
              {formatDrawDate(competition)}
            </div>
          </div>
        </div>
      )}

      <Separator />

      {/* Prizes */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-muted-foreground">
          Prizes ({competition.prizes?.length || 0})
        </label>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Winner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {competition.prizes && competition.prizes.length > 0 ? (
              competition.prizes
                .slice()
                .sort((a, b) => (a.draw_order || 0) - (b.draw_order || 0))
                .map((prize) => (
                  <TableRow key={prize.id}>
                    <TableCell>{prize.name}</TableCell>
                    <TableCell>
                      {prize.winning_ticket ? (
                        prize.winning_ticket.external_id
                      ) : (
                        <span className="text-sm text-muted-foreground">Not drawn yet</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center text-muted-foreground">
                  No prizes available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}



