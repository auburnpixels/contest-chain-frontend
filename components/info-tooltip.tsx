import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface InfoTooltipProps {
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function InfoTooltip({ children, side = 'top', className }: InfoTooltipProps) {
  return (
    <Tooltip delayDuration={10}>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={`inline-flex items-center justify-center ml-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm ${className || ''}`}
        >
          <HelpCircle 
            className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground cursor-help transition-colors"
          />
        </button>
      </TooltipTrigger>
      <TooltipContent side={side} className="max-w-xs z-50">
        <p className="text-xs leading-relaxed">{children}</p>
      </TooltipContent>
    </Tooltip>
  );
}

