import NextLink from "next/link";
import { Link as LinkType } from "@/lib/types";

interface LinksCardProps {
  projectId: string;
  links: LinkType[];
}

const iconColors: Record<string, string> = {
  figma: "#a259ff",
  notion: "#000",
  drive: "#4285f4",
  prototype: "#f24e1e",
  other: "#737373",
};

export function LinksCard({ projectId, links }: LinksCardProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-base">Links</h3>
        <NextLink
          href={`/projects/${projectId}/links`}
          className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          Open
        </NextLink>
      </div>

      <div className="space-y-2">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-lg text-sm hover:bg-gray-100 transition-colors"
          >
            <span
              className="w-5 h-5 rounded flex items-center justify-center text-white text-[10px] font-bold shrink-0"
              style={{ backgroundColor: iconColors[link.linkType] || iconColors.other }}
            >
              {link.linkType === "figma" ? "F" : link.linkType[0].toUpperCase()}
            </span>
            <span className="truncate">{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
