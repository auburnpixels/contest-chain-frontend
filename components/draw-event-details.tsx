'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { IndicatorBadge } from '@/components/ui/indicator-badge';
import { InfoTooltip } from '@/components/info-tooltip';
import { dateFormatters } from '@/lib/date-utils';

export interface DrawEvent {
  id: string;
  event_type: string;
  event_hash: string;
  previous_event_hash: string | null;
  sequence: number;
  actor_type: string | null;
  actor_id: string | null;
  competition_title: string;
  ip_address: string | null;
  created_at: string;
  event_payload: Record<string, unknown>;
}

interface DrawEventDetailsProps {
  event: DrawEvent;
}

// Helper function to map technical event types to friendly names
const getEventDisplayName = (eventType: string): string => {
  const mapping: Record<string, string> = {
    'competition.created': 'Competition Created',
    'competition.updated': 'Competition Updated',
    'competition.closed': 'Competition Closed',
    'operator.competition_created': 'Competition Created',
    'operator.draw_requested': 'Draw Triggered',
    'operator.api_request': 'API Request',
    'operator.entry_created': 'Entry Created',
    'raffle.published': 'Competition Published',
    'raffle.closed': 'Competition Closed',
    'raffle.updated': 'Competition Updated',
    'entry.created': 'Entry Added',
    'entry.deleted': 'Entry Removed',
    'draw.triggered': 'Draw Triggered',
    'draw.completed': 'Draw Completed',
    'draw.skipped_no_entries': 'Draw Skipped (No Entries)',
    'complaint.submitted': 'Complaint Submitted',
    'prize.created': 'Prize Created',
    'prize.updated': 'Prize Updated',
    'prize.deleted': 'Prize Deleted',
  };
  return mapping[eventType] || eventType;
};

// Format chain position with commas
const formatChainPosition = (sequence: number): string => {
  return `#${sequence.toLocaleString()}`;
};

export function DrawEventDetails({ event }: DrawEventDetailsProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, fieldName: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-4 text-sm">
      {/* Event Type & Chain Position */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1 items-start">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Event Type</h3>
          <span className="text-foreground">{getEventDisplayName(event.event_type)}</span>
        </div>

        <div className="flex flex-col gap-1 items-start">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Chain Position</h3>
          <Badge variant="outline" className="font-mono">
            {formatChainPosition(event.sequence)}
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Competition & Timestamp */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1 items-start">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Competition</h3>
          <p className="text-sm font-medium">{event.competition_title}</p>
        </div>

        <div className="flex flex-col gap-1 items-start">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Timestamp</h3>
          <p className="text-sm">{dateFormatters.shortDateTime(event.created_at)}</p>
        </div>
      </div>

      <Separator />

      {/* Actor & Status */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1 items-start">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Actor</h3>
          <p className="text-sm">
            {event.actor_type || 'system'}
            {event.actor_id && ` (ID: ${event.actor_id})`}
          </p>
        </div>

        <div className="flex flex-col gap-1 items-start">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Integrity Status</h3>
          <IndicatorBadge color="green" text="Valid" size="xs" />
        </div>
      </div>

      {event.ip_address && (
        <>
          <Separator />
          <div className="flex flex-col gap-1 items-start">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">IP Address</h3>
            <p className="text-sm font-mono">{event.ip_address}</p>
          </div>
        </>
      )}

      <Separator />

      {/* Cryptographic Data */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
            Event Hash
            <InfoTooltip>
              Unique cryptographic fingerprint of this event. Used to verify the event hasn&apos;t been tampered with.
            </InfoTooltip>
          </h3>
          <div className="flex items-start gap-2">
            <p className="text-xs font-mono break-all bg-muted p-2 rounded flex-1">
              {event.event_hash}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 shrink-0"
              onClick={() => copyToClipboard(event.event_hash, 'event_hash')}
            >
              {copiedField === 'event_hash' ? (
                <Check className="h-4 w-4 text-blue-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {event.previous_event_hash ? (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
              Previous Event Hash
              <InfoTooltip>
                Links this event to the previous one in the chain, creating an unbreakable sequence.
              </InfoTooltip>
            </h3>
            <div className="flex items-start gap-2">
              <p className="text-xs font-mono break-all bg-muted p-2 rounded flex-1">
                {event.previous_event_hash}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 shrink-0"
                onClick={() => copyToClipboard(event.previous_event_hash!, 'previous_event_hash')}
              >
                {copiedField === 'previous_event_hash' ? (
                  <Check className="h-4 w-4 text-blue-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Previous Event Hash</h3>
            <p className="text-xs text-muted-foreground italic bg-muted p-2 rounded">
              Genesis Event (First in chain)
            </p>
          </div>
        )}

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
            Event ID
            <InfoTooltip>
              Internal unique identifier for this event.
            </InfoTooltip>
          </h3>
          <div className="flex items-start gap-2">
            <p className="text-xs font-mono break-all bg-muted p-2 rounded flex-1">
              {event.id}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 shrink-0"
              onClick={() => copyToClipboard(event.id, 'event_id')}
            >
              {copiedField === 'event_id' ? (
                <Check className="h-4 w-4 text-blue-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Signed Payload */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
          Signed Payload
          <InfoTooltip>
            The complete data that was cryptographically signed for this event.
          </InfoTooltip>
        </h3>
        <div className="relative">
          <pre className="text-xs font-mono break-all bg-muted p-3 rounded overflow-x-auto max-h-48">
            {JSON.stringify(event.event_payload, null, 2)}
          </pre>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 p-0"
            onClick={() => copyToClipboard(JSON.stringify(event.event_payload, null, 2), 'payload')}
          >
            {copiedField === 'payload' ? (
              <Check className="h-4 w-4 text-blue-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

