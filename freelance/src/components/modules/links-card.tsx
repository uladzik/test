import { ExternalLink } from "lucide-react";
import { Link as LinkType } from "@/lib/types";
import { ModuleCardWrapper } from "./module-card-wrapper";

interface LinksCardProps {
  projectId: string;
  links: LinkType[];
}

const typeConfig: Record<string, { gradient: string; label: string }> = {
  figma: { gradient: "from-purple-500 to-pink-500", label: "Figma" },
  notion: { gradient: "from-gray-800 to-gray-900", label: "Notion" },
  drive: { gradient: "from-blue-500 to-cyan-500", label: "Drive" },
  prototype: { gradient: "from-orange-500 to-red-500", label: "Proto" },
  other: { gradient: "from-gray-400 to-gray-500", label: "Link" },
};

export function LinksCard({ projectId, links }: LinksCardProps) {
  return (
    <ModuleCardWrapper
      title="Links"
      href={`/projects/${projectId}/links`}
      icon={<ExternalLink size={16} />}
    >
      <div className="space-y-1.5">
        {links.map((link) => {
          const config = typeConfig[link.linkType] || typeConfig.other;
          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2.5 bg-[var(--background)] rounded-xl text-sm hover:bg-gray-100 transition-colors group/link"
            >
              <span
                className={`w-7 h-7 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-sm`}
              >
                {config.label[0]}
              </span>
              <span className="truncate flex-1">{link.label}</span>
              <ExternalLink size={12} className="text-[var(--muted-light)] opacity-0 group-hover/link:opacity-100 transition-opacity shrink-0" />
            </a>
          );
        })}
        {links.length === 0 && (
          <p className="text-sm text-[var(--muted)] text-center py-6">No links added</p>
        )}
      </div>
    </ModuleCardWrapper>
  );
}
