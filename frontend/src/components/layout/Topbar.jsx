import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Bell, Search, LogOut, UserCircle } from 'lucide-react';

export const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 glass-panel border-b border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Search Input */}
      <div className="relative w-72">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search endpoints, users, or threats..."
          className="w-full bg-sentinel-900 border border-slate-700/60 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
        />
      </div>

      {/* Action Icons & Profile */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-sentinel-800 transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
        </button>

        <div className="h-6 w-[1px] bg-slate-800" />

        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <UserCircle className="w-6 h-6" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-semibold text-slate-200">{user?.username || 'Security Admin'}</p>
            <p className="text-[10px] text-slate-400">{user?.email || 'admin@sentinel.ai'}</p>
          </div>

          <button
            onClick={logout}
            title="Logout"
            className="p-2 ml-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
