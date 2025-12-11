'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InfoTooltip } from '@/components/info-tooltip';
import {IndicatorBadge} from "@/components/ui/indicator-badge";

interface MetricCardProps {
  title: string;
  value: string | number;
  status?: 'good' | 'warning' | 'critical' | 'neutral';
  icon?: LucideIcon;
  footer?: string;
  badge?: string;
  helpText?: string;
    useIndicatorBadge?: boolean;
  className?: string;
}

export function MetricCard({
  title,
  value,
  status = 'neutral',
  icon: Icon,
  footer,
  badge,
  helpText,
    useIndicatorBadge,
  className,
}: MetricCardProps) {
  // Status color mappings
  const statusColors = {
    good: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    critical: 'text-red-600 dark:text-red-400',
    neutral: 'text-foreground',
  };

  const statusBgColors = {
    good: 'bg-green-50 dark:bg-green-950/20',
    warning: 'bg-yellow-50 dark:bg-yellow-950/20',
    critical: 'bg-red-50 dark:bg-red-950/20',
    neutral: 'bg-muted/50',
  };

    const indicatorBadgeColor = {
        good: 'green' as const,
        warning: 'yellow' as const,
        critical: 'red' as const,
        neutral: 'gray' as const,
    };

  const getBadgeVariant = () => {
    switch (status) {
      case 'good':
        return 'success' as const;
      case 'warning':
        return 'warning' as const;
      case 'critical':
        return 'destructive' as const;
      default:
        return 'secondary' as const;
    }
  };

  return (
    <Card className={cn('relative overflow-hidden', className)}>
      {/* Status indicator bar */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-1',
        )}
      />
      
      <CardHeader className="pb-2">
        <CardDescription className="flex items-center justify-between">
            <span>{title}</span>
            {helpText && <InfoTooltip>{helpText}</InfoTooltip>}
        </CardDescription>
          {useIndicatorBadge ? (
              <CardTitle>
                  <IndicatorBadge color={indicatorBadgeColor[status]} text={String(value)} size="xl" className="text-4xl" />
              </CardTitle>
          ) : (
              <CardTitle className={cn('text-2xl', statusColors[status])}>
                  {value}
              </CardTitle>
          )}
      </CardHeader>

      {(footer || badge) && (
        <CardFooter className="flex-col items-start gap-2 pt-0">
          {footer && <p className="text-xs text-muted-foreground">{footer}</p>}
          {badge && <Badge variant={getBadgeVariant()}>{badge}</Badge>}
        </CardFooter>
      )}
    </Card>
  );
}


