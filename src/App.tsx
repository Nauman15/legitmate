
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { AppSidebar } from '@/components/AppSidebar';
import { FeedbackButton } from '@/components/FeedbackButton';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

// Import pages
import Landing from '@/pages/Landing';
import Dashboard from '@/pages/Dashboard';
import ContractReview from '@/pages/ContractReview';
import PolicyCompliance from '@/pages/PolicyCompliance';
import RiskAnalytics from '@/pages/RiskAnalytics';
import RegulatoryAlerts from '@/pages/RegulatoryAlerts';
import AutomatedFilings from '@/pages/AutomatedFilings';
import KnowledgeBase from '@/pages/KnowledgeBase';
import Settings from '@/pages/Settings';
import Onboarding from '@/pages/Onboarding';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

// Layout component that conditionally shows sidebar
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Routes that should not show the sidebar
  const publicRoutes = ['/', '/onboarding', '/login', '/signup'];
  const isPublicRoute = publicRoutes.includes(location.pathname);
  const showSidebar = !!user && !isPublicRoute;

  if (showSidebar) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            {/* Header with sidebar trigger */}
            <header className="h-16 border-b border-border bg-background/95 backdrop-blur-md flex items-center px-4 sticky top-0 z-40">
              <SidebarTrigger />
              <div className="ml-auto">
                <FeedbackButton />
              </div>
            </header>
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {children}
      </main>
      <FeedbackButton />
    </div>
  );
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="min-h-screen">
              <Toaster />
              <Sonner />
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/contract-review" element={<ProtectedRoute><ContractReview /></ProtectedRoute>} />
                  <Route path="/policy-compliance" element={<ProtectedRoute><PolicyCompliance /></ProtectedRoute>} />
                  <Route path="/risk-analytics" element={<ProtectedRoute><RiskAnalytics /></ProtectedRoute>} />
                  <Route path="/regulatory-alerts" element={<ProtectedRoute><RegulatoryAlerts /></ProtectedRoute>} />
                  <Route path="/automated-filings" element={<ProtectedRoute><AutomatedFilings /></ProtectedRoute>} />
                  <Route path="/knowledge-base" element={<ProtectedRoute><KnowledgeBase /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppLayout>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
