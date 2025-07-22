import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface GovernmentNotification {
  id: string;
  source: string;
  notification_type: string;
  title: string;
  content: string;
  notification_date: string;
  effective_date?: string;
  applicable_to: string[];
  impact_level: 'low' | 'medium' | 'high' | 'critical';
  tags?: string[];
  url?: string;
  processed: boolean;
  created_at: string;
}

export const useGovernmentNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<GovernmentNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('government_notifications')
        .select('*')
        .order('notification_date', { ascending: false })
        .limit(50);

      if (fetchError) throw fetchError;

      setNotifications(data as GovernmentNotification[] || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching government notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredNotifications = (filters: {
    source?: string;
    impact_level?: string;
    applicable_to?: string;
  }) => {
    return notifications.filter(notification => {
      if (filters.source && notification.source !== filters.source) return false;
      if (filters.impact_level && notification.impact_level !== filters.impact_level) return false;
      if (filters.applicable_to && !notification.applicable_to.includes(filters.applicable_to)) return false;
      return true;
    });
  };

  const getRecentNotifications = (days: number = 30) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return notifications.filter(notification => 
      new Date(notification.notification_date) > cutoffDate
    );
  };

  const getCriticalNotifications = () => {
    return notifications.filter(notification => notification.impact_level === 'critical');
  };

  const markAsProcessed = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('government_notifications')
        .update({ processed: true })
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId ? { ...n, processed: true } : n
        )
      );
    } catch (err: any) {
      console.error('Error marking notification as processed:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    loading,
    error,
    refetch: fetchNotifications,
    getFilteredNotifications,
    getRecentNotifications,
    getCriticalNotifications,
    markAsProcessed
  };
};