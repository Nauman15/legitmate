import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Navbar } from "@/components/Navbar";
import { FeedbackButton } from "@/components/FeedbackButton";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import ContractReview from "./pages/ContractReview";
import RegulatoryAlerts from "./pages/RegulatoryAlerts";
import AutomatedFilings from "./pages/AutomatedFilings";
import PolicyCompliance from "./pages/PolicyCompliance";
import RiskAnalytics from "./pages/RiskAnalytics";
import KnowledgeBase from "./pages/KnowledgeBase";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Test Mode - Set to false for production
const TEST_MODE = import.meta.env.DEV || false;

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen">
            {TEST_MODE && (
              <div className="bg-warning text-warning-foreground text-center py-2 text-sm font-medium">
                🚧 TEST MODE - Internal Review Version
              </div>
            )}
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/contract-review" element={<ContractReview />} />
              <Route path="/regulatory-alerts" element={<RegulatoryAlerts />} />
              <Route path="/automated-filings" element={<AutomatedFilings />} />
              <Route path="/policy-compliance" element={<PolicyCompliance />} />
              <Route path="/risk-analytics" element={<RiskAnalytics />} />
              <Route path="/knowledge-base" element={<KnowledgeBase />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FeedbackButton />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
