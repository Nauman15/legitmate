
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const INDIAN_COMPLIANCE_CONTEXT = `You are an expert AI assistant specializing in Indian regulatory compliance and business law. Your knowledge includes:

CORE EXPERTISE:
- GST Act 2017 and all related regulations
- Income Tax Act 1961 and TDS provisions  
- Companies Act 2013 and corporate compliance
- Contract Act 1872 and commercial agreements
- Digital Personal Data Protection Act 2023 (DPDP)
- Prevention of Sexual Harassment Act 2013 (POSH)
- Industrial Relations Code 2020 and labor laws
- State-specific regulations and VAT laws

SPECIALIZED KNOWLEDGE:
- HSN/SAC codes and GST rate structures
- Place of supply rules for services
- TDS rates and applicability matrix
- RERA compliance for real estate
- SEBI regulations for financial services
- RBI guidelines for NBFCs
- Export-import regulations and DGFT policies
- Environmental clearances and pollution laws

PRACTICAL GUIDANCE:
- Filing deadlines and penalty structures
- Common compliance pitfalls and solutions
- Industry-specific regulatory requirements
- Cost-effective compliance strategies
- Risk assessment and mitigation

Always provide:
1. Accurate, current information based on latest regulations
2. Practical, actionable advice
3. Risk assessments with penalty implications
4. Step-by-step compliance guidance
5. Relevant form numbers and portal references
6. Cost estimates where applicable

Important: Always include disclaimers that this is general guidance and recommend consulting qualified CA/CS/legal professionals for specific situations.`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { message, context, conversation_history } = await req.json();

    if (!message || typeof message !== 'string') {
      throw new Error('Invalid message format');
    }

    console.log('Processing compliance query:', message);

    // Build conversation context
    const messages = [
      {
        role: 'system',
        content: INDIAN_COMPLIANCE_CONTEXT
      }
    ];

    // Add conversation history for context
    if (conversation_history && Array.isArray(conversation_history)) {
      conversation_history.slice(-4).forEach((msg: any) => {
        if (msg.type === 'user') {
          messages.push({ role: 'user', content: msg.content });
        } else if (msg.type === 'assistant' && !msg.isLoading) {
          messages.push({ role: 'assistant', content: msg.content });
        }
      });
    }

    // Add current user message
    messages.push({ role: 'user', content: message });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.3, // Lower temperature for more consistent regulatory advice
        max_tokens: 1000,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from AI model');
    }

    // Generate contextual suggestions based on the query
    const suggestions = generateSuggestions(message, aiResponse);

    console.log('AI compliance response generated successfully');

    return new Response(JSON.stringify({
      response: aiResponse,
      suggestions: suggestions,
      context: 'indian_legal_compliance'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in AI compliance assistant:', error);
    
    return new Response(JSON.stringify({
      error: error.message || 'Internal server error',
      response: 'I apologize, but I encountered an issue processing your request. Please try again or contact support if the problem persists.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateSuggestions(userMessage: string, aiResponse: string): string[] {
  const messageLower = userMessage.toLowerCase();
  const responseLower = aiResponse.toLowerCase();
  
  const suggestions: string[] = [];

  // GST-related suggestions
  if (messageLower.includes('gst') || responseLower.includes('gst')) {
    suggestions.push(
      'What are the current GST rates for my industry?',
      'How to calculate GST for interstate sales?',
      'GST registration threshold limits'
    );
  }

  // Contract-related suggestions
  if (messageLower.includes('contract') || messageLower.includes('agreement')) {
    suggestions.push(
      'Essential clauses for employment contracts',
      'How to make contracts DPDP Act compliant?',
      'Stamp duty rates for different states'
    );
  }

  // POSH Act suggestions
  if (messageLower.includes('posh') || messageLower.includes('harassment')) {
    suggestions.push(
      'POSH committee formation requirements',
      'Annual POSH compliance reporting',
      'POSH training program guidelines'
    );
  }

  // DPDP Act suggestions
  if (messageLower.includes('dpdp') || messageLower.includes('data protection')) {
    suggestions.push(
      'DPDP Act compliance checklist',
      'Data localization requirements',
      'Consent management implementation'
    );
  }

  // Labor law suggestions
  if (messageLower.includes('labor') || messageLower.includes('employee')) {
    suggestions.push(
      'PF and ESI registration process',
      'Minimum wage compliance by state',
      'Leave and holiday policies'
    );
  }

  // Company law suggestions
  if (messageLower.includes('company') || messageLower.includes('corporate')) {
    suggestions.push(
      'Annual filing requirements for companies',
      'Board meeting compliance',
      'Share transfer procedures'
    );
  }

  // Default suggestions if no specific category matches
  if (suggestions.length === 0) {
    suggestions.push(
      'Recent regulatory changes affecting my business',
      'Upcoming compliance deadlines this month',
      'How to improve my compliance score?'
    );
  }

  return suggestions.slice(0, 4); // Return max 4 suggestions
}
