'use client';

import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Badge} from '@/components/ui/badge';
import {Card, CardContent} from '@/components/ui/card';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {CheckCircle, AlertCircle, XCircle, Gift, Activity,ShieldCheck} from 'lucide-react';
import {getStatusIndicatorBadge} from '@/lib/competition-status';
import {formatDrawDate} from '@/lib/date-utils';

export interface OperatorCompetitionPrize {
    id: string;
    name: string;
    draw_order: number;
    has_been_drawn: boolean;
    winner_entry_id?: string | null;
    drawn_at?: string | null;
}

export interface OperatorCompetition {
    id: string;
    name: string;
    external_id?: string;
    status: string;
    ticket_quantity?: number;
    max_tickets?: number;
    draw_at?: string | null;
    entries_count?: number;
    complaints_count?: number;
    compliance_status?: string;
    compliance_percentage?: number;
    compliance_checks?: {
        has_draws?: boolean;
        has_audit_trail?: boolean;
        has_entries?: boolean;
    };
    is_draw_overdue?: boolean;
    draw_events_count?: number;
    draw_audits_count?: number;
    issues?: string[];
    prizes?: OperatorCompetitionPrize[];
}

export interface CompetitionDetailsDialogProps {
    competition: OperatorCompetition | null;
    open: boolean;
    onOpenChange: (state: boolean) => void;
}

export const formatEntries = (competition: OperatorCompetition): string => {
    const {entries_count = 0, ticket_quantity} = competition;

    if (ticket_quantity && ticket_quantity > 0) {
        return `${entries_count.toLocaleString()} / ${ticket_quantity.toLocaleString()}`;
    }

    return `${entries_count.toLocaleString()}`;
};

export const getComplianceIndicator = (competition: OperatorCompetition) => {
    const {compliance_percentage = 100, compliance_status = 'good', issues = []} = competition;

    let Icon = CheckCircle;
    let colorClass = 'text-green-500';
    let bgClass = 'bg-green-500/10';
    let tooltipMessages: string[] = [];

    if (['excellent', 'good'].includes(compliance_status)) {
        Icon = CheckCircle;
        colorClass = 'text-green-500';
        bgClass = 'bg-green-500/10';
        tooltipMessages = issues.length > 0 ? issues : ['All compliance checks passed'];
    } else if (compliance_status === 'fair') {
        Icon = AlertCircle;
        colorClass = 'text-yellow-500';
        bgClass = 'bg-yellow-500/10';
        tooltipMessages = issues.length > 0 ? issues : ['Some compliance checks need attention'];
    } else {
        Icon = XCircle;
        colorClass = 'text-red-500';
        bgClass = 'bg-red-500/10';
        tooltipMessages = issues.length > 0 ? issues : ['Compliance checks failed'];
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md ${bgClass} cursor-help`}>
                        <Icon className={`h-4 w-4 ${colorClass}`}/>
                        <span className={`text-sm font-medium ${colorClass}`}>
                            {compliance_percentage}%
                        </span>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="left" className="max-w-xs">
                    <div className="space-y-1">
                        {tooltipMessages.map((msg, idx) => (
                            <p key={idx} className="text-xs">{msg}</p>
                        ))}
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export function CompetitionDetailsDialog({competition, open, onOpenChange}: CompetitionDetailsDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {competition?.name || competition?.name}
                    </DialogTitle>
                    <DialogDescription>
                        Competition details and prizes
                    </DialogDescription>
                </DialogHeader>

                {competition && (
                    <div className="space-y-6 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">External ID</label>
                                <p className="mt-1 text-sm font-mono bg-muted px-2 py-1 rounded">
                                    {competition.external_id || '—'}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">ID</label>
                                <p className="mt-1 text-sm font-mono bg-muted px-2 py-1 rounded truncate">
                                    {competition.id}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Status</label>
                                <div className="mt-1">
                                    {getStatusIndicatorBadge(competition)}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Draw Date</label>
                                <div className="mt-1">
                                    {formatDrawDate(competition)}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Max Tickets</label>
                                <p className="mt-1 text-sm">
                                    {(competition.ticket_quantity || competition.max_tickets || 0).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Total Entries</label>
                                <p className="mt-1 text-sm font-medium">
                                    {(competition.entries_count || 0).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Compliance</label>
                                <div className="mt-1 flex items-center gap-2">
                                    {getComplianceIndicator(competition)}
                                    <span className="text-sm">{competition.compliance_percentage ?? 100}%</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Gift className="h-5 w-5"/>
                                    Prizes ({competition.prizes?.length || 0})
                                </h3>
                            </div>

                            {competition.prizes && competition.prizes.length > 0 ? (
                                <div className="space-y-3">
                                    {competition.prizes
                                        .slice()
                                        .sort((a, b) => a.draw_order - b.draw_order)
                                        .map((prize) => (
                                            <Card key={prize.id} className="bg-slate-900/50 border-slate-800">
                                                <CardContent className="p-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <Badge variant="outline" className="text-xs">
                                                                    #{prize.draw_order}
                                                                </Badge>
                                                                <h4 className="font-semibold">{prize.name}</h4>
                                                                {prize.has_been_drawn && (
                                                                    <Badge className="bg-blue-600 text-white">
                                                                        Drawn
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                                <div>
                                                                    <span className="text-muted-foreground">Prize ID:</span>
                                                                    <code className="ml-2 bg-muted px-1.5 py-0.5 rounded text-xs">
                                                                        {prize.id}
                                                                    </code>
                                                                </div>
                                                                {prize.has_been_drawn && (
                                                                    <>
                                                                        <div>
                                                                            <span className="text-muted-foreground">Winner:</span>
                                                                            <code className="ml-2 bg-muted px-1.5 py-0.5 rounded text-xs">
                                                                                {prize.winner_entry_id || 'N/A'}
                                                                            </code>
                                                                        </div>
                                                                        {prize.drawn_at && (
                                                                            <div>
                                                                                <span className="text-muted-foreground">Drawn at:</span>
                                                                                <span className="ml-2 text-xs">
                                                                                    {new Date(prize.drawn_at).toLocaleString('en-GB')}
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Gift className="h-12 w-12 mx-auto mb-2 opacity-50"/>
                                    <p className="text-sm">No prizes configured for this competition</p>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2 pt-4 border-t border-slate-800">
                            <Link href={`/operator/draw-events?competition=${competition.id}`} className="flex-1">
                                <Button variant="outline" className="w-full gap-2">
                                    <Activity className="h-4 w-4"/>
                                    View Events
                                </Button>
                            </Link>
                            <Link href={`/operator/competitions/${competition.id}`} className="flex-1">
                                <Button variant="outline" className="w-full gap-2">
                                    <ShieldCheck className="h-4 w-4"/>
                                    View Audits
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}


