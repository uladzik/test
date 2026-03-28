"use client";

import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { ModuleCardWrapper } from "./module-card-wrapper";

interface MeetingsCardProps {
  projectId: string;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function MeetingsCard({ projectId }: MeetingsCardProps) {
  const now = new Date();
  const [monthOffset, setMonthOffset] = useState(0);
  const currentMonth = new Date(now.getFullYear(), now.getMonth() + monthOffset);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDayOfWeek = (firstDay.getDay() + 6) % 7;
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

  const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const todayDate = now.getDate();
  const isCurrentMonth = monthOffset === 0;

  return (
    <ModuleCardWrapper
      title="Meetings"
      href={`/projects/${projectId}/meetings`}
      subtitle="Calendar, upcoming meetings, time-blocking"
      icon={<CalendarDays size={16} />}
    >
      {/* Calendar header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMonthOffset((p) => p - 1)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft size={14} className="text-[var(--muted)]" />
          </button>
          <span className="text-sm font-medium min-w-[140px] text-center">{monthName}</span>
          <button
            onClick={() => setMonthOffset((p) => p + 1)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight size={14} className="text-[var(--muted)]" />
          </button>
        </div>
        <button className="flex items-center gap-1.5 text-[11px] text-[var(--accent)] bg-[var(--accent-bg)] px-2.5 py-1.5 rounded-lg hover:bg-[var(--accent)] hover:text-white transition-all font-medium">
          <Plus size={12} />
          Add calendar
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[11px] font-medium text-[var(--muted-light)] py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7">
        {cells.map((cell, i) => {
          const isToday = isCurrentMonth && cell.currentMonth && cell.day === todayDate;
          return (
            <div
              key={i}
              className={`text-center py-[7px] text-sm rounded-lg transition-colors ${
                !cell.currentMonth
                  ? "text-gray-200"
                  : isToday
                  ? ""
                  : "text-[var(--foreground)] hover:bg-gray-50 cursor-pointer"
              }`}
            >
              {isToday ? (
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--accent)] text-white font-medium shadow-sm">
                  {cell.day}
                </span>
              ) : (
                cell.day
              )}
            </div>
          );
        })}
      </div>
    </ModuleCardWrapper>
  );
}
