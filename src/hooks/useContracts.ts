import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Contract {
  id: string;
  name: string;
  file_path: string;
  file_size: number;
  status: 'pending' | 'analyzing' | 'reviewed' | 'approved' | 'needs_attention';
  risk_score?: number;
  compliance_score?: number;
  contract_type?: string;
  uploaded_at: string;
  analyzed_at?: string;
}

export interface ContractAnalysis {
  id: string;
  contract_id: string;
  analysis_type: string;
  issue_description: string;
  section_reference?: string;
  severity: 'high' | 'medium' | 'low';
  regulation_reference?: string;
  recommendation?: string;
  suggested_edit?: string;
}

export const useContracts = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [analyses, setAnalyses] = useState<ContractAnalysis[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchContracts = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contracts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContracts((data || []) as Contract[]);
    } catch (error) {
      console.error('Error fetching contracts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch contracts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalyses = async (contractId: string) => {
    try {
      const { data, error } = await supabase
        .from('contract_analyses')
        .select('*')
        .eq('contract_id', contractId);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching analyses:', error);
      return [];
    }
  };

  const uploadContract = async (file: File) => {
    if (!user) throw new Error('User not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    // Upload file to storage
    const { error: uploadError } = await supabase.storage
      .from('contracts')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Create contract record
    const { data, error: insertError } = await supabase
      .from('contracts')
      .insert({
        user_id: user.id,
        name: file.name,
        file_path: fileName,
        file_size: file.size,
        status: 'pending'
      })
      .select()
      .single();

    if (insertError) throw insertError;

    toast({
      title: "Upload Successful",
      description: `${file.name} has been uploaded successfully.`
    });

    return data;
  };

  const analyzeContract = async (contractId: string) => {
    if (!user) return;

    // Update contract status to analyzing
    await supabase
      .from('contracts')
      .update({ status: 'analyzing' })
      .eq('id', contractId);

    // Simulate AI analysis with real data structure
    setTimeout(async () => {
      const mockAnalyses = [
        {
          contract_id: contractId,
          analysis_type: 'Non-Compliance',
          issue_description: 'Indemnity clause does not comply with Indian Contract Act Section 124',
          section_reference: 'Section 8.2',
          severity: 'high' as const,
          regulation_reference: 'Indian Contract Act, 1872',
          recommendation: 'Revise indemnity clause to align with Indian Contract Act provisions.',
          suggested_edit: 'Each party shall indemnify the other against losses arising from their own negligent acts.'
        },
        {
          contract_id: contractId,
          analysis_type: 'Tax Compliance',
          issue_description: 'GST implications not addressed in payment terms',
          section_reference: 'Section 5.3',
          severity: 'medium' as const,
          regulation_reference: 'GST Act, 2017',
          recommendation: 'Include GST compliance clause to avoid tax penalties.',
          suggested_edit: 'All payments shall be inclusive of applicable GST as per GST Act, 2017.'
        }
      ];

      // Insert analyses
      await supabase.from('contract_analyses').insert(mockAnalyses);

      // Update contract with analysis results
      await supabase
        .from('contracts')
        .update({
          status: 'reviewed',
          risk_score: Math.floor(Math.random() * 40) + 60, // 60-100
          compliance_score: Math.floor(Math.random() * 30) + 70, // 70-100
          analyzed_at: new Date().toISOString()
        })
        .eq('id', contractId);

      fetchContracts();
      toast({
        title: "Analysis Complete",
        description: "Contract analysis finished successfully."
      });
    }, 3000);
  };

  const downloadContract = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('contracts')
        .download(filePath);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading contract:', error);
      toast({
        title: "Download Failed",
        description: "Failed to download contract",
        variant: "destructive"
      });
    }
  };

  const deleteContract = async (contractId: string, filePath: string) => {
    try {
      // Delete file from storage
      await supabase.storage
        .from('contracts')
        .remove([filePath]);

      // Delete contract record
      await supabase
        .from('contracts')
        .delete()
        .eq('id', contractId);

      fetchContracts();
      toast({
        title: "Contract Deleted",
        description: "Contract has been deleted successfully."
      });
    } catch (error) {
      console.error('Error deleting contract:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete contract",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (user) {
      fetchContracts();
    }
  }, [user]);

  return {
    contracts,
    analyses,
    loading,
    uploadContract,
    analyzeContract,
    downloadContract,
    deleteContract,
    fetchAnalyses,
    fetchContracts
  };
};