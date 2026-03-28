import Link from "next/link";
import { Task } from "@/lib/types";

interface TasksCardProps {
  projectId: string;
  tasks: Task[];
}

const HOURS = [
  "8:00", "9:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
];

export function TasksCard({ projectId, tasks }: TasksCardProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-base">Tasks</h3>
        <Link
          href={`/projects/${projectId}/tasks`}
          className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          Open
        </Link>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <button className="text-[var(--muted)] hover:text-[var(--foreground)] text-sm">&lt;</button>
        <span className="text-sm font-medium">Today</span>
      </div>

      {/* Day schedule */}
      <div className="relative">
        {HOURS.map((hour) => {
          const hourNum = parseInt(hour);
          const task = tasks.find((t) => {
            const start = parseInt(t.scheduledStart || "");
            const end = parseInt(t.scheduledEnd || "");
            return hourNum >= start && hourNum < end;
          });
          const isTaskStart =
            task && parseInt(task.scheduledStart || "") === hourNum;

          return (
            <div
              key={hour}
              className="flex items-stretch min-h-[32px] border-t border-gray-100"
            >
              <span className="text-[10px] text-[var(--muted)] w-10 shrink-0 pt-1 tabular-nums">
                {hour}
              </span>
              <div className="flex-1 relative">
                {isTaskStart && task && (
                  <div
                    className="absolute inset-x-0 rounded-md px-2 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: task.color || "#e5e5e5",
                      height: `${
                        (parseInt(task.scheduledEnd || "0") -
                          parseInt(task.scheduledStart || "0")) *
                        32
                      }px`,
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
      </div>
    </div>
  );
}
