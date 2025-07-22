import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id: string;
  user_id: string;
  business_name?: string;
  sector?: string;
  company_size?: string;
  location?: string;
  registration_number?: string;
  industry?: string;
  phone?: string;
  website?: string;
  description?: string;
  timezone: string;
  notification_preferences: any;
  compliance_requirements?: string[];
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'user' | 'viewer';
  assigned_by?: string;
  assigned_at: string;
  created_at: string;
}

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      // Fetch user role
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (roleError && roleError.code !== 'PGRST116') {
        throw roleError;
      }

      setProfile(profileData);
      setRole(roleData);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching user profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !profile) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const hasRole = (requiredRole: 'admin' | 'user' | 'viewer') => {
    if (!role) return false;
    
    const roleHierarchy = { admin: 3, user: 2, viewer: 1 };
    return roleHierarchy[role.role] >= roleHierarchy[requiredRole];
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    role,
    loading,
    error,
    updateProfile,
    refetch: fetchProfile,
    hasRole,
    isAdmin: hasRole('admin'),
    isUser: hasRole('user'),
    isViewer: hasRole('viewer'),
  };
};