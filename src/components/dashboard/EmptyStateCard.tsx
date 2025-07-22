
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp, FileText, AlertCircle } from 'lucide-react';

interface EmptyStateCardProps {
  title: string;
  description: string;
  actionText: string;
  onAction: () => void;
  icon: React.ReactNode;
  stats?: {
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
}

export const EmptyStateCard = ({ 
  title, 
  description, 
  actionText, 
  onAction, 
  icon,
  stats = []
}: EmptyStateCardProps) => {
  return (
    <Card className="h-full border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center text-force-visible">
          {icon}
          <span className="ml-2">{title}</span>
          <Badge variant="interactive" className="ml-auto">
            Setup Required
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-force-muted leading-relaxed">{description}</p>
        
        {stats.length > 0 && (
          <div className="grid grid-cols-1 gap-3">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                <span className="text-sm font-medium text-force-visible">{stat.label}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-force-visible">{stat.value}</span>
                  {stat.trend === 'up' && <TrendingUp className="h-3 w-3 text-success" />}
                  {stat.trend === 'down' && <AlertCircle className="h-3 w-3 text-warning" />}
                </div>
              </div>
            ))}
          </div>
        )}

        <Button 
          onClick={onAction}
          className="w-full btn-stamp animate-pulse-setup"
          variant="default"
        >
          {actionText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};
