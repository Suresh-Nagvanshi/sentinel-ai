import React from 'react';

export const Toast = ({ message, type = 'info', onClose }) => {
  const tone = type === 'error' ? 'border-rose-500/40 text-rose-300' : type === 'success' ? 'border-emerald-500/40 text-emerald-300' : 'border-slate-700 text-slate-100';
  return (
    <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-sentinel-800 border rounded-xl shadow-2xl animate-slideUp ${tone}`}>
      <span className="text-sm font-medium">{message}</span>
      {onClose && (
        <button onClick={onClose} className="text-slate-400 hover:text-slate-200 text-xs">
          ✕
        </button>
      )}
    </div>
  );
};
