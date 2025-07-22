import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { Contract } from '@/hooks/useContracts';

interface ContractAnalyticsProps {
  contracts: Contract[];
}

export const ContractAnalytics = ({ contracts }: ContractAnalyticsProps) => {
  const getRiskColor = (score?: number) => {
    if (!score) return 'text-muted-foreground';
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  // Contract analytics from real data
  const getContractStats = () => {
    const totalContracts = contracts.length;
    const avgRiskScore = contracts.reduce((acc, contract) => acc + (contract.risk_score || 0), 0) / totalContracts || 0;
    const pendingReview = contracts.filter(c => c.status === 'pending' || c.status === 'analyzing').length;
    
    return {
      totalContracts,
      avgRiskScore: Math.round(avgRiskScore),
      pendingReview,
      costSavings: '₹2.5L' // This would be calculated based on actual business logic
    };
  };

  const stats = getContractStats();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Contract Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary">{stats.totalContracts}</div>
            <div className="text-sm text-muted-foreground">Total Contracts</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <div className={`text-3xl font-bold ${getRiskColor(stats.avgRiskScore)}`}>
              {stats.avgRiskScore}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Risk Score</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-warning">{stats.pendingReview}</div>
            <div className="text-sm text-muted-foreground">Pending Review</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-accent">{stats.costSavings}</div>
            <div className="text-sm text-muted-foreground">Est. Cost Savings</div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Contract Review Trends</CardTitle>
          <CardDescription>Monthly contract review activity and risk assessment</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <Clock className="h-12 w-12 mx-auto mb-4" />
            <p>Advanced analytics dashboard coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};