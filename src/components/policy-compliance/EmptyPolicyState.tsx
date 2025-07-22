import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Upload, Plus, FileText } from 'lucide-react';

export const EmptyPolicyState = () => {
  return (
    <div className="space-y-6">
      {/* Main Empty State */}
      <Card className="shadow-card">
        <CardContent className="p-12 text-center">
          <Users className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h2 className="text-2xl font-semibold mb-4">Start Building Your Policy Framework</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload your existing policies or create new ones to ensure comprehensive compliance 
            with Indian labor laws, data protection regulations, and industry standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              <Upload className="mr-2 h-5 w-5" />
              Upload Policy Documents
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              <Plus className="mr-2 h-5 w-5" />
              Create New Policy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Start Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card hover:shadow-elegant transition-all duration-200">
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Employee Handbook</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create comprehensive employee policies covering code of conduct, leave, and benefits.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Create Template
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-all duration-200">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-success mx-auto mb-4" />
            <h3 className="font-semibold mb-2">POSH Compliance</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Set up Prevention of Sexual Harassment policies as mandated by Indian law.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Setup POSH
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-all duration-200">
          <CardContent className="p-6 text-center">
            <div className="h-8 w-8 bg-warning/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-warning font-bold text-sm">D</span>
            </div>
            <h3 className="font-semibold mb-2">Data Protection</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Implement DPDP Act 2023 compliant data protection and privacy policies.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Setup DPDP
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};