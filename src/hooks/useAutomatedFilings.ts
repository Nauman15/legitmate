import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface FilingType {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  frequency: string;
  documents: string[];
  deadline: string;
}

interface UpcomingFiling {
  id: number;
  name: string;
  type: string;
  description: string;
  dueDate: string;
  daysLeft: number;
  status: string;
  priority: string;
  category: string;
  estimatedTime: string;
  autoStatus: string;
  documents: string[];
  progress: number;
  reminderSent: boolean;
}

interface CompletedFiling {
  name: string;
  filedDate: string;
  status: string;
  category: string;
  acknowledgment: string;
  errorMessage?: string;
}

interface AutomationSetting {
  category: string;
  enabled: boolean;
  filings: string[];
  frequency: string;
  lastUpdated: string;
}

interface AutomatedFilingsData {
  upcomingFilings: UpcomingFiling[];
  completedFilings: CompletedFiling[];
  automationSettings: AutomationSetting[];
  upcomingCount: number;
  autoEnabledCount: number;
  successRate: number;
  overdueCount: number;
}

export const useAutomatedFilings = () => {
  const { user } = useAuth();
  const [filingsData, setFilingsData] = useState<AutomatedFilingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAutomatedFilings = async () => {
    if (!user?.id) {
      setFilingsData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch data from filing calendar and related tables
      const [filingCalendarResponse, businessIntegrationsResponse] = await Promise.all([
        supabase.from('filing_calendar').select('*').eq('user_id', user.id),
        supabase.from('business_integrations').select('*').eq('user_id', user.id)
      ]);

      const filings = filingCalendarResponse.data || [];
      const integrations = businessIntegrationsResponse.data || [];

      // Calculate metrics from real data
      const upcomingFilings = filings.filter(f => f.status === 'pending' || f.status === 'in_progress');
      const completedFilings = filings.filter(f => f.status === 'completed' || f.status === 'filed');
      const overdueFilings = filings.filter(f => {
        const dueDate = new Date(f.due_date);
        const now = new Date();
        return dueDate < now && (f.status === 'pending' || f.status === 'in_progress');
      });

      const totalFilings = filings.length;
      const successfulFilings = filings.filter(f => f.status === 'completed' || f.status === 'filed').length;
      const successRate = totalFilings > 0 ? Math.round((successfulFilings / totalFilings) * 100) : 0;

      // Count active integrations (automation enabled)
      const activeIntegrations = integrations.filter(i => i.status === 'active').length;

      const automatedFilingsData: AutomatedFilingsData = {
        upcomingFilings: upcomingFilings.map((filing, index) => ({
          id: index + 1,
          name: filing.filing_name,
          type: filing.filing_type,
          description: `${filing.filing_type} filing for ${filing.frequency}`,
          dueDate: filing.due_date,
          daysLeft: Math.ceil((new Date(filing.due_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
          status: filing.status,
          priority: overdueFilings.includes(filing) ? 'high' : 'medium',
          category: filing.filing_type,
          estimatedTime: '1-2 hours',
          autoStatus: activeIntegrations > 0 ? 'enabled' : 'manual',
          documents: ['Required documents'],
          progress: filing.status === 'in_progress' ? 50 : 0,
          reminderSent: filing.notifications_enabled || false
        })),
        completedFilings: completedFilings.map(filing => ({
          name: filing.filing_name,
          filedDate: filing.due_date,
          status: 'success',
          category: filing.filing_type,
          acknowledgment: `ACK${Math.random().toString(36).substr(2, 9)}`
        })),
        automationSettings: [],
        upcomingCount: upcomingFilings.length,
        autoEnabledCount: activeIntegrations,
        successRate,
        overdueCount: overdueFilings.length
      };

      setFilingsData(automatedFilingsData);
    } catch (err) {
      console.error('Error fetching automated filings:', err);
      setError('Failed to load automated filings data');
      setFilingsData(null);
    } finally {
      setLoading(false);
    }
  };

  const createFiling = async (filingData: {
    filing_name: string;
    filing_type: string;
    frequency: string;
    due_date: string;
    business_type?: string;
    state?: string;
  }) => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('filing_calendar')
        .insert({
          user_id: user.id,
          ...filingData,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      await fetchAutomatedFilings(); // Refresh data
      return data;
    } catch (err) {
      console.error('Error creating filing:', err);
      throw err;
    }
  };

  const updateFilingStatus = async (filingId: number, status: string) => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('filing_calendar')
        .update({ status })
        .eq('id', filingId.toString())
        .eq('user_id', user.id);

      if (error) throw error;
      await fetchAutomatedFilings(); // Refresh data
    } catch (err) {
      console.error('Error updating filing status:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchAutomatedFilings();
  }, [user?.id]);

  const refreshData = () => {
    fetchAutomatedFilings();
  };

  return {
    filingsData,
    loading,
    error,
    refreshData,
    createFiling,
    updateFilingStatus,
    // Helper functions
    hasData: filingsData !== null && (filingsData.upcomingCount > 0 || filingsData.automationSettings.length > 0),
    isEmpty: !loading && (!filingsData || (filingsData.upcomingCount === 0 && filingsData.autoEnabledCount === 0))
  };
};