import Link from "next/link";
import { Project } from "@/lib/types";

const billingLabels: Record<string, string> = {
  monthly: "Monthly payment",
  fixed: "Fixed price",
  hourly: "Hourly rate",
};

export function ProjectCard({ project }: { project: Project }) {
  const dateRange = formatDateRange(project.startDate, project.endDate);

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block rounded-2xl border border-[var(--border)] bg-white overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Cover */}
      <div
        className={`h-40 relative ${
          project.coverUrl ? "" : "bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)]"
        }`}
      >
        {/* Arrow icon top-right */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10L10 4M10 4H5M10 4V9" />
          </svg>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-base mb-1">{project.name}</h3>
        {project.clientName && (
          <p className="text-sm text-[var(--muted)] mb-1">{project.clientName}</p>
        )}
        {dateRange && (
          <p className="text-xs text-[var(--muted)] mb-1">{dateRange}</p>
        )}
        <p className="text-xs text-[var(--muted)]">
          {billingLabels[project.billingType] || project.billingType}
        </p>
      </div>
    </Link>
  );
}

function formatDateRange(start?: string, end?: string): string | null {
  if (!start) return null;
  const fmt = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  };
  if (end) return `${fmt(start)} – ${fmt(end)}`;
  return `From ${fmt(start)}`;
}
