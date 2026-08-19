import React from 'react';

export const Toast = ({ message, type = 'info', onClose }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-sentinel-800 border border-slate-700 text-slate-100 rounded-xl shadow-2xl animate-slideUp">
      <span className="text-sm font-medium">{message}</span>
      {onClose && (
        <button onClick={onClose} className="text-slate-400 hover:text-slate-200 text-xs">
          ✕
        </button>
      )}
    </div>
  );
};
