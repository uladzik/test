"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FolderOpen, Search, Plus, Menu, X, Bell } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 glass border-b border-[var(--border)] flex items-center px-4 z-30">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
        <span className="ml-3 font-semibold text-sm">Freelance Portal</span>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 h-full w-[var(--sidebar-width)] bg-white border-r border-[var(--border)] flex flex-col z-50
          transition-transform duration-200 ease-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] flex items-center justify-center text-white text-sm font-semibold shadow-sm">
              U
            </div>
            <div>
              <p className="font-semibold text-sm leading-tight">Ulad</p>
              <p className="text-[11px] text-[var(--muted)]">Freelancer</p>
            </div>
          </div>
          <button className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X size={18} />
          </button>
          <button className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 relative" aria-label="Notifications">
            <Bell size={18} className="text-[var(--muted)]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--danger)] rounded-full" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 mb-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-light)]" />
            <input
              type="text"
              placeholder="Search anything..."
              aria-label="Search projects and content"
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[var(--border)] bg-[var(--background)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)] transition-all placeholder:text-[var(--muted-light)]"
            />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 px-3 mb-4">
          <Link
            href="/projects"
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
              pathname === "/projects" || pathname === "/"
                ? "bg-[var(--accent-bg)] text-[var(--accent)] font-medium"
                : "text-[var(--muted)] hover:bg-gray-50 hover:text-[var(--foreground)]"
            }`}
          >
            <FolderOpen size={18} />
            My projects
          </Link>
        </nav>

        <div className="flex-1" />

        {/* New project button */}
        <div className="p-4 pt-0">
          <button className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium bg-[var(--foreground)] text-white hover:opacity-90 transition-opacity shadow-sm">
            <Plus size={16} />
            New project
          </button>
        </div>
      </aside>

      {/* Mobile spacer */}
      <div className="lg:hidden h-14" />
    </>
  );
}
