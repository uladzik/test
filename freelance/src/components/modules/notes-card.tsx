import { StickyNote } from "lucide-react";
import { Note } from "@/lib/types";
import { ModuleCardWrapper } from "./module-card-wrapper";

interface NotesCardProps {
  projectId: string;
  notes: Note[];
}

const noteColors = ["bg-amber-50", "bg-blue-50", "bg-emerald-50", "bg-purple-50", "bg-rose-50"];

export function NotesCard({ projectId, notes }: NotesCardProps) {
  return (
    <ModuleCardWrapper
      title="Notes"
      href={`/projects/${projectId}/notes`}
      icon={<StickyNote size={16} />}
    >
      <div className="space-y-2">
        {notes.map((note, i) => (
          <div
            key={note.id}
            className={`p-3.5 rounded-xl ${noteColors[i % noteColors.length]} border border-black/5`}
          >
            {note.title && (
              <h4 className="text-sm font-medium mb-1">{note.title}</h4>
            )}
            <p className="text-xs text-[var(--muted)] line-clamp-2 leading-relaxed">
              {note.content}
            </p>
            <p className="text-[10px] text-[var(--muted)] mt-2">
              {new Date(note.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        ))}
        {notes.length === 0 && (
          <p className="text-sm text-[var(--muted)] text-center py-6">No notes yet</p>
        )}
      </div>
    </ModuleCardWrapper>
  );
}
