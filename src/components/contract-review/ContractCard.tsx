import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { FileText, Eye, Download, Trash2 } from 'lucide-react';
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

  const getRiskColor = (score?: number) => {
    if (!score) return 'text-muted-foreground';
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold">{contract.name}</h3>
              <p className="text-sm text-muted-foreground">
                {contract.contract_type || 'Contract'} • {new Date(contract.uploaded_at).toLocaleDateString()}
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
            
            <div className="flex space-x-2">
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
        </div>
      </CardContent>
    </Card>
  );
};