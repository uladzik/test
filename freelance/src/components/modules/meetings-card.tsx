"use client";

import { useState } from "react";
import Link from "next/link";

interface MeetingsCardProps {
  projectId: string;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function MeetingsCard({ projectId }: MeetingsCardProps) {
  const [currentMonth] = useState(new Date(2025, 5)); // June 2025

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDayOfWeek = (firstDay.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = lastDay.getDate();

  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const cells: { day: number; currentMonth: boolean }[] = [];

  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    cells.push({ day: prevMonthLastDay - i, currentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, currentMonth: true });
  }
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      cells.push({ day: d, currentMonth: false });
    }
  }

  const monthName = currentMonth.toLocaleDateString("en-US", { month: "long" });
  const today = 18;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-base">Meetings</h3>
        <Link
          href={`/projects/${projectId}/meetings`}
          className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          Open
        </Link>
      </div>
      <p className="text-xs text-[var(--muted)] mb-4">
        Calendar, upcoming meetings, time-blocking
      </p>

      {/* Calendar header */}
      <div className="flex items-center gap-2 mb-3">
        <button className="text-[var(--muted)] hover:text-[var(--foreground)] text-sm">&lt;</button>
        <span className="text-sm font-medium">{monthName}</span>
        <button className="text-[var(--muted)] hover:text-[var(--foreground)] text-sm">&gt;</button>
        <div className="ml-auto">
          <button className="text-xs text-[var(--muted)] bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors">
            + Add calendar integration
          </button>
        </div>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] text-[var(--muted)] py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7">
        {cells.map((cell, i) => (
          <div
            key={i}
            className={`text-center py-2 text-sm ${
              !cell.currentMonth
                ? "text-gray-300"
                : cell.day === today
                ? "relative"
                : "text-[var(--foreground)]"
            }`}
          >
            {cell.currentMonth && cell.day === today ? (
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--accent)] text-white font-medium">
                {cell.day}
              </span>
            ) : (
              cell.day
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
