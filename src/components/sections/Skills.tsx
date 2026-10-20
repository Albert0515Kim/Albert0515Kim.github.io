import type { CSSProperties } from "react";
import { CodeXml } from "lucide-react";
import { skills } from "@/data/experience";
import { techIcons } from "@/components/ui/techIcons";
import { Reveal } from "@/components/ui/Reveal";

// One accent per card, cycled in order.
const accents = ["#a8c7fa", "#7dd3c0", "#c4b5fd", "#9fe0a8", "#e8a25c", "#f4a6b8", "#c9ccd2"];

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="mx-auto max-w-[1400px] px-5 pb-28 md:px-10 md:pb-40">
      <h2 id="skills-title" className="flex items-center gap-3 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
        <span className="size-2 rounded-full bg-ice" aria-hidden="true" />
        Skills
      </h2>
      <Reveal className="mt-10 grid gap-5 md:mt-14 lg:grid-cols-2">
        {skills.map((s, i) => (
          <div
            key={s.group}
            style={{ "--accent": accents[i % accents.length] } as CSSProperties}
            className="rounded-3xl border border-[color-mix(in_srgb,var(--accent)_22%,transparent)] bg-[color-mix(in_srgb,var(--accent)_4%,var(--color-surface))] p-6 md:p-8 lg:last:odd:col-span-2"
          >
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-fg">{s.group}</h3>
            <ul className="mt-6 flex flex-wrap gap-3">
              {s.items.map((item) => {
                const Icon = techIcons[item] ?? CodeXml;
                return (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-[color-mix(in_srgb,var(--accent)_20%,transparent)] bg-ink/40 py-2 pl-2 pr-4 text-[15px] font-medium text-fg/90 transition-colors duration-300 hover:border-[color-mix(in_srgb,var(--accent)_45%,transparent)]"
                  >
                    <span className="grid size-8 place-items-center rounded-lg bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent)]">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
