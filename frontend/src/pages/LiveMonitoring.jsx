import React, { useState, useEffect, useRef } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Radio, Camera, Cpu, RefreshCw, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const INITIAL_PROCESSES = [
  { pid: 4102, name: 'obs64.exe',    path: 'C:\\Program Files\\obs-studio\\bin\\64bit\\obs64.exe',           status: 'FLAGGED', risk: 0.98, terminated: false },
  { pid: 9301, name: 'camtasia.exe', path: 'C:\\Program Files\\TechSmith\\Camtasia\\camtasia.exe',           status: 'FLAGGED', risk: 0.92, terminated: false },
  { pid: 8910, name: 'chrome.exe',   path: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',    status: 'CLEAN',   risk: 0.02, terminated: false },
  { pid: 3204, name: 'snagit32.exe', path: 'C:\\Program Files\\TechSmith\\Snagit\\snagit32.exe',            status: 'FLAGGED', risk: 0.87, terminated: false },
  { pid: 7741, name: 'code.exe',     path: 'C:\\Users\\dev\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe', status: 'CLEAN', risk: 0.01, terminated: false },
  { pid: 5512, name: 'loom.exe',     path: 'C:\\Users\\dev\\AppData\\Local\\Loom\\loom.exe',                status: 'FLAGGED', risk: 0.89, terminated: false },
];

const THREAT_EVENTS = [
  '⚠ CRITICAL — obs64.exe screen capture buffer access on WS-904',
  '⚠ HIGH — Phone camera lens detected at workstation of sarah.connor',
  '⚠ HIGH — camtasia.exe initiated recording session on endpoint DEV-11',
  'ℹ INFO — MediaPipe face scan completed: 1 whitelisted face present',
  '⚠ HIGH — loom.exe launched on endpoint WS-221, policy violation triggered',
  'ℹ INFO — YOLOv8 scan pass: no external devices detected at WS-441',
  '⚠ MEDIUM — Secondary observer face detected for >3s at WS-104',
];

export const LiveMonitoring = () => {
  const [isStreaming, setIsStreaming] = useState(true);
  const [processes, setProcesses]    = useState(INITIAL_PROCESSES);
  const [tickerIdx, setTickerIdx]    = useState(0);
  const [lastScan, setLastScan]      = useState(new Date());
  const [scanCount, setScanCount]    = useState(0);
  const tickerRef = useRef(null);

  useEffect(() => {
    if (!isStreaming) {
      clearInterval(tickerRef.current);
      return;
    }
    tickerRef.current = setInterval(() => {
      setTickerIdx((i) => (i + 1) % THREAT_EVENTS.length);
      setScanCount((c) => c + 1);
      setLastScan(new Date());
    }, 4000);
    return () => clearInterval(tickerRef.current);
  }, [isStreaming]);

  const handleTerminate = (pid) => {
    setProcesses((prev) =>
      prev.map((p) => (p.pid === pid ? { ...p, terminated: true, status: 'CLEAN', risk: 0 } : p))
    );
  };

  const handleRefresh = () => {
    setLastScan(new Date());
    setScanCount((c) => c + 1);
  };

  const flagged = processes.filter((p) => p.status === 'FLAGGED' && !p.terminated);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
              <Radio className={`w-5 h-5 ${isStreaming ? 'text-rose-500 animate-pulse' : 'text-slate-500'}`} />
              Live Endpoint Telemetry
            </h1>
            <p className="text-xs text-slate-400 mt-1">Real-time computer vision frame analysis (YOLOv8 + MediaPipe + psutil).</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" icon={RefreshCw} onClick={handleRefresh}>Refresh Scan</Button>
            <Button
              variant={isStreaming ? 'danger' : 'primary'}
              onClick={() => setIsStreaming((s) => !s)}
            >
              {isStreaming ? 'Pause Stream' : 'Resume Live Feed'}
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3 glass-card border border-slate-800 rounded-xl px-4 py-2.5">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
            isStreaming ? 'bg-rose-500/20 text-rose-400 animate-pulse' : 'bg-slate-700 text-slate-500'
          }`}>
            {isStreaming ? '● LIVE' : '⏸ PAUSED'}
          </span>
          <span className="text-xs text-slate-300 font-mono truncate">
            {THREAT_EVENTS[tickerIdx]}
          </span>
          <span className="ml-auto text-[10px] text-slate-500 shrink-0">
            Scans: {scanCount} &bull; {lastScan.toLocaleTimeString()}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="glass-card rounded-xl border border-rose-500/20 p-4">
            <p className="text-2xl font-extrabold text-rose-400">{flagged.length}</p>
            <p className="text-[10px] text-slate-400">Flagged Processes</p>
          </div>
          <div className="glass-card rounded-xl border border-emerald-500/20 p-4">
            <p className="text-2xl font-extrabold text-emerald-400">
              {processes.filter((p) => !p.terminated && p.status === 'CLEAN').length}
            </p>
            <p className="text-[10px] text-slate-400">Clean Processes</p>
          </div>
          <div className="glass-card rounded-xl border border-slate-700 p-4">
            <p className="text-2xl font-extrabold text-slate-100">
              {processes.filter((p) => p.terminated).length}
            </p>
            <p className="text-[10px] text-slate-400">Terminated</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Screen Capture & Overlay Detector" action={<StatusBadge status={isStreaming ? 'ACTIVE_PROTECTION' : 'DISABLED'} />}>
            <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
              <div className="text-center p-6 z-20">
                <Cpu className={`w-12 h-12 mx-auto mb-3 ${isStreaming ? 'text-blue-500 animate-pulse' : 'text-slate-600'}`} />
                <p className="text-xs font-mono text-slate-300">FastAPI: /screen-detection</p>
                <p className="text-[11px] text-slate-500 mt-1">FPS: 30.0 &bull; 1920×1080 &bull; Latency: 12ms</p>
              </div>
              <div className={`absolute top-3 left-3 z-20 bg-slate-900/90 px-3 py-1 rounded-lg border text-[10px] font-mono ${
                isStreaming ? 'border-slate-700 text-emerald-400' : 'border-slate-800 text-slate-600'
              }`}>
                {isStreaming ? '● LIVE SCR_BUFFER' : '⏸ STREAM PAUSED'}
              </div>
            </div>
          </Card>

          <Card title="Webcam Device & Observer Detection" action={<StatusBadge status={isStreaming ? 'ACTIVE_PROTECTION' : 'DISABLED'} />}>
            <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
              <div className="text-center p-6 z-20">
                <Camera className={`w-12 h-12 mx-auto mb-3 ${isStreaming ? 'text-cyan-500 animate-pulse' : 'text-slate-600'}`} />
                <p className="text-xs font-mono text-slate-300">FastAPI: /webcam-monitor & /object-detection</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {isStreaming ? 'Faces: 1 Whitelisted • Threat Objects: None' : 'Stream inactive'}
                </p>
              </div>
              <div className={`absolute top-3 left-3 z-20 bg-slate-900/90 px-3 py-1 rounded-lg border text-[10px] font-mono ${
                isStreaming ? 'border-slate-700 text-cyan-400' : 'border-slate-800 text-slate-600'
              }`}>
                {isStreaming ? '● LIVE CAM_STREAM' : '⏸ STREAM PAUSED'}
              </div>
            </div>
          </Card>
        </div>

        <Card
          title="Active Scanned System Processes"
          subtitle={`psutil continuous scan — ${flagged.length} threat(s) detected`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900/60 text-slate-400 font-semibold border-b border-slate-800 text-[10px] uppercase tracking-wide">
                <tr>
                  <th className="py-3 px-4">PID</th>
                  <th className="py-3 px-4">Process</th>
                  <th className="py-3 px-4 hidden md:table-cell">Path</th>
                  <th className="py-3 px-4">Threat</th>
                  <th className="py-3 px-4">Risk</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {processes.map((p) => (
                  <tr key={p.pid} className={`transition ${p.terminated ? 'opacity-40' : 'hover:bg-slate-800/30'}`}>
                    <td className="py-2.5 px-4 text-slate-500">{p.pid}</td>
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2">
                        {p.terminated ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        ) : p.status === 'FLAGGED' ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        ) : (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                        <span className={p.status === 'FLAGGED' && !p.terminated ? 'text-rose-300 font-semibold' : 'text-slate-200'}>
                          {p.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-4 text-slate-500 text-[10px] hidden md:table-cell max-w-xs truncate">{p.path}</td>
                    <td className="py-2.5 px-4">
                      <span className={`font-bold ${
                        p.terminated ? 'text-slate-500' : p.status === 'FLAGGED' ? 'text-rose-400' : 'text-emerald-400'
                      }`}>
                        {p.terminated ? 'TERMINATED' : p.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1 rounded-full bg-slate-800">
                          <div
                            className={`h-full rounded-full ${p.risk >= 0.8 ? 'bg-rose-500' : p.risk >= 0.5 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${p.risk * 100}%` }}
                          />
                        </div>
                        <span className={p.risk >= 0.8 ? 'text-rose-400' : 'text-emerald-400'}>
                          {p.risk.toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-4">
                      {p.status === 'FLAGGED' && !p.terminated ? (
                        <button
                          onClick={() => handleTerminate(p.pid)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 transition text-[10px] font-semibold"
                        >
                          <XCircle className="w-3 h-3" /> Terminate
                        </button>
                      ) : (
                        <span className="text-slate-600">&mdash;</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};
