import Link from "next/link";
import { TimeEntry } from "@/lib/types";

interface TimeTrackCardProps {
  projectId: string;
  entries: TimeEntry[];
}

export function TimeTrackCard({ projectId, entries }: TimeTrackCardProps) {
  const todayEntries = entries.filter((e) =>
    e.startTime.startsWith("2025-06-18")
  );
  const todayMinutes = todayEntries.reduce(
    (sum, e) => sum + (e.durationMinutes || 0),
    0
  );
  const todayHours = Math.floor(todayMinutes / 60);
  const todayMins = todayMinutes % 60;

  // Group entries by date
  const grouped = groupByDate(entries);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-base">Time Track</h3>
          <button className="text-[var(--muted)] hover:text-[var(--foreground)]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M4 2l4 4-4 4V2z" />
            </svg>
          </button>
        </div>
        <Link
          href={`/projects/${projectId}/time-track`}
          className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          Open
        </Link>
      </div>
      <p className="text-sm text-[var(--muted)] mb-4">
        Today total {todayHours}h {todayMins}min
      </p>

      <div className="space-y-4">
        {grouped.map((group) => (
          <div key={group.label}>
            <div className="text-[10px] font-medium text-[var(--muted)] uppercase tracking-wider mb-2">
              {group.label}
            </div>
            <div className="space-y-2">
              {group.entries.map((entry) => (
                <div key={entry.id} className="flex items-start justify-between">
                  <div>
                    <p className="text-sm">{entry.description}</p>
                    {entry.category && (
                      <p className="text-xs text-[var(--muted)]">
                        _ {entry.category}
                      </p>
                    )}
                  </div>
                  <span className="text-sm font-medium tabular-nums ml-4 shrink-0">
                    {formatDuration(entry.durationMinutes)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDuration(minutes?: number): string {
  if (!minutes) return "0:00";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}:${m.toString().padStart(2, "0")}`;
}

function groupByDate(entries: TimeEntry[]) {
  const groups: Record<string, { label: string; entries: TimeEntry[] }> = {};
  const today = "2025-06-18";

  for (const entry of entries) {
    const dateStr = entry.startTime.slice(0, 10);
    let label: string;
    if (dateStr === today) {
      label = "Today";
    } else {
      const d = new Date(dateStr);
      label = d.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "long",
      });
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
