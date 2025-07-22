
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

      // Fetch filing calendar
      const { data: filings, error: filingsError } = await supabase
        .from('filing_calendar')
        .select('*')
        .eq('user_id', user.id)
        .order('due_date', { ascending: true })
        .limit(10);

      if (filingsError) throw filingsError;

      // Fetch regulatory alerts
      const { data: alerts, error: alertsError } = await supabase
        .from('regulatory_alerts')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (alertsError) throw alertsError;

      // Fetch POSH compliance
      const { data: poshData, error: poshError } = await supabase
        .from('posh_compliance')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Fetch DPDP compliance
      const { data: dpdpData, error: dpdpError } = await supabase
        .from('dpdp_compliance')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Calculate overall compliance score
      const calculateComplianceScore = () => {
        let score = 70; // Base score
        
        if (poshData?.committee_formed) score += 10;
        if (poshData?.annual_report_filed) score += 10;
        if (dpdpData?.data_mapping_completed) score += 5;
        if (dpdpData?.consent_management_setup) score += 5;
        
        return Math.min(score, 100);
      };

      const nextFilingDeadlines: FilingDeadline[] = filings?.map(filing => ({
        id: filing.id,
        filingType: filing.filing_name,
        dueDate: filing.due_date,
        status: filing.status,
        penaltyRisk: filing.penalty_amount > 10000 ? 'high' : 
                    filing.penalty_amount > 1000 ? 'medium' : 'low'
      })) || [];

      const riskAlerts: RiskAlert[] = alerts?.map(alert => ({
        id: alert.id,
        type: alert.alert_type as any,
        title: alert.title,
        description: alert.description,
        severity: alert.impact_level as any,
        actionRequired: alert.action_required,
        dueDate: alert.due_date
      })) || [];

      const complianceData: IndianComplianceData = {
        complianceScore: calculateComplianceScore(),
        nextFilingDeadlines,
        riskAlerts,
        poshCompliance: poshData ? {
          committeeFormed: poshData.committee_formed,
          annualReportFiled: poshData.annual_report_filed,
          trainingConducted: poshData.training_conducted,
          nextTrainingDue: poshData.next_training_due,
          complianceStatus: poshData.compliance_status
        } : undefined,
        dpdpCompliance: dpdpData ? {
          dataMappingCompleted: dpdpData.data_mapping_completed,
          consentManagementSetup: dpdpData.consent_management_setup,
          privacyPolicyUpdated: dpdpData.privacy_policy_updated,
          dataProtectionOfficerAppointed: dpdpData.data_protection_officer_appointed,
          complianceScore: dpdpData.compliance_score
        } : undefined
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

    try {
      const { error } = await supabase
        .from('posh_compliance')
        .upsert({
          user_id: user.id,
          committee_formed: updates.committeeFormed,
          annual_report_filed: updates.annualReportFiled,
          training_conducted: updates.trainingConducted,
          compliance_status: updates.complianceStatus
        });

      if (error) throw error;
      await fetchComplianceData();
    } catch (err) {
      console.error('Error updating POSH compliance:', err);
      throw err;
    }
  };

  const updateDPDPCompliance = async (updates: Partial<DPDPCompliance>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('dpdp_compliance')
        .upsert({
          user_id: user.id,
          data_mapping_completed: updates.dataMappingCompleted,
          consent_management_setup: updates.consentManagementSetup,
          privacy_policy_updated: updates.privacyPolicyUpdated,
          data_protection_officer_appointed: updates.dataProtectionOfficerAppointed,
          compliance_score: updates.complianceScore
        });

      if (error) throw error;
      await fetchComplianceData();
    } catch (err) {
      console.error('Error updating DPDP compliance:', err);
      throw err;
    }
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
