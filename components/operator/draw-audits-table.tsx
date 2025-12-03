import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { IndicatorBadge } from '@/components/ui/indicator-badge';
import { dateFormatters } from '@/lib/date-utils';

// Unified DrawAudit type that supports both public and operator page data structures
export interface DrawAudit {
  id: number | string;
  draw_id: string;
  sequence?: number; // Chain position (may be missing in public page data)
  
  // Operator info (only in public page)
  operator?: {
    uuid: string;
    name: string;
    slug: string;
    url: string;
  } | null;
  
  // Competition info
  competition: {
    id: string;
    name: string;
    external_id?: string;
  } | null;
  
  // Prize info
  prize?: {
    id: string;
    name: string;
  } | null;
  prize_name?: string | null; // Alternative format from public page
  
  // Draw details
  drawn_at_utc: string;
  total_entries: number;
  
  // Winning ticket (two different formats)
  winning_ticket?: string | null; // Public page format
  selected_entry?: {
    id: string;
    external_id: string;
    number: number;
  } | null; // Operator page format
  
  // Cryptographic data
  signature_hash: string;
  previous_signature_hash: string | null;
  pool_hash?: string | null;
  rng_seed_or_hash?: string;
  created_at?: string;
}

interface DrawAuditsTableProps {
  audits: DrawAudit[];
  showOperator?: boolean;
  renderActions?: (audit: DrawAudit) => React.ReactNode;
}

// Helper function to format chain position
const formatChainPosition = (sequence?: number): string => {
  if (!sequence) return 'N/A';
  return `#${sequence.toLocaleString()}`;
};

// Helper function to get winning ticket from either data structure
const getWinningTicket = (audit: DrawAudit): string => {
  if (audit.winning_ticket) return audit.winning_ticket;
  if (audit.selected_entry) return audit.selected_entry.external_id;
  return 'N/A';
};

// Helper function to get prize name from either data structure
const getPrizeName = (audit: DrawAudit): string => {
  if (audit.prize?.name) return audit.prize.name;
  if (audit.prize_name) return audit.prize_name;
  return 'N/A';
};

export function DrawAuditsTable({ 
  audits, 
  showOperator = false,
  renderActions
}: DrawAuditsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50 hover:bg-muted/50">
          <TableHead className="w-[180px]">ID</TableHead>
          <TableHead className="w-[180px]">Chain Position</TableHead>
          {showOperator && <TableHead className="w-[180px]">Operator</TableHead>}
          <TableHead className="w-[180px]">Competition</TableHead>
          <TableHead className="w-[180px]">Prize</TableHead>
          <TableHead className="w-[250px]">Draw At</TableHead>
          <TableHead className="w-[250px]">Entries</TableHead>
          <TableHead className="w-[250px]">Winning ticket</TableHead>
          <TableHead className={renderActions ? "" : "text-right"}>Integrity</TableHead>
          {renderActions && <TableHead className="text-right"></TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {audits.map((audit) => (
          <TableRow key={audit.id} className="group hover:bg-muted/30 transition-colors">
            <TableCell>
              <code className="text-xs text-muted-foreground font-mono">
                {audit.draw_id?.substring(0, 8)}...
              </code>
            </TableCell>
            <TableCell>
              <Badge variant="outline" className="font-mono">
                {formatChainPosition(audit.sequence)}
              </Badge>
            </TableCell>
            {showOperator && (
              <TableCell>
                {audit.operator?.name || 'N/A'}
              </TableCell>
            )}
            <TableCell>
              {audit.competition ? (
                <div className="font-medium text-foreground">{audit.competition.name}</div>
              ) : (
                <span className="text-muted-foreground">N/A</span>
              )}
            </TableCell>
            <TableCell>
              {getPrizeName(audit)}
            </TableCell>
            <TableCell>
              {dateFormatters.shortDateTime(audit.drawn_at_utc)}
            </TableCell>
            <TableCell>
              {audit.total_entries.toLocaleString()}
            </TableCell>
            <TableCell>
              {getWinningTicket(audit)}
            </TableCell>
            <TableCell>
              <IndicatorBadge color="green" text="Verified" size="xs" />
            </TableCell>
            {renderActions && (
              <TableCell className="text-right">
                {renderActions(audit)}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

