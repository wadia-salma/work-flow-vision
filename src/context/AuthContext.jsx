import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../api/services";
import { toast } from "sonner";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log("AuthProvider initializing");

  // For demo purposes, add some mock user data
  const demoUser = {
    id: 1,
    name: "Demo User",
    email: "demo@example.com",
    role: "admin",
    avatar: null
  };

  useEffect(() => {
    console.log("AuthProvider useEffect running");
    
    const fetchCurrentUser = async () => {
      try {
        // Try to get current user from API
        const user = await authService.getCurrentUser();
        console.log("Found authenticated user:", user);
        setCurrentUser(user);
      } catch (error) {
        console.log("No authenticated user found");
        // If API call fails, user is not authenticated
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCurrentUser();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // For demo purpose, check if using demo credentials
      if (email === "demo@example.com" && password === "password") {
        console.log("Login successful for demo user");
        setCurrentUser(demoUser);
        return true;
      }
      
      // Otherwise, try real API login
      try {
        const data = await authService.login(email, password);
        console.log("Login successful for:", data.user);
        setCurrentUser(data.user);
        return true;
      } catch (apiError) {
        console.error("API login failed:", apiError);
        return false;
      }
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setCurrentUser(null);
      toast.success("Vous avez été déconnecté avec succès");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if API logout fails, clear local user state
      setCurrentUser(null);
    }
  };

  const authContextValue = {
    currentUser, 
    login, 
    logout, 
    isAuthenticated: !!currentUser,
    isLoading
  };

  console.log("Auth context current state:", { 
    isAuthenticated: !!currentUser, 
    isLoading, 
    hasUser: !!currentUser 
  });

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
