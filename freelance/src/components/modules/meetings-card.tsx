"use client";

import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Plus, Video, Phone, MapPin } from "lucide-react";
import { Meeting } from "@/lib/types";
import { ModuleCardWrapper } from "./module-card-wrapper";

interface MeetingsCardProps {
  projectId: string;
  meetings: Meeting[];
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const meetingTypeIcons: Record<string, React.ReactNode> = {
  video: <Video size={12} />,
  call: <Phone size={12} />,
  in_person: <MapPin size={12} />,
};

export function MeetingsCard({ projectId, meetings }: MeetingsCardProps) {
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

  // Days with meetings
  const meetingDays = new Set(
    meetings.map((m) => {
      const d = new Date(m.startTime);
      if (d.getFullYear() === year && d.getMonth() === month) {
        return d.getDate();
      }
      return -1;
    }).filter((d) => d !== -1)
  );

  // Upcoming meetings sorted by time
  const upcomingMeetings = [...meetings]
    .filter((m) => new Date(m.startTime) >= now)
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
    .slice(0, 3);

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
            className="p-1.5 rounded-lg hover:bg-[var(--background)] transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft size={14} className="text-[var(--muted)]" />
          </button>
          <span className="text-sm font-medium min-w-[140px] text-center">{monthName}</span>
          <button
            onClick={() => setMonthOffset((p) => p + 1)}
            className="p-1.5 rounded-lg hover:bg-[var(--background)] transition-colors"
            aria-label="Next month"
          >
            <ChevronRight size={14} className="text-[var(--muted)]" />
          </button>
        </div>
        <button className="flex items-center gap-1.5 text-[11px] text-[var(--accent)] bg-[var(--accent-bg)] px-2.5 py-1.5 rounded-lg hover:bg-[var(--accent)] hover:text-white transition-all font-medium">
          <Plus size={12} />
          Add
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
          const hasMeeting = cell.currentMonth && meetingDays.has(cell.day);
          return (
            <div
              key={i}
              className={`text-center py-[5px] text-sm rounded-lg transition-colors relative ${
                !cell.currentMonth
                  ? "text-[var(--muted-light)] opacity-40"
                  : isToday
                  ? ""
                  : "text-[var(--foreground)] hover:bg-[var(--background)] cursor-pointer"
              }`}
            >
              {isToday ? (
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--accent)] text-white font-medium shadow-sm">
                  {cell.day}
                </span>
              ) : (
                cell.day
              )}
              {/* Meeting dot */}
              {hasMeeting && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent)]" />
              )}
            </div>
          );
        })}
      </div>

      {/* Upcoming meetings list */}
      {upcomingMeetings.length > 0 && (
        <div className="mt-4 pt-4 border-t border-[var(--border)]">
          <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest mb-2">
            Upcoming
          </p>
          <div className="space-y-2">
            {upcomingMeetings.map((m) => {
              const start = new Date(m.startTime);
              const timeStr = start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
              const dateStr = start.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
              return (
                <div key={m.id} className="flex items-center gap-2.5 px-3 py-2 bg-[var(--background)] rounded-xl">
                  <span className="text-[var(--accent)] shrink-0">
                    {meetingTypeIcons[m.meetingType] || <Video size={12} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{m.title}</p>
                    <p className="text-[11px] text-[var(--muted)]">{dateStr} at {timeStr}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {meetings.length === 0 && (
        <div className="mt-4 pt-4 border-t border-[var(--border)]">
          <div className="text-center py-4">
            <CalendarDays size={24} className="mx-auto text-[var(--muted-light)] mb-2" />
            <p className="text-sm text-[var(--muted)]">No meetings scheduled</p>
            <p className="text-xs text-[var(--muted-light)]">Add a meeting to get started</p>
          </div>
        </div>
      )}
    </ModuleCardWrapper>
  );
}
