
import { User, Task, Project, Employee, Team } from "./types";

export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Administrateur",
    email: "admin@example.com",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
  },
  {
    id: "user2",
    name: "Client",
    email: "client@example.com",
    role: "client",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=client"
  }
];

export const mockTeams: Team[] = [
  {
    id: "team1",
    name: "Équipe Développement",
    employeeIds: ["emp1", "emp2", "emp3"]
  },
  {
    id: "team2",
    name: "Équipe Design",
    employeeIds: ["emp4", "emp5"]
  },
  {
    id: "team3",
    name: "Équipe Marketing",
    employeeIds: ["emp6", "emp7"]
  }
];

export const mockEmployees: Employee[] = [
  {
    id: "emp1",
    name: "Jean Développeur",
    email: "jean@example.com",
    role: "Développeur Frontend",
    teamId: "team1",
    taskId: "task1",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john"
  },
  {
    id: "emp2",
    name: "Sophie Ingénieure",
    email: "sophie@example.com",
    role: "Développeur Backend",
    teamId: "team1",
    taskId: "task2",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
  },
  {
    id: "emp3",
    name: "Michel Codeur",
    email: "michel@example.com",
    role: "Développeur Full Stack",
    teamId: "team1",
    taskId: "task3",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael"
  },
  {
    id: "emp4",
    name: "Émilie Designer",
    email: "emilie@example.com",
    role: "Designer UI",
    teamId: "team2",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma"
  },
  {
    id: "emp5",
    name: "Jacques Artiste",
    email: "jacques@example.com",
    role: "Designer UX",
    teamId: "team2",
    taskId: "task4",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james"
  },
  {
    id: "emp6",
    name: "Lisa Marketeuse",
    email: "lisa@example.com",
    role: "Spécialiste Marketing",
    teamId: "team3",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa"
  },
  {
    id: "emp7",
    name: "David Analyste",
    email: "david@example.com",
    role: "Analyste Marketing",
    teamId: "team3",
    taskId: "task5",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david"
  }
];

export const mockProjects: Project[] = [
  {
    id: "proj1",
    name: "Refonte du Site Web",
    description: "Refonte complète du site web de l'entreprise avec une interface moderne",
    teamId: "team1",
    tasks: ["task1", "task2", "task3"],
    createdAt: "2023-01-15T12:00:00.000Z"
  },
  {
    id: "proj2",
    name: "Développement App Mobile",
    description: "Développer une nouvelle application mobile pour iOS et Android",
    teamId: "team1",
    tasks: ["task4", "task5"],
    createdAt: "2023-03-10T09:30:00.000Z"
  },
  {
    id: "proj3",
    name: "Campagne Marketing",
    description: "Campagne marketing Q2 pour le lancement de produit",
    teamId: "team3",
    tasks: ["task6", "task7"],
    createdAt: "2023-04-05T14:20:00.000Z"
  }
];

export const mockTasks: Task[] = [
  {
    id: "task1",
    title: "Design Page d'Accueil",
    description: "Créer un design moderne et responsive pour la page d'accueil",
    status: "done",
    projectId: "proj1",
    assignedEmployees: ["emp1", "emp4"],
    createdAt: "2023-01-16T09:00:00.000Z",
    daysSpent: 3
  },
  {
    id: "task2",
    title: "Développement API Backend",
    description: "Développer des API RESTful pour le site web",
    status: "in-progress",
    projectId: "proj1",
    assignedEmployees: ["emp2"],
    createdAt: "2023-01-18T10:15:00.000Z",
    daysSpent: 5
  },
  {
    id: "task3",
    title: "Authentification Utilisateur",
    description: "Implémenter l'authentification et l'autorisation des utilisateurs",
    status: "todo",
    projectId: "proj1",
    assignedEmployees: ["emp3"],
    createdAt: "2023-01-20T11:30:00.000Z",
    daysSpent: 0
  },
  {
    id: "task4",
    title: "Design UI App Mobile",
    description: "Concevoir l'interface utilisateur pour l'application mobile",
    status: "in-progress",
    projectId: "proj2",
    assignedEmployees: ["emp5"],
    createdAt: "2023-03-12T14:45:00.000Z",
    daysSpent: 4
  },
  {
    id: "task5",
    title: "Étude de Marché",
    description: "Mener une étude de marché pour le public cible",
    status: "done",
    projectId: "proj2",
    assignedEmployees: ["emp7"],
    createdAt: "2023-03-15T16:20:00.000Z",
    daysSpent: 7
  },
  {
    id: "task6",
    title: "Stratégie Réseaux Sociaux",
    description: "Développer une stratégie marketing pour les réseaux sociaux",
    status: "done",
    projectId: "proj3",
    assignedEmployees: ["emp6"],
    createdAt: "2023-04-06T09:10:00.000Z",
    daysSpent: 2
  },
  {
    id: "task7",
    title: "Création de Contenu",
    description: "Créer du contenu pour la campagne marketing",
    status: "todo",
    projectId: "proj3",
    assignedEmployees: ["emp6", "emp7"],
    createdAt: "2023-04-08T11:05:00.000Z",
    daysSpent: 0
  }
];
