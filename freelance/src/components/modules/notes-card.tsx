"use client";

import { useState } from "react";
import { StickyNote, ChevronDown, ChevronUp } from "lucide-react";
import { Note } from "@/lib/types";
import { ModuleCardWrapper } from "./module-card-wrapper";

interface NotesCardProps {
  projectId: string;
  notes: Note[];
}

const noteColors = [
  "bg-amber-50 dark:bg-amber-950/50",
  "bg-blue-50 dark:bg-blue-950/50",
  "bg-emerald-50 dark:bg-emerald-950/50",
  "bg-purple-50 dark:bg-purple-950/50",
  "bg-rose-50 dark:bg-rose-950/50",
];

export function NotesCard({ projectId, notes }: NotesCardProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <ModuleCardWrapper
      title="Notes"
      href={`/projects/${projectId}/notes`}
      icon={<StickyNote size={16} />}
    >
      <div className="space-y-2">
        {notes.map((note, i) => {
          const isExpanded = expandedId === note.id;
          return (
            <div
              key={note.id}
              className={`p-3.5 rounded-xl ${noteColors[i % noteColors.length]} border border-black/5 dark:border-white/5 cursor-pointer transition-all`}
              onClick={() => setExpandedId(isExpanded ? null : note.id)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  {note.title && (
                    <h4 className="text-sm font-medium mb-1">{note.title}</h4>
                  )}
                  <p className={`text-xs text-[var(--muted)] leading-relaxed ${
                    isExpanded ? "" : "line-clamp-2"
                  }`}>
                    {note.content}
                  </p>
                </div>
                <span className="shrink-0 text-[var(--muted-light)]">
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
              </div>
              <p className="text-[10px] text-[var(--muted)] mt-2">
                {new Date(note.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          );
        })}
        {notes.length === 0 && (
          <div className="text-center py-6">
            <StickyNote size={24} className="mx-auto text-[var(--muted-light)] mb-2" />
            <p className="text-sm text-[var(--muted)]">No notes yet</p>
            <p className="text-xs text-[var(--muted-light)]">Jot down ideas and thoughts</p>
          </div>
        )}
      </div>
    </ModuleCardWrapper>
  );
}
