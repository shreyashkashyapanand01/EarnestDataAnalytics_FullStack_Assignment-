"use client";

import type { Task } from "@/types";
import { Pencil, Trash2, RotateCcw } from "lucide-react";
import { clsx } from "clsx";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete, onToggle }: Props) {
  const isCompleted = task.status === "completed";
  const formattedDate = new Date(task.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={clsx(
        "group bg-slate-900/50 backdrop-blur-md border rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10",
        isCompleted ? "border-slate-800/50 opacity-70" : "border-slate-700/80 hover:border-indigo-500/50"
      )}
    >
      {/* Top row: title + badge */}
      <div className="flex items-start justify-between gap-4">
        <h3
          className={clsx(
            "font-semibold text-lg leading-tight flex-1 break-words min-w-0 transition-colors",
            isCompleted
              ? "line-through text-slate-500"
              : "text-slate-50 group-hover:text-indigo-50"
          )}
        >
          {task.title}
        </h3>
        <span
          className={clsx(
            "shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-inner",
            isCompleted
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
          )}
        >
          {isCompleted ? "Completed" : "Pending"}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 font-normal break-words min-w-0">
          {task.description}
        </p>
      )}

      {/* Footer: date + actions */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-700/50 mt-auto">
        <span className="text-xs font-medium text-slate-500">{formattedDate}</span>

        <div className="flex items-center gap-1.5">
          {/* Toggle */}
          <button
            id={`toggle-${task.id}`}
            title={isCompleted ? "Mark as pending" : "Mark as completed"}
            onClick={() => onToggle(task.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-700 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          {/* Edit */}
          <button
            id={`edit-${task.id}`}
            title="Edit task"
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition"
          >
            <Pencil className="w-4 h-4" />
          </button>
          {/* Delete */}
          <button
            id={`delete-${task.id}`}
            title="Delete task"
            onClick={() => onDelete(task.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-700 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
