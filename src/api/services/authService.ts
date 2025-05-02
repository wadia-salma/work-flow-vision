
import api from '../axios';
import { ENDPOINTS } from '../config';
import { User } from '@/types';

export const authService = {
  login: async (email: string, password: string) => {
    // First, make sure CSRF cookie is set (required by Laravel Sanctum)
    await api.get('/sanctum/csrf-cookie');
    
    // Then login
    const response = await api.post(ENDPOINTS.LOGIN, { email, password });
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post(ENDPOINTS.LOGOUT);
    return response.data;
  },
  
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get(ENDPOINTS.GET_USER);
    return response.data;
  },
};
