"use client";

import { useState } from "react";
import { CheckSquare, ChevronLeft, Circle, CircleDot, CircleCheck } from "lucide-react";
import { Task } from "@/lib/types";
import { ModuleCardWrapper } from "./module-card-wrapper";

interface TasksCardProps {
  projectId: string;
  tasks: Task[];
}

const HOURS = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

type TaskStatus = "todo" | "in_progress" | "done";

const statusCycle: Record<TaskStatus, TaskStatus> = {
  todo: "in_progress",
  in_progress: "done",
  done: "todo",
};

const statusIcons: Record<TaskStatus, React.ReactNode> = {
  todo: <Circle size={16} className="text-[var(--muted-light)]" />,
  in_progress: <CircleDot size={16} className="text-[var(--accent)]" />,
  done: <CircleCheck size={16} className="text-[var(--success)]" />,
};

export function TasksCard({ projectId, tasks: initialTasks }: TasksCardProps) {
  const [tasks, setTasks] = useState(initialTasks);

  function toggleTask(taskId: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: statusCycle[t.status] } : t
      )
    );
  }

  const scheduledTasks = tasks.filter((t) => t.scheduledStart && t.scheduledEnd);
  const unscheduledTasks = tasks.filter((t) => !t.scheduledStart || !t.scheduledEnd);

  return (
    <ModuleCardWrapper
      title="Tasks"
      href={`/projects/${projectId}/tasks`}
      icon={<CheckSquare size={16} />}
    >
      <div className="flex items-center gap-2 mb-3">
        <button className="p-1 rounded-lg hover:bg-[var(--background)] transition-colors" aria-label="Previous day">
          <ChevronLeft size={14} className="text-[var(--muted)]" />
        </button>
        <span className="text-sm font-medium">Today</span>
        <span className="text-[11px] text-[var(--muted)] ml-auto">
          {tasks.filter((t) => t.status === "done").length}/{tasks.length} done
        </span>
      </div>

      {/* Scheduled timeline */}
      <div className="relative mb-4">
        {HOURS.map((hour) => {
          const hourNum = parseInt(hour);
          const task = scheduledTasks.find((t) => {
            const start = parseInt(t.scheduledStart || "0");
            const end = parseInt(t.scheduledEnd || "0");
            return hourNum >= start && hourNum < end;
          });
          const isTaskStart = task && parseInt(task.scheduledStart || "0") === hourNum;

          return (
            <div key={hour} className="flex items-stretch min-h-[28px] border-t border-[var(--border-light)]">
              <span className="text-[10px] text-[var(--muted-light)] w-10 shrink-0 pt-0.5 tabular-nums">
                {hour}
              </span>
              <div className="flex-1 relative">
                {isTaskStart && task && (
                  <div
                    className={`absolute inset-x-0 rounded-lg px-2.5 py-1.5 text-xs font-medium border border-black/5 dark:border-white/5 cursor-pointer transition-opacity ${
                      task.status === "done" ? "opacity-50 line-through" : ""
                    }`}
                    style={{
                      backgroundColor: task.color || "#e5e5e5",
                      height: `${(parseInt(task.scheduledEnd || "0") - parseInt(task.scheduledStart || "0")) * 28}px`,
                      zIndex: 1,
                    }}
                    onClick={() => toggleTask(task.id)}
                  >
                    <span className="text-gray-800 dark:text-gray-900">{task.title}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {scheduledTasks.length === 0 && tasks.length === 0 && (
          <div className="text-center py-6">
            <CheckSquare size={24} className="mx-auto text-[var(--muted-light)] mb-2" />
            <p className="text-sm text-[var(--muted)]">No tasks yet</p>
            <p className="text-xs text-[var(--muted-light)]">Create a task to get started</p>
          </div>
        )}
      </div>

      {/* Unscheduled tasks */}
      {unscheduledTasks.length > 0 && (
        <div className="border-t border-[var(--border)] pt-3">
          <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest mb-2">
            Backlog
          </p>
          <div className="space-y-1">
            {unscheduledTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-[var(--background)] transition-colors cursor-pointer"
                onClick={() => toggleTask(task.id)}
              >
                {statusIcons[task.status]}
                <span className={`text-sm flex-1 ${task.status === "done" ? "line-through text-[var(--muted)]" : ""}`}>
                  {task.title}
                </span>
                {task.dueDate && (
                  <span className="text-[10px] text-[var(--muted)] tabular-nums">
                    {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                )}
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  task.priority === "high"
                    ? "bg-[var(--danger)]"
                    : task.priority === "medium"
                    ? "bg-[var(--warning)]"
                    : "bg-[var(--muted-light)]"
                }`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </ModuleCardWrapper>
  );
}
