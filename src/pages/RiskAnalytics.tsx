import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle, 
  Shield,
  Target,
  Activity,
  Calendar,
  Download,
  Settings,
  RefreshCw,
  Eye,
  Filter,
  Database,
  Link,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  DollarSign,
  FileText,
  Zap,
  Plus
} from 'lucide-react';

const RiskAnalytics = () => {
  const riskMetrics = [
    {
      title: 'Overall Risk Score',
      value: '73',
      unit: '/100',
      change: '-5',
      trend: 'down',
      color: 'text-warning',
      description: 'Medium Risk Level'
    },
    {
      title: 'Critical Issues',
      value: '3',
      unit: '',
      change: '+1',
      trend: 'up',
      color: 'text-destructive',
      description: 'Require Immediate Action'
    },
    {
      title: 'Compliance Score',
      value: '87',
      unit: '%',
      change: '+3',
      trend: 'up',
      color: 'text-success',
      description: 'Above Industry Average'
    },
    {
      title: 'Predicted Violations',
      value: '2',
      unit: '',
      change: '-1',
      trend: 'down',
      color: 'text-primary',
      description: 'Next 30 Days'
    }
  ];

  const riskCategories = [
    {
      category: 'GST Compliance',
      riskLevel: 'High',
      score: 85,
      issues: [
        'Late filing penalty risk for GSTR-1',
        'Input tax credit mismatch detected',
        'Missing e-way bills for interstate transactions'
      ],
      impact: 'Financial',
      probability: 78,
      mitigation: 'Automated filing setup recommended'
    },
    {
      category: 'Labor Law Compliance',
      riskLevel: 'Medium',
      score: 65,
      issues: [
        'Overtime payment policy needs update',
        'Employee contract terms review pending',
        'PF contribution irregularities'
      ],
      impact: 'Legal',
      probability: 45,
      mitigation: 'HR policy review scheduled'
    },
    {
      category: 'Company Law',
      riskLevel: 'Low',
      score: 25,
      issues: [
        'Annual return filing deadline approaching',
        'Board meeting minutes documentation'
      ],
      impact: 'Administrative',
      probability: 25,
      mitigation: 'Calendar reminders activated'
    },
    {
      category: 'Data Protection',
      riskLevel: 'Medium',
      score: 55,
      issues: [
        'Privacy policy update required',
        'Employee data handling procedures',
        'Third-party data sharing agreements'
      ],
      impact: 'Regulatory',
      probability: 60,
      mitigation: 'Data audit in progress'
    }
  ];

  const riskTrends = [
    { month: 'Jan', overall: 68, gst: 75, labor: 45, company: 30, data: 50 },
    { month: 'Feb', overall: 72, gst: 80, labor: 50, company: 35, data: 55 },
    { month: 'Mar', overall: 73, gst: 85, labor: 65, company: 25, data: 55 },
  ];

  const predictiveInsights = [
    {
      title: 'GST Filing Delay Risk',
      probability: 85,
      impact: 'High',
      timeline: '5 days',
      description: 'Based on current data processing speed, there\'s a high risk of missing the GSTR-1 filing deadline.',
      recommendation: 'Enable automated filing or allocate additional resources immediately.',
      category: 'GST'
    },
    {
      title: 'Labor Compliance Violation',
      probability: 60,
      impact: 'Medium',
      timeline: '15 days',
      description: 'Overtime policy violations detected in Engineering department.',
      recommendation: 'Review and update overtime policies, conduct team training.',
      category: 'Labor'
    },
    {
      title: 'Data Breach Risk',
      probability: 35,
      impact: 'High',
      timeline: '30 days',
      description: 'Third-party integrations lack proper security compliance checks.',
      recommendation: 'Conduct security audit of all external integrations.',
      category: 'Data'
    }
  ];

  const mitigationActions = [
    {
      title: 'Implement Automated GST Filing',
      status: 'in_progress',
      priority: 'high',
      deadline: '2024-04-01',
      assignee: 'Finance Team',
      progress: 65
    },
    {
      title: 'Update HR Policies Documentation',
      status: 'pending',
      priority: 'medium',
      deadline: '2024-04-15',
      assignee: 'HR Department',
      progress: 0
    },
    {
      title: 'Schedule Board Meeting',
      status: 'completed',
      priority: 'low',
      deadline: '2024-03-25',
      assignee: 'Legal Team',
      progress: 100
    },
    {
      title: 'Data Protection Impact Assessment',
      status: 'in_progress',
      priority: 'high',
      deadline: '2024-04-10',
      assignee: 'IT Security',
      progress: 30
    }
  ];

  const dataSourceIntegrations = [
    {
      name: 'Tally ERP',
      category: 'Accounting',
      icon: DollarSign,
      status: 'connected',
      description: 'GST returns, financial data, and tax compliance analysis',
      lastSync: '2 hours ago',
      records: '45,230',
      riskInsights: ['GST filing delays detected', 'TDS calculation discrepancies'],
      features: ['Auto GST filing', 'Real-time tax monitoring', 'Financial risk analysis']
    },
    {
      name: 'SAP SuccessFactors',
      category: 'HR Management',
      icon: Users,
      status: 'connected',
      description: 'Employee data, payroll, and labor law compliance monitoring',
      lastSync: '1 hour ago',
      records: '1,245',
      riskInsights: ['Overtime policy violations in Engineering', 'Missing PF contributions'],
      features: ['Labor law compliance', 'Payroll risk analysis', 'Employee policy monitoring']
    },
    {
      name: 'MCA API',
      category: 'Company Filings',
      icon: FileText,
      status: 'pending',
      description: 'Company registration data and ROC filing status',
      lastSync: 'Not connected',
      records: '0',
      riskInsights: [],
      features: ['ROC filing tracking', 'Company law compliance', 'Annual return monitoring']
    },
    {
      name: 'GSTN Portal',
      category: 'Tax Compliance',
      icon: Database,
      status: 'connected',
      description: 'Direct GST portal integration for real-time compliance',
      lastSync: '30 minutes ago',
      records: '8,456',
      riskInsights: ['Input tax credit mismatch detected', 'Late filing risk identified'],
      features: ['Real-time GST monitoring', 'Auto-sync returns', 'Compliance alerts']
    },
    {
      name: 'Zoho Books',
      category: 'Accounting',
      icon: DollarSign,
      status: 'available',
      description: 'Cloud accounting software integration',
      lastSync: 'Not connected',
      records: '0',
      riskInsights: [],
      features: ['Financial risk assessment', 'Tax compliance tracking', 'Audit trail analysis']
    },
    {
      name: 'Workday HCM',
      category: 'HR Management',
      icon: Users,
      status: 'available',
      description: 'Human capital management and workforce analytics',
      lastSync: 'Not connected',
      records: '0',
      riskInsights: [],
      features: ['HR compliance monitoring', 'Policy violation detection', 'Employee risk analysis']
    }
  ];

  const getConnectionStatus = (status: string): { color: string; icon: any; badge: "default" | "secondary" | "outline" | "destructive" } => {
    switch (status) {
      case 'connected':
        return { color: 'text-success', icon: CheckCircle, badge: 'default' };
      case 'pending':
        return { color: 'text-warning', icon: Clock, badge: 'secondary' };
      case 'available':
        return { color: 'text-muted-foreground', icon: XCircle, badge: 'outline' };
      default:
        return { color: 'text-muted-foreground', icon: XCircle, badge: 'outline' };
    }
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBadgeVariant = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'in_progress': return 'text-primary';
      case 'pending': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'in_progress': return 'outline';
      case 'pending': return 'secondary';
      default: return 'outline';
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
              <BarChart3 className="mr-3 h-8 w-8 text-primary" />
              Risk Analytics
            </h1>
            <p className="text-muted-foreground">Advanced risk assessment and predictive compliance analytics</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
            <Button variant="hero">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Risk Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {riskMetrics.map((metric, index) => (
            <Card key={index} className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">{metric.title}</h3>
                  <div className={`flex items-center ${metric.trend === 'up' ? 'text-destructive' : 'text-success'}`}>
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="text-sm ml-1">{metric.change}</span>
                  </div>
                </div>
                <div className="flex items-baseline space-x-1 mb-1">
                  <span className={`text-3xl font-bold ${metric.color}`}>{metric.value}</span>
                  <span className="text-sm text-muted-foreground">{metric.unit}</span>
                </div>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Risk Overview</TabsTrigger>
            <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
            <TabsTrigger value="data-sources">Data Sources</TabsTrigger>
            <TabsTrigger value="mitigation">Mitigation Actions</TabsTrigger>
            <TabsTrigger value="trends">Historical Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {riskCategories.map((risk, index) => (
                <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-semibold">{risk.category}</h3>
                          <Badge variant={getRiskBadgeVariant(risk.riskLevel)}>
                            {risk.riskLevel} Risk
                          </Badge>
                          <Badge variant="outline">{risk.impact}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <span className="text-sm font-medium text-muted-foreground">Risk Score</span>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`text-2xl font-bold ${getRiskColor(risk.riskLevel)}`}>
                                {risk.score}
                              </span>
                              <span className="text-sm text-muted-foreground">/100</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-muted-foreground">Probability</span>
                            <div className="mt-1">
                              <span className="text-2xl font-bold text-primary">{risk.probability}%</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-muted-foreground">Risk Level</span>
                            <div className="mt-2">
                              <Progress value={risk.score} className="h-2" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold flex items-center">
                            <AlertTriangle className="mr-2 h-4 w-4 text-warning" />
                            Identified Issues
                          </h4>
                          <div className="space-y-2">
                            {risk.issues.map((issue, issueIndex) => (
                              <div key={issueIndex} className="flex items-start space-x-2 text-sm">
                                <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                                <span>{issue}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                            <p className="text-sm">
                              <span className="font-medium text-accent">Mitigation Strategy:</span> {risk.mitigation}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-6">
                        <Button variant="professional" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Target className="mr-2 h-4 w-4" />
                          Mitigate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="predictive" className="space-y-6">
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
                {predictiveInsights.map((insight, index) => (
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
          </TabsContent>

          <TabsContent value="data-sources" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-5 w-5 text-primary" />
                  Business Data Source Integrations
                </CardTitle>
                <CardDescription>
                  Connect your business systems to enable AI-powered compliance risk analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {dataSourceIntegrations.map((integration, index) => {
                    const statusInfo = getConnectionStatus(integration.status);
                    const StatusIcon = statusInfo.icon;
                    const IntegrationIcon = integration.icon;
                    
                    return (
                      <Card key={index} className="border border-border hover:shadow-elegant transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start space-x-4 flex-1">
                              <div className="p-3 bg-primary/10 rounded-lg">
                                <IntegrationIcon className="h-6 w-6 text-primary" />
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="text-lg font-semibold">{integration.name}</h3>
                                  <Badge variant="outline">{integration.category}</Badge>
                                  <Badge variant={statusInfo.badge}>
                                    {integration.status.replace('_', ' ').toUpperCase()}
                                  </Badge>
                                </div>
                                
                                <p className="text-muted-foreground mb-3">{integration.description}</p>
                                
                                {integration.status === 'connected' && (
                                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                                    <div>
                                      <span className="font-medium text-muted-foreground">Last Sync:</span>
                                      <span className="ml-2 text-success">{integration.lastSync}</span>
                                    </div>
                                    <div>
                                      <span className="font-medium text-muted-foreground">Records:</span>
                                      <span className="ml-2 font-bold text-primary">{integration.records}</span>
                                    </div>
                                  </div>
                                )}
                                
                                <div className="space-y-3">
                                  <div>
                                    <h4 className="font-medium text-sm mb-2">Features:</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {integration.features.map((feature, featureIndex) => (
                                        <Badge key={featureIndex} variant="secondary" className="text-xs">
                                          {feature}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  {integration.riskInsights.length > 0 && (
                                    <div>
                                      <h4 className="font-medium text-sm mb-2 flex items-center">
                                        <Zap className="mr-1 h-3 w-3 text-warning" />
                                        AI Risk Insights:
                                      </h4>
                                      <div className="space-y-1">
                                        {integration.riskInsights.map((insight, insightIndex) => (
                                          <div key={insightIndex} className="flex items-start space-x-2 text-sm">
                                            <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                                            <span className="text-muted-foreground">{insight}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col space-y-2 ml-6">
                              <div className="flex items-center space-x-2">
                                <StatusIcon className={`h-5 w-5 ${statusInfo.color}`} />
                                <span className={`text-sm font-medium ${statusInfo.color}`}>
                                  {integration.status === 'connected' ? 'Connected' : 
                                   integration.status === 'pending' ? 'Pending' : 'Available'}
                                </span>
                              </div>
                              
                              {integration.status === 'connected' ? (
                                <div className="space-y-2">
                                  <Button variant="outline" size="sm">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Configure
                                  </Button>
                                  <Button variant="professional" size="sm">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Sync Now
                                  </Button>
                                </div>
                              ) : integration.status === 'pending' ? (
                                <Button variant="outline" size="sm">
                                  <Clock className="mr-2 h-4 w-4" />
                                  Complete Setup
                                </Button>
                              ) : (
                                <Button variant="hero" size="sm">
                                  <Link className="mr-2 h-4 w-4" />
                                  Connect
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                
                <Card className="border-2 border-dashed border-border">
                  <CardContent className="p-6 text-center">
                    <Plus className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Add Custom Integration</h3>
                    <p className="text-muted-foreground mb-4">
                      Connect your custom business systems via API or file upload
                    </p>
                    <Button variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Integration
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mitigation" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-primary" />
                  Risk Mitigation Actions
                </CardTitle>
                <CardDescription>Track and manage risk mitigation initiatives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mitigationActions.map((action, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold">{action.title}</h3>
                        <Badge variant={getStatusBadge(action.status)}>
                          {action.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <Badge variant={getPriorityColor(action.priority)}>
                          {action.priority.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                        <div>
                          <span className="font-medium">Deadline:</span> {action.deadline}
                        </div>
                        <div>
                          <span className="font-medium">Assignee:</span> {action.assignee}
                        </div>
                      </div>

                      {action.status !== 'completed' && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{action.progress}%</span>
                          </div>
                          <Progress value={action.progress} className="h-2" />
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2 ml-6">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="professional" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Risk Trend Analysis
                </CardTitle>
                <CardDescription>Historical risk patterns and trend analysis</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg mb-2">Risk Trend Charts</p>
                  <p>Interactive charts and trend analysis coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RiskAnalytics;