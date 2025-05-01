
import React from "react";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";

const AppLayout = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <>{children}</>;
  }

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
