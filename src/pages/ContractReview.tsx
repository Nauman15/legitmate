import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
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
  Filter,
  FileCheck,
  Edit,
  Loader2,
  AlertCircle
} from 'lucide-react';

const ContractReview = () => {
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const contractAnalysis = {
    riskScore: 75,
    complianceIssues: [
      {
        type: 'Non-Compliance',
        issue: 'Indemnity clause does not comply with Indian Contract Act Section 124',
        section: 'Section 8.2',
        recommendation: 'Revise indemnity clause to align with Indian Contract Act provisions. Mutual indemnification recommended.',
        suggestedEdit: 'Each party shall indemnify the other against losses arising from their own negligent acts or omissions, subject to limitations under the Indian Contract Act, 1872.',
        severity: 'high',
        regulation: 'Indian Contract Act, 1872'
      },
      {
        type: 'Regulatory Risk',
        issue: 'Termination clause may violate Industrial Disputes Act requirements',
        section: 'Section 12.1',
        recommendation: 'Extend notice period to comply with Indian labor law requirements (minimum 60 days for commercial agreements).',
        suggestedEdit: 'Either party may terminate this agreement by providing ninety (90) days written notice, in accordance with Indian Commercial Law.',
        severity: 'medium',
        regulation: 'Industrial Disputes Act, 1947'
      },
      {
        type: 'Compliance Gap',
        issue: 'Governing law clause absent - violates Indian Arbitration Act requirements',
        section: 'Section 15',
        recommendation: 'Add Indian governing law and dispute resolution clause as per Arbitration and Conciliation Act.',
        suggestedEdit: 'This Agreement shall be governed by and construed in accordance with the laws of India. Any disputes shall be resolved through arbitration in accordance with the Arbitration and Conciliation Act, 2015.',
        severity: 'high',
        regulation: 'Arbitration and Conciliation Act, 2015'
      },
      {
        type: 'Tax Compliance',
        issue: 'GST implications not addressed in payment terms',
        section: 'Section 5.3',
        recommendation: 'Include GST compliance clause to avoid tax penalties.',
        suggestedEdit: 'All payments under this Agreement shall be inclusive of applicable GST as per the Goods and Services Tax Act, 2017.',
        severity: 'medium',
        regulation: 'GST Act, 2017'
      }
    ],
    complianceScore: 68,
    aiInsights: [
      'Contract requires significant amendments to ensure Indian law compliance',
      'Payment terms need GST compliance integration',
      'Arbitration clause should reference Indian Arbitration Act 2015',
      'Employment-related clauses must align with Indian Labor Code 2020'
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
      processFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const processFile = (file: File) => {
    // Validate file type and size
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF, DOC, or DOCX file.",
        variant: "destructive"
      });
      return;
    }

    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }

    setUploadedFile(file);
    setAnalysisComplete(false);
    toast({
      title: "File Uploaded Successfully",
      description: `${file.name} is ready for analysis.`,
    });
  };

  const analyzeContract = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    toast({
      title: "Analysis Started",
      description: "AI is scanning your contract for compliance issues...",
    });

    // Simulate AI analysis - replace with actual API call
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setAnalysisComplete(true);
      toast({
        title: "Analysis Complete",
        description: "Contract analysis finished. Review the results below.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your contract. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const downloadRevisedContract = () => {
    toast({
      title: "Download Started",
      description: "Your revised contract with suggested edits is being prepared...",
    });
    // Implement actual download functionality
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
          <Button 
            variant="hero"
            onClick={() => {
              document.getElementById('contract-upload')?.click();
              toast({ title: "File Upload", description: "Select a contract document to upload and analyze." });
            }}
          >
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
                  <div 
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                      dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    <Upload className={`h-12 w-12 mx-auto mb-4 ${dragOver ? 'text-primary' : 'text-muted-foreground'}`} />
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
                    <div className="space-y-4">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-primary" />
                            <div>
                              <span className="text-sm font-medium">{uploadedFile.name}</span>
                              <p className="text-xs text-muted-foreground">
                                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button 
                            variant="professional" 
                            size="sm" 
                            onClick={analyzeContract}
                            disabled={isAnalyzing}
                          >
                            {isAnalyzing ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing...
                              </>
                            ) : (
                              <>
                                <FileCheck className="mr-2 h-4 w-4" />
                                Analyze Contract
                              </>
                            )}
                          </Button>
                        </div>
                      </div>

                      {isAnalyzing && (
                        <Alert>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <AlertDescription>
                            AI is scanning your contract for Indian regulatory compliance issues. This may take a few moments...
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Analysis Results */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Indian Compliance Analysis
                    <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                      AI Powered
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Comprehensive regulatory compliance assessment for Indian law
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {analysisComplete || uploadedFile ? (
                    <>
                      {/* Compliance Score */}
                      <div className="text-center space-y-2">
                        <div className="text-3xl font-bold text-foreground">
                          <span className={getRiskColor(contractAnalysis.complianceScore)}>
                            {contractAnalysis.complianceScore}%
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Indian Law Compliance Score</p>
                        <Progress value={contractAnalysis.complianceScore} className="h-2" />
                      </div>

                      {/* Compliance Issues */}
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center">
                          <AlertCircle className="mr-2 h-4 w-4 text-destructive" />
                          Compliance Issues Found
                        </h4>
                        {contractAnalysis.complianceIssues.map((issue, index) => (
                          <div key={index} className="p-4 bg-muted/30 rounded-lg space-y-3 border-l-4 border-l-destructive">
                            <div className="flex items-center justify-between">
                              <Badge variant={getRiskBadgeVariant(issue.severity)}>
                                {issue.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{issue.section}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-destructive">{issue.issue}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                <strong>Regulation:</strong> {issue.regulation}
                              </p>
                            </div>
                            <div className="bg-background p-3 rounded border">
                              <p className="text-xs text-muted-foreground mb-1"><strong>Recommendation:</strong></p>
                              <p className="text-sm">{issue.recommendation}</p>
                            </div>
                            <div className="bg-success/5 p-3 rounded border border-success/20">
                              <p className="text-xs text-success mb-1"><strong>Suggested Edit:</strong></p>
                              <p className="text-sm">{issue.suggestedEdit}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => toast({ title: "Full Report", description: "Detailed compliance report will be generated." })}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Full Report
                        </Button>
                        <Button 
                          variant="professional" 
                          className="flex-1" 
                          onClick={downloadRevisedContract}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Revised
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileCheck className="h-12 w-12 mx-auto mb-4" />
                      <p>Upload a contract to see compliance analysis</p>
                    </div>
                  )}
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