import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.269/pdf.worker.min.js`;

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
  // New Phase 2 fields
  category?: string;
  version?: number;
  parent_contract_id?: string;
  tags?: string[];
  priority_level?: 'high' | 'medium' | 'low';
  renewal_date?: string;
  expiry_date?: string;
  counterparty_name?: string;
  counterparty_details?: Record<string, any>;
  document_hash?: string;
  extracted_text?: string;
}

export interface ContractCategory {
  id: string;
  name: string;
  description?: string;
  keywords?: string[];
  analysis_rules?: any;
  template_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ContractTemplate {
  id: string;
  name: string;
  description?: string;
  category_id?: string;
  template_content?: string;
  fields_config?: any;
  is_public?: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
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
  const [categories, setCategories] = useState<ContractCategory[]>([]);
  const [templates, setTemplates] = useState<ContractTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
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

  // PDF text extraction function
  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
      }

      return fullText;
    } catch (error) {
      console.error('Error extracting PDF text:', error);
      return '';
    }
  };

  // Auto-categorization based on keywords
  const categorizeContract = (text: string, categories: ContractCategory[]): string | undefined => {
    const lowercaseText = text.toLowerCase();
    
    for (const category of categories) {
      if (category.keywords && category.keywords.length > 0) {
        const matchCount = category.keywords.filter(keyword => 
          lowercaseText.includes(keyword.toLowerCase())
        ).length;
        
        // Return category if at least 30% of keywords match
        if (matchCount >= Math.ceil(category.keywords.length * 0.3)) {
          return category.name;
        }
      }
    }
    
    return undefined;
  };

  // Generate document hash for version control
  const generateDocumentHash = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('contract_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
      return data || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };

  // Fetch templates
  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('contract_templates')
        .select('*')
        .order('name');

      if (error) throw error;
      setTemplates(data || []);
      return data || [];
    } catch (error) {
      console.error('Error fetching templates:', error);
      return [];
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

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Extract text from PDF
      const extractedText = await extractTextFromPDF(file);
      
      // Generate document hash
      const documentHash = await generateDocumentHash(file);
      
      // Get categories for auto-categorization
      const currentCategories = categories.length > 0 ? categories : await fetchCategories();
      
      // Auto-categorize contract
      const detectedCategory = categorizeContract(extractedText, currentCategories);

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('contracts')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Create contract record with enhanced fields
      const { data, error: insertError } = await supabase
        .from('contracts')
        .insert({
          user_id: user.id,
          name: file.name,
          file_path: fileName,
          file_size: file.size,
          status: 'pending',
          category: detectedCategory,
          document_hash: documentHash,
          extracted_text: extractedText,
          priority_level: 'medium',
          version: 1,
          tags: []
        })
        .select()
        .single();

      if (insertError) throw insertError;

      toast({
        title: "Upload Successful",
        description: `${file.name} has been uploaded successfully.`
      });

      return data;
    } finally {
      setUploading(false);
    }
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
      fetchCategories();
      fetchTemplates();
    }
  }, [user]);

  return {
    contracts,
    analyses,
    categories,
    templates,
    loading,
    uploading,
    uploadContract,
    analyzeContract,
    downloadContract,
    deleteContract,
    fetchAnalyses,
    fetchContracts,
    fetchCategories,
    fetchTemplates,
    extractTextFromPDF,
    categorizeContract,
    generateDocumentHash
  };
};