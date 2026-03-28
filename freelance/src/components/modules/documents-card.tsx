"use client";

import { useState } from "react";
import Link from "next/link";
import { Document } from "@/lib/types";

interface DocumentsCardProps {
  projectId: string;
  documents: Document[];
}

const tabs = ["Favorites", "Recent", "Created by client"] as const;
const filterTabs = ["All", "My Docs", "Shared", "Privat", "Workspace", "Assigned", "Archived"] as const;

export function DocumentsCard({ projectId, documents }: DocumentsCardProps) {
  const [activeTab] = useState<string>("Favorites");

  const favorites = documents.filter((d) => d.isFavorite);
  const recent = documents.slice().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const allDocs = documents.filter((d) => !d.isFavorite);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-base">Documents</h3>
        <Link
          href={`/projects/${projectId}/documents`}
          className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          Open
        </Link>
      </div>

      {/* Top section: 3-column layout */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Favorites */}
        <div>
          <h4 className="text-[10px] font-medium text-[var(--muted)] uppercase tracking-wider mb-2">
            Favorites
          </h4>
          <div className="space-y-1.5">
            {favorites.map((doc) => (
              <DocRow key={doc.id} doc={doc} />
            ))}
          </div>
        </div>

        {/* Recent */}
        <div>
          <h4 className="text-[10px] font-medium text-[var(--muted)] uppercase tracking-wider mb-2">
            Recent
          </h4>
          <div className="space-y-1.5">
            {recent.slice(0, 3).map((doc) => (
              <DocRow key={doc.id} doc={doc} />
            ))}
          </div>
        </div>

        {/* Created by client */}
        <div>
          <h4 className="text-[10px] font-medium text-[var(--muted)] uppercase tracking-wider mb-2">
            Created by client
          </h4>
          <div className="space-y-1.5">
            {recent.slice(0, 3).map((doc) => (
              <DocRow key={`client-${doc.id}`} doc={doc} />
            ))}
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-3 mb-3 border-t border-[var(--border)] pt-3">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            className={`text-xs ${
              tab === "All"
                ? "text-[var(--foreground)] font-medium"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            } transition-colors`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* All documents list */}
      <div className="space-y-2">
        {allDocs.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between text-sm py-1"
          >
            <div className="flex items-center gap-2">
              <DocIcon />
              <span>{doc.title}</span>
            </div>
            <span className="text-xs text-[var(--muted)]">
              Last updated{" "}
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

function DocRow({ doc }: { doc: Document }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-1.5 truncate">
        <DocIcon />
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
  );
}

function DocIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className="text-[var(--muted)] shrink-0"
    >
      <path d="M4 2h4l3 3v7a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" />
      <path d="M8 2v3h3" />
    </svg>
  );
}
