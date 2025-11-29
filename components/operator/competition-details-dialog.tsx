'use client';

import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Badge} from '@/components/ui/badge';
import {Card, CardContent} from '@/components/ui/card';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';
import {CheckCircle, AlertCircle, XCircle, Gift, Activity,ShieldCheck} from 'lucide-react';
import {getStatusIndicatorBadge} from '@/lib/competition-status';
import {formatDrawDate} from '@/lib/date-utils';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {ComplianceScoreDisplay} from "@/components/operator/compliance-score-display";
import {InfoTooltip} from "@/components/info-tooltip";

export interface OperatorCompetitionPrize {
    id: string;
    external_id: string;
    name: string;
    draw_order: number;
    has_been_drawn: boolean;
    winning_ticket?: {
        id: string;
        external_id: string;
    } | null;
    created_at: string;
    updated_at: string;
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
    compliance_score?: number | null;
    compliance_score_detail?: import('@/lib/api').ComplianceScore | null;
    is_draw_overdue?: boolean;
    draw_events_count?: number;
    draw_audits_count?: number;
    issues?: string[];
    prizes?: OperatorCompetitionPrize[];
    // Draw Integrity
    total_prizes?: number;
    drawn_prizes?: number;
    has_complete_draw_integrity?: boolean;
    draw_integrity_percentage?: number;
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
        <Tooltip>
            <TooltipTrigger asChild>
                <div className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md ${bgClass} cursor-help`}>
                    <Icon className={`h-4 w-4 ${colorClass}`}/>
                    <span className={`text-sm font-medium ${colorClass}`}>
                        {compliance_percentage}%
                    </span>
                </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
                <div className="space-y-1">
                    {tooltipMessages.map((msg, idx) => (
                        <p key={idx} className="text-xs">{msg}</p>
                    ))}
                </div>
            </TooltipContent>
        </Tooltip>
    );
};

export function CompetitionDetailsDialog({competition, open, onOpenChange}: CompetitionDetailsDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {competition?.name || competition?.name}
                    </DialogTitle>
                </DialogHeader>

                {competition && (
                    <div className="space-y-6 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">External ID</label>
                                <p>
                                    {competition.external_id || '—'}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Status</label>
                                <div className="mt-1">
                                    {getStatusIndicatorBadge(competition)}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Maximum entries</label>
                                <p className="mt-1 text-sm">
                                    {(competition.ticket_quantity || competition.max_tickets || 0).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Entries</label>
                                <p className="mt-1 text-sm font-medium">
                                    {(competition.entries_count || 0).toLocaleString()} <span className="text-muted-foreground">({competition.free_entries_count} free)</span>
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Complaints</label>
                                <div>
                                    {(competition.complaints_count || 0) > 0 ? (
                                        <Link href={`/operator/complaints?competition=${competition.id}`}>
                                            <span className="text-red-500 underline">{competition.complaints_count} complaints</span>
                                        </Link>
                                    ) : (
                                        <span className="text-muted-foreground">0</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Draw Date</label>
                                <div className="mt-1">
                                    {formatDrawDate(competition)}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground flex items-center">
                                    Compliance Score
                                    <InfoTooltip>
                                        Overall fairness and regulatory compliance score for this competition. Higher scores indicate better adherence to standards.
                                    </InfoTooltip>
                                </label>
                                <div className="mt-1">
                                    {competition.compliance_score_detail ? (
                                        <ComplianceScoreDisplay score={competition.compliance_score_detail} size="sm" />
                                    ) : (
                                        <span className="text-muted-foreground">Pending</span>
                                    )}
                                </div>
                            </div>
                        </div>



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

                                            <TableRow>
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



