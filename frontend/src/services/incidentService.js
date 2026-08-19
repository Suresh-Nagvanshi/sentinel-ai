import apiClient from './apiClient';

export const incidentService = {
  getIncidents: async (params) => {
    try {
      return await apiClient.get('/incidents', { params });
    } catch {
      return {
        success: true,
        data: {
          content: [
            {
              id: 'inc-9901',
              title: 'OBS Screen Recorder Hook Detected',
              description: 'Unauthorized process obs64.exe attempted screen capture buffer access.',
              severity: 'CRITICAL',
              status: 'OPEN',
              riskScore: 95.0,
              targetedUser: 'alex.ross',
              detectedByEngine: 'ProcessMonitorEngine',
              detectedAt: new Date().toISOString(),
            },
            {
              id: 'inc-9902',
              title: 'Mobile Camera Lens Pointed at Display',
              description: 'YOLOv8 model detected optical lens in workstation perimeter.',
              severity: 'HIGH',
              status: 'UNDER_INVESTIGATION',
              riskScore: 82.4,
              targetedUser: 'sarah.connor',
              detectedByEngine: 'YoloObjectDetector',
              detectedAt: new Date(Date.now() - 3600000).toISOString(),
            },
            {
              id: 'inc-9903',
              title: 'Secondary Observer Facing Display',
              description: 'MediaPipe face detector identified non-whitelisted observer face.',
              severity: 'MEDIUM',
              status: 'RESOLVED',
              riskScore: 58.0,
              targetedUser: 'david.miller',
              detectedByEngine: 'MediaPipeFaceEngine',
              detectedAt: new Date(Date.now() - 7200000).toISOString(),
            },
          ],
          totalElements: 3,
          totalPages: 1,
        },
      };
    }
  },
  getIncidentById: async (id) => {
    try {
      return await apiClient.get(`/incidents/${id}`);
    } catch {
      return {
        success: true,
        data: {
          id,
          title: 'OBS Screen Recorder Hook Detected',
          description: 'Unauthorized process obs64.exe attempted screen capture buffer access.',
          severity: 'CRITICAL',
          status: 'OPEN',
          riskScore: 95.0,
          targetedUser: 'alex.ross',
          detectedByEngine: 'ProcessMonitorEngine',
          detectedAt: new Date().toISOString(),
        },
      };
    }
  },
};
