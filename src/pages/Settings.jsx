import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Settings = () => {
  const { currentUser } = useAuth();
  
  // Only admins can access this page
  if (currentUser?.role !== "admin") {
    return <Navigate to="/" />;
  }
  
  const handleSaveGeneral = (e) => {
    e.preventDefault();
    toast.success("Settings saved", {
      description: "Your changes have been saved successfully."
    });
  };
  
  const handleSaveNotifications = (e) => {
    e.preventDefault();
    toast.success("Notification settings saved", {
      description: "Your notification preferences have been updated."
    });
  };

  // ... existing code ...
};

export default Settings;