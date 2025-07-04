import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp } from 'lucide-react';

export const HistoricalTrends = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-primary" />
          Risk Trend Analysis
        </CardTitle>
        <CardDescription>Historical risk patterns and trend analysis</CardDescription>
      </CardHeader>
      <CardContent className="h-96 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <BarChart3 className="h-16 w-16 mx-auto mb-4" />
          <p className="text-lg mb-2">Risk Trend Charts</p>
          <p>Interactive charts and trend analysis coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
};