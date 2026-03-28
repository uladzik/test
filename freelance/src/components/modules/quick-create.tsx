"use client";

import { useState } from "react";
import { CheckSquare, StickyNote, Clock, Calendar } from "lucide-react";

interface QuickCreateProps {
  projectId: string;
}

type Tab = "task" | "note" | "time";

export function QuickCreate({ projectId }: QuickCreateProps) {
  const [activeTab, setActiveTab] = useState<Tab>("task");

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "task", label: "Task", icon: <CheckSquare size={14} /> },
    { key: "note", label: "Note", icon: <StickyNote size={14} /> },
    { key: "time", label: "Time Entry", icon: <Clock size={14} /> },
  ];

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 mb-6 bg-[var(--background)] p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-[var(--card)] shadow-sm text-[var(--foreground)]"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Task form */}
      {activeTab === "task" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Title</label>
            <input
              type="text"
              placeholder="What needs to be done?"
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)] transition-all placeholder:text-[var(--muted-light)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Description</label>
            <textarea
              rows={3}
              placeholder="Add details..."
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)] transition-all resize-none placeholder:text-[var(--muted-light)]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1.5">Priority</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm outline-none focus:border-[var(--accent)] transition-all">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Due date</label>
              <div className="relative">
                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-light)]" />
                <input
                  type="date"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm outline-none focus:border-[var(--accent)] transition-all"
                />
              </div>
            </div>
          </div>
          <button className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-medium text-sm hover:bg-[var(--accent-hover)] transition-colors shadow-sm">
            Create task
          </button>
        </div>
      )}

      {/* Note form */}
      {activeTab === "note" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Title</label>
            <input
              type="text"
              placeholder="Note title"
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)] transition-all placeholder:text-[var(--muted-light)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Content</label>
            <textarea
              rows={6}
              placeholder="Write your note..."
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)] transition-all resize-none placeholder:text-[var(--muted-light)]"
            />
          </div>
          <button className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-medium text-sm hover:bg-[var(--accent-hover)] transition-colors shadow-sm">
            Save note
          </button>
        </div>
      )}

      {/* Time entry form */}
      {activeTab === "time" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Description</label>
            <input
              type="text"
              placeholder="What did you work on?"
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)] transition-all placeholder:text-[var(--muted-light)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Category</label>
            <input
              type="text"
              placeholder="e.g. Design, Development..."
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)] transition-all placeholder:text-[var(--muted-light)]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1.5">Start time</label>
              <input
                type="time"
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm outline-none focus:border-[var(--accent)] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">End time</label>
              <input
                type="time"
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm outline-none focus:border-[var(--accent)] transition-all"
              />
            </div>
          </div>
          <button className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-medium text-sm hover:bg-[var(--accent-hover)] transition-colors shadow-sm">
            Log time
          </button>
        </div>
      )}
    </div>
  );
}
