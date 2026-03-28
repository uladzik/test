import { Project, Meeting, TimeEntry, Task, ChatMessage, Link, Document, Note, Payment, Milestone } from "./types";

export const dummyProjects: Project[] = [
  {
    id: "1",
    name: "Acme Rebrand",
    description: "Full brand identity refresh — logo, guidelines, web presence",
    clientName: "Acme Corp",
    billingType: "monthly",
    currency: "USD",
    startDate: "2026-01-10",
    endDate: "2026-04-30",
    status: "active",
    createdAt: "2026-01-10T00:00:00Z",
    coverGradient: "from-violet-500 via-purple-500 to-fuchsia-500",
  },
  {
    id: "2",
    name: "Starter iOS App",
    description: "MVP mobile app — onboarding, dashboard, payments",
    clientName: "StartupCo",
    billingType: "fixed",
    currency: "USD",
    startDate: "2026-02-01",
    endDate: "2026-07-31",
    status: "active",
    createdAt: "2026-02-01T00:00:00Z",
    coverGradient: "from-cyan-500 via-blue-500 to-indigo-500",
  },
  {
    id: "3",
    name: "RetailBrand Store",
    description: "E-commerce redesign — product pages, checkout, CMS",
    clientName: "RetailBrand",
    billingType: "hourly",
    currency: "EUR",
    startDate: "2026-03-01",
    endDate: "2026-06-15",
    status: "active",
    createdAt: "2026-03-01T00:00:00Z",
    coverGradient: "from-emerald-500 via-teal-500 to-cyan-500",
  },
  {
    id: "4",
    name: "Paused — Delta SaaS",
    description: "Dashboard analytics platform (on hold)",
    clientName: "Delta Analytics",
    billingType: "monthly",
    currency: "USD",
    startDate: "2025-11-01",
    endDate: "2026-03-01",
    status: "paused",
    createdAt: "2025-11-01T00:00:00Z",
    coverGradient: "from-amber-400 via-orange-400 to-red-400",
  },
  {
    id: "5",
    name: "Zen Wellness Site",
    description: "Marketing site + booking integration",
    clientName: "Zen Studio",
    billingType: "fixed",
    currency: "USD",
    startDate: "2025-09-01",
    endDate: "2025-12-15",
    status: "completed",
    createdAt: "2025-09-01T00:00:00Z",
    coverGradient: "from-rose-400 via-pink-400 to-purple-400",
  },
];

// ── PROJECT 1: Acme Rebrand ──────────────────────────

export const dummyMeetings: Meeting[] = [
  { id: "m1", projectId: "1", title: "Morning standup", startTime: "2026-03-28T08:30:00Z", endTime: "2026-03-28T09:00:00Z", meetingType: "call" },
  { id: "m2", projectId: "1", title: "Design review w/ client", startTime: "2026-03-28T14:00:00Z", endTime: "2026-03-28T15:00:00Z", meetingType: "video" },
  { id: "m3", projectId: "1", title: "Weekly sync", startTime: "2026-03-30T12:00:00Z", endTime: "2026-03-30T12:30:00Z", meetingType: "video" },
  { id: "m4", projectId: "2", title: "Sprint planning", startTime: "2026-03-28T10:00:00Z", endTime: "2026-03-28T11:00:00Z", meetingType: "video" },
  { id: "m5", projectId: "2", title: "QA walkthrough", startTime: "2026-03-29T15:00:00Z", endTime: "2026-03-29T16:00:00Z", meetingType: "call" },
  { id: "m6", projectId: "3", title: "Kickoff call", startTime: "2026-03-28T11:00:00Z", endTime: "2026-03-28T12:00:00Z", meetingType: "video" },
];

export const dummyTimeEntries: TimeEntry[] = [
  // Project 1
  { id: "t1", projectId: "1", description: "Logo concepts v3", startTime: "2026-03-28T09:00:00Z", endTime: "2026-03-28T11:25:00Z", durationMinutes: 145, category: "Branding / Design" },
  { id: "t2", projectId: "1", description: "Typography system", startTime: "2026-03-27T10:00:00Z", endTime: "2026-03-27T11:22:00Z", durationMinutes: 82, category: "Branding / Design" },
  { id: "t3", projectId: "1", description: "Color palette refinement", startTime: "2026-03-26T09:00:00Z", endTime: "2026-03-26T09:50:00Z", durationMinutes: 50, category: "Branding / Design" },
  { id: "t4", projectId: "1", description: "Brand guide layout", startTime: "2026-03-25T08:00:00Z", endTime: "2026-03-25T11:24:00Z", durationMinutes: 204, category: "Documentation" },
  { id: "t5", projectId: "1", description: "Client feedback review", startTime: "2026-03-24T14:00:00Z", endTime: "2026-03-24T15:30:00Z", durationMinutes: 90, category: "Communication" },
  // Project 2
  { id: "t6", projectId: "2", description: "Onboarding flow wireframes", startTime: "2026-03-28T13:00:00Z", endTime: "2026-03-28T16:00:00Z", durationMinutes: 180, category: "UX / Wireframes" },
  { id: "t7", projectId: "2", description: "Dashboard components", startTime: "2026-03-27T09:00:00Z", endTime: "2026-03-27T12:30:00Z", durationMinutes: 210, category: "UI Design" },
  { id: "t8", projectId: "2", description: "Payment screen mockup", startTime: "2026-03-26T10:00:00Z", endTime: "2026-03-26T12:00:00Z", durationMinutes: 120, category: "UI Design" },
  // Project 3
  { id: "t9", projectId: "3", description: "Product page layout", startTime: "2026-03-28T09:00:00Z", endTime: "2026-03-28T11:00:00Z", durationMinutes: 120, category: "E-commerce / Design" },
  { id: "t10", projectId: "3", description: "Checkout flow UX", startTime: "2026-03-27T14:00:00Z", endTime: "2026-03-27T17:00:00Z", durationMinutes: 180, category: "UX Research" },
];

export const dummyTasks: Task[] = [
  // Project 1
  { id: "tk1", projectId: "1", title: "Morning standup", status: "done", priority: "medium", dueDate: "2026-03-28", scheduledStart: "08:30", scheduledEnd: "09:00", color: "#dbeafe" },
  { id: "tk2", projectId: "1", title: "Logo concepts v3", status: "in_progress", priority: "high", dueDate: "2026-03-28", scheduledStart: "09:00", scheduledEnd: "11:00", color: "#fef3c7" },
  { id: "tk3", projectId: "1", title: "Design review w/ client", status: "todo", priority: "high", dueDate: "2026-03-28", scheduledStart: "14:00", scheduledEnd: "15:00", color: "#dcfce7" },
  { id: "tk4", projectId: "1", title: "Update brand guide", status: "todo", priority: "medium", dueDate: "2026-03-29" },
  { id: "tk5", projectId: "1", title: "Prepare mockup presentation", status: "todo", priority: "low", dueDate: "2026-03-30" },
  { id: "tk6", projectId: "1", title: "Social media templates", status: "done", priority: "medium", dueDate: "2026-03-25" },
  { id: "tk7", projectId: "1", title: "Business card design", status: "done", priority: "low", dueDate: "2026-03-22" },
  // Project 2
  { id: "tk8", projectId: "2", title: "Onboarding flow wireframes", status: "in_progress", priority: "high", dueDate: "2026-03-28", scheduledStart: "10:00", scheduledEnd: "12:00", color: "#e0e7ff" },
  { id: "tk9", projectId: "2", title: "Dashboard UI components", status: "in_progress", priority: "high", dueDate: "2026-03-29" },
  { id: "tk10", projectId: "2", title: "Payment screen design", status: "todo", priority: "medium", dueDate: "2026-03-31" },
  { id: "tk11", projectId: "2", title: "App icon design", status: "done", priority: "low", dueDate: "2026-03-20" },
  // Project 3
  { id: "tk12", projectId: "3", title: "Product page layout", status: "in_progress", priority: "high", dueDate: "2026-03-28" },
  { id: "tk13", projectId: "3", title: "Category navigation UX", status: "todo", priority: "medium", dueDate: "2026-04-01" },
  { id: "tk14", projectId: "3", title: "Checkout flow design", status: "todo", priority: "high", dueDate: "2026-04-05" },
];

export const dummyChatMessages: ChatMessage[] = [
  { id: "c1", projectId: "1", content: "Logo v3 looks great — let's go with direction B", messageType: "text", createdAt: "2026-03-28T10:15:00Z" },
  { id: "c2", projectId: "1", content: "Can we make the purple a bit deeper?", messageType: "text", createdAt: "2026-03-27T16:30:00Z" },
  { id: "c3", projectId: "1", content: "Call — 12 min", messageType: "call_log", createdAt: "2026-03-26T09:00:00Z" },
  { id: "c4", projectId: "1", content: "Sent updated brand guide PDF", messageType: "system", createdAt: "2026-03-25T14:00:00Z" },
  { id: "c5", projectId: "2", content: "Onboarding screens approved!", messageType: "text", createdAt: "2026-03-28T09:00:00Z" },
  { id: "c6", projectId: "2", content: "Need push notification flow added", messageType: "text", createdAt: "2026-03-27T11:00:00Z" },
  { id: "c7", projectId: "3", content: "Product grid looks perfect", messageType: "text", createdAt: "2026-03-28T10:00:00Z" },
  { id: "c8", projectId: "3", content: "Call — 25 min, discussed checkout", messageType: "call_log", createdAt: "2026-03-27T15:00:00Z" },
];

export const dummyLinks: Link[] = [
  { id: "l1", projectId: "1", label: "Brand Guidelines — Figma", url: "https://figma.com/acme-brand", linkType: "figma" },
  { id: "l2", projectId: "1", label: "Project Brief — Notion", url: "https://notion.so/acme-brief", linkType: "notion" },
  { id: "l3", projectId: "1", label: "Assets folder — Drive", url: "https://drive.google.com/acme", linkType: "drive" },
  { id: "l4", projectId: "1", label: "Landing page prototype", url: "https://figma.com/proto/acme", linkType: "prototype" },
  { id: "l5", projectId: "2", label: "App Screens — Figma", url: "https://figma.com/starter-app", linkType: "figma" },
  { id: "l6", projectId: "2", label: "Sprint Board — Notion", url: "https://notion.so/starter", linkType: "notion" },
  { id: "l7", projectId: "3", label: "Store Design — Figma", url: "https://figma.com/retail", linkType: "figma" },
  { id: "l8", projectId: "3", label: "Product Data — Drive", url: "https://drive.google.com/retail", linkType: "drive" },
];

export const dummyDocuments: Document[] = [
  { id: "d1", projectId: "1", title: "Brand Guidelines v3", docType: "brief", isFavorite: true, createdAt: "2026-03-20T00:00:00Z" },
  { id: "d2", projectId: "1", title: "Logo Concepts PDF", docType: "report", isFavorite: true, createdAt: "2026-03-15T00:00:00Z" },
  { id: "d3", projectId: "1", title: "Color Palette Reference", docType: "other", isFavorite: true, createdAt: "2026-03-10T00:00:00Z" },
  { id: "d4", projectId: "1", title: "NDA — Signed Agreement", docType: "agreement", isFavorite: false, createdAt: "2026-01-10T00:00:00Z" },
  { id: "d5", projectId: "1", title: "Project Brief — Jan 2026", docType: "brief", isFavorite: false, createdAt: "2026-01-12T00:00:00Z" },
  { id: "d6", projectId: "1", title: "Invoice template", docType: "other", isFavorite: false, createdAt: "2026-02-01T00:00:00Z" },
  { id: "d7", projectId: "2", title: "App Requirements Doc", docType: "brief", isFavorite: true, createdAt: "2026-02-05T00:00:00Z" },
  { id: "d8", projectId: "2", title: "Wireframes Export", docType: "report", isFavorite: false, createdAt: "2026-03-10T00:00:00Z" },
  { id: "d9", projectId: "3", title: "E-commerce UX Audit", docType: "report", isFavorite: true, createdAt: "2026-03-05T00:00:00Z" },
  { id: "d10", projectId: "3", title: "Product Schema", docType: "other", isFavorite: false, createdAt: "2026-03-08T00:00:00Z" },
];

export const dummyNotes: Note[] = [
  { id: "n1", projectId: "1", title: "Client preferences", content: "Prefers minimalist design. Loves deep purple + white. No gradients on cards. Serif font for headings only.", createdAt: "2026-03-15T10:00:00Z", updatedAt: "2026-03-27T14:30:00Z" },
  { id: "n2", projectId: "1", title: "Meeting takeaways — Mar 25", content: "Logo direction B approved. Need to finalize by Friday. Business cards rush order.", createdAt: "2026-03-25T09:00:00Z", updatedAt: "2026-03-25T09:00:00Z" },
  { id: "n3", projectId: "1", title: "Competitor analysis", content: "Checked 5 competitors. Most use blue/gray palettes. Our purple angle is unique — client happy.", createdAt: "2026-02-10T11:00:00Z", updatedAt: "2026-02-12T16:00:00Z" },
  { id: "n4", projectId: "2", title: "Tech constraints", content: "iOS 16+ only. Must use SwiftUI. Stripe for payments. Push via Firebase.", createdAt: "2026-02-01T10:00:00Z", updatedAt: "2026-03-15T11:00:00Z" },
  { id: "n5", projectId: "2", title: "Onboarding feedback", content: "Users skip tutorial. Reduce to 2 steps max. Add progress indicator.", createdAt: "2026-03-20T14:00:00Z", updatedAt: "2026-03-22T09:00:00Z" },
  { id: "n6", projectId: "3", title: "Store requirements", content: "~500 SKUs at launch. Need filtering by size/color/price. Shopify backend stays.", createdAt: "2026-03-01T10:00:00Z", updatedAt: "2026-03-05T16:00:00Z" },
];

export const dummyPayments: Payment[] = [
  // Project 1
  { id: "p1", projectId: "1", amount: 4500, currency: "USD", periodStart: "2026-01-01", periodEnd: "2026-01-31", status: "paid", description: "January retainer" },
  { id: "p2", projectId: "1", amount: 4500, currency: "USD", periodStart: "2026-02-01", periodEnd: "2026-02-28", status: "paid", description: "February retainer" },
  { id: "p3", projectId: "1", amount: 4500, currency: "USD", periodStart: "2026-03-01", periodEnd: "2026-03-31", status: "sent", description: "March retainer" },
  { id: "p4", projectId: "1", amount: 4500, currency: "USD", periodStart: "2026-04-01", periodEnd: "2026-04-30", status: "pending", description: "April retainer" },
  // Project 2
  { id: "p5", projectId: "2", amount: 12000, currency: "USD", periodStart: "2026-02-01", periodEnd: "2026-04-30", status: "paid", description: "Phase 1 — Design" },
  { id: "p6", projectId: "2", amount: 12000, currency: "USD", periodStart: "2026-05-01", periodEnd: "2026-07-31", status: "pending", description: "Phase 2 — Development" },
  // Project 3
  { id: "p7", projectId: "3", amount: 3200, currency: "EUR", periodStart: "2026-03-01", periodEnd: "2026-03-31", status: "paid", description: "March — 40hrs @ €80" },
  { id: "p8", projectId: "3", amount: 2400, currency: "EUR", periodStart: "2026-04-01", periodEnd: "2026-04-30", status: "pending", description: "April estimate — 30hrs" },
];

export const dummyMilestones: Milestone[] = [
  // Project 1
  { id: "ms1", projectId: "1", title: "Discovery & research", description: "Competitor audit, moodboards", dueDate: "2026-01-24", status: "completed", sortOrder: 1 },
  { id: "ms2", projectId: "1", title: "Logo concepts", description: "3 directions, client review", dueDate: "2026-02-07", status: "completed", sortOrder: 2 },
  { id: "ms3", projectId: "1", title: "Brand guidelines", description: "Colors, type, usage rules", dueDate: "2026-03-14", status: "completed", sortOrder: 3 },
  { id: "ms4", projectId: "1", title: "Collateral design", description: "Business cards, social templates", dueDate: "2026-03-28", status: "in_progress", sortOrder: 4 },
  { id: "ms5", projectId: "1", title: "Website design", description: "Landing + 3 inner pages", dueDate: "2026-04-15", status: "pending", sortOrder: 5 },
  { id: "ms6", projectId: "1", title: "Final delivery", description: "All assets + handoff", dueDate: "2026-04-30", status: "pending", sortOrder: 6 },
  // Project 2
  { id: "ms7", projectId: "2", title: "UX research", dueDate: "2026-02-15", status: "completed", sortOrder: 1 },
  { id: "ms8", projectId: "2", title: "Wireframes", dueDate: "2026-03-01", status: "completed", sortOrder: 2 },
  { id: "ms9", projectId: "2", title: "UI design", dueDate: "2026-04-01", status: "in_progress", sortOrder: 3 },
  { id: "ms10", projectId: "2", title: "Prototype & testing", dueDate: "2026-05-15", status: "pending", sortOrder: 4 },
  { id: "ms11", projectId: "2", title: "Dev handoff", dueDate: "2026-06-30", status: "pending", sortOrder: 5 },
  // Project 3
  { id: "ms12", projectId: "3", title: "UX audit", dueDate: "2026-03-15", status: "completed", sortOrder: 1 },
  { id: "ms13", projectId: "3", title: "Product page redesign", dueDate: "2026-04-01", status: "in_progress", sortOrder: 2 },
  { id: "ms14", projectId: "3", title: "Checkout flow", dueDate: "2026-05-01", status: "pending", sortOrder: 3 },
  { id: "ms15", projectId: "3", title: "Launch", dueDate: "2026-06-15", status: "pending", sortOrder: 4 },
];
