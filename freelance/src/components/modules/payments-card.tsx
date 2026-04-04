import { CreditCard } from "lucide-react";
import { Payment } from "@/lib/types";
import { ModuleCardWrapper } from "./module-card-wrapper";

interface PaymentsCardProps {
  projectId: string;
  payments: Payment[];
}

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  paid: { bg: "bg-[var(--success-bg)]", text: "text-[var(--success)]", label: "Paid" },
  sent: { bg: "bg-[var(--info-bg)]", text: "text-[var(--info)]", label: "Sent" },
  pending: { bg: "bg-[var(--warning-bg)]", text: "text-[var(--warning)]", label: "Pending" },
  overdue: { bg: "bg-[var(--danger-bg)]", text: "text-[var(--danger)]", label: "Overdue" },
};

export function PaymentsCard({ projectId, payments }: PaymentsCardProps) {
  const totalPaid = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments
    .filter((p) => p.status !== "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  // Monthly bar chart data
  const monthlyData = getMonthlyData(payments);
  const maxAmount = Math.max(...monthlyData.map((d) => d.amount), 1);

  return (
    <ModuleCardWrapper
      title="Payments"
      href={`/projects/${projectId}/payments`}
      icon={<CreditCard size={16} />}
    >
      {/* Summary */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 p-3 rounded-xl border border-[var(--border-light)]">
          <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest font-semibold mb-1">Received</p>
          <p className="text-lg font-bold text-[var(--foreground)] tabular-nums">
            ${totalPaid.toLocaleString()}
          </p>
        </div>
        <div className="flex-1 p-3 rounded-xl border border-[var(--border-light)]">
          <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest font-semibold mb-1">Outstanding</p>
          <p className="text-lg font-bold text-[var(--foreground)] tabular-nums">
            ${totalPending.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Bar chart */}
      {monthlyData.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest mb-2">
            By month
          </p>
          <div className="flex items-end gap-2 h-16">
            {monthlyData.map((d) => (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md bg-[var(--accent)] opacity-70 transition-all min-h-[3px]"
                  style={{ height: `${(d.amount / maxAmount) * 100}%` }}
                />
                <span className="text-[9px] text-[var(--muted)] tabular-nums">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment list */}
      <div className="space-y-1">
        {payments.map((payment) => {
          const style = statusStyles[payment.status] || statusStyles.pending;
          return (
            <div
              key={payment.id}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[var(--background)] transition-colors"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{payment.description}</p>
                <p className="text-[11px] text-[var(--muted)]">
                  {formatPeriod(payment.periodStart, payment.periodEnd)}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-3 shrink-0">
                <span className="text-sm font-semibold tabular-nums">
                  ${payment.amount.toLocaleString()}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-1 rounded-lg ${style.bg} ${style.text}`}
                >
                  {style.label}
                </span>
              </div>
            </div>
          );
        })}
        {payments.length === 0 && (
          <div className="text-center py-6">
            <CreditCard size={24} className="mx-auto text-[var(--muted-light)] mb-2" />
            <p className="text-sm text-[var(--muted)]">No payments yet</p>
            <p className="text-xs text-[var(--muted-light)]">Track invoices and payments</p>
          </div>
        )}
      </div>
    </ModuleCardWrapper>
  );
}

function getMonthlyData(payments: Payment[]): { label: string; amount: number }[] {
  const months: Record<string, number> = {};
  for (const p of payments) {
    if (!p.periodStart) continue;
    const d = new Date(p.periodStart);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("en-US", { month: "short" });
    if (!months[key]) months[key] = 0;
    months[key] += p.amount;
  }
  return Object.entries(months)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, amount]) => {
      const [y, m] = key.split("-");
      const month = new Date(parseInt(y), parseInt(m) - 1);
      return {
        label: month.toLocaleDateString("en-US", { month: "short" }),
        amount,
      };
    });
}

function formatPeriod(start?: string, end?: string): string {
  if (!start) return "";
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  if (end) return `${fmt(start)} -- ${fmt(end)}`;
  return fmt(start);
}
