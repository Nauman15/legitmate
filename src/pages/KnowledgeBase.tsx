
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Search, 
  Filter,
  Bookmark,
  MessageCircle,
  Bot,
  Brain,
  HelpCircle,
  Zap,
  FileText,
  Video,
  Tag,
  Upload,
  Play,
  GraduationCap,
  Scale,
  Award
} from 'lucide-react';
import { useKnowledgeBase } from '@/hooks/useKnowledgeBase';

const KnowledgeBase = () => {
  const { toast } = useToast();
  const { knowledgeData, loading, error, hasData, isEmpty } = useKnowledgeBase();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [aiSearchMode, setAiSearchMode] = useState(false);

  const aiSearchSuggestions = [
    "What are the penalties for late GST filing?",
    "How to implement POSH Act in my company?",
    "What are the PF contribution rates for 2024?",
    "When is annual filing due for private companies?",
    "How to calculate minimum wages in different states?",
    "What are the new labor code changes?"
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="h-64 bg-muted rounded"></div>
              <div className="lg:col-span-3 h-96 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center">
                <BookOpen className="mr-3 h-8 w-8 text-primary" />
                Knowledge Base
              </h1>
              <p className="text-muted-foreground">Comprehensive legal and compliance resources for Indian businesses</p>
            </div>
          </div>

          <Card className="shadow-card">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-semibold mb-4">Build Your Knowledge Base</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start by uploading contracts and connecting your business systems to generate 
                personalized compliance guides, regulatory updates, and training materials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload First Document
                </Button>
                <Button variant="outline" size="lg" className="px-8">
                  <Brain className="mr-2 h-5 w-5" />
                  Setup AI Assistant
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
            <Button 
              variant="outline"
              onClick={() => toast({ title: "Bookmarks", description: "Your bookmarked articles will appear here." })}
            >
              <Bookmark className="mr-2 h-4 w-4" />
              Bookmarks
            </Button>
            <Button 
              variant="hero"
              onClick={() => toast({ title: "Expert Support", description: "Connect with our legal experts for personalized guidance." })}
            >
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
                  onClick={() => {
                    setAiSearchMode(!aiSearchMode);
                    toast({ 
                      title: aiSearchMode ? "AI Mode Disabled" : "AI Mode Enabled", 
                      description: aiSearchMode ? "Standard search is now active." : "AI-powered search is now active." 
                    });
                  }}
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
                <Button 
                  variant="professional" 
                  className="h-12"
                  onClick={() => {
                    if (searchQuery.trim()) {
                      toast({ 
                        title: "Search Started", 
                        description: aiSearchMode ? `AI is analyzing: "${searchQuery}"` : `Searching for: "${searchQuery}"` 
                      });
                    } else {
                      toast({ title: "Enter Search Query", description: "Please enter a search term or question." });
                    }
                  }}
                >
                  <Search className="mr-2 h-5 w-5" />
                  {aiSearchMode ? "Ask AI" : "Search"}
                </Button>
                <Button 
                  variant="outline" 
                  className="h-12"
                  onClick={() => toast({ title: "Filters", description: "Advanced search filters coming soon." })}
                >
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
                        onClick={() => {
                          setSearchQuery(suggestion);
                          toast({ title: "Quick Question Selected", description: `Selected: "${suggestion}"` });
                        }}
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
                {knowledgeData?.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      toast({ 
                        title: "Category Selected", 
                        description: `Showing ${category.name} articles (${category.count} items)` 
                      });
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 cursor-pointer hover:scale-[1.02] ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
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
            <Tabs defaultValue="regulations" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="regulations">Regulations</TabsTrigger>
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="faqs">FAQs</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>

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
                    {knowledgeData?.indianRegulations.length ? (
                      knowledgeData.indianRegulations.map((regulation) => (
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
                                    <h4 className="font-semibold text-sm mb-2">Covered Topics:</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                      {regulation.topics.map((topic, index) => (
                                        <div key={index} className="flex items-center text-sm">
                                          <span>• {topic}</span>
                                        </div>
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
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Scale className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Regulations Available</h3>
                        <p className="text-muted-foreground">Upload documents to generate personalized regulatory guides</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="articles" className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Articles & Guides</CardTitle>
                    <CardDescription>Browse our collection of compliance articles and guides</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Articles Coming Soon</h3>
                    <p className="text-muted-foreground">We're building personalized articles based on your business needs</p>
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
                  <CardContent className="text-center py-12">
                    <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Training Modules Coming Soon</h3>
                    <p className="text-muted-foreground">AI-powered training will be available based on your compliance needs</p>
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
                  <CardContent className="text-center py-12">
                    <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Video Library Coming Soon</h3>
                    <p className="text-muted-foreground">Video tutorials will be curated based on your industry and requirements</p>
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
                  <CardContent className="text-center py-12">
                    <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">FAQs Coming Soon</h3>
                    <p className="text-muted-foreground">AI will generate relevant FAQs based on your business activities</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="templates" className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-primary" />
                      Document Templates
                    </CardTitle>
                    <CardDescription>Download ready-to-use legal and compliance templates</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Templates Coming Soon</h3>
                    <p className="text-muted-foreground">Document templates will be available based on your compliance requirements</p>
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
