'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InfoTooltip } from '@/components/info-tooltip';
import { IndicatorBadge } from "@/components/ui/indicator-badge";
import type { MetricResponse } from '@/types/metrics';

interface AsyncMetricCardProps {
  title: string;
  fetchData: () => Promise<MetricResponse>;
  icon?: LucideIcon;
  helpText?: string;
  useIndicatorBadge?: boolean;
  className?: string;
  // Custom rendering functions for complex display logic
  renderValue?: (data: MetricResponse) => React.ReactNode;
  renderFooter?: (data: MetricResponse) => React.ReactNode;
}

// Simple in-memory cache with TTL
const metricCache = new Map<string, { data: MetricResponse; timestamp: number }>();
const CACHE_TTL = 60000; // 60 seconds (increased from 30s for better performance)

export function AsyncMetricCard({
  title,
  fetchData,
  icon: Icon,
  helpText,
  useIndicatorBadge,
  className,
  renderValue,
  renderFooter,
}: AsyncMetricCardProps) {
  const [data, setData] = useState<MetricResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      // Check cache first
      const cached = metricCache.get(title);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        setData(cached.data);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const result = await fetchData();
        setData(result);
        // Store in cache
        metricCache.set(title, { data: result, timestamp: Date.now() });
      } catch (err: any) {
        console.error(`[AsyncMetricCard] Failed to load ${title}:`, err);
        
        // Provide specific error messages for common issues
        if (err.status === 429) {
          setError('Rate limit exceeded. Please wait a moment.');
        } else if (err.status === 401) {
          setError('Authentication required.');
        } else if (err.status === 403) {
          setError('Access denied.');
        } else {
          setError(err.message || 'Failed to load');
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchData, title]);

  // Status color mappings
  const statusColors = {
    good: 'text-blue-600 dark:text-blue-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    critical: 'text-red-600 dark:text-red-400',
    neutral: 'text-foreground',
  };

  const indicatorBadgeColor = {
    good: 'green' as const,
    warning: 'yellow' as const,
    critical: 'red' as const,
    neutral: 'gray' as const,
  };

  // Loading skeleton
  if (loading) {
    return (
      <Card className={cn('relative overflow-hidden', className)}>
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center justify-between">
            <span>{title}</span>
            {helpText && <InfoTooltip>{helpText}</InfoTooltip>}
          </CardDescription>
          <CardTitle className="text-2xl">
            <div className="h-8 w-24 bg-muted animate-pulse rounded" />
          </CardTitle>
        </CardHeader>
        <CardFooter className="pt-0">
          <div className="h-4 w-32 bg-muted animate-pulse rounded" />
        </CardFooter>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className={cn('relative overflow-hidden border-destructive/50', className)}>
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center justify-between">
            <span>{title}</span>
            {helpText && <InfoTooltip>{helpText}</InfoTooltip>}
          </CardDescription>
          <CardTitle className="text-2xl text-destructive flex items-center gap-2">
            <AlertCircle className="h-6 w-6" />
            <span className="text-lg">Error</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className="pt-0">
          <p className="text-xs text-muted-foreground">{error}</p>
        </CardFooter>
      </Card>
    );
  }

  // Data loaded successfully
  if (!data) return null;

  const displayValue = renderValue ? renderValue(data) : data.value;
  const displayFooter = renderFooter ? renderFooter(data) : data.footer;
  const status = data.status || 'neutral';

  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <CardHeader className="pb-2">
        <CardDescription className="flex items-center justify-between">
          <span>{title}</span>
          {helpText && <InfoTooltip>{helpText}</InfoTooltip>}
        </CardDescription>
        {useIndicatorBadge ? (
          <CardTitle>
            <IndicatorBadge 
              color={indicatorBadgeColor[status]} 
              text={String(displayValue ?? data.value ?? 'Loading...')} 
              size="xl" 
              className="text-4xl" 
            />
          </CardTitle>
        ) : (
          <CardTitle className={cn('text-2xl', statusColors[status])}>
            {displayValue}
          </CardTitle>
        )}
      </CardHeader>

      {displayFooter && (
        <CardFooter className="flex-col items-start gap-2 pt-0">
          <p>{displayFooter}</p>
        </CardFooter>
      )}
    </Card>
  );
}


