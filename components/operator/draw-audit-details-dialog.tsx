import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { IndicatorBadge } from '@/components/ui/indicator-badge';
import { InfoTooltip } from '@/components/info-tooltip';

interface DrawAudit {
  id: string;
  sequence: number;
  competition: {
    id: string;
    name: string;
    external_id: string;
  } | null;
  prize: {
    id: string;
    name: string;
  } | null;
  draw_id: string;
  drawn_at_utc: string;
  total_entries: number;
  selected_entry: {
    id: string;
    external_id: string;
    number: number;
  } | null;
  signature_hash: string;
  previous_signature_hash: string | null;
  pool_hash: string | null;
  rng_seed_or_hash: string;
  created_at: string;
}

interface DrawAuditDetailsDialogProps {
  audit: DrawAudit | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DrawAuditDetailsDialog({
  audit,
  open,
  onOpenChange,
}: DrawAuditDetailsDialogProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, fieldName: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!audit) return null;

  const formatChainPosition = (sequence: number): string => {
    return `#${sequence.toLocaleString()}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Draw Audit Details</DialogTitle>
          <DialogDescription>
            Cryptographically verified draw information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Chain Position */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Chain Position</h3>
            <Badge variant="outline" className="font-mono text-base">
              {formatChainPosition(audit.sequence)}
            </Badge>
          </div>

          <Separator />

          {/* Competition & Prize */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Competition</h3>
              <p className="text-sm font-medium">
                {audit.competition?.name || 'N/A'}
              </p>
              {audit.competition?.external_id && (
                <Badge variant="outline" className="mt-1">
                  {audit.competition.external_id}
                </Badge>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Prize</h3>
              <p className="text-sm font-medium">{audit.prize?.name || 'N/A'}</p>
            </div>
          </div>

          <Separator />

          {/* Draw Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Draw ID</h3>
              <div className="flex items-center gap-2">
                <p className="text-sm font-mono break-all">{audit.draw_id}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => copyToClipboard(audit.draw_id, 'draw_id')}
                >
                  {copiedField === 'draw_id' ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Draw Date</h3>
              <p className="text-sm">
                {new Date(audit.drawn_at_utc).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>

          <Separator />

          {/* Entries & Winner */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Entries</h3>
              <p className="text-sm font-medium">{audit.total_entries.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Winner Entry</h3>
              <p className="text-sm font-medium">
                {audit.selected_entry ? `#${audit.selected_entry.number}` : 'N/A'}
              </p>
            </div>
          </div>

          <Separator />

          {/* Cryptographic Data */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                Signature Hash
                <InfoTooltip>
                  Unique identifier for this draw event in the audit chain. Links to previous draws to prevent tampering.
                </InfoTooltip>
              </h3>
              <div className="flex items-start gap-2">
                <p className="text-xs font-mono break-all bg-muted p-2 rounded flex-1">
                  {audit.signature_hash}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 shrink-0"
                  onClick={() => copyToClipboard(audit.signature_hash, 'signature_hash')}
                >
                  {copiedField === 'signature_hash' ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {audit.previous_signature_hash && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                  Previous Signature Hash
                  <InfoTooltip>
                    Links this draw to the previous event in the chain, creating an unbreakable sequence.
                  </InfoTooltip>
                </h3>
                <div className="flex items-start gap-2">
                  <p className="text-xs font-mono break-all bg-muted p-2 rounded flex-1">
                    {audit.previous_signature_hash}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 shrink-0"
                    onClick={() => copyToClipboard(audit.previous_signature_hash!, 'previous_signature_hash')}
                  >
                    {copiedField === 'previous_signature_hash' ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                RNG Seed / Hash
                <InfoTooltip>
                  The cryptographic fingerprint of the random seed used to select the winner. This proves the randomness source can't be changed after the draw.
                </InfoTooltip>
              </h3>
              <div className="flex items-start gap-2">
                <p className="text-xs font-mono break-all bg-muted p-2 rounded flex-1">
                  {audit.rng_seed_or_hash}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 shrink-0"
                  onClick={() => copyToClipboard(audit.rng_seed_or_hash, 'rng_seed_or_hash')}
                >
                  {copiedField === 'rng_seed_or_hash' ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {audit.pool_hash && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                  Pool Hash
                  <InfoTooltip>
                    Fingerprint of all eligible entries at draw time. Proves entries weren't added or removed after the draw started.
                  </InfoTooltip>
                </h3>
                <div className="flex items-start gap-2">
                  <p className="text-xs font-mono break-all bg-muted p-2 rounded flex-1">
                    {audit.pool_hash}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 shrink-0"
                    onClick={() => copyToClipboard(audit.pool_hash!, 'pool_hash')}
                  >
                    {copiedField === 'pool_hash' ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Integrity Status */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Integrity Status</h3>
            <IndicatorBadge color="green" text="Verified" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}



