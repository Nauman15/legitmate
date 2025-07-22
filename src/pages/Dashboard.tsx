
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  FileText, 
  Bell, 
  FileCheck, 
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
  Upload,
  Settings,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';
import { SetupPrompt, UploadSetupPrompt, ComplianceSetupPrompt } from '@/components/dashboard/SetupPrompt';
import { EmptyStateCard } from '@/components/dashboard/EmptyStateCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSetupMode, setIsSetupMode] = useState(true); // This would come from user profile/state

  // Mock user progress - this would come from actual user data
  const userProgress = {
    documentsUploaded: 0,
    complianceSetup: 0,
    profileCompleted: 25
  };

  const handleUploadDocument = () => {
    navigate('/contract-review');
  };

  const handleComplianceSetup = () => {
    navigate('/settings');
  };

  const handleCreatePolicy = () => {
    navigate('/policy-compliance');
  };

  const handleConnectIntegration = () => {
    navigate('/settings');
  };

  const quickLinks = [
    {
      title: 'Contract Review',
      description: 'Upload and analyze contracts',
      icon: FileText,
      link: '/contract-review',
      color: 'bg-primary/15 text-primary',
      count: userProgress.documentsUploaded
    },
    {
      title: 'Automated Filings',
      description: 'Manage government filings',
      icon: FileCheck,
      link: '/automated-filings',
      color: 'bg-accent/15 text-accent',
      count: 0
    },
    {
      title: 'Regulatory Alerts',
      description: 'View compliance updates',
      icon: Bell,
      link: '/regulatory-alerts',
      color: 'bg-warning/15 text-warning',
      count: 0
    },
    {
      title: 'Knowledge Base',
      description: 'Browse compliance resources',
      icon: BookOpen,
      link: '/knowledge-base',
      color: 'bg-success/15 text-success',
      count: 0
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-6xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-force-visible mb-2">
            Welcome to LegitMate
          </h1>
          <p className="text-force-muted font-medium">
            Your AI-powered compliance platform - Let's get you started
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Compliance Status with Interactive Setup */}
            <Card className="shadow-card border-2">
              <CardHeader>
                <CardTitle className="flex items-center text-force-visible">
                  <Shield className="mr-2 h-5 w-5 text-primary" />
                  Compliance Dashboard
                  {userProgress.profileCompleted < 100 && (
                    <Badge variant="setup" className="ml-auto">
                      Setup in Progress
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userProgress.profileCompleted < 50 ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mx-auto">
                      <Settings className="h-8 w-8 text-primary" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-force-visible">Complete Your Setup</h3>
                      <p className="text-sm text-force-muted">
                        Upload documents and configure your compliance settings to see your dashboard
                      </p>
                    </div>

                    <div className="w-full space-y-2">
                      <div className="flex justify-between text-xs text-force-muted">
                        <span>Profile Completion</span>
                        <span>{userProgress.profileCompleted}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
                          style={{ width: `${userProgress.profileCompleted}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                      <Button onClick={handleUploadDocument} variant="default" className="btn-stamp">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Documents
                      </Button>
                      <Button onClick={handleComplianceSetup} variant="outline" className="btn-stamp">
                        <Settings className="mr-2 h-4 w-4" />
                        Configure Settings
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="text-3xl font-bold text-force-visible">95%</div>
                        <Badge variant="success" className="bg-success/20 text-success border border-success/30">
                          Compliant
                        </Badge>
                      </div>
                      <p className="text-sm text-force-muted font-medium">
                        Your business is in good compliance standing
                      </p>
                    </div>
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary shadow-glow">
                      <CheckCircle className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Actions with Interactive Elements */}
            <Card className="shadow-card border-2">
              <CardHeader>
                <CardTitle className="text-force-visible">Get Started</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userProgress.documentsUploaded === 0 ? (
                  <EmptyStateCard
                    title="Upload Your First Document"
                    description="Upload contracts, policies, or compliance documents to start your AI-powered analysis journey."
                    actionText="Upload Document"
                    onAction={handleUploadDocument}
                    icon={<FileText className="h-5 w-5 text-primary" />}
                    stats={[
                      { label: "Documents Analyzed", value: "0", trend: "neutral" },
                      { label: "Compliance Issues Found", value: "0", trend: "neutral" },
                      { label: "Risk Assessments", value: "0", trend: "neutral" }
                    ]}
                  />
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-4 bg-muted/40 rounded-lg border border-border/50">
                      <div className="p-2 rounded-full bg-success/20">
                        <CheckCircle className="h-4 w-4 text-success" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-force-visible">Contract Analysis Complete</p>
                        <p className="text-sm text-force-muted mt-1">Successfully analyzed 3 contracts with no critical issues found</p>
                        <p className="text-xs text-force-muted mt-2 font-medium">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Setup Prompts */}
            {userProgress.documentsUploaded === 0 && (
              <UploadSetupPrompt onUpload={handleUploadDocument} />
            )}

            {userProgress.complianceSetup === 0 && (
              <ComplianceSetupPrompt onSetup={handleComplianceSetup} />
            )}

            {/* Upcoming Deadlines */}
            <Card className="shadow-card border-2">
              <CardHeader>
                <CardTitle className="flex items-center text-force-visible">
                  <Clock className="mr-2 h-5 w-5 text-warning" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userProgress.complianceSetup === 0 ? (
                  <div className="text-center py-6 space-y-3">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto opacity-50" />
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-force-visible">No Deadlines Yet</h4>
                      <p className="text-xs text-force-muted">
                        Complete your compliance setup to see important deadlines
                      </p>
                    </div>
                    <Button 
                      onClick={handleComplianceSetup} 
                      size="sm" 
                      variant="outline"
                      className="btn-stamp"
                    >
                      Setup Compliance
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg border border-border/50">
                      <div>
                        <p className="font-semibold text-sm text-force-visible">GST Filing</p>
                        <p className="text-xs text-force-muted mt-1">Due in 5 days</p>
                      </div>
                      <Badge variant="warning">
                        High
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card border-2">
              <CardHeader>
                <CardTitle className="text-force-visible">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickLinks.map((link, index) => (
                  <Button 
                    key={index}
                    variant="ghost" 
                    className="w-full justify-start h-auto p-4 hover:bg-muted/60 border border-transparent hover:border-border/50 transition-all action-card"
                    asChild
                  >
                    <Link to={link.link}>
                      <div className={`p-2 rounded-lg mr-3 ${link.color}`}>
                        <link.icon className="h-4 w-4" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-semibold text-sm text-force-visible">{link.title}</p>
                        <p className="text-xs text-force-muted">{link.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {link.count > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {link.count}
                          </Badge>
                        )}
                        <ArrowRight className="h-4 w-4 text-force-muted" />
                      </div>
                    </Link>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
