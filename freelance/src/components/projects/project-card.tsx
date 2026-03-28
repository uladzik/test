import Link from "next/link";
import { Project } from "@/lib/types";
import { ArrowUpRight, Calendar, CreditCard } from "lucide-react";

const billingLabels: Record<string, string> = {
  monthly: "Monthly payment",
  fixed: "Fixed price",
  hourly: "Hourly rate",
};

const statusDot: Record<string, string> = {
  active: "bg-[var(--success)]",
  paused: "bg-[var(--warning)]",
  completed: "bg-[var(--info)]",
  archived: "bg-gray-400",
};

export function ProjectCard({ project }: { project: Project }) {
  const dateRange = formatDateRange(project.startDate, project.endDate);

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block card overflow-hidden animate-fade-in"
    >
      {/* Cover */}
      <div className="h-36 relative bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" viewBox="0 0 400 200">
            <circle cx="300" cy="80" r="120" fill="white" opacity="0.3" />
            <circle cx="350" cy="150" r="80" fill="white" opacity="0.2" />
          </svg>
        </div>
        {/* Arrow */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:scale-110">
          <ArrowUpRight size={14} className="text-white" />
        </div>
      </div>

      {/* Info */}
      <div className="p-4 pb-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-[15px]">{project.name}</h3>
          <span className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${statusDot[project.status]} ${project.status === "active" ? "animate-pulse-dot" : ""}`} />
        </div>
        {project.clientName && (
          <p className="text-sm text-[var(--muted)] mb-3">{project.clientName}</p>
        )}
        <div className="flex flex-col gap-1.5">
          {dateRange && (
            <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
              <Calendar size={12} />
              {dateRange}
            </div>
          )}
          <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
            <CreditCard size={12} />
            {billingLabels[project.billingType] || project.billingType}
          </div>
        </div>
      </div>
    </Link>
  );
}

function formatDateRange(start?: string, end?: string): string | null {
  if (!start) return null;
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  if (end) return `${fmt(start)} – ${fmt(end)}`;
  return `From ${fmt(start)}`;
}
