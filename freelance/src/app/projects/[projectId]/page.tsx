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
import { ChevronLeft, Calendar, CreditCard } from "lucide-react";

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

  const timeEntries = dummyTimeEntries.filter((t) => t.projectId === projectId);
  const tasks = dummyTasks.filter((t) => t.projectId === projectId);
  const chatMessages = dummyChatMessages.filter((c) => c.projectId === projectId);
  const links = dummyLinks.filter((l) => l.projectId === projectId);
  const documents = dummyDocuments.filter((d) => d.projectId === projectId);
  const notes = dummyNotes.filter((n) => n.projectId === projectId);
  const payments = dummyPayments.filter((p) => p.projectId === projectId);
  const milestones = dummyMilestones.filter((m) => m.projectId === projectId);

  const dateRange = formatDateRange(project.startDate, project.endDate);

  return (
    <div className="max-w-[1400px]">
      {/* Breadcrumb */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-6"
      >
        <ChevronLeft size={16} />
        My projects
      </Link>

      {/* Project header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{project.name}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]">
          {project.clientName && (
            <span className="font-medium text-[var(--foreground)]">{project.clientName}</span>
          )}
          {dateRange && (
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {dateRange}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <CreditCard size={13} />
            {billingLabels[project.billingType]}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
            Active
          </span>
        </div>
      </div>

      {/* Row 1: Meetings | Time Track | Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 mb-4">
        <MeetingsCard projectId={projectId} />
        <TimeTrackCard projectId={projectId} entries={timeEntries} />
        <TasksCard projectId={projectId} tasks={tasks} />
      </div>

      {/* Row 2: Chat | Links | Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_2fr] gap-4 mb-4">
        <ChatCard projectId={projectId} messages={chatMessages} />
        <LinksCard projectId={projectId} links={links} />
        <DocumentsCard projectId={projectId} documents={documents} />
      </div>

      {/* Row 3: Notes | Timeline | Payments | Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <NotesCard projectId={projectId} notes={notes} />
        <TimelineCard
          projectId={projectId}
          milestones={milestones}
          startDate={project.startDate}
          endDate={project.endDate}
        />
        <PaymentsCard projectId={projectId} payments={payments} />
        <StatsCard
          projectId={projectId}
          timeEntries={timeEntries}
          payments={payments}
          tasks={tasks}
          milestones={milestones}
        />
      </div>
    </div>
  );
}

function formatDateRange(start?: string, end?: string): string | null {
  if (!start) return null;
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  if (end) return `${fmt(start)} – ${fmt(end)}`;
  return `From ${fmt(start)}`;
}
