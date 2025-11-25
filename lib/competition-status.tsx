import { IndicatorBadge } from '@/components/ui/indicator-badge';
import type { OperatorCompetition } from '@/components/operator/competition-details-dialog';

/**
 * Status configuration map for IndicatorBadge components.
 * Maps status strings to their color and display text.
 */
export const COMPETITION_STATUS_CONFIG: Record<
  string, 
  { 
    color: "green" | "yellow" | "blue" | "red" | "white" | "gray" | "purple" | "orange"; 
    text: string;
  }
> = {
  unpublished: { color: "gray", text: "Unpublished" },
  active: { color: "green", text: "Active" },
  awaiting_draw: { color: "yellow", text: "Awaiting Draw" },
  completed: { color: "green", text: "Completed" },
};

/**
 * Returns an IndicatorBadge component for a competition's status.
 */
export const getStatusIndicatorBadge = (competition: OperatorCompetition) => {
  const status = competition.status;
  
  const config = COMPETITION_STATUS_CONFIG[status] 
    || COMPETITION_STATUS_CONFIG.unpublished;
  
  return (
    <IndicatorBadge 
      color={config.color} 
      text={config.text} 
    />
  );
};
