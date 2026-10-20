import type { Project } from "@/data/projects";
import { ArrowLink } from "@/components/ui/ArrowLink";

type Tone = "dark" | "light";

export function StackLine({ stack, tone = "dark" }: { stack: string[]; tone?: Tone }) {
  return (
    <p className={`font-mono text-[0.7rem] leading-relaxed tracking-wide ${tone === "dark" ? "text-subtle" : "text-black/45"}`}>
      <span className="sr-only">Built with: </span>
      {stack.join("  /  ")}
    </p>
  );
}

export function ProjectActions({ project, tone = "dark" }: { project: Project; tone?: Tone }) {
  if (!project.links.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
      {project.links.map((l) => (
        <ArrowLink key={l.href} href={l.href} className={tone === "dark" ? "" : "!text-paper-ink"}>
          {l.label}
        </ArrowLink>
      ))}
    </div>
  );
}

export function ProjectLabel({ project, tone = "dark" }: { project: Project; tone?: Tone }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] ${tone === "dark" ? "text-muted" : "text-black/50"}`}>
      <span className={tone === "dark" ? "text-fg" : "text-paper-ink"}>
        {project.index} / {project.label}
      </span>
      <span aria-hidden="true" className={`h-px w-6 ${tone === "dark" ? "bg-line" : "bg-black/15"}`} />
      <span>{project.category.filter((c) => c.toLowerCase() !== project.label.toLowerCase()).join(" · ")}</span>
    </div>
  );
}
