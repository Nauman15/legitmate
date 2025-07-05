-- Create storage bucket for contracts
INSERT INTO storage.buckets (id, name, public) VALUES ('contracts', 'contracts', false);

-- Create storage policies for contracts
CREATE POLICY "Users can view their own contracts" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'contracts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own contracts" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'contracts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own contracts" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'contracts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own contracts" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'contracts' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create contracts table
CREATE TABLE public.contracts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  risk_score INTEGER,
  compliance_score INTEGER,
  contract_type TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  analyzed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contract analyses table
CREATE TABLE public.contract_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contract_id UUID NOT NULL REFERENCES public.contracts(id) ON DELETE CASCADE,
  analysis_type TEXT NOT NULL,
  issue_description TEXT NOT NULL,
  section_reference TEXT,
  severity TEXT NOT NULL,
  regulation_reference TEXT,
  recommendation TEXT,
  suggested_edit TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contract_analyses ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for contracts
CREATE POLICY "Users can view their own contracts" 
ON public.contracts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own contracts" 
ON public.contracts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contracts" 
ON public.contracts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contracts" 
ON public.contracts 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for contract analyses
CREATE POLICY "Users can view analyses for their contracts" 
ON public.contract_analyses 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.contracts 
  WHERE contracts.id = contract_analyses.contract_id 
  AND contracts.user_id = auth.uid()
));

CREATE POLICY "Users can create analyses for their contracts" 
ON public.contract_analyses 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.contracts 
  WHERE contracts.id = contract_analyses.contract_id 
  AND contracts.user_id = auth.uid()
));

-- Create triggers for timestamp updates
CREATE TRIGGER update_contracts_updated_at
BEFORE UPDATE ON public.contracts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();