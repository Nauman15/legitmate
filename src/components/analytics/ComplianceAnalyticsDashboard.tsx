import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdvancedAnalytics } from '@/hooks/useAdvancedAnalytics';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Shield, 
  DollarSign,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

export const ComplianceAnalyticsDashboard = () => {
  const { analytics, insights, loading, error } = useAdvancedAnalytics();

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="shadow-card">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-2 bg-muted rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !analytics || !insights) {
    return (
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <BarChart3 className="h-12 w-12 mx-auto mb-4" />
            <p>Unable to load analytics data</p>
            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-success" />;
    if (trend < 0) return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Activity className="h-4 w-4 text-muted-foreground" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-success';
    if (trend < 0) return 'text-destructive';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Shield className="h-5 w-5 text-primary" />
              <div className="flex items-center space-x-1">
                {getTrendIcon(analytics.complianceScoreTrend)}
                <span className={`text-sm ${getTrendColor(analytics.complianceScoreTrend)}`}>
                  {analytics.complianceScoreTrend > 0 ? '+' : ''}{analytics.complianceScoreTrend}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{analytics.complianceScore}</p>
              <p className="text-sm text-muted-foreground">Compliance Score</p>
            </div>
            <Progress value={analytics.complianceScore} className="h-2 mt-3" />
          </CardContent>
        </Card>

        <Card className="shadow-card border-l-4 border-l-warning">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <div className="flex items-center space-x-1">
                {getTrendIcon(analytics.riskScoreTrend)}
                <span className={`text-sm ${getTrendColor(analytics.riskScoreTrend)}`}>
                  {analytics.riskScoreTrend > 0 ? '+' : ''}{analytics.riskScoreTrend}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{analytics.riskScore}</p>
              <p className="text-sm text-muted-foreground">Risk Score</p>
            </div>
            <Progress value={Math.min(analytics.riskScore, 100)} className="h-2 mt-3" />
          </CardContent>
        </Card>

        <Card className="shadow-card border-l-4 border-l-destructive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div className="flex items-center space-x-1">
                {getTrendIcon(-analytics.alertsTrend)}
                <span className={`text-sm ${getTrendColor(-analytics.alertsTrend)}`}>
                  {analytics.alertsTrend > 0 ? '+' : ''}{analytics.alertsTrend}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{analytics.activeAlerts}</p>
              <p className="text-sm text-muted-foreground">Active Alerts</p>
            </div>
            <Badge variant={analytics.activeAlerts > 5 ? 'destructive' : 'secondary'} className="mt-2">
              {analytics.activeAlerts > 5 ? 'High Priority' : 'Manageable'}
            </Badge>
          </CardContent>
        </Card>

        <Card className="shadow-card border-l-4 border-l-accent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-5 w-5 text-accent" />
              <div className="flex items-center space-x-1">
                {getTrendIcon(analytics.deadlinesTrend)}
                <span className={`text-sm ${getTrendColor(analytics.deadlinesTrend)}`}>
                  {analytics.deadlinesTrend > 0 ? '+' : ''}{analytics.deadlinesTrend}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{analytics.upcomingDeadlines}</p>
              <p className="text-sm text-muted-foreground">Upcoming Deadlines</p>
            </div>
            <Badge variant={analytics.upcomingDeadlines > 10 ? 'secondary' : 'outline'} className="mt-2">
              Next 30 days
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Industry Benchmark */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Industry Benchmark</span>
                </CardTitle>
                <CardDescription>
                  Compare your compliance performance with industry peers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Your Score</span>
                  <span className="font-bold text-primary">{analytics.complianceScore}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Industry Average</span>
                  <span className="font-medium">{analytics.industryBenchmark.averageScore}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Your Percentile</span>
                  <Badge variant="secondary">
                    Top {100 - analytics.industryBenchmark.percentile}%
                  </Badge>
                </div>
                <Progress 
                  value={analytics.industryBenchmark.percentile} 
                  className="h-2 mt-4" 
                />
              </CardContent>
            </Card>

            {/* Monthly Activity Trends */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span>Activity Trends</span>
                </CardTitle>
                <CardDescription>
                  6-month compliance activity overview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.monthlyActivity.map((month, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{month.month}</span>
                        <span className="text-muted-foreground">
                          {month.contracts + month.filings + month.alerts} activities
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-primary/20 h-2 rounded" 
                             style={{ width: `${(month.contracts / 25) * 100}%` }}>
                        </div>
                        <div className="bg-success/20 h-2 rounded" 
                             style={{ width: `${(month.filings / 15) * 100}%` }}>
                        </div>
                        <div className="bg-warning/20 h-2 rounded" 
                             style={{ width: `${(month.alerts / 10) * 100}%` }}>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground pt-2 border-t">
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded mr-1"></div>
                      Contracts
                    </span>
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-success rounded mr-1"></div>
                      Filings
                    </span>
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-warning rounded mr-1"></div>
                      Alerts
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          {/* Penalty Risk Assessment */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span>Penalty Risk Assessment</span>
              </CardTitle>
              <CardDescription>
                Predictive analysis of potential compliance penalties
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-warning">
                    {insights.penaltyRisk.probability}%
                  </div>
                  <p className="text-sm text-muted-foreground">Risk Probability</p>
                  <Progress value={insights.penaltyRisk.probability} className="h-2 mt-2" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-destructive">
                    ₹{insights.penaltyRisk.estimatedAmount.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Estimated Amount</p>
                </div>
              </div>
              
              {insights.penaltyRisk.riskFactors.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Risk Factors:</h4>
                  <div className="space-y-1">
                    {insights.penaltyRisk.riskFactors.map((factor, index) => (
                      <Badge key={index} variant="outline" className="mr-2">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          {/* Cost Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-success" />
                  <span>Compliance Costs</span>
                </CardTitle>
                <CardDescription>
                  Projected compliance expenditure breakdown
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold">₹{insights.complianceCost.monthly.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Monthly</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">₹{insights.complianceCost.quarterly.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Quarterly</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">₹{insights.complianceCost.annual.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Annual</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Cost Breakdown</CardTitle>
                <CardDescription>Annual compliance cost by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {insights.complianceCost.breakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.category}</span>
                      <span className="font-bold">₹{item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          {/* Resource Optimization */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-accent" />
                <span>Resource Optimization</span>
              </CardTitle>
              <CardDescription>
                Time-saving opportunities through automation and optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.resourceOptimization.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{item.task}</h4>
                      <Badge variant="secondary">
                        {item.savings}h saved
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Current: </span>
                        <span className="font-medium">{item.currentTime}h</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Optimized: </span>
                        <span className="font-medium text-success">{item.optimizedTime}h</span>
                      </div>
                    </div>
                    <Progress 
                      value={(item.savings / item.currentTime) * 100} 
                      className="h-2" 
                    />
                  </div>
                ))}
                
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Total Time Savings</span>
                    <span className="text-xl font-bold text-primary">
                      {insights.resourceOptimization.reduce((sum, item) => sum + item.savings, 0)}h/month
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Potential monthly time savings through process optimization
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};