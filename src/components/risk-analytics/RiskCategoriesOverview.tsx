import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Eye, Target } from 'lucide-react';

interface RiskCategory {
  category: string;
  riskLevel: string;
  score: number;
  issues: string[];
  impact: string;
  probability: number;
  mitigation: string;
}

interface RiskCategoriesOverviewProps {
  categories: RiskCategory[];
}

export const RiskCategoriesOverview = ({ categories }: RiskCategoriesOverviewProps) => {
  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBadgeVariant = (level: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (level.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'outline';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {categories.map((risk, index) => (
        <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-xl font-semibold">{risk.category}</h3>
                  <Badge variant={getRiskBadgeVariant(risk.riskLevel)}>
                    {risk.riskLevel} Risk
                  </Badge>
                  <Badge variant="outline">{risk.impact}</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Risk Score</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-2xl font-bold ${getRiskColor(risk.riskLevel)}`}>
                        {risk.score}
                      </span>
                      <span className="text-sm text-muted-foreground">/100</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Probability</span>
                    <div className="mt-1">
                      <span className="text-2xl font-bold text-primary">{risk.probability}%</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Risk Level</span>
                    <div className="mt-2">
                      <Progress value={risk.score} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4 text-warning" />
                    Identified Issues
                  </h4>
                  <div className="space-y-2">
                    {risk.issues.map((issue, issueIndex) => (
                      <div key={issueIndex} className="flex items-start space-x-2 text-sm">
                        <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                    <p className="text-sm">
                      <span className="font-medium text-accent">Mitigation Strategy:</span> {risk.mitigation}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2 ml-6">
                <Button variant="professional" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Details
                </Button>
                <Button variant="outline" size="sm">
                  <Target className="mr-2 h-4 w-4" />
                  Mitigate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};