import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  FileText, 
  Bell, 
  FileCheck, 
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const complianceStatus = {
    overall: 92,
    status: 'Good',
    issues: 2,
    color: 'text-success'
  };

  const upcomingDeadlines = [
    {
      title: 'GST GSTR-1 Filing',
      date: 'Due in 3 days',
      priority: 'high'
    },
    {
      title: 'PF Contribution',
      date: 'Due in 5 days',
      priority: 'medium'
    },
    {
      title: 'Annual ROC Filing',
      date: 'Due in 15 days',
      priority: 'high'
    }
  ];

  const recentActions = [
    {
      action: 'GST Return Filed',
      description: 'GSTR-3B for March 2024 submitted successfully',
      time: '2 hours ago',
      status: 'success'
    },
    {
      action: 'Contract Reviewed',
      description: 'Vendor agreement analysis completed',
      time: '4 hours ago',
      status: 'completed'
    },
    {
      action: 'Regulatory Alert',
      description: 'New labor law amendments published',
      time: '6 hours ago',
      status: 'alert'
    }
  ];

  const quickLinks = [
    {
      title: 'Contract Review',
      description: 'Upload and analyze contracts',
      icon: FileText,
      link: '/contract-review',
      color: 'bg-primary/10 text-primary'
    },
    {
      title: 'Automated Filings',
      description: 'Manage government filings',
      icon: FileCheck,
      link: '/automated-filings',
      color: 'bg-accent/10 text-accent'
    },
    {
      title: 'Regulatory Alerts',
      description: 'View compliance updates',
      icon: Bell,
      link: '/regulatory-alerts',
      color: 'bg-warning/10 text-warning'
    },
    {
      title: 'Knowledge Base',
      description: 'Browse compliance resources',
      icon: BookOpen,
      link: '/knowledge-base',
      color: 'bg-success/10 text-success'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Your compliance overview at a glance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Compliance Status */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-primary" />
                  Compliance Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="text-3xl font-bold text-foreground">{complianceStatus.overall}%</div>
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        {complianceStatus.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {complianceStatus.issues} items need attention
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary">
                    <CheckCircle className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Compliance Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActions.map((action, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className={`p-1 rounded-full ${
                      action.status === 'success' ? 'bg-success/10' :
                      action.status === 'alert' ? 'bg-warning/10' : 'bg-primary/10'
                    }`}>
                      {action.status === 'success' ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : action.status === 'alert' ? (
                        <AlertTriangle className="h-4 w-4 text-warning" />
                      ) : (
                        <FileText className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{action.action}</p>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{action.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-warning" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{deadline.title}</p>
                      <p className="text-xs text-muted-foreground">{deadline.date}</p>
                    </div>
                    <Badge 
                      variant={deadline.priority === 'high' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {deadline.priority === 'high' ? 'High' : 'Medium'}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickLinks.map((link, index) => (
                  <Button 
                    key={index}
                    variant="ghost" 
                    className="w-full justify-start h-auto p-4 hover:bg-muted/50"
                    asChild
                  >
                    <Link to={link.link}>
                      <div className={`p-2 rounded-lg mr-3 ${link.color}`}>
                        <link.icon className="h-4 w-4" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-medium text-sm">{link.title}</p>
                        <p className="text-xs text-muted-foreground">{link.description}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;