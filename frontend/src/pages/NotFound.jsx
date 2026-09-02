import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home } from 'lucide-react';

export const NotFound = () => (
  <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center px-4">
    <div className="p-4 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/30 mb-6">
      <ShieldAlert className="w-12 h-12 text-white" />
    </div>
    <h1 className="text-6xl font-extrabold text-slate-100 mb-2">404</h1>
    <p className="text-slate-400 text-sm mb-8">This page doesn&apos;t exist in the SentinelAI platform.</p>
    <Link
      to="/dashboard"
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition"
    >
      <Home className="w-4 h-4" />
      Return to Dashboard
    </Link>
  </div>
);
