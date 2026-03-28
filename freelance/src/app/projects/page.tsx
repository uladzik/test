import { dummyProjects } from "@/lib/dummy-data";
import { ProjectCard } from "@/components/projects/project-card";

export default function ProjectsPage() {
  return (
    <div>
      {/* Quick actions */}
      <div className="flex gap-3 mb-8">
        <QuickAction icon="+" label="Add project" />
        <QuickAction icon="folder" label="All files" />
        <QuickAction icon="trash" label="Deleted Files" />
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6">My projects</h1>

      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {dummyProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

function QuickAction({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--border)] bg-white text-sm hover:bg-gray-50 transition-colors">
      <span className="text-[var(--muted)]">
        {icon === "+" && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M8 3v10M3 8h10" />
          </svg>
        )}
        {icon === "folder" && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 4.5C2 3.67 2.67 3 3.5 3H6l1.5 1.5H12.5C13.33 4.5 14 5.17 14 6V11.5C14 12.33 13.33 13 12.5 13H3.5C2.67 13 2 12.33 2 11.5V4.5Z" />
          </svg>
        )}
        {icon === "trash" && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 4h10M6 4V3a1 1 0 011-1h2a1 1 0 011 1v1M5 4v8a1 1 0 001 1h4a1 1 0 001-1V4" />
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}
