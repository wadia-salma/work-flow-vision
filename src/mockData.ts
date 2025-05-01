
import { User, Task, Project, Employee, Team } from "./types";

export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
  },
  {
    id: "user2",
    name: "Client User",
    email: "client@example.com",
    role: "client",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=client"
  }
];

export const mockTeams: Team[] = [
  {
    id: "team1",
    name: "Development Team",
    employeeIds: ["emp1", "emp2", "emp3"]
  },
  {
    id: "team2",
    name: "Design Team",
    employeeIds: ["emp4", "emp5"]
  },
  {
    id: "team3",
    name: "Marketing Team",
    employeeIds: ["emp6", "emp7"]
  }
];

export const mockEmployees: Employee[] = [
  {
    id: "emp1",
    name: "John Developer",
    email: "john@example.com",
    role: "Frontend Developer",
    teamId: "team1",
    taskId: "task1",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john"
  },
  {
    id: "emp2",
    name: "Sarah Engineer",
    email: "sarah@example.com",
    role: "Backend Developer",
    teamId: "team1",
    taskId: "task2",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
  },
  {
    id: "emp3",
    name: "Michael Coder",
    email: "michael@example.com",
    role: "Full Stack Developer",
    teamId: "team1",
    taskId: "task3",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael"
  },
  {
    id: "emp4",
    name: "Emma Designer",
    email: "emma@example.com",
    role: "UI Designer",
    teamId: "team2",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma"
  },
  {
    id: "emp5",
    name: "James Artist",
    email: "james@example.com",
    role: "UX Designer",
    teamId: "team2",
    taskId: "task4",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james"
  },
  {
    id: "emp6",
    name: "Lisa Marketer",
    email: "lisa@example.com",
    role: "Marketing Specialist",
    teamId: "team3",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa"
  },
  {
    id: "emp7",
    name: "David Analyst",
    email: "david@example.com",
    role: "Marketing Analyst",
    teamId: "team3",
    taskId: "task5",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david"
  }
];

export const mockProjects: Project[] = [
  {
    id: "proj1",
    name: "Website Redesign",
    description: "Complete redesign of the company website with modern UI/UX",
    teamId: "team1",
    tasks: ["task1", "task2", "task3"],
    createdAt: "2023-01-15T12:00:00.000Z",
    tjm: 500
  },
  {
    id: "proj2",
    name: "Mobile App Development",
    description: "Develop a new mobile app for iOS and Android",
    teamId: "team1",
    tasks: ["task4", "task5"],
    createdAt: "2023-03-10T09:30:00.000Z",
    tjm: 600
  },
  {
    id: "proj3",
    name: "Marketing Campaign",
    description: "Q2 marketing campaign for product launch",
    teamId: "team3",
    tasks: ["task6", "task7"],
    createdAt: "2023-04-05T14:20:00.000Z",
    tjm: 450
  }
];

export const mockTasks: Task[] = [
  {
    id: "task1",
    title: "Design Homepage",
    description: "Create a modern, responsive design for the homepage",
    status: "done",
    projectId: "proj1",
    assignedEmployees: ["emp1", "emp4"],
    createdAt: "2023-01-16T09:00:00.000Z",
    tjm: 450,
    daysSpent: 3
  },
  {
    id: "task2",
    title: "Backend API Development",
    description: "Develop RESTful APIs for the website",
    status: "in-progress",
    projectId: "proj1",
    assignedEmployees: ["emp2"],
    createdAt: "2023-01-18T10:15:00.000Z",
    tjm: 500,
    daysSpent: 5
  },
  {
    id: "task3",
    title: "User Authentication",
    description: "Implement user authentication and authorization",
    status: "todo",
    projectId: "proj1",
    assignedEmployees: ["emp3"],
    createdAt: "2023-01-20T11:30:00.000Z",
    tjm: 520,
    daysSpent: 0
  },
  {
    id: "task4",
    title: "App UI Design",
    description: "Design the UI for the mobile app",
    status: "in-progress",
    projectId: "proj2",
    assignedEmployees: ["emp5"],
    createdAt: "2023-03-12T14:45:00.000Z",
    tjm: 550,
    daysSpent: 4
  },
  {
    id: "task5",
    title: "Market Research",
    description: "Conduct market research for target audience",
    status: "done",
    projectId: "proj2",
    assignedEmployees: ["emp7"],
    createdAt: "2023-03-15T16:20:00.000Z",
    tjm: 400,
    daysSpent: 7
  },
  {
    id: "task6",
    title: "Social Media Strategy",
    description: "Develop social media marketing strategy",
    status: "done",
    projectId: "proj3",
    assignedEmployees: ["emp6"],
    createdAt: "2023-04-06T09:10:00.000Z",
    tjm: 350,
    daysSpent: 2
  },
  {
    id: "task7",
    title: "Content Creation",
    description: "Create content for marketing campaign",
    status: "todo",
    projectId: "proj3",
    assignedEmployees: ["emp6", "emp7"],
    createdAt: "2023-04-08T11:05:00.000Z",
    tjm: 380,
    daysSpent: 0
  }
];
