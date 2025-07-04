import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import ContractReview from "./pages/ContractReview";
import RegulatoryAlerts from "./pages/RegulatoryAlerts";
import AutomatedFilings from "./pages/AutomatedFilings";
import PolicyCompliance from "./pages/PolicyCompliance";
import RiskAnalytics from "./pages/RiskAnalytics";
import KnowledgeBase from "./pages/KnowledgeBase";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen">
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
