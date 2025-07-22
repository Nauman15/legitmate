import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface PolicyCategory {
  name: string;
  count: number;
  compliance: number;
  color: string;
  icon: any;
}

interface Policy {
  id: number;
  name: string;
  category: string;
  version: string;
  lastUpdated: string;
  status: string;
  compliance: number;
  acknowledgments: number;
  totalEmployees: number;
  nextReview: string;
  owner: string;
}

interface ComplianceReport {
  policy: string;
  department: string;
  compliance: number;
  issues: number;
  lastAudit: string;
}

interface AuditTrailItem {
  id: number;
  document: string;
  action: string;
  analyst: string;
  timestamp: string;
  result: string;
  issues: number;
  score: number;
  details: string;
}

interface ComplianceGap {
  type: string;
  title: string;
  description: string;
  regulation: string;
  recommendation: string;
  priority: string;
}

interface PolicyComplianceData {
  policyCategories: PolicyCategory[];
  policies: Policy[];
  complianceReports: ComplianceReport[];
  auditTrail: AuditTrailItem[];
  complianceGaps: ComplianceGap[];
  overallScore: number;
  totalDocuments: number;
  analyzedDocuments: number;
  criticalIssues: number;
  highIssues: number;
  mediumIssues: number;
  lowIssues: number;
}

export const usePolicyCompliance = () => {
  const { user } = useAuth();
  const [policyData, setPolicyData] = useState<PolicyComplianceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPolicyCompliance = async () => {
    if (!user?.id) {
      setPolicyData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch data from various tables
      const [contractsResponse, alertsResponse, profileResponse] = await Promise.all([
        supabase.from('contracts').select('*').eq('user_id', user.id),
        supabase.from('regulatory_alerts').select('*').eq('user_id', user.id),
        supabase.from('profiles').select('*').eq('user_id', user.id).single()
      ]);

      const contracts = contractsResponse.data || [];
      const alerts = alertsResponse.data || [];
      const profile = profileResponse.data;

      // Calculate metrics from real data
      const totalDocuments = contracts.length;
      const analyzedDocuments = contracts.filter(c => c.status === 'reviewed').length;
      const avgComplianceScore = totalDocuments > 0
        ? Math.round(contracts.reduce((sum, c) => sum + (c.compliance_score || 0), 0) / totalDocuments)
        : 0;

      // Count issues by severity
      const criticalAlerts = alerts.filter(a => a.impact_level === 'high').length;
      const mediumAlerts = alerts.filter(a => a.impact_level === 'medium').length;
      const lowAlerts = alerts.filter(a => a.impact_level === 'low').length;

      const policyComplianceData: PolicyComplianceData = {
        policyCategories: [],
        policies: [],
        complianceReports: [],
        auditTrail: [],
        complianceGaps: [],
        overallScore: avgComplianceScore,
        totalDocuments,
        analyzedDocuments,
        criticalIssues: criticalAlerts,
        highIssues: Math.max(0, criticalAlerts - 1),
        mediumIssues: mediumAlerts,
        lowIssues: lowAlerts
      };

      setPolicyData(policyComplianceData);
    } catch (err) {
      console.error('Error fetching policy compliance:', err);
      setError('Failed to load policy compliance data');
      setPolicyData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicyCompliance();
  }, [user?.id]);

  const refreshData = () => {
    fetchPolicyCompliance();
  };

  return {
    policyData,
    loading,
    error,
    refreshData,
    // Helper functions
    hasData: policyData !== null && (policyData.totalDocuments > 0 || policyData.overallScore > 0),
    isEmpty: !loading && (!policyData || (policyData.totalDocuments === 0 && policyData.overallScore === 0))
  };
};