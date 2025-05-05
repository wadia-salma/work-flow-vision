
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AuthPage = () => {
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (!success) {
        toast.error("Invalid credentials", {
          description: "Please check your email and password.",
        });
      } else {
        toast.success("Login successful", {
          description: "Welcome to WorkFlow Vision!",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login Error", {
        description: "An error occurred during login.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-lg bg-jira-blue flex items-center justify-center">
            <span className="text-white font-bold text-xl">WV</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold">WorkFlow Vision</h1>
          <p className="mt-2 text-gray-500">Log in to your account</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="bg-blue-50 p-3 rounded-md border border-blue-100 text-sm">
                <p className="font-medium text-blue-700">Demo Credentials (Pre-filled)</p>
                <p className="text-blue-600">Email: demo@example.com</p>
                <p className="text-blue-600">Password: password</p>
                <p className="mt-1 text-blue-500 text-xs">Just click Login to continue</p>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="text-center text-sm text-gray-500">
          <p>This is a demo application with mock API services.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
