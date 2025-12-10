import { ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';
import {IndicatorBadge} from "@/components/ui/indicator-badge";

interface DrawIntegrityBadgeProps {
  totalPrizes: number;
  drawnPrizes: number;
  hasCompleteIntegrity: boolean;
  showLabel?: boolean;
}

export function DrawIntegrityBadge({ 
  totalPrizes, 
  drawnPrizes, 
  hasCompleteIntegrity,
  showLabel = true 
}: DrawIntegrityBadgeProps) {
  if (totalPrizes === 0) {
    return (
        <IndicatorBadge text="No prizes" color="gray" />
    );
  }
  
  if (hasCompleteIntegrity) {
    return (
        <IndicatorBadge text="Complete" color="green" />
    );
  }
  
  return (
      <IndicatorBadge text={`${drawnPrizes}/${totalPrizes} drawn`} color="yellow" />
  );
}














