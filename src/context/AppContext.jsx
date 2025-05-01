
import React, { createContext, useContext, useState, useEffect } from "react";
import { mockProjects, mockTasks, mockEmployees, mockTeams } from "../mockData";
import { toast } from "sonner";

// Create context
const AppContext = createContext(undefined);

// Generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// AppProvider component
export const AppProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  
  // Initialize with mock data
  useEffect(() => {
    setProjects(mockProjects);
    setTasks(mockTasks);
    setEmployees(mockEmployees);
    setTeams(mockTeams);
  }, []);
  
  // Project CRUD operations
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: generateId(),
      createdAt: new Date().toISOString(),
      taskIds: project.taskIds || [],
    };
    
    setProjects(prev => [...prev, newProject]);
    
    toast({
      title: "Project Created",
      description: `Project "${newProject.name}" has been created.`
    });
    
    return newProject;
  };
  
  const updateProject = (projectId, updates) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId ? { ...project, ...updates } : project
      )
    );
    
    toast({
      title: "Project Updated",
      description: `Project has been updated.`
    });
  };
  
  const deleteProject = (projectId) => {
    const projectToDelete = projects.find(p => p.id === projectId);
    
    if (!projectToDelete) {
      toast({
        title: "Error",
        description: "Project not found.",
        variant: "destructive"
      });
      return;
    }
    
    // Delete all tasks associated with this project
    const projectTaskIds = tasks
      .filter(task => task.projectId === projectId)
      .map(task => task.id);
    
    setTasks(prev => prev.filter(task => !projectTaskIds.includes(task.id)));
    
    // Remove the project
    setProjects(prev => prev.filter(project => project.id !== projectId));
    
    toast({
      title: "Project Deleted",
      description: `Project "${projectToDelete.name}" has been deleted.`
    });
  };

  // Team operations
  const addTeam = (team) => {
    const newTeam = {
      ...team,
      id: generateId(),
      employeeIds: team.employeeIds || [],
    };
    
    setTeams(prev => [...prev, newTeam]);
    
    toast({
      title: "Team Created",
      description: `Team "${newTeam.name}" has been created.`
    });
  };

  // Employee CRUD operations
  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: generateId(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
    };
    
    setEmployees(prev => [...prev, newEmployee]);
    
    // Update the team's employeeIds
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
      title: "Employee Added",
      description: `${newEmployee.name} has been added to the team.`
    });
  };
  
  const updateEmployee = (employeeId, updates) => {
    const employee = employees.find(e => e.id === employeeId);
    
    if (!employee) {
      toast({
        title: "Error",
        description: "Employee not found.",
        variant: "destructive"
      });
      return;
    }
    
    // If teamId is being updated, handle team reassignment
    if (updates.teamId && updates.teamId !== employee.teamId) {
      // Remove from old team
      if (employee.teamId) {
        setTeams(prev => 
          prev.map(team => 
            team.id === employee.teamId
              ? { ...team, employeeIds: team.employeeIds.filter(id => id !== employeeId) }
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
      title: "Employee Updated",
      description: `${employee.name}'s information has been updated.`
    });
  };
  
  const deleteEmployee = (employeeId) => {
    const employeeToDelete = employees.find(e => e.id === employeeId);
    
    if (!employeeToDelete) {
      toast({
        title: "Error",
        description: "Employee not found.",
        variant: "destructive"
      });
      return;
    }
    
    // Remove from team
    if (employeeToDelete.teamId) {
      setTeams(prev => 
        prev.map(team => 
          team.id === employeeToDelete.teamId
            ? { ...team, employeeIds: team.employeeIds.filter(id => id !== employeeId) }
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
      title: "Employee Removed",
      description: `${employeeToDelete.name} has been removed.`
    });
  };
  
  // Task CRUD operations
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: generateId(),
      createdAt: new Date().toISOString(),
      status: task.status || "todo",
      comments: task.comments || [],
    };
    
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
      title: "Task Created",
      description: `Task "${newTask.name}" has been created.`
    });
    
    return newTask;
  };
  
  const updateTask = (taskId, updates) => {
    const task = tasks.find(t => t.id === taskId);
    
    if (!task) {
      toast({
        title: "Error",
        description: "Task not found.",
        variant: "destructive"
      });
      return;
    }
    
    // If projectId is being updated, handle project reassignment
    if (updates.projectId && updates.projectId !== task.projectId) {
      // Remove from old project
      if (task.projectId) {
        setProjects(prev => 
          prev.map(project => 
            project.id === task.projectId
              ? { ...project, taskIds: project.taskIds.filter(id => id !== taskId) }
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
      title: "Task Updated",
      description: `Task "${task.name}" has been updated.`
    });
  };
  
  const deleteTask = (taskId) => {
    const taskToDelete = tasks.find(t => t.id === taskId);
    
    if (!taskToDelete) {
      toast({
        title: "Error",
        description: "Task not found.",
        variant: "destructive"
      });
      return;
    }
    
    // Remove from project
    if (taskToDelete.projectId) {
      setProjects(prev => 
        prev.map(project => 
          project.id === taskToDelete.projectId
            ? { ...project, taskIds: project.taskIds.filter(id => id !== taskId) }
            : project
        )
      );
    }
    
    // Delete the task
    setTasks(prev => prev.filter(t => t.id !== taskId));
    
    toast({
      title: "Task Deleted",
      description: `Task "${taskToDelete.name}" has been deleted.`
    });
  };
  
  // Values to expose via context
  const contextValue = {
    // Project data
    projects,
    tasks,
    employees,
    teams,
    
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
