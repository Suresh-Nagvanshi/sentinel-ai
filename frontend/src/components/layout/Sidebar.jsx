import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldAlert,
  LayoutDashboard,
  Radio,
  AlertOctagon,
  FileText,
  BarChart3,
  Sliders,
  Users,
  Settings,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../constants/roles';

export const Sidebar = () => {
  const { user } = useAuth();
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: [ROLES.ADMIN, ROLES.SECURITY_OFFICER, ROLES.EMPLOYEE] },
    { name: 'Live Monitoring', path: '/monitoring', icon: Radio, roles: [ROLES.ADMIN, ROLES.SECURITY_OFFICER] },
    { name: 'Incidents', path: '/incidents', icon: AlertOctagon, roles: [ROLES.ADMIN, ROLES.SECURITY_OFFICER] },
    { name: 'Analytics', path: '/analytics', icon: BarChart3, roles: [ROLES.ADMIN, ROLES.SECURITY_OFFICER] },
    { name: 'Reports', path: '/reports', icon: FileText, roles: [ROLES.ADMIN, ROLES.SECURITY_OFFICER] },
    { name: 'Policies', path: '/policies', icon: Sliders, roles: [ROLES.ADMIN] },
    { name: 'Users', path: '/users', icon: Users, roles: [ROLES.ADMIN] },
    { name: 'Settings', path: '/settings', icon: Settings, roles: [ROLES.ADMIN] },
  ].filter((item) => item.roles.includes(user?.role));

  return (
    <aside className="w-64 glass-panel border-r border-slate-800/80 flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800/80">
        <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30">
          <ShieldAlert className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-100 tracking-wider">SentinelAI</h1>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-400">Enterprise DLP</span>
        </div>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-blue-400 border border-blue-500/30 shadow-md shadow-blue-500/5'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-sentinel-800/60'
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* System Status Box */}
      <div className="p-4 m-4 rounded-xl glass-card border border-emerald-500/20">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-semibold text-emerald-400">AI Guard Active</span>
        </div>
        <p className="text-[11px] text-slate-400">YOLOv8 & OpenCV hooked on 1420 endpoints.</p>
      </div>
    </aside>
  );
};
