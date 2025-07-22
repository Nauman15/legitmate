
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

      // Mock data until database types are updated
      const mockFilings: FilingDeadline[] = [
        {
          id: '1',
          filingType: 'GST Return (GSTR-1)',
          dueDate: '2024-01-11',
          status: 'pending',
          penaltyRisk: 'medium'
        },
        {
          id: '2',
          filingType: 'GST Return (GSTR-3B)',
          dueDate: '2024-01-20',
          status: 'pending',
          penaltyRisk: 'high'
        },
        {
          id: '3',
          filingType: 'TDS Return',
          dueDate: '2024-01-31',
          status: 'pending',
          penaltyRisk: 'low'
        }
      ];

      const mockAlerts: RiskAlert[] = [
        {
          id: '1',
          type: 'regulatory_change',
          title: 'New GST Rate Changes Effective',
          description: 'GST rates for certain goods have been updated. Review your product classifications.',
          severity: 'medium',
          actionRequired: true,
          dueDate: '2024-01-15'
        },
        {
          id: '2',
          type: 'filing_deadline',
          title: 'GSTR-1 Filing Due Soon',
          description: 'Your GSTR-1 return is due in 3 days. Ensure all invoices are uploaded.',
          severity: 'high',
          actionRequired: true,
          dueDate: '2024-01-11'
        }
      ];

      const mockPoshCompliance: POSHCompliance = {
        committeeFormed: true,
        annualReportFiled: false,
        trainingConducted: true,
        nextTrainingDue: '2024-06-15',
        complianceStatus: 'partial'
      };

      const mockDpdpCompliance: DPDPCompliance = {
        dataMappingCompleted: false,
        consentManagementSetup: false,
        privacyPolicyUpdated: true,
        dataProtectionOfficerAppointed: false,
        complianceScore: 60
      };

      // Calculate overall compliance score
      const calculateComplianceScore = () => {
        let score = 70; // Base score
        
        if (mockPoshCompliance.committeeFormed) score += 10;
        if (mockPoshCompliance.annualReportFiled) score += 10;
        if (mockDpdpCompliance.dataMappingCompleted) score += 5;
        if (mockDpdpCompliance.consentManagementSetup) score += 5;
        
        return Math.min(score, 100);
      };

      const complianceData: IndianComplianceData = {
        complianceScore: calculateComplianceScore(),
        nextFilingDeadlines: mockFilings,
        riskAlerts: mockAlerts,
        poshCompliance: mockPoshCompliance,
        dpdpCompliance: mockDpdpCompliance
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
