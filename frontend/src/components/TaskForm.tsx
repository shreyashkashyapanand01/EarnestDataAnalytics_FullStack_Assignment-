"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Task } from "@/types";
import { X } from "lucide-react";

const createSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

const editSchema = createSchema.extend({
  status: z.enum(["pending", "completed"]).optional(),
});

type CreateData = z.infer<typeof createSchema>;
type EditData = z.infer<typeof editSchema>;

interface Props {
  task?: Task | null;
  onClose: () => void;
  onSubmit: (data: CreateData | EditData) => Promise<void>;
}

export default function TaskForm({ task, onClose, onSubmit }: Props) {
  const isEdit = !!task;
  const schema = isEdit ? editSchema : createSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      status: task?.status ?? "pending",
    },
  });

  useEffect(() => {
    reset({
      title: task?.title ?? "",
      description: task?.description ?? "",
      status: task?.status ?? "pending",
    });
  }, [task, reset]);

  return (
    /* Overlay */
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 overflow-hidden">
        {/* Inner glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-100">
              {isEdit ? "Edit Task" : "Add New Task"}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
            {/* Title */}
            <div>
              <label className="block font-medium text-slate-300 mb-1.5">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                id="task-title"
                type="text"
                placeholder="Enter task title"
                {...register("title")}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/50 border border-slate-700/50 text-slate-100 placeholder-slate-500 hover:border-indigo-500/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
              />
              {errors.title && (
                <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium text-slate-300 mb-1.5">
                Description{" "}
                <span className="text-slate-500 font-normal">(optional)</span>
              </label>
              <textarea
                id="task-description"
                rows={3}
                placeholder="Add a description..."
                {...register("description")}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/50 border border-slate-700/50 text-slate-100 placeholder-slate-500 hover:border-indigo-500/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none resize-none"
              />
            </div>

            {/* Status (edit only) */}
            {isEdit && (
              <div>
                <label className="block font-medium text-slate-300 mb-1.5">
                  Status
                </label>
                <select
                  id="task-status"
                  {...register("status")}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/50 border border-slate-700/50 text-slate-100 hover:border-indigo-500/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-[0.8] py-2.5 px-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white font-medium transition"
              >
                Cancel
              </button>
              <button
                id="task-form-submit"
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 disabled:opacity-60 text-white font-medium transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isEdit ? (
                  "Save Changes"
                ) : (
                  "Add Task"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
