'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Copy, Download, CheckCircle, Clock } from 'lucide-react';

// TypeScript interfaces for Event data structure
export interface EventPayload {
  [key: string]: unknown;
}

export interface EventCompetition {
  id: string;
  name: string;
}

export interface DrawEvent {
  id: string;
  event_type: string;
  event_hash: string;
  previous_event_hash: string | null;
  sequence: number;
  actor_type?: string;
  actor_id?: string;
  ip_address?: string;
  created_at: string;
  is_chained: boolean;
  event_payload: EventPayload;
  competition?: EventCompetition;
  competition_title?: string;
  competition_id?: string;
  environment?: string;
}

export interface EventDetailsDialogProps {
  event: DrawEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Helper function to map technical event types to friendly names
const getEventDisplayName = (eventType: string): string => {
  const mapping: Record<string, string> = {
    'competition.created': 'Competition Created',
    'operator.competition_created': 'Competition Created',
    'operator.draw_requested': 'Draw Triggered',
    'operator.api_request': 'API Request',
    'operator.entry_created': 'Entry Created',
    'competition.published': 'Competition Published',
    'competition.closed': 'Competition Closed',
    'competition.updated': 'Competition Updated',
    'entry.created': 'Entry Added',
    'entry.deleted': 'Entry Removed',
    'draw.started': 'Draw Started',
    'draw.completed': 'Draw Completed',
    'draw.seed_generated': 'Draw Seed Generated',
    'draw.randomization_run': 'Randomization Run',
    'draw.audit_created': 'Draw Audit Created',
    'complaint.submitted': 'Complaint Submitted',
    'prize.created': 'Prize Created',
    'prize.deleted': 'Prize Deleted',
  };
  return mapping[eventType] || eventType;
};

// Format chain position with commas
const formatChainPosition = (sequence: number): string => {
  return `#${sequence.toLocaleString()}`;
};

export function EventDetailsDialog({ event, open, onOpenChange }: EventDetailsDialogProps) {
  const [copySuccess, setCopySuccess] = useState<string>('');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(label);
    setTimeout(() => setCopySuccess(''), 2000);
  };

  const downloadEventAsJson = () => {
    if (!event) return;

    const jsonContent = JSON.stringify(event, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `event-${event.sequence}-${new Date(event.created_at).toISOString().split('T')[0]}.json`;
    link.click();
  };

  if (!event) return null;

  const competitionName = event.competition?.name || event.competition_title || 'N/A';
  const integrityStatus = event.is_chained ? 'Valid' : 'Pending';
  const integrityVariant = event.is_chained ? 'default' : 'secondary';
  const integrityColor = event.is_chained ? 'text-green-500' : 'text-yellow-500';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {getEventDisplayName(event.event_type)}
          </DialogTitle>
          <div className="flex items-center gap-3 pt-2">
            <span className="text-sm text-muted-foreground">
              Event {formatChainPosition(event.sequence)}
            </span>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center gap-1.5">
              {event.is_chained ? (
                <CheckCircle className={`h-4 w-4 ${integrityColor}`} />
              ) : (
                <Clock className={`h-4 w-4 ${integrityColor}`} />
              )}
              <span className={`text-sm font-medium ${integrityColor}`}>
                Integrity: {integrityStatus}
              </span>
            </div>
          </div>
          <div className="pt-1">
            <span className="text-sm text-muted-foreground">Competition: </span>
            <span className="text-sm">{competitionName}</span>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Cryptographic Verification Section */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-base font-semibold">Cryptographic Verification</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    Event Hash
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs font-mono break-all bg-muted p-3 rounded border">
                      {event.event_hash}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(event.event_hash, 'Event Hash')}
                      className="shrink-0"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    Previous Event Hash
                  </label>
                  {event.previous_event_hash ? (
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs font-mono break-all bg-muted p-3 rounded border">
                        {event.previous_event_hash}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(event.previous_event_hash!, 'Previous Hash')}
                        className="shrink-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic bg-muted p-3 rounded border">
                      Genesis Event (First in chain)
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                      Chain Position
                    </label>
                    <p className="text-sm font-mono bg-muted p-2 rounded border">
                      {formatChainPosition(event.sequence)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                      Hash Algorithm
                    </label>
                    <p className="text-sm font-mono bg-muted p-2 rounded border">
                      SHA-256
                    </p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                      Integrity Status
                    </label>
                    <Badge variant={integrityVariant} className="text-sm">
                      {integrityStatus}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Metadata Section */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-base font-semibold">Event Metadata</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    Event Type
                  </label>
                  <code className="text-xs bg-muted p-2 rounded border block">
                    {event.event_type}
                  </code>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    Actor
                  </label>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {event.actor_type || 'system'}
                    </Badge>
                    {event.actor_id && (
                      <span className="text-xs text-muted-foreground">
                        ID: {event.actor_id}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    Timestamp (UTC)
                  </label>
                  <p className="text-sm bg-muted p-2 rounded border">
                    {new Date(event.created_at).toUTCString()}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    Competition
                  </label>
                  <p className="text-sm bg-muted p-2 rounded border truncate" title={competitionName}>
                    {competitionName}
                  </p>
                </div>

                {event.environment && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                      Environment
                    </label>
                    <Badge variant="outline" className="text-xs">
                      {event.environment}
                    </Badge>
                  </div>
                )}

                {event.ip_address && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                      IP Address
                    </label>
                    <p className="text-sm font-mono bg-muted p-2 rounded border">
                      {event.ip_address}
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    Event ID
                  </label>
                  <p className="text-xs font-mono bg-muted p-2 rounded border break-all">
                    {event.id}
                  </p>
                </div>

                {event.competition_id && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                      Competition ID
                    </label>
                    <p className="text-xs font-mono bg-muted p-2 rounded border break-all">
                      {event.competition_id}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Signed Payload Section */}
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="payload" className="border-none">
                  <AccordionTrigger className="text-base font-semibold hover:no-underline py-0">
                    Signed Payload (Tamper-evident)
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="relative">
                      <pre className="text-xs font-mono bg-muted p-4 rounded border overflow-x-auto max-h-96 overflow-y-auto">
{JSON.stringify(event.event_payload, null, 2)}
                      </pre>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(JSON.stringify(event.event_payload, null, 2), 'Payload')}
                        className="absolute top-2 right-2"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy JSON
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Dialog Footer */}
        <div className="flex items-center justify-between pt-6 border-t mt-6">
          <div>
            {copySuccess && (
              <span className="text-sm text-green-500">
                ✓ {copySuccess} copied!
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={downloadEventAsJson}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Event as JSON
            </Button>
            <Button onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}






