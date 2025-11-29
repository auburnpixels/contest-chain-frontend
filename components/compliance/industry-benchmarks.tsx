import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Link from "next/link";
import {Button} from "@/components/ui/button";

interface BenchmarkComparison {
  label: string;
  yourValue: number;
  industryValue: number;
  unit: string;
  format?: 'percentage' | 'number' | 'time';
}

interface IndustryBenchmarksProps {
  comparisons: BenchmarkComparison[];
  ranking?: string;
  disclaimer?: boolean;
}

export function IndustryBenchmarks({ comparisons, ranking, disclaimer = true }: IndustryBenchmarksProps) {
  const formatValue = (value: number, format?: string, unit?: string) => {
    if (format === 'percentage') {
      return `${value}%`;
    }
    if (format === 'time') {
      return `${value} ${unit}`;
    }
    return `${value}${unit || ''}`;
  };

  const isOutperforming = (yourValue: number, industryValue: number, format?: string) => {
    if (format === 'time') {
      return yourValue < industryValue; // Lower is better for time
    }
    return yourValue > industryValue; // Higher is better for most metrics
  };

  return (
    <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1.5">
                    <CardTitle className="leading-none font-semibold !text-base">Industry Benchmarks</CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">
                        Compare your performance against industry averages
                    </CardDescription>
                </div>

                {ranking && (
                    <span className="">Your Ranking: {ranking}</span>
                )}
            </div>
        </CardHeader>
      <CardContent className="space-y-6">
        {comparisons.map((comparison, index) => {
          const outperforming = isOutperforming(
            comparison.yourValue,
            comparison.industryValue,
            comparison.format
          );

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{comparison.label}</span>
                {outperforming ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-yellow-600" />
                )}
              </div>

              <div className="space-y-2">
                {/* Your value */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Your Score:</span>
                  <span className={`font-semibold ${outperforming ? 'text-green-600' : 'text-yellow-600'}`}>
                    {formatValue(comparison.yourValue, comparison.format, comparison.unit)}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`absolute h-full ${outperforming ? 'bg-green-600' : 'bg-yellow-600'}`}
                    style={{
                      width: `${Math.min((comparison.yourValue / Math.max(comparison.yourValue, comparison.industryValue)) * 100, 100)}%`
                    }}
                  />
                </div>

                {/* Industry average */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Industry Average:</span>
                  <span className="text-sm">
                    {formatValue(comparison.industryValue, comparison.format, comparison.unit)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {disclaimer && (
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground italic">
              * Industry benchmarks are calculated across all operators on the platform.
              Data is updated monthly.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

