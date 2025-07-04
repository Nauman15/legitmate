import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Upload, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Download,
  Star,
  Search,
  Filter
} from 'lucide-react';

const ContractReview = () => {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const contractAnalysis = {
    riskScore: 75,
    keyIssues: [
      {
        type: 'High Risk',
        issue: 'Indemnity clause heavily favors counterparty',
        section: 'Section 8.2',
        recommendation: 'Negotiate mutual indemnification',
        severity: 'high'
      },
      {
        type: 'Medium Risk',
        issue: 'Termination notice period is only 30 days',
        section: 'Section 12.1',
        recommendation: 'Request 60-90 day notice period',
        severity: 'medium'
      },
      {
        type: 'Low Risk',
        issue: 'Governing law not specified',
        section: 'Section 15',
        recommendation: 'Add Indian law as governing law',
        severity: 'low'
      }
    ],
    aiInsights: [
      'Contract structure follows standard commercial agreement format',
      'Payment terms are favorable with 30-day payment cycle',
      'Intellectual property clauses need clarification',
      'Force majeure clause is well-defined'
    ]
  };

  const recentContracts = [
    {
      name: 'Vendor Supply Agreement.pdf',
      status: 'Reviewed',
      riskScore: 85,
      date: '2024-03-15',
      type: 'Supply Agreement'
    },
    {
      name: 'Employment Contract.pdf',
      status: 'Under Review',
      riskScore: 65,
      date: '2024-03-14',
      type: 'Employment'
    },
    {
      name: 'NDA Template.pdf',
      status: 'Approved',
      riskScore: 95,
      date: '2024-03-12',
      type: 'NDA'
    },
    {
      name: 'Service Agreement.pdf',
      status: 'Needs Attention',
      riskScore: 45,
      date: '2024-03-10',
      type: 'Service Agreement'
    }
  ];

  const contractTemplates = [
    {
      name: 'Non-Disclosure Agreement (NDA)',
      description: 'Standard NDA template for Indian businesses',
      category: 'Legal',
      rating: 4.8
    },
    {
      name: 'Employment Contract',
      description: 'Comprehensive employment agreement template',
      category: 'HR',
      rating: 4.9
    },
    {
      name: 'Vendor Agreement',
      description: 'Standard vendor/supplier agreement template',
      category: 'Procurement',
      rating: 4.7
    },
    {
      name: 'Service Agreement',
      description: 'Professional service agreement template',
      category: 'Service',
      rating: 4.6
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getRiskBadgeVariant = (severity: string) => {
    switch (severity) {
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
              <FileText className="mr-3 h-8 w-8 text-primary" />
              Contract Review
            </h1>
            <p className="text-muted-foreground">AI-powered contract analysis and management</p>
          </div>
          <Button variant="hero">
            <Upload className="mr-2 h-4 w-4" />
            Upload Contract
          </Button>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload">Upload & Review</TabsTrigger>
            <TabsTrigger value="contracts">My Contracts</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Upload Contract for Review</CardTitle>
                  <CardDescription>
                    Upload your contract document for AI-powered analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drop your contract here or click to upload
                    </p>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="contract-upload"
                    />
                    <Label htmlFor="contract-upload">
                      <Button variant="outline" className="cursor-pointer">
                        Choose File
                      </Button>
                    </Label>
                    <div className="text-xs text-muted-foreground mt-2">
                      Supported formats: PDF, DOC, DOCX (Max 10MB)
                    </div>
                  </div>

                  {uploadedFile && (
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="text-sm font-medium">{uploadedFile}</span>
                        </div>
                        <Button variant="professional" size="sm">
                          Analyze Contract
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Analysis Results */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    AI Analysis Results
                    <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                      AI Powered
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Comprehensive contract risk assessment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Risk Score */}
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-foreground">
                      <span className={getRiskColor(contractAnalysis.riskScore)}>
                        {contractAnalysis.riskScore}%
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Overall Risk Score</p>
                    <Progress value={contractAnalysis.riskScore} className="h-2" />
                  </div>

                  {/* Key Issues */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center">
                      <AlertTriangle className="mr-2 h-4 w-4 text-warning" />
                      Key Issues Found
                    </h4>
                    {contractAnalysis.keyIssues.map((issue, index) => (
                      <div key={index} className="p-3 bg-muted/30 rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant={getRiskBadgeVariant(issue.severity)}>
                            {issue.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{issue.section}</span>
                        </div>
                        <p className="text-sm font-medium">{issue.issue}</p>
                        <p className="text-xs text-muted-foreground">{issue.recommendation}</p>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    View Detailed Analysis
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* AI Insights */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2 h-5 w-5 text-accent" />
                  AI Insights & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contractAnalysis.aiInsights.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Contracts</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {recentContracts.map((contract, index) => (
                <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-semibold">{contract.name}</h3>
                          <p className="text-sm text-muted-foreground">{contract.type} • {contract.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className={`text-lg font-bold ${getRiskColor(contract.riskScore)}`}>
                            {contract.riskScore}%
                          </div>
                          <div className="text-xs text-muted-foreground">Risk Score</div>
                        </div>
                        
                        <Badge 
                          variant={
                            contract.status === 'Approved' ? 'default' :
                            contract.status === 'Needs Attention' ? 'destructive' :
                            contract.status === 'Under Review' ? 'secondary' : 'outline'
                          }
                        >
                          {contract.status}
                        </Badge>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Contract Templates</h2>
              <Button variant="hero">
                <Upload className="mr-2 h-4 w-4" />
                Upload Template
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contractTemplates.map((template, index) => (
                <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <FileText className="h-8 w-8 text-primary" />
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-accent fill-current" />
                        <span className="text-sm font-medium">{template.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Badge variant="outline">{template.category}</Badge>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button variant="professional" size="sm" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Contract Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary">47</div>
                  <div className="text-sm text-muted-foreground">Total Contracts</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-success">82%</div>
                  <div className="text-sm text-muted-foreground">Avg Risk Score</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-warning">12</div>
                  <div className="text-sm text-muted-foreground">Pending Review</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-accent">₹2.5L</div>
                  <div className="text-sm text-muted-foreground">Cost Savings</div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Contract Review Trends</CardTitle>
                <CardDescription>Monthly contract review activity and risk assessment</CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Clock className="h-12 w-12 mx-auto mb-4" />
                  <p>Analytics dashboard coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContractReview;