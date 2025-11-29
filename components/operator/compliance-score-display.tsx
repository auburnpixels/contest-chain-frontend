'use client';

import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { ComplianceScore } from '@/lib/api';
import { 
  formatComplianceScore, 
  getComplianceGradeVariant, 
  getComplianceColor,
  getComplianceIcon 
} from '@/lib/integrity-utils';

interface ComplianceScoreDisplayProps {
  score: ComplianceScore | null | undefined;
  showTooltip?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ComplianceScoreDisplay({ 
  score, 
  showTooltip = true,
  size = 'md'
}: ComplianceScoreDisplayProps) {
  if (!score) {
    return (
      <Badge variant="secondary" className="text-xs">
        Not calculated
      </Badge>
    );
  }

  const Icon = getComplianceIcon(score.total_score, score.is_final);
  const variant = getComplianceGradeVariant(score.total_score, score.is_final);
  const colorClass = getComplianceColor(score.total_score, score.is_final);
  const displayText = formatComplianceScore(score.total_score, score.is_final);

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const badge = (
    <Badge variant={variant} className={`inline-flex items-center gap-1.5 ${sizeClasses[size]}`}>
      <Icon className={`${iconSizes[size]} ${colorClass}`} />
      <span className="font-medium">{displayText}</span>
    </Badge>
  );

  if (!showTooltip) {
    return badge;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {badge}
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <div className="space-y-2">
          <p className="font-medium">
            {score.is_final ? 'Final Compliance Score' : 'Pre-Draw Estimate'}
          </p>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Entry Integrity: {score.categories.entry_integrity.score}/25</p>
            <p>Draw Integrity: {score.categories.draw_integrity.score}/25</p>
            <p>Process Logging: {score.categories.draw_logging.score}/20</p>
            <p>Fairness: {score.categories.fairness.score}/10</p>
            <p>Complaints: {score.categories.complaint.score}/10</p>
            <p>Transparency: {score.categories.transparency.score}/5</p>
            <p>Timeliness: {score.categories.timeliness.score}/5</p>
          </div>
          {!score.is_final && (
            <p className="text-xs text-yellow-500 mt-2">
              Score will update when competition completes
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-3 border-t pt-2">
            Higher scores = better regulatory standing and reduced audit risk.
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

