import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';

export interface CompetitionWithDrawDate {
    draw_at?: string | null;
    is_draw_overdue?: boolean;
}

export const formatDrawDate = (competition: CompetitionWithDrawDate) => {
    const {draw_at, is_draw_overdue} = competition;

    if (!draw_at) {
        return <span className="text-muted-foreground text-sm">—</span>;
    }

    const drawDate = new Date(draw_at);

    const formattedDate = drawDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    const formattedTime = drawDate.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const formattedDateTime = `${formattedDate} at ${formattedTime}`;

    if (is_draw_overdue) {
        const now = new Date();
        const diffMs = now.getTime() - drawDate.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="text-red-500">
                            <span className="text-sm font-medium">{formattedDateTime}</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                        <p className="text-xs">
                            Draw is overdue by {diffDays} day{diffDays !== 1 ? 's' : ''}
                        </p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return <span>{formattedDateTime}</span>;
};

