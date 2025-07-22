
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, FileCheck, Loader2, X, CheckCircle } from 'lucide-react';
import { Contract } from '@/hooks/useContracts';
import { CategorySelector } from './CategorySelector';

interface FileUploadItem {
  file: File;
  id: string;
  status: 'uploading' | 'extracting' | 'categorizing' | 'complete' | 'error';
  progress: number;
  contract?: Contract;
  suggestedCategory?: string;
  categoryConfidence?: number;
  error?: string;
}

interface FileUploadProps {
  onFileUpload: (file: File) => Promise<Contract>;
  onAnalyze: (contract: Contract) => Promise<void>;
  uploadedFile: File | null;
  selectedContract: Contract | null;
  isAnalyzing: boolean;
}

export const FileUpload = ({ 
  onFileUpload, 
  onAnalyze, 
  uploadedFile, 
  selectedContract, 
  isAnalyzing 
}: FileUploadProps) => {
  const { toast } = useToast();
  const [dragOver, setDragOver] = useState(false);
  const [uploadQueue, setUploadQueue] = useState<FileUploadItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      processFiles(Array.from(files));
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const files = Array.from(event.dataTransfer.files);
    processFiles(files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const processFiles = async (files: File[]) => {
    const validFiles = files.filter(file => {
      if (file.type !== 'application/pdf') {
        toast({
          title: "Invalid File Type",
          description: `${file.name} is not a PDF file. Only PDF files are allowed.`,
          variant: "destructive"
        });
        return false;
      }

      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: `${file.name} is larger than 10MB. Please upload a smaller file.`,
          variant: "destructive"
        });
        return false;
      }

      return true;
    });

    if (validFiles.length === 0) return;

    const newUploadItems: FileUploadItem[] = validFiles.map(file => ({
      file,
      id: `${Date.now()}-${Math.random()}`,
      status: 'uploading',
      progress: 0
    }));

    setUploadQueue(prev => [...prev, ...newUploadItems]);

    // Process each file
    for (const item of newUploadItems) {
      try {
        await processSingleFile(item);
      } catch (error) {
        console.error('Error processing file:', error);
        updateUploadItem(item.id, { 
          status: 'error', 
          error: 'Failed to upload contract. Please try again.' 
        });
      }
    }
  };

  const processSingleFile = async (item: FileUploadItem) => {
    // Upload phase
    updateUploadItem(item.id, { status: 'uploading', progress: 30 });
    
    try {
      const contract = await onFileUpload(item.file);
      
      // Extract text phase
      updateUploadItem(item.id, { status: 'extracting', progress: 60 });
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate extraction
      
      // Categorization phase
      updateUploadItem(item.id, { status: 'categorizing', progress: 80 });
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate categorization
      
      // Complete
      updateUploadItem(item.id, { 
        status: 'complete', 
        progress: 100, 
        contract,
        suggestedCategory: contract.category,
        categoryConfidence: 0.85 // Mock confidence
      });

      toast({
        title: "Upload Successful",
        description: `${item.file.name} has been uploaded and processed.`
      });

    } catch (error) {
      updateUploadItem(item.id, { 
        status: 'error', 
        error: 'Upload failed. Please try again.' 
      });
    }
  };

  const updateUploadItem = (id: string, updates: Partial<FileUploadItem>) => {
    setUploadQueue(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const removeUploadItem = (id: string) => {
    setUploadQueue(prev => prev.filter(item => item.id !== id));
  };

  const handleAnalyzeContract = async () => {
    if (!selectedContract) return;
    try {
      await onAnalyze(selectedContract);
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your contract. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'uploading': return 'Uploading...';
      case 'extracting': return 'Extracting text...';
      case 'categorizing': return 'Auto-categorizing...';
      case 'complete': return 'Complete';
      case 'error': return 'Error';
      default: return 'Processing...';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'text-success';
      case 'error': return 'text-destructive';
      default: return 'text-primary';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Upload Contracts for Review</CardTitle>
          <CardDescription>
            Upload your PDF contracts for AI-powered analysis. Multiple files supported.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
              dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className={`h-12 w-12 mx-auto mb-4 ${dragOver ? 'text-primary' : 'text-muted-foreground'}`} />
            <p className="text-sm text-muted-foreground mb-2">
              Drop your PDF contracts here or click to upload
            </p>
            <Input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="contract-upload"
            />
            <Label htmlFor="contract-upload">
              <Button variant="outline" className="cursor-pointer">
                Choose PDF Files
              </Button>
            </Label>
            <div className="text-xs text-muted-foreground mt-2">
              Multiple PDF files allowed (Max 10MB each)
            </div>
          </div>

          {/* Upload Queue */}
          {uploadQueue.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Upload Progress</h4>
              {uploadQueue.map((item) => (
                <div key={item.id} className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <span className="text-sm font-medium">{item.file.name}</span>
                        <p className="text-xs text-muted-foreground">
                          {(item.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {item.status === 'complete' && (
                        <CheckCircle className="h-5 w-5 text-success" />
                      )}
                      {item.status === 'error' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeUploadItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                      {!['complete', 'error'].includes(item.status) && (
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className={getStatusColor(item.status)}>
                        {getStatusText(item.status)}
                      </span>
                      <span>{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                    
                    {item.error && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertDescription className="text-xs">
                          {item.error}
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {item.suggestedCategory && (
                      <div className="text-xs text-success">
                        ✓ Auto-categorized as: <span className="font-medium">{item.suggestedCategory}</span>
                        {item.categoryConfidence && (
                          <span className="ml-1">({Math.round(item.categoryConfidence * 100)}% confidence)</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Legacy single file support */}
          {uploadedFile && selectedContract && (
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <span className="text-sm font-medium">{uploadedFile.name}</span>
                      <p className="text-xs text-muted-foreground">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="professional" 
                    size="sm" 
                    onClick={handleAnalyzeContract}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FileCheck className="mr-2 h-4 w-4" />
                        Analyze Contract
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {isAnalyzing && (
                <Alert>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <AlertDescription>
                    AI is scanning your contract for Indian regulatory compliance issues. This may take a few moments...
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Selector for completed uploads */}
      {uploadQueue.some(item => item.status === 'complete') && (
        <CategorySelector
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          suggestedCategory={uploadQueue.find(item => item.status === 'complete')?.suggestedCategory}
          confidence={uploadQueue.find(item => item.status === 'complete')?.categoryConfidence}
        />
      )}
    </div>
  );
};
