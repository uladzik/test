import { Clock, Play } from "lucide-react";
import { TimeEntry } from "@/lib/types";
import { ModuleCardWrapper } from "./module-card-wrapper";

interface TimeTrackCardProps {
  projectId: string;
  entries: TimeEntry[];
}

export function TimeTrackCard({ projectId, entries }: TimeTrackCardProps) {
  const today = new Date().toISOString().slice(0, 10);
  const todayEntries = entries.filter((e) => e.startTime.slice(0, 10) === today);
  const todayMinutes = todayEntries.reduce((sum, e) => sum + (e.durationMinutes || 0), 0);

  // If no entries today, show all entries total for demo
  const displayMinutes = todayMinutes || entries.reduce((sum, e) => sum + (e.durationMinutes || 0), 0);
  const hours = Math.floor(displayMinutes / 60);
  const mins = displayMinutes % 60;

  const grouped = groupByDate(entries);

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
        <button className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center hover:bg-[var(--accent-hover)] transition-colors shadow-sm" aria-label="Start timer">
          <Play size={16} className="ml-0.5" />
        </button>
      </div>

      <div className="space-y-4">
        {grouped.map((group) => (
          <div key={group.label}>
            <div className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest mb-2">
              {group.label}
            </div>
            <div className="space-y-1.5">
              {group.entries.map((entry) => (
                <div key={entry.id} className="flex items-start justify-between py-1.5 px-3 rounded-lg hover:bg-gray-50 transition-colors">
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
          <p className="text-sm text-[var(--muted)] text-center py-6">No time entries yet</p>
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
