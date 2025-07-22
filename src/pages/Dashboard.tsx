
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useContracts } from '@/hooks/useContracts';
import { useIndianCompliance } from '@/hooks/useIndianCompliance';
import { ComplianceScoreCard } from '@/components/compliance/ComplianceScoreCard';
import { RegulatoryAlertsWidget } from '@/components/compliance/RegulatoryAlertsWidget';
import { FilingCalendarWidget } from '@/components/compliance/FilingCalendarWidget';
import { AIComplianceAssistant } from '@/components/ai/AIComplianceAssistant';
import { SetupPrompt } from '@/components/dashboard/SetupPrompt';
import { Link } from 'react-router-dom';
import {
  FileText,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Bot,
  Upload,
  BarChart3,
  Shield,
  Users,
  BookOpen,
  Settings,
  Activity
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { contracts, loading: contractsLoading } = useContracts();
  const { complianceData, loading: complianceLoading } = useIndianCompliance();

  const recentContracts = contracts?.slice(0, 5) || [];
  const totalContracts = contracts?.length || 0;
  const analyzedContracts = contracts?.filter(c => c.status === 'reviewed').length || 0;
  const highRiskContracts = contracts?.filter(c => (c.risk_score || 0) > 70).length || 0;

  // Quick stats
  const stats = [
    {
      title: 'Total Contracts',
      value: totalContracts,
      change: '+12%',
      trend: 'up' as const,
      icon: FileText,
      color: 'text-primary'
    },
    {
      title: 'Compliance Score',
      value: complianceData?.complianceScore || 0,
      change: '+5pts',
      trend: 'up' as const,
      icon: Shield,
      color: 'text-success'
    },
    {
      title: 'Active Alerts',
      value: complianceData?.riskAlerts.length || 0,
      change: '-2',
      trend: 'down' as const,
      icon: AlertTriangle,
      color: 'text-warning'
    },
    {
      title: 'Due Filings',
      value: complianceData?.nextFilingDeadlines.filter(f => f.status === 'pending').length || 0,
      change: 'Next: 3 days',
      trend: 'neutral' as const,
      icon: Calendar,
      color: 'text-primary'
    }
  ];

  const quickActions = [
    {
      title: 'Upload Contract',
      description: 'Get AI-powered compliance analysis',
      icon: Upload,
      href: '/contract-review',
      color: 'bg-primary'
    },
    {
      title: 'View Analytics',
      description: 'Risk insights and predictions',
      icon: BarChart3,
      href: '/risk-analytics',
      color: 'bg-success'
    },
    {
      title: 'Check Compliance',
      description: 'POSH, DPDP, and other requirements',
      icon: Shield,
      href: '/policy-compliance',
      color: 'bg-warning'
    },
    {
      title: 'Filing Calendar',
      description: 'Manage deadlines and submissions',
      icon: Calendar,
      href: '/automated-filings',
      color: 'bg-accent'
    }
  ];

  if (contractsLoading || complianceLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="shadow-card">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {user?.email?.split('@')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Here's your Indian compliance overview for today.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <Badge variant={
                  stat.trend === 'up' ? 'secondary' : 
                  stat.trend === 'down' ? 'outline' : 'secondary'
                }>
                  {stat.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Link key={index} to={action.href}>
            <Card className="shadow-card hover:shadow-lg transition-all duration-200 cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${action.color} text-primary-foreground`}>
                    <action.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Compliance</span>
          </TabsTrigger>
          <TabsTrigger value="contracts" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Contracts</span>
          </TabsTrigger>
          <TabsTrigger value="assistant" className="flex items-center space-x-2">
            <Bot className="h-4 w-4" />
            <span>AI Assistant</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ComplianceScoreCard />
            <RegulatoryAlertsWidget />
            <FilingCalendarWidget />
            
            {/* Recent Activity */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentContracts.length > 0 ? (
                  recentContracts.map(contract => (
                    <div key={contract.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                      <FileText className="h-4 w-4 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{contract.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {contract.status} • {new Date(contract.uploaded_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {contract.category || 'General'}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <SetupPrompt
                    title="No Contracts Yet"
                    description="Upload your first contract to get started with AI-powered compliance analysis."
                    actionText="Upload Contract"
                    onAction={() => window.location.href = '/contract-review'}
                    icon={<Upload className="h-6 w-6" />}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ComplianceScoreCard />
            <RegulatoryAlertsWidget />
            <FilingCalendarWidget />
            
            {/* Compliance Summary */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Compliance Areas</CardTitle>
                <CardDescription>Track compliance across different regulations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium">POSH Act 2013</span>
                  </div>
                  <Badge variant={complianceData?.poshCompliance?.complianceStatus === 'compliant' ? 'secondary' : 'destructive'}>
                    {complianceData?.poshCompliance?.complianceStatus || 'Not Set'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-warning" />
                    <span className="text-sm font-medium">DPDP Act 2023</span>
                  </div>
                  <Badge variant="outline">
                    {complianceData?.dpdpCompliance?.complianceScore || 0}% Complete
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Contract Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Contracts</span>
                  <span className="font-medium">{totalContracts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Analyzed</span>
                  <span className="font-medium">{analyzedContracts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">High Risk</span>
                  <span className="font-medium text-destructive">{highRiskContracts}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2 shadow-card">
              <CardHeader>
                <CardTitle>Recent Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                {recentContracts.length > 0 ? (
                  <div className="space-y-3">
                    {recentContracts.map(contract => (
                      <div key={contract.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-sm font-medium">{contract.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(contract.uploaded_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{contract.status}</Badge>
                          {contract.risk_score && (
                            <Badge variant={contract.risk_score > 70 ? 'destructive' : contract.risk_score > 50 ? 'secondary' : 'outline'}>
                              Risk: {contract.risk_score}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No contracts uploaded yet</p>
                    <Button className="mt-4" asChild>
                      <Link to="/contract-review">Upload Your First Contract</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assistant" className="space-y-6">
          <AIComplianceAssistant />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
