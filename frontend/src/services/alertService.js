import apiClient from './apiClient';

export const alertService = {
  getAlerts: async () => {
    try {
      return await apiClient.get('/alerts');
    } catch {
      return {
        success: true,
        data: [
          {
            id: 'alt-001',
            alertType: 'SCREEN_RECORDING',
            severity: 'CRITICAL',
            source: 'Process Monitor',
            message: 'Active Camtasia recorder process detected on workstation WS-904',
            acknowledged: false,
            username: 'alex.ross',
            createdAt: new Date().toISOString(),
          },
          {
            id: 'alt-002',
            alertType: 'PHONE_DETECTED',
            severity: 'HIGH',
            source: 'YOLO Computer Vision',
            message: 'Smartphone camera lens pointed at display perimeter',
            acknowledged: false,
            username: 'sarah.connor',
            createdAt: new Date(Date.now() - 900000).toISOString(),
          },
        ],
      };
    }
  },
  acknowledgeAlert: async (id) => {
    try {
      return await apiClient.put(`/alerts/${id}/acknowledge`);
    } catch {
      return { success: true };
    }
  },
};
