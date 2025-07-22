
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface IndianComplianceData {
  gstRegistration?: {
    gstin: string;
    registrationDate: string;
    status: 'active' | 'cancelled' | 'suspended';
  };
  complianceScore: number;
  nextFilingDeadlines: FilingDeadline[];
  riskAlerts: RiskAlert[];
  regulatoryAlerts: RegulatoryAlert[];
  poshCompliance?: POSHCompliance;
  dpdpCompliance?: DPDPCompliance;
}

interface FilingDeadline {
  id: string;
  filingType: string;
  dueDate: string;
  status: 'pending' | 'filed' | 'overdue';
  penaltyRisk: 'low' | 'medium' | 'high';
}

interface RiskAlert {
  id: string;
  type: 'regulatory_change' | 'filing_deadline' | 'penalty_risk' | 'compliance_gap';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  actionRequired: boolean;
  dueDate?: string;
}

interface RegulatoryAlert {
  id: string;
  title: string;
  description: string;
  category: 'gst' | 'labor' | 'company' | 'tax' | 'fema' | 'other';
  priority: 'high' | 'medium' | 'low';
  date: string;
  deadline: string;
  source: string;
  impact: string;
  status: 'new' | 'acknowledged' | 'reviewed' | 'action_taken';
  actionRequired: string;
}

interface POSHCompliance {
  committeeFormed: boolean;
  annualReportFiled: boolean;
  trainingConducted: boolean;
  nextTrainingDue?: string;
  complianceStatus: 'compliant' | 'partial' | 'non_compliant';
}

interface DPDPCompliance {
  dataMappingCompleted: boolean;
  consentManagementSetup: boolean;
  privacyPolicyUpdated: boolean;
  dataProtectionOfficerAppointed: boolean;
  complianceScore: number;
}

export const useIndianCompliance = () => {
  const { user } = useAuth();
  const [complianceData, setComplianceData] = useState<IndianComplianceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComplianceData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // Return empty state to encourage setup actions
      const complianceData: IndianComplianceData = {
        complianceScore: 0,
        nextFilingDeadlines: [],
        riskAlerts: [],
        regulatoryAlerts: [],
        poshCompliance: undefined,
        dpdpCompliance: undefined
      };

      setComplianceData(complianceData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch compliance data');
      console.error('Error fetching compliance data:', err);
    } finally {
      setLoading(false);
    }
  };

  const updatePOSHCompliance = async (updates: Partial<POSHCompliance>) => {
    if (!user) return;
    
    // Mock update - will be implemented when database types are available
    console.log('POSH compliance update:', updates);
    await fetchComplianceData();
  };

  const updateDPDPCompliance = async (updates: Partial<DPDPCompliance>) => {
    if (!user) return;
    
    // Mock update - will be implemented when database types are available  
    console.log('DPDP compliance update:', updates);
    await fetchComplianceData();
  };

  // Get dynamic counts for alerts by priority
  const getAlertStats = () => {
    if (!complianceData) return { high: 0, medium: 0, reviewed: 0, actionRequired: 0 };
    
    const alerts = complianceData.regulatoryAlerts;
    return {
      high: alerts.filter(alert => alert.priority === 'high').length,
      medium: alerts.filter(alert => alert.priority === 'medium').length,
      reviewed: alerts.filter(alert => alert.status === 'reviewed').length,
      actionRequired: alerts.filter(alert => alert.status === 'new' && alert.actionRequired).length
    };
  };

  // Get alert counts by category
  const getAlertCategoryCounts = () => {
    if (!complianceData) return { all: 0, gst: 0, labor: 0, company: 0, tax: 0, fema: 0 };
    
    const alerts = complianceData.regulatoryAlerts;
    return {
      all: alerts.length,
      gst: alerts.filter(alert => alert.category === 'gst').length,
      labor: alerts.filter(alert => alert.category === 'labor').length,
      company: alerts.filter(alert => alert.category === 'company').length,
      tax: alerts.filter(alert => alert.category === 'tax').length,
      fema: alerts.filter(alert => alert.category === 'fema').length
    };
  };

  // Get count of critical alerts for sidebar badge
  const getCriticalAlertsCount = () => {
    if (!complianceData) return 0;
    
    return complianceData.regulatoryAlerts.filter(alert => 
      alert.priority === 'high' && alert.status === 'new'
    ).length;
  };

  useEffect(() => {
    fetchComplianceData();
  }, [user]);

  return {
    complianceData,
    loading,
    error,
    refreshCompliance: fetchComplianceData,
    updatePOSHCompliance,
    updateDPDPCompliance,
    getAlertStats,
    getAlertCategoryCounts,
    getCriticalAlertsCount
  };
};
