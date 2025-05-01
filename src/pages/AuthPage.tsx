
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

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (!success) {
        toast.error("Invalid credentials", {
          description: "Please check your email and password.",
        });
      }
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
          <p className="mt-2 text-gray-500">Sign in to your account</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
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
                  placeholder="admin@example.com or client@example.com"
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
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  (Use "password" for all demo accounts)
                </p>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">Demo Accounts</p>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setEmail("admin@example.com");
                setPassword("password");
              }}
              className="text-xs"
              size="sm"
            >
              Admin User
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setEmail("client@example.com");
                setPassword("password");
              }}
              className="text-xs"
              size="sm"
            >
              Client User
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
