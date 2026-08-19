import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound = () => (
  <main className="min-h-screen bg-sentinel-950 flex items-center justify-center p-6 text-center">
    <div>
      <ShieldAlert className="w-12 h-12 text-blue-400 mx-auto mb-4" />
      <p className="text-sm font-mono text-blue-400">ERROR 404</p>
      <h1 className="text-3xl font-extrabold text-slate-100 mt-2">Page not found</h1>
      <p className="text-sm text-slate-400 mt-2 mb-6">The requested SentinelAI workspace route does not exist.</p>
      <Link to="/"><Button>Return to dashboard</Button></Link>
    </div>
  </main>
);
