
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "./context/auth-context";

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
import EmotionDetectorPage from "./pages/emotion-detector";
import AuthPage from "./pages/auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <SidebarProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/" element={<Navigate to="/auth" />} />
                <Route path="/app" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="/app/text-simplifier" element={<TextSimplifierPage />} />
                  <Route path="/app/image-caption" element={<ImageCaptionPage />} />
                  <Route path="/app/ai-assistant" element={<AiAssistantPage />} />
                  <Route path="/app/dashboard" element={<DashboardPage />} />
                  <Route path="/app/content-audit" element={<ContentAuditPage />} />
                  <Route path="/app/design-assistant" element={<DesignAssistantPage />} />
                  <Route path="/app/text-to-image" element={<TextToImagePage />} />
                  <Route path="/app/video-captioning" element={<VideoCaptioningPage />} />
                  <Route path="/app/text-resizer" element={<TextResizerPage />} />
                  <Route path="/app/emotion-detector" element={<EmotionDetectorPage />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </SidebarProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
