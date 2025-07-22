import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Download,
  RefreshCw
} from 'lucide-react';
import { RiskMetricsOverview } from '@/components/risk-analytics/RiskMetricsOverview';
import { RiskCategoriesOverview } from '@/components/risk-analytics/RiskCategoriesOverview';
import { PredictiveInsights } from '@/components/risk-analytics/PredictiveInsights';
import { DataSourceIntegrations } from '@/components/risk-analytics/DataSourceIntegrations';
import { MitigationActions } from '@/components/risk-analytics/MitigationActions';
import { HistoricalDataImport } from '@/components/risk-analytics/HistoricalDataImport';
import { EmptyRiskAnalyticsState } from '@/components/risk-analytics/EmptyRiskAnalyticsState';
import { useRiskAnalytics } from '@/hooks/useRiskAnalytics';

const RiskAnalytics = () => {
  const { riskData, loading, error, refreshData, hasData, isEmpty } = useRiskAnalytics();

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
                <BarChart3 className="mr-3 h-8 w-8 text-primary" />
                Risk Analytics
              </h1>
              <p className="text-muted-foreground">Advanced risk assessment and predictive compliance analytics</p>
            </div>
          </div>
          <EmptyRiskAnalyticsState />
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
              <BarChart3 className="mr-3 h-8 w-8 text-primary" />
              Risk Analytics
            </h1>
            <p className="text-muted-foreground">Advanced risk assessment and predictive compliance analytics</p>
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

        {/* Risk Metrics Overview */}
        {riskData && <RiskMetricsOverview metrics={riskData.riskMetrics} />}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Risk Overview</TabsTrigger>
            <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
            <TabsTrigger value="data-sources">Data Sources</TabsTrigger>
            <TabsTrigger value="mitigation">Mitigation Actions</TabsTrigger>
            <TabsTrigger value="trends">Historical Data</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {riskData && <RiskCategoriesOverview categories={riskData.riskCategories} />}
          </TabsContent>

          <TabsContent value="predictive" className="space-y-6">
            {riskData && <PredictiveInsights insights={riskData.predictiveInsights} />}
          </TabsContent>

          <TabsContent value="data-sources" className="space-y-6">
            {riskData && <DataSourceIntegrations integrations={riskData.dataSourceIntegrations} />}
          </TabsContent>

          <TabsContent value="mitigation" className="space-y-6">
            {riskData && <MitigationActions actions={riskData.mitigationActions} />}
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <HistoricalDataImport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RiskAnalytics;