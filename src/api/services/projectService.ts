
import api from '../axios';
import { ENDPOINTS } from '../config';
import { Project } from '@/types';

export const projectService = {
  getAllProjects: async (): Promise<Project[]> => {
    const response = await api.get(ENDPOINTS.PROJECTS);
    return response.data;
  },
  
  getProject: async (id: string): Promise<Project> => {
    const response = await api.get(ENDPOINTS.PROJECT(id));
    return response.data;
  },
  
  createProject: async (project: Partial<Project>): Promise<Project> => {
    const response = await api.post(ENDPOINTS.PROJECTS, project);
    return response.data;
  },
  
  updateProject: async (id: string, project: Partial<Project>): Promise<Project> => {
    const response = await api.put(ENDPOINTS.PROJECT(id), project);
    return response.data;
  },
  
  deleteProject: async (id: string): Promise<void> => {
    await api.delete(ENDPOINTS.PROJECT(id));
  },
};
