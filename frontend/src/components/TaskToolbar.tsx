"use client";

import { Search, Plus, SlidersHorizontal } from "lucide-react";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  statusFilter: string;
  onStatusChange: (v: string) => void;
  onAddTask: () => void;
}

export default function TaskToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onAddTask,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
      {/* Search */}
      <div className="relative flex-1 w-full sm:w-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          id="task-search"
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 text-slate-100 placeholder-slate-500 hover:border-indigo-500/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm outline-none shadow-sm"
        />
      </div>

      <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full sm:w-auto mt-1 sm:mt-0">
        {/* Status filter */}
        <div className="relative">
          <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="pl-9 pr-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition text-sm outline-none appearance-none cursor-pointer"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Add task */}
        <button
          id="add-task-button"
          onClick={onAddTask}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>
    </div>
  );
}
