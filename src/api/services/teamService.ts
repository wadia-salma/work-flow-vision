
import api from '../axios';
import { ENDPOINTS } from '../config';
import { Team } from '@/types';

export const teamService = {
  getAllTeams: async (): Promise<Team[]> => {
    const response = await api.get(ENDPOINTS.TEAMS);
    return response.data;
  },
  
  getTeam: async (id: string): Promise<Team> => {
    const response = await api.get(ENDPOINTS.TEAM(id));
    return response.data;
  },
  
  createTeam: async (team: Partial<Team>): Promise<Team> => {
    const response = await api.post(ENDPOINTS.TEAMS, team);
    return response.data;
  },
  
  updateTeam: async (id: string, team: Partial<Team>): Promise<Team> => {
    const response = await api.put(ENDPOINTS.TEAM(id), team);
    return response.data;
  },
  
  deleteTeam: async (id: string): Promise<void> => {
    await api.delete(ENDPOINTS.TEAM(id));
  },
};
