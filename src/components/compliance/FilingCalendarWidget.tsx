
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import { useIndianCompliance } from '@/hooks/useIndianCompliance';
import { format, differenceInDays } from 'date-fns';
import { Link } from 'react-router-dom';

export const FilingCalendarWidget = () => {
  const { complianceData, loading } = useIndianCompliance();

  if (loading) {
    return (
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-muted rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!complianceData?.nextFilingDeadlines.length) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Filing Calendar</CardTitle>
          </div>
          <CardDescription>Track your GST, TDS and other filing deadlines</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-4 space-y-3">
            <Calendar className="h-8 w-8 text-muted-foreground mx-auto" />
            <p className="text-sm text-muted-foreground">
              No filing deadlines configured yet. Set up your calendar to never miss a deadline.
            </p>
            <div className="flex flex-col space-y-2">
              <Button className="w-full" asChild>
                <Link to="/automated-filings">Setup Filing Calendar</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/settings">Configure Business Details</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'filed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-warning" />;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'filed':
        return 'secondary';
      case 'overdue':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    return differenceInDays(new Date(dueDate), new Date());
  };

  const getPriorityColor = (filing: any) => {
    const daysUntilDue = getDaysUntilDue(filing.dueDate);
    if (filing.status === 'overdue') return 'border-l-destructive';
    if (daysUntilDue <= 7) return 'border-l-warning';
    if (daysUntilDue <= 30) return 'border-l-primary';
    return 'border-l-muted';
  };

  const upcomingFilings = complianceData.nextFilingDeadlines
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  const overdueCount = complianceData.nextFilingDeadlines.filter(f => f.status === 'overdue').length;
  const urgentCount = complianceData.nextFilingDeadlines.filter(f => 
    getDaysUntilDue(f.dueDate) <= 7 && f.status === 'pending'
  ).length;

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Filing Calendar</span>
            </CardTitle>
            <CardDescription>
              {complianceData.nextFilingDeadlines.length} total filings tracked
            </CardDescription>
          </div>
          <div className="flex space-x-1">
            {overdueCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {overdueCount} Overdue
              </Badge>
            )}
            {urgentCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {urgentCount} Urgent
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {upcomingFilings.map((filing) => {
          const daysUntilDue = getDaysUntilDue(filing.dueDate);
          
          return (
            <div key={filing.id} className={`border-l-2 ${getPriorityColor(filing)} pl-4 space-y-2`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {getStatusIcon(filing.status)}
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium">{filing.filingType}</p>
                      <Badge variant={getStatusVariant(filing.status)} className="text-xs">
                        {filing.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Due: {format(new Date(filing.dueDate), 'MMM dd, yyyy')}</span>
                      <span>
                        {filing.status === 'overdue' 
                          ? `${Math.abs(daysUntilDue)} days overdue`
                          : `${daysUntilDue} days remaining`
                        }
                      </span>
                    </div>
                    {filing.penaltyRisk !== 'low' && (
                      <div className="flex items-center space-x-1 text-xs">
                        <AlertTriangle className="h-3 w-3 text-warning" />
                        <span className="text-warning">
                          {filing.penaltyRisk} penalty risk
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {complianceData.nextFilingDeadlines.length > 5 && (
          <div className="pt-2 border-t">
            <Button variant="outline" size="sm" className="w-full">
              View Full Calendar ({complianceData.nextFilingDeadlines.length} total)
              <ExternalLink className="h-3 w-3 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
