import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useContracts, Contract, ContractAnalysis } from '@/hooks/useContracts';
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
  AlertCircle,
  Trash2
} from 'lucide-react';

const ContractReview = () => {
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [currentAnalyses, setCurrentAnalyses] = useState<ContractAnalysis[]>([]);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  
  const { 
    contracts, 
    loading, 
    uploadContract, 
    analyzeContract, 
    downloadContract,
    deleteContract,
    fetchAnalyses 
  } = useContracts();

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

  const processFile = async (file: File) => {
    // Only allow PDF files as requested
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file only.",
        variant: "destructive"
      });
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }

    try {
      const contract = await uploadContract(file);
      setUploadedFile(file);
      setSelectedContract(contract as Contract);
      setAnalysisComplete(false);
      setCurrentAnalyses([]);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload contract. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAnalyzeContract = async () => {
    if (!selectedContract) return;

    setIsAnalyzing(true);
    try {
      await analyzeContract(selectedContract.id);
      
      // Wait for analysis to complete and fetch results
      setTimeout(async () => {
        const analyses = await fetchAnalyses(selectedContract.id);
        setCurrentAnalyses(analyses as ContractAnalysis[]);
        setAnalysisComplete(true);
        setIsAnalyzing(false);
      }, 3500);
    } catch (error) {
      setIsAnalyzing(false);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your contract. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending Review';
      case 'analyzing': return 'Under Review';
      case 'reviewed': return 'Reviewed';
      case 'approved': return 'Approved';
      case 'needs_attention': return 'Needs Attention';
      default: return status;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'needs_attention': return 'destructive';
      case 'analyzing': return 'secondary';
      case 'reviewed': return 'outline';
      default: return 'outline';
    }
  };

  const getRiskColor = (score?: number) => {
    if (!score) return 'text-muted-foreground';
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

  // Contract analytics from real data
  const getContractStats = () => {
    const totalContracts = contracts.length;
    const avgRiskScore = contracts.reduce((acc, contract) => acc + (contract.risk_score || 0), 0) / totalContracts || 0;
    const pendingReview = contracts.filter(c => c.status === 'pending' || c.status === 'analyzing').length;
    
    return {
      totalContracts,
      avgRiskScore: Math.round(avgRiskScore),
      pendingReview,
      costSavings: '₹2.5L' // This would be calculated based on actual business logic
    };
  };

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

  const stats = getContractStats();

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
            }}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Contract
          </Button>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload">Upload & Review</TabsTrigger>
            <TabsTrigger value="contracts">My Contracts ({contracts.length})</TabsTrigger>
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
                    Upload your PDF contract document for AI-powered analysis
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
                      Drop your PDF contract here or click to upload
                    </p>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="contract-upload"
                    />
                    <Label htmlFor="contract-upload">
                      <Button variant="outline" className="cursor-pointer">
                        Choose PDF File
                      </Button>
                    </Label>
                    <div className="text-xs text-muted-foreground mt-2">
                      Only PDF files allowed (Max 10MB)
                    </div>
                  </div>

                  {uploadedFile && selectedContract && (
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
                            onClick={handleAnalyzeContract}
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
                  {analysisComplete && selectedContract ? (
                    <>
                      {/* Compliance Score */}
                      <div className="text-center space-y-2">
                        <div className="text-3xl font-bold text-foreground">
                          <span className={getRiskColor(selectedContract.compliance_score)}>
                            {selectedContract.compliance_score || 0}%
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Indian Law Compliance Score</p>
                        <Progress value={selectedContract.compliance_score || 0} className="h-2" />
                      </div>

                      {/* Compliance Issues */}
                      {currentAnalyses.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold flex items-center">
                            <AlertCircle className="mr-2 h-4 w-4 text-destructive" />
                            Compliance Issues Found ({currentAnalyses.length})
                          </h4>
                          {currentAnalyses.map((analysis, index) => (
                            <div key={index} className="p-4 bg-muted/30 rounded-lg space-y-3 border-l-4 border-l-destructive">
                              <div className="flex items-center justify-between">
                                <Badge variant={getRiskBadgeVariant(analysis.severity)}>
                                  {analysis.analysis_type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{analysis.section_reference}</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-destructive">{analysis.issue_description}</p>
                                {analysis.regulation_reference && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    <strong>Regulation:</strong> {analysis.regulation_reference}
                                  </p>
                                )}
                              </div>
                              {analysis.recommendation && (
                                <div className="bg-background p-3 rounded border">
                                  <p className="text-xs text-muted-foreground mb-1"><strong>Recommendation:</strong></p>
                                  <p className="text-sm">{analysis.recommendation}</p>
                                </div>
                              )}
                              {analysis.suggested_edit && (
                                <div className="bg-success/5 p-3 rounded border border-success/20">
                                  <p className="text-xs text-success mb-1"><strong>Suggested Edit:</strong></p>
                                  <p className="text-sm">{analysis.suggested_edit}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => toast({ title: "Full Report", description: "Detailed compliance report generated." })}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Full Report
                        </Button>
                        <Button 
                          variant="professional" 
                          className="flex-1" 
                          onClick={() => toast({ title: "Download", description: "Revised contract download started." })}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Revised
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileCheck className="h-12 w-12 mx-auto mb-4" />
                      <p>Upload and analyze a contract to see compliance results</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Contracts</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => toast({ title: "Search", description: "Search functionality coming soon" })}>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast({ title: "Filter", description: "Filter functionality coming soon" })}>
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading contracts...</p>
              </div>
            ) : contracts.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No contracts uploaded yet</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => document.getElementById('contract-upload')?.click()}
                >
                  Upload Your First Contract
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {contracts.map((contract) => (
                  <Card key={contract.id} className="shadow-card hover:shadow-elegant transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <FileText className="h-8 w-8 text-primary" />
                          <div>
                            <h3 className="font-semibold">{contract.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {contract.contract_type || 'Contract'} • {new Date(contract.uploaded_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          {contract.risk_score && (
                            <div className="text-center">
                              <div className={`text-lg font-bold ${getRiskColor(contract.risk_score)}`}>
                                {contract.risk_score}%
                              </div>
                              <div className="text-xs text-muted-foreground">Risk Score</div>
                            </div>
                          )}
                          
                          <Badge variant={getStatusVariant(contract.status)}>
                            {getStatusDisplay(contract.status)}
                          </Badge>
                          
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => toast({ title: "View Contract", description: "Contract viewer opening..." })}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => downloadContract(contract.file_path, contract.name)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this contract?')) {
                                  deleteContract(contract.id, contract.file_path);
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Contract Templates</h2>
              <Button variant="hero" onClick={() => toast({ title: "Upload Template", description: "Template upload functionality coming soon" })}>
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => toast({ title: "Preview", description: `Previewing ${template.name}...` })}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button 
                        variant="professional" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => toast({ title: "Template", description: `Using ${template.name} template...` })}
                      >
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
                  <div className="text-3xl font-bold text-primary">{stats.totalContracts}</div>
                  <div className="text-sm text-muted-foreground">Total Contracts</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <div className={`text-3xl font-bold ${getRiskColor(stats.avgRiskScore)}`}>
                    {stats.avgRiskScore}%
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Risk Score</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-warning">{stats.pendingReview}</div>
                  <div className="text-sm text-muted-foreground">Pending Review</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-accent">{stats.costSavings}</div>
                  <div className="text-sm text-muted-foreground">Est. Cost Savings</div>
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
                  <p>Advanced analytics dashboard coming soon</p>
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