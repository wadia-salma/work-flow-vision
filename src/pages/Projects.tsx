
import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MoreHorizontal, Plus, Trash } from "lucide-react";

const Projects: React.FC = () => {
  const { projects, teams, addProject, deleteProject, getTeamById, getTasksByProject } = useApp();
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === "admin";
  
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    teamId: teams[0]?.id || "",
  });
  
  const handleCreateProject = () => {
    if (!newProject.name || !newProject.teamId) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    addProject({
      ...newProject,
      tasks: [],
    });
    
    setNewProject({
      name: "",
      description: "",
      teamId: teams[0]?.id || "",
    });
    
    setIsNewProjectOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        {isAdmin && (
          <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
            <DialogTrigger asChild>
              <Button className="bg-jira-blue hover:bg-jira-blue/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Create a new project and assign it to a team.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter project name"
                    value={newProject.name}
                    onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the project"
                    value={newProject.description}
                    onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team">Assign Team</Label>
                  <select
                    id="team"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newProject.teamId}
                    onChange={(e) => setNewProject(prev => ({ ...prev, teamId: e.target.value }))}
                  >
                    {teams.map(team => (
                      <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewProjectOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateProject}>Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>Manage and view all your projects</CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Tasks</TableHead>
                  <TableHead>Created Date</TableHead>
                  {isAdmin && <TableHead className="w-[80px]">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map(project => {
                  const team = getTeamById(project.teamId);
                  const projectTasks = getTasksByProject(project.id);
                  const taskCount = projectTasks.length;
                  
                  return (
                    <TableRow key={project.id}>
                      <TableCell>
                        <Link to={`/projects/${project.id}`} className="font-medium text-jira-blue hover:underline">
                          {project.name}
                        </Link>
                        <p className="text-sm text-gray-500 truncate w-48">{project.description}</p>
                      </TableCell>
                      <TableCell>{team?.name || "No Team"}</TableCell>
                      <TableCell>{taskCount}</TableCell>
                      <TableCell>{format(new Date(project.createdAt), "MMM d, yyyy")}</TableCell>
                      {isAdmin && (
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                className="text-red-600 focus:text-red-600"
                                onClick={() => {
                                  if (window.confirm(`Are you sure you want to delete ${project.name}?`)) {
                                    deleteProject(project.id);
                                  }
                                }}
                              >
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500">No projects found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Projects;
