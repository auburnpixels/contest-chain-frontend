import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';
import { InfoTooltip } from '@/components/info-tooltip';

interface ComplianceScoreCardProps {
  title: string;
  value: string | number;
  status?: 'good' | 'warning' | 'critical' | 'neutral';
  icon?: LucideIcon;
  footer?: string;
  badge?: string;
  helpText?: string;
}

export function ComplianceScoreCard({
  title,
  value,
  status = 'neutral',
  icon: Icon,
  footer,
  badge,
  helpText,
}: ComplianceScoreCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'good':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-foreground';
    }
  };

  const getBadgeVariant = () => {
    switch (status) {
      case 'good':
        return 'default';
      case 'warning':
        return 'secondary';
      case 'critical':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardDescription className="flex items-center">
            {title}
          </CardDescription>
          {helpText && <InfoTooltip>{helpText}</InfoTooltip>}
        </div>
        <CardTitle>{value}</CardTitle>

      </CardHeader>
      {(footer || badge) && (
        <CardFooter className="flex-col items-start gap-2">
          {footer && <p className="text-sm text-muted-foreground">{footer}</p>}
          {badge && <Badge variant={getBadgeVariant()}>{badge}</Badge>}
        </CardFooter>
      )}
    </Card>
  );
}

