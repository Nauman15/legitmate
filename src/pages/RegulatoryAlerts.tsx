
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  AlertTriangle, 
  Clock, 
  Filter, 
  Search,
  CheckCircle,
  Calendar,
  TrendingUp,
  FileText,
  Shield,
  Users
} from 'lucide-react';
import { useIndianCompliance } from '@/hooks/useIndianCompliance';
import { EmptyAlertsState } from '@/components/regulatory/EmptyAlertsState';

const RegulatoryAlerts = () => {
  const { complianceData, loading, getAlertStats, getAlertCategoryCounts } = useIndianCompliance();
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="max-w-7xl mx-auto p-6">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-24 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state if no alerts exist
  if (!complianceData?.regulatoryAlerts.length) {
    return <EmptyAlertsState />;
  }

  const alertStats = getAlertStats();
  const categoryCounts = getAlertCategoryCounts();

  const alertCategories = [
    { id: 'all', name: 'All Alerts', count: categoryCounts.all },
    { id: 'gst', name: 'GST', count: categoryCounts.gst },
    { id: 'labor', name: 'Labor Laws', count: categoryCounts.labor },
    { id: 'company', name: 'Company Law', count: categoryCounts.company },
    { id: 'tax', name: 'Income Tax', count: categoryCounts.tax },
    { id: 'fema', name: 'FEMA', count: categoryCounts.fema }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Bell className="h-4 w-4 text-primary" />;
      case 'acknowledged': return <Clock className="h-4 w-4 text-warning" />;
      case 'reviewed': return <FileText className="h-4 w-4 text-accent" />;
      case 'action_taken': return <CheckCircle className="h-4 w-4 text-success" />;
      default: return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'gst': return <Shield className="h-4 w-4" />;
      case 'labor': return <Users className="h-4 w-4" />;
      case 'company': return <FileText className="h-4 w-4" />;
      case 'tax': return <TrendingUp className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const filteredAlerts = selectedCategory === 'all' 
    ? complianceData.regulatoryAlerts 
    : complianceData.regulatoryAlerts.filter(alert => alert.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <Bell className="mr-3 h-8 w-8 text-primary" />
              Regulatory Alerts
            </h1>
            <p className="text-muted-foreground">Stay updated with latest regulatory changes and compliance requirements</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="hero">
              <Bell className="mr-2 h-4 w-4" />
              Subscribe to Alerts
            </Button>
          </div>
        </div>

        {/* Dynamic Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-destructive">{alertStats.high}</div>
              <div className="text-sm text-muted-foreground">High Priority</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-warning">{alertStats.medium}</div>
              <div className="text-sm text-muted-foreground">Medium Priority</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-success">{alertStats.reviewed}</div>
              <div className="text-sm text-muted-foreground">Reviewed</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">{alertStats.actionRequired}</div>
              <div className="text-sm text-muted-foreground">Action Required</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Dynamic Category Filter */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {alertCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted/50 text-muted-foreground'
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Dynamic Upcoming Deadlines from Filing Calendar */}
            <Card className="shadow-card mt-6">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="mr-2 h-5 w-5 text-warning" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                {complianceData.nextFilingDeadlines.length > 0 ? (
                  <div className="space-y-3">
                    {complianceData.nextFilingDeadlines.slice(0, 4).map((deadline, index) => (
                      <div key={index} className="p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-sm">{deadline.filingType}</p>
                            <p className="text-xs text-muted-foreground">{deadline.dueDate}</p>
                          </div>
                          <Badge variant={getPriorityColor(deadline.penaltyRisk)} className="text-xs">
                            {deadline.penaltyRisk}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No upcoming deadlines</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Alert Feed */}
          <div className="lg:col-span-3">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Recent Alerts</CardTitle>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search alerts..."
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <Card key={alert.id} className="border border-border hover:shadow-card transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          {getStatusIcon(alert.status)}
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{alert.title}</h3>
                            <p className="text-muted-foreground mb-3">{alert.description}</p>
                            
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <Badge variant="outline" className="flex items-center space-x-1">
                                {getCategoryIcon(alert.category)}
                                <span className="capitalize">{alert.category}</span>
                              </Badge>
                              <Badge variant={getPriorityColor(alert.priority)}>
                                {alert.priority.toUpperCase()} PRIORITY
                              </Badge>
                              <Badge variant="secondary">
                                {alert.source}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                              <div>
                                <span className="font-medium">Published:</span> {alert.date}
                              </div>
                              <div>
                                <span className="font-medium">Deadline:</span> {alert.deadline}
                              </div>
                              <div>
                                <span className="font-medium">Impact:</span> {alert.impact}
                              </div>
                              <div>
                                <span className="font-medium">Status:</span> 
                                <span className="capitalize ml-1">{alert.status.replace('_', ' ')}</span>
                              </div>
                            </div>

                            {alert.actionRequired && (
                              <div className="mt-3 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                                <p className="text-sm">
                                  <span className="font-medium text-accent">Action Required:</span> {alert.actionRequired}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {alert.status === 'new' && (
                            <Button variant="professional" size="sm">
                              Mark as Read
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegulatoryAlerts;
