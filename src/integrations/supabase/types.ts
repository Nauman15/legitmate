export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      audit_trail: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      business_integrations: {
        Row: {
          created_at: string | null
          credentials_encrypted: Json | null
          id: string
          integration_name: string
          integration_type: string
          last_sync: string | null
          metadata: Json | null
          status: string | null
          sync_frequency: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          credentials_encrypted?: Json | null
          id?: string
          integration_name: string
          integration_type: string
          last_sync?: string | null
          metadata?: Json | null
          status?: string | null
          sync_frequency?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          credentials_encrypted?: Json | null
          id?: string
          integration_name?: string
          integration_type?: string
          last_sync?: string | null
          metadata?: Json | null
          status?: string | null
          sync_frequency?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      compliance_tasks: {
        Row: {
          assigned_to: string | null
          attachments: Json | null
          completed_at: string | null
          completion_notes: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          priority: string | null
          related_contract_id: string | null
          related_filing_id: string | null
          reminder_sent: boolean | null
          status: string | null
          task_type: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          assigned_to?: string | null
          attachments?: Json | null
          completed_at?: string | null
          completion_notes?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          related_contract_id?: string | null
          related_filing_id?: string | null
          reminder_sent?: boolean | null
          status?: string | null
          task_type: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          assigned_to?: string | null
          attachments?: Json | null
          completed_at?: string | null
          completion_notes?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          related_contract_id?: string | null
          related_filing_id?: string | null
          reminder_sent?: boolean | null
          status?: string | null
          task_type?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      compliance_templates: {
        Row: {
          business_type: string | null
          checklist_items: Json
          created_at: string | null
          created_by: string | null
          filing_calendar: Json | null
          id: string
          industry: string
          is_active: boolean | null
          name: string
          risk_factors: Json | null
          state: string | null
          updated_at: string | null
        }
        Insert: {
          business_type?: string | null
          checklist_items?: Json
          created_at?: string | null
          created_by?: string | null
          filing_calendar?: Json | null
          id?: string
          industry: string
          is_active?: boolean | null
          name: string
          risk_factors?: Json | null
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          business_type?: string | null
          checklist_items?: Json
          created_at?: string | null
          created_by?: string | null
          filing_calendar?: Json | null
          id?: string
          industry?: string
          is_active?: boolean | null
          name?: string
          risk_factors?: Json | null
          state?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contract_analyses: {
        Row: {
          analysis_type: string
          contract_id: string
          created_at: string
          id: string
          issue_description: string
          recommendation: string | null
          regulation_reference: string | null
          section_reference: string | null
          severity: string
          suggested_edit: string | null
        }
        Insert: {
          analysis_type: string
          contract_id: string
          created_at?: string
          id?: string
          issue_description: string
          recommendation?: string | null
          regulation_reference?: string | null
          section_reference?: string | null
          severity: string
          suggested_edit?: string | null
        }
        Update: {
          analysis_type?: string
          contract_id?: string
          created_at?: string
          id?: string
          issue_description?: string
          recommendation?: string | null
          regulation_reference?: string | null
          section_reference?: string | null
          severity?: string
          suggested_edit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_analyses_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_categories: {
        Row: {
          analysis_rules: Json | null
          created_at: string
          description: string | null
          id: string
          keywords: string[] | null
          name: string
          template_id: string | null
          updated_at: string
        }
        Insert: {
          analysis_rules?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          keywords?: string[] | null
          name: string
          template_id?: string | null
          updated_at?: string
        }
        Update: {
          analysis_rules?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          keywords?: string[] | null
          name?: string
          template_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      contract_revisions: {
        Row: {
          changes_summary: string | null
          contract_id: string
          created_at: string
          created_by: string | null
          document_hash: string | null
          file_path: string
          file_size: number
          id: string
          version_number: number
        }
        Insert: {
          changes_summary?: string | null
          contract_id: string
          created_at?: string
          created_by?: string | null
          document_hash?: string | null
          file_path: string
          file_size: number
          id?: string
          version_number: number
        }
        Update: {
          changes_summary?: string | null
          contract_id?: string
          created_at?: string
          created_by?: string | null
          document_hash?: string | null
          file_path?: string
          file_size?: number
          id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "contract_revisions_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_templates: {
        Row: {
          category_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          fields_config: Json | null
          id: string
          is_public: boolean | null
          name: string
          template_content: string | null
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          fields_config?: Json | null
          id?: string
          is_public?: boolean | null
          name: string
          template_content?: string | null
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          fields_config?: Json | null
          id?: string
          is_public?: boolean | null
          name?: string
          template_content?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contract_templates_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "contract_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          analyzed_at: string | null
          category: string | null
          compliance_score: number | null
          contract_type: string | null
          counterparty_details: Json | null
          counterparty_name: string | null
          created_at: string
          document_hash: string | null
          expiry_date: string | null
          extracted_text: string | null
          file_path: string
          file_size: number
          id: string
          name: string
          parent_contract_id: string | null
          priority_level: string | null
          renewal_date: string | null
          risk_score: number | null
          status: string
          tags: Json | null
          updated_at: string
          uploaded_at: string
          user_id: string
          version: number | null
        }
        Insert: {
          analyzed_at?: string | null
          category?: string | null
          compliance_score?: number | null
          contract_type?: string | null
          counterparty_details?: Json | null
          counterparty_name?: string | null
          created_at?: string
          document_hash?: string | null
          expiry_date?: string | null
          extracted_text?: string | null
          file_path: string
          file_size: number
          id?: string
          name: string
          parent_contract_id?: string | null
          priority_level?: string | null
          renewal_date?: string | null
          risk_score?: number | null
          status?: string
          tags?: Json | null
          updated_at?: string
          uploaded_at?: string
          user_id: string
          version?: number | null
        }
        Update: {
          analyzed_at?: string | null
          category?: string | null
          compliance_score?: number | null
          contract_type?: string | null
          counterparty_details?: Json | null
          counterparty_name?: string | null
          created_at?: string
          document_hash?: string | null
          expiry_date?: string | null
          extracted_text?: string | null
          file_path?: string
          file_size?: number
          id?: string
          name?: string
          parent_contract_id?: string | null
          priority_level?: string | null
          renewal_date?: string | null
          risk_score?: number | null
          status?: string
          tags?: Json | null
          updated_at?: string
          uploaded_at?: string
          user_id?: string
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contracts_parent_contract_id_fkey"
            columns: ["parent_contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      dpdp_compliance: {
        Row: {
          breach_notification_process: boolean | null
          compliance_score: number | null
          consent_management_setup: boolean | null
          consent_records: Json | null
          created_at: string
          cross_border_transfers: Json | null
          data_categories: Json | null
          data_localization_compliant: boolean | null
          data_mapping_completed: boolean | null
          data_protection_officer_appointed: boolean | null
          id: string
          last_audit_date: string | null
          next_audit_due: string | null
          privacy_policy_updated: boolean | null
          processing_purposes: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          breach_notification_process?: boolean | null
          compliance_score?: number | null
          consent_management_setup?: boolean | null
          consent_records?: Json | null
          created_at?: string
          cross_border_transfers?: Json | null
          data_categories?: Json | null
          data_localization_compliant?: boolean | null
          data_mapping_completed?: boolean | null
          data_protection_officer_appointed?: boolean | null
          id?: string
          last_audit_date?: string | null
          next_audit_due?: string | null
          privacy_policy_updated?: boolean | null
          processing_purposes?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          breach_notification_process?: boolean | null
          compliance_score?: number | null
          consent_management_setup?: boolean | null
          consent_records?: Json | null
          created_at?: string
          cross_border_transfers?: Json | null
          data_categories?: Json | null
          data_localization_compliant?: boolean | null
          data_mapping_completed?: boolean | null
          data_protection_officer_appointed?: boolean | null
          id?: string
          last_audit_date?: string | null
          next_audit_due?: string | null
          privacy_policy_updated?: boolean | null
          processing_purposes?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      filing_calendar: {
        Row: {
          auto_calculate_penalty: boolean | null
          business_type: string | null
          created_at: string
          due_date: string
          filing_name: string
          filing_type: string
          frequency: string
          id: string
          notifications_enabled: boolean | null
          penalty_amount: number | null
          state: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_calculate_penalty?: boolean | null
          business_type?: string | null
          created_at?: string
          due_date: string
          filing_name: string
          filing_type: string
          frequency: string
          id?: string
          notifications_enabled?: boolean | null
          penalty_amount?: number | null
          state?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_calculate_penalty?: boolean | null
          business_type?: string | null
          created_at?: string
          due_date?: string
          filing_name?: string
          filing_type?: string
          frequency?: string
          id?: string
          notifications_enabled?: boolean | null
          penalty_amount?: number | null
          state?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      government_notifications: {
        Row: {
          applicable_to: string[] | null
          content: string
          created_at: string | null
          effective_date: string | null
          id: string
          impact_level: string | null
          notification_date: string
          notification_type: string
          processed: boolean | null
          source: string
          tags: string[] | null
          title: string
          url: string | null
        }
        Insert: {
          applicable_to?: string[] | null
          content: string
          created_at?: string | null
          effective_date?: string | null
          id?: string
          impact_level?: string | null
          notification_date: string
          notification_type: string
          processed?: boolean | null
          source: string
          tags?: string[] | null
          title: string
          url?: string | null
        }
        Update: {
          applicable_to?: string[] | null
          content?: string
          created_at?: string | null
          effective_date?: string | null
          id?: string
          impact_level?: string | null
          notification_date?: string
          notification_type?: string
          processed?: boolean | null
          source?: string
          tags?: string[] | null
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      gst_classifications: {
        Row: {
          category: string | null
          cess_rate: number | null
          cgst_rate: number
          created_at: string
          description: string
          hsn_code: string
          id: string
          igst_rate: number
          is_active: boolean | null
          sgst_rate: number
          updated_at: string
        }
        Insert: {
          category?: string | null
          cess_rate?: number | null
          cgst_rate?: number
          created_at?: string
          description: string
          hsn_code: string
          id?: string
          igst_rate?: number
          is_active?: boolean | null
          sgst_rate?: number
          updated_at?: string
        }
        Update: {
          category?: string | null
          cess_rate?: number | null
          cgst_rate?: number
          created_at?: string
          description?: string
          hsn_code?: string
          id?: string
          igst_rate?: number
          is_active?: boolean | null
          sgst_rate?: number
          updated_at?: string
        }
        Relationships: []
      }
      indian_contract_categories: {
        Row: {
          applicable_laws: string[] | null
          compliance_checklist: Json | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          mandatory_clauses: string[] | null
          name: string
          risk_factors: string[] | null
          template_content: string | null
          updated_at: string
        }
        Insert: {
          applicable_laws?: string[] | null
          compliance_checklist?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          mandatory_clauses?: string[] | null
          name: string
          risk_factors?: string[] | null
          template_content?: string | null
          updated_at?: string
        }
        Update: {
          applicable_laws?: string[] | null
          compliance_checklist?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          mandatory_clauses?: string[] | null
          name?: string
          risk_factors?: string[] | null
          template_content?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      indian_regulations: {
        Row: {
          compliance_requirements: Json | null
          created_at: string
          description: string | null
          effective_date: string | null
          id: string
          last_updated: string | null
          penalties: Json | null
          regulation_text: string | null
          regulation_type: string
          title: string
          updated_at: string
        }
        Insert: {
          compliance_requirements?: Json | null
          created_at?: string
          description?: string | null
          effective_date?: string | null
          id?: string
          last_updated?: string | null
          penalties?: Json | null
          regulation_text?: string | null
          regulation_type: string
          title: string
          updated_at?: string
        }
        Update: {
          compliance_requirements?: Json | null
          created_at?: string
          description?: string | null
          effective_date?: string | null
          id?: string
          last_updated?: string | null
          penalties?: Json | null
          regulation_text?: string | null
          regulation_type?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          contract_alerts: boolean | null
          created_at: string | null
          digest_frequency: string | null
          email_enabled: boolean | null
          filing_reminders: boolean | null
          id: string
          push_enabled: boolean | null
          regulatory_updates: boolean | null
          risk_alerts: boolean | null
          sms_enabled: boolean | null
          updated_at: string | null
          user_id: string
          whatsapp_enabled: boolean | null
        }
        Insert: {
          contract_alerts?: boolean | null
          created_at?: string | null
          digest_frequency?: string | null
          email_enabled?: boolean | null
          filing_reminders?: boolean | null
          id?: string
          push_enabled?: boolean | null
          regulatory_updates?: boolean | null
          risk_alerts?: boolean | null
          sms_enabled?: boolean | null
          updated_at?: string | null
          user_id: string
          whatsapp_enabled?: boolean | null
        }
        Update: {
          contract_alerts?: boolean | null
          created_at?: string | null
          digest_frequency?: string | null
          email_enabled?: boolean | null
          filing_reminders?: boolean | null
          id?: string
          push_enabled?: boolean | null
          regulatory_updates?: boolean | null
          risk_alerts?: boolean | null
          sms_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string
          whatsapp_enabled?: boolean | null
        }
        Relationships: []
      }
      posh_compliance: {
        Row: {
          annual_report_due: string | null
          annual_report_filed: boolean | null
          committee_formed: boolean | null
          committee_members: Json | null
          complaints_received: number | null
          complaints_resolved: number | null
          compliance_status: string | null
          created_at: string
          id: string
          next_training_due: string | null
          policy_displayed: boolean | null
          training_conducted: boolean | null
          training_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          annual_report_due?: string | null
          annual_report_filed?: boolean | null
          committee_formed?: boolean | null
          committee_members?: Json | null
          complaints_received?: number | null
          complaints_resolved?: number | null
          compliance_status?: string | null
          created_at?: string
          id?: string
          next_training_due?: string | null
          policy_displayed?: boolean | null
          training_conducted?: boolean | null
          training_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          annual_report_due?: string | null
          annual_report_filed?: boolean | null
          committee_formed?: boolean | null
          committee_members?: Json | null
          complaints_received?: number | null
          complaints_resolved?: number | null
          compliance_status?: string | null
          created_at?: string
          id?: string
          next_training_due?: string | null
          policy_displayed?: boolean | null
          training_conducted?: boolean | null
          training_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          annual_turnover: number | null
          business_city: string | null
          business_name: string | null
          business_pincode: string | null
          business_state: string | null
          business_type: string | null
          company_size: string | null
          compliance_requirements: string[] | null
          compliance_status: Json | null
          created_at: string
          description: string | null
          employee_count: number | null
          gst_number: string | null
          id: string
          incorporation_date: string | null
          industry: string | null
          language_preference: string | null
          location: string | null
          notification_preferences: Json | null
          onboarding_completed: boolean | null
          pan_number: string | null
          phone: string | null
          registration_number: string | null
          sector: string | null
          timezone: string | null
          updated_at: string
          user_id: string
          verification_documents: Json | null
          verified: boolean | null
          website: string | null
        }
        Insert: {
          annual_turnover?: number | null
          business_city?: string | null
          business_name?: string | null
          business_pincode?: string | null
          business_state?: string | null
          business_type?: string | null
          company_size?: string | null
          compliance_requirements?: string[] | null
          compliance_status?: Json | null
          created_at?: string
          description?: string | null
          employee_count?: number | null
          gst_number?: string | null
          id?: string
          incorporation_date?: string | null
          industry?: string | null
          language_preference?: string | null
          location?: string | null
          notification_preferences?: Json | null
          onboarding_completed?: boolean | null
          pan_number?: string | null
          phone?: string | null
          registration_number?: string | null
          sector?: string | null
          timezone?: string | null
          updated_at?: string
          user_id: string
          verification_documents?: Json | null
          verified?: boolean | null
          website?: string | null
        }
        Update: {
          annual_turnover?: number | null
          business_city?: string | null
          business_name?: string | null
          business_pincode?: string | null
          business_state?: string | null
          business_type?: string | null
          company_size?: string | null
          compliance_requirements?: string[] | null
          compliance_status?: Json | null
          created_at?: string
          description?: string | null
          employee_count?: number | null
          gst_number?: string | null
          id?: string
          incorporation_date?: string | null
          industry?: string | null
          language_preference?: string | null
          location?: string | null
          notification_preferences?: Json | null
          onboarding_completed?: boolean | null
          pan_number?: string | null
          phone?: string | null
          registration_number?: string | null
          sector?: string | null
          timezone?: string | null
          updated_at?: string
          user_id?: string
          verification_documents?: Json | null
          verified?: boolean | null
          website?: string | null
        }
        Relationships: []
      }
      regulatory_alerts: {
        Row: {
          action_required: boolean | null
          alert_type: string
          business_impact: string | null
          created_at: string
          description: string
          due_date: string | null
          id: string
          impact_level: string | null
          recommended_actions: string[] | null
          regulation_reference: string | null
          status: string | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          action_required?: boolean | null
          alert_type: string
          business_impact?: string | null
          created_at?: string
          description: string
          due_date?: string | null
          id?: string
          impact_level?: string | null
          recommended_actions?: string[] | null
          regulation_reference?: string | null
          status?: string | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          action_required?: boolean | null
          alert_type?: string
          business_impact?: string | null
          created_at?: string
          description?: string
          due_date?: string | null
          id?: string
          impact_level?: string | null
          recommended_actions?: string[] | null
          regulation_reference?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      log_audit_trail: {
        Args: {
          p_action: string
          p_table_name?: string
          p_record_id?: string
          p_old_values?: Json
          p_new_values?: Json
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "user" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user", "viewer"],
    },
  },
} as const
