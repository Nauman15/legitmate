import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Search, Filter, FileText, Loader2 } from 'lucide-react';
import { Contract } from '@/hooks/useContracts';
import { ContractCard } from './ContractCard';

interface ContractsListProps {
  contracts: Contract[];
  loading: boolean;
  onDownload: (filePath: string, name: string) => void;
  onDelete: (id: string, filePath: string) => void;
}

export const ContractsList = ({ contracts, loading, onDownload, onDelete }: ContractsListProps) => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Contracts</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => toast({ title: "Search", description: "Search functionality coming soon" })}>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast({ title: "Filter", description: "Filter functionality coming soon" })}>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading contracts...</p>
        </div>
      ) : contracts.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No contracts uploaded yet</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => document.getElementById('contract-upload')?.click()}
          >
            Upload Your First Contract
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {contracts.map((contract) => (
            <ContractCard
              key={contract.id}
              contract={contract}
              onDownload={onDownload}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};