import { dummyProjects } from "@/lib/dummy-data";
import { ProjectCard } from "@/components/projects/project-card";
import { Plus, FolderOpen, Trash2 } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl">
      {/* Quick actions */}
      <div className="flex gap-3 mb-10">
        <QuickAction icon={<Plus size={18} />} label="Add project" />
        <QuickAction icon={<FolderOpen size={18} />} label="All files" />
        <QuickAction icon={<Trash2 size={18} />} label="Deleted Files" />
      </div>

      {/* Heading */}
      <h1 className="text-[28px] font-bold mb-6 tracking-tight">My projects</h1>

      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {dummyProjects.map((project, i) => (
          <div key={project.id} style={{ animationDelay: `${i * 80}ms` }}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickAction({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-2.5 px-5 py-3.5 rounded-2xl border border-[var(--border)] bg-white text-sm hover:shadow-sm hover:border-[var(--accent-bg)] transition-all group">
      <span className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </button>
  );
}
