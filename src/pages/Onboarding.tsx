import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, Building, Users, Shield, CheckCircle } from 'lucide-react';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    businessType: '',
    industry: '',
    employeeCount: '',
    gstNumber: '',
    companySize: '',
    selectedModules: [] as string[],
    contactPerson: '',
    email: '',
    phone: ''
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const businessTypes = [
    'Private Limited Company',
    'Public Limited Company',
    'Partnership Firm',
    'LLP (Limited Liability Partnership)',
    'Sole Proprietorship',
    'One Person Company (OPC)',
    'Section 8 Company',
    'Startup'
  ];

  const industries = [
    'Technology/Software',
    'Manufacturing',
    'Healthcare',
    'Finance/Banking',
    'Retail/E-commerce',
    'Real Estate',
    'Education',
    'Consulting',
    'Other'
  ];

  const complianceModules = [
    {
      id: 'gst',
      title: 'GST Compliance',
      description: 'Automated GST filing and return management',
      icon: Shield,
      recommended: true
    },
    {
      id: 'contracts',
      title: 'Contract Management',
      description: 'AI-powered contract review and management',
      icon: Building,
      recommended: true
    },
    {
      id: 'labor',
      title: 'Labor Law Compliance',
      description: 'Employee compliance and labor law management',
      icon: Users,
      recommended: false
    },
    {
      id: 'company',
      title: 'Company Filings',
      description: 'ROC filings and corporate compliance',
      icon: Building,
      recommended: true
    },
    {
      id: 'alerts',
      title: 'Regulatory Alerts',
      description: 'Real-time regulatory change notifications',
      icon: Shield,
      recommended: true
    }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleModuleToggle = (moduleId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedModules: prev.selectedModules.includes(moduleId)
        ? prev.selectedModules.filter(id => id !== moduleId)
        : [...prev.selectedModules, moduleId]
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Building className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Company Information</h2>
              <p className="text-muted-foreground">Tell us about your business</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                  placeholder="Enter your company name"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="businessType">Business Type *</Label>
                <Select value={formData.businessType} onValueChange={(value) => setFormData(prev => ({ ...prev, businessType: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Select value={formData.industry} onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                <Input
                  id="gstNumber"
                  value={formData.gstNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, gstNumber: e.target.value }))}
                  placeholder="Enter GST number if applicable"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Users className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Company Size</h2>
              <p className="text-muted-foreground">Help us understand your business scale</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="employeeCount">Number of Employees *</Label>
                <Select value={formData.employeeCount} onValueChange={(value) => setFormData(prev => ({ ...prev, employeeCount: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select employee count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="500+">500+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="companySize">Company Size Category *</Label>
                <Select value={formData.companySize} onValueChange={(value) => setFormData(prev => ({ ...prev, companySize: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="startup">Startup (0-2 years old)</SelectItem>
                    <SelectItem value="sme">Small & Medium Enterprise</SelectItem>
                    <SelectItem value="enterprise">Large Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Shield className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Select Compliance Modules</h2>
              <p className="text-muted-foreground">Choose the compliance areas relevant to your business</p>
            </div>
            
            <div className="space-y-4">
              {complianceModules.map((module) => (
                <Card 
                  key={module.id} 
                  className={`cursor-pointer transition-all duration-200 ${
                    formData.selectedModules.includes(module.id) 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:shadow-card'
                  }`}
                  onClick={() => handleModuleToggle(module.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <Checkbox 
                        checked={formData.selectedModules.includes(module.id)}
                        onChange={() => handleModuleToggle(module.id)}
                      />
                      <module.icon className="h-6 w-6 text-primary mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{module.title}</h3>
                          {module.recommended && (
                            <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <CheckCircle className="h-12 w-12 text-success mx-auto" />
              <h2 className="text-2xl font-bold">Contact Information</h2>
              <p className="text-muted-foreground">Final step to complete your setup</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="contactPerson">Contact Person Name *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                  placeholder="Enter contact person name"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Business Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter business email"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter phone number"
                  className="mt-1"
                />
              </div>
            </div>
            
            <Card className="bg-gradient-subtle p-4">
              <h3 className="font-semibold mb-2">Setup Summary</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p><strong>Company:</strong> {formData.companyName}</p>
                <p><strong>Type:</strong> {formData.businessType}</p>
                <p><strong>Industry:</strong> {formData.industry}</p>
                <p><strong>Selected Modules:</strong> {formData.selectedModules.length} modules</p>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-elegant">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold bg-gradient-hero bg-clip-text text-transparent">
              LegitMate
            </span>
          </div>
          <CardTitle className="text-xl">Welcome to LegitMate</CardTitle>
          <CardDescription>
            Let's set up your compliance management system
          </CardDescription>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {renderStep()}
          
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button variant="hero" onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button variant="success">
                Complete Setup
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;