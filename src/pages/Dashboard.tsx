import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  FileText, 
  BarChart3, 
  Bell, 
  FileCheck, 
  Users, 
  BookOpen, 
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Calendar,
  IndianRupee
} from 'lucide-react';

const Dashboard = () => {
  const quickStats = [
    {
      title: 'Compliance Score',
      value: '94%',
      change: '+5%',
      icon: Shield,
      color: 'text-success'
    },
    {
      title: 'Active Alerts',
      value: '3',
      change: '-2',
      icon: Bell,
      color: 'text-warning'
    },
    {
      title: 'Pending Filings',
      value: '2',
      change: '-1',
      icon: FileCheck,
      color: 'text-primary'
    },
    {
      title: 'Cost Savings',
      value: '₹45K',
      change: '+₹12K',
      icon: IndianRupee,
      color: 'text-accent'
    }
  ];

  const complianceModules = [
    {
      icon: Shield,
      title: 'GST Compliance',
      description: 'Manage GST returns, payments, and compliance tracking',
      status: 'Active',
      progress: 85,
      link: '/gst-compliance',
      alerts: 1
    },
    {
      icon: FileText,
      title: 'Contract Review',
      description: 'AI-powered contract analysis and management',
      status: 'Active',
      progress: 92,
      link: '/contract-review',
      alerts: 0
    },
    {
      icon: Bell,
      title: 'Regulatory Alerts',
      description: 'Real-time updates on regulatory changes',
      status: 'Active',
      progress: 100,
      link: '/regulatory-alerts',
      alerts: 3
    },
    {
      icon: FileCheck,
      title: 'Automated Filings',
      description: 'Streamlined government filings and submissions',
      status: 'Active',
      progress: 78,
      link: '/automated-filings',
      alerts: 2
    },
    {
      icon: Users,
      title: 'Policy Compliance',
      description: 'Internal policy management and compliance',
      status: 'Setup Required',
      progress: 45,
      link: '/policy-compliance',
      alerts: 0
    },
    {
      icon: BarChart3,
      title: 'Risk Analytics',
      description: 'Advanced risk assessment and mitigation',
      status: 'Active',
      progress: 88,
      link: '/risk-analytics',
      alerts: 1
    }
  ];

  const recentActivity = [
    {
      action: 'GST Return Filed',
      description: 'GSTR-3B for March 2024 submitted successfully',
      time: '2 hours ago',
      icon: CheckCircle2,
      color: 'text-success'
    },
    {
      action: 'Contract Reviewed',
      description: 'Vendor agreement analysis completed',
      time: '4 hours ago',
      icon: FileText,
      color: 'text-primary'
    },
    {
      action: 'Regulatory Alert',
      description: 'New labor law amendments published',
      time: '6 hours ago',
      icon: AlertTriangle,
      color: 'text-warning'
    },
    {
      action: 'Risk Assessment',
      description: 'Monthly compliance risk analysis generated',
      time: '1 day ago',
      icon: BarChart3,
      color: 'text-accent'
    }
  ];

  const upcomingDeadlines = [
    {
      title: 'GST GSTR-1 Filing',
      date: 'Due in 3 days',
      priority: 'High',
      type: 'GST'
    },
    {
      title: 'PF Contribution',
      date: 'Due in 5 days',
      priority: 'Medium',
      type: 'Labor'
    },
    {
      title: 'Annual ROC Filing',
      date: 'Due in 15 days',
      priority: 'High',
      type: 'Company'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Compliance Dashboard</h1>
            <p className="text-muted-foreground">Monitor and manage your legal compliance status</p>
          </div>
          <Button variant="hero" asChild>
            <Link to="/onboarding">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Review
            </Link>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Compliance Modules */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-primary" />
                  Compliance Modules
                </CardTitle>
                <CardDescription>
                  Manage all aspects of your legal and regulatory compliance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {complianceModules.map((module, index) => (
                    <Card key={index} className="group hover:shadow-card transition-all duration-300 border-border">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <module.icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
                            <div>
                              <h3 className="font-semibold text-sm">{module.title}</h3>
                              <p className="text-xs text-muted-foreground">{module.description}</p>
                            </div>
                          </div>
                          {module.alerts > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {module.alerts}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Progress</span>
                            <span className="text-xs font-medium">{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-2" />
                        </div>
                        
                        <div className="flex justify-between items-center mt-3">
                          <Badge 
                            variant={module.status === 'Active' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {module.status}
                          </Badge>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={module.link}>View Details</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="mr-2 h-5 w-5 text-warning" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{deadline.title}</p>
                      <p className="text-xs text-muted-foreground">{deadline.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={deadline.priority === 'High' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {deadline.priority}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{deadline.type}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/deadlines">View All Deadlines</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <TrendingUp className="mr-2 h-5 w-5 text-accent" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <activity.icon className={`h-4 w-4 mt-0.5 ${activity.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/activity">View All Activity</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="professional" className="w-full justify-start" asChild>
                  <Link to="/knowledge-base">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Browse Knowledge Base
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/contract-review">
                    <FileText className="mr-2 h-4 w-4" />
                    Upload Contract
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/support">
                    <Users className="mr-2 h-4 w-4" />
                    Contact Support
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;