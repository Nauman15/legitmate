import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  Shield, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Plus,
  Search,
  Filter,
  Settings,
  Upload,
  Download,
  Eye
} from 'lucide-react';

const PolicyCompliance = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const policyCategories = [
    {
      name: 'HR & Employment',
      count: 12,
      compliance: 85,
      color: 'text-primary',
      icon: Users
    },
    {
      name: 'Data Protection',
      count: 8,
      compliance: 92,
      color: 'text-success',
      icon: Shield
    },
    {
      name: 'Financial Policies',
      count: 15,
      compliance: 78,
      color: 'text-warning',
      icon: FileText
    },
    {
      name: 'Safety & Security',
      count: 6,
      compliance: 95,
      color: 'text-accent',
      icon: Shield
    }
  ];

  const policies = [
    {
      id: 1,
      name: 'Employee Code of Conduct',
      category: 'HR & Employment',
      version: '2.1',
      lastUpdated: '2024-03-15',
      status: 'active',
      compliance: 88,
      acknowledgments: 45,
      totalEmployees: 50,
      nextReview: '2024-09-15',
      owner: 'HR Department'
    },
    {
      id: 2,
      name: 'Data Privacy Policy',
      category: 'Data Protection',
      version: '1.3',
      lastUpdated: '2024-02-20',
      status: 'active',
      compliance: 95,
      acknowledgments: 48,
      totalEmployees: 50,
      nextReview: '2024-08-20',
      owner: 'IT Department'
    },
    {
      id: 3,
      name: 'Sexual Harassment Policy (POSH)',
      category: 'HR & Employment',
      version: '1.0',
      lastUpdated: '2024-01-10',
      status: 'active',
      compliance: 92,
      acknowledgments: 46,
      totalEmployees: 50,
      nextReview: '2025-01-10',
      owner: 'Legal Team'
    },
    {
      id: 4,
      name: 'Expense Reimbursement Policy',
      category: 'Financial Policies',
      version: '2.0',
      lastUpdated: '2024-03-01',
      status: 'draft',
      compliance: 0,
      acknowledgments: 0,
      totalEmployees: 50,
      nextReview: '2024-12-01',
      owner: 'Finance Team'
    },
    {
      id: 5,
      name: 'Remote Work Policy',
      category: 'HR & Employment',
      version: '1.2',
      lastUpdated: '2024-02-28',
      status: 'active',
      compliance: 76,
      acknowledgments: 38,
      totalEmployees: 50,
      nextReview: '2024-11-28',
      owner: 'HR Department'
    }
  ];

  const complianceReports = [
    {
      policy: 'Employee Code of Conduct',
      department: 'Engineering',
      compliance: 95,
      issues: 1,
      lastAudit: '2024-03-10'
    },
    {
      policy: 'Data Privacy Policy',
      department: 'Sales',
      compliance: 88,
      issues: 2,
      lastAudit: '2024-03-08'
    },
    {
      policy: 'Remote Work Policy',
      department: 'HR',
      compliance: 100,
      issues: 0,
      lastAudit: '2024-03-05'
    },
    {
      policy: 'POSH Policy',
      department: 'All Departments',
      compliance: 92,
      issues: 1,
      lastAudit: '2024-03-01'
    }
  ];

  const recentActivity = [
    {
      action: 'Policy Acknowledgment',
      description: 'John Doe acknowledged Data Privacy Policy v1.3',
      timestamp: '2 hours ago',
      type: 'acknowledgment'
    },
    {
      action: 'Policy Updated',
      description: 'Employee Code of Conduct updated to version 2.1',
      timestamp: '1 day ago',
      type: 'update'
    },
    {
      action: 'Compliance Issue',
      description: 'Remote work policy violation reported in Sales dept',
      timestamp: '2 days ago',
      type: 'issue'
    },
    {
      action: 'Training Completed',
      description: '15 employees completed POSH training',
      timestamp: '3 days ago',
      type: 'training'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'draft': return 'text-warning';
      case 'expired': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'draft': return 'secondary';
      case 'expired': return 'destructive';
      default: return 'outline';
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 90) return 'text-success';
    if (compliance >= 75) return 'text-warning';
    return 'text-destructive';
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'acknowledgment': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'update': return <FileText className="h-4 w-4 text-primary" />;
      case 'issue': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'training': return <Users className="h-4 w-4 text-accent" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <Users className="mr-3 h-8 w-8 text-primary" />
              Policy Compliance
            </h1>
            <p className="text-muted-foreground">Manage internal policies and ensure organization-wide compliance</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import Policy
            </Button>
            <Button variant="hero">
              <Plus className="mr-2 h-4 w-4" />
              Create Policy
            </Button>
          </div>
        </div>

        {/* Category Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {policyCategories.map((category, index) => (
            <Card key={index} className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <category.icon className={`h-8 w-8 ${category.color}`} />
                  <Badge variant="outline">{category.count} policies</Badge>
                </div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Compliance</span>
                    <span className={`font-medium ${getComplianceColor(category.compliance)}`}>
                      {category.compliance}%
                    </span>
                  </div>
                  <Progress value={category.compliance} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="policies" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="policies" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Policy Management</CardTitle>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search policies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {policies.map((policy) => (
                  <Card key={policy.id} className="border border-border hover:shadow-card transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold">{policy.name}</h3>
                            <Badge variant={getStatusBadge(policy.status)}>
                              {policy.status.toUpperCase()}
                            </Badge>
                            <Badge variant="outline">v{policy.version}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{policy.category} • Owner: {policy.owner}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-muted-foreground">Last Updated:</span>
                              <p className="font-semibold">{policy.lastUpdated}</p>
                            </div>
                            <div>
                              <span className="font-medium text-muted-foreground">Next Review:</span>
                              <p className="font-semibold">{policy.nextReview}</p>
                            </div>
                            <div>
                              <span className="font-medium text-muted-foreground">Acknowledgments:</span>
                              <p className="font-semibold">{policy.acknowledgments}/{policy.totalEmployees}</p>
                            </div>
                            <div>
                              <span className="font-medium text-muted-foreground">Compliance:</span>
                              <p className={`font-semibold ${getComplianceColor(policy.compliance)}`}>
                                {policy.compliance}%
                              </p>
                            </div>
                          </div>

                          {policy.status === 'active' && (
                            <div className="mt-4 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Employee Acknowledgment Progress</span>
                                <span className="font-medium">{policy.acknowledgments}/{policy.totalEmployees}</span>
                              </div>
                              <Progress value={(policy.acknowledgments / policy.totalEmployees) * 100} className="h-2" />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col space-y-2 ml-6">
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <Button variant="professional" size="sm">
                            <Settings className="mr-2 h-4 w-4" />
                            Manage
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Department Compliance Overview</CardTitle>
                    <CardDescription>Policy compliance status by department</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {complianceReports.map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div>
                          <h3 className="font-semibold">{report.policy}</h3>
                          <p className="text-sm text-muted-foreground">
                            {report.department} • Last audit: {report.lastAudit}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className={`text-lg font-bold ${getComplianceColor(report.compliance)}`}>
                              {report.compliance}%
                            </div>
                            <div className="text-xs text-muted-foreground">Compliance</div>
                          </div>
                          <div className="text-center">
                            <div className={`text-lg font-bold ${report.issues > 0 ? 'text-destructive' : 'text-success'}`}>
                              {report.issues}
                            </div>
                            <div className="text-xs text-muted-foreground">Issues</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-primary" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Policy Training Management</CardTitle>
                <CardDescription>Track employee training and certification status</CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Users className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg mb-2">Training Management</p>
                  <p>Employee training tracking coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Compliance Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Overall Compliance Score</span>
                    <span className="text-2xl font-bold text-success">87%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active Policies</span>
                    <span className="text-xl font-semibold">38</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pending Acknowledgments</span>
                    <span className="text-xl font-semibold text-warning">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Policy Violations</span>
                    <span className="text-xl font-semibold text-destructive">3</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="professional" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Generate Compliance Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Export Policy List
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Training Status Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Violation Summary
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PolicyCompliance;