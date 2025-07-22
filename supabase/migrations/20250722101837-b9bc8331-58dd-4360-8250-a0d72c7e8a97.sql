
-- Fix 1: Update function with proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix 2: Update all RLS policies to use authenticated role instead of public

-- Drop existing policies that use public role and recreate with authenticated
DROP POLICY IF EXISTS "Users can view their own audit trail" ON public.audit_trail;
DROP POLICY IF EXISTS "System can insert audit records" ON public.audit_trail;
DROP POLICY IF EXISTS "Admins can view all audit trails" ON public.audit_trail;

CREATE POLICY "Users can view their own audit trail" 
ON public.audit_trail 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "System can insert audit records" 
ON public.audit_trail 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view all audit trails" 
ON public.audit_trail 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Update business_integrations policies
DROP POLICY IF EXISTS "Users can manage their integrations" ON public.business_integrations;

CREATE POLICY "Users can manage their integrations" 
ON public.business_integrations 
FOR ALL 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Update compliance_tasks policies
DROP POLICY IF EXISTS "Users can view their tasks or assigned tasks" ON public.compliance_tasks;
DROP POLICY IF EXISTS "Users can create tasks" ON public.compliance_tasks;
DROP POLICY IF EXISTS "Users can update their tasks or assigned tasks" ON public.compliance_tasks;
DROP POLICY IF EXISTS "Users can delete their tasks" ON public.compliance_tasks;

CREATE POLICY "Users can view their tasks or assigned tasks" 
ON public.compliance_tasks 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id OR auth.uid() = assigned_to);

CREATE POLICY "Users can create tasks" 
ON public.compliance_tasks 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their tasks or assigned tasks" 
ON public.compliance_tasks 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id OR auth.uid() = assigned_to);

CREATE POLICY "Users can delete their tasks" 
ON public.compliance_tasks 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Update compliance_templates policies
DROP POLICY IF EXISTS "Users can view public templates and their own" ON public.compliance_templates;
DROP POLICY IF EXISTS "Users can create their own templates" ON public.compliance_templates;
DROP POLICY IF EXISTS "Users can update their own templates" ON public.compliance_templates;
DROP POLICY IF EXISTS "Admins can manage all templates" ON public.compliance_templates;

CREATE POLICY "Users can view public templates and their own" 
ON public.compliance_templates 
FOR SELECT 
TO authenticated
USING (is_active = true OR created_by = auth.uid());

CREATE POLICY "Users can create their own templates" 
ON public.compliance_templates 
FOR INSERT 
TO authenticated
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their own templates" 
ON public.compliance_templates 
FOR UPDATE 
TO authenticated
USING (created_by = auth.uid());

CREATE POLICY "Admins can manage all templates" 
ON public.compliance_templates 
FOR ALL 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Update contract_analyses policies
DROP POLICY IF EXISTS "Users can view analyses for their contracts" ON public.contract_analyses;
DROP POLICY IF EXISTS "Users can create analyses for their contracts" ON public.contract_analyses;

CREATE POLICY "Users can view analyses for their contracts" 
ON public.contract_analyses 
FOR SELECT 
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.contracts 
  WHERE contracts.id = contract_analyses.contract_id 
  AND contracts.user_id = auth.uid()
));

CREATE POLICY "Users can create analyses for their contracts" 
ON public.contract_analyses 
FOR INSERT 
TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM public.contracts 
  WHERE contracts.id = contract_analyses.contract_id 
  AND contracts.user_id = auth.uid()
));

-- Update contract_revisions policies
DROP POLICY IF EXISTS "Users can view revisions for their contracts" ON public.contract_revisions;
DROP POLICY IF EXISTS "Users can create revisions for their contracts" ON public.contract_revisions;

CREATE POLICY "Users can view revisions for their contracts" 
ON public.contract_revisions 
FOR SELECT 
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.contracts 
  WHERE contracts.id = contract_revisions.contract_id 
  AND contracts.user_id = auth.uid()
));

CREATE POLICY "Users can create revisions for their contracts" 
ON public.contract_revisions 
FOR INSERT 
TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM public.contracts 
  WHERE contracts.id = contract_revisions.contract_id 
  AND contracts.user_id = auth.uid()
));

-- Update contract_templates policies
DROP POLICY IF EXISTS "Users can view public templates and their own" ON public.contract_templates;
DROP POLICY IF EXISTS "Users can create their own templates" ON public.contract_templates;
DROP POLICY IF EXISTS "Users can update their own templates" ON public.contract_templates;
DROP POLICY IF EXISTS "Users can delete their own templates" ON public.contract_templates;

CREATE POLICY "Users can view public templates and their own" 
ON public.contract_templates 
FOR SELECT 
TO authenticated
USING (is_public = true OR created_by = auth.uid());

CREATE POLICY "Users can create their own templates" 
ON public.contract_templates 
FOR INSERT 
TO authenticated
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their own templates" 
ON public.contract_templates 
FOR UPDATE 
TO authenticated
USING (created_by = auth.uid());

CREATE POLICY "Users can delete their own templates" 
ON public.contract_templates 
FOR DELETE 
TO authenticated
USING (created_by = auth.uid());

-- Update contracts policies
DROP POLICY IF EXISTS "Users can view their own contracts" ON public.contracts;
DROP POLICY IF EXISTS "Users can create their own contracts" ON public.contracts;
DROP POLICY IF EXISTS "Users can update their own contracts" ON public.contracts;
DROP POLICY IF EXISTS "Users can delete their own contracts" ON public.contracts;

CREATE POLICY "Users can view their own contracts" 
ON public.contracts 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own contracts" 
ON public.contracts 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contracts" 
ON public.contracts 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contracts" 
ON public.contracts 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Update notification_preferences policies
DROP POLICY IF EXISTS "Users can manage their notification preferences" ON public.notification_preferences;

CREATE POLICY "Users can manage their notification preferences" 
ON public.notification_preferences 
FOR ALL 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Update profiles policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can create their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON public.profiles;

CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile" 
ON public.profiles 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Update user_roles policies
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage roles" 
ON public.user_roles 
FOR ALL 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Update admin-only policies to require authentication
DROP POLICY IF EXISTS "Admins can manage contract categories" ON public.contract_categories;
DROP POLICY IF EXISTS "Admins can manage contract categories" ON public.indian_contract_categories;
DROP POLICY IF EXISTS "Admins can manage regulations" ON public.indian_regulations;
DROP POLICY IF EXISTS "Admins can manage GST classifications" ON public.gst_classifications;
DROP POLICY IF EXISTS "Admins can manage government notifications" ON public.government_notifications;

CREATE POLICY "Admins can manage contract categories" 
ON public.contract_categories 
FOR ALL 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage contract categories" 
ON public.indian_contract_categories 
FOR ALL 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage regulations" 
ON public.indian_regulations 
FOR ALL 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage GST classifications" 
ON public.gst_classifications 
FOR ALL 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage government notifications" 
ON public.government_notifications 
FOR ALL 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Fix 3: Update storage policies to require authentication
DROP POLICY IF EXISTS "Users can view their own contracts" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own contracts" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own contracts" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own contracts" ON storage.objects;

CREATE POLICY "Users can view their own contracts" 
ON storage.objects 
FOR SELECT 
TO authenticated
USING (bucket_id = 'contracts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own contracts" 
ON storage.objects 
FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'contracts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own contracts" 
ON storage.objects 
FOR UPDATE 
TO authenticated
USING (bucket_id = 'contracts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own contracts" 
ON storage.objects 
FOR DELETE 
TO authenticated
USING (bucket_id = 'contracts' AND auth.uid()::text = (storage.foldername(name))[1]);
