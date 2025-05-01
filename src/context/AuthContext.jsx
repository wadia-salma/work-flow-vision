
import React, { createContext, useContext, useState, useEffect } from "react";
import { mockUsers } from "../mockData";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log("AuthProvider initializing");

  useEffect(() => {
    console.log("AuthProvider useEffect running");
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("currentUser");
    
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        console.log("Found saved user:", parsedUser);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("currentUser");
      }
    } else {
      console.log("No saved user found");
    }
    
    // Always set loading to false after checking local storage
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // In a real app, this would be an API call
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      console.log("Login attempt for:", email);
      
      // Mock authentication
      const user = mockUsers.find(u => u.email === email);
      
      if (user && password === "password") { // Simple mock password check
        console.log("Login successful for:", user);
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
        return true;
      }
      console.log("Login failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log("Logging out");
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
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
