import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ComplianceAnalytics {
  complianceScore: number;
  complianceScoreTrend: number;
  riskScore: number;
  riskScoreTrend: number;
  activeAlerts: number;
  alertsTrend: number;
  upcomingDeadlines: number;
  deadlinesTrend: number;
  monthlyActivity: Array<{
    month: string;
    contracts: number;
    filings: number;
    alerts: number;
  }>;
  industryBenchmark: {
    averageScore: number;
    percentile: number;
  };
}

interface PredictiveInsights {
  penaltyRisk: {
    probability: number;
    estimatedAmount: number;
    riskFactors: string[];
  };
  complianceCost: {
    monthly: number;
    quarterly: number;
    annual: number;
    breakdown: Array<{
      category: string;
      amount: number;
    }>;
  };
  resourceOptimization: Array<{
    task: string;
    currentTime: number;
    optimizedTime: number;
    savings: number;
  }>;
}

export const useAdvancedAnalytics = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<ComplianceAnalytics | null>(null);
  const [insights, setInsights] = useState<PredictiveInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch compliance data
      const [contractsResult, alertsResult, tasksResult, filingResult] = await Promise.all([
        supabase.from('contracts').select('*').eq('user_id', user.id),
        supabase.from('regulatory_alerts').select('*').eq('user_id', user.id),
        supabase.from('compliance_tasks').select('*').eq('user_id', user.id),
        supabase.from('filing_calendar').select('*').eq('user_id', user.id)
      ]);

      if (contractsResult.error) throw contractsResult.error;
      if (alertsResult.error) throw alertsResult.error;
      if (tasksResult.error) throw tasksResult.error;
      if (filingResult.error) throw filingResult.error;

      const contracts = contractsResult.data || [];
      const alerts = alertsResult.data || [];
      const tasks = tasksResult.data || [];
      const filings = filingResult.data || [];

      // Calculate compliance score based on various factors
      const totalContracts = contracts.length;
      const reviewedContracts = contracts.filter(c => c.status === 'reviewed').length;
      const highRiskContracts = contracts.filter(c => (c.risk_score || 0) > 70).length;
      const activeAlerts = alerts.filter(a => a.status === 'active').length;
      const overdueTasks = tasks.filter(t => t.status === 'overdue').length;

      let complianceScore = 100;
      if (totalContracts > 0) {
        complianceScore -= ((totalContracts - reviewedContracts) / totalContracts) * 30;
        complianceScore -= (highRiskContracts / totalContracts) * 20;
      }
      complianceScore -= Math.min(activeAlerts * 5, 30);
      complianceScore -= Math.min(overdueTasks * 3, 20);
      complianceScore = Math.max(0, Math.round(complianceScore));

      // Calculate risk score
      const avgContractRisk = totalContracts > 0 
        ? contracts.reduce((sum, c) => sum + (c.risk_score || 0), 0) / totalContracts
        : 0;
      const riskScore = Math.round((avgContractRisk + activeAlerts * 5 + overdueTasks * 3) / 3);

      // Generate monthly activity data (mock data for now)
      const monthlyActivity = Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        return {
          month: date.toLocaleDateString('en-US', { month: 'short' }),
          contracts: Math.floor(Math.random() * 20) + 5,
          filings: Math.floor(Math.random() * 15) + 3,
          alerts: Math.floor(Math.random() * 10) + 1
        };
      }).reverse();

      const analyticsData: ComplianceAnalytics = {
        complianceScore,
        complianceScoreTrend: Math.floor(Math.random() * 10) - 5,
        riskScore,
        riskScoreTrend: Math.floor(Math.random() * 8) - 4,
        activeAlerts: activeAlerts,
        alertsTrend: Math.floor(Math.random() * 6) - 3,
        upcomingDeadlines: filings.filter(f => f.status === 'pending').length,
        deadlinesTrend: Math.floor(Math.random() * 4) - 2,
        monthlyActivity,
        industryBenchmark: {
          averageScore: 75,
          percentile: complianceScore > 75 ? 80 : 60
        }
      };

      // Generate predictive insights
      const insightsData: PredictiveInsights = {
        penaltyRisk: {
          probability: Math.max(0, 100 - complianceScore),
          estimatedAmount: Math.max(0, (100 - complianceScore) * 1000),
          riskFactors: [
            ...(overdueTasks > 0 ? ['Overdue compliance tasks'] : []),
            ...(activeAlerts > 0 ? ['Active regulatory alerts'] : []),
            ...(highRiskContracts > 0 ? ['High-risk contracts'] : [])
          ]
        },
        complianceCost: {
          monthly: 25000 + (activeAlerts * 2000),
          quarterly: 75000 + (activeAlerts * 6000),
          annual: 300000 + (activeAlerts * 24000),
          breakdown: [
            { category: 'Filing Fees', amount: 15000 },
            { category: 'Professional Services', amount: 35000 },
            { category: 'Software & Tools', amount: 8000 },
            { category: 'Training & Education', amount: 12000 }
          ]
        },
        resourceOptimization: [
          {
            task: 'GST Filing',
            currentTime: 8,
            optimizedTime: 2,
            savings: 6
          },
          {
            task: 'Contract Review',
            currentTime: 16,
            optimizedTime: 6,
            savings: 10
          },
          {
            task: 'Compliance Reporting',
            currentTime: 12,
            optimizedTime: 4,
            savings: 8
          }
        ]
      };

      setAnalytics(analyticsData);
      setInsights(insightsData);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching advanced analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [user]);

  return {
    analytics,
    insights,
    loading,
    error,
    refetch: fetchAnalytics
  };
};