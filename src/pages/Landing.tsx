import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  FileText, 
  BarChart3, 
  Bell, 
  FileCheck, 
  BookOpen,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Shield,
      title: 'GST Compliance',
      description: 'Automated GST filing, return generation, and compliance tracking'
    },
    {
      icon: FileText,
      title: 'Contract Management',
      description: 'AI-powered contract review, drafting, and lifecycle management'
    },
    {
      icon: Bell,
      title: 'Regulatory Alerts',
      description: 'Real-time notifications for regulatory changes and deadlines'
    },
    {
      icon: FileCheck,
      title: 'Automated Filings',
      description: 'Streamlined company filings with ROC, MCA, and other authorities'
    },
    {
      icon: BarChart3,
      title: 'Risk Analytics',
      description: 'Advanced analytics to identify and mitigate compliance risks'
    },
    {
      icon: BookOpen,
      title: 'Knowledge Base',
      description: 'Comprehensive library of legal and regulatory information'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center space-y-8">
            {/* Logo */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                LegitMate
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 font-medium drop-shadow-md">
                Effortless Legal & Regulatory Compliance for Indian Businesses
              </p>
            </div>
            
            {/* Description */}
            <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto">
              Automate GST compliance, contract management, regulatory filings, and risk analytics. 
              Designed specifically for Indian SMEs and startups to stay compliant, reduce costs, and minimize risks.
            </p>
            
            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-4 h-auto" 
                asChild
              >
                <Link to="/onboarding">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center space-x-8 text-sm text-white/80 pt-8 drop-shadow-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>30-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Complete Compliance Solution
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage legal and regulatory compliance for your Indian business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-card transition-all duration-300 border-border">
                <CardHeader className="text-center">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:text-accent transition-colors" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary text-primary-foreground relative">
        <div className="absolute inset-0 bg-primary/20"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold drop-shadow-lg">
              Ready to Simplify Your Compliance?
            </h2>
            <p className="text-lg text-primary-foreground/90 drop-shadow-md">
              Join thousands of Indian businesses who trust LegitMate for seamless compliance management
            </p>
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-4 h-auto shadow-elegant" 
              asChild
            >
              <Link to="/onboarding">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;