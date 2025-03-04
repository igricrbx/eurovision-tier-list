import axios from 'axios';
import { Stage } from '../types'; // We'll add this type

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const authService = {
  register: async (email: string, password: string, username: string) => {
    const response = await api.post('/api/users/register', { email, password, username });
    return response.data;
  },
  
  login: async (email: string, password: string) => {
    const response = await api.post('/api/users/login', { email, password });
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/api/users/me');
    return response.data;
  },
};

// Contestant services
export const contestantService = {
  getAllContestants: async (year = 2025, stage?: Stage) => {
    const response = await api.get(`/api/contestants?year=${year}${stage ? `&stage=${stage}` : ''}`);
    return response.data;
  },
  
  getContestantById: async (id: string) => {
    const response = await api.get(`/api/contestants/${id}`);
    return response.data;
  },
};

// Tier list services
export const tierListService = {
  createTierList: async (name: string, isPublic: boolean, stage: Stage) => {
    try {
      console.log('Creating tier list with data:', { name, isPublic, stage });
      // Fix endpoint to be consistent with other API calls
      const response = await api.post('/api/tierlists', { name, isPublic, stage });
      console.log('Create tier list raw API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to create tier list:', error);
      // Log detailed error information
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
      throw error;
    }
  },
  
  getUserTierLists: async () => {
    const response = await api.get('/api/tierlists');
    return response.data;
  },
  
  getTierList: async (idOrCode: string) => {
    try {
      const response = await api.get(`/api/tierlists/${idOrCode}`);
      console.log('Get tier list raw API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to get tier list:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
      throw error;
    }
  },
  
  updateTierList: async (id: string, data: any) => {
    try {
      console.log('Updating tier list with ID:', id);
      
      // Process entries to include order if they exist
      if (data.entries) {
        // Ensure entries have order based on their position in each tier
        const tierGroups = data.entries.reduce((acc: any, entry: any) => {
          if (!acc[entry.tier]) {
            acc[entry.tier] = [];
          }
          acc[entry.tier].push(entry);
          return acc;
        }, {});
        
        // Reset entries to empty array
        const processedEntries: any[] = [];
        
        // Add entries back with proper order within each tier
        Object.keys(tierGroups).forEach(tier => {
          tierGroups[tier].forEach((entry: any, index: number) => {
            processedEntries.push({
              ...entry,
              order: index
            });
          });
        });
        
        data.entries = processedEntries;
      }
      
      console.log('Update data:', data);
      const response = await api.put(`/api/tierlists/${id}`, data);
      console.log('Update tier list raw API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to update tier list:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
      throw error;
    }
  },
  
  deleteTierList: async (id: string) => {
    const response = await api.delete(`/api/tierlists/${id}`);
    return response.data;
  },
};

export default api;