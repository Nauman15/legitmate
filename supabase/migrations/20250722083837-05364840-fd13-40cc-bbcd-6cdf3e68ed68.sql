
-- Enhance contracts table with new columns for Phase 2
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS version INTEGER DEFAULT 1;
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS parent_contract_id UUID REFERENCES public.contracts(id);
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS priority_level TEXT DEFAULT 'medium' CHECK (priority_level IN ('high', 'medium', 'low'));
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS renewal_date DATE;
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS expiry_date DATE;
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS counterparty_name TEXT;
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS counterparty_details JSONB;
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS document_hash TEXT;
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS extracted_text TEXT;

-- Create contract categories table
CREATE TABLE IF NOT EXISTS public.contract_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  keywords TEXT[], -- Array of keywords for auto-classification
  analysis_rules JSONB, -- JSON configuration for category-specific analysis
  template_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contract templates table
CREATE TABLE IF NOT EXISTS public.contract_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category_id UUID REFERENCES public.contract_categories(id),
  template_content TEXT, -- Template with placeholders
  fields_config JSONB, -- Configuration for dynamic fields
  is_public BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contract revisions table for version control
CREATE TABLE IF NOT EXISTS public.contract_revisions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contract_id UUID NOT NULL REFERENCES public.contracts(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  changes_summary TEXT,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  document_hash TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.contract_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contract_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contract_revisions ENABLE ROW LEVEL SECURITY;

-- RLS policies for contract_categories (read-only for users, admin manages)
CREATE POLICY "Anyone can view contract categories" 
ON public.contract_categories 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage contract categories" 
ON public.contract_categories 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));

-- RLS policies for contract_templates
CREATE POLICY "Users can view public templates and their own" 
ON public.contract_templates 
FOR SELECT 
USING (is_public = true OR created_by = auth.uid());

CREATE POLICY "Users can create their own templates" 
ON public.contract_templates 
FOR INSERT 
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their own templates" 
ON public.contract_templates 
FOR UPDATE 
USING (created_by = auth.uid());

CREATE POLICY "Users can delete their own templates" 
ON public.contract_templates 
FOR DELETE 
USING (created_by = auth.uid());

-- RLS policies for contract_revisions
CREATE POLICY "Users can view revisions for their contracts" 
ON public.contract_revisions 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.contracts 
  WHERE contracts.id = contract_revisions.contract_id 
  AND contracts.user_id = auth.uid()
));

CREATE POLICY "Users can create revisions for their contracts" 
ON public.contract_revisions 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.contracts 
  WHERE contracts.id = contract_revisions.contract_id 
  AND contracts.user_id = auth.uid()
));

-- Update triggers for timestamp updates
CREATE TRIGGER update_contract_categories_updated_at
BEFORE UPDATE ON public.contract_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contract_templates_updated_at
BEFORE UPDATE ON public.contract_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default contract categories
INSERT INTO public.contract_categories (name, description, keywords) VALUES
('Employment Contract', 'Employment agreements and job contracts', ARRAY['employment', 'job', 'salary', 'employee', 'employer', 'work']),
('Non-Disclosure Agreement', 'Confidentiality and non-disclosure agreements', ARRAY['nda', 'confidentiality', 'non-disclosure', 'confidential', 'secret']),
('Service Agreement', 'Professional service contracts', ARRAY['service', 'professional', 'consulting', 'agreement', 'services']),
('Vendor Agreement', 'Supplier and vendor contracts', ARRAY['vendor', 'supplier', 'purchase', 'procurement', 'goods']),
('Lease Agreement', 'Property and equipment lease contracts', ARRAY['lease', 'rent', 'property', 'premises', 'rental']),
('Partnership Agreement', 'Business partnership contracts', ARRAY['partnership', 'joint venture', 'collaboration', 'partners']),
('License Agreement', 'Software and intellectual property licenses', ARRAY['license', 'software', 'intellectual property', 'copyright', 'patent'])
ON CONFLICT (name) DO NOTHING;
