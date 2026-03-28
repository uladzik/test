import Link from "next/link";
import { ChatMessage } from "@/lib/types";

interface ChatCardProps {
  projectId: string;
  messages: ChatMessage[];
}

export function ChatCard({ projectId, messages }: ChatCardProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-base">Chat</h3>
        <Link
          href={`/projects/${projectId}/chat`}
          className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          Open
        </Link>
      </div>

      <div className="space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="px-3 py-2.5 bg-gray-50 rounded-lg text-sm"
          >
            {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
}
