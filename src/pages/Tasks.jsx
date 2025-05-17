import React from "react";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const Tasks = () => {
  const { tasks, getProjectById, getEmployeeById, updateTaskStatus } = useApp();
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === "admin";
  
  // Filter tasks based on user role
  const filteredTasks = isAdmin 
    ? tasks 
    : tasks.filter(task => task.assignedEmployees.includes(currentUser?.id || ""));
  
  const todoTasks = filteredTasks.filter(task => task.status === "todo");
  const inProgressTasks = filteredTasks.filter(task => task.status === "in-progress");
  const doneTasks = filteredTasks.filter(task => task.status === "done");
  
  const handleChangeStatus = (taskId, newStatus) => {
    updateTaskStatus(taskId, newStatus);
  };

  // ... existing code ...
};

const TaskList = ({ 
  tasks, 
  getProjectById, 
  getEmployeeById, 
  handleChangeStatus,
  isAdmin 
}) => {
  // ... existing code ...
};

export default Tasks;