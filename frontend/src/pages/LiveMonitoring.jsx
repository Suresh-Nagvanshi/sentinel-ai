import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Radio, Camera, Cpu } from 'lucide-react';

export const LiveMonitoring = () => {
  const [isStreaming, setIsStreaming] = useState(true);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
              <Radio className="w-5 h-5 text-rose-500 animate-pulse" />
              Live Endpoint Telemetry Monitor
            </h1>
            <p className="text-xs text-slate-400 mt-1">Real-time computer vision frame analysis stream (YOLOv8 + MediaPipe).</p>
          </div>
          <Button
            variant={isStreaming ? 'danger' : 'primary'}
            onClick={() => setIsStreaming(!isStreaming)}
          >
            {isStreaming ? 'Pause Stream' : 'Resume Live Feed'}
          </Button>
        </div>

        {/* Video Feeds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feed 1: Screen Recording Hook Scan */}
          <Card title="Screen Capture & Overlay Detector" action={<StatusBadge status="ACTIVE_PROTECTION" />}>
            <div className="relative aspect-video rounded-xl bg-sentinel-950 border border-slate-800 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
              {/* Simulated Feed Viewport */}
              <div className="text-center p-6 z-20">
                <Cpu className="w-12 h-12 text-blue-500 mx-auto mb-3 animate-pulse" />
                <p className="text-xs font-mono text-slate-300">FastAPI Hook: /screen-detection</p>
                <p className="text-[11px] text-slate-500 mt-1">FPS: 30.0 | Resolution: 1920x1080 | Latency: 12ms</p>
              </div>
              <div className="absolute top-3 left-3 z-20 bg-slate-900/90 px-3 py-1 rounded-lg border border-slate-700 text-[10px] font-mono text-emerald-400">
                ● LIVE SCR_BUFFER
              </div>
            </div>
          </Card>

          {/* Feed 2: Webcam Perimeter Camera Scan */}
          <Card title="Webcam Device & Observer Detection" action={<StatusBadge status="ACTIVE_PROTECTION" />}>
            <div className="relative aspect-video rounded-xl bg-sentinel-950 border border-slate-800 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
              <div className="text-center p-6 z-20">
                <Camera className="w-12 h-12 text-cyan-500 mx-auto mb-3 animate-pulse" />
                <p className="text-xs font-mono text-slate-300">FastAPI Hook: /webcam-monitor & /object-detection</p>
                <p className="text-[11px] text-slate-500 mt-1">Faces: 1 Whitelisted | Threat Objects: None</p>
              </div>
              <div className="absolute top-3 left-3 z-20 bg-slate-900/90 px-3 py-1 rounded-lg border border-slate-700 text-[10px] font-mono text-cyan-400">
                ● LIVE CAM_STREAM
              </div>
            </div>
          </Card>
        </div>

        {/* Real-time Process Monitor Table */}
        <Card title="Active Scanned System Processes" subtitle="Continuous psutil scan for blacklisted screen grabbers">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-sentinel-900 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">PID</th>
                  <th className="py-3 px-4">Process Name</th>
                  <th className="py-3 px-4">Path</th>
                  <th className="py-3 px-4">Threat Status</th>
                  <th className="py-3 px-4">Risk Factor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="py-2.5 px-4">4102</td>
                  <td className="py-2.5 px-4 font-semibold text-rose-400">obs64.exe</td>
                  <td className="py-2.5 px-4 text-slate-500">C:\Program Files\obs-studio\bin\64bit\obs64.exe</td>
                  <td className="py-2.5 px-4 text-rose-400">FLAGGED</td>
                  <td className="py-2.5 px-4 text-rose-400 font-bold">0.98</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4">8910</td>
                  <td className="py-2.5 px-4 text-slate-200">chrome.exe</td>
                  <td className="py-2.5 px-4 text-slate-500">C:\Program Files\Google\Chrome\Application\chrome.exe</td>
                  <td className="py-2.5 px-4 text-emerald-400">CLEAN</td>
                  <td className="py-2.5 px-4 text-emerald-400 font-bold">0.02</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};
