
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";
import { authService } from "../api/services";
import { toast } from "sonner";

interface AuthContextProps {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log("AuthProvider initializing");

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

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Call login API
      const data = await authService.login(email, password);
      console.log("Login successful for:", data.user);
      
      // Set user data
      setCurrentUser(data.user);
      return true;
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
