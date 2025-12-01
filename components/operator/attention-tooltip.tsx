import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { IndicatorBadge } from '@/components/ui/indicator-badge';
import { AttentionIssue } from '@/lib/attention-utils';

interface AttentionTooltipProps {
  attentionItems: AttentionIssue[];
}

export function AttentionTooltip({ attentionItems }: AttentionTooltipProps) {
  if (!attentionItems || attentionItems.length === 0) {
    return <span className="text-xs text-muted-foreground">—</span>;
  }

  const hasCritical = attentionItems.some((item) => item.type === 'critical');

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <IndicatorBadge
          text={`${attentionItems.length} ${attentionItems.length === 1 ? 'issue' : 'issues'}`}
          color={hasCritical ? 'red' : 'yellow'}
        />
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p className="font-semibold mb-2">Needs Attention</p>
        <div className="space-y-2">
          {attentionItems.map((item, i) => (
            <div key={i} className="text-xs">
              <p className={item.type === 'critical' ? 'text-red-400' : 'text-yellow-400'}>
                {item.message}
              </p>
              <p className="text-muted-foreground">→ {item.action}</p>
            </div>
          ))}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
