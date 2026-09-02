import React, { useState } from 'react';
import { Bell, Search, UserCircle, X } from 'lucide-react';

const MOCK_NOTIFICATIONS = [
  { id: 1, text: 'OBS process detected on WS-904', time: 'Just now',   dot: 'bg-rose-500' },
  { id: 2, text: 'Phone camera flagged — sarah.connor', time: '15 min', dot: 'bg-amber-500' },
  { id: 3, text: 'Risk score elevated: alex.ross', time: '1 hr',      dot: 'bg-yellow-400' },
];

export const Topbar = () => {
  const [showNotif, setShowNotif] = useState(false);
  const [dismissed, setDismissed] = useState([]);

  const visible = MOCK_NOTIFICATIONS.filter((n) => !dismissed.includes(n.id));

  return (
    <header className="h-16 glass-panel border-b border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Search */}
      <div className="relative w-72">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search endpoints, incidents, or threats…"
          className="w-full bg-slate-900 border border-slate-700/60 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 relative">
        {/* Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotif((s) => !s)}
            className="relative p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <Bell className="w-5 h-5" />
            {visible.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            )}
          </button>

          {showNotif && (
            <div className="absolute right-0 top-11 w-80 glass-card border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-200">Notifications</span>
                <button onClick={() => setShowNotif(false)} className="text-slate-500 hover:text-slate-200">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {visible.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6">All clear — no new alerts.</p>
              ) : (
                <ul className="divide-y divide-slate-800">
                  {visible.map((n) => (
                    <li key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-800/40 transition group">
                      <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.dot}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-200 leading-snug">{n.text}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{n.time} ago</p>
                      </div>
                      <button
                        onClick={() => setDismissed((d) => [...d, n.id])}
                        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="h-6 w-[1px] bg-slate-800" />

        {/* User badge */}
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <UserCircle className="w-6 h-6" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-semibold text-slate-200">Security Admin</p>
            <p className="text-[10px] text-slate-400">admin@sentinel.ai</p>
          </div>
        </div>
      </div>
    </header>
  );
};
