
import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Users, UserPlus } from "lucide-react";

const Teams = () => {
  const { teams, employees, addEmployee, addTeam } = useApp();
  const { currentUser } = useAuth();
  
  // Only admins can access this page
  if (currentUser?.role !== "admin") {
    return <Navigate to="/" />;
  }
  
  const [isNewEmployeeOpen, setIsNewEmployeeOpen] = useState(false);
  const [isNewTeamOpen, setIsNewTeamOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "",
    teamId: "",
  });
  const [newTeam, setNewTeam] = useState({
    name: "",
    employeeIds: [],
  });
  
  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.role || !newEmployee.teamId) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    addEmployee(newEmployee);
    
    setNewEmployee({
      name: "",
      email: "",
      role: "",
      teamId: "",
    });
    
    setIsNewEmployeeOpen(false);
  };
  
  const handleAddTeam = () => {
    if (!newTeam.name) {
      toast.error("Veuillez saisir un nom d'équipe");
      return;
    }
    
    addTeam(newTeam);
    
    setNewTeam({
      name: "",
      employeeIds: [],
    });
    
    setIsNewTeamOpen(false);
  };
  
  const openNewEmployeeDialog = (team) => {
    setSelectedTeam(team);
    setNewEmployee(prev => ({ ...prev, teamId: team.id }));
    setIsNewEmployeeOpen(true);
  };

  // Ensure we have arrays to safely map over
  const safeTeams = Array.isArray(teams) ? teams : [];
  const safeEmployees = Array.isArray(employees) ? employees : [];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Équipes</h1>
        
        <Dialog open={isNewTeamOpen} onOpenChange={setIsNewTeamOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Créer Équipe</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer une Nouvelle Équipe</DialogTitle>
              <DialogDescription>
                Ajoutez une nouvelle équipe à votre organisation
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="teamName">Nom d'Équipe</Label>
                <Input 
                  id="teamName" 
                  placeholder="Entrez le nom de l'équipe"
                  value={newTeam.name}
                  onChange={(e) => setNewTeam(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewTeamOpen(false)}>Annuler</Button>
              <Button onClick={handleAddTeam}>Créer Équipe</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={isNewEmployeeOpen} onOpenChange={setIsNewEmployeeOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un Nouveau Membre</DialogTitle>
              <DialogDescription>
                Ajouter un nouvel employé à {selectedTeam?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de l'Employé</Label>
                <Input 
                  id="name" 
                  placeholder="Nom complet"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Adresse Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="Adresse email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rôle</Label>
                <Input 
                  id="role" 
                  placeholder="Titre du poste ou rôle"
                  value={newEmployee.role}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, role: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamId">Équipe</Label>
                <select
                  id="teamId"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newEmployee.teamId}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, teamId: e.target.value }))}
                >
                  <option value="">Sélectionnez une équipe</option>
                  {safeTeams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewEmployeeOpen(false)}>Annuler</Button>
              <Button onClick={handleAddEmployee}>Ajouter Employé</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeTeams.map(team => {
          const teamEmployees = safeEmployees.filter(employee => employee.teamId === team.id);
          
          return (
            <Card key={team.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-jira-blue/20 flex items-center justify-center">
                      <Users className="h-4 w-4 text-jira-blue" />
                    </div>
                    <div>
                      <CardTitle>{team.name}</CardTitle>
                      <CardDescription>{teamEmployees.length} membres</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamEmployees.map(employee => (
                    <div key={employee.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50">
                      <Avatar>
                        <AvatarImage src={employee.avatar} />
                        <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-xs text-gray-500">{employee.role}</p>
                      </div>
                    </div>
                  ))}
                  
                  {teamEmployees.length === 0 && (
                    <p className="text-center py-4 text-gray-500">Aucun membre dans cette équipe</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-1"
                  onClick={() => openNewEmployeeDialog(team)}
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Ajouter Membre</span>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Teams;
