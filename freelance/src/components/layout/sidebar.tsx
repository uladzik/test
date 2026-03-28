"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FolderOpen,
  Search,
  Plus,
  Menu,
  X,
  Bell,
  ChevronDown,
  ChevronRight,
  Moon,
  Sun,
  Briefcase,
} from "lucide-react";
import { dummyProjects } from "@/lib/dummy-data";

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectsExpanded, setProjectsExpanded] = useState(true);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  const activeProjects = dummyProjects.filter((p) => p.status === "active");
  const otherProjects = dummyProjects.filter((p) => p.status !== "active");

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 glass border-b border-[var(--border)] flex items-center px-4 z-30">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="p-2 rounded-lg hover:bg-[var(--accent-bg)] transition-colors"
        >
          <Menu size={20} />
        </button>
        <span className="ml-3 font-semibold text-sm">Freelance Portal</span>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={toggleDark}
            className="p-2 rounded-lg hover:bg-[var(--accent-bg)] transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="relative p-2 rounded-lg hover:bg-[var(--accent-bg)] transition-colors" aria-label="Notifications">
            <Bell size={16} className="text-[var(--muted)]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--danger)] rounded-full" />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 dark:bg-black/50 z-40 transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 h-full w-[var(--sidebar-width)] bg-[var(--card)] border-r border-[var(--border)] flex flex-col z-50
          transition-transform duration-300 ease-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                U
              </div>
              {/* Online indicator */}
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[var(--success)] rounded-full border-2 border-[var(--card)]" />
            </div>
            <div>
              <p className="font-semibold text-sm leading-tight">Ulad</p>
              <p className="text-[11px] text-[var(--muted)]">Freelancer</p>
            </div>
          </div>
          <button
            className="lg:hidden p-1.5 rounded-lg hover:bg-[var(--accent-bg)] transition-colors"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
          <button className="hidden lg:flex p-1.5 rounded-lg hover:bg-[var(--accent-bg)] transition-colors relative" aria-label="Notifications">
            <Bell size={18} className="text-[var(--muted)]" />
            <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 bg-[var(--danger)] rounded-full text-[9px] font-bold text-white flex items-center justify-center px-1">
              3
            </span>
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
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)] transition-all placeholder:text-[var(--muted-light)]"
            />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 px-3 mb-2">
          <Link
            href="/projects"
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
              pathname === "/projects" || pathname === "/"
                ? "bg-[var(--accent-bg)] text-[var(--accent)] font-medium"
                : "text-[var(--muted)] hover:bg-[var(--background)] hover:text-[var(--foreground)]"
            }`}
          >
            <FolderOpen size={18} />
            My projects
          </Link>
        </nav>

        {/* Projects folder */}
        <div className="px-3 flex-1 overflow-y-auto">
          <button
            onClick={() => setProjectsExpanded(!projectsExpanded)}
            className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-[var(--muted)] uppercase tracking-widest w-full hover:text-[var(--foreground)] transition-colors"
          >
            {projectsExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            Projects
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${
              projectsExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {/* Active */}
            {activeProjects.length > 0 && (
              <div className="mb-2">
                <p className="px-3 py-1 text-[10px] font-medium text-[var(--success)] uppercase tracking-wider">
                  Active
                </p>
                {activeProjects.map((project) => {
                  const isActive = pathname === `/projects/${project.id}`;
                  return (
                    <Link
                      key={project.id}
                      href={`/projects/${project.id}`}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-all ${
                        isActive
                          ? "bg-[var(--accent-bg)] text-[var(--accent)] font-medium"
                          : "text-[var(--muted)] hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      <Briefcase size={14} className="shrink-0" />
                      <span className="truncate">{project.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Other */}
            {otherProjects.length > 0 && (
              <div className="mb-2">
                <p className="px-3 py-1 text-[10px] font-medium text-[var(--muted-light)] uppercase tracking-wider">
                  Other
                </p>
                {otherProjects.map((project) => {
                  const isActive = pathname === `/projects/${project.id}`;
                  return (
                    <Link
                      key={project.id}
                      href={`/projects/${project.id}`}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-all ${
                        isActive
                          ? "bg-[var(--accent-bg)] text-[var(--accent)] font-medium"
                          : "text-[var(--muted-light)] hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      <Briefcase size={14} className="shrink-0 opacity-50" />
                      <span className="truncate">{project.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom section */}
        <div className="p-4 pt-2 space-y-2 border-t border-[var(--border)]">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm text-[var(--muted)] hover:bg-[var(--background)] hover:text-[var(--foreground)] transition-all"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
            {dark ? "Light mode" : "Dark mode"}
          </button>

          {/* New project button */}
          <button className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity shadow-sm">
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
