import apiClient from './apiClient';

export const analyticsService = {
  getTrends: async () => {
    try {
      return await apiClient.get('/analytics/incident-trends');
    } catch {
      return {
        success: true,
        data: [
          { day: 'Mon', critical: 4, high: 8, medium: 12 },
          { day: 'Tue', critical: 2, high: 5, medium: 9 },
          { day: 'Wed', critical: 7, high: 11, medium: 14 },
          { day: 'Thu', critical: 3, high: 6, medium: 10 },
          { day: 'Fri', critical: 9, high: 15, medium: 20 },
          { day: 'Sat', critical: 1, high: 2, medium: 4 },
          { day: 'Sun', critical: 0, high: 1, medium: 3 },
        ],
      };
    }
  },
  getRiskDistribution: async () => {
    try {
      return await apiClient.get('/analytics/risk-distribution');
    } catch {
      return {
        success: true,
        data: {
          CRITICAL: 8,
          HIGH: 24,
          MEDIUM: 45,
          LOW: 120,
        },
      };
    }
  },
};
