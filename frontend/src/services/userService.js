import apiClient from './apiClient';

export const userService = {
  getUsers: async () => {
    try {
      return await apiClient.get('/users');
    } catch {
      return {
        success: true,
        data: [
          { id: 'usr-001', name: 'Security Admin', email: 'admin@sentinel.ai',    role: 'ROLE_ADMIN',            status: 'ACTIVE', riskScore: 2 },
          { id: 'usr-002', name: 'Sarah Connor',   email: 'sarah@sentinel.ai',    role: 'ROLE_SECURITY_OFFICER', status: 'ACTIVE', riskScore: 8 },
          { id: 'usr-003', name: 'Alex Ross',      email: 'alex.ross@corp.local', role: 'ROLE_EMPLOYEE',         status: 'FLAGGED', riskScore: 95 },
        ],
      };
    }
  },
  createUser: async (payload) => {
    try {
      return await apiClient.post('/users', payload);
    } catch {
      return { success: true, data: { id: `usr-${Date.now()}`, ...payload } };
    }
  },
  updateUser: async (id, payload) => {
    try {
      return await apiClient.put(`/users/${id}`, payload);
    } catch {
      return { success: true };
    }
  },
  deleteUser: async (id) => {
    try {
      return await apiClient.delete(`/users/${id}`);
    } catch {
      return { success: true };
    }
  },
};
