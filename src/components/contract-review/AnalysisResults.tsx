import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Eye, Download, FileCheck, AlertCircle } from 'lucide-react';
import { Contract, ContractAnalysis } from '@/hooks/useContracts';

interface AnalysisResultsProps {
  analysisComplete: boolean;
  selectedContract: Contract | null;
  currentAnalyses: ContractAnalysis[];
}

export const AnalysisResults = ({ 
  analysisComplete, 
  selectedContract, 
  currentAnalyses 
}: AnalysisResultsProps) => {
  const { toast } = useToast();

  const getRiskColor = (score?: number) => {
    if (!score) return 'text-muted-foreground';
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getRiskBadgeVariant = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Indian Compliance Analysis
          <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
            AI Powered
          </Badge>
        </CardTitle>
        <CardDescription>
          Comprehensive regulatory compliance assessment for Indian law
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {analysisComplete && selectedContract ? (
          <>
            {/* Compliance Score */}
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-foreground">
                <span className={getRiskColor(selectedContract.compliance_score)}>
                  {selectedContract.compliance_score || 0}%
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Indian Law Compliance Score</p>
              <Progress value={selectedContract.compliance_score || 0} className="h-2" />
            </div>

            {/* Compliance Issues */}
            {currentAnalyses.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 text-destructive" />
                  Compliance Issues Found ({currentAnalyses.length})
                </h4>
                {currentAnalyses.map((analysis, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg space-y-3 border-l-4 border-l-destructive">
                    <div className="flex items-center justify-between">
                      <Badge variant={getRiskBadgeVariant(analysis.severity)}>
                        {analysis.analysis_type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{analysis.section_reference}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-destructive">{analysis.issue_description}</p>
                      {analysis.regulation_reference && (
                        <p className="text-xs text-muted-foreground mt-1">
                          <strong>Regulation:</strong> {analysis.regulation_reference}
                        </p>
                      )}
                    </div>
                    {analysis.recommendation && (
                      <div className="bg-background p-3 rounded border">
                        <p className="text-xs text-muted-foreground mb-1"><strong>Recommendation:</strong></p>
                        <p className="text-sm">{analysis.recommendation}</p>
                      </div>
                    )}
                    {analysis.suggested_edit && (
                      <div className="bg-success/5 p-3 rounded border border-success/20">
                        <p className="text-xs text-success mb-1"><strong>Suggested Edit:</strong></p>
                        <p className="text-sm">{analysis.suggested_edit}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => toast({ title: "Full Report", description: "Detailed compliance report generated." })}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Full Report
              </Button>
              <Button 
                variant="professional" 
                className="flex-1" 
                onClick={() => toast({ title: "Download", description: "Revised contract download started." })}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Revised
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <FileCheck className="h-12 w-12 mx-auto mb-4" />
            <p>Upload and analyze a contract to see compliance results</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};