import { ExternalLink, Link2 } from "lucide-react";
import { Link as LinkType } from "@/lib/types";
import { ModuleCardWrapper } from "./module-card-wrapper";

interface LinksCardProps {
  projectId: string;
  links: LinkType[];
}

const typeConfig: Record<string, { gradient: string; label: string }> = {
  figma: { gradient: "from-purple-500 to-pink-500", label: "Figma" },
  notion: { gradient: "from-gray-800 to-gray-900 dark:from-gray-300 dark:to-gray-400", label: "Notion" },
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
              className="flex items-center gap-3 px-3 py-2.5 bg-[var(--background)] rounded-xl text-sm hover:bg-[var(--card-hover)] transition-colors group/link"
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
          <div className="text-center py-6">
            <Link2 size={24} className="mx-auto text-[var(--muted-light)] mb-2" />
            <p className="text-sm text-[var(--muted)]">No links added</p>
            <p className="text-xs text-[var(--muted-light)]">Add project links and resources</p>
          </div>
        )}
      </div>
    </ModuleCardWrapper>
  );
}
