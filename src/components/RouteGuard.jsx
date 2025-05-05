
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const RouteGuard = ({ requireAdmin = false }) => {
  const { isAuthenticated, isLoading, currentUser } = useAuth();
  
  // If auth is still loading, show a spinner
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
  
  // If admin is required but user is not admin, redirect to dashboard
  if (requireAdmin && currentUser?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Allow access to the protected routes
  return <Outlet />;
};

export default RouteGuard;
