"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SlideOver } from "@/components/ui/slide-over";
import { QuickCreate } from "./quick-create";

interface DashboardFABProps {
  projectId: string;
}

export function DashboardFAB({ projectId }: DashboardFABProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shadow-lg hover:bg-[var(--accent-hover)] transition-all hover:scale-105 z-50 animate-fab-pulse"
        aria-label="Quick create"
      >
        <Plus size={24} />
      </button>

      <SlideOver open={open} onClose={() => setOpen(false)} title="Quick Create">
        <QuickCreate projectId={projectId} />
      </SlideOver>
    </>
  );
}
