'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Activity, Key, Webhook, Hash, CheckCircle } from 'lucide-react';
import {dateFormatters, formatDrawDate} from '@/lib/date-utils';
import { getSystemStatus, type ChainIntegrityData } from '@/lib/integrity-utils';
import {Button} from "@/components/ui/button";
import {CompetitionsTable} from "@/components/operator/competitions-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {getStatusIndicatorBadge} from "@/lib/competition-status";
import {ComplianceScoreDisplay} from "@/components/operator/compliance-score-display";
import {OperatorActionsMenu} from "@/components/operator-actions-menu";
import {IndicatorBadge} from "@/components/ui/indicator-badge";

interface SystemHealthCardProps {
  lastEventReceived?: string | null;
  activeApiKeys?: number;
  rngVersion?: string;
  chainIntegrity?: ChainIntegrityData;
}

export function SystemHealthCard({
  lastEventReceived,
  activeApiKeys = 0,
  rngVersion = '1.0',
  chainIntegrity,
}: SystemHealthCardProps) {
  const systemStatus = getSystemStatus(chainIntegrity);

  return (
      <Card className="bg-card border-border">
          <CardHeader>
              <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1.5">
                      <CardTitle className="leading-none font-semibold !text-base">System health</CardTitle>
                      <CardDescription className="text-muted-foreground text-sm">
                          Real-time system status and configuration
                      </CardDescription>
                  </div>
              </div>
          </CardHeader>
          <CardContent>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Last event</TableHead>
                          <TableHead>API keys</TableHead>
                          <TableHead>RNG version</TableHead>
                          <TableHead>System status</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      <TableRow>
                          <TableCell>
                              {lastEventReceived ? (
                                  <span>
                                    {dateFormatters.relativeTime(lastEventReceived)}
                                  </span>
                              ) : (
                                  <span>No events yet</span>
                              )}
                          </TableCell>
                          <TableCell className="font-medium text-foreground">
                              {activeApiKeys} active {activeApiKeys === 1 ? 'key' : 'keys'}
                          </TableCell>
                          <TableCell>
                              {rngVersion}
                          </TableCell>
                          <TableCell>
                              <IndicatorBadge text={systemStatus.label} color={systemStatus.color} />
                          </TableCell>
                      </TableRow>
                  </TableBody>
              </Table>
          </CardContent>
      </Card>
  );
}


