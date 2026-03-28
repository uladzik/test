"use client";

import { useState, useEffect, useRef } from "react";
import { Clock, Play, Square } from "lucide-react";
import { TimeEntry } from "@/lib/types";
import { ModuleCardWrapper } from "./module-card-wrapper";

interface TimeTrackCardProps {
  projectId: string;
  entries: TimeEntry[];
}

export function TimeTrackCard({ projectId, entries }: TimeTrackCardProps) {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const today = new Date().toISOString().slice(0, 10);
  const todayEntries = entries.filter((e) => e.startTime.slice(0, 10) === today);
  const todayMinutes = todayEntries.reduce((sum, e) => sum + (e.durationMinutes || 0), 0);

  const displayMinutes = todayMinutes || entries.reduce((sum, e) => sum + (e.durationMinutes || 0), 0);
  const hours = Math.floor(displayMinutes / 60);
  const mins = displayMinutes % 60;

  const grouped = groupByDate(entries);

  const elapsedMin = Math.floor(elapsed / 60);
  const elapsedSec = elapsed % 60;

  return (
    <ModuleCardWrapper
      title="Time Track"
      href={`/projects/${projectId}/time-track`}
      icon={<Clock size={16} />}
    >
      {/* Today summary */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-[var(--muted)] mb-0.5">Today total</p>
          <p className="text-2xl font-bold tabular-nums tracking-tight">
            {hours}h {mins.toString().padStart(2, "0")}m
          </p>
        </div>
        <div className="flex items-center gap-2">
          {running && (
            <div className="flex items-center gap-1.5 text-sm font-mono tabular-nums text-[var(--danger)]">
              <span className="w-2 h-2 rounded-full bg-[var(--danger)] animate-timer-pulse" />
              {elapsedMin}:{elapsedSec.toString().padStart(2, "0")}
            </div>
          )}
          <button
            onClick={() => {
              if (running) {
                setRunning(false);
                setElapsed(0);
              } else {
                setRunning(true);
              }
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm ${
              running
                ? "bg-[var(--danger)] text-white hover:opacity-90"
                : "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
            }`}
            aria-label={running ? "Stop timer" : "Start timer"}
          >
            {running ? <Square size={14} /> : <Play size={16} className="ml-0.5" />}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {grouped.map((group) => (
          <div key={group.label}>
            <div className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest mb-2">
              {group.label}
            </div>
            <div className="space-y-1.5">
              {group.entries.map((entry) => (
                <div key={entry.id} className="flex items-start justify-between py-1.5 px-3 rounded-lg hover:bg-[var(--background)] transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{entry.description}</p>
                    {entry.category && (
                      <p className="text-[11px] text-[var(--muted)] truncate mt-0.5">
                        {entry.category}
                      </p>
                    )}
                  </div>
                  <span className="text-sm font-semibold tabular-nums ml-4 shrink-0 text-[var(--foreground)]">
                    {formatDuration(entry.durationMinutes)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {entries.length === 0 && (
          <div className="text-center py-6">
            <Clock size={24} className="mx-auto text-[var(--muted-light)] mb-2" />
            <p className="text-sm text-[var(--muted)]">No time entries yet</p>
            <p className="text-xs text-[var(--muted-light)]">Start the timer to begin tracking</p>
          </div>
        )}
      </div>
    </ModuleCardWrapper>
  );
}

function formatDuration(minutes?: number): string {
  if (!minutes) return "0:00";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}:${m.toString().padStart(2, "0")}`;
}

function groupByDate(entries: TimeEntry[]) {
  const today = new Date().toISOString().slice(0, 10);
  const groups: Record<string, { label: string; entries: TimeEntry[] }> = {};

  for (const entry of entries) {
    const dateStr = entry.startTime.slice(0, 10);
    let label: string;
    if (dateStr === today) {
      label = "Today";
    } else {
      const d = new Date(dateStr);
      label = d.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "long" });
    }

    if (!groups[dateStr]) {
      groups[dateStr] = { label, entries: [] };
    }
    groups[dateStr].entries.push(entry);
  }

  return Object.entries(groups)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([, g]) => g);
}
