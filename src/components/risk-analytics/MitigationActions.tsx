import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Shield, Eye, Settings } from 'lucide-react';

interface MitigationAction {
  title: string;
  status: string;
  priority: string;
  deadline: string;
  assignee: string;
  progress: number;
}

interface MitigationActionsProps {
  actions: MitigationAction[];
}

export const MitigationActions = ({ actions }: MitigationActionsProps) => {
  const getStatusBadge = (status: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (status) {
      case 'completed': return 'default';
      case 'in_progress': return 'outline';
      case 'pending': return 'secondary';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="mr-2 h-5 w-5 text-primary" />
          Risk Mitigation Actions
        </CardTitle>
        <CardDescription>Track and manage risk mitigation initiatives</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="font-semibold">{action.title}</h3>
                <Badge variant={getStatusBadge(action.status)}>
                  {action.status.replace('_', ' ').toUpperCase()}
                </Badge>
                <Badge variant={getPriorityColor(action.priority)}>
                  {action.priority.toUpperCase()}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                <div>
                  <span className="font-medium">Deadline:</span> {action.deadline}
                </div>
                <div>
                  <span className="font-medium">Assignee:</span> {action.assignee}
                </div>
              </div>

              {action.status !== 'completed' && (
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{action.progress}%</span>
                  </div>
                  <Progress value={action.progress} className="h-2" />
                </div>
              )}
            </div>

            <div className="flex space-x-2 ml-6">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="professional" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};