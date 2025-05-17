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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { 
    projects = [], 
    tasks = [], 
    employees = [], 
    teams = [],
    calculateProjectCost 
  } = useApp();

  console.log("Dashboard loaded with app data:", {
    projectsCount: projects.length,
    tasksCount: tasks.length,
    calculateProjectCost: typeof calculateProjectCost
  });

  const isAdmin = currentUser?.role === "admin";

  // Filter tasks based on user role
  const filteredTasks = isAdmin 
    ? tasks 
    : tasks.filter(task => task.assignedEmployees?.includes(currentUser?.id || ""));

  // Calculate totals
  const totalProjects = projects.length;
  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter(task => task.status === "done").length;
  const totalEmployees = employees.length;
  const totalTeams = teams.length;
  
  // Task status distribution for pie chart
  const taskStatusData = [
    { name: "To Do", value: filteredTasks.filter(t => t.status === "todo").length },
    { name: "In Progress", value: filteredTasks.filter(t => t.status === "in-progress").length },
    { name: "Done", value: filteredTasks.filter(t => t.status === "done").length },
  ];
  
  const COLORS = ["#5E5ED4", "#A35EC2", "#25A56A"];
  
  // Project costs data for bar chart
  const projectCostData = projects.map(project => ({
    name: project.name,
    cost: calculateProjectCost ? calculateProjectCost(project.id) : 0,
  }));

  // Recent tasks
  const recentTasks = [...filteredTasks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "todo":
        return "status-badge status-todo";
      case "in-progress":
        return "status-badge status-in-progress";
      case "done":
        return "status-badge status-done";
      default:
        return "status-badge";
    }
  };
  
  const getStatusLabel = (status) => {
    switch (status) {
      case "todo":
        return "To Do";
      case "in-progress":
        return "In Progress";
      case "done":
        return "Done";
      default:
        return status;
    }
  };

  // ... existing code ...
};

export default Dashboard;