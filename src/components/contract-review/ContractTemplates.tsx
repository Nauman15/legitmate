import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Star, Eye, Download } from 'lucide-react';

const contractTemplates = [
  {
    name: 'Non-Disclosure Agreement (NDA)',
    description: 'Standard NDA template for Indian businesses',
    category: 'Legal',
    rating: 4.8
  },
  {
    name: 'Employment Contract',
    description: 'Comprehensive employment agreement template',
    category: 'HR',
    rating: 4.9
  },
  {
    name: 'Vendor Agreement',
    description: 'Standard vendor/supplier agreement template',
    category: 'Procurement',
    rating: 4.7
  },
  {
    name: 'Service Agreement',
    description: 'Professional service agreement template',
    category: 'Service',
    rating: 4.6
  }
];

export const ContractTemplates = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contract Templates</h2>
        <Button variant="hero" onClick={() => toast({ title: "Upload Template", description: "Template upload functionality coming soon" })}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contractTemplates.map((template, index) => (
          <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <FileText className="h-8 w-8 text-primary" />
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-accent fill-current" />
                  <span className="text-sm font-medium">{template.rating}</span>
                </div>
              </div>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Badge variant="outline">{template.category}</Badge>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => toast({ title: "Preview", description: `Previewing ${template.name}...` })}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button 
                  variant="professional" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => toast({ title: "Template", description: `Using ${template.name} template...` })}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};