import { CreditCard } from "lucide-react";
import { Payment } from "@/lib/types";
import { ModuleCardWrapper } from "./module-card-wrapper";

interface PaymentsCardProps {
  projectId: string;
  payments: Payment[];
}

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  paid: { bg: "bg-emerald-100/80", text: "text-emerald-700", label: "Paid" },
  sent: { bg: "bg-blue-100/80", text: "text-blue-700", label: "Sent" },
  pending: { bg: "bg-amber-100/80", text: "text-amber-700", label: "Pending" },
  overdue: { bg: "bg-red-100/80", text: "text-red-700", label: "Overdue" },
};

export function PaymentsCard({ projectId, payments }: PaymentsCardProps) {
  const totalPaid = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments
    .filter((p) => p.status !== "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <ModuleCardWrapper
      title="Payments"
      href={`/projects/${projectId}/payments`}
      icon={<CreditCard size={16} />}
    >
      {/* Summary */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 p-3.5 bg-[var(--success-bg)] rounded-xl border border-emerald-100">
          <p className="text-[10px] text-emerald-600 uppercase tracking-widest font-semibold mb-1">Received</p>
          <p className="text-xl font-bold text-emerald-700 tabular-nums">
            ${totalPaid.toLocaleString()}
          </p>
        </div>
        <div className="flex-1 p-3.5 bg-[var(--warning-bg)] rounded-xl border border-amber-100">
          <p className="text-[10px] text-amber-600 uppercase tracking-widest font-semibold mb-1">Outstanding</p>
          <p className="text-xl font-bold text-amber-700 tabular-nums">
            ${totalPending.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Payment list */}
      <div className="space-y-1">
        {payments.map((payment) => {
          const style = statusStyles[payment.status] || statusStyles.pending;
          return (
            <div
              key={payment.id}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{payment.description}</p>
                <p className="text-[11px] text-[var(--muted)]">
                  {formatPeriod(payment.periodStart, payment.periodEnd)}
                </p>
              </div>
              <div className="flex items-center gap-2.5 ml-3 shrink-0">
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
          <p className="text-sm text-[var(--muted)] text-center py-6">No payments yet</p>
        )}
      </div>
    </ModuleCardWrapper>
  );
}

function formatPeriod(start?: string, end?: string): string {
  if (!start) return "";
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  if (end) return `${fmt(start)} – ${fmt(end)}`;
  return fmt(start);
}
