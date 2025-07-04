import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
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
  Eye,
  FileCheck,
  Loader2,
  AlertCircle,
  TrendingUp,
  Calendar,
  History
} from 'lucide-react';

const PolicyCompliance = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

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
    }
  ];

  const auditTrail = [
    {
      id: 1,
      document: 'Employee Handbook v2.1',
      action: 'Compliance Analysis Completed',
      analyst: 'AI System',
      timestamp: '2024-03-15 14:30:00',
      result: 'Passed',
      issues: 2,
      score: 87,
      details: 'Minor gaps identified in POSH policy section'
    },
    {
      id: 2,
      document: 'Remote Work Policy v1.2',
      action: 'Gap Analysis',
      analyst: 'Legal Team',
      timestamp: '2024-03-10 11:15:00',
      result: 'Review Required',
      issues: 4,
      score: 72,
      details: 'Data security requirements need updates'
    },
    {
      id: 3,
      document: 'Code of Conduct v3.0',
      action: 'Initial Upload & Analysis',
      analyst: 'AI System',
      timestamp: '2024-03-08 09:45:00',
      result: 'Passed',
      issues: 1,
      score: 92,
      details: 'Fully compliant with Indian labor laws'
    },
    {
      id: 4,
      document: 'Data Protection Manual',
      action: 'Regulatory Compliance Check',
      analyst: 'Compliance Officer',
      timestamp: '2024-03-05 16:20:00',
      result: 'Failed',
      issues: 8,
      score: 45,
      details: 'Major gaps in DPDP Act 2023 compliance'
    }
  ];

  const complianceGaps = [
    {
      type: 'Critical',
      title: 'POSH Policy Missing Mandatory Clauses',
      description: 'Sexual harassment policy lacks mandatory complaint committee structure as per POSH Act 2013',
      regulation: 'POSH Act 2013, Section 4',
      recommendation: 'Add detailed committee structure, complaint procedure, and timeline requirements',
      priority: 'high'
    },
    {
      type: 'High',
      title: 'Data Protection Officer Not Defined',
      description: 'Employee handbook missing DPO designation and responsibilities per DPDP Act 2023',
      regulation: 'DPDP Act 2023, Section 10',
      recommendation: 'Define DPO role, responsibilities, and contact information',
      priority: 'high'
    },
    {
      type: 'Medium',
      title: 'Incomplete Grievance Redressal Mechanism',
      description: 'Current policy lacks clear escalation matrix and timeline for grievance resolution',
      regulation: 'Industrial Relations Code 2020',
      recommendation: 'Add 3-tier grievance mechanism with defined timelines',
      priority: 'medium'
    }
  ];

  const summaryReport = {
    overallScore: 78,
    totalDocuments: 12,
    analyzedDocuments: 8,
    criticalIssues: 3,
    highIssues: 7,
    mediumIssues: 12,
    lowIssues: 8,
    lastAnalysis: '2024-03-15',
    complianceRate: 85,
    recommendations: [
      'Immediate update required for POSH policy compliance',
      'Data protection policies need DPDP Act 2023 alignment', 
      'Grievance procedures require standardization',
      'Regular quarterly compliance reviews recommended'
    ]
  };

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
    }
  ];

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024; // 10MB limit
    });

    if (validFiles.length !== files.length) {
      toast({
        title: "Some files were skipped",
        description: "Only PDF, DOC, and DOCX files under 10MB are supported.",
        variant: "destructive"
      });
    }

    setUploadedDocuments(prev => [...prev, ...validFiles]);
    toast({
      title: "Documents Uploaded",
      description: `${validFiles.length} document(s) uploaded successfully.`,
    });
  };

  const removeDocument = (index: number) => {
    setUploadedDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const analyzeDocument = async (documentName: string) => {
    setIsAnalyzing(true);
    setSelectedDocument(documentName);
    
    toast({
      title: "Analysis Started",
      description: "AI is scanning your document for compliance gaps...",
    });

    // Simulate AI analysis
    try {
      await new Promise(resolve => setTimeout(resolve, 4000));
      setAnalysisComplete(true);
      toast({
        title: "Analysis Complete",
        description: "Compliance gap analysis finished. Check the results below.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your document. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateSummaryReport = () => {
    toast({
      title: "Report Generated",
      description: "Compliance summary report has been generated and is ready for download.",
    });
  };

  const exportAuditTrail = () => {
    toast({
      title: "Export Started",
      description: "Audit trail data is being prepared for download...",
    });
  };

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

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="reports">Summary Reports</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Document Upload Section */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="mr-2 h-5 w-5 text-primary" />
                    Upload Policy Documents
                  </CardTitle>
                  <CardDescription>
                    Upload internal policies, employee handbooks, or compliance documents for AI analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drop your policy documents here or click to upload
                    </p>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={handleDocumentUpload}
                      className="hidden"
                      id="policy-upload"
                    />
                    <Label htmlFor="policy-upload">
                      <Button variant="outline" className="cursor-pointer">
                        Choose Files
                      </Button>
                    </Label>
                    <div className="text-xs text-muted-foreground mt-2">
                      Supported formats: PDF, DOC, DOCX (Max 10MB each)
                    </div>
                  </div>

                  {uploadedDocuments.length > 0 && (
                    <div className="space-y-2">
                      <Label>Uploaded Documents:</Label>
                      {uploadedDocuments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded border">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <div>
                              <span className="text-sm font-medium">{file.name}</span>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="professional" 
                              size="sm"
                              onClick={() => analyzeDocument(file.name)}
                              disabled={isAnalyzing}
                            >
                              {isAnalyzing && selectedDocument === file.name ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Analyzing...
                                </>
                              ) : (
                                <>
                                  <FileCheck className="mr-2 h-4 w-4" />
                                  Analyze
                                </>
                              )}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeDocument(index)}
                            >
                              ×
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {isAnalyzing && (
                    <Alert>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <AlertDescription>
                        AI is analyzing your document for compliance gaps against Indian labor laws, data protection regulations, and industry standards. This may take a few moments...
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Compliance Gap Analysis Results */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="mr-2 h-5 w-5 text-destructive" />
                    Compliance Gap Analysis
                  </CardTitle>
                  <CardDescription>
                    AI-powered compliance checking against Indian regulations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {analysisComplete || selectedDocument ? (
                    <div className="space-y-6">
                      {/* Overall Score */}
                      <div className="text-center space-y-2">
                        <div className="text-3xl font-bold text-foreground">
                          <span className={getComplianceColor(summaryReport.overallScore)}>
                            {summaryReport.overallScore}%
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Compliance Score</p>
                        <Progress value={summaryReport.overallScore} className="h-2" />
                      </div>

                      {/* Issues Summary */}
                      {complianceGaps.map((gap, index) => (
                        <div key={index} className="p-4 bg-muted/30 rounded-lg space-y-3 border-l-4 border-l-destructive">
                          <div className="flex items-center justify-between">
                            <Badge variant={gap.priority === 'high' ? 'destructive' : gap.priority === 'medium' ? 'secondary' : 'outline'}>
                              {gap.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">{gap.priority.toUpperCase()}</Badge>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-destructive">{gap.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{gap.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              <strong>Regulation:</strong> {gap.regulation}
                            </p>
                          </div>
                          <div className="bg-success/5 p-3 rounded border border-success/20">
                            <p className="text-xs text-success mb-1"><strong>Recommendation:</strong></p>
                            <p className="text-sm">{gap.recommendation}</p>
                          </div>
                        </div>
                      ))}

                      <div className="flex space-x-2">
                        <Button variant="professional" onClick={generateSummaryReport}>
                          <Download className="mr-2 h-4 w-4" />
                          Generate Report
                        </Button>
                        <Button variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileCheck className="h-12 w-12 mx-auto mb-4" />
                      <p>Upload and analyze a document to see compliance gaps</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

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

          <TabsContent value="reports" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Compliance Summary Report
                </CardTitle>
                <CardDescription>
                  Comprehensive overview of policy compliance status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-primary">{summaryReport.overallScore}%</div>
                    <div className="text-sm text-muted-foreground">Overall Score</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-success">{summaryReport.complianceRate}%</div>
                    <div className="text-sm text-muted-foreground">Compliance Rate</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-warning">{summaryReport.criticalIssues}</div>
                    <div className="text-sm text-muted-foreground">Critical Issues</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-accent">{summaryReport.analyzedDocuments}/{summaryReport.totalDocuments}</div>
                    <div className="text-sm text-muted-foreground">Documents Analyzed</div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Key Recommendations</h3>
                  <div className="space-y-2">
                    {summaryReport.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="professional" onClick={generateSummaryReport}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Full Report
                  </Button>
                  <Button variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <History className="mr-2 h-5 w-5 text-primary" />
                    Audit Trail
                  </div>
                  <Button variant="outline" onClick={exportAuditTrail}>
                    <Download className="mr-2 h-4 w-4" />
                    Export Trail
                  </Button>
                </CardTitle>
                <CardDescription>
                  Complete history of all compliance checks and document analyses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {auditTrail.map((entry) => (
                  <Card key={entry.id} className="border border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold">{entry.document}</h3>
                            <Badge variant={entry.result === 'Passed' ? 'default' : entry.result === 'Failed' ? 'destructive' : 'secondary'}>
                              {entry.result}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Score: {entry.score}%
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-muted-foreground">Action:</span>
                              <p className="font-semibold">{entry.action}</p>
                            </div>
                            <div>
                              <span className="font-medium text-muted-foreground">Analyst:</span>
                              <p className="font-semibold">{entry.analyst}</p>
                            </div>
                            <div>
                              <span className="font-medium text-muted-foreground">Timestamp:</span>
                              <p className="font-semibold">{entry.timestamp}</p>
                            </div>
                            <div>
                              <span className="font-medium text-muted-foreground">Issues Found:</span>
                              <p className={`font-semibold ${entry.issues > 0 ? 'text-destructive' : 'text-success'}`}>
                                {entry.issues}
                              </p>
                            </div>
                          </div>

                          <div className="p-3 bg-muted/30 rounded border">
                            <p className="text-sm"><strong>Details:</strong> {entry.details}</p>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View
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
        </Tabs>
      </div>
    </div>
  );
};

export default PolicyCompliance;