import { Milestone as MilestoneIcon, Check } from "lucide-react";
import { Milestone } from "@/lib/types";
import { ModuleCardWrapper } from "./module-card-wrapper";

interface TimelineCardProps {
  projectId: string;
  milestones: Milestone[];
  startDate?: string;
  endDate?: string;
}

const statusConfig: Record<string, { ring: string; bg: string }> = {
  completed: { ring: "ring-emerald-200 dark:ring-emerald-800", bg: "bg-emerald-500" },
  in_progress: { ring: "ring-blue-200 dark:ring-blue-800", bg: "bg-blue-500" },
  pending: { ring: "ring-gray-200 dark:ring-gray-700", bg: "bg-gray-300 dark:bg-gray-600" },
};

export function TimelineCard({ projectId, milestones, startDate, endDate }: TimelineCardProps) {
  const dateRange = formatDateRange(startDate, endDate);
  const progress = getProgress(milestones);

  return (
    <ModuleCardWrapper
      title="Project Timeline"
      href={`/projects/${projectId}/timeline`}
      subtitle={dateRange || undefined}
      icon={<MilestoneIcon size={16} />}
    >
      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-[var(--muted)] font-medium">Progress</span>
          <span className="font-semibold">{Math.round(progress)}%</span>
        </div>
        <div className="h-2.5 bg-[var(--background)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
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
              <div className="flex flex-col items-center">
                <div className={`w-5 h-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center ring-2 ${config.ring} ${config.bg}`}>
                  {ms.status === "completed" && <Check size={10} className="text-white" strokeWidth={3} />}
                  {ms.status === "in_progress" && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-dot" />}
                </div>
                {!isLast && <div className="w-px flex-1 bg-[var(--border)] my-1" />}
              </div>
              <div className="pb-4 min-w-0">
                <p className={`text-sm ${
                  ms.status === "completed"
                    ? "text-[var(--muted)] line-through"
                    : ms.status === "in_progress"
                    ? "font-semibold text-[var(--accent)]"
                    : "font-medium"
                }`}>
                  {ms.title}
                </p>
                {ms.dueDate && (
                  <p className="text-[11px] text-[var(--muted)] mt-0.5">
                    {new Date(ms.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                )}
              </div>
            </div>
          );
        })}
        {milestones.length === 0 && (
          <div className="text-center py-6">
            <MilestoneIcon size={24} className="mx-auto text-[var(--muted-light)] mb-2" />
            <p className="text-sm text-[var(--muted)]">No milestones yet</p>
            <p className="text-xs text-[var(--muted-light)]">Define project milestones</p>
          </div>
        )}
      </div>
    </ModuleCardWrapper>
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
  if (end) return `${fmt(start)} -- ${fmt(end)}`;
  return `From ${fmt(start)}`;
}
