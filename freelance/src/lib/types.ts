export type BillingType = "monthly" | "fixed" | "hourly";
export type ProjectStatus = "active" | "paused" | "completed" | "archived";

export interface Project {
  id: string;
  name: string;
  description?: string;
  coverUrl?: string;
  clientName?: string;
  billingType: BillingType;
  currency: string;
  startDate?: string;
  endDate?: string;
  status: ProjectStatus;
  createdAt: string;
  coverGradient?: string;
}

export interface Meeting {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  meetingType: "call" | "video" | "in_person";
  location?: string;
}

export interface Task {
  id: string;
  projectId: string;
  meetingId?: string;
  milestoneId?: string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  scheduledStart?: string;
  scheduledEnd?: string;
  color?: string;
}

export interface TimeEntry {
  id: string;
  projectId: string;
  taskId?: string;
  description?: string;
  startTime: string;
  endTime?: string;
  durationMinutes?: number;
  category?: string;
}

export interface Note {
  id: string;
  projectId: string;
  title?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  projectId: string;
  content: string;
  messageType: "text" | "call_log" | "system";
  createdAt: string;
}

export interface Link {
  id: string;
  projectId: string;
  label: string;
  url: string;
  linkType: "figma" | "notion" | "drive" | "prototype" | "other";
}

export interface Document {
  id: string;
  projectId: string;
  title: string;
  docType: "brief" | "agreement" | "report" | "other";
  storageUrl?: string;
  fileSize?: number;
  isFavorite: boolean;
  createdAt: string;
}

export interface Payment {
  id: string;
  projectId: string;
  amount: number;
  currency: string;
  periodStart?: string;
  periodEnd?: string;
  status: "pending" | "sent" | "paid" | "overdue";
  description?: string;
}

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: "pending" | "in_progress" | "completed";
  sortOrder: number;
}
