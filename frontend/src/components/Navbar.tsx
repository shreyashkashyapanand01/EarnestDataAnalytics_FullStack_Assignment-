"use client";

import { useAuth } from "@/context/AuthContext";
import { LogOut, CheckSquare } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-indigo-500/10 bg-slate-950/60 backdrop-blur-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <CheckSquare className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-slate-100">TaskFlow</span>
        </div>

        {/* User info + logout */}
        <div className="flex items-center gap-3">
          {user?.email && (
            <span className="hidden sm:block text-sm text-slate-400 truncate max-w-[200px]">
              {user.email}
            </span>
          )}
          <button
            id="logout-button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-red-400 transition px-3 py-1.5 rounded-lg hover:bg-slate-800"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
