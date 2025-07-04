import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface RiskMetric {
  title: string;
  value: string;
  unit: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
  description: string;
}

interface RiskMetricsOverviewProps {
  metrics: RiskMetric[];
}

export const RiskMetricsOverview = ({ metrics }: RiskMetricsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">{metric.title}</h3>
              <div className={`flex items-center ${metric.trend === 'up' ? 'text-destructive' : 'text-success'}`}>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span className="text-sm ml-1">{metric.change}</span>
              </div>
            </div>
            <div className="flex items-baseline space-x-1 mb-1">
              <span className={`text-3xl font-bold ${metric.color}`}>{metric.value}</span>
              <span className="text-sm text-muted-foreground">{metric.unit}</span>
            </div>
            <p className="text-xs text-muted-foreground">{metric.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};