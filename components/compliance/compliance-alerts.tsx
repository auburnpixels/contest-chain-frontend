import Link from 'next/link';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface ComplianceAlert {
  type: 'complaint' | 'audit' | 'draw';
  message: string;
  link: string;
  competitionId?: string;
}

interface ComplianceAlertsProps {
  alerts: ComplianceAlert[];
}

export function ComplianceAlerts({ alerts }: ComplianceAlertsProps) {
  if (alerts.length === 0) {
    return (
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-semibold text-green-900">All Clear</p>
              <p className="text-sm text-green-700">No compliance actions required at this time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1.5">
                    <CardTitle className="leading-none font-semibold !text-base">Compliance Actions Needed ({alerts.length})</CardTitle>
                </div>
            </div>
        </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {alerts.map((alert, index) => (
            <li key={index} className="flex items-start justify-between gap-4">
              <span className="text-sm text-red-800">{alert.message}</span>
              <Link href={alert.link}>
                <Button variant="outline" size="sm" className="shrink-0">
                  View
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

