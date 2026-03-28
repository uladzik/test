import {
  dummyProjects,
  dummyTimeEntries,
  dummyTasks,
  dummyChatMessages,
  dummyLinks,
  dummyDocuments,
  dummyNotes,
  dummyPayments,
  dummyMilestones,
  dummyMeetings,
} from "@/lib/dummy-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MeetingsCard } from "@/components/modules/meetings-card";
import { TimeTrackCard } from "@/components/modules/time-track-card";
import { TasksCard } from "@/components/modules/tasks-card";
import { ChatCard } from "@/components/modules/chat-card";
import { LinksCard } from "@/components/modules/links-card";
import { DocumentsCard } from "@/components/modules/documents-card";
import { NotesCard } from "@/components/modules/notes-card";
import { PaymentsCard } from "@/components/modules/payments-card";
import { TimelineCard } from "@/components/modules/timeline-card";
import { StatsCard } from "@/components/modules/stats-card";
import { DashboardFAB } from "@/components/modules/dashboard-fab";
import { ChevronLeft, Calendar, CreditCard, Clock, CheckCircle2 } from "lucide-react";

const billingLabels: Record<string, string> = {
  monthly: "Monthly Payment",
  fixed: "Fixed Price",
  hourly: "Hourly Rate",
};

export default async function ProjectDashboardPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = dummyProjects.find((p) => p.id === projectId);
  if (!project) notFound();

  const meetings = dummyMeetings.filter((m) => m.projectId === projectId);
  const timeEntries = dummyTimeEntries.filter((t) => t.projectId === projectId);
  const tasks = dummyTasks.filter((t) => t.projectId === projectId);
  const chatMessages = dummyChatMessages.filter((c) => c.projectId === projectId);
  const links = dummyLinks.filter((l) => l.projectId === projectId);
  const documents = dummyDocuments.filter((d) => d.projectId === projectId);
  const notes = dummyNotes.filter((n) => n.projectId === projectId);
  const payments = dummyPayments.filter((p) => p.projectId === projectId);
  const milestones = dummyMilestones.filter((m) => m.projectId === projectId);

  const dateRange = formatDateRange(project.startDate, project.endDate);
  const totalMinutes = timeEntries.reduce((s, e) => s + (e.durationMinutes || 0), 0);
  const totalHours = Math.round((totalMinutes / 60) * 10) / 10;
  const tasksDone = tasks.filter((t) => t.status === "done").length;

  return (
    <div className="max-w-[1400px]">
      {/* Breadcrumb */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-4"
      >
        <ChevronLeft size={16} />
        My projects
      </Link>

      {/* Project hero */}
      <div className={`rounded-2xl bg-gradient-to-br ${project.coverGradient || "from-violet-500 to-purple-500"} p-6 pb-5 mb-6 relative overflow-hidden`}>
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none">
            <circle cx="650" cy="80" r="150" fill="white" />
            <circle cx="750" cy="180" r="100" fill="white" />
            <circle cx="100" cy="180" r="60" fill="white" />
          </svg>
        </div>

        <div className="relative">
          <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">{project.name}</h1>
          {project.description && (
            <p className="text-sm text-white/70 mb-4">{project.description}</p>
          )}

          {/* Meta pills */}
          <div className="flex flex-wrap gap-2">
            {project.clientName && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-medium">
                {project.clientName}
              </span>
            )}
            {dateRange && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs">
                <Calendar size={12} />
                {dateRange}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs">
              <CreditCard size={12} />
              {billingLabels[project.billingType]}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs">
              <Clock size={12} />
              {totalHours}h tracked
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs">
              <CheckCircle2 size={12} />
              {tasksDone}/{tasks.length} tasks
            </span>
          </div>
        </div>
      </div>

      {/* Bento grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-min">
        {/* Meetings: tall, span 2 rows */}
        <div className="lg:row-span-2">
          <MeetingsCard projectId={projectId} meetings={meetings} />
        </div>

        {/* TimeTrack: tall, span 2 rows */}
        <div className="lg:row-span-2">
          <TimeTrackCard projectId={projectId} entries={timeEntries} />
        </div>

        {/* Tasks: medium, single */}
        <div className="lg:col-span-2">
          <TasksCard projectId={projectId} tasks={tasks} />
        </div>

        {/* Chat: compact */}
        <div>
          <ChatCard projectId={projectId} messages={chatMessages} />
        </div>

        {/* Links: compact */}
        <div>
          <LinksCard projectId={projectId} links={links} />
        </div>

        {/* Documents: wide, span 2 cols */}
        <div className="lg:col-span-2">
          <DocumentsCard projectId={projectId} documents={documents} />
        </div>

        {/* Notes: medium */}
        <div>
          <NotesCard projectId={projectId} notes={notes} />
        </div>

        {/* Timeline: medium */}
        <div>
          <TimelineCard
            projectId={projectId}
            milestones={milestones}
            startDate={project.startDate}
            endDate={project.endDate}
          />
        </div>

        {/* Payments: medium */}
        <div>
          <PaymentsCard projectId={projectId} payments={payments} />
        </div>

        {/* Stats: medium */}
        <div>
          <StatsCard
            projectId={projectId}
            timeEntries={timeEntries}
            payments={payments}
            tasks={tasks}
            milestones={milestones}
          />
        </div>
      </div>

      {/* Floating action button */}
      <DashboardFAB projectId={projectId} />
    </div>
  );
}

function formatDateRange(start?: string, end?: string): string | null {
  if (!start) return null;
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  if (end) return `${fmt(start)} -- ${fmt(end)}`;
  return `From ${fmt(start)}`;
}
