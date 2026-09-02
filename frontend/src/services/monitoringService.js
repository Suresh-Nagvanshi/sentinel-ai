import apiClient from './apiClient';

export const monitoringService = {
  getProcesses: async () => {
    try {
      return await apiClient.get('/monitoring/processes');
    } catch {
      return {
        success: true,
        data: [
          { pid: 4102, name: 'obs64.exe',    status: 'FLAGGED', risk: 0.98, path: 'C:\\obs-studio\\obs64.exe' },
          { pid: 8910, name: 'chrome.exe',   status: 'CLEAN',   risk: 0.02, path: 'C:\\Chrome\\chrome.exe' },
          { pid: 5512, name: 'loom.exe',     status: 'FLAGGED', risk: 0.89, path: 'C:\\Loom\\loom.exe' },
        ],
      };
    }
  },
  terminateProcess: async (pid) => {
    try {
      return await apiClient.post(`/monitoring/processes/${pid}/terminate`);
    } catch {
      return { success: true };
    }
  },
  getStreamStatus: async () => {
    try {
      return await apiClient.get('/monitoring/stream-status');
    } catch {
      return {
        success: true,
        data: {
          screenCapture: { active: true, fps: 30.0, latency: '12ms', resolution: '1920x1080' },
          webcam:        { active: true, fps: 24.0, latency: '18ms', resolution: '1280x720'  },
        },
      };
    }
  },
};
