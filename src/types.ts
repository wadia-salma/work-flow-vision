
// Types for our project management application

export type UserRole = "admin" | "client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  projectId: string;
  assignedEmployees: string[];
  createdAt: string;
  daysSpent?: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  teamId: string;
  taskId?: string;
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  teamId: string;
  tasks: string[]; // Task IDs
  createdAt: string;
}

export interface Team {
  id: string;
  name: string;
  employeeIds: string[];
}

export interface AppState {
  currentUser: User | null;
  projects: Project[];
  tasks: Task[];
  employees: Employee[];
  teams: Team[];
}
