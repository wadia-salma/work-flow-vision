
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { projectService, taskService, teamService, employeeService } from "../api/services";

// Create context
const AppContext = createContext(undefined);

// AppProvider component
export const AppProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load data from API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch all data in parallel
        const [projectsData, tasksData, teamsData, employeesData] = await Promise.all([
          projectService.getAllProjects(),
          taskService.getAllTasks(),
          teamService.getAllTeams(),
          employeeService.getAllEmployees()
        ]);
        
        setProjects(projectsData || []);
        setTasks(tasksData || []);
        setTeams(teamsData || []);
        setEmployees(employeesData || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Erreur de chargement des données", {
          description: "Veuillez rafraîchir la page ou contacter l'administrateur."
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Project CRUD operations
  const addProject = async (project) => {
    try {
      const newProject = await projectService.createProject(project);
      setProjects(prev => [...prev, newProject]);
      
      toast({
        title: "Projet Créé",
        description: `Projet "${newProject.name}" a été créé.`
      });
      
      return newProject;
    } catch (error) {
      console.error("Failed to create project:", error);
      toast.error("Erreur lors de la création du projet");
      throw error;
    }
  };
  
  const updateProject = async (projectId, updates) => {
    try {
      await projectService.updateProject(projectId, updates);
      
      setProjects(prev => 
        prev.map(project => 
          project.id === projectId ? { ...project, ...updates } : project
        )
      );
      
      toast({
        title: "Projet Mis à Jour",
        description: `Projet a été mis à jour.`
      });
    } catch (error) {
      console.error("Failed to update project:", error);
      toast.error("Erreur lors de la mise à jour du projet");
      throw error;
    }
  };
  
  const deleteProject = async (projectId) => {
    const projectToDelete = projects.find(p => p.id === projectId);
    
    if (!projectToDelete) {
      toast({
        title: "Erreur",
        description: "Projet non trouvé.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await projectService.deleteProject(projectId);
      
      // Update local state
      setProjects(prev => prev.filter(project => project.id !== projectId));
      
      // Remove associated tasks
      const projectTaskIds = tasks
        .filter(task => task.projectId === projectId)
        .map(task => task.id);
      
      setTasks(prev => prev.filter(task => !projectTaskIds.includes(task.id)));
      
      toast({
        title: "Projet Supprimé",
        description: `Projet "${projectToDelete.name}" a été supprimé.`
      });
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast.error("Erreur lors de la suppression du projet");
    }
  };

  // Team operations
  const addTeam = async (team) => {
    try {
      const newTeam = await teamService.createTeam(team);
      setTeams(prev => [...prev, newTeam]);
      
      toast({
        title: "Équipe Créée",
        description: `Équipe "${newTeam.name}" a été créée.`
      });
      
      return newTeam;
    } catch (error) {
      console.error("Failed to create team:", error);
      toast.error("Erreur lors de la création de l'équipe");
      throw error;
    }
  };

  // Employee CRUD operations
  const addEmployee = async (employee) => {
    try {
      const newEmployee = await employeeService.createEmployee(employee);
      setEmployees(prev => [...prev, newEmployee]);
      
      // Update the team's employeeIds if needed
      if (employee.teamId) {
        setTeams(prev => 
          prev.map(team => 
            team.id === employee.teamId
              ? { ...team, employeeIds: [...(team.employeeIds || []), newEmployee.id] }
              : team
          )
        );
      }
      
      toast({
        title: "Employé Ajouté",
        description: `${newEmployee.name} a été ajouté à l'équipe.`
      });
      
      return newEmployee;
    } catch (error) {
      console.error("Failed to add employee:", error);
      toast.error("Erreur lors de l'ajout de l'employé");
      throw error;
    }
  };
  
  const updateEmployee = async (employeeId, updates) => {
    const employee = employees.find(e => e.id === employeeId);
    
    if (!employee) {
      toast({
        title: "Erreur",
        description: "Employé non trouvé.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await employeeService.updateEmployee(employeeId, updates);
      
      // If teamId is being updated, handle team reassignment
      if (updates.teamId && updates.teamId !== employee.teamId) {
        // Remove from old team
        if (employee.teamId) {
          setTeams(prev => 
            prev.map(team => 
              team.id === employee.teamId
                ? { ...team, employeeIds: (team.employeeIds || []).filter(id => id !== employeeId) }
                : team
            )
          );
        }
        
        // Add to new team
        setTeams(prev => 
          prev.map(team => 
            team.id === updates.teamId
              ? { ...team, employeeIds: [...(team.employeeIds || []), employeeId] }
              : team
          )
        );
      }
      
      setEmployees(prev => 
        prev.map(emp => 
          emp.id === employeeId ? { ...emp, ...updates } : emp
        )
      );
      
      toast({
        title: "Employé Mis à Jour",
        description: `Informations de ${employee.name} ont été mises à jour.`
      });
    } catch (error) {
      console.error("Failed to update employee:", error);
      toast.error("Erreur lors de la mise à jour de l'employé");
    }
  };
  
  const deleteEmployee = async (employeeId) => {
    const employeeToDelete = employees.find(e => e.id === employeeId);
    
    if (!employeeToDelete) {
      toast({
        title: "Erreur",
        description: "Employé non trouvé.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await employeeService.deleteEmployee(employeeId);
      
      // Remove from team
      if (employeeToDelete.teamId) {
        setTeams(prev => 
          prev.map(team => 
            team.id === employeeToDelete.teamId
              ? { ...team, employeeIds: (team.employeeIds || []).filter(id => id !== employeeId) }
              : team
          )
        );
      }
      
      // Remove employee from task assignments
      setTasks(prev => 
        prev.map(task => {
          if (task.assigneeId === employeeId) {
            return { ...task, assigneeId: null };
          }
          return task;
        })
      );
      
      // Delete the employee
      setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
      
      toast({
        title: "Employé Supprimé",
        description: `${employeeToDelete.name} a été supprimé.`
      });
    } catch (error) {
      console.error("Failed to delete employee:", error);
      toast.error("Erreur lors de la suppression de l'employé");
    }
  };
  
  // Task CRUD operations
  const addTask = async (task) => {
    try {
      const newTask = await taskService.createTask(task);
      setTasks(prev => [...prev, newTask]);
      
      // Update the project's taskIds
      if (task.projectId) {
        setProjects(prev => 
          prev.map(project => 
            project.id === task.projectId
              ? { ...project, taskIds: [...(project.taskIds || []), newTask.id] }
              : project
          )
        );
      }
      
      toast({
        title: "Tâche Créée",
        description: `Tâche "${newTask.name}" a été créée.`
      });
      
      return newTask;
    } catch (error) {
      console.error("Failed to create task:", error);
      toast.error("Erreur lors de la création de la tâche");
      throw error;
    }
  };
  
  const updateTask = async (taskId, updates) => {
    const task = tasks.find(t => t.id === taskId);
    
    if (!task) {
      toast({
        title: "Erreur",
        description: "Tâche non trouvée.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await taskService.updateTask(taskId, updates);
      
      // If projectId is being updated, handle project reassignment
      if (updates.projectId && updates.projectId !== task.projectId) {
        // Remove from old project
        if (task.projectId) {
          setProjects(prev => 
            prev.map(project => 
              project.id === task.projectId
                ? { ...project, taskIds: (project.taskIds || []).filter(id => id !== taskId) }
                : project
            )
          );
        }
        
        // Add to new project
        setProjects(prev => 
          prev.map(project => 
            project.id === updates.projectId
              ? { ...project, taskIds: [...(project.taskIds || []), taskId] }
              : project
          )
        );
      }
      
      setTasks(prev => 
        prev.map(t => 
          t.id === taskId ? { ...t, ...updates } : t
        )
      );
      
      toast({
        title: "Tâche Mise à Jour",
        description: `Tâche "${task.name}" a été mise à jour.`
      });
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("Erreur lors de la mise à jour de la tâche");
    }
  };
  
  const deleteTask = async (taskId) => {
    const taskToDelete = tasks.find(t => t.id === taskId);
    
    if (!taskToDelete) {
      toast({
        title: "Erreur",
        description: "Tâche non trouvée.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await taskService.deleteTask(taskId);
      
      // Remove from project
      if (taskToDelete.projectId) {
        setProjects(prev => 
          prev.map(project => 
            project.id === taskToDelete.projectId
              ? { ...project, taskIds: (project.taskIds || []).filter(id => id !== taskId) }
              : project
          )
        );
      }
      
      // Delete the task
      setTasks(prev => prev.filter(t => t.id !== taskId));
      
      toast({
        title: "Tâche Supprimée",
        description: `Tâche "${taskToDelete.name}" a été supprimée.`
      });
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Erreur lors de la suppression de la tâche");
    }
  };
  
  // Utility functions
  const getProjectById = (projectId) => {
    return projects.find(project => project.id === projectId);
  };

  const getEmployeeById = (employeeId) => {
    return employees.find(employee => employee.id === employeeId);
  };

  const getTeamById = (teamId) => {
    return teams.find(team => team.id === teamId);
  };

  const getTasksByProject = (projectId) => {
    return tasks.filter(task => task.projectId === projectId);
  };
  
  // Task status update specific method
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await taskService.updateTaskStatus(taskId, newStatus);
      updateTask(taskId, { status: newStatus });
    } catch (error) {
      console.error("Failed to update task status:", error);
      toast.error("Erreur lors de la mise à jour du statut de la tâche");
    }
  };
  
  // Values to expose via context
  const contextValue = {
    // Project data
    projects,
    tasks,
    employees,
    teams,
    isLoading,
    
    // Project operations
    addProject,
    updateProject,
    deleteProject,
    addTeam,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    addTask,
    updateTask,
    deleteTask,

    // Utility functions
    getProjectById,
    getEmployeeById,
    getTeamById,
    getTasksByProject,
    updateTaskStatus
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useApp = () => {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  
  return context;
};
