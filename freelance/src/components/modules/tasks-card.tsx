import { CheckSquare, ChevronLeft } from "lucide-react";
import { Task } from "@/lib/types";
import { ModuleCardWrapper } from "./module-card-wrapper";

interface TasksCardProps {
  projectId: string;
  tasks: Task[];
}

const HOURS = ["8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];

export function TasksCard({ projectId, tasks }: TasksCardProps) {
  return (
    <ModuleCardWrapper
      title="Tasks"
      href={`/projects/${projectId}/tasks`}
      icon={<CheckSquare size={16} />}
    >
      <div className="flex items-center gap-2 mb-3">
        <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Previous day">
          <ChevronLeft size={14} className="text-[var(--muted)]" />
        </button>
        <span className="text-sm font-medium">Today</span>
      </div>

      <div className="relative">
        {HOURS.map((hour) => {
          const hourNum = parseInt(hour);
          const task = tasks.find((t) => {
            const start = parseInt(t.scheduledStart || "0");
            const end = parseInt(t.scheduledEnd || "0");
            return hourNum >= start && hourNum < end;
          });
          const isTaskStart = task && parseInt(task.scheduledStart || "0") === hourNum;

          return (
            <div key={hour} className="flex items-stretch min-h-[28px] border-t border-gray-50">
              <span className="text-[10px] text-[var(--muted-light)] w-10 shrink-0 pt-0.5 tabular-nums">
                {hour}
              </span>
              <div className="flex-1 relative">
                {isTaskStart && task && (
                  <div
                    className="absolute inset-x-0 rounded-lg px-2.5 py-1.5 text-xs font-medium border border-black/5"
                    style={{
                      backgroundColor: task.color || "#e5e5e5",
                      height: `${(parseInt(task.scheduledEnd || "0") - parseInt(task.scheduledStart || "0")) * 28}px`,
                      zIndex: 1,
                    }}
                  >
                    {task.title}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {tasks.length === 0 && (
          <p className="text-sm text-[var(--muted)] text-center py-6">No tasks scheduled</p>
        )}
      </div>
    </ModuleCardWrapper>
  );
}
