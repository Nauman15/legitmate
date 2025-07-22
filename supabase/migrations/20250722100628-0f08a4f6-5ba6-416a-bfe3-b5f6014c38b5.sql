
-- Phase 1: Critical Security & Infrastructure Fixes

-- Fix search_path security issues for existing functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
  INSERT INTO public.profiles (
    user_id, 
    business_name, 
    sector, 
    company_size, 
    location, 
    registration_number,
    industry,
    phone,
    website
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'business_name',
    NEW.raw_user_meta_data ->> 'sector',
    NEW.raw_user_meta_data ->> 'company_size',
    NEW.raw_user_meta_data ->> 'location',
    NEW.raw_user_meta_data ->> 'registration_number',
    NEW.raw_user_meta_data ->> 'industry',
    NEW.raw_user_meta_data ->> 'phone',
    NEW.raw_user_meta_data ->> 'website'
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

CREATE OR REPLACE FUNCTION public.get_user_role(_user_id uuid)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  ORDER BY 
    CASE role 
      WHEN 'admin' THEN 1
      WHEN 'user' THEN 2  
      WHEN 'viewer' THEN 3
    END
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.log_audit_trail(
  p_action text,
  p_table_name text DEFAULT NULL,
  p_record_id uuid DEFAULT NULL,
  p_old_values jsonb DEFAULT NULL,
  p_new_values jsonb DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.audit_trail (
    user_id,
    action,
    table_name,
    record_id,
    old_values,
    new_values
  ) VALUES (
    auth.uid(),
    p_action,
    p_table_name,
    p_record_id,
    p_old_values,
    p_new_values
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.assign_default_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.user_id, 'user');
  
  -- Log the profile creation
  PERFORM public.log_audit_trail(
    'profile_created',
    'profiles',
    NEW.id,
    NULL,
    to_jsonb(NEW)
  );
  
  RETURN NEW;
END;
$$;

-- Enhanced profiles table for Indian business requirements
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS gst_number text,
ADD COLUMN IF NOT EXISTS pan_number text,
ADD COLUMN IF NOT EXISTS business_type text CHECK (business_type IN ('proprietorship', 'partnership', 'llp', 'private_limited', 'public_limited', 'opc', 'ngo', 'trust')),
ADD COLUMN IF NOT EXISTS incorporation_date date,
ADD COLUMN IF NOT EXISTS business_state text,
ADD COLUMN IF NOT EXISTS business_city text,
ADD COLUMN IF NOT EXISTS business_pincode text,
ADD COLUMN IF NOT EXISTS annual_turnover numeric,
ADD COLUMN IF NOT EXISTS employee_count integer,
ADD COLUMN IF NOT EXISTS compliance_status jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS language_preference text DEFAULT 'en',
ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS verified boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS verification_documents jsonb DEFAULT '[]'::jsonb;

-- Create notification preferences table
CREATE TABLE IF NOT EXISTS public.notification_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email_enabled boolean DEFAULT true,
  sms_enabled boolean DEFAULT false,
  push_enabled boolean DEFAULT true,
  whatsapp_enabled boolean DEFAULT false,
  filing_reminders boolean DEFAULT true,
  regulatory_updates boolean DEFAULT true,
  contract_alerts boolean DEFAULT true,
  risk_alerts boolean DEFAULT true,
  digest_frequency text DEFAULT 'weekly' CHECK (digest_frequency IN ('daily', 'weekly', 'monthly')),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create business integrations table for tracking connected systems
CREATE TABLE IF NOT EXISTS public.business_integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  integration_type text NOT NULL,
  integration_name text NOT NULL,
  credentials_encrypted jsonb,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error', 'pending')),
  last_sync timestamp with time zone,
  sync_frequency text DEFAULT 'daily',
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create compliance templates table for industry-specific checklists
CREATE TABLE IF NOT EXISTS public.compliance_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  industry text NOT NULL,
  business_type text,
  state text,
  checklist_items jsonb NOT NULL DEFAULT '[]'::jsonb,
  filing_calendar jsonb DEFAULT '[]'::jsonb,
  risk_factors jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create government notifications table for regulatory updates
CREATE TABLE IF NOT EXISTS public.government_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL, -- 'cbic', 'mca', 'rbi', 'labor_ministry', etc.
  notification_type text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  notification_date date NOT NULL,
  effective_date date,
  applicable_to text[], -- industries, business types, states
  impact_level text DEFAULT 'medium' CHECK (impact_level IN ('low', 'medium', 'high', 'critical')),
  tags text[],
  url text,
  processed boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Create compliance tasks table for workflow management
CREATE TABLE IF NOT EXISTS public.compliance_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  task_type text NOT NULL, -- 'filing', 'renewal', 'audit', 'training', etc.
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'overdue', 'cancelled')),
  due_date date,
  assigned_to uuid REFERENCES auth.users(id),
  related_filing_id uuid,
  related_contract_id uuid,
  completion_notes text,
  attachments jsonb DEFAULT '[]'::jsonb,
  reminder_sent boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone
);

-- Enable RLS on new tables
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.government_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_tasks ENABLE ROW LEVEL SECURITY;

-- RLS policies for notification_preferences
CREATE POLICY "Users can manage their notification preferences" 
ON public.notification_preferences 
FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- RLS policies for business_integrations
CREATE POLICY "Users can manage their integrations" 
ON public.business_integrations 
FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- RLS policies for compliance_templates
CREATE POLICY "Users can view public templates and their own" 
ON public.compliance_templates 
FOR SELECT 
USING (is_active = true OR created_by = auth.uid());

CREATE POLICY "Users can create their own templates" 
ON public.compliance_templates 
FOR INSERT 
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their own templates" 
ON public.compliance_templates 
FOR UPDATE 
USING (created_by = auth.uid());

CREATE POLICY "Admins can manage all templates" 
ON public.compliance_templates 
FOR ALL 
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- RLS policies for government_notifications
CREATE POLICY "Anyone can view government notifications" 
ON public.government_notifications 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage government notifications" 
ON public.government_notifications 
FOR ALL 
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- RLS policies for compliance_tasks
CREATE POLICY "Users can view their tasks or assigned tasks" 
ON public.compliance_tasks 
FOR SELECT 
USING (auth.uid() = user_id OR auth.uid() = assigned_to);

CREATE POLICY "Users can create tasks" 
ON public.compliance_tasks 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their tasks or assigned tasks" 
ON public.compliance_tasks 
FOR UPDATE 
USING (auth.uid() = user_id OR auth.uid() = assigned_to);

CREATE POLICY "Users can delete their tasks" 
ON public.compliance_tasks 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create triggers for timestamp updates
CREATE TRIGGER update_notification_preferences_updated_at
BEFORE UPDATE ON public.notification_preferences
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_business_integrations_updated_at
BEFORE UPDATE ON public.business_integrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_compliance_templates_updated_at
BEFORE UPDATE ON public.compliance_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_compliance_tasks_updated_at
BEFORE UPDATE ON public.compliance_tasks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default compliance templates for common Indian business scenarios
INSERT INTO public.compliance_templates (name, industry, business_type, checklist_items, filing_calendar) VALUES
('IT Services Company - Private Limited', 'Information Technology', 'private_limited', 
  '[
    {"item": "GST Registration", "mandatory": true, "frequency": "once"},
    {"item": "TAN Registration", "mandatory": true, "frequency": "once"},
    {"item": "PF Registration", "mandatory": true, "frequency": "once"},
    {"item": "ESI Registration", "mandatory": true, "frequency": "once"},
    {"item": "Professional Tax Registration", "mandatory": true, "frequency": "once"},
    {"item": "STPI Registration", "mandatory": false, "frequency": "once"},
    {"item": "SEBI Registration", "mandatory": false, "frequency": "once"}
  ]'::jsonb,
  '[
    {"filing": "GSTR-1", "frequency": "monthly", "due_date": 11},
    {"filing": "GSTR-3B", "frequency": "monthly", "due_date": 20},
    {"filing": "TDS Return", "frequency": "quarterly", "due_date": "last_day_of_next_month"},
    {"filing": "PF Return", "frequency": "monthly", "due_date": 15},
    {"filing": "ESI Return", "frequency": "monthly", "due_date": 15},
    {"filing": "Annual Return", "frequency": "annual", "due_date": "60_days_after_agm"}
  ]'::jsonb),
  
('Manufacturing Company - Private Limited', 'Manufacturing', 'private_limited',
  '[
    {"item": "GST Registration", "mandatory": true, "frequency": "once"},
    {"item": "Factory License", "mandatory": true, "frequency": "annual"},
    {"item": "Pollution Clearance", "mandatory": true, "frequency": "annual"},
    {"item": "Labor License", "mandatory": true, "frequency": "annual"},
    {"item": "Fire Safety Certificate", "mandatory": true, "frequency": "annual"},
    {"item": "Boiler Registration", "mandatory": false, "frequency": "once"}
  ]'::jsonb,
  '[
    {"filing": "GSTR-1", "frequency": "monthly", "due_date": 11},
    {"filing": "GSTR-3B", "frequency": "monthly", "due_date": 20},
    {"filing": "Factory Return", "frequency": "annual", "due_date": "31-jan"},
    {"filing": "Pollution Return", "frequency": "annual", "due_date": "31-may"},
    {"filing": "Labor Return", "frequency": "annual", "due_date": "31-jan"}
  ]'::jsonb)
ON CONFLICT DO NOTHING;

-- Insert sample government notifications
INSERT INTO public.government_notifications (source, notification_type, title, content, notification_date, applicable_to, impact_level) VALUES
('cbic', 'gst_rate_change', 'GST Rate Changes Effective from January 2024', 'GST rates for certain goods in the textile sector have been revised. Please review your product classifications.', '2024-01-01', ARRAY['textile', 'manufacturing'], 'high'),
('mca', 'annual_filing', 'Extended Due Date for Annual Return Filing', 'Due to technical issues, the due date for Annual Return filing has been extended to March 31, 2024.', '2024-01-15', ARRAY['private_limited', 'public_limited'], 'medium'),
('labor_ministry', 'posh_compliance', 'New POSH Training Requirements', 'All companies with more than 10 employees must conduct POSH training sessions quarterly instead of annually.', '2024-01-10', ARRAY['all'], 'high')
ON CONFLICT DO NOTHING;
