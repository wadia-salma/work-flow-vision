
import api from '../axios';
import { ENDPOINTS } from '../config';
import { Employee } from '@/types';

export const employeeService = {
  getAllEmployees: async (): Promise<Employee[]> => {
    const response = await api.get(ENDPOINTS.EMPLOYEES);
    return response.data;
  },
  
  getEmployee: async (id: string): Promise<Employee> => {
    const response = await api.get(ENDPOINTS.EMPLOYEE(id));
    return response.data;
  },
  
  createEmployee: async (employee: Partial<Employee>): Promise<Employee> => {
    const response = await api.post(ENDPOINTS.EMPLOYEES, employee);
    return response.data;
  },
  
  updateEmployee: async (id: string, employee: Partial<Employee>): Promise<Employee> => {
    const response = await api.put(ENDPOINTS.EMPLOYEE(id), employee);
    return response.data;
  },
  
  deleteEmployee: async (id: string): Promise<void> => {
    await api.delete(ENDPOINTS.EMPLOYEE(id));
  },
};
