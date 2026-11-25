import { CodeXml } from "lucide-react";
import type { Project } from "@/data/projects";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { techIcons } from "@/components/ui/techIcons";

type Tone = "dark" | "light";

export function StackLine({ stack, tone = "dark", label = "Built with" }: { stack: readonly string[]; tone?: Tone; label?: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {stack.map((item) => {
        const Icon = techIcons[item] ?? CodeXml;
        return (
          <li
            key={item}
            className={`flex items-center gap-2 rounded-xl border py-1 pl-1 pr-3 text-[13px] font-medium ${
              tone === "dark" ? "border-line bg-ink/40 text-silver" : "border-black/10 bg-white/50 text-paper-ink/80"
            }`}
          >
            <span className={`grid size-6 place-items-center rounded-md ${tone === "dark" ? "bg-ice/10 text-ice" : "bg-black/[0.06] text-paper-ink"}`}>
              <Icon className="size-3.5" aria-hidden="true" />
            </span>
            {item}
          </li>
        );
      })}
    </ul>
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

