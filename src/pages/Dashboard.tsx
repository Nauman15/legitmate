import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart3,
  FileText,
  Bell,
  Plus,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  PackageCheck,
  UserRound,
  Calendar,
  Settings,
  HelpCircle
} from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Dashboard = () => {
  const { user } = useAuth();
  const [contracts, setContracts] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const [contractsResponse, alertsResponse, profileResponse] = await Promise.all([
          supabase.from('contracts').select('*').eq('user_id', user.id),
          supabase.from('regulatory_alerts').select('*').eq('user_id', user.id),
          supabase.from('profiles').select('*').eq('user_id', user.id).single()
        ]);

        setContracts(contractsResponse.data || []);
        setAlerts(alertsResponse.data || []);
        setProfile(profileResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  // Make risk thresholds configurable
  const riskThresholds = {
    high: 70,
    medium: 50,
    low: 0
  };

  const getRiskBadgeVariant = (riskScore: number) => {
    if (riskScore >= riskThresholds.high) return 'destructive';
    if (riskScore >= riskThresholds.medium) return 'secondary';
    return 'default';
  };

  const getRiskLevel = (riskScore: number) => {
    if (riskScore >= riskThresholds.high) return 'High Risk';
    if (riskScore >= riskThresholds.medium) return 'Medium Risk';
    return 'Low Risk';
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <BarChart3 className="mr-3 h-8 w-8 text-primary" />
              Dashboard
            </h1>
            <p className="text-muted-foreground">At-a-glance overview of your business compliance</p>
          </div>
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <span>High risk contract needs review</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>GST filing completed successfully</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center space-x-2">
                    <PackageCheck className="h-4 w-4 text-warning" />
                    <span>New compliance task assigned</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="hero">
              <Plus className="mr-2 h-4 w-4" />
              Add Contract
            </Button>
          </div>
        </div>

        {/* Profile and Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={profile?.avatar_url || "https://github.com/shadcn.png"} />
                <AvatarFallback><UserRound className="h-4 w-4" /></AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{profile?.full_name || 'No Name'}</h3>
                <p className="text-sm text-muted-foreground">{profile?.email || 'No Email'}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="secondary" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Review Contracts
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Compliance Check
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Manage Integrations
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Help & Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Need assistance? Check out our help center or contact support.
              </p>
              <Button variant="outline" className="w-full justify-start">
                <HelpCircle className="mr-2 h-4 w-4" />
                Visit Help Center
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Overview */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Compliance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card rounded-lg shadow-card p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Overall Compliance</h3>
                  <div className="flex items-center text-success">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm ml-1">+5%</span>
                  </div>
                </div>
                <div className="flex items-baseline space-x-1 mb-1">
                  <span className="text-3xl font-bold text-primary">85</span>
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
                <p className="text-xs text-muted-foreground">Compared to last month</p>
              </div>

              <div className="bg-card rounded-lg shadow-card p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">High Risk Contracts</h3>
                  <div className="flex items-center text-destructive">
                    <TrendingDown className="h-4 w-4" />
                    <span className="text-sm ml-1">-2</span>
                  </div>
                </div>
                <div className="flex items-baseline space-x-1 mb-1">
                  <span className="text-3xl font-bold text-foreground">3</span>
                  <span className="text-sm text-muted-foreground">contracts</span>
                </div>
                <p className="text-xs text-muted-foreground">Require immediate review</p>
              </div>

              <div className="bg-card rounded-lg shadow-card p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Upcoming Deadlines</h3>
                  <div className="flex items-center text-warning">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm ml-1">+1</span>
                  </div>
                </div>
                <div className="flex items-baseline space-x-1 mb-1">
                  <span className="text-3xl font-bold text-foreground">7</span>
                  <span className="text-sm text-muted-foreground">days</span>
                </div>
                <p className="text-xs text-muted-foreground">Until next filing</p>
              </div>

              <div className="bg-card rounded-lg shadow-card p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Active Alerts</h3>
                  <div className="flex items-center text-destructive">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm ml-1">+3</span>
                  </div>
                </div>
                <div className="flex items-baseline space-x-1 mb-1">
                  <span className="text-3xl font-bold text-foreground">12</span>
                  <span className="text-sm text-muted-foreground">alerts</span>
                </div>
                <p className="text-xs text-muted-foreground">Require your attention</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {contracts.length > 0 && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Recent Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contracts.slice(0, 3).map((contract) => (
                  <div key={contract.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <h3 className="font-semibold">{contract.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {contract.counterparty_name} • {contract.uploaded_at ? new Date(contract.uploaded_at).toLocaleDateString() : 'Date not available'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getRiskBadgeVariant(contract.risk_score || 0)}>
                        {getRiskLevel(contract.risk_score || 0)}
                      </Badge>
                      <Badge variant="outline">{contract.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {alerts.length > 0 && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Recent Regulatory Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] w-full rounded-md border">
                <div className="space-y-4 p-4">
                  {alerts.slice(0, 5).map((alert) => (
                    <div key={alert.id} className="flex items-start justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <h3 className="font-semibold">{alert.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {alert.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="destructive">{alert.impact_level}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        <div className="text-center text-muted-foreground">
          <p>
            That's all for now! More features and insights coming soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
