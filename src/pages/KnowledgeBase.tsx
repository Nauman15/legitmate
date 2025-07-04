import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Search, 
  Filter,
  Star,
  Clock,
  User,
  FileText,
  Video,
  MessageCircle,
  Download,
  Bookmark,
  Eye,
  ThumbsUp,
  Share,
  Tag,
  Brain,
  GraduationCap,
  Award,
  Play,
  CheckCircle,
  Users,
  BookOpenCheck,
  Lightbulb,
  Bot,
  HelpCircle,
  Zap,
  Shield,
  Building,
  Scale,
  FileCheck,
  Database
} from 'lucide-react';

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [aiSearchMode, setAiSearchMode] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const categories = [
    { id: 'all', name: 'All Topics', count: 325, icon: BookOpen },
    { id: 'gst', name: 'GST & Tax Laws', count: 78, icon: FileCheck },
    { id: 'labor', name: 'Labor & Employment', count: 65, icon: Users },
    { id: 'company', name: 'Company Law & ROC', count: 52, icon: Building },
    { id: 'contracts', name: 'Contract & Commercial', count: 43, icon: FileText },
    { id: 'compliance', name: 'Regulatory Compliance', count: 38, icon: Shield },
    { id: 'data', name: 'Data Protection & IT', count: 25, icon: Database },
    { id: 'environmental', name: 'Environmental Law', count: 24, icon: Lightbulb }
  ];

  const indianRegulations = [
    {
      id: 'gst-comprehensive',
      title: 'Goods and Services Tax (GST)',
      description: 'Complete guide to GST compliance, filing, and regulations in India',
      topics: [
        'GST Registration Process',
        'GSTR-1, GSTR-3B Filing Requirements',
        'Input Tax Credit Rules',
        'E-way Bill Generation',
        'GST Audit and Assessment',
        'Penalty and Interest Calculations'
      ],
      lastUpdated: '2024-03-20',
      regulations: ['GST Act 2017', 'CGST Rules 2017', 'SGST Act', 'IGST Act'],
      difficulty: 'Intermediate'
    },
    {
      id: 'labor-laws',
      title: 'Labor Laws & Employment Regulations',
      description: 'Comprehensive coverage of Indian labor and employment laws',
      topics: [
        'Contract Labor Act Compliance',
        'Provident Fund (PF) Requirements',
        'Employee State Insurance (ESI)',
        'Minimum Wages Act',
        'POSH Act Implementation',
        'Gratuity Payment Rules'
      ],
      lastUpdated: '2024-03-18',
      regulations: ['Industrial Relations Code 2020', 'Wages Code 2019', 'Social Security Code 2020'],
      difficulty: 'Advanced'
    },
    {
      id: 'company-law',
      title: 'Companies Act & Corporate Compliance',
      description: 'Corporate governance and compliance under Companies Act 2013',
      topics: [
        'Company Incorporation Process',
        'Board Meeting Requirements',
        'Annual Filing Obligations',
        'Related Party Transactions',
        'CSR Compliance Requirements',
        'Secretarial Audit Standards'
      ],
      lastUpdated: '2024-03-15',
      regulations: ['Companies Act 2013', 'Companies Rules 2014', 'SEBI Regulations'],
      difficulty: 'Advanced'
    }
  ];

  const trainingModules = [
    {
      id: 'gst-basics',
      title: 'GST Fundamentals for Business Owners',
      description: 'Interactive AI-driven course covering GST basics, registration, and compliance',
      duration: '3 hours',
      lessons: 12,
      difficulty: 'Beginner',
      enrollments: 1247,
      rating: 4.8,
      instructor: 'AI Legal Assistant',
      topics: ['GST Overview', 'Registration Process', 'Tax Calculations', 'Filing Returns'],
      completionRate: 89,
      certificate: true,
      interactive: true
    },
    {
      id: 'labor-compliance',
      title: 'Employee Relations & Labor Law Compliance',
      description: 'Comprehensive training on managing employee relations within legal framework',
      duration: '4.5 hours',
      lessons: 18,
      difficulty: 'Intermediate',
      enrollments: 892,
      rating: 4.7,
      instructor: 'AI HR Legal Expert',
      topics: ['Contract Management', 'PF/ESI Compliance', 'POSH Implementation', 'Wage Regulations'],
      completionRate: 76,
      certificate: true,
      interactive: true
    },
    {
      id: 'contract-law',
      title: 'Contract Drafting & Review Masterclass',
      description: 'AI-powered training on contract law, drafting skills, and risk assessment',
      duration: '5 hours',
      lessons: 15,
      difficulty: 'Advanced',
      enrollments: 634,
      rating: 4.9,
      instructor: 'AI Legal Counsel',
      topics: ['Contract Elements', 'Risk Identification', 'Negotiation Tactics', 'Dispute Resolution'],
      completionRate: 82,
      certificate: true,
      interactive: true
    },
    {
      id: 'compliance-officer',
      title: 'Compliance Officer Certification Program',
      description: 'Comprehensive certification program for compliance professionals',
      duration: '8 hours',
      lessons: 24,
      difficulty: 'Expert',
      enrollments: 456,
      rating: 4.8,
      instructor: 'AI Compliance Expert',
      topics: ['Regulatory Framework', 'Risk Management', 'Audit Procedures', 'Reporting Standards'],
      completionRate: 71,
      certificate: true,
      interactive: true
    }
  ];

  const aiSearchSuggestions = [
    "What are the penalties for late GST filing?",
    "How to implement POSH Act in my company?",
    "What are the PF contribution rates for 2024?",
    "When is annual filing due for private companies?",
    "How to calculate minimum wages in different states?",
    "What are the new labor code changes?"
  ];

  const featuredArticles = [
    {
      id: 1,
      title: 'Complete Guide to GST Filing for Startups',
      description: 'Step-by-step guide covering GST registration, return filing, and compliance requirements for Indian startups.',
      category: 'GST & Tax',
      author: 'Legal Expert Team',
      readTime: '12 min read',
      views: 2847,
      likes: 156,
      publishDate: '2024-03-15',
      tags: ['GST', 'Startup', 'Filing', 'Compliance'],
      type: 'article',
      featured: true
    },
    {
      id: 2,
      title: 'Labor Law Compliance Checklist 2024',
      description: 'Comprehensive checklist covering all major labor law requirements for Indian businesses.',
      category: 'Labor Laws',
      author: 'HR Compliance Team',
      readTime: '8 min read',
      views: 1923,
      likes: 89,
      publishDate: '2024-03-12',
      tags: ['Labor Law', 'Compliance', 'Checklist', 'HR'],
      type: 'checklist',
      featured: true
    },
    {
      id: 3,
      title: 'Contract Review Best Practices',
      description: 'Learn how to effectively review contracts, identify risks, and negotiate better terms.',
      category: 'Contract Law',
      author: 'Legal Advisory',
      readTime: '15 min read',
      views: 3156,
      likes: 234,
      publishDate: '2024-03-08',
      tags: ['Contracts', 'Legal Review', 'Risk Management'],
      type: 'guide',
      featured: true
    }
  ];

  const allArticles = [
    {
      id: 4,
      title: 'Understanding PF and ESI Contributions',
      description: 'Detailed explanation of provident fund and employee state insurance contributions.',
      category: 'Labor Laws',
      author: 'Payroll Expert',
      readTime: '6 min read',
      views: 1456,
      likes: 67,
      publishDate: '2024-03-10',
      tags: ['PF', 'ESI', 'Payroll'],
      type: 'article',
      featured: false
    },
    {
      id: 5,
      title: 'Digital Signature Certificate Guide',
      description: 'How to obtain and use digital signature certificates for official filings.',
      category: 'Company Law',
      author: 'Tech Team',
      readTime: '4 min read',
      views: 892,
      likes: 34,
      publishDate: '2024-03-08',
      tags: ['DSC', 'Digital Signature', 'Filing'],
      type: 'tutorial',
      featured: false
    },
    {
      id: 6,
      title: 'POSH Act Implementation Guide',
      description: 'Complete guide to implementing Prevention of Sexual Harassment policies.',
      category: 'Labor Laws',
      author: 'Legal Team',
      readTime: '10 min read',
      views: 2134,
      likes: 145,
      publishDate: '2024-03-05',
      tags: ['POSH', 'Workplace Safety', 'Policy'],
      type: 'guide',
      featured: false
    }
  ];

  const videoTutorials = [
    {
      id: 1,
      title: 'GST Return Filing Walkthrough',
      description: 'Step-by-step video tutorial for filing GST returns online.',
      duration: '18:45',
      views: 5623,
      category: 'GST & Tax',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'Employee Onboarding Legal Requirements',
      description: 'Video guide covering all legal requirements for employee onboarding.',
      duration: '12:30',
      views: 3412,
      category: 'Labor Laws',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: 'Contract Negotiation Strategies',
      description: 'Learn effective contract negotiation techniques and strategies.',
      duration: '22:15',
      views: 4567,
      category: 'Contract Law',
      thumbnail: '/api/placeholder/300/200'
    }
  ];

  const faqData = [
    {
      question: 'What is the penalty for late GST filing?',
      answer: 'Late GST filing attracts a penalty of ₹200 per day for each act (CGST and SGST), with a minimum penalty of ₹500. The maximum penalty is 0.25% of turnover.',
      category: 'GST & Tax',
      votes: 45
    },
    {
      question: 'How often should employee contracts be reviewed?',
      answer: 'Employee contracts should be reviewed annually or whenever there are changes in labor laws, company policies, or job responsibilities.',
      category: 'Labor Laws',
      votes: 32
    },
    {
      question: 'What documents are required for company incorporation?',
      answer: 'Key documents include MOA, AOA, Form INC-2, Director\'s DIN, Digital Signature Certificate, and address proof for registered office.',
      category: 'Company Law',
      votes: 28
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText className="h-4 w-4" />;
      case 'guide': return <BookOpen className="h-4 w-4" />;
      case 'checklist': return <FileText className="h-4 w-4" />;
      case 'tutorial': return <Video className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'text-primary';
      case 'guide': return 'text-accent';
      case 'checklist': return 'text-success';
      case 'tutorial': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <BookOpen className="mr-3 h-8 w-8 text-primary" />
              Knowledge Base
            </h1>
            <p className="text-muted-foreground">Comprehensive legal and compliance resources for Indian businesses</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Bookmark className="mr-2 h-4 w-4" />
              Bookmarks
            </Button>
            <Button variant="hero">
              <MessageCircle className="mr-2 h-4 w-4" />
              Ask Expert
            </Button>
          </div>
        </div>

        {/* Enhanced AI Search Bar */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Bot className="mr-2 h-5 w-5 text-primary" />
                  AI-Powered Compliance Search
                </h3>
                <Button
                  variant={aiSearchMode ? "hero" : "outline"}
                  size="sm"
                  onClick={() => setAiSearchMode(!aiSearchMode)}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  {aiSearchMode ? "AI Mode Active" : "Enable AI Search"}
                </Button>
              </div>
              
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder={aiSearchMode ? "Ask any compliance question..." : "Search articles, guides, FAQs..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-base"
                  />
                  {aiSearchMode && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Bot className="h-5 w-5 text-primary animate-pulse" />
                    </div>
                  )}
                </div>
                <Button variant="professional" className="h-12">
                  <Search className="mr-2 h-5 w-5" />
                  {aiSearchMode ? "Ask AI" : "Search"}
                </Button>
                <Button variant="outline" className="h-12">
                  <Filter className="mr-2 h-5 w-5" />
                  Filter
                </Button>
              </div>
              
              {aiSearchMode && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    <Zap className="inline h-4 w-4 mr-1" />
                    AI Assistant will analyze your question and provide relevant regulations, case studies, and actionable advice.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Quick questions:</span>
                    {aiSearchSuggestions.slice(0, 3).map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => setSearchQuery(suggestion)}
                      >
                        <HelpCircle className="mr-1 h-3 w-3" />
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted/50 text-muted-foreground'
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card className="shadow-card mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Tag className="mr-2 h-5 w-5" />
                  Popular Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['GST', 'Labor Law', 'Contracts', 'Compliance', 'Filing', 'Startup', 'HR', 'Tax'].map((tag, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer hover:bg-primary/10">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="articles" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="regulations">Regulations</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="faqs">FAQs</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>

              <TabsContent value="articles" className="space-y-6">
                {/* Featured Articles */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="mr-2 h-5 w-5 text-accent fill-current" />
                      Featured Articles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {featuredArticles.map((article) => (
                      <Card key={article.id} className="border border-border hover:shadow-card transition-all duration-200">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className={getTypeColor(article.type)}>
                                  {getTypeIcon(article.type)}
                                </div>
                                <Badge variant="outline">{article.category}</Badge>
                                {article.featured && (
                                  <Badge className="bg-gradient-accent text-accent-foreground">Featured</Badge>
                                )}
                              </div>
                              
                              <h3 className="text-xl font-semibold mb-2 hover:text-primary cursor-pointer">
                                {article.title}
                              </h3>
                              <p className="text-muted-foreground mb-3">{article.description}</p>
                              
                              <div className="flex flex-wrap items-center gap-2 mb-3">
                                {article.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                                <div className="flex items-center">
                                  <User className="h-4 w-4 mr-1" />
                                  {article.author}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {article.readTime}
                                </div>
                                <div className="flex items-center">
                                  <Eye className="h-4 w-4 mr-1" />
                                  {article.views} views
                                </div>
                                <div className="flex items-center">
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  {article.likes}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col space-y-2 ml-6">
                              <Button variant="professional" size="sm">
                                <BookOpen className="mr-2 h-4 w-4" />
                                Read
                              </Button>
                              <Button variant="outline" size="sm">
                                <Bookmark className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Share className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>

                {/* All Articles */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>All Articles</CardTitle>
                    <CardDescription>Browse our complete collection of legal and compliance resources</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {allArticles.map((article) => (
                      <div key={article.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className={getTypeColor(article.type)}>
                              {getTypeIcon(article.type)}
                            </div>
                            <h3 className="font-semibold hover:text-primary cursor-pointer">{article.title}</h3>
                            <Badge variant="outline" className="text-xs">{article.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{article.description}</p>
                          <div className="flex items-center text-xs text-muted-foreground space-x-3">
                            <span>{article.author}</span>
                            <span>{article.readTime}</span>
                            <span>{article.views} views</span>
                            <span>{article.likes} likes</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <BookOpen className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="regulations" className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Scale className="mr-2 h-5 w-5 text-primary" />
                      Indian Regulations & Laws
                    </CardTitle>
                    <CardDescription>Browse comprehensive guides to Indian regulatory framework</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {indianRegulations.map((regulation) => (
                      <Card key={regulation.id} className="border border-border hover:shadow-elegant transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <h3 className="text-xl font-semibold">{regulation.title}</h3>
                                <Badge variant={regulation.difficulty === 'Advanced' ? 'destructive' : regulation.difficulty === 'Intermediate' ? 'secondary' : 'outline'}>
                                  {regulation.difficulty}
                                </Badge>
                              </div>
                              
                              <p className="text-muted-foreground mb-4">{regulation.description}</p>
                              
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold text-sm mb-2 flex items-center">
                                    <BookOpenCheck className="mr-1 h-4 w-4 text-primary" />
                                    Covered Topics:
                                  </h4>
                                  <div className="grid grid-cols-2 gap-2">
                                    {regulation.topics.map((topic, index) => (
                                      <div key={index} className="flex items-center text-sm">
                                        <CheckCircle className="h-3 w-3 mr-2 text-success flex-shrink-0" />
                                        <span>{topic}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold text-sm mb-2 flex items-center">
                                    <FileCheck className="mr-1 h-4 w-4 text-accent" />
                                    Related Regulations:
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {regulation.regulations.map((reg, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {reg}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="text-sm text-muted-foreground">
                                  <span className="font-medium">Last Updated:</span> {regulation.lastUpdated}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col space-y-2 ml-6">
                              <Button variant="professional" size="sm">
                                <BookOpen className="mr-2 h-4 w-4" />
                                Study Guide
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                              <Button variant="outline" size="sm">
                                <Bookmark className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="training" className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                      AI-Driven Training Modules
                    </CardTitle>
                    <CardDescription>Interactive training courses powered by AI for employee development</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {trainingModules.map((module) => (
                        <Card key={module.id} className="border border-border hover:shadow-elegant transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Brain className="h-5 w-5 text-primary" />
                                    <Badge variant={module.difficulty === 'Expert' ? 'destructive' : module.difficulty === 'Advanced' ? 'secondary' : 'outline'}>
                                      {module.difficulty}
                                    </Badge>
                                    {module.certificate && (
                                      <Badge className="bg-gradient-accent text-accent-foreground">
                                        <Award className="mr-1 h-3 w-3" />
                                        Certificate
                                      </Badge>
                                    )}
                                  </div>
                                  
                                  <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                                  <p className="text-muted-foreground text-sm mb-3">{module.description}</p>
                                </div>
                              </div>
                              
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                    <span>{module.duration}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                                    <span>{module.lessons} lessons</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                                    <span>{module.enrollments} enrolled</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 mr-1 text-warning fill-current" />
                                    <span>{module.rating}/5.0</span>
                                  </div>
                                </div>
                                
                                <div>
                                  <span className="text-sm font-medium text-muted-foreground">Topics Covered:</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {module.topics.map((topic, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs">
                                        {topic}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Completion Rate</span>
                                    <span className="font-medium">{module.completionRate}%</span>
                                  </div>
                                  <div className="w-full bg-muted rounded-full h-2">
                                    <div 
                                      className="bg-primary h-2 rounded-full transition-all duration-500" 
                                      style={{ width: `${module.completionRate}%` }}
                                    ></div>
                                  </div>
                                </div>
                                
                                <div className="text-sm text-muted-foreground">
                                  <User className="inline h-4 w-4 mr-1" />
                                  Instructor: {module.instructor}
                                </div>
                              </div>
                              
                              <div className="flex space-x-2 pt-2">
                                <Button variant="hero" className="flex-1">
                                  <Play className="mr-2 h-4 w-4" />
                                  Start Course
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Bookmark className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="videos" className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Video className="mr-2 h-5 w-5 text-primary" />
                      Video Tutorials
                    </CardTitle>
                    <CardDescription>Watch step-by-step video guides and tutorials</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {videoTutorials.map((video) => (
                        <Card key={video.id} className="border border-border hover:shadow-card transition-all duration-200">
                          <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                            <Video className="h-12 w-12 text-muted-foreground" />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold mb-2">{video.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{video.description}</p>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{video.category}</Badge>
                                <span>{video.duration}</span>
                              </div>
                              <div className="flex items-center">
                                <Eye className="h-4 w-4 mr-1" />
                                {video.views}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faqs" className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="mr-2 h-5 w-5 text-primary" />
                      Frequently Asked Questions
                    </CardTitle>
                    <CardDescription>Quick answers to common legal and compliance questions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {faqData.map((faq, index) => (
                      <Card key={index} className="border border-border">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-semibold text-lg">{faq.question}</h3>
                            <Badge variant="outline">{faq.category}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-4">{faq.answer}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {faq.votes} found this helpful
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <ThumbsUp className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Share className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="templates" className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Download className="mr-2 h-5 w-5 text-primary" />
                      Document Templates
                    </CardTitle>
                    <CardDescription>Download ready-to-use legal and compliance templates</CardDescription>
                  </CardHeader>
                  <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <FileText className="h-16 w-16 mx-auto mb-4" />
                      <p className="text-lg mb-2">Document Templates</p>
                      <p>Template library coming soon</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;