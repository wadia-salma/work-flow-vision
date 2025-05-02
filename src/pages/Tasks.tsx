
import React from "react";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { TaskStatus } from "@/types";
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

const Tasks: React.FC = () => {
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
  
  const handleChangeStatus = (taskId: string, newStatus: TaskStatus) => {
    updateTaskStatus(taskId, newStatus);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tâches</h1>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Toutes les Tâches ({filteredTasks.length})</TabsTrigger>
          <TabsTrigger value="todo">À Faire ({todoTasks.length})</TabsTrigger>
          <TabsTrigger value="in-progress">En Cours ({inProgressTasks.length})</TabsTrigger>
          <TabsTrigger value="done">Terminées ({doneTasks.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <TaskList 
            tasks={filteredTasks} 
            getProjectById={getProjectById} 
            getEmployeeById={getEmployeeById}
            handleChangeStatus={handleChangeStatus}
            isAdmin={isAdmin}
          />
        </TabsContent>
        
        <TabsContent value="todo">
          <TaskList 
            tasks={todoTasks} 
            getProjectById={getProjectById} 
            getEmployeeById={getEmployeeById}
            handleChangeStatus={handleChangeStatus}
            isAdmin={isAdmin}
          />
        </TabsContent>
        
        <TabsContent value="in-progress">
          <TaskList 
            tasks={inProgressTasks} 
            getProjectById={getProjectById} 
            getEmployeeById={getEmployeeById}
            handleChangeStatus={handleChangeStatus}
            isAdmin={isAdmin}
          />
        </TabsContent>
        
        <TabsContent value="done">
          <TaskList 
            tasks={doneTasks} 
            getProjectById={getProjectById} 
            getEmployeeById={getEmployeeById}
            handleChangeStatus={handleChangeStatus}
            isAdmin={isAdmin}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Define the props interface for the TaskList component
interface TaskListProps {
  tasks: any[];
  getProjectById: (id: string) => any;
  getEmployeeById: (id: string) => any;
  handleChangeStatus: (taskId: string, newStatus: TaskStatus) => void;
  isAdmin: boolean;
}

const TaskList = ({ 
  tasks, 
  getProjectById, 
  getEmployeeById, 
  handleChangeStatus,
  isAdmin 
}: TaskListProps) => {
  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map(task => {
              const project = getProjectById(task.projectId);
              
              const status = (() => {
                switch (task.status) {
                  case "todo": return <span className="status-badge status-todo">À Faire</span>;
                  case "in-progress": return <span className="status-badge status-in-progress">En Cours</span>;
                  case "done": return <span className="status-badge status-done">Terminée</span>;
                  default: return null;
                }
              })();
              
              return (
                <div key={task.id} className="p-4 border rounded-md">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{task.title}</h3>
                    {status}
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                  
                  <div className="mt-4 flex flex-wrap gap-4">
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Projet</p>
                      <Link to={`/projects/${project?.id}`} className="text-sm text-jira-blue hover:underline">
                        {project?.name || "Projet Inconnu"}
                      </Link>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Créée le</p>
                      <p className="text-sm">{format(new Date(task.createdAt), "d MMM yyyy")}</p>
                    </div>
                    
                    {isAdmin && task.daysSpent !== undefined && (
                      <div>
                        <p className="text-xs text-gray-600 font-medium">Jours Passés</p>
                        <p className="text-sm">{task.daysSpent} jours</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-xs text-gray-600 font-medium mb-2">Assignée à</p>
                    <div className="flex flex-wrap gap-2">
                      {task.assignedEmployees.map(employeeId => {
                        const employee = getEmployeeById(employeeId);
                        if (!employee) return null;
                        
                        return (
                          <div key={employeeId} className="flex items-center space-x-2 bg-slate-50 rounded-full px-2 py-1">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={employee.avatar} />
                              <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-medium">{employee.name}</span>
                          </div>
                        );
                      })}
                      
                      {task.assignedEmployees.length === 0 && (
                        <span className="text-sm text-gray-500">Non assignée</span>
                      )}
                    </div>
                  </div>
                  
                  {isAdmin && (
                    <div className="flex gap-2 mt-4 justify-end">
                      {task.status !== "in-progress" && task.status !== "done" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleChangeStatus(task.id, "in-progress")}
                        >
                          Commencer
                        </Button>
                      )}
                      
                      {task.status === "in-progress" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleChangeStatus(task.id, "done")}
                        >
                          Terminer
                        </Button>
                      )}
                      
                      {task.status === "todo" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleChangeStatus(task.id, "done")}
                        >
                          Marquer comme Terminée
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Aucune tâche trouvée</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Tasks;
