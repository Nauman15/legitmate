import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  FileText, 
  BarChart3, 
  Bell, 
  FileCheck, 
  Users, 
  BookOpen, 
  TrendingUp,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Landing = () => {
  const features = [
    {
      icon: Shield,
      title: 'GST Compliance',
      description: 'Automated GST filing, return generation, and compliance tracking',
      badge: 'Popular'
    },
    {
      icon: FileText,
      title: 'Contract Management',
      description: 'AI-powered contract review, drafting, and lifecycle management',
      badge: 'AI-Powered'
    },
    {
      icon: Bell,
      title: 'Regulatory Alerts',
      description: 'Real-time notifications for regulatory changes and deadlines',
      badge: 'Real-time'
    },
    {
      icon: FileCheck,
      title: 'Automated Filings',
      description: 'Streamlined company filings with ROC, MCA, and other authorities',
      badge: 'Automated'
    },
    {
      icon: BarChart3,
      title: 'Risk Analytics',
      description: 'Advanced analytics to identify and mitigate compliance risks',
      badge: 'Analytics'
    },
    {
      icon: BookOpen,
      title: 'Knowledge Base',
      description: 'Comprehensive library of legal and regulatory information',
      badge: 'Updated'
    }
  ];

  const benefits = [
    'Reduce compliance costs by up to 70%',
    'Minimize regulatory penalties and risks',
    'Save 20+ hours per week on legal tasks',
    'Stay updated with real-time regulatory changes',
    'Access expert legal guidance 24/7',
    'Streamline document management'
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
                  Trusted by 10,000+ SMEs
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Automate Legal Compliance for Your
                  <span className="block text-accent-glow">Indian Business</span>
                </h1>
                <p className="text-xl text-primary-foreground/80 max-w-2xl">
                  LegitMate simplifies GST, labor laws, company filings, and contract management 
                  for SMEs and startups across India. Stay compliant, reduce costs, minimize risks.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
                  <Link to="/onboarding">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link to="/demo">
                    Watch Demo
                  </Link>
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-primary-foreground/70">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>30-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src={heroImage} 
                alt="Legal compliance dashboard"
                className="rounded-lg shadow-glow w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Complete Compliance Solution
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to manage legal and regulatory compliance for your Indian business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-card transition-all duration-300 border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <feature.icon className="h-12 w-12 text-primary group-hover:text-accent transition-colors" />
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                  Why Choose LegitMate?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Join thousands of Indian businesses who trust LegitMate for their compliance needs
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button variant="professional" size="lg" asChild>
                <Link to="/onboarding">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card className="p-6 bg-gradient-primary text-primary-foreground">
                  <div className="text-3xl font-bold">70%</div>
                  <div className="text-sm opacity-80">Cost Reduction</div>
                </Card>
                <Card className="p-6">
                  <div className="text-3xl font-bold text-accent">24/7</div>
                  <div className="text-sm text-muted-foreground">Expert Support</div>
                </Card>
              </div>
              <div className="space-y-6 pt-8">
                <Card className="p-6">
                  <div className="text-3xl font-bold text-success">10K+</div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </Card>
                <Card className="p-6 bg-gradient-accent text-accent-foreground">
                  <div className="text-3xl font-bold">99.9%</div>
                  <div className="text-sm opacity-80">Compliance Rate</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ready to Simplify Your Compliance?
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Join thousands of Indian businesses who trust LegitMate for seamless compliance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
                <Link to="/onboarding">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;