
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const INDIAN_CONTRACT_ANALYSIS_PROMPT = `You are an expert Indian legal compliance analyst specializing in contract review. Analyze contracts for compliance with Indian laws including:

LEGAL FRAMEWORKS:
- Contract Act 1872 (formation, validity, performance)
- GST Act 2017 (tax implications, invoicing requirements)
- Income Tax Act 1961 (TDS provisions, withholding requirements)
- Companies Act 2013 (corporate governance, board approvals)
- DPDP Act 2023 (data protection clauses)
- POSH Act 2013 (workplace harassment prevention)
- Industrial Relations Code 2020 (employment terms)
- Transfer of Property Act 1882 (real estate transactions)
- Competition Act 2002 (anti-competitive practices)

ANALYSIS REQUIREMENTS:
1. COMPLIANCE ISSUES: Identify violations, missing clauses, regulatory gaps
2. RISK ASSESSMENT: Rate each issue as Low/Medium/High/Critical
3. FINANCIAL IMPACT: Estimate potential penalties, tax implications
4. RECOMMENDATIONS: Specific amendments, additional clauses needed
5. REGULATORY REFERENCES: Cite specific sections and forms

FOCUS AREAS:
- GST registration verification, place of supply, tax rates
- TDS applicability, rates, certificate requirements
- Stamp duty compliance, registration requirements
- Force majeure clauses (including pandemic provisions)
- Dispute resolution mechanisms (arbitration/courts)
- Intellectual property protection
- Data localization and privacy compliance
- Termination clauses and notice periods
- Indemnity and liability limitations
- Payment terms and interest calculations

Provide structured analysis with specific, actionable recommendations.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { contract_id, extracted_text } = await req.json();

    if (!contract_id || !extracted_text) {
      throw new Error('Missing contract_id or extracted_text');
    }

    console.log('Analyzing contract:', contract_id);

    // Get contract details from database
    const { data: contract, error: contractError } = await supabase
      .from('contracts')
      .select('*')
      .eq('id', contract_id)
      .single();

    if (contractError || !contract) {
      throw new Error('Contract not found');
    }

    // Get relevant Indian regulations for context
    const { data: regulations } = await supabase
      .from('indian_regulations')
      .select('*')
      .limit(10);

    // Get contract category context if available
    const { data: categories } = await supabase
      .from('indian_contract_categories')
      .select('*')
      .limit(5);

    // Build analysis context
    const analysisContext = `
CONTRACT DETAILS:
- Type: ${contract.contract_type || 'General'}
- Category: ${contract.category || 'Not specified'}
- Counterparty: ${contract.counterparty_name || 'Not specified'}

APPLICABLE REGULATIONS:
${regulations?.map(reg => `- ${reg.title}: ${reg.description}`).join('\n') || 'Standard Indian laws apply'}

CATEGORY-SPECIFIC REQUIREMENTS:
${categories?.map(cat => `- ${cat.name}: ${cat.applicable_laws?.join(', ')}`).join('\n') || 'General requirements apply'}

CONTRACT TEXT TO ANALYZE:
${extracted_text}

Please provide a comprehensive compliance analysis focusing on Indian regulatory requirements.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: INDIAN_CONTRACT_ANALYSIS_PROMPT
          },
          {
            role: 'user',
            content: analysisContext
          }
        ],
        temperature: 0.2,
        max_tokens: 2000
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const analysisResult = data.choices[0]?.message?.content;

    if (!analysisResult) {
      throw new Error('No analysis result from AI');
    }

    // Parse the analysis and extract structured data
    const analysisData = parseAnalysisResult(analysisResult);

    // Store analysis results in database
    const analysisPromises = analysisData.issues.map((issue: any) => 
      supabase.from('contract_analyses').insert({
        contract_id: contract_id,
        analysis_type: issue.type || 'compliance_review',
        issue_description: issue.description,
        section_reference: issue.section,
        severity: issue.severity,
        regulation_reference: issue.regulation,
        recommendation: issue.recommendation,
        suggested_edit: issue.suggestedEdit
      })
    );

    await Promise.all(analysisPromises);

    // Update contract with analysis completion
    await supabase
      .from('contracts')
      .update({
        analyzed_at: new Date().toISOString(),
        risk_score: analysisData.riskScore,
        compliance_score: analysisData.complianceScore,
        status: 'analyzed'
      })
      .eq('id', contract_id);

    console.log('Contract analysis completed successfully');

    return new Response(JSON.stringify({
      success: true,
      analysis: analysisResult,
      risk_score: analysisData.riskScore,
      compliance_score: analysisData.complianceScore,
      issues_found: analysisData.issues.length,
      critical_issues: analysisData.issues.filter((i: any) => i.severity === 'critical').length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in contract analysis:', error);
    
    return new Response(JSON.stringify({
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function parseAnalysisResult(analysisText: string) {
  // This is a simplified parser - in production, you'd want more sophisticated parsing
  const issues = [];
  let riskScore = 75; // Default medium risk
  let complianceScore = 70; // Default score
  
  // Extract issues based on common patterns
  const lines = analysisText.split('\n');
  let currentIssue: any = {};
  
  for (const line of lines) {
    if (line.toLowerCase().includes('critical') || line.toLowerCase().includes('high risk')) {
      riskScore = Math.max(riskScore, 85);
      complianceScore = Math.min(complianceScore, 60);
      currentIssue.severity = 'critical';
    } else if (line.toLowerCase().includes('medium') || line.toLowerCase().includes('moderate')) {
      currentIssue.severity = 'medium';
    } else if (line.toLowerCase().includes('low') || line.toLowerCase().includes('minor')) {
      currentIssue.severity = 'low';
    }
    
    if (line.includes('GST') || line.includes('tax')) {
      currentIssue.type = 'tax_compliance';
      currentIssue.regulation = 'GST Act 2017';
    } else if (line.includes('TDS') || line.includes('withholding')) {
      currentIssue.type = 'tax_compliance';
      currentIssue.regulation = 'Income Tax Act 1961';
    } else if (line.includes('data') || line.includes('privacy')) {
      currentIssue.type = 'data_protection';
      currentIssue.regulation = 'DPDP Act 2023';
    }
    
    if (line.includes('recommend') || line.includes('suggest')) {
      currentIssue.recommendation = line;
    }
    
    if (line.includes('issue') || line.includes('problem') || line.includes('violation')) {
      currentIssue.description = line;
      if (Object.keys(currentIssue).length > 1) {
        issues.push({ ...currentIssue });
        currentIssue = {};
      }
    }
  }
  
  // Adjust scores based on issues found
  if (issues.length > 10) {
    riskScore = Math.min(riskScore + 15, 100);
    complianceScore = Math.max(complianceScore - 20, 0);
  } else if (issues.length > 5) {
    riskScore = Math.min(riskScore + 10, 100);
    complianceScore = Math.max(complianceScore - 10, 0);
  }
  
  return {
    issues: issues.length > 0 ? issues : [{
      type: 'general_review',
      description: 'Contract reviewed for Indian legal compliance',
      severity: 'low',
      recommendation: 'Consider consulting legal expert for detailed review'
    }],
    riskScore: Math.round(riskScore),
    complianceScore: Math.round(complianceScore)
  };
}
