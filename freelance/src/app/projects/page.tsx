import { dummyProjects, dummyTasks, dummyTimeEntries, dummyPayments, dummyMeetings } from "@/lib/dummy-data";
import { ProjectCard } from "@/components/projects/project-card";
import { Plus, FolderOpen, Trash2, Clock, DollarSign, Briefcase } from "lucide-react";
import { Project } from "@/lib/types";

export default function ProjectsPage() {
  const activeProjects = dummyProjects.filter((p) => p.status === "active");
  const pausedProjects = dummyProjects.filter((p) => p.status === "paused");
  const completedProjects = dummyProjects.filter((p) => p.status === "completed");

  const activeCount = activeProjects.length;
  const totalHours = Math.round(dummyTimeEntries.reduce((s, e) => s + (e.durationMinutes || 0), 0) / 60);
  const totalEarned = dummyPayments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);

  // Weekly hours for sparkline (last 7 "days" simulated)
  const weeklyHours = [3.5, 5.2, 4.8, 6.1, 7.3, 4.0, 5.5];
  const maxHour = Math.max(...weeklyHours);

  return (
    <div className="max-w-6xl">
      {/* Quick actions */}
      <div className="flex gap-3 mb-8">
        <QuickAction icon={<Plus size={18} />} label="Add project" accent />
        <QuickAction icon={<FolderOpen size={18} />} label="All files" />
        <QuickAction icon={<Trash2 size={18} />} label="Deleted" />
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <SummaryCard
          icon={<Briefcase size={18} />}
          value={`${activeCount}`}
          label="Active projects"
          color="text-[var(--accent)]"
          bg="bg-[var(--accent-bg)]"
        />
        <SummaryCard
          icon={<Clock size={18} />}
          value={`${totalHours}h`}
          label="Total tracked"
          color="text-blue-600 dark:text-blue-400"
          bg="bg-blue-50 dark:bg-blue-950"
          sparkline={weeklyHours}
          sparklineMax={maxHour}
        />
        <SummaryCard
          icon={<DollarSign size={18} />}
          value={`$${totalEarned.toLocaleString()}`}
          label="Total earned"
          color="text-emerald-600 dark:text-emerald-400"
          bg="bg-emerald-50 dark:bg-emerald-950"
        />
      </div>

      {/* Heading */}
      <h1 className="text-[28px] font-bold mb-6 tracking-tight">My projects</h1>

      {/* Active projects */}
      {activeProjects.length > 0 && (
        <ProjectSection title="Active" count={activeProjects.length} projects={activeProjects} />
      )}

      {/* Paused projects */}
      {pausedProjects.length > 0 && (
        <ProjectSection title="Paused" count={pausedProjects.length} projects={pausedProjects} />
      )}

      {/* Completed projects */}
      {completedProjects.length > 0 && (
        <ProjectSection title="Completed" count={completedProjects.length} projects={completedProjects} />
      )}
    </div>
  );
}

function ProjectSection({ title, count, projects }: { title: string; count: number; projects: Project[] }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-widest">{title}</h2>
        <span className="text-[11px] font-medium text-[var(--muted-light)] bg-[var(--background)] px-2 py-0.5 rounded-full">
          {count}
        </span>
        <div className="flex-1 h-px bg-[var(--border)]" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => {
          const projectTasks = dummyTasks.filter((t) => t.projectId === project.id);
          const tasksDone = projectTasks.filter((t) => t.status === "done").length;
          const projectMinutes = dummyTimeEntries
            .filter((e) => e.projectId === project.id)
            .reduce((s, e) => s + (e.durationMinutes || 0), 0);

          // Compute last activity (simulated)
          const lastActivities: Record<string, string> = {
            "1": "2h ago",
            "2": "4h ago",
            "3": "1d ago",
            "4": "2w ago",
            "5": "3mo ago",
          };

          // Next meeting
          const projectMeetings = dummyMeetings
            .filter((m) => m.projectId === project.id)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));
          const nextMeeting = projectMeetings.length > 0
            ? `${projectMeetings[0].title} -- ${new Date(projectMeetings[0].startTime).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`
            : undefined;

          return (
            <ProjectCard
              key={project.id}
              project={project}
              tasksDone={tasksDone}
              tasksTotal={projectTasks.length}
              totalHours={Math.round((projectMinutes / 60) * 10) / 10}
              lastActivity={lastActivities[project.id]}
              nextMeeting={nextMeeting}
            />
          );
        })}
      </div>
    </div>
  );
}

function QuickAction({ icon, label, accent }: { icon: React.ReactNode; label: string; accent?: boolean }) {
  return (
    <button className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-medium transition-all group ${
      accent
        ? "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 shadow-sm"
        : "border border-[var(--border)] bg-[var(--card)] hover:shadow-sm hover:border-[var(--accent-bg)]"
    }`}>
      <span className={accent ? "" : "text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors"}>
        {icon}
      </span>
      {label}
    </button>
  );
}

function SummaryCard({
  icon,
  value,
  label,
  color,
  bg,
  sparkline,
  sparklineMax,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
  bg: string;
  sparkline?: number[];
  sparklineMax?: number;
}) {
  return (
    <div className="card p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center ${color} shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-lg font-bold tabular-nums leading-tight">{value}</p>
        <p className="text-[11px] text-[var(--muted)]">{label}</p>
      </div>
      {sparkline && sparklineMax && (
        <div className="flex items-end gap-[3px] h-8 shrink-0">
          {sparkline.map((val, i) => (
            <div
              key={i}
              className={`w-[5px] rounded-full ${color.includes("blue") ? "bg-blue-400/60 dark:bg-blue-400/40" : "bg-[var(--accent)]/40"}`}
              style={{ height: `${(val / sparklineMax) * 100}%`, minHeight: 3 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
