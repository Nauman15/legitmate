import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileCheck, Calendar, Shield, Building, Upload, Settings } from 'lucide-react';

export const EmptyFilingsState = () => {
  return (
    <div className="space-y-6">
      {/* Main Empty State */}
      <Card className="shadow-card">
        <CardContent className="p-12 text-center">
          <FileCheck className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h2 className="text-2xl font-semibold mb-4">Automate Your Filing Process</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Set up automated filing workflows for GST returns, TDS filings, ROC submissions, and other 
            regulatory requirements. Never miss a deadline again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              <Calendar className="mr-2 h-5 w-5" />
              Schedule First Filing
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              <Settings className="mr-2 h-5 w-5" />
              Setup Integration
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filing Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card hover:shadow-elegant transition-all duration-200">
          <CardContent className="p-6 text-center">
            <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">GST Returns</h3>
            <p className="text-xs text-muted-foreground mb-4">
              GSTR-1, GSTR-3B monthly filings
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Setup GST
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-all duration-200">
          <CardContent className="p-6 text-center">
            <div className="h-8 w-8 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-accent font-bold text-sm">₹</span>
            </div>
            <h3 className="font-semibold mb-2">TDS Filings</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Quarterly TDS returns
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Setup TDS
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-all duration-200">
          <CardContent className="p-6 text-center">
            <Building className="h-8 w-8 text-success mx-auto mb-4" />
            <h3 className="font-semibold mb-2">ROC Filings</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Annual returns & company filings
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Setup ROC
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-all duration-200">
          <CardContent className="p-6 text-center">
            <Upload className="h-8 w-8 text-warning mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Labor Compliance</h3>
            <p className="text-xs text-muted-foreground mb-4">
              PF, ESI & labor law filings
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Setup Labor
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card className="shadow-card bg-primary/5">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <Settings className="h-5 w-5 mr-2 text-primary" />
            Get Started in 3 Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start space-x-3">
              <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div>
                <p className="font-medium">Connect Your Accounting System</p>
                <p className="text-muted-foreground text-xs">Link Tally, Marg, or other accounting software</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div>
                <p className="font-medium">Configure Filing Calendar</p>
                <p className="text-muted-foreground text-xs">Set up deadlines and notification preferences</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                3
              </div>
              <div>
                <p className="font-medium">Enable Automation</p>
                <p className="text-muted-foreground text-xs">Turn on automatic filing for selected types</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};