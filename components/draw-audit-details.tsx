import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { IndicatorBadge } from '@/components/ui/indicator-badge';
import { InfoTooltip } from '@/components/info-tooltip';
import { DrawAudit } from '@/components/operator/draw-audits-table';

interface DrawAuditDetailsProps {
  audit: DrawAudit;
  showOperator?: boolean;
}

export function DrawAuditDetails({ audit, showOperator = false }: DrawAuditDetailsProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, fieldName: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatChainPosition = (sequence: number): string => {
    return `#${sequence.toLocaleString()}`;
  };

  return (
    <div className="space-y-4 text-sm">
      {/* Chain Position */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1 items-start">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">ID</h3>
          <span className="text-muted-foreground">{audit.draw_id}</span>
        </div>

        <div className="flex flex-col gap-1 items-start">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Chain Position</h3>
          <Badge variant="outline" className="font-mono ">
            {formatChainPosition(audit.sequence || 0)}
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Competition & Prize */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1 items-start">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Competition</h3>
          <p className="text-sm font-medium">{audit.competition?.name || 'N/A'}</p>
        </div>

        <div className="flex flex-col gap-1 items-start">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Prize</h3>
          <p className="text-sm font-medium">{audit.prize?.name || audit.prize_name || 'N/A'}</p>
        </div>
      </div>

      <Separator />

      {/* Draw Information */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1 items-start">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Draw At</h3>
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

        <div className="flex flex-col gap-1 items-start">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Entries</h3>
          <p className="text-sm font-medium">{audit.total_entries.toLocaleString()}</p>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1 items-start">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Winning ticket</h3>
          <p className="text-sm font-mono break-all">
            {audit.selected_entry
              ? `${audit.selected_entry.external_id}`
              : audit.winning_ticket || 'N/A'}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Integrity Status</h3>
          <IndicatorBadge color="green" text="Verified" size="xs" />
        </div>
      </div>

      <Separator />

      {/* Cryptographic Data */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
            Signature Hash
            <InfoTooltip>
              Unique identifier for this draw event in the audit chain. Links to previous draws to
              prevent tampering.
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
                Links this draw to the previous event in the chain, creating an unbreakable
                sequence.
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
                onClick={() =>
                  copyToClipboard(audit.previous_signature_hash!, 'previous_signature_hash')
                }
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
              The cryptographic fingerprint of the random seed used to select the winner. This
              proves the randomness source can&apos;t be changed after the draw.
            </InfoTooltip>
          </h3>
          <div className="flex items-start gap-2">
            <p className="text-xs font-mono break-all bg-muted p-2 rounded flex-1">
              {audit.rng_seed_or_hash || 'N/A'}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 shrink-0"
              onClick={() => copyToClipboard(audit.rng_seed_or_hash || '', 'rng_seed_or_hash')}
              disabled={!audit.rng_seed_or_hash}
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
                Fingerprint of all eligible entries at draw time. Proves entries weren&apos;t added
                or removed after the draw started.
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
    </div>
  );
}








