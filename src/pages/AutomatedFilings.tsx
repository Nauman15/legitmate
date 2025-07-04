import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  FileCheck, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Upload,
  Download,
  RefreshCw,
  Settings,
  FileText,
  Shield,
  Building,
  TrendingUp,
  Bell,
  Link as LinkIcon,
  Plus,
  Eye,
  Loader2
} from 'lucide-react';

const AutomatedFilings = () => {
  const { toast } = useToast();
  const [selectedFilingType, setSelectedFilingType] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [integrationUrl, setIntegrationUrl] = useState('');

  const filingTypes = [
    {
      id: 'gst-return',
      name: 'GST Return',
      description: 'GSTR-1, GSTR-3B, and other GST filings',
      icon: Shield,
      color: 'text-primary',
      frequency: 'Monthly',
      documents: ['Sales Register', 'Purchase Register', 'Tax Invoices'],
      deadline: '11th of following month'
    },
    {
      id: 'tds-filing',
      name: 'TDS Filing',
      description: 'TDS returns and quarterly statements',
      icon: TrendingUp,
      color: 'text-accent',
      frequency: 'Quarterly',
      documents: ['TDS Certificates', 'Challan Details', 'Form 16A'],
      deadline: '31st of following quarter'
    },
    {
      id: 'roc-filing',
      name: 'ROC Filing',
      description: 'Annual returns and company filings',
      icon: Building,
      color: 'text-success',
      frequency: 'Annual',
      documents: ['Financial Statements', 'Annual Return', 'Board Resolutions'],
      deadline: '30th September annually'
    },
    {
      id: 'other-statutory',
      name: 'Other Statutory Documents',
      description: 'PF, ESI, Labor Law, and other compliance filings',
      icon: FileText,
      color: 'text-warning',
      frequency: 'Varies',
      documents: ['Salary Register', 'Employee Data', 'Compliance Certificates'],
      deadline: 'Varies by type'
    }
  ];
  const upcomingFilings = [
    {
      id: 1,
      name: 'GST GSTR-1',
      type: 'gst-return',
      description: 'Monthly GST return for outward supplies',
      dueDate: '2024-04-11',
      daysLeft: 3,
      status: 'pending',
      priority: 'high',
      category: 'GST',
      estimatedTime: '2 hours',
      autoStatus: 'enabled',
      documents: ['Sales Register', 'Invoice Data'],
      progress: 85,
      reminderSent: true
    },
    {
      id: 2,
      name: 'TDS Return - Q4 FY24',
      type: 'tds-filing',
      description: 'Quarterly TDS return filing',
      dueDate: '2024-04-15',
      daysLeft: 7,
      status: 'in_progress',
      priority: 'medium',
      category: 'Tax',
      estimatedTime: '1.5 hours',
      autoStatus: 'enabled',
      documents: ['TDS Certificate', 'Challan Details'],
      progress: 45,
      reminderSent: false
    },
    {
      id: 3,
      name: 'Annual Return FY23-24',
      type: 'roc-filing',
      description: 'Company annual return filing with ROC',
      dueDate: '2024-05-30',
      daysLeft: 52,
      status: 'scheduled',
      priority: 'medium',
      category: 'Company',
      estimatedTime: '3 hours',
      autoStatus: 'manual',
      documents: ['Financial Statements', 'Board Resolutions'],
      progress: 0,
      reminderSent: false
    },
    {
      id: 4,
      name: 'EPF Monthly Return',
      type: 'other-statutory',
      description: 'Employee Provident Fund monthly return',
      dueDate: '2024-04-05',
      daysLeft: -3,
      status: 'overdue',
      priority: 'high',
      category: 'Labor',
      estimatedTime: '1 hour',
      autoStatus: 'enabled',
      documents: ['Salary Register', 'Employee Data'],
      progress: 20,
      reminderSent: true
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    toast({
      title: "Files Uploaded",
      description: `${files.length} file(s) uploaded successfully.`,
    });
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleIntegrationSetup = () => {
    if (!integrationUrl) {
      toast({
        title: "Integration URL Required",
        description: "Please enter your accounting system webhook URL.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    // Simulate integration setup
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Integration Successful",
        description: "Your accounting system has been connected successfully.",
      });
    }, 2000);
  };

  const scheduleFiling = (filingType: string) => {
    toast({
      title: "Filing Scheduled",
      description: `${filingType} has been scheduled for automatic processing.`,
    });
  };

  const sendDeadlineReminder = (filingId: number) => {
    toast({
      title: "Reminder Sent",
      description: "Deadline reminder has been sent via email and SMS.",
    });
  };

  const completedFilings = [
    {
      name: 'GST GSTR-3B',
      filedDate: '2024-03-20',
      status: 'success',
      category: 'GST',
      acknowledgment: 'ARN123456789'
    },
    {
      name: 'Income Tax Return',
      filedDate: '2024-03-15',
      status: 'success',
      category: 'Tax',
      acknowledgment: 'ITR987654321'
    },
    {
      name: 'PF Contribution',
      filedDate: '2024-03-10',
      status: 'success',
      category: 'Labor',
      acknowledgment: 'PF456789123'
    },
    {
      name: 'VAT Return',
      filedDate: '2024-03-05',
      status: 'rejected',
      category: 'Tax',
      acknowledgment: 'VAT789456123',
      errorMessage: 'Invalid GST number format'
    }
  ];

  const automationSettings = [
    {
      category: 'GST Filings',
      enabled: true,
      filings: ['GSTR-1', 'GSTR-3B', 'GSTR-9'],
      frequency: 'Monthly',
      lastUpdated: '2024-03-20'
    },
    {
      category: 'Tax Returns',
      enabled: true,
      filings: ['TDS Return', 'Advance Tax'],
      frequency: 'Quarterly',
      lastUpdated: '2024-03-15'
    },
    {
      category: 'Labor Compliance',
      enabled: false,
      filings: ['EPF Return', 'ESI Return'],
      frequency: 'Monthly',
      lastUpdated: '2024-03-01'
    },
    {
      category: 'Company Filings',
      enabled: false,
      filings: ['Annual Return', 'Board Resolutions'],
      frequency: 'Annual',
      lastUpdated: '2024-02-20'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'pending': return 'text-warning';
      case 'in_progress': return 'text-primary';
      case 'rejected': return 'text-destructive';
      case 'draft': return 'text-muted-foreground';
      case 'scheduled': return 'text-accent';
      case 'overdue': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success': return 'default';
      case 'pending': return 'secondary';
      case 'in_progress': return 'outline';
      case 'rejected': return 'destructive';
      case 'draft': return 'secondary';
      case 'scheduled': return 'outline';
      case 'overdue': return 'destructive';
      default: return 'secondary';
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
              <FileCheck className="mr-3 h-8 w-8 text-primary" />
              Automated Filings
            </h1>
            <p className="text-muted-foreground">Streamline your regulatory filings with intelligent automation</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="hero">
              <Upload className="mr-2 h-4 w-4" />
              Manual Filing
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Upcoming Filings</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-success">8</div>
              <div className="text-sm text-muted-foreground">Auto-Enabled</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-accent">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-warning">3</div>
              <div className="text-sm text-muted-foreground">Overdue</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="new-filing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="new-filing">New Filing</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value="new-filing" className="space-y-6">
            {/* Filing Type Selection */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="mr-2 h-5 w-5 text-primary" />
                  Create New Filing
                </CardTitle>
                <CardDescription>
                  Select filing type and upload required documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filingTypes.map((type) => (
                    <Card 
                      key={type.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-card ${
                        selectedFilingType === type.id ? 'ring-2 ring-primary bg-primary/5' : ''
                      }`}
                      onClick={() => setSelectedFilingType(type.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <type.icon className={`h-6 w-6 ${type.color} mt-1`} />
                          <div className="flex-1">
                            <h3 className="font-semibold">{type.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                            <div className="space-y-1 text-xs text-muted-foreground">
                              <p><strong>Frequency:</strong> {type.frequency}</p>
                              <p><strong>Deadline:</strong> {type.deadline}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedFilingType && (
                  <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold">Document Upload</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="file-upload">Upload Documents</Label>
                        <Input
                          id="file-upload"
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.xlsx,.csv"
                          onChange={handleFileUpload}
                          className="mt-1"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Accepted formats: PDF, DOC, DOCX, XLSX, CSV
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="filing-period">Filing Period</Label>
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="march-2024">March 2024</SelectItem>
                            <SelectItem value="q4-fy24">Q4 FY24</SelectItem>
                            <SelectItem value="fy2023-24">FY 2023-24</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <Label>Uploaded Files:</Label>
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-background rounded border">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-primary" />
                              <span className="text-sm">{file.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </Badge>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeFile(index)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button 
                        variant="professional" 
                        onClick={() => scheduleFiling(selectedFilingType)}
                        disabled={uploadedFiles.length === 0}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Filing
                      </Button>
                      <Button variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {upcomingFilings.map((filing) => (
                <Card key={filing.id} className="shadow-card hover:shadow-elegant transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold">{filing.name}</h3>
                            <p className="text-muted-foreground">{filing.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={getPriorityColor(filing.priority)}>
                              {filing.priority.toUpperCase()}
                            </Badge>
                            <Badge variant={getStatusBadge(filing.status)}>
                              {filing.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                            {filing.daysLeft < 0 && (
                              <Badge variant="destructive">
                                {Math.abs(filing.daysLeft)} days overdue
                              </Badge>
                            )}
                            {filing.daysLeft >= 0 && filing.daysLeft <= 7 && (
                              <Badge variant="secondary">
                                {filing.daysLeft} days left
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-muted-foreground">Due Date:</span>
                            <p className="font-semibold">{filing.dueDate}</p>
                          </div>
                          <div>
                            <span className="font-medium text-muted-foreground">Category:</span>
                            <p className="font-semibold">{filing.category}</p>
                          </div>
                          <div>
                            <span className="font-medium text-muted-foreground">Est. Time:</span>
                            <p className="font-semibold">{filing.estimatedTime}</p>
                          </div>
                          <div>
                            <span className="font-medium text-muted-foreground">Automation:</span>
                            <p className={`font-semibold ${filing.autoStatus === 'enabled' ? 'text-success' : 'text-warning'}`}>
                              {filing.autoStatus}
                            </p>
                          </div>
                        </div>

                        {filing.progress > 0 && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{filing.progress}%</span>
                            </div>
                            <Progress value={filing.progress} className="h-2" />
                          </div>
                        )}

                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">Required Documents:</p>
                          <div className="flex flex-wrap gap-2">
                            {filing.documents.map((doc, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <FileText className="mr-1 h-3 w-3" />
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-6">
                        <Button variant="professional" size="sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => sendDeadlineReminder(filing.id)}
                          disabled={filing.reminderSent}
                        >
                          <Bell className="mr-2 h-4 w-4" />
                          {filing.reminderSent ? 'Reminded' : 'Remind'}
                        </Button>
                        {filing.autoStatus === 'enabled' && (
                          <Button variant="success" size="sm">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Auto-File
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recently Completed Filings</CardTitle>
                <CardDescription>Track your filing history and acknowledgments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {completedFilings.map((filing, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${filing.status === 'success' ? 'bg-success/10' : 'bg-destructive/10'}`}>
                        {filing.status === 'success' ? (
                          <CheckCircle className="h-5 w-5 text-success" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{filing.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Filed on {filing.filedDate} • {filing.category}
                        </p>
                        {filing.errorMessage && (
                          <p className="text-sm text-destructive mt-1">{filing.errorMessage}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-sm font-medium">ACK: {filing.acknowledgment}</p>
                        <Badge variant={filing.status === 'success' ? 'default' : 'destructive'}>
                          {filing.status}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integration" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LinkIcon className="mr-2 h-5 w-5 text-primary" />
                  Accounting System Integration
                </CardTitle>
                <CardDescription>
                  Connect your accounting software for automated data sync
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Popular Integrations</h3>
                    <div className="space-y-3">
                      {['Tally ERP', 'QuickBooks', 'Zoho Books', 'SAP Business One'].map((software) => (
                        <div key={software} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                          <span className="text-sm">{software}</span>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Custom Integration</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="webhook-url">Webhook URL</Label>
                        <Input
                          id="webhook-url"
                          value={integrationUrl}
                          onChange={(e) => setIntegrationUrl(e.target.value)}
                          placeholder="https://your-system.com/webhook"
                          className="mt-1"
                        />
                      </div>
                      <Button 
                        onClick={handleIntegrationSetup}
                        disabled={isProcessing || !integrationUrl}
                        className="w-full"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Connecting...
                          </>
                        ) : (
                          <>
                            <LinkIcon className="mr-2 h-4 w-4" />
                            Setup Integration
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Integration Benefits:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Automatic data sync from your accounting system</li>
                    <li>• Real-time document generation</li>
                    <li>• Reduced manual data entry errors</li>
                    <li>• Faster filing process with pre-filled forms</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reminders" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-primary" />
                  Deadline Reminders
                </CardTitle>
                <CardDescription>
                  Manage automated reminders for filing deadlines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Reminder Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Email reminders</Label>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">SMS reminders</Label>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Dashboard notifications</Label>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Reminder schedule</Label>
                      <Select defaultValue="7-3-1">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7-3-1">7, 3, 1 days before</SelectItem>
                          <SelectItem value="14-7-3">14, 7, 3 days before</SelectItem>
                          <SelectItem value="30-15-7">30, 15, 7 days before</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Recent Reminders</h3>
                    <div className="space-y-2">
                      {upcomingFilings.filter(f => f.reminderSent).map((filing) => (
                        <div key={filing.id} className="p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">{filing.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Reminder sent for {filing.dueDate}
                              </p>
                            </div>
                            <Badge variant="secondary" className="text-xs">Sent</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Automation Settings</CardTitle>
                <CardDescription>Configure automatic filing for different compliance categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {automationSettings.map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`p-2 rounded-full ${setting.enabled ? 'bg-success/10' : 'bg-muted'}`}>
                          {setting.category === 'GST Filings' && <Shield className="h-5 w-5 text-primary" />}
                          {setting.category === 'Tax Returns' && <TrendingUp className="h-5 w-5 text-primary" />}
                          {setting.category === 'Labor Compliance' && <FileText className="h-5 w-5 text-primary" />}
                          {setting.category === 'Company Filings' && <Building className="h-5 w-5 text-primary" />}
                        </div>
                        <div>
                          <h3 className="font-semibold">{setting.category}</h3>
                          <p className="text-sm text-muted-foreground">
                            {setting.frequency} • Last updated: {setting.lastUpdated}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 ml-11">
                        {setting.filings.map((filing, filingIndex) => (
                          <Badge key={filingIndex} variant="outline" className="text-xs">
                            {filing}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={setting.enabled ? 'default' : 'secondary'}>
                        {setting.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant={setting.enabled ? 'outline' : 'professional'} size="sm">
                        {setting.enabled ? 'Disable' : 'Enable'}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Filing Calendar
                </CardTitle>
                <CardDescription>View all upcoming filing deadlines in calendar format</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Calendar className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg mb-2">Filing Calendar View</p>
                  <p>Interactive calendar coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AutomatedFilings;