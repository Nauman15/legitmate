import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useContracts, Contract, ContractAnalysis } from '@/hooks/useContracts';
import { FileText, Upload } from 'lucide-react';
import { FileUpload } from '@/components/contract-review/FileUpload';
import { AnalysisResults } from '@/components/contract-review/AnalysisResults';
import { ContractsList } from '@/components/contract-review/ContractsList';
import { ContractTemplates } from '@/components/contract-review/ContractTemplates';
import { ContractAnalytics } from '@/components/contract-review/ContractAnalytics';

const ContractReview = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [currentAnalyses, setCurrentAnalyses] = useState<ContractAnalysis[]>([]);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  
  const { 
    contracts, 
    loading, 
    uploadContract, 
    analyzeContract, 
    downloadContract,
    deleteContract,
    fetchAnalyses 
  } = useContracts();

  const handleFileUpload = async (file: File) => {
    const contract = await uploadContract(file);
    setUploadedFile(file);
    setSelectedContract(contract as Contract);
    setAnalysisComplete(false);
    setCurrentAnalyses([]);
    return contract as Contract;
  };

  const handleAnalyzeContract = async (contract: Contract) => {
    setIsAnalyzing(true);
    await analyzeContract(contract.id);
    
    // Wait for analysis to complete and fetch results
    setTimeout(async () => {
      const analyses = await fetchAnalyses(contract.id);
      setCurrentAnalyses(analyses as ContractAnalysis[]);
      setAnalysisComplete(true);
      setIsAnalyzing(false);
    }, 3500);
  };


  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <FileText className="mr-3 h-8 w-8 text-primary" />
              Contract Review
            </h1>
            <p className="text-muted-foreground">AI-powered contract analysis and management</p>
          </div>
          <Button 
            variant="hero"
            onClick={() => {
              document.getElementById('contract-upload')?.click();
            }}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Contract
          </Button>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload">Upload & Review</TabsTrigger>
            <TabsTrigger value="contracts">My Contracts ({contracts.length})</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <FileUpload
                onFileUpload={handleFileUpload}
                onAnalyze={handleAnalyzeContract}
                uploadedFile={uploadedFile}
                selectedContract={selectedContract}
                isAnalyzing={isAnalyzing}
              />
              
              <AnalysisResults
                analysisComplete={analysisComplete}
                selectedContract={selectedContract}
                currentAnalyses={currentAnalyses}
              />
            </div>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6">
            <ContractsList
              contracts={contracts}
              loading={loading}
              onDownload={downloadContract}
              onDelete={deleteContract}
            />
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <ContractTemplates />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <ContractAnalytics contracts={contracts} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContractReview;