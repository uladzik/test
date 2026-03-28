"use client";

import { useState } from "react";
import Link from "next/link";
import { Project } from "@/lib/types";
import { ArrowUpRight, Calendar, CreditCard, Clock, MoreHorizontal, Video } from "lucide-react";

const billingLabels: Record<string, string> = {
  monthly: "Monthly",
  fixed: "Fixed price",
  hourly: "Hourly",
};

const statusConfig: Record<string, { dot: string; label: string; bg: string; text: string }> = {
  active: { dot: "bg-emerald-500 animate-pulse-dot", label: "Active", bg: "bg-emerald-50 dark:bg-emerald-950", text: "text-emerald-700 dark:text-emerald-400" },
  paused: { dot: "bg-amber-500", label: "Paused", bg: "bg-amber-50 dark:bg-amber-950", text: "text-amber-700 dark:text-amber-400" },
  completed: { dot: "bg-blue-500", label: "Done", bg: "bg-blue-50 dark:bg-blue-950", text: "text-blue-700 dark:text-blue-400" },
  archived: { dot: "bg-gray-400", label: "Archived", bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-500 dark:text-gray-400" },
};

interface ProjectCardProps {
  project: Project;
  tasksDone?: number;
  tasksTotal?: number;
  totalHours?: number;
  lastActivity?: string;
  nextMeeting?: string;
}

export function ProjectCard({
  project,
  tasksDone = 0,
  tasksTotal = 0,
  totalHours = 0,
  lastActivity,
  nextMeeting,
}: ProjectCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const dateRange = formatDateRange(project.startDate, project.endDate);
  const status = statusConfig[project.status] || statusConfig.active;
  const progress = tasksTotal > 0 ? Math.round((tasksDone / tasksTotal) * 100) : 0;

  return (
    <div className="group relative">
      <Link
        href={`/projects/${project.id}`}
        className="block card overflow-hidden"
      >
        {/* Cover */}
        <div className={`h-32 relative bg-gradient-to-br ${project.coverGradient || "from-violet-500 to-purple-500"} overflow-hidden`}>
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-[0.15]">
            <svg width="100%" height="100%" viewBox="0 0 400 160" preserveAspectRatio="none">
              <circle cx="320" cy="60" r="100" fill="white" />
              <circle cx="380" cy="130" r="60" fill="white" />
              <circle cx="60" cy="140" r="40" fill="white" />
            </svg>
          </div>
          {/* Status badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold backdrop-blur-md bg-white/20 text-white">
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </div>
          {/* Arrow */}
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-110">
            <ArrowUpRight size={13} className="text-white" />
          </div>
        </div>

        {/* Info */}
        <div className="p-4 pb-5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-[15px] mb-0.5 group-hover:text-[var(--accent)] transition-colors truncate">
                {project.name}
              </h3>
              {project.clientName && (
                <p className="text-[13px] text-[var(--muted)] mb-2">{project.clientName}</p>
              )}
            </div>
          </div>

          {/* Last activity */}
          {lastActivity && (
            <p className="text-[11px] text-[var(--muted-light)] mb-2">
              Last activity: {lastActivity}
            </p>
          )}

          {/* Next meeting preview */}
          {nextMeeting && (
            <div className="flex items-center gap-1.5 text-[11px] text-[var(--accent)] bg-[var(--accent-bg)] px-2.5 py-1.5 rounded-lg mb-3 font-medium">
              <Video size={11} />
              {nextMeeting}
            </div>
          )}

          {/* Meta row */}
          <div className="flex items-center gap-3 mb-3">
            {dateRange && (
              <span className="flex items-center gap-1 text-[11px] text-[var(--muted)]">
                <Calendar size={11} />
                {dateRange}
              </span>
            )}
            <span className="flex items-center gap-1 text-[11px] text-[var(--muted)]">
              <CreditCard size={11} />
              {billingLabels[project.billingType]}
            </span>
            {totalHours > 0 && (
              <span className="flex items-center gap-1 text-[11px] text-[var(--muted)]">
                <Clock size={11} />
                {totalHours}h
              </span>
            )}
          </div>

          {/* Progress bar + stats */}
          {tasksTotal > 0 && (
            <div>
              <div className="flex justify-between text-[10px] text-[var(--muted)] mb-1">
                <span>{tasksDone}/{tasksTotal} tasks</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 bg-[var(--background)] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${project.coverGradient || "from-violet-500 to-purple-500"} transition-all duration-500`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Quick action dots on hover */}
      <div className="absolute top-[140px] right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="w-7 h-7 rounded-lg bg-[var(--card)] border border-[var(--border)] flex items-center justify-center hover:bg-[var(--background)] transition-colors shadow-sm"
          aria-label="Project actions"
        >
          <MoreHorizontal size={14} className="text-[var(--muted)]" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-8 w-36 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg py-1 z-20">
            <button className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--background)] transition-colors">
              Edit
            </button>
            <button className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--background)] transition-colors">
              Duplicate
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-[var(--danger)] hover:bg-[var(--danger-bg)] transition-colors">
              Archive
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function formatDateRange(start?: string, end?: string): string | null {
  if (!start) return null;
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", year: "2-digit" });
  if (end) return `${fmt(start)} -- ${fmt(end)}`;
  return `From ${fmt(start)}`;
}
