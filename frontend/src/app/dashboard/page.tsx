"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import TaskToolbar from "@/components/TaskToolbar";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import ConfirmDialog from "@/components/ConfirmDialog";
import Pagination from "@/components/Pagination";
import type { Task } from "@/types";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from "@/lib/tasks";
import toast from "react-hot-toast";
import { ClipboardList } from "lucide-react";

const LIMIT = 6;

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // State
  const [tasks, setTasks] = useState<Task[]>([]);
  const [fetching, setFetching] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  // Modal state
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Debounce search
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, [search]);

  // Auth guard
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    setFetching(true);
    try {
      const res = await getTasks({
        page,
        limit: LIMIT,
        status: statusFilter || undefined,
        search: debouncedSearch || undefined,
      });
      if (res.success && res.data) {
        setTasks(res.data);
      }
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setFetching(false);
    }
  }, [page, statusFilter, debouncedSearch]);

  useEffect(() => {
    if (user) fetchTasks();
  }, [user, fetchTasks]);

  // Reset to page 1 on filter/search change
  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  // Handlers
  const handleAddTask = async (formData: { title: string; description?: string }) => {
    try {
      await createTask(formData);
      toast.success("Task created!");
      setShowForm(false);
      fetchTasks();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create task";
      toast.error(msg);
    }
  };

  const handleEditTask = async (formData: {
    title?: string;
    description?: string;
    status?: "pending" | "completed";
  }) => {
    if (!editingTask) return;
    try {
      await updateTask(editingTask.id, formData);
      toast.success("Task updated!");
      setEditingTask(null);
      setShowForm(false);
      fetchTasks();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update task";
      toast.error(msg);
    }
  };

  const handleDeleteTask = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await deleteTask(deleteId);
      toast.success("Task deleted!");
      setDeleteId(null);
      // Go to page 1 if last item on page was deleted
      if (tasks.length === 1 && page > 1) setPage((p) => p - 1);
      else fetchTasks();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete task";
      toast.error(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleTask = async (id: string) => {
    try {
      await toggleTask(id);
      toast.success("Task status updated!");
      fetchTasks();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to toggle task";
      toast.error(msg);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const totalPages = tasks.length === LIMIT ? page + 1 : page;
  const isSearchOrFilter = search || statusFilter;

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">My Tasks</h1>
            {tasks.length > 0 && (
              <p className="text-sm text-slate-400 mt-0.5">
                Showing {tasks.length} task{tasks.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>

        {/* Toolbar */}
        <TaskToolbar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={(v) => {
            setStatusFilter(v);
            setPage(1);
          }}
          onAddTask={() => {
            setEditingTask(null);
            setShowForm(true);
          }}
        />

        {/* Task grid */}
        {fetching ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
              <ClipboardList className="w-8 h-8 text-slate-500" />
            </div>
            <p className="text-slate-400 font-medium">No tasks found</p>
            <p className="text-slate-500 text-sm mt-1">
              {search || statusFilter
                ? "Try adjusting your search or filter"
                : 'Click "Add Task" to get started'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={(t) => {
                  setEditingTask(t);
                  setShowForm(true);
                }}
                onDelete={(id) => setDeleteId(id)}
                onToggle={handleToggleTask}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </main>

      {/* Task form modal */}
      {showForm && (
        <TaskForm
          task={editingTask}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
          onSubmit={editingTask ? handleEditTask : handleAddTask}
        />
      )}

      {/* Delete confirm dialog */}
      {deleteId && (
        <ConfirmDialog
          onConfirm={handleDeleteTask}
          onCancel={() => setDeleteId(null)}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
}
