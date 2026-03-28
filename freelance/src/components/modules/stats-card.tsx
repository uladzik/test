import { BarChart3, Clock, DollarSign, CheckCircle2, Flag } from "lucide-react";
import { TimeEntry, Payment, Task, Milestone } from "@/lib/types";
import { ModuleCardWrapper } from "./module-card-wrapper";

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
  const totalEarned = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const totalInvoiced = payments.reduce((sum, p) => sum + p.amount, 0);
  const tasksDone = tasks.filter((t) => t.status === "done").length;
  const milestoneDone = milestones.filter((m) => m.status === "completed").length;

  const stats = [
    {
      icon: <Clock size={16} />,
      label: "Total hours",
      value: `${totalHours}h`,
      sub: `${totalMinutes} min tracked`,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/50",
    },
    {
      icon: <DollarSign size={16} />,
      label: "Earned",
      value: `$${totalEarned.toLocaleString()}`,
      sub: `of $${totalInvoiced.toLocaleString()}`,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/50",
    },
    {
      icon: <CheckCircle2 size={16} />,
      label: "Tasks",
      value: `${tasksDone}/${tasks.length}`,
      sub: tasks.length > 0 ? `${Math.round((tasksDone / tasks.length) * 100)}%` : "None",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/50",
    },
    {
      icon: <Flag size={16} />,
      label: "Milestones",
      value: `${milestoneDone}/${milestones.length}`,
      sub: milestones.length > 0 ? `${Math.round((milestoneDone / milestones.length) * 100)}%` : "None",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/50",
    },
  ];

  return (
    <ModuleCardWrapper
      title="Statistics"
      href={`/projects/${projectId}/stats`}
      icon={<BarChart3 size={16} />}
    >
      <div className="grid grid-cols-2 gap-2.5">
        {stats.map((stat) => (
          <div key={stat.label} className={`p-3.5 rounded-xl ${stat.bg} border border-black/5 dark:border-white/5`}>
            <div className={`${stat.color} mb-2`}>{stat.icon}</div>
            <p className="text-xl font-bold tabular-nums">{stat.value}</p>
            <p className="text-[10px] text-[var(--muted)] mt-0.5 font-medium uppercase tracking-wider">
              {stat.label}
            </p>
            <p className="text-[11px] text-[var(--muted)] mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>
    </ModuleCardWrapper>
  );
}
