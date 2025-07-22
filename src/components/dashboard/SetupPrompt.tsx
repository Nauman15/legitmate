
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Upload, Plus, Settings } from 'lucide-react';

interface SetupPromptProps {
  title: string;
  description: string;
  actionText: string;
  onAction: () => void;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  progress?: number;
}

export const SetupPrompt = ({ 
  title, 
  description, 
  actionText, 
  onAction, 
  icon,
  variant = 'primary',
  progress 
}: SetupPromptProps) => {
  return (
    <Card className="setup-prompt action-card">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {icon && (
            <div className={`p-3 rounded-full ${
              variant === 'primary' ? 'bg-primary/10 text-primary' :
              variant === 'secondary' ? 'bg-secondary/10 text-secondary' :
              'bg-accent/10 text-accent'
            }`}>
              {icon}
            </div>
          )}
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-force-visible">{title}</h3>
            <p className="text-sm text-force-muted leading-relaxed">{description}</p>
          </div>

          {progress !== undefined && (
            <div className="w-full space-y-2">
              <div className="flex justify-between text-xs text-force-muted">
                <span>Setup Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <Button 
            onClick={onAction}
            className="w-full btn-stamp"
            variant="default"
          >
            {actionText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Quick action variants for different setup types
export const UploadSetupPrompt = ({ onUpload }: { onUpload: () => void }) => (
  <SetupPrompt
    title="Get Started with Document Upload"
    description="Upload your first contract or compliance document to unlock AI-powered analysis and insights."
    actionText="Upload Document"
    onAction={onUpload}
    icon={<Upload className="h-6 w-6" />}
    variant="primary"
    progress={0}
  />
);

export const ComplianceSetupPrompt = ({ onSetup }: { onSetup: () => void }) => (
  <SetupPrompt
    title="Setup Compliance Monitoring"
    description="Configure your business details to receive personalized compliance alerts and deadlines."
    actionText="Start Setup"
    onAction={onSetup}
    icon={<Settings className="h-6 w-6" />}
    variant="accent"
    progress={0}
  />
);

export const CreatePolicyPrompt = ({ onCreate }: { onCreate: () => void }) => (
  <SetupPrompt
    title="Create Your First Policy"
    description="Build comprehensive compliance policies tailored to your business needs and industry."
    actionText="Create Policy"
    onAction={onCreate}
    icon={<Plus className="h-6 w-6" />}
    variant="secondary"
    progress={0}
  />
);
