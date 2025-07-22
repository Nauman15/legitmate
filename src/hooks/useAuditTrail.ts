import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface AuditTrailEntry {
  id: string;
  user_id?: string;
  action: string;
  table_name?: string;
  record_id?: string;
  old_values?: any;
  new_values?: any;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export const useAuditTrail = (limit = 50) => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<AuditTrailEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAuditTrail = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: auditError } = await supabase
        .from('audit_trail')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (auditError) throw auditError;

      setEntries((data as AuditTrailEntry[]) || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching audit trail:', err);
    } finally {
      setLoading(false);
    }
  };

  const logAction = async (
    action: string,
    tableName?: string,
    recordId?: string,
    oldValues?: any,
    newValues?: any
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase.rpc('log_audit_trail', {
        p_action: action,
        p_table_name: tableName,
        p_record_id: recordId,
        p_old_values: oldValues,
        p_new_values: newValues,
      });

      if (error) throw error;

      // Refresh the audit trail after logging
      fetchAuditTrail();
    } catch (err: any) {
      console.error('Error logging audit trail:', err);
    }
  };

  useEffect(() => {
    fetchAuditTrail();
  }, [user, limit]);

  return {
    entries,
    loading,
    error,
    refetch: fetchAuditTrail,
    logAction,
  };
};