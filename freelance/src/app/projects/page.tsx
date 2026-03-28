import { dummyProjects, dummyTasks, dummyTimeEntries, dummyPayments } from "@/lib/dummy-data";
import { ProjectCard } from "@/components/projects/project-card";
import { Plus, FolderOpen, Trash2, Clock, DollarSign, Briefcase } from "lucide-react";

export default function ProjectsPage() {
  const activeCount = dummyProjects.filter((p) => p.status === "active").length;
  const totalHours = Math.round(dummyTimeEntries.reduce((s, e) => s + (e.durationMinutes || 0), 0) / 60);
  const totalEarned = dummyPayments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);

  return (
    <div className="max-w-6xl">
      {/* Quick actions */}
      <div className="flex gap-3 mb-8">
        <QuickAction icon={<Plus size={18} />} label="Add project" accent />
        <QuickAction icon={<FolderOpen size={18} />} label="All files" />
        <QuickAction icon={<Trash2 size={18} />} label="Deleted" />
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <SummaryCard icon={<Briefcase size={18} />} value={`${activeCount}`} label="Active projects" color="text-[var(--accent)]" bg="bg-[var(--accent-bg)]" />
        <SummaryCard icon={<Clock size={18} />} value={`${totalHours}h`} label="Total tracked" color="text-blue-600" bg="bg-blue-50" />
        <SummaryCard icon={<DollarSign size={18} />} value={`$${totalEarned.toLocaleString()}`} label="Total earned" color="text-emerald-600" bg="bg-emerald-50" />
      </div>

      {/* Heading */}
      <h1 className="text-[28px] font-bold mb-6 tracking-tight">My projects</h1>

      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {dummyProjects.map((project) => {
          const projectTasks = dummyTasks.filter((t) => t.projectId === project.id);
          const tasksDone = projectTasks.filter((t) => t.status === "done").length;
          const projectMinutes = dummyTimeEntries
            .filter((e) => e.projectId === project.id)
            .reduce((s, e) => s + (e.durationMinutes || 0), 0);
          return (
            <ProjectCard
              key={project.id}
              project={project}
              tasksDone={tasksDone}
              tasksTotal={projectTasks.length}
              totalHours={Math.round((projectMinutes / 60) * 10) / 10}
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
        ? "bg-[var(--foreground)] text-white hover:opacity-90 shadow-sm"
        : "border border-[var(--border)] bg-white hover:shadow-sm hover:border-[var(--accent-bg)]"
    }`}>
      <span className={accent ? "text-white" : "text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors"}>
        {icon}
      </span>
      {label}
    </button>
  );
}

function SummaryCard({ icon, value, label, color, bg }: { icon: React.ReactNode; value: string; label: string; color: string; bg: string }) {
  return (
    <div className={`card p-4 flex items-center gap-3`}>
      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-lg font-bold tabular-nums leading-tight">{value}</p>
        <p className="text-[11px] text-[var(--muted)]">{label}</p>
      </div>
    </div>
  );
}
