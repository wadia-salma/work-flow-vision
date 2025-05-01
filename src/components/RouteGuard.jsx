import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const RouteGuard = ({ requireAdmin = false }) => {
  const { currentUser, isAuthenticated, isLoading } = useAuth();
  
  // While checking authentication status, show nothing
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-jira-blue border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If admin access is required but user is not admin, redirect to dashboard
  if (requireAdmin && currentUser?.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  
  // Otherwise, render the protected route
  return <Outlet />;
};

export default RouteGuard;
