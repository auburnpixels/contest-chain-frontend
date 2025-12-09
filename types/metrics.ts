export interface MetricResponse {
  value: string | number;
  footer?: string;
  status: 'good' | 'warning' | 'critical' | 'neutral';
  metadata?: {
    // Flexible metadata for extended data
    [key: string]: any;
  };
}



