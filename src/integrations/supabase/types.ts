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
      profiles: {
        Row: {
          business_name: string | null
          company_size: string | null
          compliance_requirements: string[] | null
          created_at: string
          description: string | null
          id: string
          industry: string | null
          location: string | null
          notification_preferences: Json | null
          phone: string | null
          registration_number: string | null
          sector: string | null
          timezone: string | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          business_name?: string | null
          company_size?: string | null
          compliance_requirements?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          notification_preferences?: Json | null
          phone?: string | null
          registration_number?: string | null
          sector?: string | null
          timezone?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          business_name?: string | null
          company_size?: string | null
          compliance_requirements?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          notification_preferences?: Json | null
          phone?: string | null
          registration_number?: string | null
          sector?: string | null
          timezone?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
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
