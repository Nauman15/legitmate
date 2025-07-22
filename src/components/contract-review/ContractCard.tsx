
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { FileText, Eye, Download, Trash2, Calendar, AlertTriangle, User, Hash } from 'lucide-react';
import { Contract } from '@/hooks/useContracts';

interface ContractCardProps {
  contract: Contract;
  onDownload: (filePath: string, name: string) => void;
  onDelete: (id: string, filePath: string) => void;
}

export const ContractCard = ({ contract, onDownload, onDelete }: ContractCardProps) => {
  const { toast } = useToast();

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending Review';
      case 'analyzing': return 'Under Review';
      case 'reviewed': return 'Reviewed';
      case 'approved': return 'Approved';
      case 'needs_attention': return 'Needs Attention';
      default: return status;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'needs_attention': return 'destructive';
      case 'analyzing': return 'secondary';
      case 'reviewed': return 'outline';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityBadgeVariant = (priority?: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getCategoryColor = (category?: string) => {
    // Simple hash-based color assignment for categories
    if (!category) return 'bg-muted text-muted-foreground';
    
    const colors = [
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    ];
    
    const hash = category.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const getRiskColor = (score?: number) => {
    if (!score) return 'text-muted-foreground';
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const isExpiringOrRenewing = () => {
    if (!contract.expiry_date && !contract.renewal_date) return false;
    
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
    
    const expiryDate = contract.expiry_date ? new Date(contract.expiry_date) : null;
    const renewalDate = contract.renewal_date ? new Date(contract.renewal_date) : null;
    
    return (expiryDate && expiryDate <= thirtyDaysFromNow) || 
           (renewalDate && renewalDate <= thirtyDaysFromNow);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FileText className="h-8 w-8 text-primary" />
                {isExpiringOrRenewing() && (
                  <AlertTriangle className="h-4 w-4 text-destructive absolute -top-1 -right-1" />
                )}
              </div>
              <div>
                <h3 className="font-semibold">{contract.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {contract.contract_type || 'Contract'} • {new Date(contract.uploaded_at).toLocaleDateString()}
                  {contract.version && contract.version > 1 && (
                    <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded">v{contract.version}</span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {contract.risk_score && (
                <div className="text-center">
                  <div className={`text-lg font-bold ${getRiskColor(contract.risk_score)}`}>
                    {contract.risk_score}%
                  </div>
                  <div className="text-xs text-muted-foreground">Risk Score</div>
                </div>
              )}
              
              <Badge variant={getStatusVariant(contract.status)}>
                {getStatusDisplay(contract.status)}
              </Badge>
            </div>
          </div>

          {/* Category and Priority Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {contract.category && (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(contract.category)}`}>
                  {contract.category}
                </span>
              )}
              
              {contract.priority_level && (
                <Badge variant={getPriorityBadgeVariant(contract.priority_level)} className={getPriorityColor(contract.priority_level)}>
                  {contract.priority_level.toUpperCase()} Priority
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              {contract.document_hash && (
                <div className="flex items-center space-x-1">
                  <Hash className="h-3 w-3" />
                  <span>Verified</span>
                </div>
              )}
            </div>
          </div>

          {/* Tags Section */}
          {contract.tags && contract.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {contract.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded">
                  #{tag}
                </span>
              ))}
              {contract.tags.length > 3 && (
                <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded">
                  +{contract.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Additional Info Section */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {contract.counterparty_name && (
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Counterparty:</span>
                <span className="font-medium">{contract.counterparty_name}</span>
              </div>
            )}
            
            {(contract.expiry_date || contract.renewal_date) && (
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {contract.expiry_date ? 'Expires:' : 'Renews:'}
                </span>
                <span className={`font-medium ${isExpiringOrRenewing() ? 'text-destructive' : ''}`}>
                  {formatDate(contract.expiry_date || contract.renewal_date)}
                </span>
              </div>
            )}
          </div>

          {/* Actions Section */}
          <div className="flex justify-end space-x-2 pt-2 border-t">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast({ title: "View Contract", description: "Contract viewer opening..." })}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDownload(contract.file_path, contract.name)}
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                if (confirm('Are you sure you want to delete this contract?')) {
                  onDelete(contract.id, contract.file_path);
                }
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
