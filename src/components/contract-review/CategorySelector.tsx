
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useContracts } from '@/hooks/useContracts';
import { FileText, Building, Users, Shield, Briefcase, Home, Handshake, Code, Plus } from 'lucide-react';

const categoryIcons = {
  'Employment Contract': Users,
  'Non-Disclosure Agreement': Shield,
  'Service Agreement': Briefcase,
  'Vendor Agreement': Building,
  'Lease Agreement': Home,
  'Partnership Agreement': Handshake,
  'License Agreement': Code,
  'Other': FileText
};

interface CategorySelectorProps {
  selectedCategory?: string;
  onCategorySelect: (category: string) => void;
  suggestedCategory?: string;
  confidence?: number;
}

export const CategorySelector = ({ 
  selectedCategory, 
  onCategorySelect, 
  suggestedCategory,
  confidence 
}: CategorySelectorProps) => {
  const { categories } = useContracts();
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const handleCategorySelect = (category: string) => {
    onCategorySelect(category);
    setShowCustomInput(false);
    setCustomCategory('');
  };

  const handleCustomCategory = () => {
    if (customCategory.trim()) {
      handleCategorySelect(customCategory.trim());
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Contract Category</CardTitle>
        <CardDescription>
          {suggestedCategory && confidence ? (
            <span className="text-success">
              AI suggests: <strong>{suggestedCategory}</strong> 
              <span className="ml-1 text-xs">({Math.round(confidence * 100)}% confidence)</span>
            </span>
          ) : (
            'Select the most appropriate category for this contract'
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((category) => {
            const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons] || FileText;
            const isSelected = selectedCategory === category.name;
            const isSuggested = suggestedCategory === category.name;
            
            return (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.name)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                  isSelected 
                    ? 'border-primary bg-primary/5' 
                    : isSuggested
                    ? 'border-success bg-success/5'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <IconComponent className={`h-4 w-4 ${
                    isSelected ? 'text-primary' : isSuggested ? 'text-success' : 'text-muted-foreground'
                  }`} />
                  {isSuggested && !isSelected && (
                    <Badge variant="outline" className="text-xs px-1 py-0">AI</Badge>
                  )}
                </div>
                <div className="text-sm font-medium">{category.name}</div>
                {category.description && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {category.description}
                  </div>
                )}
              </button>
            );
          })}
          
          {/* Custom Category Option */}
          <button
            onClick={() => setShowCustomInput(true)}
            className="p-3 rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 text-left"
          >
            <div className="flex items-center space-x-2 mb-1">
              <Plus className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-sm font-medium">Custom Category</div>
            <div className="text-xs text-muted-foreground mt-1">
              Create your own category
            </div>
          </button>
        </div>

        {showCustomInput && (
          <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
            <Label htmlFor="custom-category">Custom Category Name</Label>
            <div className="flex space-x-2">
              <Input
                id="custom-category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter category name..."
                onKeyPress={(e) => e.key === 'Enter' && handleCustomCategory()}
              />
              <Button onClick={handleCustomCategory} disabled={!customCategory.trim()}>
                Add
              </Button>
              <Button variant="outline" onClick={() => setShowCustomInput(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {selectedCategory && (
          <div className="text-sm text-muted-foreground">
            Selected: <span className="font-medium text-foreground">{selectedCategory}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
