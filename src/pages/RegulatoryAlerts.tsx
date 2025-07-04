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

const RegulatoryAlerts = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const alertCategories = [
    { id: 'all', name: 'All Alerts', count: 15 },
    { id: 'gst', name: 'GST', count: 5 },
    { id: 'labor', name: 'Labor Laws', count: 3 },
    { id: 'company', name: 'Company Law', count: 4 },
    { id: 'tax', name: 'Income Tax', count: 2 },
    { id: 'fema', name: 'FEMA', count: 1 }
  ];

  const alerts = [
    {
      id: 1,
      title: 'GST Rate Changes for Textile Industry',
      description: 'New GST rates effective from April 1, 2024, for textile and apparel sector',
      category: 'gst',
      priority: 'high',
      date: '2024-03-20',
      deadline: '2024-04-01',
      source: 'CBIC',
      impact: 'Direct',
      status: 'new',
      actionRequired: 'Update product pricing and GST calculations'
    },
    {
      id: 2,
      title: 'New EPF Contribution Rules',
      description: 'Updated provident fund contribution rules for employees earning above ₹15,000',
      category: 'labor',
      priority: 'medium',
      date: '2024-03-18',
      deadline: '2024-04-15',
      source: 'EPFO',
      impact: 'HR Policy',
      status: 'acknowledged',
      actionRequired: 'Review and update HR policies'
    },
    {
      id: 3,
      title: 'Annual Return Filing Extension',
      description: 'MCA extends deadline for Annual Return filing due to technical issues',
      category: 'company',
      priority: 'low',
      date: '2024-03-15',
      deadline: '2024-05-30',
      source: 'MCA',
      impact: 'Compliance',
      status: 'reviewed',
      actionRequired: 'Schedule filing before extended deadline'
    },
    {
      id: 4,
      title: 'Digital Signature Certificate Renewal',
      description: 'Mandatory renewal of Class 3 DSC for company filings',
      category: 'company',
      priority: 'high',
      date: '2024-03-12',
      deadline: '2024-03-31',
      source: 'CCA India',
      impact: 'Filing Process',
      status: 'action_taken',
      actionRequired: 'Renew DSC before expiry'
    },
    {
      id: 5,
      title: 'TDS Rate Revision Notification',
      description: 'Revised TDS rates for professional services under Section 194J',
      category: 'tax',
      priority: 'medium',
      date: '2024-03-10',
      deadline: '2024-04-01',
      source: 'CBDT',
      impact: 'Financial',
      status: 'new',
      actionRequired: 'Update TDS deduction rates'
    }
  ];

  const upcomingDeadlines = [
    { task: 'GST GSTR-1 Filing', date: '2024-03-31', category: 'GST', priority: 'high' },
    { task: 'TDS Return Q4', date: '2024-04-15', category: 'Tax', priority: 'medium' },
    { task: 'EPF Contribution', date: '2024-04-05', category: 'Labor', priority: 'high' },
    { task: 'Annual Return Filing', date: '2024-05-30', category: 'Company', priority: 'low' }
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
    ? alerts 
    : alerts.filter(alert => alert.category === selectedCategory);

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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-destructive">5</div>
              <div className="text-sm text-muted-foreground">High Priority</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-warning">8</div>
              <div className="text-sm text-muted-foreground">Medium Priority</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-success">12</div>
              <div className="text-sm text-muted-foreground">Reviewed</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Action Required</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Filter */}
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

            {/* Upcoming Deadlines */}
            <Card className="shadow-card mt-6">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="mr-2 h-5 w-5 text-warning" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-sm">{deadline.task}</p>
                        <p className="text-xs text-muted-foreground">{deadline.date}</p>
                      </div>
                      <Badge variant={getPriorityColor(deadline.priority)} className="text-xs">
                        {deadline.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{deadline.category}</p>
                  </div>
                ))}
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