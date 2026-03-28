"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-60 border-r border-[var(--border)] bg-white flex flex-col p-4 z-10">
      {/* User */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-sm font-semibold">
          U
        </div>
        <span className="font-semibold text-sm">Ulad</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 mb-6">
        <Link
          href="/projects"
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
            pathname === "/projects" || pathname === "/"
              ? "bg-gray-100 font-medium"
              : "hover:bg-gray-50"
          }`}
        >
          <FolderIcon />
          My projects
        </Link>
      </nav>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-gray-50 outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>

      {/* New project */}
      <Link
        href="/projects?new=true"
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-[var(--foreground)] text-white hover:opacity-90 transition-opacity"
      >
        New project
        <span className="ml-auto text-lg leading-none">+</span>
      </Link>

      <div className="mt-auto" />
    </aside>
  );
}

function FolderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4.5C2 3.67 2.67 3 3.5 3H6l1.5 1.5H12.5C13.33 4.5 14 5.17 14 6V11.5C14 12.33 13.33 13 12.5 13H3.5C2.67 13 2 12.33 2 11.5V4.5Z" />
    </svg>
  );
}
