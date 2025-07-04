import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
        <AuthProvider>
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
                <Route path="/login" element={<Login />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/contract-review" element={<ProtectedRoute><ContractReview /></ProtectedRoute>} />
                <Route path="/regulatory-alerts" element={<ProtectedRoute><RegulatoryAlerts /></ProtectedRoute>} />
                <Route path="/automated-filings" element={<ProtectedRoute><AutomatedFilings /></ProtectedRoute>} />
                <Route path="/policy-compliance" element={<ProtectedRoute><PolicyCompliance /></ProtectedRoute>} />
                <Route path="/risk-analytics" element={<ProtectedRoute><RiskAnalytics /></ProtectedRoute>} />
                <Route path="/knowledge-base" element={<ProtectedRoute><KnowledgeBase /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <FeedbackButton />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
