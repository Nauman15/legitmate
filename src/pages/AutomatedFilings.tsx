import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileCheck, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Upload,
  Download,
  RefreshCw,
  Settings,
  FileText,
  Shield,
  Building,
  TrendingUp
} from 'lucide-react';

const AutomatedFilings = () => {
  const upcomingFilings = [
    {
      id: 1,
      name: 'GST GSTR-1',
      description: 'Monthly GST return for outward supplies',
      dueDate: '2024-04-11',
      status: 'pending',
      priority: 'high',
      category: 'GST',
      estimatedTime: '2 hours',
      autoStatus: 'enabled',
      documents: ['Sales Register', 'Invoice Data'],
      progress: 85
    },
    {
      id: 2,
      name: 'TDS Return',
      description: 'Quarterly TDS return filing',
      dueDate: '2024-04-15',
      status: 'in_progress',
      priority: 'medium',
      category: 'Tax',
      estimatedTime: '1.5 hours',
      autoStatus: 'enabled',
      documents: ['TDS Certificate', 'Challan Details'],
      progress: 45
    },
    {
      id: 3,
      name: 'EPF Monthly Return',
      description: 'Employee Provident Fund monthly return',
      dueDate: '2024-04-05',
      status: 'draft',
      priority: 'high',
      category: 'Labor',
      estimatedTime: '1 hour',
      autoStatus: 'enabled',
      documents: ['Salary Register', 'Employee Data'],
      progress: 20
    },
    {
      id: 4,
      name: 'Annual Return',
      description: 'Company annual return filing with ROC',
      dueDate: '2024-05-30',
      status: 'scheduled',
      priority: 'medium',
      category: 'Company',
      estimatedTime: '3 hours',
      autoStatus: 'manual',
      documents: ['Financial Statements', 'Board Resolutions'],
      progress: 0
    }
  ];

  const completedFilings = [
    {
      name: 'GST GSTR-3B',
      filedDate: '2024-03-20',
      status: 'success',
      category: 'GST',
      acknowledgment: 'ARN123456789'
    },
    {
      name: 'Income Tax Return',
      filedDate: '2024-03-15',
      status: 'success',
      category: 'Tax',
      acknowledgment: 'ITR987654321'
    },
    {
      name: 'PF Contribution',
      filedDate: '2024-03-10',
      status: 'success',
      category: 'Labor',
      acknowledgment: 'PF456789123'
    },
    {
      name: 'VAT Return',
      filedDate: '2024-03-05',
      status: 'rejected',
      category: 'Tax',
      acknowledgment: 'VAT789456123',
      errorMessage: 'Invalid GST number format'
    }
  ];

  const automationSettings = [
    {
      category: 'GST Filings',
      enabled: true,
      filings: ['GSTR-1', 'GSTR-3B', 'GSTR-9'],
      frequency: 'Monthly',
      lastUpdated: '2024-03-20'
    },
    {
      category: 'Tax Returns',
      enabled: true,
      filings: ['TDS Return', 'Advance Tax'],
      frequency: 'Quarterly',
      lastUpdated: '2024-03-15'
    },
    {
      category: 'Labor Compliance',
      enabled: false,
      filings: ['EPF Return', 'ESI Return'],
      frequency: 'Monthly',
      lastUpdated: '2024-03-01'
    },
    {
      category: 'Company Filings',
      enabled: false,
      filings: ['Annual Return', 'Board Resolutions'],
      frequency: 'Annual',
      lastUpdated: '2024-02-20'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'pending': return 'text-warning';
      case 'in_progress': return 'text-primary';
      case 'rejected': return 'text-destructive';
      case 'draft': return 'text-muted-foreground';
      case 'scheduled': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success': return 'default';
      case 'pending': return 'secondary';
      case 'in_progress': return 'outline';
      case 'rejected': return 'destructive';
      case 'draft': return 'secondary';
      case 'scheduled': return 'outline';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <FileCheck className="mr-3 h-8 w-8 text-primary" />
              Automated Filings
            </h1>
            <p className="text-muted-foreground">Streamline your regulatory filings with intelligent automation</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="hero">
              <Upload className="mr-2 h-4 w-4" />
              Manual Filing
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Upcoming Filings</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-success">8</div>
              <div className="text-sm text-muted-foreground">Auto-Enabled</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-accent">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-warning">3</div>
              <div className="text-sm text-muted-foreground">Overdue</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {upcomingFilings.map((filing) => (
                <Card key={filing.id} className="shadow-card hover:shadow-elegant transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold">{filing.name}</h3>
                            <p className="text-muted-foreground">{filing.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={getPriorityColor(filing.priority)}>
                              {filing.priority.toUpperCase()}
                            </Badge>
                            <Badge variant={getStatusBadge(filing.status)}>
                              {filing.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-muted-foreground">Due Date:</span>
                            <p className="font-semibold">{filing.dueDate}</p>
                          </div>
                          <div>
                            <span className="font-medium text-muted-foreground">Category:</span>
                            <p className="font-semibold">{filing.category}</p>
                          </div>
                          <div>
                            <span className="font-medium text-muted-foreground">Est. Time:</span>
                            <p className="font-semibold">{filing.estimatedTime}</p>
                          </div>
                          <div>
                            <span className="font-medium text-muted-foreground">Automation:</span>
                            <p className={`font-semibold ${filing.autoStatus === 'enabled' ? 'text-success' : 'text-warning'}`}>
                              {filing.autoStatus}
                            </p>
                          </div>
                        </div>

                        {filing.progress > 0 && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{filing.progress}%</span>
                            </div>
                            <Progress value={filing.progress} className="h-2" />
                          </div>
                        )}

                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">Required Documents:</p>
                          <div className="flex flex-wrap gap-2">
                            {filing.documents.map((doc, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <FileText className="mr-1 h-3 w-3" />
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-6">
                        <Button variant="professional" size="sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                        {filing.autoStatus === 'enabled' && (
                          <Button variant="success" size="sm">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Auto-File
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recently Completed Filings</CardTitle>
                <CardDescription>Track your filing history and acknowledgments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {completedFilings.map((filing, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${filing.status === 'success' ? 'bg-success/10' : 'bg-destructive/10'}`}>
                        {filing.status === 'success' ? (
                          <CheckCircle className="h-5 w-5 text-success" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{filing.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Filed on {filing.filedDate} • {filing.category}
                        </p>
                        {filing.errorMessage && (
                          <p className="text-sm text-destructive mt-1">{filing.errorMessage}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-sm font-medium">ACK: {filing.acknowledgment}</p>
                        <Badge variant={filing.status === 'success' ? 'default' : 'destructive'}>
                          {filing.status}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Automation Settings</CardTitle>
                <CardDescription>Configure automatic filing for different compliance categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {automationSettings.map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`p-2 rounded-full ${setting.enabled ? 'bg-success/10' : 'bg-muted'}`}>
                          {setting.category === 'GST Filings' && <Shield className="h-5 w-5 text-primary" />}
                          {setting.category === 'Tax Returns' && <TrendingUp className="h-5 w-5 text-primary" />}
                          {setting.category === 'Labor Compliance' && <FileText className="h-5 w-5 text-primary" />}
                          {setting.category === 'Company Filings' && <Building className="h-5 w-5 text-primary" />}
                        </div>
                        <div>
                          <h3 className="font-semibold">{setting.category}</h3>
                          <p className="text-sm text-muted-foreground">
                            {setting.frequency} • Last updated: {setting.lastUpdated}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 ml-11">
                        {setting.filings.map((filing, filingIndex) => (
                          <Badge key={filingIndex} variant="outline" className="text-xs">
                            {filing}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={setting.enabled ? 'default' : 'secondary'}>
                        {setting.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant={setting.enabled ? 'outline' : 'professional'} size="sm">
                        {setting.enabled ? 'Disable' : 'Enable'}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Filing Calendar
                </CardTitle>
                <CardDescription>View all upcoming filing deadlines in calendar format</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Calendar className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg mb-2">Filing Calendar View</p>
                  <p>Interactive calendar coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AutomatedFilings;