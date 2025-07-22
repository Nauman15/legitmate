
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

  useEffect(() => {
    fetchComplianceData();
  }, [user]);

  return {
    complianceData,
    loading,
    error,
    refreshCompliance: fetchComplianceData,
    updatePOSHCompliance,
    updateDPDPCompliance
  };
};
