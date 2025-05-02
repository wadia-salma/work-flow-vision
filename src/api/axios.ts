
import axios from 'axios';
import { API_URL, API_TIMEOUT } from './config';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Important for Laravel Sanctum authentication (cookies)
});

// Request interceptor - adds auth token if available
api.interceptors.request.use(
  (config) => {
    // You can add authorization headers here if needed
    // For Laravel Sanctum, cookies will be used automatically with withCredentials: true
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    if (response && response.status === 401) {
      // Handle unauthorized (e.g., redirect to login)
      localStorage.removeItem('currentUser');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;
