
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Bell, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { useIndianCompliance } from '@/hooks/useIndianCompliance';
import { format } from 'date-fns';

export const RegulatoryAlertsWidget = () => {
  const { complianceData, loading } = useIndianCompliance();

  if (loading) {
    return (
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded"></div>
              <div className="h-3 bg-muted rounded w-3/4"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!complianceData?.riskAlerts.length) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <CardTitle className="text-lg">Regulatory Alerts</CardTitle>
          </div>
          <CardDescription>No active alerts - You're up to date!</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'medium':
        return <Bell className="h-4 w-4 text-primary" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getSeverityVariant = (severity: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (severity) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const priorityAlerts = complianceData.riskAlerts
    .sort((a, b) => {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return severityOrder[b.severity as keyof typeof severityOrder] - severityOrder[a.severity as keyof typeof severityOrder];
    })
    .slice(0, 5);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Bell className="h-5 w-5 text-primary" />
              <span>Regulatory Alerts</span>
            </CardTitle>
            <CardDescription>
              {complianceData.riskAlerts.length} active alerts requiring attention
            </CardDescription>
          </div>
          <Badge variant="secondary">
            {complianceData.riskAlerts.filter(a => a.severity === 'critical').length} Critical
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {priorityAlerts.map((alert) => (
          <div key={alert.id} className="border-l-2 border-l-muted pl-4 space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-2 flex-1">
                {getSeverityIcon(alert.severity)}
                <div className="space-y-1 flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">{alert.title}</p>
                    <Badge variant={getSeverityVariant(alert.severity)} className="text-xs">
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {alert.description}
                  </p>
                  {alert.dueDate && (
                    <p className="text-xs text-warning font-medium">
                      Due: {format(new Date(alert.dueDate), 'MMM dd, yyyy')}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {alert.actionRequired && (
              <div className="bg-muted/30 p-2 rounded text-xs">
                <p className="font-medium text-destructive mb-1">Action Required</p>
                <p className="text-muted-foreground">
                  This alert requires immediate attention to maintain compliance.
                </p>
              </div>
            )}
          </div>
        ))}

        {complianceData.riskAlerts.length > 5 && (
          <div className="pt-2 border-t">
            <Button variant="outline" size="sm" className="w-full">
              View All {complianceData.riskAlerts.length} Alerts
              <ExternalLink className="h-3 w-3 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
