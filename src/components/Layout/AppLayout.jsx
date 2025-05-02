
import React from "react";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";

const AppLayout = ({ children }) => {
  const { currentUser, isLoading } = useAuth();
  
  console.log("AppLayout rendering with:", { hasUser: !!currentUser, isLoading });
  
  // If auth is still loading or no user, just render children without layout
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-jira-blue border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!currentUser) {
    console.log("No user in AppLayout, returning children directly");
    return <>{children}</>;
  }

  console.log("Rendering full app layout");
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <AppHeader />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
