module.exports = {

"[project]/.next-internal/server/app/projects/[projectId]/page/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/lib/dummy-data.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
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
        coverGradient: "from-slate-900 via-indigo-900 to-slate-800"
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
        coverGradient: "from-blue-900 via-sky-800 to-cyan-700"
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
        coverGradient: "from-emerald-900 via-teal-800 to-emerald-700"
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
        coverGradient: "from-amber-800 via-orange-700 to-amber-600"
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
        coverGradient: "from-rose-800 via-pink-700 to-rose-600"
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
"[project]/src/components/modules/meetings-card.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "MeetingsCard": (()=>MeetingsCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const MeetingsCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call MeetingsCard() from the server but MeetingsCard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/modules/meetings-card.tsx <module evaluation>", "MeetingsCard");
}}),
"[project]/src/components/modules/meetings-card.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "MeetingsCard": (()=>MeetingsCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const MeetingsCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call MeetingsCard() from the server but MeetingsCard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/modules/meetings-card.tsx", "MeetingsCard");
}}),
"[project]/src/components/modules/meetings-card.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$meetings$2d$card$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/modules/meetings-card.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$meetings$2d$card$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/src/components/modules/meetings-card.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$meetings$2d$card$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/src/components/modules/time-track-card.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "TimeTrackCard": (()=>TimeTrackCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const TimeTrackCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call TimeTrackCard() from the server but TimeTrackCard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/modules/time-track-card.tsx <module evaluation>", "TimeTrackCard");
}}),
"[project]/src/components/modules/time-track-card.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "TimeTrackCard": (()=>TimeTrackCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const TimeTrackCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call TimeTrackCard() from the server but TimeTrackCard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/modules/time-track-card.tsx", "TimeTrackCard");
}}),
"[project]/src/components/modules/time-track-card.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$time$2d$track$2d$card$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/modules/time-track-card.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$time$2d$track$2d$card$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/src/components/modules/time-track-card.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$time$2d$track$2d$card$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/src/components/modules/tasks-card.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "TasksCard": (()=>TasksCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const TasksCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call TasksCard() from the server but TasksCard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/modules/tasks-card.tsx <module evaluation>", "TasksCard");
}}),
"[project]/src/components/modules/tasks-card.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "TasksCard": (()=>TasksCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const TasksCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call TasksCard() from the server but TasksCard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/modules/tasks-card.tsx", "TasksCard");
}}),
"[project]/src/components/modules/tasks-card.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$tasks$2d$card$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/modules/tasks-card.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$tasks$2d$card$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/src/components/modules/tasks-card.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$tasks$2d$card$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/src/components/modules/chat-card.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ChatCard": (()=>ChatCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const ChatCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ChatCard() from the server but ChatCard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/modules/chat-card.tsx <module evaluation>", "ChatCard");
}}),
"[project]/src/components/modules/chat-card.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ChatCard": (()=>ChatCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const ChatCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ChatCard() from the server but ChatCard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/modules/chat-card.tsx", "ChatCard");
}}),
"[project]/src/components/modules/chat-card.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$chat$2d$card$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/modules/chat-card.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$chat$2d$card$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/src/components/modules/chat-card.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$chat$2d$card$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/src/components/modules/module-card-wrapper.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ModuleCardWrapper": (()=>ModuleCardWrapper)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-rsc] (ecmascript) <export default as ArrowUpRight>");
;
;
;
function ModuleCardWrapper({ title, href, subtitle, icon, children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `card p-5 flex flex-col h-full ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[var(--accent)]",
                                children: icon
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/module-card-wrapper.tsx",
                                lineNumber: 25,
                                columnNumber: 20
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-[15px]",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/module-card-wrapper.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/module-card-wrapper.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: href,
                        className: "flex items-center gap-1 text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors group/link",
                        children: [
                            "Open",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                size: 12,
                                className: "opacity-0 group-hover/link:opacity-100 transition-opacity"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/module-card-wrapper.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/module-card-wrapper.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/module-card-wrapper.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-[var(--muted)] mb-4",
                children: subtitle
            }, void 0, false, {
                fileName: "[project]/src/components/modules/module-card-wrapper.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this),
            !subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3"
            }, void 0, false, {
                fileName: "[project]/src/components/modules/module-card-wrapper.tsx",
                lineNumber: 39,
                columnNumber: 21
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/modules/module-card-wrapper.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/module-card-wrapper.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/modules/links-card.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "LinksCard": (()=>LinksCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-rsc] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/link-2.js [app-rsc] (ecmascript) <export default as Link2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$module$2d$card$2d$wrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/module-card-wrapper.tsx [app-rsc] (ecmascript)");
;
;
;
const typeConfig = {
    figma: {
        gradient: "from-purple-500 to-pink-500",
        label: "Figma"
    },
    notion: {
        gradient: "from-gray-800 to-gray-900 dark:from-gray-300 dark:to-gray-400",
        label: "Notion"
    },
    drive: {
        gradient: "from-blue-500 to-cyan-500",
        label: "Drive"
    },
    prototype: {
        gradient: "from-orange-500 to-red-500",
        label: "Proto"
    },
    other: {
        gradient: "from-gray-400 to-gray-500",
        label: "Link"
    }
};
function LinksCard({ projectId, links }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$module$2d$card$2d$wrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ModuleCardWrapper"], {
        title: "Links",
        href: `/projects/${projectId}/links`,
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
            size: 16
        }, void 0, false, {
            fileName: "[project]/src/components/modules/links-card.tsx",
            lineNumber: 23,
            columnNumber: 13
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-1.5",
            children: [
                links.map((link)=>{
                    const config = typeConfig[link.linkType] || typeConfig.other;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: link.url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "flex items-center gap-3 px-3 py-2.5 bg-[var(--background)] rounded-xl text-sm hover:bg-[var(--card-hover)] transition-colors group/link",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `w-7 h-7 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-sm`,
                                children: config.label[0]
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/links-card.tsx",
                                lineNumber: 36,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate flex-1",
                                children: link.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/links-card.tsx",
                                lineNumber: 41,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                size: 12,
                                className: "text-[var(--muted-light)] opacity-0 group-hover/link:opacity-100 transition-opacity shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/links-card.tsx",
                                lineNumber: 42,
                                columnNumber: 15
                            }, this)
                        ]
                    }, link.id, true, {
                        fileName: "[project]/src/components/modules/links-card.tsx",
                        lineNumber: 29,
                        columnNumber: 13
                    }, this);
                }),
                links.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"], {
                            size: 24,
                            className: "mx-auto text-[var(--muted-light)] mb-2"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/links-card.tsx",
                            lineNumber: 48,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-[var(--muted)]",
                            children: "No links added"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/links-card.tsx",
                            lineNumber: 49,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-[var(--muted-light)]",
                            children: "Add project links and resources"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/links-card.tsx",
                            lineNumber: 50,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/links-card.tsx",
                    lineNumber: 47,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/modules/links-card.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/modules/links-card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/modules/documents-card.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "DocumentsCard": (()=>DocumentsCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const DocumentsCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call DocumentsCard() from the server but DocumentsCard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/modules/documents-card.tsx <module evaluation>", "DocumentsCard");
}}),
"[project]/src/components/modules/documents-card.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "DocumentsCard": (()=>DocumentsCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const DocumentsCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call DocumentsCard() from the server but DocumentsCard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/modules/documents-card.tsx", "DocumentsCard");
}}),
"[project]/src/components/modules/documents-card.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$documents$2d$card$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/modules/documents-card.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$documents$2d$card$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/src/components/modules/documents-card.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$documents$2d$card$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/src/components/modules/notes-card.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "NotesCard": (()=>NotesCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const NotesCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call NotesCard() from the server but NotesCard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/modules/notes-card.tsx <module evaluation>", "NotesCard");
}}),
"[project]/src/components/modules/notes-card.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "NotesCard": (()=>NotesCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const NotesCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call NotesCard() from the server but NotesCard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/modules/notes-card.tsx", "NotesCard");
}}),
"[project]/src/components/modules/notes-card.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$notes$2d$card$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/modules/notes-card.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$notes$2d$card$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/src/components/modules/notes-card.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$notes$2d$card$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/src/components/modules/payments-card.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "PaymentsCard": (()=>PaymentsCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-rsc] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$module$2d$card$2d$wrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/module-card-wrapper.tsx [app-rsc] (ecmascript)");
;
;
;
const statusStyles = {
    paid: {
        bg: "bg-emerald-100/80 dark:bg-emerald-900/40",
        text: "text-emerald-700 dark:text-emerald-400",
        label: "Paid"
    },
    sent: {
        bg: "bg-blue-100/80 dark:bg-blue-900/40",
        text: "text-blue-700 dark:text-blue-400",
        label: "Sent"
    },
    pending: {
        bg: "bg-amber-100/80 dark:bg-amber-900/40",
        text: "text-amber-700 dark:text-amber-400",
        label: "Pending"
    },
    overdue: {
        bg: "bg-red-100/80 dark:bg-red-900/40",
        text: "text-red-700 dark:text-red-400",
        label: "Overdue"
    }
};
function PaymentsCard({ projectId, payments }) {
    const totalPaid = payments.filter((p)=>p.status === "paid").reduce((sum, p)=>sum + p.amount, 0);
    const totalPending = payments.filter((p)=>p.status !== "paid").reduce((sum, p)=>sum + p.amount, 0);
    // Monthly bar chart data
    const monthlyData = getMonthlyData(payments);
    const maxAmount = Math.max(...monthlyData.map((d)=>d.amount), 1);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$module$2d$card$2d$wrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ModuleCardWrapper"], {
        title: "Payments",
        href: `/projects/${projectId}/payments`,
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
            size: 16
        }, void 0, false, {
            fileName: "[project]/src/components/modules/payments-card.tsx",
            lineNumber: 33,
            columnNumber: 13
        }, void 0),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 p-3 bg-[var(--success-bg)] rounded-xl border border-emerald-100 dark:border-emerald-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold mb-1",
                                children: "Received"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/payments-card.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-bold text-emerald-700 dark:text-emerald-400 tabular-nums",
                                children: [
                                    "$",
                                    totalPaid.toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/payments-card.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/payments-card.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 p-3 bg-[var(--warning-bg)] rounded-xl border border-amber-100 dark:border-amber-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold mb-1",
                                children: "Outstanding"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/payments-card.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-bold text-amber-700 dark:text-amber-400 tabular-nums",
                                children: [
                                    "$",
                                    totalPending.toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/payments-card.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/payments-card.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/payments-card.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            monthlyData.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest mb-2",
                        children: "By month"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/payments-card.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-end gap-2 h-16",
                        children: monthlyData.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 flex flex-col items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full rounded-t-md bg-[var(--accent)] opacity-70 transition-all min-h-[3px]",
                                        style: {
                                            height: `${d.amount / maxAmount * 100}%`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/payments-card.tsx",
                                        lineNumber: 60,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[9px] text-[var(--muted)] tabular-nums",
                                        children: d.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/payments-card.tsx",
                                        lineNumber: 64,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, d.label, true, {
                                fileName: "[project]/src/components/modules/payments-card.tsx",
                                lineNumber: 59,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/payments-card.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/payments-card.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1",
                children: [
                    payments.map((payment)=>{
                        const style = statusStyles[payment.status] || statusStyles.pending;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[var(--background)] transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium truncate",
                                            children: payment.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/payments-card.tsx",
                                            lineNumber: 81,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-[var(--muted)]",
                                            children: formatPeriod(payment.periodStart, payment.periodEnd)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/payments-card.tsx",
                                            lineNumber: 82,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/payments-card.tsx",
                                    lineNumber: 80,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 ml-3 shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold tabular-nums",
                                            children: [
                                                "$",
                                                payment.amount.toLocaleString()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/payments-card.tsx",
                                            lineNumber: 87,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-[10px] font-semibold px-2 py-1 rounded-lg ${style.bg} ${style.text}`,
                                            children: style.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/payments-card.tsx",
                                            lineNumber: 90,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/payments-card.tsx",
                                    lineNumber: 86,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, payment.id, true, {
                            fileName: "[project]/src/components/modules/payments-card.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, this);
                    }),
                    payments.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                size: 24,
                                className: "mx-auto text-[var(--muted-light)] mb-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/payments-card.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-[var(--muted)]",
                                children: "No payments yet"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/payments-card.tsx",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[var(--muted-light)]",
                                children: "Track invoices and payments"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/payments-card.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/payments-card.tsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/payments-card.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/payments-card.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
function getMonthlyData(payments) {
    const months = {};
    for (const p of payments){
        if (!p.periodStart) continue;
        const d = new Date(p.periodStart);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        const label = d.toLocaleDateString("en-US", {
            month: "short"
        });
        if (!months[key]) months[key] = 0;
        months[key] += p.amount;
    }
    return Object.entries(months).sort(([a], [b])=>a.localeCompare(b)).map(([key, amount])=>{
        const [, m] = key.split("-");
        const month = new Date(2026, parseInt(m) - 1);
        return {
            label: month.toLocaleDateString("en-US", {
                month: "short"
            }),
            amount
        };
    });
}
function formatPeriod(start, end) {
    if (!start) return "";
    const fmt = (d)=>new Date(d).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric"
        });
    if (end) return `${fmt(start)} -- ${fmt(end)}`;
    return fmt(start);
}
}}),
"[project]/src/components/modules/timeline-card.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "TimelineCard": (()=>TimelineCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$milestone$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Milestone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/milestone.js [app-rsc] (ecmascript) <export default as Milestone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-rsc] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$module$2d$card$2d$wrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/module-card-wrapper.tsx [app-rsc] (ecmascript)");
;
;
;
const statusConfig = {
    completed: {
        ring: "ring-emerald-200 dark:ring-emerald-800",
        bg: "bg-emerald-500"
    },
    in_progress: {
        ring: "ring-blue-200 dark:ring-blue-800",
        bg: "bg-blue-500"
    },
    pending: {
        ring: "ring-gray-200 dark:ring-gray-700",
        bg: "bg-gray-300 dark:bg-gray-600"
    }
};
function TimelineCard({ projectId, milestones, startDate, endDate }) {
    const dateRange = formatDateRange(startDate, endDate);
    const progress = getProgress(milestones);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$module$2d$card$2d$wrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ModuleCardWrapper"], {
        title: "Project Timeline",
        href: `/projects/${projectId}/timeline`,
        subtitle: dateRange || undefined,
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$milestone$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Milestone$3e$__["Milestone"], {
            size: 16
        }, void 0, false, {
            fileName: "[project]/src/components/modules/timeline-card.tsx",
            lineNumber: 27,
            columnNumber: 13
        }, void 0),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-xs mb-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[var(--muted)] font-medium",
                                children: "Progress"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timeline-card.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: [
                                    Math.round(progress),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/timeline-card.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/timeline-card.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-2.5 bg-[var(--background)] rounded-full overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] rounded-full transition-all duration-500",
                            style: {
                                width: `${progress}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/timeline-card.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/timeline-card.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/timeline-card.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-0",
                children: [
                    milestones.map((ms, i)=>{
                        const config = statusConfig[ms.status];
                        const isLast = i === milestones.length - 1;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `w-5 h-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center ring-2 ${config.ring} ${config.bg}`,
                                            children: [
                                                ms.status === "completed" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                    size: 10,
                                                    className: "text-white",
                                                    strokeWidth: 3
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/timeline-card.tsx",
                                                    lineNumber: 52,
                                                    columnNumber: 49
                                                }, this),
                                                ms.status === "in_progress" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-1.5 h-1.5 rounded-full bg-white animate-pulse-dot"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/timeline-card.tsx",
                                                    lineNumber: 53,
                                                    columnNumber: 51
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/timeline-card.tsx",
                                            lineNumber: 51,
                                            columnNumber: 17
                                        }, this),
                                        !isLast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-px flex-1 bg-[var(--border)] my-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/timeline-card.tsx",
                                            lineNumber: 55,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/timeline-card.tsx",
                                    lineNumber: 50,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pb-4 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `text-sm ${ms.status === "completed" ? "text-[var(--muted)] line-through" : ms.status === "in_progress" ? "font-semibold text-[var(--accent)]" : "font-medium"}`,
                                            children: ms.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/timeline-card.tsx",
                                            lineNumber: 58,
                                            columnNumber: 17
                                        }, this),
                                        ms.dueDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-[var(--muted)] mt-0.5",
                                            children: new Date(ms.dueDate).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric"
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/timeline-card.tsx",
                                            lineNumber: 68,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/timeline-card.tsx",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, ms.id, true, {
                            fileName: "[project]/src/components/modules/timeline-card.tsx",
                            lineNumber: 49,
                            columnNumber: 13
                        }, this);
                    }),
                    milestones.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$milestone$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Milestone$3e$__["Milestone"], {
                                size: 24,
                                className: "mx-auto text-[var(--muted-light)] mb-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timeline-card.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-[var(--muted)]",
                                children: "No milestones yet"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timeline-card.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[var(--muted-light)]",
                                children: "Define project milestones"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timeline-card.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/timeline-card.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/timeline-card.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/timeline-card.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
function getProgress(milestones) {
    if (milestones.length === 0) return 0;
    const completed = milestones.filter((m)=>m.status === "completed").length;
    return completed / milestones.length * 100;
}
function formatDateRange(start, end) {
    if (!start) return null;
    const fmt = (d)=>new Date(d).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric"
        });
    if (end) return `${fmt(start)} -- ${fmt(end)}`;
    return `From ${fmt(start)}`;
}
}}),
"[project]/src/components/modules/stats-card.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "StatsCard": (()=>StatsCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-rsc] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-rsc] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-rsc] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-rsc] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flag.js [app-rsc] (ecmascript) <export default as Flag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$module$2d$card$2d$wrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/module-card-wrapper.tsx [app-rsc] (ecmascript)");
;
;
;
function StatsCard({ projectId, timeEntries, payments, tasks, milestones }) {
    const totalMinutes = timeEntries.reduce((sum, e)=>sum + (e.durationMinutes || 0), 0);
    const totalHours = Math.round(totalMinutes / 60 * 10) / 10;
    const totalEarned = payments.filter((p)=>p.status === "paid").reduce((sum, p)=>sum + p.amount, 0);
    const totalInvoiced = payments.reduce((sum, p)=>sum + p.amount, 0);
    const tasksDone = tasks.filter((t)=>t.status === "done").length;
    const milestoneDone = milestones.filter((m)=>m.status === "completed").length;
    const stats = [
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                size: 16
            }, void 0, false, {
                fileName: "[project]/src/components/modules/stats-card.tsx",
                lineNumber: 23,
                columnNumber: 13
            }, this),
            label: "Total hours",
            value: `${totalHours}h`,
            sub: `${totalMinutes} min tracked`,
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-50 dark:bg-blue-950/50"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                size: 16
            }, void 0, false, {
                fileName: "[project]/src/components/modules/stats-card.tsx",
                lineNumber: 31,
                columnNumber: 13
            }, this),
            label: "Earned",
            value: `$${totalEarned.toLocaleString()}`,
            sub: `of $${totalInvoiced.toLocaleString()}`,
            color: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-50 dark:bg-emerald-950/50"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                size: 16
            }, void 0, false, {
                fileName: "[project]/src/components/modules/stats-card.tsx",
                lineNumber: 39,
                columnNumber: 13
            }, this),
            label: "Tasks",
            value: `${tasksDone}/${tasks.length}`,
            sub: tasks.length > 0 ? `${Math.round(tasksDone / tasks.length * 100)}%` : "None",
            color: "text-purple-600 dark:text-purple-400",
            bg: "bg-purple-50 dark:bg-purple-950/50"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__["Flag"], {
                size: 16
            }, void 0, false, {
                fileName: "[project]/src/components/modules/stats-card.tsx",
                lineNumber: 47,
                columnNumber: 13
            }, this),
            label: "Milestones",
            value: `${milestoneDone}/${milestones.length}`,
            sub: milestones.length > 0 ? `${Math.round(milestoneDone / milestones.length * 100)}%` : "None",
            color: "text-amber-600 dark:text-amber-400",
            bg: "bg-amber-50 dark:bg-amber-950/50"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$module$2d$card$2d$wrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ModuleCardWrapper"], {
        title: "Statistics",
        href: `/projects/${projectId}/stats`,
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
            size: 16
        }, void 0, false, {
            fileName: "[project]/src/components/modules/stats-card.tsx",
            lineNumber: 60,
            columnNumber: 13
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-2.5",
            children: stats.map((stat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `p-3.5 rounded-xl ${stat.bg} border border-black/5 dark:border-white/5`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${stat.color} mb-2`,
                            children: stat.icon
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/stats-card.tsx",
                            lineNumber: 65,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xl font-bold tabular-nums",
                            children: stat.value
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/stats-card.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[10px] text-[var(--muted)] mt-0.5 font-medium uppercase tracking-wider",
                            children: stat.label
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/stats-card.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11px] text-[var(--muted)] mt-0.5",
                            children: stat.sub
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/stats-card.tsx",
                            lineNumber: 70,
                            columnNumber: 13
                        }, this)
                    ]
                }, stat.label, true, {
                    fileName: "[project]/src/components/modules/stats-card.tsx",
                    lineNumber: 64,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/modules/stats-card.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/modules/stats-card.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/modules/dashboard-fab.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "DashboardFAB": (()=>DashboardFAB)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const DashboardFAB = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call DashboardFAB() from the server but DashboardFAB is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/modules/dashboard-fab.tsx <module evaluation>", "DashboardFAB");
}}),
"[project]/src/components/modules/dashboard-fab.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "DashboardFAB": (()=>DashboardFAB)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const DashboardFAB = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call DashboardFAB() from the server but DashboardFAB is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/modules/dashboard-fab.tsx", "DashboardFAB");
}}),
"[project]/src/components/modules/dashboard-fab.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$dashboard$2d$fab$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/modules/dashboard-fab.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$dashboard$2d$fab$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/src/components/modules/dashboard-fab.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$dashboard$2d$fab$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/src/app/projects/[projectId]/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ProjectDashboardPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dummy$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dummy-data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$meetings$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/meetings-card.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$time$2d$track$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/time-track-card.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$tasks$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/tasks-card.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$chat$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/chat-card.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$links$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/links-card.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$documents$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/documents-card.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$notes$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/notes-card.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$payments$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/payments-card.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$timeline$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/timeline-card.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$stats$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/stats-card.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$dashboard$2d$fab$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/dashboard-fab.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-rsc] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-rsc] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-rsc] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-rsc] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-rsc] (ecmascript) <export default as CheckCircle2>");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const billingLabels = {
    monthly: "Monthly Payment",
    fixed: "Fixed Price",
    hourly: "Hourly Rate"
};
async function ProjectDashboardPage({ params }) {
    const { projectId } = await params;
    const project = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dummy$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dummyProjects"].find((p)=>p.id === projectId);
    if (!project) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    const meetings = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dummy$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dummyMeetings"].filter((m)=>m.projectId === projectId);
    const timeEntries = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dummy$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dummyTimeEntries"].filter((t)=>t.projectId === projectId);
    const tasks = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dummy$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dummyTasks"].filter((t)=>t.projectId === projectId);
    const chatMessages = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dummy$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dummyChatMessages"].filter((c)=>c.projectId === projectId);
    const links = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dummy$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dummyLinks"].filter((l)=>l.projectId === projectId);
    const documents = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dummy$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dummyDocuments"].filter((d)=>d.projectId === projectId);
    const notes = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dummy$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dummyNotes"].filter((n)=>n.projectId === projectId);
    const payments = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dummy$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dummyPayments"].filter((p)=>p.projectId === projectId);
    const milestones = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dummy$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dummyMilestones"].filter((m)=>m.projectId === projectId);
    const dateRange = formatDateRange(project.startDate, project.endDate);
    const totalMinutes = timeEntries.reduce((s, e)=>s + (e.durationMinutes || 0), 0);
    const totalHours = Math.round(totalMinutes / 60 * 10) / 10;
    const tasksDone = tasks.filter((t)=>t.status === "done").length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-[1400px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                href: "/projects",
                className: "inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    "My projects"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `rounded-2xl bg-gradient-to-br ${project.coverGradient || "from-violet-500 to-purple-500"} p-6 pb-5 mb-6 relative overflow-hidden`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 opacity-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "100%",
                            height: "100%",
                            viewBox: "0 0 800 200",
                            preserveAspectRatio: "none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "650",
                                    cy: "80",
                                    r: "150",
                                    fill: "white"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "750",
                                    cy: "180",
                                    r: "100",
                                    fill: "white"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "100",
                                    cy: "180",
                                    r: "60",
                                    fill: "white"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold text-white mb-1 tracking-tight",
                                children: project.name
                            }, void 0, false, {
                                fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this),
                            project.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-white/70 mb-4",
                                children: project.description
                            }, void 0, false, {
                                fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: [
                                    project.clientName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-medium",
                                        children: project.clientName
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this),
                                    dateRange && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                                                lineNumber: 95,
                                                columnNumber: 17
                                            }, this),
                                            dateRange
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                                        lineNumber: 94,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                                                lineNumber: 100,
                                                columnNumber: 15
                                            }, this),
                                            billingLabels[project.billingType]
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                                        lineNumber: 99,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                                                lineNumber: 104,
                                                columnNumber: 15
                                            }, this),
                                            totalHours,
                                            "h tracked"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                                                lineNumber: 108,
                                                columnNumber: 15
                                            }, this),
                                            tasksDone,
                                            "/",
                                            tasks.length,
                                            " tasks"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-min",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:row-span-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$meetings$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MeetingsCard"], {
                            projectId: projectId,
                            meetings: meetings
                        }, void 0, false, {
                            fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:row-span-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$time$2d$track$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TimeTrackCard"], {
                            projectId: projectId,
                            entries: timeEntries
                        }, void 0, false, {
                            fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$tasks$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TasksCard"], {
                            projectId: projectId,
                            tasks: tasks
                        }, void 0, false, {
                            fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$chat$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ChatCard"], {
                            projectId: projectId,
                            messages: chatMessages
                        }, void 0, false, {
                            fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$links$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LinksCard"], {
                            projectId: projectId,
                            links: links
                        }, void 0, false, {
                            fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                            lineNumber: 139,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$documents$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DocumentsCard"], {
                            projectId: projectId,
                            documents: documents
                        }, void 0, false, {
                            fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                            lineNumber: 144,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$notes$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NotesCard"], {
                            projectId: projectId,
                            notes: notes
                        }, void 0, false, {
                            fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                            lineNumber: 149,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$timeline$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TimelineCard"], {
                            projectId: projectId,
                            milestones: milestones,
                            startDate: project.startDate,
                            endDate: project.endDate
                        }, void 0, false, {
                            fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                            lineNumber: 154,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$payments$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PaymentsCard"], {
                            projectId: projectId,
                            payments: payments
                        }, void 0, false, {
                            fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$stats$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["StatsCard"], {
                            projectId: projectId,
                            timeEntries: timeEntries,
                            payments: payments,
                            tasks: tasks,
                            milestones: milestones
                        }, void 0, false, {
                            fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                            lineNumber: 169,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$dashboard$2d$fab$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DashboardFAB"], {
                projectId: projectId
            }, void 0, false, {
                fileName: "[project]/src/app/projects/[projectId]/page.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/projects/[projectId]/page.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
function formatDateRange(start, end) {
    if (!start) return null;
    const fmt = (d)=>new Date(d).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    if (end) return `${fmt(start)} -- ${fmt(end)}`;
    return `From ${fmt(start)}`;
}
}}),
"[project]/src/app/projects/[projectId]/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/projects/[projectId]/page.tsx [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=_fa8770fc._.js.map