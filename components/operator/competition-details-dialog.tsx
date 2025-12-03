'use client';

import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {CheckCircle, AlertCircle, XCircle, Gift, Activity,ShieldCheck} from 'lucide-react';
import {getStatusIndicatorBadge} from '@/lib/competition-status';
import {formatDrawDate} from '@/lib/date-utils';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import { AttentionTooltip } from './attention-tooltip';
import {AttentionIssue, getCompetitionAttentionItems} from "@/lib/attention-utils";

export interface OperatorCompetitionPrize {
    id: string;
    name: string;
    draw_order: number;
    has_been_drawn: boolean;
    winner_entry_id?: string | null;
    drawn_at?: string | null;
    winning_ticket?: {
        id: string;
        external_id: string;
    } | null;
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
    free_entries_count?: number;
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
    attention_issues?: AttentionIssue[];
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
    const attentionItems = competition ? (competition.issues || competition.attention_issues || getCompetitionAttentionItems(competition)) : [];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="border-b pb-4">
                        Competition details
                    </DialogTitle>
                </DialogHeader>

                {competition && (
                    <div className="space-y-4 text-sm">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1 items-start">
                                <h3 className="text-sm font-medium text-muted-foreground mb-2">Name</h3>
                                {competition?.name || competition?.name}
                            </div>

                            <div className="flex flex-col gap-1 items-start">
                                <h3 className="text-sm font-medium text-muted-foreground mb-2">External ID</h3>
                                    {competition.external_id || '—'}
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-muted-foreground">Status</label>
                                <div className="mt-1">
                                    {getStatusIndicatorBadge(competition)}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-muted-foreground">Entries</label>
                                <p className="mt-1 text-sm font-medium">
                                    {(competition.entries_count || 0).toLocaleString()} <span className="text-muted-foreground">({competition.free_entries_count} free)</span>
                                </p>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-muted-foreground">Maximum entries</label>
                                <p className="mt-1 text-sm">
                                    {Number(competition.ticket_quantity || competition.max_tickets || 0).toLocaleString()}
                                </p>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-muted-foreground">Issues</label>
                                <div>
                                    <AttentionTooltip attentionItems={attentionItems} />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-muted-foreground">Draw At</label>
                                <div className="mt-1">
                                    {formatDrawDate(competition)}
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-muted-foreground">Prizes ({competition.prizes?.length || 0})</label>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Winner</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {competition.prizes
                                        ?.slice()
                                        .sort((a, b) => a.draw_order - b.draw_order)
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
                                        ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-2 mt-4">
                    <Link href={`/operator/audits?competition=${competition?.id}`} className="flex-1">
                        <Button variant="outline" className="w-full gap-2" disabled={(competition?.draw_audits_count || 0) === 0}>
                            View audits
                        </Button>
                    </Link>

                    <Link href={`/operator/complaints?competition=${competition?.id}`} className="flex-1">
                        <Button variant="outline" className="w-full gap-2">
                            View complaints
                        </Button>
                    </Link>

                    <Link href={`/operator/draw-events?competition=${competition?.id}`} className="flex-1">
                        <Button variant="outline" className="w-full gap-2">
                            View draw events
                        </Button>
                    </Link>

                    <Link href={`/operator/entries?competition=${competition?.id}`} className="flex-1">
                        <Button variant="outline" className="w-full gap-2">
                            View entries
                        </Button>
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    );
}
