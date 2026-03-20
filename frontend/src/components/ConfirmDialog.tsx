"use client";

import { AlertTriangle } from "lucide-react";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export default function ConfirmDialog({ onConfirm, onCancel, isDeleting }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-sm bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 overflow-hidden">
        {/* Inner glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-red-900/30 border border-red-800/50 flex items-center justify-center shadow-inner">
            <AlertTriangle className="w-7 h-7 text-red-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100">Delete Task</h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
          </div>
          <div className="flex gap-3 w-full pt-2">
            <button
              id="cancel-delete"
              onClick={onCancel}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              id="confirm-delete"
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 shadow-lg shadow-red-500/20 disabled:opacity-60 text-white text-sm font-medium transition flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
