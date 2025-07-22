import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface RiskMetric {
  title: string;
  value: string;
  unit: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
  description: string;
}

interface RiskCategory {
  category: string;
  riskLevel: string;
  score: number;
  issues: string[];
  impact: string;
  probability: number;
  mitigation: string;
}

interface PredictiveInsight {
  title: string;
  probability: number;
  impact: string;
  timeline: string;
  description: string;
  recommendation: string;
  category: string;
}

interface MitigationAction {
  title: string;
  status: string;
  priority: string;
  deadline: string;
  assignee: string;
  progress: number;
}

interface DataSourceIntegration {
  name: string;
  category: string;
  icon: any;
  status: string;
  description: string;
  lastSync: string;
  records: string;
  riskInsights: string[];
  features: string[];
}

interface RiskAnalyticsData {
  riskMetrics: RiskMetric[];
  riskCategories: RiskCategory[];
  predictiveInsights: PredictiveInsight[];
  mitigationActions: MitigationAction[];
  dataSourceIntegrations: DataSourceIntegration[];
  overallRiskScore: number;
  criticalIssuesCount: number;
  complianceScore: number;
  predictedViolations: number;
}

export const useRiskAnalytics = () => {
  const { user } = useAuth();
  const [riskData, setRiskData] = useState<RiskAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRiskAnalytics = async () => {
    if (!user?.id) {
      setRiskData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch data from various tables
      const [contractsResponse, alertsResponse, tasksResponse] = await Promise.all([
        supabase.from('contracts').select('*').eq('user_id', user.id),
        supabase.from('regulatory_alerts').select('*').eq('user_id', user.id),
        supabase.from('compliance_tasks').select('*').eq('user_id', user.id)
      ]);

      const contracts = contractsResponse.data || [];
      const alerts = alertsResponse.data || [];
      const tasks = tasksResponse.data || [];

      // Calculate risk metrics from real data
      const totalContracts = contracts.length;
      const highRiskContracts = contracts.filter(c => (c.risk_score || 0) > 70).length;
      const avgRiskScore = totalContracts > 0 
        ? Math.round(contracts.reduce((sum, c) => sum + (c.risk_score || 0), 0) / totalContracts)
        : 0;
      
      const criticalAlerts = alerts.filter(a => a.impact_level === 'high').length;
      const avgComplianceScore = totalContracts > 0
        ? Math.round(contracts.reduce((sum, c) => sum + (c.compliance_score || 0), 0) / totalContracts)
        : 0;

      // Build risk analytics data from real data
      const riskAnalyticsData: RiskAnalyticsData = {
        riskMetrics: [
          {
            title: 'Overall Risk Score',
            value: avgRiskScore.toString(),
            unit: '/100',
            change: '0',
            trend: 'down' as const,
            color: 'text-warning',
            description: avgRiskScore > 70 ? 'High Risk Level' : avgRiskScore > 50 ? 'Medium Risk Level' : 'Low Risk Level'
          },
          {
            title: 'Critical Issues',
            value: criticalAlerts.toString(),
            unit: '',
            change: '0',
            trend: 'up' as const,
            color: 'text-destructive',
            description: criticalAlerts > 0 ? 'Require Immediate Action' : 'No Critical Issues'
          },
          {
            title: 'Compliance Score',
            value: avgComplianceScore.toString(),
            unit: '%',
            change: '0',
            trend: 'up' as const,
            color: 'text-success',
            description: avgComplianceScore > 80 ? 'Above Average' : 'Needs Improvement'
          },
          {
            title: 'High Risk Contracts',
            value: highRiskContracts.toString(),
            unit: '',
            change: '0',
            trend: 'down' as const,
            color: 'text-primary',
            description: `Out of ${totalContracts} total`
          }
        ],
        riskCategories: [],
        predictiveInsights: [],
        mitigationActions: [],
        dataSourceIntegrations: [],
        overallRiskScore: avgRiskScore,
        criticalIssuesCount: criticalAlerts,
        complianceScore: avgComplianceScore,
        predictedViolations: Math.max(0, criticalAlerts - 1)
      };

      setRiskData(riskAnalyticsData);
    } catch (err) {
      console.error('Error fetching risk analytics:', err);
      setError('Failed to load risk analytics data');
      setRiskData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiskAnalytics();
  }, [user?.id]);

  const refreshData = () => {
    fetchRiskAnalytics();
  };

  return {
    riskData,
    loading,
    error,
    refreshData,
    // Helper functions
    hasData: riskData !== null && (riskData.riskMetrics.length > 0 || riskData.overallRiskScore > 0),
    isEmpty: !loading && (!riskData || (riskData.riskMetrics.every(m => m.value === '0') && riskData.overallRiskScore === 0))
  };
};