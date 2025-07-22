
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Download,
  RefreshCw,
  FileText
} from 'lucide-react';
import { EmptyPolicyState } from '@/components/policy-compliance/EmptyPolicyState';
import { usePolicyCompliance } from '@/hooks/usePolicyCompliance';

const PolicyCompliance = () => {
  const { policyData, loading, error, refreshData, hasData, isEmpty } = usePolicyCompliance();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-card rounded-lg shadow-card p-6 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center">
                <Shield className="mr-3 h-8 w-8 text-primary" />
                Policy Compliance
              </h1>
              <p className="text-muted-foreground">Monitor and manage policy compliance across your organization</p>
            </div>
          </div>
          <EmptyPolicyState />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <Shield className="mr-3 h-8 w-8 text-primary" />
              Policy Compliance
            </h1>
            <p className="text-muted-foreground">Monitor and manage policy compliance across your organization</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={refreshData}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
            <Button variant="hero">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Metrics */}
        {policyData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card rounded-lg shadow-card p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Overall Score</h3>
              </div>
              <div className="flex items-baseline space-x-1 mb-1">
                <span className="text-3xl font-bold text-primary">{policyData.overallScore}</span>
                <span className="text-sm text-muted-foreground">%</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {policyData.overallScore > 80 ? 'Excellent Compliance' : policyData.overallScore > 60 ? 'Good Compliance' : 'Needs Improvement'}
              </p>
            </div>

            <div className="bg-card rounded-lg shadow-card p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Total Documents</h3>
              </div>
              <div className="flex items-baseline space-x-1 mb-1">
                <span className="text-3xl font-bold text-foreground">{policyData.totalDocuments}</span>
                <span className="text-sm text-muted-foreground">docs</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {policyData.analyzedDocuments} analyzed
              </p>
            </div>

            <div className="bg-card rounded-lg shadow-card p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Critical Issues</h3>
              </div>
              <div className="flex items-baseline space-x-1 mb-1">
                <span className="text-3xl font-bold text-destructive">{policyData.criticalIssues}</span>
                <span className="text-sm text-muted-foreground">issues</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {policyData.criticalIssues === 0 ? 'No Critical Issues' : 'Require Immediate Action'}
              </p>
            </div>

            <div className="bg-card rounded-lg shadow-card p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Medium Issues</h3>
              </div>
              <div className="flex items-baseline space-x-1 mb-1">
                <span className="text-3xl font-bold text-warning">{policyData.mediumIssues}</span>
                <span className="text-sm text-muted-foreground">issues</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {policyData.mediumIssues === 0 ? 'No Medium Issues' : 'Review Required'}
              </p>
            </div>
          </div>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
            <TabsTrigger value="gaps">Compliance Gaps</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="bg-card rounded-lg shadow-card p-6 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Policy Overview</h3>
              <p className="text-muted-foreground">
                {policyData ? 
                  `You have ${policyData.totalDocuments} documents with ${policyData.analyzedDocuments} analyzed for compliance.` :
                  'No policy data available. Upload documents to start compliance monitoring.'
                }
              </p>
            </div>
          </TabsContent>

          <TabsContent value="policies" className="space-y-6">
            <div className="bg-card rounded-lg shadow-card p-6 text-center">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Policy Management</h3>
              <p className="text-muted-foreground">Policy management features will be available once you upload your first policies.</p>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="bg-card rounded-lg shadow-card p-6 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Compliance Reports</h3>
              <p className="text-muted-foreground">Detailed compliance reports will be generated based on your uploaded documents.</p>
            </div>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <div className="bg-card rounded-lg shadow-card p-6 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Audit Trail</h3>
              <p className="text-muted-foreground">Audit trail will track all compliance-related activities and changes.</p>
            </div>
          </TabsContent>

          <TabsContent value="gaps" className="space-y-6">
            <div className="bg-card rounded-lg shadow-card p-6 text-center">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Compliance Gaps</h3>
              <p className="text-muted-foreground">AI will identify compliance gaps once you upload your policies and contracts.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PolicyCompliance;
