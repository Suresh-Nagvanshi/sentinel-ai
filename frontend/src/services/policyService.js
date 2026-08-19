import apiClient from './apiClient';

export const policyService = {
  getPolicies: async () => {
    try {
      return await apiClient.get('/policies');
    } catch {
      return {
        success: true,
        data: [
          {
            id: 'pol-001',
            name: 'Zero Screen Recording Policy',
            description: 'Strictly block and terminate OBS, Camtasia, Snagit, and Loom process attempts.',
            category: 'SCREEN_SECURITY',
            enabled: true,
            ruleConfigJson: '{"action": "TERMINATE_AND_ALERT"}',
          },
          {
            id: 'pol-002',
            name: 'Camera Optics Perimeter Scanning',
            description: 'Enforce real-time YOLOv8 mobile camera detection on all workstation webcams.',
            category: 'WEBCAM_RULES',
            enabled: true,
            ruleConfigJson: '{"confidenceThreshold": 0.85}',
          },
          {
            id: 'pol-003',
            name: 'Multi-Observer Presence Alert',
            description: 'Trigger warning when secondary face looks at display for > 3 seconds.',
            category: 'WEBCAM_RULES',
            enabled: false,
            ruleConfigJson: '{"maxObserverAllowed": 1}',
          },
        ],
      };
    }
  },
  togglePolicy: async (id, enabled) => {
    try {
      return await apiClient.patch(`/policies/${id}/toggle`, null, { params: { enabled } });
    } catch {
      return { success: true };
    }
  },
};
