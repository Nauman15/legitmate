import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Download,
  RefreshCw,
  DollarSign,
  Users,
  FileText,
  Database
} from 'lucide-react';
import { RiskMetricsOverview } from '@/components/risk-analytics/RiskMetricsOverview';
import { RiskCategoriesOverview } from '@/components/risk-analytics/RiskCategoriesOverview';
import { PredictiveInsights } from '@/components/risk-analytics/PredictiveInsights';
import { DataSourceIntegrations } from '@/components/risk-analytics/DataSourceIntegrations';
import { MitigationActions } from '@/components/risk-analytics/MitigationActions';
import { HistoricalTrends } from '@/components/risk-analytics/HistoricalTrends';

const RiskAnalytics = () => {
  const riskMetrics = [
    {
      title: 'Overall Risk Score',
      value: '73',
      unit: '/100',
      change: '-5',
      trend: 'down' as const,
      color: 'text-warning',
      description: 'Medium Risk Level'
    },
    {
      title: 'Critical Issues',
      value: '3',
      unit: '',
      change: '+1',
      trend: 'up' as const,
      color: 'text-destructive',
      description: 'Require Immediate Action'
    },
    {
      title: 'Compliance Score',
      value: '87',
      unit: '%',
      change: '+3',
      trend: 'up' as const,
      color: 'text-success',
      description: 'Above Industry Average'
    },
    {
      title: 'Predicted Violations',
      value: '2',
      unit: '',
      change: '-1',
      trend: 'down' as const,
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
        <RiskMetricsOverview metrics={riskMetrics} />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Risk Overview</TabsTrigger>
            <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
            <TabsTrigger value="data-sources">Data Sources</TabsTrigger>
            <TabsTrigger value="mitigation">Mitigation Actions</TabsTrigger>
            <TabsTrigger value="trends">Historical Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <RiskCategoriesOverview categories={riskCategories} />
          </TabsContent>

          <TabsContent value="predictive" className="space-y-6">
            <PredictiveInsights insights={predictiveInsights} />
          </TabsContent>

          <TabsContent value="data-sources" className="space-y-6">
            <DataSourceIntegrations integrations={dataSourceIntegrations} />
          </TabsContent>

          <TabsContent value="mitigation" className="space-y-6">
            <MitigationActions actions={mitigationActions} />
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <HistoricalTrends />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RiskAnalytics;