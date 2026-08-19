import React from 'react';

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-800/80 px-6 py-4 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
      <p>© 2026 SentinelAI Platform. All rights reserved. Enterprise Security & DLP Suite.</p>
      <div className="flex gap-4">
        <a href="#privacy" className="hover:text-slate-300 transition">Privacy Policy</a>
        <a href="#docs" className="hover:text-slate-300 transition">API Documentation</a>
        <a href="#support" className="hover:text-slate-300 transition">SOC Support</a>
      </div>
    </footer>
  );
};
