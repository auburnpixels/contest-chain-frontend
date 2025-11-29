'use client';

import { getChainIntegrityDisplay, type ChainIntegrityData } from '@/lib/integrity-utils';

interface ChainIntegrityBadgeProps {
  chainData?: ChainIntegrityData;
  showTooltip?: boolean;
}

export function ChainIntegrityBadge({ chainData, showTooltip = true }: ChainIntegrityBadgeProps) {
  const display = getChainIntegrityDisplay(chainData);

  const badge = (
    <div className={`inline-flex items-center rounded-md text-2xl font-semibold tabular-nums @[250px]/card:text-3xl`}>
    {display.label}
    </div>
  );

    return badge;
}


