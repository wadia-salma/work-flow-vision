
import React, { createContext, useContext, useState, useEffect } from "react";
import { AppState, Project, Task, Employee, Team, TaskStatus } from "../types";
import { mockProjects, mockTasks, mockEmployees, mockTeams } from "../mockData";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "./AuthContext";

interface AppContextType extends AppState {
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  
  addProject: (project: Omit<Project, "id" | "createdAt">) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;

  addEmployee: (employee: Omit<Employee, "id">) => void;
  updateEmployee: (employeeId: string, updates: Partial<Employee>) => void;
  deleteEmployee: (employeeId: string) => void;

  getProjectById: (projectId: string) => Project | undefined;
  getTaskById: (taskId: string) => Task | undefined;
  getEmployeeById: (employeeId: string) => Employee | undefined;
  getTeamById: (teamId: string) => Team | undefined;
  
  getTasksByProject: (projectId: string) => Task[];
  getEmployeesByTeam: (teamId: string) => Employee[];
  getProjectsByTeam: (teamId: string) => Project[];
  
  calculateProjectCost: (projectId: string) => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  
  const { toast } = useToast();
  const { currentUser } = useAuth();

  // Generate a new ID (in a real app would be handled by the backend)
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Task operations
  const addTask = (task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    
    setTasks(prev => [...prev, newTask]);
    
    // Update the associated project
    setProjects(prev => 
      prev.map(project => 
        project.id === task.projectId 
          ? { ...project, tasks: [...project.tasks, newTask.id] } 
          : project
      )
    );

    toast({
      title: "Task Created",
      description: `Task "${newTask.title}" has been created.`
    });
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
    
    toast({
      title: "Task Updated",
      description: "The task has been updated successfully."
    });
  };

  const deleteTask = (taskId: string) => {
    // Get the task to be deleted for reference
    const taskToDelete = tasks.find(t => t.id === taskId);
    if (!taskToDelete) return;

    // Remove the task
    setTasks(prev => prev.filter(task => task.id !== taskId));
    
    // Update the associated project
    setProjects(prev => 
      prev.map(project => 
        project.id === taskToDelete.projectId 
          ? { ...project, tasks: project.tasks.filter(id => id !== taskId) } 
          : project
      )
    );

    toast({
      title: "Task Deleted",
      description: `Task "${taskToDelete.title}" has been deleted.`
    });
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, status } : task
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Task status changed to ${status}.`
    });
  };

  // Project operations
  const addProject = (project: Omit<Project, "id" | "createdAt">) => {
    const newProject: Project = {
      ...project,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    
    setProjects(prev => [...prev, newProject]);
    
    toast({
      title: "Project Created",
      description: `Project "${newProject.name}" has been created.`
    });
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId ? { ...project, ...updates } : project
      )
    );
    
    toast({
      title: "Project Updated",
      description: "The project has been updated successfully."
    });
  };

  const deleteProject = (projectId: string) => {
    // Get the project for reference
    const projectToDelete = projects.find(p => p.id === projectId);
    if (!projectToDelete) return;

    // Remove the project
    setProjects(prev => prev.filter(project => project.id !== projectId));
    
    // Remove all tasks associated with the project
    setTasks(prev => prev.filter(task => task.projectId !== projectId));
    
    toast({
      title: "Project Deleted",
      description: `Project "${projectToDelete.name}" has been deleted.`
    });
  };

  // Employee operations
  const addEmployee = (employee: Omit<Employee, "id">) => {
    const newEmployee: Employee = {
      ...employee,
      id: generateId(),
    };
    
    setEmployees(prev => [...prev, newEmployee]);
    
    // Update the associated team
    setTeams(prev => 
      prev.map(team => 
        team.id === employee.teamId 
          ? { ...team, employeeIds: [...team.employeeIds, newEmployee.id] } 
          : team
      )
    );
    
    toast({
      title: "Employee Added",
      description: `${newEmployee.name} has been added to the team.`
    });
  };

  const updateEmployee = (employeeId: string, updates: Partial<Employee>) => {
    // Check if team is changing
    const employeeToUpdate = employees.find(e => e.id === employeeId);
    const isTeamChanging = employeeToUpdate && updates.teamId && updates.teamId !== employeeToUpdate.teamId;
    
    // Update employee
    setEmployees(prev => 
      prev.map(employee => 
        employee.id === employeeId ? { ...employee, ...updates } : employee
      )
    );

    // Handle team changes if needed
    if (isTeamChanging && employeeToUpdate && updates.teamId) {
      // Remove from old team
      setTeams(prev => 
        prev.map(team => 
          team.id === employeeToUpdate.teamId 
            ? { ...team, employeeIds: team.employeeIds.filter(id => id !== employeeId) } 
            : team
        )
      );
      
      // Add to new team
      setTeams(prev => 
        prev.map(team => 
          team.id === updates.teamId 
            ? { ...team, employeeIds: [...team.employeeIds, employeeId] } 
            : team
        )
      );
    }
    
    toast({
      title: "Employee Updated",
      description: "Employee information has been updated."
    });
  };

  const deleteEmployee = (employeeId: string) => {
    // Get the employee for reference
    const employeeToDelete = employees.find(e => e.id === employeeId);
    if (!employeeToDelete) return;

    // Remove the employee
    setEmployees(prev => prev.filter(employee => employee.id !== employeeId));
    
    // Update the associated team
    if (employeeToDelete.teamId) {
      setTeams(prev => 
        prev.map(team => 
          team.id === employeeToDelete.teamId 
            ? { ...team, employeeIds: team.employeeIds.filter(id => id !== employeeId) } 
            : team
        )
      );
    }
    
    toast({
      title: "Employee Removed",
      description: `${employeeToDelete.name} has been removed.`
    });
  };

  // Getter functions
  const getProjectById = (projectId: string) => projects.find(p => p.id === projectId);
  const getTaskById = (taskId: string) => tasks.find(t => t.id === taskId);
  const getEmployeeById = (employeeId: string) => employees.find(e => e.id === employeeId);
  const getTeamById = (teamId: string) => teams.find(t => t.id === teamId);
  
  const getTasksByProject = (projectId: string) => tasks.filter(task => task.projectId === projectId);
  const getEmployeesByTeam = (teamId: string) => employees.filter(employee => employee.teamId === teamId);
  const getProjectsByTeam = (teamId: string) => projects.filter(project => project.teamId === teamId);
  
  // TJM calculations
  const calculateProjectCost = (projectId: string) => {
    const projectTasks = tasks.filter(task => task.projectId === projectId);
    
    return projectTasks.reduce((total, task) => {
      const tjm = task.tjm || getProjectById(projectId)?.tjm || 0;
      const daysSpent = task.daysSpent || 0;
      return total + (tjm * daysSpent);
    }, 0);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser: currentUser,
        projects,
        tasks,
        employees,
        teams,
        addTask,
        updateTask,
        deleteTask,
        updateTaskStatus,
        addProject,
        updateProject,
        deleteProject,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getProjectById,
        getTaskById,
        getEmployeeById,
        getTeamById,
        getTasksByProject,
        getEmployeesByTeam,
        getProjectsByTeam,
        calculateProjectCost
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
