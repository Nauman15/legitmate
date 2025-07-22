
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useIndianCompliance } from '@/hooks/useIndianCompliance';

export const ComplianceScoreCard = () => {
  const { complianceData, loading } = useIndianCompliance();

  if (loading) {
    return (
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-8 bg-muted rounded"></div>
            <div className="h-2 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!complianceData) return null;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreStatus = (score: number) => {
    if (score >= 90) return { text: 'Excellent', color: 'bg-success' };
    if (score >= 70) return { text: 'Good', color: 'bg-warning' };
    return { text: 'Needs Improvement', color: 'bg-destructive' };
  };

  const scoreStatus = getScoreStatus(complianceData.complianceScore);
  const criticalAlerts = complianceData.riskAlerts.filter(alert => alert.severity === 'critical').length;
  const overdueFilings = complianceData.nextFilingDeadlines.filter(filing => filing.status === 'overdue').length;

  return (
    <Card className="shadow-card border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Compliance Score</CardTitle>
            <CardDescription>Overall regulatory compliance health</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-success" />
            <Badge variant="secondary" className={scoreStatus.color}>
              {scoreStatus.text}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Score Display */}
        <div className="text-center space-y-2">
          <div className={`text-4xl font-bold ${getScoreColor(complianceData.complianceScore)}`}>
            {complianceData.complianceScore}
            <span className="text-lg text-muted-foreground">/100</span>
          </div>
          <Progress value={complianceData.complianceScore} className="h-3" />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              {criticalAlerts > 0 ? (
                <AlertTriangle className="h-4 w-4 text-destructive" />
              ) : (
                <CheckCircle className="h-4 w-4 text-success" />
              )}
            </div>
            <div className="text-sm font-medium">
              {criticalAlerts}
            </div>
            <div className="text-xs text-muted-foreground">Critical Alerts</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              {overdueFilings > 0 ? (
                <AlertTriangle className="h-4 w-4 text-destructive" />
              ) : (
                <Clock className="h-4 w-4 text-warning" />
              )}
            </div>
            <div className="text-sm font-medium">
              {overdueFilings}
            </div>
            <div className="text-xs text-muted-foreground">Overdue Filings</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div className="text-sm font-medium">
              {complianceData.nextFilingDeadlines.length}
            </div>
            <div className="text-xs text-muted-foreground">Upcoming</div>
          </div>
        </div>

        {/* Quick Actions */}
        {(criticalAlerts > 0 || overdueFilings > 0) && (
          <div className="bg-muted/30 p-3 rounded-lg">
            <p className="text-sm font-medium text-destructive mb-1">Action Required</p>
            <p className="text-xs text-muted-foreground">
              {criticalAlerts > 0 && `${criticalAlerts} critical alerts need immediate attention. `}
              {overdueFilings > 0 && `${overdueFilings} filings are overdue.`}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
