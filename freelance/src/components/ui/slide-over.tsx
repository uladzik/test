"use client";

import { useEffect, useCallback, useState } from "react";
import { X } from "lucide-react";

interface SlideOverProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function SlideOver({ open, onClose, title, children }: SlideOverProps) {
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 250);
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleClose]);

  if (!open && !closing) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm ${
          closing ? "animate-overlay-out" : "animate-overlay-in"
        }`}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-[var(--card)] border-l border-[var(--border)] shadow-2xl flex flex-col ${
          closing ? "animate-slide-out-right" : "animate-slide-in-right"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-[var(--background)] transition-colors ml-auto"
            aria-label="Close panel"
          >
            <X size={18} className="text-[var(--muted)]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
