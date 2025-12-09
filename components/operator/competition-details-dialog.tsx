'use client';

import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {CheckCircle, AlertCircle, XCircle} from 'lucide-react';
import {CompetitionDetailsView} from '@/components/competition-details-view';
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
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="border-b pb-4">
                        Competition details
                    </DialogTitle>
                </DialogHeader>

                {competition && <CompetitionDetailsView competition={competition} />}

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
