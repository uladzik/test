import { MessageCircle, Phone } from "lucide-react";
import { ChatMessage } from "@/lib/types";
import { ModuleCardWrapper } from "./module-card-wrapper";

interface ChatCardProps {
  projectId: string;
  messages: ChatMessage[];
}

export function ChatCard({ projectId, messages }: ChatCardProps) {
  return (
    <ModuleCardWrapper
      title="Chat"
      href={`/projects/${projectId}/chat`}
      icon={<MessageCircle size={16} />}
    >
      <div className="space-y-1.5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="flex items-start gap-2.5 px-3 py-2.5 bg-[var(--background)] rounded-xl text-sm"
          >
            {msg.messageType === "call_log" ? (
              <Phone size={14} className="text-[var(--success)] mt-0.5 shrink-0" />
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
            )}
            <span className="line-clamp-2">{msg.content}</span>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-sm text-[var(--muted)] text-center py-6">No messages yet</p>
        )}
      </div>
    </ModuleCardWrapper>
  );
}
