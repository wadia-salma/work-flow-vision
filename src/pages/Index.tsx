import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Redirect to dashboard if authenticated, otherwise show welcome page
const Index: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // While checking authentication status, show loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-jira-blue border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Otherwise show a welcome page
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-jira-blue mb-2">Bienvenue à Projet Manager</h1>
          <p className="text-gray-600 text-xl">Gérez vos projets et équipes efficacement</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-jira-blue">Projets</CardTitle>
              <CardDescription>Organisez votre travail</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-4">Créez et gérez des projets pour toutes vos équipes.</p>
              <div className="flex justify-center">
                <img src="/placeholder.svg" alt="Projets" className="h-24 w-24 opacity-70" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-jira-blue">Tâches</CardTitle>
              <CardDescription>Suivez votre progression</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-4">Organisez et suivez les tâches avec statuts personnalisables.</p>
              <div className="flex justify-center">
                <img src="/placeholder.svg" alt="Tâches" className="h-24 w-24 opacity-70" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-jira-blue">Équipes</CardTitle>
              <CardDescription>Collaborez efficacement</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-4">Gérez vos équipes et assignez des membres aux projets.</p>
              <div className="flex justify-center">
                <img src="/placeholder.svg" alt="Équipes" className="h-24 w-24 opacity-70" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-center mt-8">
          <Link to="/login">
            <Button className="bg-jira-blue hover:bg-jira-blue/90 text-white px-8 py-6 text-lg">
              Connexion
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
