import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGovernmentNotifications } from '@/hooks/useGovernmentNotifications';
import { 
  Bell, 
  AlertTriangle, 
  Calendar, 
  ExternalLink, 
  Search, 
  Filter,
  CheckCircle,
  Clock
} from 'lucide-react';

const impactColors = {
  low: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  high: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  critical: 'bg-red-500/10 text-red-500 border-red-500/20'
};

const sourceNames = {
  cbic: 'CBIC',
  mca: 'MCA',
  rbi: 'RBI',
  labor_ministry: 'Labor Ministry',
  it_ministry: 'IT Ministry',
  sebi: 'SEBI',
  irdai: 'IRDAI'
};

export const GovernmentNotificationsFeed = () => {
  const { 
    notifications, 
    loading, 
    error, 
    getFilteredNotifications,
    getRecentNotifications,
    getCriticalNotifications,
    markAsProcessed
  } = useGovernmentNotifications();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [selectedImpact, setSelectedImpact] = useState<string>('');

  const filteredNotifications = getFilteredNotifications({
    source: selectedSource || undefined,
    impact_level: selectedImpact || undefined
  }).filter(notification => 
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recentNotifications = getRecentNotifications(7);
  const criticalNotifications = getCriticalNotifications();

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="shadow-card">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="flex space-x-4">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-4 bg-muted rounded w-1/6"></div>
                </div>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
            <p>Unable to load notifications</p>
            <p className="text-sm text-destructive mt-2">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const NotificationCard = ({ notification }: { notification: any }) => (
    <Card className="shadow-card hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {sourceNames[notification.source as keyof typeof sourceNames] || notification.source.toUpperCase()}
              </Badge>
              <Badge 
                variant="outline" 
                className={`text-xs ${impactColors[notification.impact_level as keyof typeof impactColors]}`}
              >
                {notification.impact_level.toUpperCase()}
              </Badge>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(notification.notification_date).toLocaleDateString()}
              </div>
            </div>
            <CardTitle className="text-lg leading-tight">
              {notification.title}
            </CardTitle>
          </div>
          {!notification.processed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => markAsProcessed(notification.id)}
              className="text-xs"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Mark Read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {notification.content}
        </p>
        
        {notification.effective_date && (
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-warning" />
            <span className="text-muted-foreground">Effective from:</span>
            <span className="font-medium">
              {new Date(notification.effective_date).toLocaleDateString()}
            </span>
          </div>
        )}

        {notification.applicable_to && notification.applicable_to.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Applicable to:</p>
            <div className="flex flex-wrap gap-2">
              {notification.applicable_to.map((item: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {notification.tags && notification.tags.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {notification.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {notification.url && (
          <Button variant="outline" size="sm" asChild>
            <a 
              href={notification.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Official Notice
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Government Notifications</h2>
          <p className="text-muted-foreground">
            Stay updated with the latest regulatory changes and compliance requirements
          </p>
        </div>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {criticalNotifications.length} Critical
        </Badge>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedSource} onValueChange={setSelectedSource}>
            <SelectTrigger className="w-[150px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Sources</SelectItem>
              <SelectItem value="cbic">CBIC</SelectItem>
              <SelectItem value="mca">MCA</SelectItem>
              <SelectItem value="rbi">RBI</SelectItem>
              <SelectItem value="labor_ministry">Labor Ministry</SelectItem>
              <SelectItem value="it_ministry">IT Ministry</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedImpact} onValueChange={setSelectedImpact}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Impact" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Levels</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            All ({filteredNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent ({recentNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="critical" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Critical ({criticalNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread" className="flex items-center gap-2">
            Unread ({notifications.filter(n => !n.processed).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
            </div>
          ) : (
            <Card className="shadow-card">
              <CardContent className="p-12 text-center text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-4" />
                <p>No notifications found matching your criteria</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          {recentNotifications.length > 0 ? (
            <div className="space-y-4">
              {recentNotifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
            </div>
          ) : (
            <Card className="shadow-card">
              <CardContent className="p-12 text-center text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4" />
                <p>No recent notifications in the last 7 days</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="critical" className="space-y-4">
          {criticalNotifications.length > 0 ? (
            <div className="space-y-4">
              {criticalNotifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
            </div>
          ) : (
            <Card className="shadow-card">
              <CardContent className="p-12 text-center text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-success" />
                <p>No critical notifications at the moment</p>
                <p className="text-sm mt-2">Your compliance status looks good!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {notifications.filter(n => !n.processed).length > 0 ? (
            <div className="space-y-4">
              {notifications.filter(n => !n.processed).map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
            </div>
          ) : (
            <Card className="shadow-card">
              <CardContent className="p-12 text-center text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-success" />
                <p>All caught up!</p>
                <p className="text-sm mt-2">You've read all notifications</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};