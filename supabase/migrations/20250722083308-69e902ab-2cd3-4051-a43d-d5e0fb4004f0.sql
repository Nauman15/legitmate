-- Enhanced User Profiles: Add comprehensive business profile fields
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS industry text,
ADD COLUMN IF NOT EXISTS compliance_requirements text[],
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS website text,
ADD COLUMN IF NOT EXISTS description text,
ADD COLUMN IF NOT EXISTS timezone text DEFAULT 'UTC',
ADD COLUMN IF NOT EXISTS notification_preferences jsonb DEFAULT '{"email": true, "in_app": true, "sms": false}'::jsonb;

-- Create user roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'user', 'viewer');

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  assigned_by uuid REFERENCES auth.users(id),
  assigned_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id uuid)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
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

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" 
ON public.user_roles 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles" 
ON public.user_roles 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create audit trail table
CREATE TABLE IF NOT EXISTS public.audit_trail (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  table_name text,
  record_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on audit_trail
ALTER TABLE public.audit_trail ENABLE ROW LEVEL SECURITY;

-- RLS policies for audit_trail
CREATE POLICY "Users can view their own audit trail" 
ON public.audit_trail 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all audit trails" 
ON public.audit_trail 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "System can insert audit records" 
ON public.audit_trail 
FOR INSERT 
WITH CHECK (true);

-- Create function to log audit trail
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

-- Create trigger to auto-assign default role to new users
CREATE OR REPLACE FUNCTION public.assign_default_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Create trigger for new profiles
DROP TRIGGER IF EXISTS assign_default_role_trigger ON public.profiles;
CREATE TRIGGER assign_default_role_trigger
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.assign_default_role();

-- Update the handle_new_user function to include new fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
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