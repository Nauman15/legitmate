import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, FileCheck, Loader2 } from 'lucide-react';
import { Contract } from '@/hooks/useContracts';

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const processFile = async (file: File) => {
    // Only allow PDF files as requested
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file only.",
        variant: "destructive"
      });
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }

    try {
      await onFileUpload(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload contract. Please try again.",
        variant: "destructive"
      });
    }
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

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Upload Contract for Review</CardTitle>
        <CardDescription>
          Upload your PDF contract document for AI-powered analysis
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
            Drop your PDF contract here or click to upload
          </p>
          <Input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="contract-upload"
          />
          <Label htmlFor="contract-upload">
            <Button variant="outline" className="cursor-pointer">
              Choose PDF File
            </Button>
          </Label>
          <div className="text-xs text-muted-foreground mt-2">
            Only PDF files allowed (Max 10MB)
          </div>
        </div>

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
  );
};