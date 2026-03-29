module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/lib/dummy-data.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "dummyChatMessages": (()=>dummyChatMessages),
    "dummyDocuments": (()=>dummyDocuments),
    "dummyLinks": (()=>dummyLinks),
    "dummyMeetings": (()=>dummyMeetings),
    "dummyMilestones": (()=>dummyMilestones),
    "dummyNotes": (()=>dummyNotes),
    "dummyPayments": (()=>dummyPayments),
    "dummyProjects": (()=>dummyProjects),
    "dummyTasks": (()=>dummyTasks),
    "dummyTimeEntries": (()=>dummyTimeEntries)
});
const dummyProjects = [
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
        coverGradient: "from-stone-800 via-stone-700 to-stone-600"
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
        coverGradient: "from-zinc-700 via-zinc-600 to-stone-500"
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
        coverGradient: "from-stone-700 via-warmGray-600 to-neutral-500"
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
        coverGradient: "from-neutral-600 via-stone-500 to-stone-400"
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
        coverGradient: "from-stone-500 via-stone-400 to-stone-300"
    }
];
const dummyMeetings = [
    {
        id: "m1",
        projectId: "1",
        title: "Morning standup",
        startTime: "2026-03-28T08:30:00Z",
        endTime: "2026-03-28T09:00:00Z",
        meetingType: "call"
    },
    {
        id: "m2",
        projectId: "1",
        title: "Design review w/ client",
        startTime: "2026-03-28T14:00:00Z",
        endTime: "2026-03-28T15:00:00Z",
        meetingType: "video"
    },
    {
        id: "m3",
        projectId: "1",
        title: "Weekly sync",
        startTime: "2026-03-30T12:00:00Z",
        endTime: "2026-03-30T12:30:00Z",
        meetingType: "video"
    },
    {
        id: "m4",
        projectId: "2",
        title: "Sprint planning",
        startTime: "2026-03-28T10:00:00Z",
        endTime: "2026-03-28T11:00:00Z",
        meetingType: "video"
    },
    {
        id: "m5",
        projectId: "2",
        title: "QA walkthrough",
        startTime: "2026-03-29T15:00:00Z",
        endTime: "2026-03-29T16:00:00Z",
        meetingType: "call"
    },
    {
        id: "m6",
        projectId: "3",
        title: "Kickoff call",
        startTime: "2026-03-28T11:00:00Z",
        endTime: "2026-03-28T12:00:00Z",
        meetingType: "video"
    }
];
const dummyTimeEntries = [
    // Project 1
    {
        id: "t1",
        projectId: "1",
        description: "Logo concepts v3",
        startTime: "2026-03-28T09:00:00Z",
        endTime: "2026-03-28T11:25:00Z",
        durationMinutes: 145,
        category: "Branding / Design"
    },
    {
        id: "t2",
        projectId: "1",
        description: "Typography system",
        startTime: "2026-03-27T10:00:00Z",
        endTime: "2026-03-27T11:22:00Z",
        durationMinutes: 82,
        category: "Branding / Design"
    },
    {
        id: "t3",
        projectId: "1",
        description: "Color palette refinement",
        startTime: "2026-03-26T09:00:00Z",
        endTime: "2026-03-26T09:50:00Z",
        durationMinutes: 50,
        category: "Branding / Design"
    },
    {
        id: "t4",
        projectId: "1",
        description: "Brand guide layout",
        startTime: "2026-03-25T08:00:00Z",
        endTime: "2026-03-25T11:24:00Z",
        durationMinutes: 204,
        category: "Documentation"
    },
    {
        id: "t5",
        projectId: "1",
        description: "Client feedback review",
        startTime: "2026-03-24T14:00:00Z",
        endTime: "2026-03-24T15:30:00Z",
        durationMinutes: 90,
        category: "Communication"
    },
    // Project 2
    {
        id: "t6",
        projectId: "2",
        description: "Onboarding flow wireframes",
        startTime: "2026-03-28T13:00:00Z",
        endTime: "2026-03-28T16:00:00Z",
        durationMinutes: 180,
        category: "UX / Wireframes"
    },
    {
        id: "t7",
        projectId: "2",
        description: "Dashboard components",
        startTime: "2026-03-27T09:00:00Z",
        endTime: "2026-03-27T12:30:00Z",
        durationMinutes: 210,
        category: "UI Design"
    },
    {
        id: "t8",
        projectId: "2",
        description: "Payment screen mockup",
        startTime: "2026-03-26T10:00:00Z",
        endTime: "2026-03-26T12:00:00Z",
        durationMinutes: 120,
        category: "UI Design"
    },
    // Project 3
    {
        id: "t9",
        projectId: "3",
        description: "Product page layout",
        startTime: "2026-03-28T09:00:00Z",
        endTime: "2026-03-28T11:00:00Z",
        durationMinutes: 120,
        category: "E-commerce / Design"
    },
    {
        id: "t10",
        projectId: "3",
        description: "Checkout flow UX",
        startTime: "2026-03-27T14:00:00Z",
        endTime: "2026-03-27T17:00:00Z",
        durationMinutes: 180,
        category: "UX Research"
    }
];
const dummyTasks = [
    // Project 1
    {
        id: "tk1",
        projectId: "1",
        title: "Morning standup",
        status: "done",
        priority: "medium",
        dueDate: "2026-03-28",
        scheduledStart: "08:30",
        scheduledEnd: "09:00",
        color: "#dbeafe"
    },
    {
        id: "tk2",
        projectId: "1",
        title: "Logo concepts v3",
        status: "in_progress",
        priority: "high",
        dueDate: "2026-03-28",
        scheduledStart: "09:00",
        scheduledEnd: "11:00",
        color: "#fef3c7"
    },
    {
        id: "tk3",
        projectId: "1",
        title: "Design review w/ client",
        status: "todo",
        priority: "high",
        dueDate: "2026-03-28",
        scheduledStart: "14:00",
        scheduledEnd: "15:00",
        color: "#dcfce7"
    },
    {
        id: "tk4",
        projectId: "1",
        title: "Update brand guide",
        status: "todo",
        priority: "medium",
        dueDate: "2026-03-29"
    },
    {
        id: "tk5",
        projectId: "1",
        title: "Prepare mockup presentation",
        status: "todo",
        priority: "low",
        dueDate: "2026-03-30"
    },
    {
        id: "tk6",
        projectId: "1",
        title: "Social media templates",
        status: "done",
        priority: "medium",
        dueDate: "2026-03-25"
    },
    {
        id: "tk7",
        projectId: "1",
        title: "Business card design",
        status: "done",
        priority: "low",
        dueDate: "2026-03-22"
    },
    // Project 2
    {
        id: "tk8",
        projectId: "2",
        title: "Onboarding flow wireframes",
        status: "in_progress",
        priority: "high",
        dueDate: "2026-03-28",
        scheduledStart: "10:00",
        scheduledEnd: "12:00",
        color: "#e0e7ff"
    },
    {
        id: "tk9",
        projectId: "2",
        title: "Dashboard UI components",
        status: "in_progress",
        priority: "high",
        dueDate: "2026-03-29"
    },
    {
        id: "tk10",
        projectId: "2",
        title: "Payment screen design",
        status: "todo",
        priority: "medium",
        dueDate: "2026-03-31"
    },
    {
        id: "tk11",
        projectId: "2",
        title: "App icon design",
        status: "done",
        priority: "low",
        dueDate: "2026-03-20"
    },
    // Project 3
    {
        id: "tk12",
        projectId: "3",
        title: "Product page layout",
        status: "in_progress",
        priority: "high",
        dueDate: "2026-03-28"
    },
    {
        id: "tk13",
        projectId: "3",
        title: "Category navigation UX",
        status: "todo",
        priority: "medium",
        dueDate: "2026-04-01"
    },
    {
        id: "tk14",
        projectId: "3",
        title: "Checkout flow design",
        status: "todo",
        priority: "high",
        dueDate: "2026-04-05"
    }
];
const dummyChatMessages = [
    {
        id: "c1",
        projectId: "1",
        content: "Logo v3 looks great — let's go with direction B",
        messageType: "text",
        createdAt: "2026-03-28T10:15:00Z"
    },
    {
        id: "c2",
        projectId: "1",
        content: "Can we make the purple a bit deeper?",
        messageType: "text",
        createdAt: "2026-03-27T16:30:00Z"
    },
    {
        id: "c3",
        projectId: "1",
        content: "Call — 12 min",
        messageType: "call_log",
        createdAt: "2026-03-26T09:00:00Z"
    },
    {
        id: "c4",
        projectId: "1",
        content: "Sent updated brand guide PDF",
        messageType: "system",
        createdAt: "2026-03-25T14:00:00Z"
    },
    {
        id: "c5",
        projectId: "2",
        content: "Onboarding screens approved!",
        messageType: "text",
        createdAt: "2026-03-28T09:00:00Z"
    },
    {
        id: "c6",
        projectId: "2",
        content: "Need push notification flow added",
        messageType: "text",
        createdAt: "2026-03-27T11:00:00Z"
    },
    {
        id: "c7",
        projectId: "3",
        content: "Product grid looks perfect",
        messageType: "text",
        createdAt: "2026-03-28T10:00:00Z"
    },
    {
        id: "c8",
        projectId: "3",
        content: "Call — 25 min, discussed checkout",
        messageType: "call_log",
        createdAt: "2026-03-27T15:00:00Z"
    }
];
const dummyLinks = [
    {
        id: "l1",
        projectId: "1",
        label: "Brand Guidelines — Figma",
        url: "https://figma.com/acme-brand",
        linkType: "figma"
    },
    {
        id: "l2",
        projectId: "1",
        label: "Project Brief — Notion",
        url: "https://notion.so/acme-brief",
        linkType: "notion"
    },
    {
        id: "l3",
        projectId: "1",
        label: "Assets folder — Drive",
        url: "https://drive.google.com/acme",
        linkType: "drive"
    },
    {
        id: "l4",
        projectId: "1",
        label: "Landing page prototype",
        url: "https://figma.com/proto/acme",
        linkType: "prototype"
    },
    {
        id: "l5",
        projectId: "2",
        label: "App Screens — Figma",
        url: "https://figma.com/starter-app",
        linkType: "figma"
    },
    {
        id: "l6",
        projectId: "2",
        label: "Sprint Board — Notion",
        url: "https://notion.so/starter",
        linkType: "notion"
    },
    {
        id: "l7",
        projectId: "3",
        label: "Store Design — Figma",
        url: "https://figma.com/retail",
        linkType: "figma"
    },
    {
        id: "l8",
        projectId: "3",
        label: "Product Data — Drive",
        url: "https://drive.google.com/retail",
        linkType: "drive"
    }
];
const dummyDocuments = [
    {
        id: "d1",
        projectId: "1",
        title: "Brand Guidelines v3",
        docType: "brief",
        isFavorite: true,
        createdAt: "2026-03-20T00:00:00Z"
    },
    {
        id: "d2",
        projectId: "1",
        title: "Logo Concepts PDF",
        docType: "report",
        isFavorite: true,
        createdAt: "2026-03-15T00:00:00Z"
    },
    {
        id: "d3",
        projectId: "1",
        title: "Color Palette Reference",
        docType: "other",
        isFavorite: true,
        createdAt: "2026-03-10T00:00:00Z"
    },
    {
        id: "d4",
        projectId: "1",
        title: "NDA — Signed Agreement",
        docType: "agreement",
        isFavorite: false,
        createdAt: "2026-01-10T00:00:00Z"
    },
    {
        id: "d5",
        projectId: "1",
        title: "Project Brief — Jan 2026",
        docType: "brief",
        isFavorite: false,
        createdAt: "2026-01-12T00:00:00Z"
    },
    {
        id: "d6",
        projectId: "1",
        title: "Invoice template",
        docType: "other",
        isFavorite: false,
        createdAt: "2026-02-01T00:00:00Z"
    },
    {
        id: "d7",
        projectId: "2",
        title: "App Requirements Doc",
        docType: "brief",
        isFavorite: true,
        createdAt: "2026-02-05T00:00:00Z"
    },
    {
        id: "d8",
        projectId: "2",
        title: "Wireframes Export",
        docType: "report",
        isFavorite: false,
        createdAt: "2026-03-10T00:00:00Z"
    },
    {
        id: "d9",
        projectId: "3",
        title: "E-commerce UX Audit",
        docType: "report",
        isFavorite: true,
        createdAt: "2026-03-05T00:00:00Z"
    },
    {
        id: "d10",
        projectId: "3",
        title: "Product Schema",
        docType: "other",
        isFavorite: false,
        createdAt: "2026-03-08T00:00:00Z"
    }
];
const dummyNotes = [
    {
        id: "n1",
        projectId: "1",
        title: "Client preferences",
        content: "Prefers minimalist design. Loves deep purple + white. No gradients on cards. Serif font for headings only.",
        createdAt: "2026-03-15T10:00:00Z",
        updatedAt: "2026-03-27T14:30:00Z"
    },
    {
        id: "n2",
        projectId: "1",
        title: "Meeting takeaways — Mar 25",
        content: "Logo direction B approved. Need to finalize by Friday. Business cards rush order.",
        createdAt: "2026-03-25T09:00:00Z",
        updatedAt: "2026-03-25T09:00:00Z"
    },
    {
        id: "n3",
        projectId: "1",
        title: "Competitor analysis",
        content: "Checked 5 competitors. Most use blue/gray palettes. Our purple angle is unique — client happy.",
        createdAt: "2026-02-10T11:00:00Z",
        updatedAt: "2026-02-12T16:00:00Z"
    },
    {
        id: "n4",
        projectId: "2",
        title: "Tech constraints",
        content: "iOS 16+ only. Must use SwiftUI. Stripe for payments. Push via Firebase.",
        createdAt: "2026-02-01T10:00:00Z",
        updatedAt: "2026-03-15T11:00:00Z"
    },
    {
        id: "n5",
        projectId: "2",
        title: "Onboarding feedback",
        content: "Users skip tutorial. Reduce to 2 steps max. Add progress indicator.",
        createdAt: "2026-03-20T14:00:00Z",
        updatedAt: "2026-03-22T09:00:00Z"
    },
    {
        id: "n6",
        projectId: "3",
        title: "Store requirements",
        content: "~500 SKUs at launch. Need filtering by size/color/price. Shopify backend stays.",
        createdAt: "2026-03-01T10:00:00Z",
        updatedAt: "2026-03-05T16:00:00Z"
    }
];
const dummyPayments = [
    // Project 1
    {
        id: "p1",
        projectId: "1",
        amount: 4500,
        currency: "USD",
        periodStart: "2026-01-01",
        periodEnd: "2026-01-31",
        status: "paid",
        description: "January retainer"
    },
    {
        id: "p2",
        projectId: "1",
        amount: 4500,
        currency: "USD",
        periodStart: "2026-02-01",
        periodEnd: "2026-02-28",
        status: "paid",
        description: "February retainer"
    },
    {
        id: "p3",
        projectId: "1",
        amount: 4500,
        currency: "USD",
        periodStart: "2026-03-01",
        periodEnd: "2026-03-31",
        status: "sent",
        description: "March retainer"
    },
    {
        id: "p4",
        projectId: "1",
        amount: 4500,
        currency: "USD",
        periodStart: "2026-04-01",
        periodEnd: "2026-04-30",
        status: "pending",
        description: "April retainer"
    },
    // Project 2
    {
        id: "p5",
        projectId: "2",
        amount: 12000,
        currency: "USD",
        periodStart: "2026-02-01",
        periodEnd: "2026-04-30",
        status: "paid",
        description: "Phase 1 — Design"
    },
    {
        id: "p6",
        projectId: "2",
        amount: 12000,
        currency: "USD",
        periodStart: "2026-05-01",
        periodEnd: "2026-07-31",
        status: "pending",
        description: "Phase 2 — Development"
    },
    // Project 3
    {
        id: "p7",
        projectId: "3",
        amount: 3200,
        currency: "EUR",
        periodStart: "2026-03-01",
        periodEnd: "2026-03-31",
        status: "paid",
        description: "March — 40hrs @ €80"
    },
    {
        id: "p8",
        projectId: "3",
        amount: 2400,
        currency: "EUR",
        periodStart: "2026-04-01",
        periodEnd: "2026-04-30",
        status: "pending",
        description: "April estimate — 30hrs"
    }
];
const dummyMilestones = [
    // Project 1
    {
        id: "ms1",
        projectId: "1",
        title: "Discovery & research",
        description: "Competitor audit, moodboards",
        dueDate: "2026-01-24",
        status: "completed",
        sortOrder: 1
    },
    {
        id: "ms2",
        projectId: "1",
        title: "Logo concepts",
        description: "3 directions, client review",
        dueDate: "2026-02-07",
        status: "completed",
        sortOrder: 2
    },
    {
        id: "ms3",
        projectId: "1",
        title: "Brand guidelines",
        description: "Colors, type, usage rules",
        dueDate: "2026-03-14",
        status: "completed",
        sortOrder: 3
    },
    {
        id: "ms4",
        projectId: "1",
        title: "Collateral design",
        description: "Business cards, social templates",
        dueDate: "2026-03-28",
        status: "in_progress",
        sortOrder: 4
    },
    {
        id: "ms5",
        projectId: "1",
        title: "Website design",
        description: "Landing + 3 inner pages",
        dueDate: "2026-04-15",
        status: "pending",
        sortOrder: 5
    },
    {
        id: "ms6",
        projectId: "1",
        title: "Final delivery",
        description: "All assets + handoff",
        dueDate: "2026-04-30",
        status: "pending",
        sortOrder: 6
    },
    // Project 2
    {
        id: "ms7",
        projectId: "2",
        title: "UX research",
        dueDate: "2026-02-15",
        status: "completed",
        sortOrder: 1
    },
    {
        id: "ms8",
        projectId: "2",
        title: "Wireframes",
        dueDate: "2026-03-01",
        status: "completed",
        sortOrder: 2
    },
    {
        id: "ms9",
        projectId: "2",
        title: "UI design",
        dueDate: "2026-04-01",
        status: "in_progress",
        sortOrder: 3
    },
    {
        id: "ms10",
        projectId: "2",
        title: "Prototype & testing",
        dueDate: "2026-05-15",
        status: "pending",
        sortOrder: 4
    },
    {
        id: "ms11",
        projectId: "2",
        title: "Dev handoff",
        dueDate: "2026-06-30",
        status: "pending",
        sortOrder: 5
    },
    // Project 3
    {
        id: "ms12",
        projectId: "3",
        title: "UX audit",
        dueDate: "2026-03-15",
        status: "completed",
        sortOrder: 1
    },
    {
        id: "ms13",
        projectId: "3",
        title: "Product page redesign",
        dueDate: "2026-04-01",
        status: "in_progress",
        sortOrder: 2
    },
    {
        id: "ms14",
        projectId: "3",
        title: "Checkout flow",
        dueDate: "2026-05-01",
        status: "pending",
        sortOrder: 3
    },
    {
        id: "ms15",
        projectId: "3",
        title: "Launch",
        dueDate: "2026-06-15",
        status: "pending",
        sortOrder: 4
    }
];
}}),
"[project]/src/components/layout/sidebar.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Sidebar": (()=>Sidebar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/folder-open.js [app-ssr] (ecmascript) <export default as FolderOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-ssr] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-ssr] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-ssr] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-ssr] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dummy$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dummy-data.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function Sidebar() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [mobileOpen, setMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectsExpanded, setProjectsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [dark, setDark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setDark(document.documentElement.classList.contains("dark"));
    }, []);
    function toggleDark() {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        try {
            localStorage.setItem("theme", next ? "dark" : "light");
        } catch  {}
    }
    const activeProjects = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dummy$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dummyProjects"].filter((p)=>p.status === "active");
    const otherProjects = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dummy$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dummyProjects"].filter((p)=>p.status !== "active");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden fixed top-0 left-0 right-0 h-14 glass border-b border-[var(--border)] flex items-center px-4 z-30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setMobileOpen(true),
                        "aria-label": "Open menu",
                        className: "p-2 rounded-lg hover:bg-[var(--accent-bg)] transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/sidebar.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/sidebar.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-3 font-semibold text-sm",
                        children: "Freelance Portal"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/sidebar.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-auto flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleDark,
                                className: "p-2 rounded-lg hover:bg-[var(--accent-bg)] transition-colors",
                                "aria-label": "Toggle dark mode",
                                children: dark ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/sidebar.tsx",
                                    lineNumber: 61,
                                    columnNumber: 21
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/sidebar.tsx",
                                    lineNumber: 61,
                                    columnNumber: 41
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "relative p-2 rounded-lg hover:bg-[var(--accent-bg)] transition-colors",
                                "aria-label": "Notifications",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                        size: 16,
                                        className: "text-[var(--muted)]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/sidebar.tsx",
                                        lineNumber: 64,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--danger)] rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/sidebar.tsx",
                                        lineNumber: 65,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/sidebar.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/sidebar.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            mobileOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden fixed inset-0 bg-black/30 dark:bg-black/50 z-40 transition-opacity",
                onClick: ()=>setMobileOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/sidebar.tsx",
                lineNumber: 72,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `fixed top-0 h-full w-[var(--sidebar-width)] bg-[var(--card)] border-r border-[var(--border)] flex flex-col z-50
          transition-transform duration-300 ease-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between p-5 pb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] flex items-center justify-center text-white text-sm font-semibold shadow-sm",
                                                children: "U"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                                lineNumber: 88,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[var(--success)] rounded-full border-2 border-[var(--card)]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                                lineNumber: 92,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/sidebar.tsx",
                                        lineNumber: 87,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold text-sm leading-tight",
                                                children: "Ulad"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                                lineNumber: 95,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-[var(--muted)]",
                                                children: "Freelancer"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                                lineNumber: 96,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/sidebar.tsx",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "lg:hidden p-1.5 rounded-lg hover:bg-[var(--accent-bg)] transition-colors",
                                onClick: ()=>setMobileOpen(false),
                                "aria-label": "Close menu",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/sidebar.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "hidden lg:flex p-1.5 rounded-lg hover:bg-[var(--accent-bg)] transition-colors relative",
                                "aria-label": "Notifications",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                        size: 18,
                                        className: "text-[var(--muted)]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/sidebar.tsx",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute top-0.5 right-0.5 min-w-[16px] h-4 bg-[var(--danger)] rounded-full text-[9px] font-bold text-white flex items-center justify-center px-1",
                                        children: "3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/sidebar.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/sidebar.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 mb-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    size: 15,
                                    className: "absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-light)]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/sidebar.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Search anything...",
                                    "aria-label": "Search projects and content",
                                    className: "w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)] transition-all placeholder:text-[var(--muted-light)]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/sidebar.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/sidebar.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/sidebar.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex flex-col gap-0.5 px-3 mb-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/projects",
                            className: `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${pathname === "/projects" || pathname === "/" ? "bg-[var(--accent-bg)] text-[var(--accent)] font-medium" : "text-[var(--muted)] hover:bg-[var(--background)] hover:text-[var(--foreground)]"}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderOpen$3e$__["FolderOpen"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/sidebar.tsx",
                                    lineNumber: 137,
                                    columnNumber: 13
                                }, this),
                                "My projects"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/sidebar.tsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/sidebar.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-3 flex-1 overflow-y-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setProjectsExpanded(!projectsExpanded),
                                className: "flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-[var(--muted)] uppercase tracking-widest w-full hover:text-[var(--foreground)] transition-colors",
                                children: [
                                    projectsExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/sidebar.tsx",
                                        lineNumber: 148,
                                        columnNumber: 33
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/sidebar.tsx",
                                        lineNumber: 148,
                                        columnNumber: 61
                                    }, this),
                                    "Projects"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `overflow-hidden transition-all duration-300 ease-out ${projectsExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`,
                                children: [
                                    activeProjects.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "px-3 py-1 text-[10px] font-medium text-[var(--success)] uppercase tracking-wider",
                                                children: "Active"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                                lineNumber: 160,
                                                columnNumber: 17
                                            }, this),
                                            activeProjects.map((project)=>{
                                                const isActive = pathname === `/projects/${project.id}`;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/projects/${project.id}`,
                                                    onClick: ()=>setMobileOpen(false),
                                                    className: `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-all ${isActive ? "bg-[var(--accent-bg)] text-[var(--accent)] font-medium" : "text-[var(--muted)] hover:bg-[var(--background)] hover:text-[var(--foreground)]"}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"], {
                                                            size: 14,
                                                            className: "shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/sidebar.tsx",
                                                            lineNumber: 176,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "truncate",
                                                            children: project.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/sidebar.tsx",
                                                            lineNumber: 177,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, project.id, true, {
                                                    fileName: "[project]/src/components/layout/sidebar.tsx",
                                                    lineNumber: 166,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/sidebar.tsx",
                                        lineNumber: 159,
                                        columnNumber: 15
                                    }, this),
                                    otherProjects.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "px-3 py-1 text-[10px] font-medium text-[var(--muted-light)] uppercase tracking-wider",
                                                children: "Other"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                                lineNumber: 187,
                                                columnNumber: 17
                                            }, this),
                                            otherProjects.map((project)=>{
                                                const isActive = pathname === `/projects/${project.id}`;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/projects/${project.id}`,
                                                    onClick: ()=>setMobileOpen(false),
                                                    className: `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-all ${isActive ? "bg-[var(--accent-bg)] text-[var(--accent)] font-medium" : "text-[var(--muted-light)] hover:bg-[var(--background)] hover:text-[var(--foreground)]"}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"], {
                                                            size: 14,
                                                            className: "shrink-0 opacity-50"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/sidebar.tsx",
                                                            lineNumber: 203,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "truncate",
                                                            children: project.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/sidebar.tsx",
                                                            lineNumber: 204,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, project.id, true, {
                                                    fileName: "[project]/src/components/layout/sidebar.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/sidebar.tsx",
                                        lineNumber: 186,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/sidebar.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 pt-2 space-y-2 border-t border-[var(--border)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleDark,
                                className: "flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm text-[var(--muted)] hover:bg-[var(--background)] hover:text-[var(--foreground)] transition-all",
                                children: [
                                    dark ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/sidebar.tsx",
                                        lineNumber: 220,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/sidebar.tsx",
                                        lineNumber: 220,
                                        columnNumber: 41
                                    }, this),
                                    dark ? "Light mode" : "Dark mode"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                lineNumber: 216,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/sidebar.tsx",
                                        lineNumber: 226,
                                        columnNumber: 13
                                    }, this),
                                    "New project"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                lineNumber: 225,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/sidebar.tsx",
                        lineNumber: 214,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/sidebar.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden h-14"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/sidebar.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__9218b25d._.js.map