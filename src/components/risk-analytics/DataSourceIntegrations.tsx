import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Database, CheckCircle, XCircle, Clock, Settings, RefreshCw, Link, Zap, Plus } from 'lucide-react';

interface DataSourceIntegration {
  name: string;
  category: string;
  icon: any;
  status: string;
  description: string;
  lastSync: string;
  records: string;
  riskInsights: string[];
  features: string[];
}

interface DataSourceIntegrationsProps {
  integrations: DataSourceIntegration[];
}

export const DataSourceIntegrations = ({ integrations }: DataSourceIntegrationsProps) => {
  const getConnectionStatus = (status: string): { color: string; icon: any; badge: "default" | "secondary" | "outline" | "destructive" } => {
    switch (status) {
      case 'connected':
        return { color: 'text-success', icon: CheckCircle, badge: 'default' };
      case 'pending':
        return { color: 'text-warning', icon: Clock, badge: 'secondary' };
      case 'available':
        return { color: 'text-muted-foreground', icon: XCircle, badge: 'outline' };
      default:
        return { color: 'text-muted-foreground', icon: XCircle, badge: 'outline' };
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="mr-2 h-5 w-5 text-primary" />
          Business Data Source Integrations
        </CardTitle>
        <CardDescription>
          Connect your business systems to enable AI-powered compliance risk analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {integrations.map((integration, index) => {
            const statusInfo = getConnectionStatus(integration.status);
            const StatusIcon = statusInfo.icon;
            const IntegrationIcon = integration.icon;
            
            return (
              <Card key={index} className="border border-border hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <IntegrationIcon className="h-6 w-6 text-primary" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{integration.name}</h3>
                          <Badge variant="outline">{integration.category}</Badge>
                          <Badge variant={statusInfo.badge}>
                            {integration.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-3">{integration.description}</p>
                        
                        {integration.status === 'connected' && (
                          <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                            <div>
                              <span className="font-medium text-muted-foreground">Last Sync:</span>
                              <span className="ml-2 text-success">{integration.lastSync}</span>
                            </div>
                            <div>
                              <span className="font-medium text-muted-foreground">Records:</span>
                              <span className="ml-2 font-bold text-primary">{integration.records}</span>
                            </div>
                          </div>
                        )}
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-sm mb-2">Features:</h4>
                            <div className="flex flex-wrap gap-2">
                              {integration.features.map((feature, featureIndex) => (
                                <Badge key={featureIndex} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          {integration.riskInsights.length > 0 && (
                            <div>
                              <h4 className="font-medium text-sm mb-2 flex items-center">
                                <Zap className="mr-1 h-3 w-3 text-warning" />
                                AI Risk Insights:
                              </h4>
                              <div className="space-y-1">
                                {integration.riskInsights.map((insight, insightIndex) => (
                                  <div key={insightIndex} className="flex items-start space-x-2 text-sm">
                                    <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-muted-foreground">{insight}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-6">
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`h-5 w-5 ${statusInfo.color}`} />
                        <span className={`text-sm font-medium ${statusInfo.color}`}>
                          {integration.status === 'connected' ? 'Connected' : 
                           integration.status === 'pending' ? 'Pending' : 'Available'}
                        </span>
                      </div>
                      
                      {integration.status === 'connected' ? (
                        <div className="space-y-2">
                          <Button variant="outline" size="sm">
                            <Settings className="mr-2 h-4 w-4" />
                            Configure
                          </Button>
                          <Button variant="professional" size="sm">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Sync Now
                          </Button>
                        </div>
                      ) : integration.status === 'pending' ? (
                        <Button variant="outline" size="sm">
                          <Clock className="mr-2 h-4 w-4" />
                          Complete Setup
                        </Button>
                      ) : (
                        <Button variant="hero" size="sm">
                          <Link className="mr-2 h-4 w-4" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <Card className="border-2 border-dashed border-border">
          <CardContent className="p-6 text-center">
            <Plus className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Add Custom Integration</h3>
            <p className="text-muted-foreground mb-4">
              Connect your custom business systems via API or file upload
            </p>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Integration
            </Button>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};