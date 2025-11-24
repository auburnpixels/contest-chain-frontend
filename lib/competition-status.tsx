import { 
  FileText, 
  CheckCircle, 
  Loader2, 
  ShieldCheck
} from 'lucide-react';
import { IndicatorBadge } from '@/components/ui/indicator-badge';
import type { OperatorCompetition } from '@/components/operator/competition-details-dialog';

/**
 * Status configuration map for IndicatorBadge components.
 * Maps status strings to their icon, color, and display text.
 */
export const COMPETITION_STATUS_CONFIG: Record<
  string, 
  { 
    icon: any; 
    color: "green" | "yellow" | "blue" | "red" | "white" | "gray" | "purple" | "orange"; 
    text: string;
  }
> = {
  unpublished: { icon: FileText, color: "gray", text: "Unpublished" },
  active: { icon: CheckCircle, color: "green", text: "Active" },
  awaiting_draw: { icon: Loader2, color: "yellow", text: "Awaiting Draw" },
  completed: { icon: ShieldCheck, color: "green", text: "Completed" },
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
      icon={config.icon} 
      color={config.color} 
      text={config.text} 
    />
  );
};
