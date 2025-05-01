
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  console.log("Index component loaded with auth state:", { isAuthenticated, isLoading });
  
  // While checking authentication status, show loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-jira-blue border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // Safely redirect based on authentication status
  return isAuthenticated ? 
    <Navigate to="/dashboard" replace /> : 
    <Navigate to="/login" replace />;
};

export default Index;
