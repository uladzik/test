"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { Document } from "@/lib/types";
import { ModuleCardWrapper } from "./module-card-wrapper";

interface DocumentsCardProps {
  projectId: string;
  documents: Document[];
}

const filterTabs = ["All", "My Docs", "Shared", "Private", "Workspace", "Assigned", "Archived"] as const;

export function DocumentsCard({ projectId, documents }: DocumentsCardProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const favorites = documents.filter((d) => d.isFavorite);
  const recent = [...documents].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const allDocs = documents.filter((d) => !d.isFavorite);

  return (
    <ModuleCardWrapper
      title="Documents"
      href={`/projects/${projectId}/documents`}
      icon={<FileText size={16} />}
    >
      {/* Top section: 3-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <DocColumn title="Favorites" docs={favorites} />
        <DocColumn title="Recent" docs={recent.slice(0, 3)} />
        <DocColumn title="Created by client" docs={recent.slice(0, 3)} />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-3 border-t border-[var(--border)] pt-3 flex-wrap">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`text-xs px-2.5 py-1.5 rounded-lg transition-all ${
              tab === activeFilter
                ? "bg-[var(--foreground)] text-white font-medium"
                : "text-[var(--muted)] hover:bg-gray-100 hover:text-[var(--foreground)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Document list */}
      <div className="space-y-1">
        {allDocs.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between text-sm py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <FileText size={14} className="text-[var(--muted)] shrink-0" />
              <span className="truncate">{doc.title}</span>
            </div>
            <span className="text-[11px] text-[var(--muted)] shrink-0 ml-3 tabular-nums">
              {new Date(doc.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
        ))}
        {documents.length === 0 && (
          <p className="text-sm text-[var(--muted)] text-center py-6">No documents yet</p>
        )}
      </div>
    </ModuleCardWrapper>
  );
}

function DocColumn({ title, docs }: { title: string; docs: Document[] }) {
  return (
    <div>
      <h4 className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest mb-2">
        {title}
      </h4>
      <div className="space-y-1">
        {docs.map((doc, i) => (
          <div key={`${doc.id}-${i}`} className="flex items-center justify-between text-xs py-1 px-2 rounded-md hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-1.5 truncate min-w-0">
              <FileText size={12} className="text-[var(--muted)] shrink-0" />
              <span className="truncate">{doc.title}</span>
            </div>
            <span className="text-[var(--muted)] tabular-nums shrink-0 ml-2">
              {new Date(doc.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
