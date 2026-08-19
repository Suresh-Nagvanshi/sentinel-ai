import React from 'react';

export const Navbar = () => {
  return (
    <div className="w-full h-12 bg-sentinel-900/90 border-b border-slate-800 px-6 flex items-center justify-between text-xs text-slate-400">
      <div className="flex items-center gap-4">
        <span>Sentinel Engine: <span className="text-emerald-400 font-mono">v1.0.4-PROD</span></span>
        <span>PostgreSQL Cluster: <span className="text-blue-400 font-mono">HEALTHY</span></span>
      </div>
      <div>
        <span>System Time: <span className="font-mono text-slate-300">{new Date().toUTCString()}</span></span>
      </div>
    </div>
  );
};
