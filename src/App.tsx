import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Resources from "./pages/Resources";
import OWASPLinks from "./pages/OWASPLinks";
import AgenticEngineering from "./pages/AgenticEngineering";
import { CookieConsentBanner } from "./components/CookieConsentBanner";
import { restoreConsent, trackPageView } from "./lib/analytics";

const queryClient = new QueryClient();

const App = () => {
  // Restore consent state and track initial page view on app load
  useEffect(() => {
    restoreConsent();
    // Track initial page view - will be queued if consent not yet granted
    trackPageView(window.location.pathname, document.title || 'Security Checklist');
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/owasp-links" element={<OWASPLinks />} />
              <Route path="/agentic-engineering" element={<AgenticEngineering />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <CookieConsentBanner />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
