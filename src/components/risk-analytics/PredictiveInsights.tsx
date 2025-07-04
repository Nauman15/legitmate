import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';

interface PredictiveInsight {
  title: string;
  probability: number;
  impact: string;
  timeline: string;
  description: string;
  recommendation: string;
  category: string;
}

interface PredictiveInsightsProps {
  insights: PredictiveInsight[];
}

export const PredictiveInsights = ({ insights }: PredictiveInsightsProps) => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5 text-primary" />
          AI-Powered Risk Predictions
        </CardTitle>
        <CardDescription>
          Machine learning insights based on historical data and current trends
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {insights.map((insight, index) => (
          <Card key={index} className="border border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{insight.title}</h3>
                    <Badge variant="outline">{insight.category}</Badge>
                    <Badge variant={insight.impact === 'High' ? 'destructive' : 'secondary'}>
                      {insight.impact} Impact
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div>
                      <span className="font-medium text-muted-foreground">Probability:</span>
                      <span className={`ml-2 font-bold ${insight.probability > 70 ? 'text-destructive' : insight.probability > 40 ? 'text-warning' : 'text-success'}`}>
                        {insight.probability}%
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Timeline:</span>
                      <span className="ml-2 font-bold text-primary">{insight.timeline}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-3">{insight.description}</p>
                  
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-sm">
                      <span className="font-medium text-primary">AI Recommendation:</span> {insight.recommendation}
                    </p>
                  </div>
                </div>

                <div className="ml-6">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${insight.probability > 70 ? 'text-destructive' : insight.probability > 40 ? 'text-warning' : 'text-success'}`}>
                      {insight.probability}%
                    </div>
                    <div className="text-xs text-muted-foreground">Risk Level</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};