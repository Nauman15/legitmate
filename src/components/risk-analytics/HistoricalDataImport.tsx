import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  FileText, 
  Calendar, 
  CheckCircle, 
  AlertTriangle, 
  Database,
  Download,
  History,
  BarChart3,
  TrendingUp,
  Clock,
  FileSpreadsheet,
  FileJson,
  Zap,
  RefreshCw
} from 'lucide-react';
import { useState } from 'react';

export const HistoricalDataImport = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const supportedFormats = [
    { format: 'Excel (.xlsx)', icon: FileSpreadsheet, description: 'Standard Excel format for GST returns, payroll data' },
    { format: 'CSV (.csv)', icon: FileText, description: 'Comma-separated values for bulk data import' },
    { format: 'JSON (.json)', icon: FileJson, description: 'API responses and structured data exports' },
    { format: 'Tally Export', icon: Database, description: 'Direct Tally ERP data exports' }
  ];

  const historicalDataTypes = [
    {
      category: 'GST & Tax Compliance',
      description: 'Import GST returns, TDS filings, and tax payment records',
      dataPoints: ['GSTR-1/3B Returns', 'TDS Challan Data', 'Tax Payment History', 'E-way Bill Records'],
      timeRange: 'Last 5 Years',
      recordCount: '15,000+',
      status: 'ready'
    },
    {
      category: 'Payroll & Labor Data',
      description: 'Employee records, PF/ESI contributions, salary registers',
      dataPoints: ['Employee Master Data', 'PF Contribution Records', 'ESI Payment History', 'Salary Registers'],
      timeRange: 'Last 3 Years',
      recordCount: '8,500+',
      status: 'processing'
    },
    {
      category: 'Company Filings',
      description: 'ROC filings, board resolutions, annual returns',
      dataPoints: ['Annual Returns (AOC-4)', 'Board Resolutions', 'DIN/DSC Records', 'Share Transfer Data'],
      timeRange: 'Last 7 Years',
      recordCount: '2,300+',
      status: 'ready'
    },
    {
      category: 'Contract & Vendor Data',
      description: 'Vendor agreements, purchase orders, contract renewals',
      dataPoints: ['Vendor Master Data', 'Purchase Orders', 'Contract Documents', 'Payment Terms'],
      timeRange: 'Last 4 Years',
      recordCount: '5,200+',
      status: 'pending'
    }
  ];

  const importHistory = [
    {
      date: '2024-03-20',
      dataType: 'GST Returns (2023-24)',
      records: 2847,
      status: 'completed',
      source: 'Tally ERP',
      processingTime: '2.5 minutes',
      issues: 0
    },
    {
      date: '2024-03-18',
      dataType: 'Employee PF Data',
      records: 1234,
      status: 'completed',
      source: 'SAP SuccessFactors',
      processingTime: '1.8 minutes',
      issues: 3
    },
    {
      date: '2024-03-15',
      dataType: 'Vendor Master Data',
      records: 567,
      status: 'processing',
      source: 'Manual Upload',
      processingTime: '4.2 minutes',
      issues: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'processing': return 'text-primary';
      case 'pending': return 'text-warning';
      case 'ready': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (status) {
      case 'completed': return 'default';
      case 'processing': return 'secondary';
      case 'pending': return 'outline';
      case 'ready': return 'default';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="mr-2 h-5 w-5 text-primary" />
            Historical Data Import & Analysis
          </CardTitle>
          <CardDescription>
            Import historical compliance data from your accounting and HR systems for comprehensive risk analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload">Data Upload</TabsTrigger>
              <TabsTrigger value="analysis">Historical Analysis</TabsTrigger>
              <TabsTrigger value="history">Import History</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-6">
              {/* File Upload Section */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Upload className="mr-2 h-5 w-5 text-primary" />
                    Upload Historical Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="dataType">Data Type</Label>
                        <select className="w-full mt-1 p-2 border border-border rounded-md bg-background">
                          <option>GST Returns & Tax Data</option>
                          <option>Payroll & Employee Records</option>
                          <option>Company Filing Documents</option>
                          <option>Vendor & Contract Data</option>
                          <option>Financial Statements</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="dateRange">Date Range</Label>
                        <div className="flex space-x-2 mt-1">
                          <Input type="date" placeholder="From Date" />
                          <Input type="date" placeholder="To Date" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="source">Data Source</Label>
                        <select className="w-full mt-1 p-2 border border-border rounded-md bg-background">
                          <option>Tally ERP Export</option>
                          <option>SAP System</option>
                          <option>Manual Upload</option>
                          <option>API Integration</option>
                          <option>Third-party Platform</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm font-medium mb-2">Drop files here or click to browse</p>
                        <p className="text-xs text-muted-foreground">Supports Excel, CSV, JSON, and Tally exports</p>
                      </div>
                      
                      {isUploading && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Uploading and processing...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} className="h-2" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button variant="hero" className="flex-1">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload & Process Data
                    </Button>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Sample Template
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Supported Formats */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Supported Data Formats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {supportedFormats.map((format, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                        <format.icon className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold text-sm">{format.format}</h4>
                          <p className="text-xs text-muted-foreground">{format.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {historicalDataTypes.map((dataType, index) => (
                  <Card key={index} className="border border-border hover:shadow-elegant transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-lg font-semibold">{dataType.category}</h3>
                            <Badge variant={getStatusBadge(dataType.status)}>
                              {dataType.status.charAt(0).toUpperCase() + dataType.status.slice(1)}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">{dataType.description}</p>
                          
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-semibold text-sm mb-2 flex items-center">
                                <Database className="mr-1 h-4 w-4 text-primary" />
                                Available Data Points:
                              </h4>
                              <div className="grid grid-cols-2 gap-2">
                                {dataType.dataPoints.map((point, pointIndex) => (
                                  <div key={pointIndex} className="flex items-center text-sm">
                                    <CheckCircle className="h-3 w-3 mr-2 text-success flex-shrink-0" />
                                    <span>{point}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-muted-foreground">Time Range:</span>
                                <span className="ml-2 font-bold text-primary">{dataType.timeRange}</span>
                              </div>
                              <div>
                                <span className="font-medium text-muted-foreground">Records:</span>
                                <span className="ml-2 font-bold text-accent">{dataType.recordCount}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2 ml-6">
                          <Button variant="professional" size="sm">
                            <BarChart3 className="mr-2 h-4 w-4" />
                            Analyze
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
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-primary" />
                    Recent Import Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {importHistory.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{item.dataType}</h3>
                          <Badge variant={getStatusBadge(item.status)}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </Badge>
                          {item.issues > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {item.issues} Issues
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-4 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Date:</span> {item.date}
                          </div>
                          <div>
                            <span className="font-medium">Records:</span> {item.records.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Source:</span> {item.source}
                          </div>
                          <div>
                            <span className="font-medium">Processing:</span> {item.processingTime}
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 ml-6">
                        <Button variant="outline" size="sm">
                          <TrendingUp className="h-4 w-4" />
                        </Button>
                        {item.status === 'processing' && (
                          <Button variant="professional" size="sm">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Check Status
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};