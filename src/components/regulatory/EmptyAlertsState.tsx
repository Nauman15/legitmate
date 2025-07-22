
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Settings, FileText, Calendar, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmptyAlertsState = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <Bell className="mr-3 h-8 w-8 text-primary" />
              Regulatory Alerts
            </h1>
            <p className="text-muted-foreground">Stay updated with latest regulatory changes and compliance requirements</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link to="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Configure Settings
              </Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/policy-compliance">
                <Plus className="mr-2 h-4 w-4" />
                Setup Monitoring
              </Link>
            </Button>
          </div>
        </div>

        {/* Empty Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-muted-foreground">0</div>
              <div className="text-sm text-muted-foreground">High Priority</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-muted-foreground">0</div>
              <div className="text-sm text-muted-foreground">Medium Priority</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-muted-foreground">0</div>
              <div className="text-sm text-muted-foreground">Reviewed</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-muted-foreground">0</div>
              <div className="text-sm text-muted-foreground">Action Required</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Empty Category Filter */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    No alert categories configured yet
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Empty Upcoming Deadlines */}
            <Card className="shadow-card mt-6">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="mr-2 h-5 w-5 text-warning" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    No filing deadlines set up yet
                  </p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/automated-filings">
                      Setup Filing Calendar
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Empty State */}
          <div className="lg:col-span-3">
            <Card className="shadow-card">
              <CardContent className="p-12 text-center">
                <div className="max-w-md mx-auto space-y-6">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <Bell className="h-12 w-12 text-muted-foreground" />
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">No Regulatory Alerts Yet</h2>
                    <p className="text-muted-foreground">
                      Get started by setting up your compliance monitoring to receive important regulatory updates and alerts.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                    <Button className="w-full" asChild>
                      <Link to="/policy-compliance">
                        <FileText className="mr-2 h-4 w-4" />
                        Setup Compliance
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Configure Business
                      </Link>
                    </Button>
                  </div>

                  <div className="pt-4 text-xs text-muted-foreground">
                    <p>
                      Once configured, you'll receive alerts for GST changes, labor law updates, 
                      filing deadlines, and other regulatory requirements specific to your business.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
