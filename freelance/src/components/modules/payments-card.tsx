import Link from "next/link";
import { Payment } from "@/lib/types";

interface PaymentsCardProps {
  projectId: string;
  payments: Payment[];
}

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  paid: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Paid" },
  sent: { bg: "bg-blue-50", text: "text-blue-700", label: "Sent" },
  pending: { bg: "bg-amber-50", text: "text-amber-700", label: "Pending" },
  overdue: { bg: "bg-red-50", text: "text-red-700", label: "Overdue" },
};

export function PaymentsCard({ projectId, payments }: PaymentsCardProps) {
  const totalPaid = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments
    .filter((p) => p.status !== "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-base">Payments</h3>
        <Link
          href={`/projects/${projectId}/payments`}
          className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          Open
        </Link>
      </div>

      {/* Summary */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1 p-3 bg-emerald-50 rounded-lg">
          <p className="text-[10px] text-emerald-600 uppercase tracking-wider font-medium mb-0.5">Received</p>
          <p className="text-lg font-semibold text-emerald-700">
            ${totalPaid.toLocaleString()}
          </p>
        </div>
        <div className="flex-1 p-3 bg-amber-50 rounded-lg">
          <p className="text-[10px] text-amber-600 uppercase tracking-wider font-medium mb-0.5">Outstanding</p>
          <p className="text-lg font-semibold text-amber-700">
            ${totalPending.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Payment list */}
      <div className="space-y-2">
        {payments.map((payment) => {
          const style = statusStyles[payment.status];
          return (
            <div
              key={payment.id}
              className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
            >
              <div>
                <p className="text-sm">{payment.description}</p>
                <p className="text-[10px] text-[var(--muted)]">
                  {formatPeriod(payment.periodStart, payment.periodEnd)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium tabular-nums">
                  ${payment.amount.toLocaleString()}
                </span>
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}
                >
                  {style.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatPeriod(start?: string, end?: string): string {
  if (!start) return "";
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  if (end) return `${fmt(start)} – ${fmt(end)}`;
  return fmt(start);
}
