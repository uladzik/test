"use client";

import { useState } from "react";
import { MessageCircle, Phone, Send } from "lucide-react";
import { ChatMessage } from "@/lib/types";
import { ModuleCardWrapper } from "./module-card-wrapper";

interface ChatCardProps {
  projectId: string;
  messages: ChatMessage[];
}

export function ChatCard({ projectId, messages }: ChatCardProps) {
  const [inputValue, setInputValue] = useState("");

  return (
    <ModuleCardWrapper
      title="Chat"
      href={`/projects/${projectId}/chat`}
      icon={<MessageCircle size={16} />}
    >
      <div className="space-y-1.5 mb-3">
        {messages.map((msg) => {
          const time = new Date(msg.createdAt);
          const timeStr = time.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
          const dateStr = time.toLocaleDateString("en-US", { month: "short", day: "numeric" });

          return (
            <div
              key={msg.id}
              className="flex items-start gap-2.5 px-3 py-2.5 bg-[var(--background)] rounded-xl text-sm"
            >
              {msg.messageType === "call_log" ? (
                <Phone size={14} className="text-[var(--success)] mt-0.5 shrink-0" />
              ) : msg.messageType === "system" ? (
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--muted-light)] mt-2 shrink-0" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
              )}
              <div className="min-w-0 flex-1">
                <span className="line-clamp-2">{msg.content}</span>
                <p className="text-[10px] text-[var(--muted-light)] mt-1">
                  {dateStr} at {timeStr}
                </p>
              </div>
            </div>
          );
        })}
        {messages.length === 0 && (
          <div className="text-center py-6">
            <MessageCircle size={24} className="mx-auto text-[var(--muted-light)] mb-2" />
            <p className="text-sm text-[var(--muted)]">No messages yet</p>
            <p className="text-xs text-[var(--muted-light)]">Start the conversation</p>
          </div>
        )}
      </div>

      {/* Message input */}
      <div className="flex items-center gap-2 mt-auto pt-2 border-t border-[var(--border)]">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--muted-light)]"
        />
        <button
          className="p-2 rounded-lg bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors shrink-0"
          aria-label="Send message"
        >
          <Send size={14} />
        </button>
      </div>
    </ModuleCardWrapper>
  );
}
