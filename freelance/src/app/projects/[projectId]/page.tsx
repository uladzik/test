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

  return (
    <div>
      {/* Project header */}
      <h1 className="text-3xl font-bold mb-1">{project.name}</h1>
      <div className="flex items-center gap-4 mb-8">
        {project.clientName && (
          <span className="text-sm text-[var(--muted)]">{project.clientName}</span>
        )}
      </div>

      {/* Row 1: Meetings | Time Track | Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 mb-4">
        <MeetingsCard projectId={projectId} />
        <TimeTrackCard projectId={projectId} entries={timeEntries} />
        <TasksCard projectId={projectId} tasks={tasks} />
      </div>

      {/* Row 2: Chat | Links | Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_2fr] gap-4 mb-4">
        <ChatCard projectId={projectId} messages={chatMessages} />
        <LinksCard projectId={projectId} links={links} />
        <DocumentsCard projectId={projectId} documents={documents} />
      </div>

      {/* Row 3: Notes | Timeline | Payments | Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
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
