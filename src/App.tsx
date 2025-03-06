
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";

import Layout from "./components/layout/layout";
import HomePage from "./pages/Index";
import TextSimplifierPage from "./pages/text-simplifier";
import ImageCaptionPage from "./pages/image-caption";
import AiAssistantPage from "./pages/ai-assistant";
import DashboardPage from "./pages/dashboard";
import ContentAuditPage from "./pages/content-audit";
import DesignAssistantPage from "./pages/design-assistant";
import TextToImagePage from "./pages/text-to-image";
import VideoCaptioningPage from "./pages/video-captioning";
import TextResizerPage from "./pages/text-resizer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/text-simplifier" element={<TextSimplifierPage />} />
                <Route path="/image-caption" element={<ImageCaptionPage />} />
                <Route path="/ai-assistant" element={<AiAssistantPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/content-audit" element={<ContentAuditPage />} />
                <Route path="/design-assistant" element={<DesignAssistantPage />} />
                <Route path="/text-to-image" element={<TextToImagePage />} />
                <Route path="/video-captioning" element={<VideoCaptioningPage />} />
                <Route path="/text-resizer" element={<TextResizerPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
