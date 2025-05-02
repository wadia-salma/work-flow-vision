
import api from '../axios';
import { ENDPOINTS } from '../config';
import { Task } from '@/types';

export const taskService = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get(ENDPOINTS.TASKS);
    return response.data;
  },
  
  getProjectTasks: async (projectId: string): Promise<Task[]> => {
    const response = await api.get(ENDPOINTS.PROJECT_TASKS(projectId));
    return response.data;
  },
  
  getTask: async (id: string): Promise<Task> => {
    const response = await api.get(ENDPOINTS.TASK(id));
    return response.data;
  },
  
  createTask: async (task: Partial<Task>): Promise<Task> => {
    const response = await api.post(ENDPOINTS.TASKS, task);
    return response.data;
  },
  
  updateTask: async (id: string, task: Partial<Task>): Promise<Task> => {
    const response = await api.put(ENDPOINTS.TASK(id), task);
    return response.data;
  },
  
  deleteTask: async (id: string): Promise<void> => {
    await api.delete(ENDPOINTS.TASK(id));
  },
  
  updateTaskStatus: async (id: string, status: string): Promise<Task> => {
    const response = await api.patch(ENDPOINTS.TASK(id), { status });
    return response.data;
  },
};
