import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Plus, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { 
    getProjectById, 
    getTasksByProject, 
    getTeamById, 
    getEmployeeById, 
    addTask,
    updateTaskStatus,
    employees
  } = useApp();
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === "admin";
  
  const project = getProjectById(projectId || "");
  
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "todo",
    projectId: projectId || "",
    assignedEmployees: [],
    daysSpent: 0,
  });

  // ... existing code ...
};

export default ProjectDetail;