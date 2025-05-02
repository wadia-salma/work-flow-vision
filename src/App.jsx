
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import AppLayout from "./components/Layout/AppLayout";
import RouteGuard from "./components/RouteGuard";
import { useState, useEffect } from "react";

// Pages
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Tasks from "./pages/Tasks";
import Teams from "./pages/Teams";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [appReady, setAppReady] = useState(false);
  
  useEffect(() => {
    // This simulates checking if the API is reachable
    // In a real app, you might want to ping your API first
    const timer = setTimeout(() => setAppReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!appReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-jira-blue border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Connexion à l'API...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AppProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppLayout>
                <Routes>
                  {/* Root route */}
                  <Route path="/" element={<Index />} />
                  
                  {/* Public routes */}
                  <Route path="/login" element={<AuthPage />} />

                  {/* Protected routes */}
                  <Route element={<RouteGuard />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:projectId" element={<ProjectDetail />} />
                    <Route path="/tasks" element={<Tasks />} />
                  </Route>

                  {/* Admin only routes */}
                  <Route element={<RouteGuard requireAdmin={true} />}>
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/settings" element={<Settings />} />
                  </Route>

                  {/* 404 route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppLayout>
            </BrowserRouter>
          </AppProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
