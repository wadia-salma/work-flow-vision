
// API configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
export const API_TIMEOUT = 15000; // 15 seconds

export const ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/api/login',
  LOGOUT: '/api/logout',
  REGISTER: '/api/register',
  GET_USER: '/api/user',
  
  // Projects
  PROJECTS: '/api/projects',
  PROJECT: (id) => `/api/projects/${id}`,
  
  // Tasks
  TASKS: '/api/tasks',
  TASK: (id) => `/api/tasks/${id}`,
  PROJECT_TASKS: (projectId) => `/api/projects/${projectId}/tasks`,
  
  // Teams
  TEAMS: '/api/teams',
  TEAM: (id) => `/api/teams/${id}`,
  
  // Employees
  EMPLOYEES: '/api/employees',
  EMPLOYEE: (id) => `/api/employees/${id}`,
};
