import Link from "next/link";
import { Milestone } from "@/lib/types";

interface TimelineCardProps {
  projectId: string;
  milestones: Milestone[];
  startDate?: string;
  endDate?: string;
}

const statusConfig: Record<string, { color: string; icon: string }> = {
  completed: { color: "bg-emerald-500", icon: "check" },
  in_progress: { color: "bg-blue-500", icon: "dot" },
  pending: { color: "bg-gray-300", icon: "dot" },
};

export function TimelineCard({ projectId, milestones, startDate, endDate }: TimelineCardProps) {
  const dateRange = formatDateRange(startDate, endDate);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-base">Project Timeline</h3>
        <Link
          href={`/projects/${projectId}/timeline`}
          className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          Open
        </Link>
      </div>
      {dateRange && (
        <p className="text-xs text-[var(--muted)] mb-4">{dateRange}</p>
      )}

      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex justify-between text-[10px] text-[var(--muted)] mb-1">
          <span>Progress</span>
          <span>{Math.round(getProgress(milestones))}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--accent)] rounded-full transition-all"
            style={{ width: `${getProgress(milestones)}%` }}
          />
        </div>
      </div>

      {/* Milestones */}
      <div className="space-y-0">
        {milestones.map((ms, i) => {
          const config = statusConfig[ms.status];
          const isLast = i === milestones.length - 1;
          return (
            <div key={ms.id} className="flex gap-3">
              {/* Vertical line + dot */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full shrink-0 mt-1 flex items-center justify-center ${config.color}`}
                >
                  {ms.status === "completed" && (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1.5 4L3.5 6L6.5 2" />
                    </svg>
                  )}
                </div>
                {!isLast && <div className="w-px flex-1 bg-gray-200 my-1" />}
              </div>

              {/* Content */}
              <div className={`pb-4 ${isLast ? "" : ""}`}>
                <p className={`text-sm ${ms.status === "completed" ? "text-[var(--muted)] line-through" : "font-medium"}`}>
                  {ms.title}
                </p>
                {ms.dueDate && (
                  <p className="text-[10px] text-[var(--muted)] mt-0.5">
                    {new Date(ms.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getProgress(milestones: Milestone[]): number {
  if (milestones.length === 0) return 0;
  const completed = milestones.filter((m) => m.status === "completed").length;
  return (completed / milestones.length) * 100;
}

function formatDateRange(start?: string, end?: string): string | null {
  if (!start) return null;
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  if (end) return `${fmt(start)} – ${fmt(end)}`;
  return `From ${fmt(start)}`;
}
