import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ModuleCardWrapperProps {
  title: string;
  href: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ModuleCardWrapper({
  title,
  href,
  subtitle,
  icon,
  children,
  className = "",
}: ModuleCardWrapperProps) {
  return (
    <div className={`card p-5 flex flex-col h-full ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          {icon && <span className="text-[var(--accent)]">{icon}</span>}
          <h3 className="font-semibold text-[15px]">{title}</h3>
        </div>
        <Link
          href={href}
          className="flex items-center gap-1 text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors group/link"
        >
          Open
          <ArrowUpRight size={12} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
        </Link>
      </div>
      {subtitle && (
        <p className="text-xs text-[var(--muted)] mb-4">{subtitle}</p>
      )}
      {!subtitle && <div className="mb-3" />}
      <div className="flex-1">{children}</div>
    </div>
  );
}
