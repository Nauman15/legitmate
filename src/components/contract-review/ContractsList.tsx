
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Search, Filter, FileText, Loader2, Grid, List, SlidersHorizontal } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filterOptions = [
    { value: 'all', label: 'All Contracts' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'analyzing', label: 'Under Analysis' },
    { value: 'reviewed', label: 'Reviewed' },
    { value: 'needs_attention', label: 'Needs Attention' },
    { value: 'high_priority', label: 'High Priority' }
  ];

  const filteredContracts = contracts.filter(contract => {
    // Search filter
    const matchesSearch = !searchQuery || 
      contract.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.counterparty_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    // Status/priority filter
    const matchesFilter = selectedFilter === 'all' ||
      contract.status === selectedFilter ||
      (selectedFilter === 'high_priority' && contract.priority_level === 'high');

    return matchesSearch && matchesFilter;
  });

  const handleAdvancedFilters = () => {
    toast({ 
      title: "Advanced Filters", 
      description: "Advanced filtering panel coming soon with category, date range, and tag filters." 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">My Contracts</h2>
          <p className="text-muted-foreground">
            {filteredContracts.length} of {contracts.length} contracts
          </p>
        </div>
        
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-4 md:space-y-0">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contracts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          {/* Filter Dropdown */}
          <select 
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background text-foreground"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Advanced Filters */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAdvancedFilters}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>

          {/* View Mode Toggle */}
          <div className="flex rounded-md border">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading contracts...</p>
        </div>
      ) : filteredContracts.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          {searchQuery || selectedFilter !== 'all' ? (
            <>
              <p className="text-muted-foreground mb-2">No contracts match your filters</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </>
          ) : (
            <>
              <p className="text-muted-foreground">No contracts uploaded yet</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => document.getElementById('contract-upload')?.click()}
              >
                Upload Your First Contract
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 gap-4' 
            : 'space-y-4'
        }>
          {filteredContracts.map((contract) => (
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
