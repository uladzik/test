import Link from "next/link";
import { Note } from "@/lib/types";

interface NotesCardProps {
  projectId: string;
  notes: Note[];
}

export function NotesCard({ projectId, notes }: NotesCardProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-base">Notes</h3>
        <Link
          href={`/projects/${projectId}/notes`}
          className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          Open
        </Link>
      </div>

      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-3 bg-gray-50 rounded-lg"
          >
            {note.title && (
              <h4 className="text-sm font-medium mb-1">{note.title}</h4>
            )}
            <p className="text-xs text-[var(--muted)] line-clamp-2">
              {note.content}
            </p>
            <p className="text-[10px] text-gray-400 mt-1.5">
              {new Date(note.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
