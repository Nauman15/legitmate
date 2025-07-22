import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Shield, Upload, Link as LinkIcon, Settings } from 'lucide-react';

export const EmptyRiskAnalyticsState = () => {
  return (
    <div className="space-y-6">
      {/* Main Empty State */}
      <Card className="shadow-card">
        <CardContent className="p-12 text-center">
          <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h2 className="text-2xl font-semibold mb-4">Build Your Risk Intelligence</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start by uploading contracts and connecting your business systems to generate 
            AI-powered risk analytics, predictive insights, and compliance recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              <Upload className="mr-2 h-5 w-5" />
              Upload First Contract
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              <LinkIcon className="mr-2 h-5 w-5" />
              Connect Data Sources
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card hover:shadow-elegant transition-all duration-200">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Predictive Analytics</h3>
            <p className="text-sm text-muted-foreground mb-4">
              AI-powered predictions of compliance violations, penalty risks, and filing deadlines.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Learn More
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-all duration-200">
          <CardContent className="p-6 text-center">
            <Shield className="h-8 w-8 text-success mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Risk Monitoring</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Real-time risk scoring across GST, labor law, data protection, and contract compliance.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              View Categories
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-all duration-200">
          <CardContent className="p-6 text-center">
            <Settings className="h-8 w-8 text-warning mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Data Integration</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect Tally, SAP, GSTN portal, and other business systems for comprehensive analysis.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Setup Integration
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Benefits */}
      <Card className="shadow-card bg-primary/5">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
            Why Risk Analytics Matter
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">85%</div>
              <p className="text-muted-foreground">Penalty prevention rate</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">40%</div>
              <p className="text-muted-foreground">Time saved on compliance</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">30 days</div>
              <p className="text-muted-foreground">Average warning period</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">₹50K+</div>
              <p className="text-muted-foreground">Average penalty savings</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};