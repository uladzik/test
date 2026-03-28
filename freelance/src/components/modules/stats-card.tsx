import Link from "next/link";
import { TimeEntry, Payment, Task, Milestone } from "@/lib/types";

interface StatsCardProps {
  projectId: string;
  timeEntries: TimeEntry[];
  payments: Payment[];
  tasks: Task[];
  milestones: Milestone[];
}

export function StatsCard({ projectId, timeEntries, payments, tasks, milestones }: StatsCardProps) {
  const totalMinutes = timeEntries.reduce((sum, e) => sum + (e.durationMinutes || 0), 0);
  const totalHours = Math.round((totalMinutes / 60) * 10) / 10;

  const totalEarned = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalInvoiced = payments.reduce((sum, p) => sum + p.amount, 0);

  const tasksDone = tasks.filter((t) => t.status === "done").length;
  const milestoneDone = milestones.filter((m) => m.status === "completed").length;

  const stats = [
    { label: "Total hours", value: `${totalHours}h`, sub: `${totalMinutes} min tracked` },
    { label: "Earned", value: `$${totalEarned.toLocaleString()}`, sub: `of $${totalInvoiced.toLocaleString()} invoiced` },
    { label: "Tasks done", value: `${tasksDone}/${tasks.length}`, sub: tasks.length > 0 ? `${Math.round((tasksDone / tasks.length) * 100)}% complete` : "No tasks" },
    { label: "Milestones", value: `${milestoneDone}/${milestones.length}`, sub: milestones.length > 0 ? `${Math.round((milestoneDone / milestones.length) * 100)}% complete` : "No milestones" },
  ];

  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-base">Statistics</h3>
        <Link
          href={`/projects/${projectId}/stats`}
          className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          Open
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="p-3 bg-gray-50 rounded-lg">
            <p className="text-[10px] text-[var(--muted)] uppercase tracking-wider font-medium mb-1">
              {stat.label}
            </p>
            <p className="text-xl font-semibold">{stat.value}</p>
            <p className="text-[10px] text-[var(--muted)] mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
