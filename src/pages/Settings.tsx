import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  Bell, 
  Shield, 
  Users, 
  FileCheck, 
  Database, 
  Plus, 
  X, 
  Mail, 
  Smartphone, 
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const SettingsPage = () => {
  const { toast } = useToast();
  const [alertSettings, setAlertSettings] = useState({
    gst: {
      enabled: true,
      realTime: true,
      email: true,
      sms: false,
      frequency: 'immediate'
    },
    laborLaws: {
      enabled: true,
      realTime: false,
      email: true,
      sms: false,
      frequency: 'daily'
    },
    companyFilings: {
      enabled: true,
      realTime: true,
      email: true,
      sms: true,
      frequency: 'immediate'
    },
    dataProtection: {
      enabled: false,
      realTime: false,
      email: false,
      sms: false,
      frequency: 'weekly'
    }
  });

  const [customAreas, setCustomAreas] = useState<string[]>([
    'Environmental Compliance',
    'Import/Export Regulations'
  ]);
  const [newCustomArea, setNewCustomArea] = useState('');
  const [notificationSettings, setNotificationSettings] = useState({
    email: 'user@company.com',
    phone: '+91 98765 43210',
    businessHours: true,
    weekendsOnly: false
  });

  const complianceAreas = [
    {
      key: 'gst',
      title: 'GST (Goods and Service Tax)',
      description: 'Monitor GST rate changes, filing deadlines, and compliance updates',
      icon: Shield,
      color: 'text-primary'
    },
    {
      key: 'laborLaws',
      title: 'Labor Laws',
      description: 'Track changes in employment regulations, wage laws, and worker rights',
      icon: Users,
      color: 'text-accent'
    },
    {
      key: 'companyFilings',
      title: 'Company Filings',
      description: 'Stay updated on ROC filing requirements and corporate compliance',
      icon: FileCheck,
      color: 'text-success'
    },
    {
      key: 'dataProtection',
      title: 'Data Protection',
      description: 'Monitor DPDP Act updates and data privacy regulations',
      icon: Database,
      color: 'text-warning'
    }
  ];

  const handleToggleArea = (area: string, field: string, value: boolean) => {
    setAlertSettings(prev => ({
      ...prev,
      [area]: {
        ...prev[area as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleFrequencyChange = (area: string, frequency: string) => {
    setAlertSettings(prev => ({
      ...prev,
      [area]: {
        ...prev[area as keyof typeof prev],
        frequency
      }
    }));
  };

  const addCustomArea = () => {
    if (newCustomArea.trim() && !customAreas.includes(newCustomArea.trim())) {
      setCustomAreas(prev => [...prev, newCustomArea.trim()]);
      setNewCustomArea('');
      toast({
        title: "Custom Area Added",
        description: `${newCustomArea.trim()} has been added to your monitoring list.`,
      });
    }
  };

  const removeCustomArea = (area: string) => {
    setCustomAreas(prev => prev.filter(a => a !== area));
    toast({
      title: "Area Removed",
      description: `${area} has been removed from monitoring.`,
    });
  };

  const saveSettings = () => {
    // Save settings logic here
    toast({
      title: "Settings Saved",
      description: "Your alert preferences have been updated successfully.",
    });
  };

  const testAlerts = () => {
    toast({
      title: "Test Alert Sent",
      description: "Check your email and SMS for test notifications.",
    });
  };

  const getActiveAreasCount = () => {
    return Object.values(alertSettings).filter(setting => setting.enabled).length;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <Settings className="mr-3 h-8 w-8 text-primary" />
              Alert Settings
            </h1>
            <p className="text-muted-foreground">
              Configure your compliance monitoring and notification preferences
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {getActiveAreasCount()} areas monitored
            </Badge>
            <Button variant="outline" onClick={testAlerts}>
              <Bell className="mr-2 h-4 w-4" />
              Test Alerts
            </Button>
          </div>
        </div>

        <Tabs defaultValue="compliance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="compliance">Compliance Areas</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="compliance" className="space-y-6">
            {/* Main Compliance Areas */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-primary" />
                  Compliance Monitoring Areas
                </CardTitle>
                <CardDescription>
                  Select which regulatory areas you want to monitor for changes and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {complianceAreas.map((area) => {
                  const settings = alertSettings[area.key as keyof typeof alertSettings];
                  return (
                    <div key={area.key} className="border border-border rounded-lg p-4 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <area.icon className={`h-6 w-6 ${area.color} mt-1`} />
                          <div>
                            <h3 className="font-semibold">{area.title}</h3>
                            <p className="text-sm text-muted-foreground">{area.description}</p>
                          </div>
                        </div>
                        <Switch
                          checked={settings.enabled}
                          onCheckedChange={(checked) => handleToggleArea(area.key, 'enabled', checked)}
                        />
                      </div>

                      {settings.enabled && (
                        <div className="ml-9 space-y-3 pl-4 border-l border-border">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className="h-4 w-4 text-warning" />
                              <Label className="text-sm">Real-time alerts</Label>
                            </div>
                            <Switch
                              checked={settings.realTime}
                              onCheckedChange={(checked) => handleToggleArea(area.key, 'realTime', checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-primary" />
                              <Label className="text-sm">Email notifications</Label>
                            </div>
                            <Switch
                              checked={settings.email}
                              onCheckedChange={(checked) => handleToggleArea(area.key, 'email', checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Smartphone className="h-4 w-4 text-accent" />
                              <Label className="text-sm">SMS notifications</Label>
                            </div>
                            <Switch
                              checked={settings.sms}
                              onCheckedChange={(checked) => handleToggleArea(area.key, 'sms', checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Notification frequency</Label>
                            <Select
                              value={settings.frequency}
                              onValueChange={(value) => handleFrequencyChange(area.key, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="immediate">Immediate</SelectItem>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Custom Areas */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="mr-2 h-5 w-5 text-accent" />
                  Custom Compliance Areas
                </CardTitle>
                <CardDescription>
                  Add specific regulatory areas relevant to your business
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter custom compliance area (e.g., FEMA Regulations)"
                    value={newCustomArea}
                    onChange={(e) => setNewCustomArea(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCustomArea()}
                  />
                  <Button onClick={addCustomArea} disabled={!newCustomArea.trim()}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {customAreas.map((area, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm">{area}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCustomArea(area)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-primary" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Configure how and when you receive compliance alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={notificationSettings.email}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={notificationSettings.phone}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Business hours only</Label>
                      <p className="text-xs text-muted-foreground">Receive alerts only during 9 AM - 6 PM</p>
                    </div>
                    <Switch
                      checked={notificationSettings.businessHours}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, businessHours: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Weekend notifications</Label>
                      <p className="text-xs text-muted-foreground">Receive alerts on weekends</p>
                    </div>
                    <Switch
                      checked={notificationSettings.weekendsOnly}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, weekendsOnly: checked }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  Alert Preferences
                </CardTitle>
                <CardDescription>
                  Customize your alert experience and timing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Default alert frequency</Label>
                    <Select defaultValue="immediate">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="daily">Daily digest</SelectItem>
                        <SelectItem value="weekly">Weekly summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Alert priority threshold</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All alerts</SelectItem>
                        <SelectItem value="medium">Medium & High</SelectItem>
                        <SelectItem value="high">High priority only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    Changes will take effect immediately. You can test your settings using the "Test Alerts" button.
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="professional" onClick={saveSettings}>
                      Save Settings
                    </Button>
                    <Button variant="outline" onClick={() => window.location.reload()}>
                      Reset to Defaults
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;