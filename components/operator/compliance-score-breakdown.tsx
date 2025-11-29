'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { ComplianceScore } from '@/lib/api';
import { getCategoryIcon, getCategoryLabel, getCategoryPercentage, getComplianceColor } from '@/lib/compliance-utils';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface ComplianceScoreBreakdownProps {
  score: ComplianceScore;
}

export function ComplianceScoreBreakdown({ score }: ComplianceScoreBreakdownProps) {
  const categories = [
    { key: 'entry_integrity', data: score.categories.entry_integrity },
    { key: 'draw_integrity', data: score.categories.draw_integrity },
    { key: 'draw_logging', data: score.categories.draw_logging },
    { key: 'fairness', data: score.categories.fairness },
    { key: 'complaint', data: score.categories.complaint },
    { key: 'transparency', data: score.categories.transparency },
    { key: 'timeliness', data: score.categories.timeliness },
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-base">Compliance Score Breakdown</CardTitle>
        <CardDescription>
          Detailed category scores {score.is_final ? '(final)' : '(pre-draw estimate)'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map(({ key, data }) => {
            const Icon = getCategoryIcon(key);
            const percentage = getCategoryPercentage(data.score, data.max);
            const colorClass = percentage >= 80 ? 'text-green-500' : percentage >= 60 ? 'text-yellow-500' : 'text-red-500';

            return (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${colorClass}`} />
                    <span className="text-sm font-medium">{getCategoryLabel(key)}</span>
                  </div>
                  <span className="text-sm font-medium">
                    {data.score}/{data.max}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
                
                {data.details && Object.keys(data.details).length > 0 && (
                  <Accordion type="single" collapsible className="border-none">
                    <AccordionItem value={key} className="border-none">
                      <AccordionTrigger className="text-xs text-muted-foreground py-1 hover:no-underline">
                        View details
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-xs space-y-1 pt-2">
                          {Object.entries(data.details).map(([detailKey, detailValue]) => (
                            <div key={detailKey} className="flex items-start gap-2">
                              {typeof detailValue === 'boolean' ? (
                                <>
                                  {detailValue ? (
                                    <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                                  ) : (
                                    <XCircle className="h-3 w-3 text-red-500 mt-0.5" />
                                  )}
                                  <span className="text-muted-foreground">
                                    {detailKey.replace(/_/g, ' ')}
                                  </span>
                                </>
                              ) : (
                                <span className="text-muted-foreground">
                                  {detailKey.replace(/_/g, ' ')}: {String(detailValue)}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>
            );
          })}
        </div>

        {!score.is_final && (
          <div className="mt-4 p-3 bg-yellow-500/10 rounded-md border border-yellow-500/20">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
              <div className="text-xs text-yellow-600 dark:text-yellow-500">
                <p className="font-medium">Pre-Draw Estimate</p>
                <p className="mt-1">
                  This score is estimated based on current data. It will be finalized when the competition is completed.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

